---
layout: post
title:  "In what sense is quantum computing a science?"
date:   2018-12-12
permalink: /qc-a-science
---

By <a href="http://michaelnielsen.org">Michael Nielsen</a>, December
2018

> _In natural science, Nature has given us a world and we're just to_
> _discover its laws. In computers, we can stuff laws into it and_
> _create a world._ &ndash; Alan Kay

Quantum computing originated in the 1980s with several papers that
received little fanfare at the time. Even by the mid-1990s, mentioning
quantum computing to a physicist usually resulted in the question:
"What's a quantum computer?"  Answers would often then be greeted
with: "Isn't that engineering?  What's it got to do with physics?"

Sometimes, these questions were asked with a large dollop of
chauvinism, implying that engineering is somehow &ndash; it was never
quite explained how &ndash; a pursuit inferior to physics. But remove
that chauvinism and there's still an interesting underlying question:
in what sense (if any) can quantum computing be considered a science?
And will it lead to the understanding of important new fundamental
truths about the universe?

The roots of these questions go back much further than quantum
computing.  They're reflective of some broad questions described in
Herbert Simon's book <a
href="https://www.amazon.com/Sciences-Artificial-3rd-Herbert-Simon/dp/0262691914">The
Sciences of the Artificial</a>.

Historically, the earliest sciences studied the natural world:
astronomy, physics, chemistry, and biology.  Each took extant natural
systems, and tried to uncover the underlying ideas.  But many more
recent sciences study systems made by humans. Examples include
computer science, linguistics, synthetic biology, and economics. While
the corresponding systems were made by humans, they have an
extraordinary, rich structure, unanticipated by the humans who made
them. What Simon means by the sciences of the artificial is the
discovery of this structure, i.e., the discovery of deep ideas and
principles such as the invisible hand, comparative advantage,
public-key cryptography, and so on.

This notion of the sciences of the artificial is particularly striking
in the case of computer science, which <a
href="https://www.theatlantic.com/science/archive/2018/11/diminishing-returns-science/575665/">began
with its theory of everything</a>, but which has flourished as we
study the emergent consequences of that theory:

> [C]omputer science began in 1936 when Alan Turing developed the
> mathematical model of computation we now call the Turing
> machine. That model was extremely rudimentary, almost like a child’s
> toy. And yet the model is mathematically equivalent to today’s
> computer: Computer science actually began with its “theory of
> everything.” Despite that, it has seen many extraordinary
> discoveries since: ideas such as the cryptographic protocols that
> underlie internet commerce and cryptocurrencies; the never-ending
> layers of beautiful ideas that go into programming language design;
> even, more whimsically, some of the imaginative ideas seen in the
> very best video games.

I've used the term _emergent_ here, a term going back to a famous 1972
article by Phil Anderson, entitled "More is Different".  Anderson
argued for the now-commonplace <a href="#Anderson">(1)</a> point that
there may be many levels of behaviour in systems, with each new level
giving rise to deep new ideas.  Just because you know the equations
governing a water molecule does not mean you will understand the
principles governing the crash of ocean waves, or the way a rainbow
arcs across the sky. Anderson's own field of condensed matter physics
is a fount of examples of emergence, such as superconductivity,
superfluidity, and Bose-Einstein condensation. In each case, there are
multiple emergent levels of behaviour, and beautiful ideas to be
discovered at each level.

A different, though parallel, way of looking at the sciences of the
artificial is as examples of what Simon calls _design science_ <a
href="#designscience">(2)</a>.  Design sciences are about the
invention of new types of object with new types of behaviour.
Examples of such invention range widely: arabic numerals (in
mathematics); the stealth fighter (in aeronautics); the notion of a
layer in software such as _Illustrator_ (in user interface design);
and homoiconicity (in programming language design).  The essence in
each case is that of a new type of object, with new kinds of
behaviour.

A challenge in describing what is meant by a design science is that
examples of genuinely new types of object and behaviour are rarely
clearcut. Arabic numerals drew on earlier numeral systems which
introduced ideas like a place-number system. The first stealth
fighters drew on earlier generations of fighters, some of which
attempted to reduce their radar cross section. And so on.  Still, the
stealth fighter was a fundamentally new type of object in that
"invisible on radar" was a primary property. And anyone who has ever
tried to muliply numbers represented in roman numerals won't need much
convincing that arabic numerals are fundamentally different.

In physics, an example of this design science approach is <a
href="https://www.sciencedirect.com/science/article/pii/S0003491602000180">Kitaev's
notion</a> of a topological quantum computer.  This is one of the most
radical new ideas of the past hundred years. Rather than building a
computer out of component parts, the aspiration is to create a novel
phase of matter that wants to compute. Fluids want to flow; solids
want to maintain a stable shape; topological quantum computers want to
compute. Indeed, not only do they want to compute, they want to
quantum compute, and to do so in a way that protects the quantum state
against the effects of noise!

