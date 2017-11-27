---
layout: post
title:  "RMNIST with annealing and ensembling"
date:   2017-11-26
permalink: /rmnist_anneal_ensemble
---
By [Michael Nielsen](http://twitter.com/michael_nielsen) 

In the [last post](/rmnist) I described Reduced MNIST, or RMNIST, a
very stripped-down version of the MNIST training set.  As a side
project, I've been exploring RMNIST as an entree to the problem of
using machines to generalize from extremely small data sets, as humans
often do.  Using just 10 examples of each training digit, in that post
I described how to achieve a classification accuracy of 92.07%.

That 92.07% accuracy was achieved using a simple convolutional neural
network, with dropout and data augmentation to reduce overfitting.

In this post I report the results obtained by using three additional
ideas:

1. The use of simulated annealing to do hyper-parameter optimization;

2. Voting by an ensemble of neural nets, rather than just a single
   neural net; and

3. l2 regularization.

The code is available
in
[anneal.py](https://github.com/mnielsen/rmnist/blob/master/anneal.py).

The experiments in the last post were done on my laptop, using the CPU
&ndash; a nice thing about tiny training sets is that you can
experiment using relatively few computational resources.  But for
these experiments, it was helpful to use a NVIDIA Tesla P100, run in
the Google Compute cloud.  This sped my experiments up by a factor of
about 10. 

These changes resulted in an accuracy of 93.81%, a considerable
improvement over the 92.07% obtained previously.  I suspect that
further improvements using these ideas, along the lines described
below, will bump that accuracy over 95%, and possibly higher.
Ideally, I'd like to achieve better than 99% accuracy. My guess is
that this would be close to how humans would perform, starting with a
training set of this size.

## Detailed working notes and ideas for improvement

Through the remainder of this post, I assume you're familiar with the
way annealing works.

The annealing strategy is to make local "moves" in hyper-parameter
space.  For instance, a typical move was to increase by 2 the number
of kernels in the first convolutional layer. Another move was to
decrease by 2 the number of kernels.  Two more moves were to increase
or decrease the learning rate by a constant factor of
10<sup>&frac14;</sup>.  

Overall, the anneal involved modifying four hyper-parameters using
such local moves: the learning rate, the weight decay (for l2
regularization), the number of kernels in the first convolutional
layer, and the number of kernels in the second convolutional layer.

The "energy" associated to hyper-parameter configurations was just the
validation accuracy of an ensemble of nets with those
hyper-parameters.  More precisely, I used the negative of the
validation accuracy &ndash; the negative since the goal of annealing
is to minimize the energy, and thus to maximize the accuracy.

These were first experiments, and it'd likely be easy to considerably
improve the results.  To do that, it'd be useful to have monitoring
tools which help us debug and improve the anneal. Such tools could
help us:

* Identify which hyper-parameters make a significant difference to
  performance, and which do
  not. [Bergstra and Bengio](http://www.jmlr.org/papers/v13/bergstra12a.html) find
  that typically only a few hyper-parameters make much difference.
  How can we identify those hyper-parameters and ensure that we
  concentrate on those?

* Identify when we should change the structure of a move.  For
  instance, instead of changing the number of kernels by 2, perhaps it
  would be better to change the number by 5.  What step sizes are
  best? Should we have a distribution?  How sensitive is validation
  accuracy to the size of the steps?
  
* Identify changes to the way we should sample from the moves.  At the
  moment I simply choose a move at random. But if statistics are kept
  of previous moves, it would be possible to estimate the probability
  of a given move improving the validation accuracy, and sample
  accordingly. What is the probability distribution with which
  particular moves improve the accuracy?  What's a good model for the
  size of the expected improvements?  These are questions closely
  related to the work
  of
  [Snoek, Larochelle, and Adams](http://papers.nips.cc/paper/4522-practical-bayesian-optimization-of-machine-l) on
  Bayesian hyper-parameter optimization.

* Identify pairs of moves which work well together.  For instance, it
  may be that increasing the number of kernels works well _provided_
  the l2 regularization is also increased.  But each move on its own
  might be unfavourable.  Which pairs of moves often produce good
  outcomes, even when the individual moves do not? Is it possible for
  the annealer to automatically learn such pairs and incorporate them
  into the annealing?

* Identify when we should change the energy scale of the anneal, i.e.,
  the effective temperature.  A characteristic question here is how
  often we accept moves which make the accuracy lower, despite the
  fact that a different move would have made the accuracy higher. If
  this happens too often it likely means the energy scale should be
  made smaller (i.e., the temperature of the anneal should be
  decreased).
  
* By sampling from the hyper-parameter space can we build a good model
  which lets us predict accuracy from the hyper-parameters? And then
  use something like gradient ascent to optimize that function?

Each of these ideas suggests good small follow-up projects.  Those
projects would be of interest in their own right; I also wouldn't be
surprised if they resulted in considerable improvement in performance.

Insofar as such tools would change the way we do the anneal, we'd be
doing hyper-parameter optimization optimization.

A few miscellaneous observations:

*Good performance even with small number of kernels in the first
layer:* I was surprised how well the network performed with just 2 (!)
kernels in the first convolutional layer &ndash; it was relatively
easy to get validation accuracies above 93%. What can we learn from
this? What would happen with just 1 kernel?  How much is it possible
to reduce the number of kernels in the second convolutional layer?  In
a situation where the key problem is overfitting and generalization,
it seems like an important observation that we can get 93% performance
with just 2 kernels.

*Batch size mattered a lot for speed:* As a legacy of my CPU code I
started with a mini-batch size of 10.  I changed that to 64, since
increasing mini-batch size often helps with speed, particularly on a
GPU, where these computations are easily parallelized.  I was,
however, surprised by the speedup &ndash; I didn't do a detailed
benchmark, but it was easily a factor of 2 or 3. Further
experimentation with mini-batch size would be useful.  (Note: I'd
never used the P100 GPU before.  I've seen speedups with other GPUs
when changing mini-batch size, but I'm pretty sure this is the largest
I've seen.)

*Adding other hyper-parameters:* I suspect adding other
hyper-parameters would result in significantly better results. In
rough order of priority, it'd be good to add: initialization
parameters for the weights, different types of data augmentation, size
of the fully-connected layer, the kernel sizes, learning rate decay
rate, and stride length.

_Understand performance across ensembles of nets:_ Something I
understand poorly is the behaviour of ensembles of neural nets.  What
is the distribution of performance across the ensemble?  How much can
aggregating the outputs help?  What are the best strategies for
aggregating outputs?  How much does it help to increase the size of
the ensemble?

*How stable are the results for large ensembles?* The questions in the
last item are all intrinsically interesting.  They're also interesting
for a practical reason: sometimes I found hyper-parameter choices
which did not provide stable performance across repeated training
using those same hyper-parameters.  But perhaps with large enough
ensemble sizes that instability could be eliminated.  A related point:
I achieved validation accuracies up to 94.39%, but didn't report them
above, because they were not easy to reproduce while using the same
hyper-parameters.

*Adding interactivity:* Something that's often frustrating while
annealing is that a question will occur to me, based on observing the
program output, but I have no way to modify the anneal in real time.
It'd be exceptionally helpful to be able to break in, access the REPL,
modify the structure of the anneal, and restart.

*The addictive psychology of training neural nets:* Watching the
outputs flow by &ndash; all the ups and downs of performance &ndash;
produces a feeling which mirrors the appeal many people (including
myself) feel while watching sport.  There's lots of random
intermittent reward, and the perhaps illusory sense that you're
watching something important, something which your mind really wants
to find patterns in. Indeed, on occasion you do find patterns, and it
can be helpful.  Nonetheless, I wonder if there aren't healthier ways
of engaging with neural nets.
