---
layout: post
title:  "Reflections on 'The Bitter Lesson'"
date:   2021-07-22
permalink: /rmnist
---
By [Michael Nielsen](https://michaelnielsen.org) 

*Attention conservation notice:* /Very rapidly written, by an
interested non-expert outsider./

[Rich Sutton](http://incompleteideas.net/) is an expert on neural
networks at the University of Alberta and DeepMind. He's written a
stimulating essay describing what he calls "the bitter lesson": in AI
research it's extremely seductive to try to build expert domain
knowledge into the systems you're creating, but, according to Sutton,
this approach gets beaten again and again by methods leveraging brute
force computation, notably search and learning.

Here's Sutton's basic description, emphases mine:

> The biggest lesson that can be read from 70 years of AI research is
> that general methods that leverage computation are ultimately the
> most effective, and by a large margin. The ultimate reason for this
> is Moore's law, or rather its generalization of continued
> exponentially falling cost per unit of computation. Most AI research
> has been conducted as if the computation available to the agent were
> constant (in which case leveraging human knowledge would be one of
> the only ways to improve performance) but, over a slightly longer
> time than a typical research project, massively more computation
> inevitably becomes available. Seeking an improvement that makes a
> difference in the shorter term, researchers seek to leverage their
> human knowledge of the domain, but *the only thing that matters in
> the long run is the leveraging of computation*. [...] This is a big
> lesson. As a field, we still have not thoroughly learned it, as we
> are continuing to make the same kind of mistakes. To see this, and
> to effectively resist it, we have to understand the appeal of these
> mistakes. We have to learn *the bitter lesson that building in how
> we think we think does not work in the long run*. The bitter lesson
> is based on the historical observations that 1) AI researchers have
> often tried to build knowledge into their agents, 2) this always
> helps in the short term, and is personally satisfying to the
> researcher, but 3) in the long run it plateaus and even inhibits
> further progress, and 4) *breakthrough progress eventually arrives
> by an opposing approach based on scaling computation by search and
> learning*. The eventual success is tinged with bitterness, and often
> incompletely digested, because it is success over a favored,
> human-centric approach.

I'll quote more from the essay later, but I suggest reading [the whole
thing](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)
&ndash; it lays out a particular point of view in a powerful and
succinct way.

What should we learn from this point of view?  Consider his first
example, the Deep Blue chess system:

> In computer chess, the methods that defeated the world champion,
> Kasparov, in 1997, were based on massive, deep search. At the time,
> this was looked upon with dismay by the majority of computer-chess
> researchers who had pursued methods that leveraged human
> understanding of the special structure of chess. When a simpler,
> search-based approach with special hardware and software proved
> vastly more effective, these human-knowledge-based chess researchers
> were not good losers. They said that ``brute force" search may have
> won this time, but it was not a general strategy, and anyway it was
> not how people played chess. These researchers wanted methods based
> on human input to win and were disappointed when they did not.

