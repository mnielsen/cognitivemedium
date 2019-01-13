---
layout: post
title:  "Using spaced repetition systems to see through a piece of mathematics"
date:   2019-01-12
permalink: /srs-mathematics
---

<script type="text/x-mathjax-config">
MathJax.Hub.Config({
tex2jax: {inlineMath: [['$','$']]},
"HTML-CSS": 
{scale: 92},
TeX: { equationNumbers: { autoNumber: "AMS" }}});
</script>
<script type="text/javascript" src="../emm/mathjax/MathJax.js?config=TeX-AMS-MML_HTMLorMML"></script>
	
By <a href="http://michaelnielsen.org">Michael Nielsen</a>, January 2019

What does it mean to understand a piece of mathematics? Naively, we
perhaps think of this in relatively black and white terms: initially
you don't understand a piece of mathematics, then you go through a
brief grey period where you're learning it, and with some luck and
hard work you emerge out the other side "understanding" the
mathematics.

In reality, mathematical understanding is much more nuanced. My
experience is that it's nearly always possible to deepen one's
understanding of any piece of mathematics. This is even true &ndash;
perhaps especially true &ndash; of what appear to be very simple
mathematical ideas.

I first really appreciated this after reading an essay by the
mathematician Andrey Kolmogorov. You might suppose a great
mathematician such as Kolmogorov would be writing about some very
complicated piece of mathematics, but his subject was the humble
equals sign: what made it a good piece of notation, and what its
deficiencies were. Kolmogorov discussed this in loving detail, and
made many beautiful points along the way, e.g., that the invention of
the equals sign helped make possible notions such as equations (and
algebraic manipulations of equations).

Prior to reading the essay I thought I understood the equals
sign. Indeed, I would have been offended by the suggestion that I did
not. But the essay showed convincingly that I could understand the
equals sign much more deeply.

This experience suggested three broader points. First, it's possible
to understand other pieces of mathematics far more deeply than I
assumed. Second, mathematical understanding is an open-ended process;
it's nearly always possible to go deeper. Third, even great
mathematicians &ndash; perhaps, especially, great mathematicians
&ndash; thought it worth their time to engage in such deepening.

(I found Kolmogorov's essay in my University library as a
teenager. I've unsuccessfully tried to track it down several times in
the intervening years. If anyone can identify the essay, I'd
appreciate it. I've put enough effort into tracking it down that I
must admit I've sometimes wondered if I imagined the essay. If so, I
have no idea where the above story comes from.)

How can we make actionable this idea that it's possible to deepen our
mathematical understanding in an open-ended way? What heuristics can
we use to deepen our understanding of a piece of mathematics?

Over the years I've collected many such heuristics. In these notes I
describe a heuristic I stumbled upon a year or so ago that I've found
especially helpful (albeit time intensive).  I'm still developing the
heuristic, and my articulation will therefore be somewhat
stumbling. I'm certain it can still be much improved upon! But perhaps
it will already be of interest to others.

One caveat is that I'm very uncertain how useful the heuristic will be
to people with backgrounds different to my own. And so it's perhaps
worth saying a little about what that background is.  I'm not a
professional mathematician, but I was trained and worked as a
professional theoretical physicist for many years. As such, I've
written dozens of research papers proving mathematical theorems,
mostly in the field of quantum information and computation. Much of my
life has been spent doing mathematics for many hours each day. It's
possible someone with a different background would find the heuristic
I'm about to describe much less useful. This applies to people with
both much less and much more mathematical background than I have. 

It's also worth noting that my work mostly involves mathematics only
incidentally these days. I still do some mathematics as a hobby, and
occasionally as part of other research projects. But it's no longer a
central focus of my life in the way it once was. I suspect the
heuristic I will describe would have been tremendously useful to me
when mathematics was a central focus. But I'm honestly not sure.

The heuristic involves the use of _spaced-repetition memory
systems_. The system I use is a flashcard program called Anki.  You
enter flashcards with a question on one (virtual) side of the card,
and the answer on the other. Anki then repeatedly tests you on the
questions. The clever thing Anki does is to manage the schedule. If
you get a question right, Anki increases the time interval until
you're tested again. If you get a question wrong, the interval is
decreased. The effect of this schedule management is to limit the
total time required to learn the answer to the question. Typically, I
estimate total lifetime study for a card to be in the range 5-10
minutes.

