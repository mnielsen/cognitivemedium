---
layout: post
title:  "Why does F = ma?"
date:   2019-11-23
permalink: /f-ma
---

By <a href="http://michaelnielsen.org">Michael Nielsen</a>, November
23, 2019

**Note:** *Rough working notes, me thinking out loud. Thoughtful,
well-informed further ideas and corrections welcome.*

The laws of physics don't need justification, they just are. In that
sense, &ldquo;why does _F = ma_?&rdquo; is a ridiculous
question. Certainly, it can't be proved, it's not a mathematical
theorem, or in any sense inevitable. Indeed, it's easy to imagine
universes in which _F = ma_ is not true: we live in such a universe,
since _F = ma_ only arises as an approximation to a deeper quantum
mechanical reality.

Nonetheless, there's a sense in which &ldquo;why does _F = ma_?&rdquo;
is a stimulating question. It's a challenge to deepen one's
understanding of Newton's second law of motion, and to understand how
the universe would be different if we replaced the second law by
something else.

As a student, Newton's second law bugged me. Physicists often seemed
to use it almost tautologically, as a definition of what a force was.
I wondered if there was any non-tautological, non-trivial physical
content? Or was it really just a definition? Of course, it turns out
there is deep physical content, but it's left implicit in many
discussions of Newton's second law. Let's make it more explicit.

(Incidentally, the equation in Newton's second law isn't _F = ma_, but
rather the more subtle statement that force is equal to the rate of
change of momentum of a body. When the mass isn't changing, that
reduces to _F = ma_, and that's the form I'll discuss here.)

One way to get insight into the second law is to consider
variations. How would the world be different if instead of _F = ma_,
we instead had _F = mv_, that is, force is equal to mass times
velocity?  Or perhaps _F = mj_, where _j_ is the &ldquo;jerk&rdquo;,
the third derivative of position. Is there some reason Newton's law
involves the second time derivative of position, rather than the first
or the third (or some more exotic) derivative?

There's a conventional answer to this question. The key to this answer
is that if we take some fixed configuration of (say) gravitating
bodies, and then consider a test particle, its subsequent motion: (a)
is completely determined by its initial position and velocity; but (b)
the initial position and velocity are free variables which can be
changed relatively easily.

So, for instance, you can't have _F = mv_, because that would mean the
initial velocity would be entirely determined by the configuration of
surrounding matter. It would actually be _impossible_(!) for us to set
the velocity of (for instance) a projectile. But in practice we find
that initial velocities are things which we have a lot of freedom to
adjust. So _F = mv_ is ruled out.

In more mathematical terms: suppose we believe the motion of a test
particle is completely determined by its initial position and
velocity, but also that those quantities are free variables which we
can choose. If we know just a little about differential equations this
suggests some kind of second-order differential equation must be
controlling the behavior of the particle. In particular, the
acceleration of the test particle should somehow be a function of the
other configuration of matter. _F = ma_ is very nearly the simplest
equation we can imagine of this form; the mass is the only slightly
unexpected feature in the equation.

This is a pretty conventional story. It's one I remember reading in
textbooks as a student. It has some insight worth remembering, but
it's wrong in important ways. For one thing, test particles _don't_
all behave in the same way. Two test particles with the same initial
position and velocity, but different electric charges, can behave
quite differently in the same electric field.

One possible response is to say &ldquo;oh, maybe our notion of force
should really be something like _F = mj_, where _j_ is the jerk, i.e.,
the third derivative of position&rdquo;.

I've never worked it out in detail, but wouldn't be surprised if such
an approach can be made to work. Essentially, it'd make acceleration
into a free (possibly constrained) parameter of the particle, rather
than something completely determined by the distribution of matter and
fields. That free parameter would implicitly contain what (in the
conventional approach) we think of as the charge information. Indeed,
the new equations of motion would have a conserved quantity,
corresponding to the charge. But the resulting force laws would be
quite a bit uglier.

(Actually, if we ever saw a situation in nature where charges seemed
to change over time, this jerk-based approach might be worth
exploring!)

So what then really is the content of Newton's second law?

The right-hand side of _F = ma_ is at least moderately clear, though
it bears more examination.

But the left-hand side, the very notion of a force, is subtle
indeed. There's an underlying implicit set of assertions: matter
produces forces on test particles; those forces control the behavior
of the test particles; those forces can be computed as a reasonably
simple universal function of the configuration of matter and fields,
notably of positions, velocities, and charges.

(Just to make the last assertion more concrete: Newton's law of
gravitation, for instance, asserts that you can compute the force on a
test particle as the integral over mass density throughout the
universe, in accord with the inverse square law. And, of course, other
people have figured out other ways of computing force as a function of
the distribution of matter and fields.)

None of these implicit assertions has anything _a priori_ to do with
_ma_. Rather, they're a remarkable set of assertions about how we
should describe nature. And they're all implicitly part of the content
of the second law, though often not so explicitly stated. If these
things weren't true, the second law wouldn't be a useful statement;
indeed, no-one would ever have heard of it.