It's certainly true that Deep Blue used massive search &ndash; at its
peak, Deep Blue was evaluating roughly 200 million positions per
second, using special custom-built chess chips(!)  But Deep Blue also
built in a great deal of expert domain knowledge.  There's a lovely
[overview paper describing how Deep Blue
worked](https://core.ac.uk/download/pdf/82416379.pdf), written by
three of the team behind it (Murray Campbell, A. Joseph Hoane Jr., and
Feng-hsiung Hsu).  Here's just one of many examples of crucial expert
knowledge used by Deep Blue:

> There is an additional factor to consider for rooks on files. Under
> some circumstances, pawns can be semi-transparent to rooks. For
> example, if a pawn is “levering”, it is considered semi-transparent
> to rooks. For this purpose, levering is defined to be having the
> possibility of capturing an enemy pawn. Under such circumstances,
> rooks get about half the value of the unblocked file. This feature
> was of critical importance in Game 2 of the 1997 match between Garry
> Kasparov and Deep Blue.

This is part of a much longer description of how Deep Blue evaluates
the worth of a rook on a particular file &ndash; it involves many
ideas, from relatively elementary knowledge (more central files are
better), through to more complex chess ideas about king safety,
different kinds of traps, and preferred pawn structures.

These ideas are, in turn, just a small fraction of the ideas which go
into the roughly 8,000 features which Deep Blue used to evaluate board
positions. Many of those features, like that of rooks on a file with a
levering pawn, were based on deep domain knowledge of chess. Indeed,
many were based on expert analysis of games lost by Deep Blue's
predecessor systems (an earlier version of Deep Blue, Deep Thought,
and ChipTest).

Sutton is correct that Deep Blue was a triump of "massive, deep
search". But it was also a triumph of expert knowledge of chess. It
seems to me an example of a hybrid approach: deep domain knowledge
_and_ massive search leveraging computational power.

Jump forward more than two decades, and you have DeepMind's AlphaZero
and MuZero systems. AlphaZero taught itself to play chess (and Go and
Shogi) using self-play; on top of that, MuZero added 57 Atari video
games. Neither system had hand-engineered features &ndash; they
started solely with the rules of the various games. And they quickly
learned to play many of the games (all?) better than any human being.

This supports Sutton's contention that:

> The biggest lesson that can be read from 70 years of AI research is
> that general methods that leverage computation are ultimately the
> most effective, and by a large margin.

The trouble with the contention is that &ldquo;ultimately&rdquo; isn't
a very informative stance.  Does it mean in 5 years? In 20 years?  In
100 years?  It offers no guidance. In the meantime, even if Sutton's
contention is correct it doesn't tell us whether the best approach
over the next 5-10 years is based on domain knowledge, leveraging
computation, or a hybrid approach.

My guess, unbacked by any actual evidence: if you tried AlphaZero or
MuZero's approach in 1997, the system would have been trounced by Deep
Blue.  At the time, a hybrid system was the way to go.

Many other examples illustrate this:

+ The best neural networks for image recognition typically leverage
quite a number of image-specific ideas. For a long time they used
ideas about symmetry and pooling, inspired (it is often said) by
results in neuroscience about the structure of mammalian visual
cortices. I haven't been following recent work on image recognition,
but my understanding is that modern approaches use somewhat different
ideas, but nonetheless still use specialized architectures employing
image-specific ideas.  People occasionally try using much more generic
approaches &ndash; here's [one I like, using multi-layer perceptrons
to attack
MNIST](https://people.idsia.ch/~ciresan/data/NNtricks.pdf). But while
such papers are fun and stimulating, they also seem like stunts, and
certainly aren't state-of-the-art.

+ On Twitter, the [high-energy physicist Kyle Cranmer, who has used
machine learning extensively in science, points
out](https://twitter.com/DaniloJRezende/status/1418131824228933634):

> We have a few examples of problems (Eg lattice field theory) that
> are ~hopeless with traditional deep learning, but work when you bake
> in / enforce symmetries. It seems to take much (exponentially?) more
> data and compute to learn without that inductive bias.

This is followed up by DeepMind's [Danilo
Rezende](https://twitter.com/DaniloJRezende/status/1418131824228933634):

> Agree! The rapid progress of ML applied to LQCD [lattice quantum
> chromodynamics], mol. dyn., protein folding and computer graphics is
> the result of the combining domain knowledge (e.g. symmetries) with
> ML The "bitter lesson" applies more to domains where domain
> knowledge is weak or hard to express mathematically.

If you take Sutton's point of view seriously, the response might seem
to be: well, maybe in the short run hybrid approaches will often win,
but over the long run the less opinionated and more general
computationally intensive systems will win.  That is, Deep Blue-like
hybrid systems will ultimately be displaced by more purely
compute-oriented approaches like AlphaZero.

Sutton gives other examples of what we might dub the "MOAR Compute"
approach. They're good as far as they go. But he ignores many other
things computers do. No-one uses deep learning to build operating
systems or pocket calculators. Those are done using classic symbolic
techniques. Might such things ever routinely be done using deep
learning?  If so, it's decades off.  You might object that &ldquo;oh,
those aren't AI, while Sutton's examples are&rdquo;. But that seems
like definining the problem away, defining AI problems to be those
which traditional symbolic, human-understanding based approaches have
trouble with. I think it's fairer (and makes more sense) to consider
computational problems in general. And in that case for each example
like AlphaZero it seems you also have an example like (say) integer
factorization, where algorithmic progress based on human understanding
has been far greater than progress according to Moore's Law.

# Isn't Moore's Law over? So isn't the Bitter Lesson on its way out?

Reports of Moore's Law's death have often been prematurely circulated,
if not greatly exaggerated. It does seem very likely that Moore's Law
will continue its gradual slow down over the next few decades. In that
sense we can expect the Bitter Lesson to gradually lose its
power. Still, my guess is that there may well be a factor of a million
or more to go, in computational power per unit cost, over the next few
decades.  The following factors are all at play:

+ Better-adapated dedicated hardware (later versions of TPUs and the
like)

+ The ongoing gradual extrusion of semiconductor manufacture into the
third dimension, giving more scope for parallel computing. My (very
limited, non-expert) understanding is this is held in check by heat
dissipation concerns, but it nonetheless may buy us an order of
magnitude or more

+ Whatever remains to be eked out in chip manufacture

+ Economic incentives: at the moment only a few organizations will pay
more than few thousand dollars to train a network; in the future, I
won't be surprised if many organizations are willing to pay many
millions of dollars. This isn't strictly relevant to the "per unit
cost" argument, but as a practical matter it will work in favour of
the argument in "The Bitter Lesson"

So: yes, there will be a gradual slowing of Moore's Law, and this will
lessen the force of the Bitter Lesson. But it will remain a strong
force for several decades.

# Conclusions

We've taken the pleasing clarity of Sutton's essay and turned it into
a much vaguer "well, it depends".  That's rarely satisfying! It's
tempting to conclude that one should be flexible, and leave it at
that, having learned little. But Sutton points out that while in
practice one might try to use both strategies flexibly, in practice
there are psychological and expertise-related reasons it may be easier
to pick one or the other:

> These two need not run counter to each other, but in practice they
> tend to. Time spent on one is time not spent on the other. There are
> psychological commitments to investment in one approach or the
> other. And the human-knowledge approach tends to complicate methods
> in ways that make them less suited to taking advantage of general
> methods leveraging computation.

Gwern Branwen [makes a similar
point](https://www.gwern.net/Scaling-hypothesis), but at the level of
organizational strategy. In particular, he gives OpenAI (OA, in his
account) as an example of an organization which has placed a very
strong bet on compute-heavy approaches. They're taking the Bitter
Lesson *very* seriously! This has implications for how and who they
hire, for internal organization, and for their business model as a
whole:

> OA, lacking anything like DM’s long-term funding from Google or its
> enormous headcount, is making a startup-like bet that they know an
> important truth which is a secret: “the scaling hypothesis is true!”
> So, simple DRL algorithms like PPO on top of large simple
> architectures like RNNs or Transformers can emerge, exploiting the
> blessings of scale, and meta-learn their way to powerful
> capabilities, enabling further funding for still more compute &
> scaling, in a virtuous cycle. This is why OA had to revise its
> corporate form: lacking any enormous endowment or extremely
> deep-pocketed patron like Google, where does it get the money to
> scale (or hire machine learning engineer/researchers who can command
> salaries in the millions)? OA has to earn the necessary money, so in
> a move like Mozilla Foundation owning Mozilla Corporation (to sell
> Firefox search engine placement), or the Hershey orphanage owning
> Hershey Chocolate or the Girl Scouts licensing their cookies, OpenAI
> switched from a pure nonprofit funded by donations to a nonprofit
> which owns a for-profit subsidiary/startup, “OpenAI LP”, which can
> take investments and engage in for-profit activities. OA LP, while
> controlled by OA, can then shoot for the moon. And if OA is wrong to
> trust in the God of Straight Lines On Graphs⁠, well, they never could
> compete with DM directly using DM’s favored approach, and were
> always going to be an also-ran footnote, so they have no regret.

Alright, here's a few tentative conclusions. Much less sharp than the
Bitter Lesson, alas:

+ Humans are (quite reasonably!) attached to understanding things from
first principles. This causes them to mistakenly confuse "I would
enjoy trying to understand this problem, and then program a solution"
with "this is the best way to attack the problem".  Gradient descent,
as [Andrej Karpathy has
noted](https://twitter.com/karpathy/status/893576281375219712), is
often a better programmer than you.

+ At the same time, we often understimate the benefits of Moore's Law
as a force making compute-heavy search-and-learning methods simply
improve, as if by magic. This is likely to continue for several more
decades, albeit gradually getting slower and slower. At some point the
shoe may well be on the other foot.

+ Hybrid approaches often seem better than either pure approach.  But
the teams making the hybrids often seem to involve people who've taken
relatively pure approaches (in both directions) in the past.  

+ I think it's a mistake to expect to reason about this from first
principles and arrive at reliable conclusions. The Bitter Lesson is a
heuristic model and set of arguments to keep in mind, not a reliable
argument that applies in all circumstances. You need to proceed
empirically.  Keep the Bitter Lesson in mind, yes, but also keep in
mind that your OS wasn't produced by training TPUs for a decade.  

*Acknowledgements:* Thanks to everyone who commented on Twitter and
elsewhere about this. The above was written mostly in response to
comments by Gwern Branwen, Kyle Cranmer, Moritz Gedig, Tim Gowers,
Paul Graham, Josh Horowitz, Adam Marblestone, Andy Matuschak, Jed
McCaleb, Jason Palmer, and Danilo Rezende.  And, of course, thanks to
Rich Sutton for his stimulating essay!