I've described many elements of my Anki practice in a <a
href="http://augmentingcognition.com/ltm.html">separate essay</a>.
Reading that essay isn't necessary to understand what follows, but
will shed additional light on some of the ideas.  Note that that essay
describes a set of heuristics for reading papers &ndash; indeed, of
syntopically reading entire literatures &ndash; that are largely
orthogonal to the heuristic I'm about to describe. I find the
heuristics in that essay useful for rapidly getting a broad picture of
a subject, while the heuristics in this essay are for drilling down
deeply.

To explain the heuristic, I need a piece of mathematics to use as an
example.  The piece I will use is a beautiful theorem of linear
algebra. The theorem states that a complex normal matrix is always
diagonalizable by a unitary matrix.  The converse is also true (and is
much easier to prove, so we won't be concerned with it): a matrix
diagonalizable by a unitary matrix is always normal.

Unpacking that statement, recall that a matrix $M$ is said to be
normal if $MM^\dagger = M^\dagger M$, where $M^\dagger$ is the complex
transpose, $M^\dagger := (M^*)^T$. And a matrix is diagonalizable by a
unitary matrix if there exists a unitary matrix $U$ such that $M = U D
U^\dagger$, where $D$ is a diagonal matrix. 

(As shorthand, from now on I will use "diagonalizable" as shorthand to
mean "diagonalizable by a unitary matrix".)

What's lovely about this theorem is that the condition $MM^\dagger =
M^\dagger M$ can be checked by simple computation. By contrast,
whether $M$ is diagonalizable seems _a priori_ much harder to check,
since there are infinitely many possible choices of $U$ and $D$. But
the theorem shows that the two conditions are equivalent. So it
converts what seems like a search over an infinite space into simply
checking a small number of algebraic conditions. Furthermore, working
with diagonalizable matrices is often _much_ easier than working with
general matrices, and so it's extremely useful to have an easy way of
checking whether a matrix is diagonalizable.

Let me explain the proof. I shall explain it at about the level of
detail I would use with a colleague who is a mathematician or quantum
information theorist; people less comfortable with linear algebra may
need to unpack the proof somewhat.

There are two ideas in the proof.

The first idea is to observe that $MM^\dagger = M^\dagger M$ means the
length of the $j$th row of $M$ is equal to the length of the $j$th
column. It's easiest to see this for the first row and first column.
Suppose we write $M$ as

$$
M = \left[ \begin{array}{c} r \\ M' \end{array} \right]
$$

where $r$ is the first row and $M'$ is the remainder of the
matrix. Then the top-left entry in $MM^\dagger$ is:

$$
MM^\dagger = \left[ \begin{array}{cc} r r^\dagger & \cdots \\ \cdots & \cdots \end{array} \right].
$$

Similarly, suppose we write $M$ as:

$$
M = \left[ \begin{array}{cc} c & M'' \end{array} \right]
$$

where $c$ is the first column and $M''$ is the remainder of the
matrix. Then the top-leftmost entry in $M^\dagger M$ is:

$$
M^\dagger M = \left[ \begin{array}{cc} c^\dagger c & \cdots \\ \cdots & \cdots \end{array} \right].
$$

The normalcy condition $MM^\dagger = M^\dagger M$ then implies that $r
r^\dagger = c^\dagger c$, and thus the length of the first row $r$
must be the same as the length of the first column $c$.

The second idea in the proof is to observe that since $M$ is over the
algebraically complete field of complex numbers, the characteristic
equation $|M-\lambda I|=0$ has at least one solution $\lambda$ and so
there is an eigenvalue $\lambda$ and a basis in which $M$ can be
written:

$$
M = \left[ \begin{array}{cc} \lambda & \cdots \\ 0 & \cdots \end{array} \right].
$$

But we just saw that normalcy implies the length of the first column
is equal to the length of the first row, so the remaining entries of
the first row must be zero:

$$
M = \left[ \begin{array}{cc} \lambda & 0 \\ 0 & \cdots \end{array} \right].
$$

Recursively applying this to the bottom-right block in the matrix we
can diagonalize $M$.  That completes the proof.

Alright, so that's the proof. But that's not the end of the process. I
then use Anki to go much deeper into the proof; I'll call this the
(deep) Ankification process. This Ankification process works in
(roughly) two phases.

*Phase I: understanding the proof:* This involves multiple passes over
the proof. Initially, it starts out with what I think of as _grazing_,
picking out single elements of the proof and converting to Anki
cards. For instance, for the above proof, I have Anki cards like the
following:

_Q: If $M$ is a complex matrix, how is the top-left entry of $M
M^\dagger$ related to the first row $r$ of the matrix $M$?_

_A: It's the length $\\|r \\|^2$._

_Q: If $M$ is a complex matrix, how is the top-left entry of
$M^\dagger M$ related to the first column $c$ of the matrix $M$?_

_A: It's the length $\\|c \\|^2$._

I work hard to restate ideas in multiple ways. For instance, here's a
restatement of the first question above:

_Q: If $M$ is a complex matrix, why is the top-left entry of
$MM^\dagger$ equal to the length squared $\|r\|^2$ of the first row?_

_A: $$\left[ \begin{array}{c} r \\ \cdot \end{array} \right]
\left[ \begin{array}{cc} r^\dagger & \cdot \end{array} \right]
= \left[ \begin{array}{cc} \|r\|^2 & \cdot \\ \cdot & \cdot \end{array} \right] $$_

Indeed, I worked hard to simplify both questions and answers &ndash;
the just given question-and-answer pair started out somewhat more
complicated.  Part of this was some minor complexity in the question,
which I gradually trimmed down. The answer I've stated above, though,
is much better than in earlier versions. Earlier versions mentioned
$M$ explicitly (unnecessary), had more blocks in the matrices, used
$\cdots$ rather than $\cdot$, and so on.  You want to aim for the
minimal answer, displaying the core idea as sharply as
possible. Indeed, if it was easy to do I'd de-emphasize the matrix
brackets, and perhaps find some way of highlighting the $r$,
$r^\dagger$ and $\\|r\\|^2$ entries. Those are the thing that really
matters.

I can't emphasize enough the value of finding multiple different ways
of thinking about the "same" mathematical ideas.  Here's a couple more
related restatements:

_Q: What's a geometric interpretation of the diagonal entries in the
matrix $MM^\dagger$?_

_A: The lengths squared of the respective rows._

_Q: What's a geometric interpretation of the diagonal entries in the
matrix $M^\dagger M$?_

_A: The lengths squared of the respective columns._

_Q: What do the diagonal elements of the normalcy condition
$MM^\dagger = M^\dagger M$ mean geometrically?_

_A: The corresponding row and column lengths are the same._

What you're trying to do at this stage is learn your way around the
proof. Every piece should become a comfortable part of your mental
furniture, ideally something you start to really feel.  That means
understanding every idea in multiple ways, and finding as many
connections between different ideas as possible.

People inexperienced at mathematics sometimes memorize proofs as
linear lists of statements. A more useful way is to think of proofs is
as interconnected networks of simple observations. Things are rarely
true for just one reason; finding multiple explanations for things
gives you an improved understanding.  This is in some sense
"inefficient", but it's also a way of deepening understanding and
improving intuition. You're building out the network of the proof,
making more connections between nodes.

One way of doing this is to explore minor variations. For instance,
you might wonder what the normalcy condition $MM^\dagger = M^\dagger
M$ means on the off-diagonal elements. This leads to questions like
(again, it's useful to enter many different variations of this
question, I'll just show a couple):

_Q: What does the normalcy condition $MM^\dagger = M^\dagger M$ mean
for the $jk$th component, in terms of the rows $r_j$ and columns
$c_j$ of the matrix $M$?_

_A: The inner product $r_k \cdot r_j = c_j \cdot c_k$._

_Q: The normalcy condition $MM^\dagger = M^\dagger M$ implies $r_k
\cdot r_j = c_j \cdot c_k$ for rows and columns. What does this mean
for row and column lengths?_

_A: They must be the same._

(By the way, it's questions like these that make me think it helps to
be fairly mathematically experienced in carrying this Ankification
process out.  For someone who has done a lot of linear algebra these
are very natural observations to make, and questions to ask. But I'm
not sure they would be so natural for everyone. The ability to ask the
"right" questions &ndash; insight-generating questions &ndash; is a
limiting part of this whole process, and requires some experience.)

I've been describing the grazing process, aiming to thoroughly
familiarize yourself with every element of the proof.  This is useful,
but is also a rather undirected process, with no clear end point, and
not necessarily helping you understand the broader to structure of the
proof. I also impose on myself a set of aspirational goals, all
variations on the idea of distilling the entire proof to one question
and (simple) answer. The aim is to fill in the answers to questions
having forms like:

_Q: In one sentence, what is the core reason a (complex) normal matrix
is diagonalizable?_

And:

_Q: What is a simple visual representation of the proof that (complex)
normal matrices are diagonalizable?_

I think of these question templates as boundary conditions or forcing
functions. They're things to aim for, and I try to write questions
that will help me move toward answers. That starts with grazing, but
over time moves to more structural questions about the proof, and
about how elements fit together. For instance:

_Q: How many key ideas are there in the proof that complex normal
matrices are diagonalizable?_

_A: Two._

_Q: What are the two key ideas in the proof that complex normal
matrices $M$ are diagonalizable?_

_A: (1) Write $M$ in a basis where the first column is all zeroes
except the first entry; and (2) use the normalcy condition to argue
that row lengths are equal to column lengths._

The second card here is, in fact, too complicated &ndash; it'd be
better to refactor into two or more cards, separating the two ideas,
and sharpening the answers. In general, it's helpful to make both
questions and answers as atomic as possible; it seems to help build
clarity. That atomicity doesn't mean the questions and answers can't
involve quite sophisticated concepts, but they ideally express a
single idea.

In practice, as I understand the proof better and better the
aspirational goal cards change their nature somewhat.  Here's a good
example of such an aspirational card:

_Q: What is a simple visual representation of the reason that
(complex) normal matrices are diagonalizable?_

_A: $$\left[ \begin{array}{cc} \lambda   & r \\ 0 & \cdot \end{array} \right]
  \left[ \begin{array}{cc} \lambda^* & 0 \\ r^\dagger & \cdot \end{array} \right] =
  \left[ \begin{array}{cc} \lambda^* & 0 \\ r^\dagger & \cdot \end{array} \right]
  \left[ \begin{array}{cc} \lambda   & r \\ 0 & \cdot \end{array} \right]
  \,\, \Rightarrow \,\, |\lambda|^2+r^\dagger r = |\lambda|^2 \,\, \Rightarrow \,\, r = 0.
  $$_

This is pretty good &ndash; certainly, there's a sense in which it's
much better than the original proof! But it's still somewhat
complicated. What you really want is to feel every element (and the
connections between them) in your bones. Some substantial part of that
feeling comes by actually constructing the cards. That's a feeling you
can't get merely by reading an essay, it can only be experienced by
going through the deep Ankification process yourself. Nonetheless, I
find that process, as described up to now, is also not quite
enough. You can improve upon it by asking further questions
elaborating on different parts of the answer, with the intent of
helping you understand the answer better. I _haven't_ done this nearly
as much as I would like. In part, it's because the tools I have aren't
well adapted. For instance, I'd love to have an easy way of
highlighting (say, in yellow) the crucial rows and columns that are
multiplied in the matrices above, and then connecting them to the
crucial inference on the right. But while I can easily imagine
multiple ways of doing that, in practice it's more effort than I'm
willing to put in.

Another helpful trick is to have multiple ways of writing these
top-level questions. Much of my thinking is non-verbal (especially in
subjects I'm knowledgeable about), but I still find it useful to force
a verbal question-and-answer:

_Q: In one sentence, what is the core reason a (complex) normal matrix
is diagonalizable?_

_A: If an eigenvalue $\lambda$ is in the top-left of $M$, then
normalcy means $|\lambda|^2 + \\|r\\|^2 = |\lambda|^2$, and so the
remainder $r$ of the first row vanishes._

As described, this deep Ankification process can feel rather
wasteful. Inevitably, over time my understanding of the proof
changes. When that happens it's often useful to rewrite (and sometimes
discard or replace) cards to reflect my improved understanding. And
some of the cards written along the way have the flavor of exhaust,
bad cards that seem to be necessary to get to good cards. I wish I had
a good way of characterizing these, but I haven't gone through this
often enough to have more than fuzzy ideas about it.

A shortcoming of my description of the Ankification process is that I
cheated in an important way. The proof I wrote above was written
_after_ I'd already gone through the process, and was much clearer
than any proof I could have written before going through the process.
And so part of the benefit is hidden: you refactor and improve your
proof along the way. Indeed, although I haven't been in the habit of
rewriting the refactored proof after the Ankification process (this
essay is the first time I've done it), I suspect it would be a good
practice.

*The inner experience of mathematics:* As I reread the description of
Part I just given, it is rather unsatisfactory in that it conveys
little of the experience of mathematics one is trying to move
toward. Let me try to explain this in the context not of Anki, but
rather of an experience I've sometimes had while doing research, an
experience I dub "being inside a piece of mathematics". 

Typically, my mathematical work begins with paper-and-pen and messing
about, often in a rather _ad hoc_ way. But over time if I really get
into something my thinking starts to change. I gradually internalize
the mathematical objects I'm dealing with. It becomes easier and
easier to conduct (most of) my work in my head. I will go on long
walks, and simply think intensively about the objects of
concern. Those are no longer symbolic or verbal or visual in the
conventional way, though they have some secondary aspects of this
nature. Rather, the sense is somehow of working directly with the
objects of concern, without any direct symbolic or verbal or visual
referents. Furthermore, as my understanding of the objects change
&ndash; as I learn more about their nature, and correct my own
misconceptions &ndash; my sense of what I can do with the objects
changes as well. It's as though they sprout new affordances, in the
language of user interface design, and I get much practice in learning
to fluidly apply those affordances in multiple ways.

This is a very difficult experience to describe in a way that I'm
confident others will understand, but it really is central to my
experience of mathematics &ndash; at least, of mathematics that I
understand well. I must admit I've shared it with some trepidation; it
seems to be rather unusual for someone to describe their inner
mathematical experiences in these terms (or, more broadly, in the
terms used in this essay).

If you don't do mathematics, I expect this all sounds rather strange.
When I was a teenager I vividly recall reading a curious letter Albert
Einstein wrote to the mathematician Jacques Hadamard, describing his
(Einstein's) thought processes. I won't quote the whole letter, but
here's some of the flavor:

> The words or the language, as they are written or spoken, do not
> seem to play any role in my mechanism of thought. The psychical
> entities which seem to serve as elements in thought are certain
> signs and more or less clear images which can be "voluntarily"
> reproduced and combined... The above-mentioned elements are, in my
> case, of visual and some of muscular type. Conventional words or
> other signs have to be sought for laboriously only in a secondary
> stage, when the mentioned associative play is sufficiently
> established and can be reproduced at will.

When I first read this, I had no idea what Einstein was talking
about. It was so different from my experience of physics and
mathematics that I wondered if I was hopelessly unsuited to do work in
physics or mathematics. But if you'd asked me about Einstein's letter
a decade (of intensive work on physics and mathematics) later, I would
have smiled and said that while my internal experience wasn't the same
as Einstein's, I very much empathized with his description.

In retrospect, I think that what's going on is what psychologists call
<a
href="http://augmentingcognition.com/assets/Simon1974.pdf">chunking</a>. People
who intensively study a subject gradually start to build mental
libraries of "chunks" &ndash; large-scale patterns that they recognize
and use to reason. This is why some grandmaster chess players can
remember thousands of games move for move. They're not remembering the
individual moves &ndash; they're remembering the ideas those games
express, in terms of larger patterns. And they've studied chess so
much that those ideas and patterns are deeply meaningful, much as the
phrases in a lover's letter may be meaningful. It's why <a
href="https://www.youtube.com/watch?v=eNVJFRl6f6s">top basketball
players</a> have extraordinary recall of games. Experts begin to
think, perhaps only semi-consciously, using such chunks. The
conventional representations &ndash; words or symbols in mathematics,
or moves on a chessboard &ndash; are still there, but they are somehow
secondary.

So, my informal pop-psychology explanation is that when I'm doing
mathematics really well, in the deeply internalized state I described
earlier, I'm mostly using such higher-level chunks, and that's why it
no longer seems symbolic or verbal or even visual. I'm not entirely
conscious of what's going on &ndash; it's more a sense of just playing
around a lot with the various objects, trying things out, trying to
find unexpected connections. But, presumably, what's underlying the
process is these chunked patterns.

Now, the only way I've reliably found to get to this point is to get
obsessed with some mathematical problem. I will start out thinking
symbolically about the problem as I become familiar with the relevant
ideas, but eventually I internalize those ideas and their patterns of
use, and can carry out a lot (not all) of operations inside my head.

What's all this got to do with the Ankification process? Well, I said
that the only reliable way I've found to get to this deeply
internalized state is to obsess over a problem. But I've noticed that
when I do the Ankification process, I also start to think less and
less in terms of the conventional representations. The more questions
I write, the more true this seems to be. And so I wonder if the
Ankification process can be used as a kind of deterministic way of
attaining that type of state. (Unfortunately, I can't get obsessed
with a problem on demand; it's a decidedly non-deterministic process!)

One consequence of this for the Ankification process is that over time
I find myself more and more wanting to use blank answers: I don't have
a conventional symbolic or visual representation for the
answer. Instead, I have to bring to mind the former experience of the
answer. Or, I will sometimes use an answer that would be essentially
unintelligible to anyone else, relying on my internal representation
to fill in the blanks. This all tends to occur pretty late in the
process.

Now, unfortunately, this transition to the chunked,
deeply-internalized state isn't as thorough when I'm Ankifying as it
is when obsessively problem solving. However, I suspect it greatly
enables such a transition. (I rarely obsessively problem solve these
days, so I haven't yet had a chance to see this happen.) And I do
wonder if there are types of question I can ask that will help me get
more fully to the deeply-internalized state. What seems to be lacking
is a really strongly-felt internalization of the meaning of answers
like that shown above:

_A: $$\left[ \begin{array}{cc} \lambda   & r \\ 0 & \cdot \end{array} \right]
  \left[ \begin{array}{cc} \lambda^* & 0 \\ r^\dagger & \cdot \end{array} \right] =
  \left[ \begin{array}{cc} \lambda^* & 0 \\ r^\dagger & \cdot \end{array} \right]
  \left[ \begin{array}{cc} \lambda   & r \\ 0 & \cdot \end{array} \right]
  \,\, \Rightarrow \,\, |\lambda|^2+r^\dagger r = |\lambda|^2 \,\, \Rightarrow \,\, r = 0.
  $$_

That type of strongly-felt meaning can, however, be built by using
such representations in many different ways as part of
problem-solving; it builds fluency and familiarity. But I haven't
actually done it.

*Phase II: variations, pushing the boundaries:* Let's get back to
details of how the Ankification process works. One way of deepening
your understanding further is to find ways of pushing the boundaries
of the proof and of the theorem. I find it helpful to consider many
different ways of changing the assumptions of the theorem, and to ask
how it breaks down (or generalizes). For instance:

_Q: Why does the proof that complex normal matrices are diagonalizable
fail for real matrices?_

_A: It may not be possible to find an eigenvector for the matrix,
since the real numbers aren't algebraically complete._

_Q: What's an example of a real normal matrix that isn't
diagonalizable by a real orthogonal matrix?_

_A: $$\left[ \begin{array}{cc} 1 & -1 \\ 1 & 1 \end{array} \right]$$_

As per usual, these questions can be extended and varied in many ways.

Another good strategy is to ask if the conditions can be weakened. For
instance, you might have noticed that we only seemed to use the
normality condition on the diagonal.  Can we get away with requiring
$M^\dagger M = MM^\dagger$ just on the diagonal? In fact, some
reflection shows that the answer is no: we need it to be true in a
basis which includes an eigenvector of $M$. So we can add questions
like this:

_Q: In the proof that normalcy implies diagonalizability, why does it
not suffice to require that $M^\dagger M = MM^\dagger$ only on the
diagonal?_

_A: Because we need this to be true in a particular basis, and we
cannot anticipate in advance what that basis will be._

Or we can try to generalize:

_Q: For which fields is it possible to generalize the result that
complex normal matrices are diagonalizable?_

_A: [I haven't checked this carefully!] For algebraically complete
fields._

(My actual Anki card doesn't have the annotation in the last
answer. But it's true: I haven't checked the proof carefully. Still,
answering the question helped me understand the original proof and the
result better.)

This second phase really is open-ended: we can keep putting in
variations essentially _ad infinitum_. The questions are no longer
directly about the proof, but rather are about poking it in various
ways, and seeing what happens. The further I go, and the more I
connect to other results, the better.

*"The" proof?* Having described the two phases in this Ankification
process, let me turn to a few miscellaneous remarks.  One complication
is that throughout I've referred to "the" proof. Of course,
mathematical theorem often have two or more proofs. Understanding
multiple proofs and how they relate is a good way of deepening one's
understanding further. It does raise an issue, which is that some of
the Anki questions refer to "the" proof of a result. I must admit, I
don't have an elegant way of addressing this!  But it's something I
expect I'll need to address eventually.

A related point is how much context-setting to do in the questions
&ndash; do we keep referring, over and over, to "the proof that
$MM^\dagger = M^\dagger M$ implies normalcy", or to "if $M$ is a
complex matrix" (and so on)? In my Anki cards I do (note that I've
elided this kind of stuff in some of the questions above), but frankly
find it a bit irritating. However, since the cards are studied at
unknown times in the future, and I like to mix all my cards up in a
single deck, some context-setting is necessary.

*What have I used this to do?* I've used this process on
three-and-a-half theorems so far:

+ Complex normal matrices are diagonalizable.
+ Euler's theorem that $a^{\phi(n)} \equiv 1 (\mod n)$ for any number
  $a$ coprime to positive integer $n$, and $\phi(n)$ is Euler's
  totient function.
+ Lagrange's theorem (used in the proof of Euler's theorem) that the
  order of a subgroup of a finite group must divide the order of the
  entire group.
+ I've started the process for the fundamental theorem of algebra,
  stating that every non-constant polynomial has a zero in the complex
  plane. I was interrupted (I don't recall why), and never finished
  it.

It's quite time-intensive.  I don't have any easy way to count the
number of questions I've added for each of these theorems, but I guess
on the order of dozens of cards for each. It takes a few hours
typically, though I expect I could easily add many more questions.

[Note added: in the initial version of this essay I wrote "100 cards
for each". I looked, and in fact there are fewer &ndash; on the order
of dozens, well short of 100. This surprised me &ndash; if anything,
I'd have guessed my error was in underestimation. The card-adding
process was intense, however, which perhaps accounts for my badly
mistaken impression.]

*Seeing through a piece of mathematics:* This is all a lot of work!
The result, though, has been a considerable deepening in my
understanding of all these results.  There's a sense of being able to
"see through" the result.  Formerly, while I could have written down a
proof that normal matrices are diagonalizable, it was all a bit
murky. Now, it appears almost obvious, I can very nearly _see_
directly that it's true. The reason, of course, is that I'm far more
familiar with all the underlying objects, and the relationships
between them.

My research experience has been that this ability to see through a
piece of mathematics isn't just enjoyable, it's absolutely invaluable;
it can give you a very rare level of understanding of (and flexibility
in using) a particular set of mathematical ideas.

*Discovering alternate proofs:* After going through the Ankification
process described above I had a rather curious experience. I went for
a multi-hour walk along the San Francisco Embarcadero. I found that my
mind simply and naturally began discovering other facts related to the
result. In particular, I found a handful (perhaps half a dozen) of
different proofs of the basic theorem, as well as noticing many
related ideas. This wasn't done especially consciously &ndash; rather,
my mind simply wanted to find these proofs.

At the time these alternate proofs seemed crystalline, almost
obvious. I didn't bother writing them down in any form, or adding them
to Anki; they seemed sufficiently clear that I assumed I'd remember
them forever. I regret that, for later I did not recall the proofs at
all.

Curiously, however, in the process of writing these notes I have
recalled the ideas for two of the proofs.  One was something like the
following: apply the condition $M^\dagger M = MM^\dagger$ directly to
the upper triangular form $M = D+T$ where $D$ is diagonal and $T$ is
strictly upper triangular; the result drops out by considering the
diagonal elements. And another was to apply the normalcy condition to
the singular value decomposition for the matrix $M$; the proof drops
out immediately when the singular values are distinct, and can be
recovered with a little work when the singular values are not.

*Simplicity of the theorems:* The three-and-a-half theorems mentioned
above are all quite elementary mathematics. What about using this
Ankification process to deepen my understanding of more advanced
mathematical ideas? I'll certainly try it at some point, and am
curious about the effect. I'm also curious to try the process with
networks of related theorems &ndash; I suspect there will be some
surprising mutual benefits in at least some cases. But I don't yet
know.

*In what sense is this really about Anki flashcards?* There's very
little in the above process that explicitly depended on me using
Anki's spaced-repetition flashcards. Rather, what I've described is a
general process for pulling apart the proof of a theorem and making
much more sense of it, essentially by atomizing the elements. There's
no direct connection to Anki at all &ndash; you could carry out the
process using paper and pencil.

Nonetheless, something I find invaluable is the confidence Anki brings
that I will remember what I learn from this process. It's not so much
any single fact, but rather a sense of familiarity and fluency with
the underlying objects, an ability to simply see relationships between
them. That sense does fade with time, but far less rapidly than if I
simply didn't think about the proof again.  That's a large payoff, and
one that I find makes me far more motivated to go through the
process. Perhaps other people, with different motivations, would find
Anki superfluous.

That said, I do have some sense that, as mentioned earlier, some of
the cards I generate are a type of exhaust, and would be better off
excluded from the process. This is especially true of many of the
cards generated early in the process, when I'm still scratching
around, trying to get purchase on the proof. Unfortunately, also as
mentioned above, I don't yet have much clarity on which cards are
exhaust, and which are crucial.

*Can I share my deck?* When I discuss Anki publicly, some people
always ask if I can share my deck. The answer is no, for reasons I've
explained <a
href="http://augmentingcognition.com/ltm.html">here</a>. I must admit,
in the present case, I don't really understand why you'd want to use a
shared deck. In part, that's because so much of the value is in the
process of constructing the cards. But even more important: I suspect
a deck of 100+ of my cards on the proof above would be largely
illegible to anyone else &ndash; keep in mind that you'd see the cards
in a randomized order, and without the benefit of _any_ of the context
above. It'd be an incomprehensible mess.

*Discovery fiction:* I've described this Ankification process as a
method for more deeply understanding mathematics. Of course, it's just
one approach to doing that! I want to briefly mention one other
process I find particularly useful for understanding. It's to write
what I call _discovery fiction_. Discovery fiction starts with the
question "how would I have discovered this result?" And then you try
to make up a story about how you might have come to discover it,
following simple, almost-obvious steps.

Two examples of discovery fiction are my <a
href="http://www.michaelnielsen.org/ddi/how-the-bitcoin-protocol-actually-works/">essay
explaining how you might have come to invent Bitcoin</a>, and my <a
href="http://www.michaelnielsen.org/ddi/why-bloom-filters-work-the-way-they-do/">essay
explaining how you might have invented an advanced data structure (the
Bloom filter)</a>.

Writing discovery fiction can be tough. For the theorem considered in
this essay, it's not at all clear how you would have come to the
result in the first place.  But maybe you started out already
interested in $M^\dagger$, and in the question of when two matrices
$A$ and $B$ commute.  So you ask yourself: "Hmm, I wonder what it
might mean that $M$ and $M^\dagger$ commute?" If you're willing to
grant that as a starting point, then with some work you can probably
find a series of simple, "obvious" steps whereby you come to wonder if
maybe $M$ is diagonalizable, and then discover a proof.

Any such "discovery fiction" proof will be long &ndash; far longer
than the proof above. Even a cleaned-up version will be &ndash; should
be! &ndash; messy and contain false turns. But I wanted to mention
discovery fiction as a good example of a process which gives rise to a
very different kind of understanding than the Ankification process.

*What about other subjects?* Mathematics is particularly well suited
to deep Ankification, since much of it is about precise relationships
between precisely-specified objects. Although I use Anki extensively
for studying many other subjects, I haven't used it at anything like
this kind of depth. In the near future, I plan to use a similar
process to study some of the absolute core results about climate
change, and perhaps also to study some of the qualities of good
writing (e.g., I can imagine using a similar process to analyze the
lead sentences from, say, 30 well-written books).  I don't know how
this will go, but am curious to try. I'm a little leery of coming to
rely too much on the process &ndash; creative work also requires many
skills at managing uncertainty and vagueness. But as a limited-use
cognitive tool, deep Ankification seems potentially valuable in many
areas.

### Acknowledgments

Many thanks to everyone who has talked with me about spaced-repetition
memory systems.  Especial thanks to Andy Matuschak, whose conversation
has deeply influenced how I think about nearly all aspects of spaced
repetition. And thanks to Kevin Simler for additional initial
encouragement to write about my spaced repetition practice.

### Citation and licensing

*In academic work, please cite this as: Michael A. Nielsen, "Using
spaced repetition systems to see through a piece of mathematics"
http://cognitivemedium.com/srs-mathematics, 2019.*

_This work is licensed under a Creative Commons
Attribution-NonCommercial 3.0 Unported License. This means you're free
to copy, share, and build on this essay, but not to sell it. If you're
interested in commercial use, please contact me._