Putting it in somewhat fuzzier terms, and at the risk of repeating
myself: _F = ma_ derives its power from the (implicit) assertion that
there is a simple unversal force law that lets us figure out _F_ for a
particular configuration of matter. And so the configuration of matter
completely determines the acceleration of a test particle. There is no
_a priori_ reason this ought to be true. It's an absolutely incredible
fact of nature.

Let's condense our observations into a single paragraph: a reasonable
answer to &ldquo;why does _F = ma_?&rdquo; is: the behavior of test
particles is somehow determined by a quantity which we'll call a
&ldquo;force&rdquo;. This force is a simple function of the
configuration of matter and fields, notably of the positions,
velocities and charges of all particles. In practice, we find it's
possible to change the initial position and velocity of test
particles, without changing the rest of the matter configuration. But
it doesn't seem so easy to change the initial acceleration, without
changing the rest of the matter configuration. That suggests the force
should somehow determine the acceleration. At this point, _F = ma_
seems a good candidate law of motion.

Personally, I find this all a very helpful line of thought. Of course,
there's still much that's mysterious. For instance, I haven't said
anything about why _m_ appears in the second law, or even where the
notion of mass comes from. Of course, mass is very familiar to us from
childhood, and so seems innocuous, but it's an incredibly deep and
subtle idea. What's it doing in the second law? If _F_ is a universal
function, then _m_ is almost like a resistance, something that makes a
test particle respond less to the applied force. It's remarkable this
is a fixed constant for particles in nature.

A fun question: how does the universe change if the mass isn't a
scalar, but rather is a matrix, and so _a = m<sup>-1</sup>F_ is the
acceleration? What would this world look like? Is it plausible?

Another fun question: how does the universe change if _F = mw_, where
_w_ is a fractional time derivative of position? Say, for instance,
the 1.5th time derivative of position. Is there any sensible
formulation of (classical) physics where this kind of thing can be
used as a law of motion?

And one more fun question: is there any connection to evolutionary
psychology?  Human beings can see (and manipulate) the position and
velocity of everyday objects quite well; much, much better than they
can see the acceleration. People routinely get the _sign_(!) wrong
when estimating acceleration; it's hard to imagine that happening for
velocity, outside of rather contrived circumstances. Is there some
evolutionary reason for this, connecting Newton's law to facts about
our nervous system?

Of course, it's possible to deepen our thinking much further. We can
start to think about _F = ma_ as a consequence of the Euler-Lagrange
or Hamilton's equations; or as a consequence of the Schroedinger
equation, or of Feynman's sum-over histories approach to
physics. Indeed, I suspect it is possible to in some sense deduce the
second law of motion from thermodynamics. (Cf the work by Ted Jacobson
on the Einstein field equations as [equations of state](https://arxiv.org/abs/gr-qc/9504004 ), and more
recent followups). And we can think much more deeply about notions
like &ldquo;test particles&rdquo;, or what reference frame to measure
acceleration in. And so on &ndash; a panoply of great questions!
Newton's laws are incredibly deep.

An interesting feature of the discussion above is that it's written
for people already familiar with Newton's laws. It takes as given a
lot of pre-existing intellectual structure. I assume you have a basic
comfort with differential equations, with test particles, with
gravitating bodies, with acceleration, and so on. That's a huge amount
of background. And then we leave most of it fixed, and poke hard in a
few places, seeing what happens when you change those things around,
but leave most of the intellectual edifice unchanged.

This is a good strategy for building insight, if you're already
knowledgeable about a theory. But it's likely not so helpful for
newcomers.  Perhaps this is why these questions weren't discussed in
my introductory physics classes! It'd be fun to find an approach that
also works for newcomers. The notion of universal force laws is one of
the most beautiful and audacious ideas humans have ever developed.

Perhaps one approach could be to write a piece of discovery fiction
explaining how the second law could have come to be discovered. I find
it truly remarkable just _how much_ Newton and his contemporaries
needed to get right. There's so many different, subtle ideas; each
needs to sit in the right relationship to the others. It's remarkable
they were able to bootstrap them all collectively into a useful form.

Finally, let me emphasize that, considered as a theory of physics,
Newton's laws are wrong. At best they're an approximation to certain
parts of a theory we hope may be correct, quantum mechanics. I find it
astounding that a theory like quantum mechanics can have inside it
another theory, an approximation, also extremely beautiful
mathematically, but radically different. It's like taking Bach, adding
some noise, and getting the best of the Beatles out. I wish I
understood better why this can happen.

*Acknowledgments:* Many thanks to David Chapman and Andy Matuschak for
the conversation which instigated this essay.

Please [help support my work on Patreon](https://www.patreon.com/quantumcountry), and
please [follow me on Twitter](https://twitter.com/michael_nielsen).
