---
layout: post
title:  "What does the quantum state mean?"
date:   2018-12-13
permalink: /qm-interpretation
---
By <a href="http://michaelnielsen.org">Michael Nielsen</a>, December
2018

> _We have always had a great deal of difficulty understanding the_
> _world view that quantum mechanics represents. At least I do, because_
> _I'm an old enough man that I haven't got to the point that this_
> _stuff is obvious to me. Okay, I still get nervous with it.... You_
> _know how it always is, every new idea, it takes a generation or two_
> _until it becomes obvious that there's no real problem. I cannot_
> _define the real problem, therefore I suspect there's no real_
> _problem, but I'm not sure there's no real problem._ &ndash; Richard Feynman

In popular articles about quantum computing it's common to describe
qubits as having the ability to "be in both $|0\rangle$ and
$|1\rangle$ states at once", and to say things like "quantum computers
get their power because they can simultaneously be in exponentially
many quantum states!"

I must confess, I don't understand what such articles are talking
about.

What seems to be implied &ndash; it's rarely spelled out, although
some accounts come close &ndash; is that quantum computers work by
preparing a superposition $\frac{1}{\sqrt 2^n} \sum_x
|x\rangle|f(x)\rangle$, with $x$ varying over possible solutions to
the problem &ndash; maybe it's tours in a travelling salesman problem.
And $f(x)$ is some associated quantity of interest, such as the
distance through the tour. Then, somehow, voila!, you get to read out
the desired answer $f(x)$ from the quantum computer.

The only trouble is that this is <a
href="https://arxiv.org/abs/quant-ph/9701001">provably impossible to
do in general, or even just in typical cases</a>. 

What I think is going on is this: when people remark that the state
$\sqrt{0.6}|0\rangle+\sqrt{0.8}|1\rangle$ is simultaneously $0$ and
$1$, they're trying to explain the quantum state in terms of classical
concepts they're already familiar with. That sounds sort of okay at
first, and fills a vacuum of meaning for people unfamiliar with
quantum mechanics. But the more you think about it, the worse things
get. Saying $\sqrt{0.6}|0\rangle+\sqrt{0.8}|1\rangle$ is
simultaneously $0$ and $1$ makes about as much sense as Lewis
Carroll's nonsense poem _Jabberwocky_:

> ’Twas brillig, and the slithy toves<br> &nbsp;&nbsp;&nbsp;&nbsp; Did
> gyre and gimble in the wabe:<br> All mimsy were the borogoves,<br>
> &nbsp;&nbsp;&nbsp;&nbsp;And the mome raths outgrabe. <br> &hellip;

I call the implied way of thinking the "word salad interpretation of
quantum mechanics". The main (sole?) virtue of the word salad
interpretation is that it does fill a vacuum of meaning. Because it is
a genuinely good question: what does the quantum state mean?

For me, it's also a deeply uncomfortable question. I genuinely don't
know the answer, despite having spent tens of thousands of hours
thinking about quantum mechanics. And I cannot, with conviction, tell
you what the quantum state means. It's frankly a pretty strange
situation.

Now, there are some people who will very confidently tell you that
they "know" the correct way to think about the quantum state. Trouble
is, different people will tell you different things! That includes
deeply knowledgeable experts on quantum mechanics. Individually, each
can sound pretty convincing. But when you get them together in a room,
the result is sometimes some pretty unpleasant conflagrations. I've
seen physicists shout at one another over the issue, on more than one
occasion.

I'm not alone in my discomfort with the question. A lot of physicists
respond to this discomfort with a sort of reserved agnosticism. A
pretty common approach is what the physicist David Mermin dubbed the
"shut-up-and-calculate interpretation of quantum mechanics".

In the shut-up-and-calculation interpretation, you think of the
quantum state as a calculational device. At most you have a sort of
vague meaning in mind, perhaps thinking of the quantum state as being
a bit like a probability distribution over states, but satisfying
slightly different mathematical rules (different for reasons that are
never made quite clear). You become fluent in those mathematical
rules, and use them to solve lots of different problems. Gradually,
you build up a library of higher-order tricks and intuitions,
understanding emergent rules hidden inside the rules of quantum
mechanics &ndash; ideas like quantum teleportation, or the no-cloning
theorem, for instance. It's a very instrumental way of making meaning
of the quantum state.

As a practical matter, and for students starting out, I'm pretty
sympathetic to adopting the shut-up-and-calculate interpretation, at
least most of the time. It builds up many handy skills, as well as
intuition about how quantum mechanics work. That's extremely useful
background when investigating interpretational issues.

Why does the meaning of the quantum state matter? Sure, maybe people
would feel better if they had a way of interpreting the quantum state
beyond it being a calculational device. But maybe that's just an
irrelevant human prejudice. Nature doesn't need to conform to our
prejudices! But I think there's a genuine problem here, beyond our
prejudices about what our theories should look like. Quantum mechanics
isn't a final theory. We don't have a convincing understanding of the
measurement process in quantum mechanics. Nor do we have a convinving
quantum theory of gravity. And maybe those problems are connected to
having a better understanding what the quantum state means. In which
case having a better understanding of the quantum state may help in
solving those other problems.