Up to now, physics has for the most part not been a design science.
But my guess is that's going to change in the coming decades.  There
are more and more examples where design seems the right way to think:
topological quantum computers; new designer phases of matter; the <a
href="https://arxiv.org/abs/gr-qc/0009013">Alcubierre warp drive</a>
and other designer spacetimes; constructor theory and universal
constructors; programmable matter and utility fog. These are not just
about emergence, traditionally construed. Rather they're about
designing to a target. Indeed, not just to target, but conceiving of
entirely new types of target, often even more radical than notions
like a stealth fighter or a homoiconic programming language.

I said above that design sciences are about the "invention" of new
types of object. When writing that sentence I equivocated between
using the term "invention" and the term "discovery". Neither is quite
right. Invention is accurate in the sense that it's a creation of the
human mind. But it's a discovery in the sense that it seems as though
it's a pre-existing property of the universe.  Topological quantum
computers, homoiconicity, stealth, arabic numerals, even the idea of
layers: all have a depth and unitary quality that makes it hard to see
them entirely as _ad hoc_ inventions. It's true that many details are
_ad hoc_: the specifics of arabic numerals are obviously not
universal! But if we meet aliens I won't be surprised to find that
they've discovered (and perhaps superseded) many of the same ideas
used in the arabic numerals. Indeed, I won't be surprised if they've
also discovered homoiconicity, topological quantum computing, and
perhaps even something like our conceptions of stealth and the idea of
layers.

So, to come back to the question with which I started: in what sense
is quantum computing a basic science? And in what sense is it about
discovering important new fundamental truths about the universe?

I think the answer is that quantum computing will be in considerable
part a design science <a href="#notjustdesignscience">(3)</a>. That
is, it'll be about discovering new types of object and behaviour.
This is a point of view that is perhaps unusual, even
idiosyncratic. It will take many decades to tell if I am correct. But
I believe it's a stimulating point of view, and likely to be correct.

What would it mean for quantum computing to be a design science? We
can get some small insight by asking: how does one invent something
like the arabic numerals? Or concepts like homoiconicity, or layers?
The heuristics of discovery used by the designers behind these are
radically different than the traditional ways physicists
work. Physicists often work from the bottom up, understanding simple
systems, or putting things together in "natural" ways (e.g., by
cooling materials down or heating them up). Routine design work is
somewhat similar, taking extant elements and combining them in
standard ways. But the deepest types of imaginative design are very
different, creating fundamentally new types of objects and new types
of behaviour. I won't try to enumerate the heuristics behind that kind
of work here (though see <a
href="http://cognitivemedium.com/tat/index.html">my earlier essay<a>).
But it's a very different kind of work than traditional physics.

This point of view contrasts with the conventional point of view that
says quantum computing will mostly be about finding fast new
algorithms. Certainly, it will _in part_ be about finding new
algorithms. But I don't think it's likely to just or even primarily be
about algorithms, any more than classical computing has been. Indeed,
I believe the design of new prototocols and new interfaces &ndash; the
invention of new types of object and behaviour &ndash; has been much
more important in classical computing. And so, perhaps, it may
ultimately be for quantum computing.

*Critical Addendum:* _This is a draft written as part of writing a
much longer essay covering a wider array of quantum topics. In that
sense it's been written as a sort of version 0, with a (hopefully
improved) version 1 to be included in the longer essay. My main
critique of the current draft is that it struggles to adequately
convey what it would mean for quantum computing to be a design
science. The notion of designing radically new classes of object and
behaviour hasn't made it into popular culture in any really deep way,
and it certainly isn't part of the culture of physics.  Perhaps what's
need to make the essay work is a longer discussion &ndash; or, at
least, a better discussion!  &ndash; of what it would mean for quantum
computing to be a design science._
	
<a name="Anderson"></a> (1) I presume this broad point of view wasn't
novel when Anderson wrote his article. Still, Anderson crystallized
the point of view, and provided some beautiful examples and useful
terminology.  So it seems reasonable to attribute to his article.

<a name="designscience"></a> (2) My notion of what a design science is
has changed considerably since reading Simon, influenced particularly
by the work of Bret Victor and Lev Vygotsky. Rather than revert to
Simon's definition, the description that follows is my own current way
of thinking.

<a name="notjustdesignscience"></a> (3) Of course, it won't just be a
design science. Quantum computing has also stimulated lines of enquiry
leading to new work about black holes and quantum gravity.  The desire
to build quantum computers has stimulated a tremendous amount of work
understanding how many different types of physical system work, and
how to control them. And once quantum computers have been built, they
will be exceptionally useful as tools of understanding, just as
conventional computers have been. All these activities are science,
and don't fall squarely under the rubric of design science. Still, as
implied in the main text, over the long run I expect quantum computing
will primarily be a design science, in much the same way as
conventional computing has become a design science.

_In academic work, please cite this as: Michael A. Nielsen, "In what
sense is quantum computing a science?",
http://cognitivemedium.com/qc-a-science, 2018._

_This work is licensed under a Creative Commons
Attribution-NonCommercial 3.0 Unported License. This means you're free
to copy, share, and build on this essay, but not to sell it. If you're
interested in commercial use, please contact me._