I attributed the term "shut-up-and-calculate" to David Mermin. Mermin
is one of the deepest thinkers about interpretational issues, and he
certainly didn't intend the term as a compliment! But despite that,
I'm somewhat sympathetic to shut-up-and-calculate not just as a
practical strategy, but also as a strategy for (eventually) better
understanding quantum states.

In particular, the situation reminds me of the study of human
consciousness.  Many scientists and philsophers spend a great deal of
time pondering consciousness, writing about the "hard problem of
consciousness" and so on. In the meantime, there's an army of
scientists doing very plain nuts-and-bolts experiments, trying to
understand all the myriad details of action potentials, neural
circuits, and so on. I suspect the latter group will ultimately make
far more contribution to our understanding of consciousness than the
former. Sometimes, when you solve enough tiny problems the big
problems just melt away. And I wonder if the same will be true of the
meaning of the quantum state, that we'll understand it by gradually
building up our detailed knowledge of quantum mechanics, and
eventually understand things like the interpretation of the quantum
state almost _en passant_. If that's the case, then the current lack
of a universally-agreed upon interpretation is a nuisance, and
regrettable, but no more.

My own current preference is thus for the this-is-an-open-problem
interpretation of quantum mechanics: I think we don't yet have enough
evidence to know, and won't for decades. I know some readers will
dislike this: they'd much prefer if I shouted with conviction that the
right way to interpet the quantum state is &hellip; But I don't know,
and I don't think anyone else does either. Or, failing that, they'd
like me to say how I think we might get to such an interpretation. I
do have opinions on that, but will omit them in the interests of
brevity.

Will all that said, there are people who've thought long and hard
about the meaning of the quantum state, and who do have definite
opinions about the right way to think about it. As a starting point, I
recommend reading <a href="/assets/qm-interpretation/Everett.pdf">Hugh
Everett</a> and <a
href="https://www.amazon.com/Fabric-Reality-Parallel-Universes-Implications/dp/014027541X">David
Deutsch</a> on the many-worlds interpretation of quantum mechanics; <a
href="https://arxiv.org/abs/quant-ph/0205039">Chris Fuchs</a> on the
idea that the quantum state is a state of knowledge; <a
href="/assets/qm-interpretation/Bohm1952.pdf">David Bohm</a> on the
idea that it's a sort of pilot wave, guiding particles in the
system. And, although it's not exactly an interpretation of the
quantum state, I like <a
href="/assets/qm-interpretation/Feynman.pdf">Richard Feynman's</a>
paper recasting quantum mechanics in terms of (sometimes negative!)
probability distributions, rather than quantum states.  Those are just
a few ideas, to give you a sample of some of the (very different)
ideas out there. Many more points of view have been put forward!  Be
aware that many of these people disagree (or disagreed, while alive)
strongly with one another. Don't necessarily expect to solve the
problem yourself &ndash; although maybe you will make some
contribution. And do come back to just plain working with the theory,
boots on the ground. No matter how you think about the quantum state,
quantum mechanics is a beautiful theory, and remarkably fun to work
with.

### Addendum 

I wrote this essay with some trepidation. The interpretation of the
quantum state arouses strong passions and, for some reason, seems to
inspire people who know little of quantum mechanics to very strong
convictions. (It reminds me of cryptocurrencies in that regard.)  The
computer scientist Richard Lipton has <a
href="https://rjlipton.wordpress.com/2009/11/04/on-mathematical-diseases/">described</a>
a number of _mathematical diseases_ (a term he atttributes to Frank
Harary). These are mathematical problems that people find extremely
difficult to let go once they've started working on them, even when
they're really not making any progress. The interpretation of the
quantum state is perhaps accurately described as a physicist's
disease. It's seductive, deep, and fundamental, seeming to yield to
progress, but always remaining just tantalizingly out of reach.  I
know I'll get messages telling me I'm wrong or ignorant (or people
will post that on social media), that the messager knows the right way
to think.  The trouble is, except when talking with real experts, I've
rarely learnt much from such conversations, no matter how confident
the person.  Richard Feynman supposedly often told people who wanted
to talk about such issues that he had "Doctor's orders not to talk
about metaphysics". It's perhaps understandable.

This essay is a preliminary draft version of some material to be
included in a larger project (joint with Andy Matuschak). My thinking
will almost certainly change! In particular, in this draft I've really
pushed on the agnosticism and shut-up-and-calculate angle. It is, of
course, tempting to get into the details of different
interpretations. The pull of physicist's disease is strong! But just
maybe we can make some progress &hellip;

### Citation and licensing

_In academic work, please cite this as: Michael A. Nielsen, "What does
the quantum state mean?",
http://cognitivemedium.com/qm-interpretation, 2018._

_This work is licensed under a Creative Commons
Attribution-NonCommercial 3.0 Unported License. This means you're free
to copy, share, and build on this essay, but not to sell it. If you're
interested in commercial use, please contact me._

