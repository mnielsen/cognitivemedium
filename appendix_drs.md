---
layout: post
title:  "Appendix on the diminishing returns to science
date:   2018-11-14
permalink: /diminishing-returns
---
By Patrick Collison and Michael Nielsen

In this appendix, we provided ancillary details for our essay about
the diminishing returns to science in _The Atlantic_. This includes
filling in details about our survey of scientists, a list of sources,
and acknowledgements.

## Survey methodology

For physics, we polled 1,000 scientists from the first 54 institutions
listed in the 2017 Shanghai Academic Ranking of World Universities
(physics rankings).  For most of the top 50-ranked departments we
polled 20 scientists, but several departments had fewer than 20
scientists to poll, and so we completed the set of 1000 with a
selection from the next four departments listed. 93 scientists
responded to the survey, providing a total of 1,370 rankings.

For chemistry, we polled 1,983 scientists from the top 102
institutions in the Shanghai rankings for chemistry (again, 20
scientists in most departments). 131 scientists responded to the
survey, providing a total of 1,840 rankings.

The physiology or medicine prize was more complex, due to the wider
array of relevant fields. We polled 1,825 scientists.  To find those
scientists we merged the Shanghai list of the top 20 institutions in
the Life Sciences with the list of the top 20 in Medicine.  The result
was a combined list of 26 institutions (due to overlap in the lists).
For each institution on the combined list we found 3 departments with
expertise relevant to the prize.  We polled from the combined list. 92
scientists responded to the survey, providing a total of 1,273
rankings.

Respondents were asked to rank 20 (randomly chosen) pairs of
discoveries in their field.  When making comparisons they were asked
to &ldquo;please focus on the intrinsic merits of the discoveries, not
the reputations of the discoverers.&rdquo;  And they were asked:

> Which of the following Prizes represents a larger contribution to
> scientific understanding, relative to knowledge at the time of
> discovery?
>
> If after some background research you don't feel able to
> make a comparison, please register &ldquo;Not able to make a
> comparison&rdquo;.

The prizes themselves were described as "The [year] Nobel Prize for
[subject] awarded to [laureate/s] &ldquo;[Nobel citation]&rdquo;".

E.g.: "The 1973 Nobel Prize for Physics awarded to John Bardeen, Leon
Neil Cooper and John Robert Schrieffer &ldquo;for their jointly
developed theory of superconductivity, usually called the
BCS-theory&rdquo;."

Note that in some years, prizes are given for two or more discoveries,
with separate citations.  We elected to treat such discoveries
entirely separately.

For purposes of data analyis it was necessary to ascribe a decade to
discoveries.  When possible, we used the Nobel Prize website to
determine the dates to ascribe. Often there is a clear date picked out
as especially pivotal: for instance, for the 1920 Chemistry Prize, the
<a
href="https://www.nobelprize.org/nobel_prizes/chemistry/laureates/1920/nernst-facts.html">Nobel
website</a> states &ldquo;In 1912 Walter Nernst was able to formulate
the third law of thermodynamics&rdquo;. And so 1912 was used as the
date of discovery, and this then determined the decade of discovery.

Sometimes, the website records a time period, say &ldquo;the
1930s&rdquo;. There we would record some reasonable average &ndash;
in this case, 1935. This would be the case even if the key discovery
was made in (say) 1933, since our data processing only depended upon
the decade of the discovery. Or if a particular prize is awarded for
a multi-part discovery, say made in 1972, 1975, and 1981, then we'd
record the average (1976).
  
Very occasionally this produces somewhat unsatisfactory results. For
instance, Linus Pauling won the 1954 Nobel Prize for Chemistry in part
for his pioneering work on quantum chemistry in the 1930s, and in part
for his discovery of the structure of the alpha helix in
1951. How should we record the year of this discovery? In the end, we
ended up averaging the dates, and recording it as a 1940s discovery
(we chose 1942, though that is arbitrary, since only the decade is
used in processing the data.) This is somewhat unsatisfactory, since
the key work wasn't done in the 1940s. However, this kind of thing
is infrequent, and at worst allows an off-by-one ambiguity in the
decade of discovery. It makes little difference to our overall
results.

In a small number of cases the Nobel Prize website gives no guidance
as to dates. When that is the case, we have used Google Scholar and
similar services to identify pivotal papers related to the
discovery. But usually the Nobel website does provide dates, and we
have used those.

## Other data sources

The number of papers in Web of Science were provided to us by Santo
Fortunato (Indiana University). 

The number of doctorates in the US from 1936 to 1956 were provided to
us by Kelly Kang (NSF).

The number of doctorates in the US from 1958 to 2016 came from the
National Science Foundation's Survey of Earned Doctorates (<a
href="https://ncsesdata.nsf.gov/ids/sed">interactive tool</a>). The
data are <a href="assets/NSF1958.csv">here</a>.  Note that the year
1957 is missing from this data. 

The data on NIH and NSF budgets came from the respective websites of
those agencies, and we used Bureau of Labor Statistics deflators to
adjust for inflation.

## Miscellaneous remarks

*Shouldn't we measure the size of science relative to real GDP?* That
is, doesn't it make sense to compare the number of scientists, number
of publications, and amount of funding to the size of the economy as a
whole?  Now, there are periods &ndash; notably, the space race in the
1960s &ndash; when certain types of growth (e.g., number of PhDs
granted) outstripped real GDP growth. But over the longer run this
isn't the case.  Between 1950 and 2016 the US's real GDP increased by
a little less than a factor of 8. By contrast the number of PhDs
granted increased by more than a factor of 16, NIH + NSF funding
increased by a factor of about 75 (in real terms!), and publication
count (to 2013, the latest date for which we have data) by a factor
more than 21. On every measure, the growth of science far outstripped
real GDP. 

*Isn't it just conventional wisdom that physics has undergone a
decline, while the life sciences have gotten better?* Some people
certainly hold that opinion. But now we know with reasonable
confidence that this is the collective opinion of scientists
themselves, at least according to our very specific metric; we
understand the quantitative nature of the effect; and we know that
it's actually quite small in the life sciences.

*What about oversampling?* Suppose a decade is a particularly good one
for some subject.  Wouldn't we expect there to be more Nobel prizes
awarded for discoveries made in that decade &ndash; say 20 prizes for
a "good" decade, versus say 8 prizes for a "bad" decade? And might
that not mean that there are not just more highly-rated prizes in such
decades, but also more low-rated prizes? We can informally test this
by looking at statistics that don't depend on the number of prizes in
the decade, but only quality measures we'd expect to be relatively
independent of that number. Here, for example, are the results for the
third-highest ranking (third, to suppress occasional outliers) prize
for each decade: <a
href="assets/drs/physics_results_graph_full.png">physics</a>, <a
href="assets/drs/chemistry_results_graph_full.png">chemistry</a>, <a
href="assets/drs/medicine_results_graph_full.png">physiology or
medicine</a>. The third-ranking prizes are shown as red dots, while
the blue bars are the decadal scores.  Although some details differ,
the broad story is the same as for the decadal averages: a decline in
physics over the 20th century, and a small increase in chemistry, and
in physiology or medicine.

## Sources and further reading

Our discussion of the age distribution of Nobel prizewinners is
based on:

> Benjamin F. Jones and Bruce A. Weinberg, &ldquo;<a
> href="http://www.pnas.org/content/108/47/18910">Age dynamics in
> scientific creativity</a>&rdquo;, _Proceedings of the National
> Academy of Sciences_ (2011).
  
Jones and Weinberg actually quote ages for each field. To obtain our
science-wide ages we have simply averaged the ages they report across
fields. Technically, this could be wrong if there are dramatic
inter-field differences in the number of Nobel laureates, but this
seems unlikely to be a substantial effect. 

Incidentally, when we state that &ldquo;perhaps great discoveries are
actually getting harder to make today&rdquo;, this is of course meant
on average. Even today, there are still Nobel prizes for relatively
easy to make discoveries. For instance, in 2004 Andre Geim and
Konstantin Novoselov discovered graphene using Scotch tape and flakes
of graphite (and, admittedly, an atomic force microscope for the
analysis!)

Rutherford's single-author paper is:

> Ernest Rutherford, "The Scattering of <em>&alpha;</em> and
> <em>&beta;</em> Particles by Matter and the Structure of the Atom",
> Philos. Mag. (1911).

We won't try to list the authors for the papers announcing the
discovery of the Higgs particle, but you can find the
papers <a href="https://arxiv.org/abs/1207.7214">here</a>
and <a href="https://arxiv.org/abs/1207.7235">here</a>.

For the growth of teams in science (and much else), including the 20th
century quadrupling, see:

> Santo Fortunato _et al_, "Science of Science", Science *359*, 1007
> (2018).

On the productivity slowdown:

> Tyler Cowen, &ldquo;The Great Stagnation: How America Ate All the
> Low-Hanging Fruit of Modern History, Got Sick, and Will (Eventually)
> Feel Better&rdquo;, Dutton (2011).
>
> Robert J. Gordon, &ldquo;The Rise and Fall of American Growth: The
> U.S. Standard of Living since the Civil War&rdquo;, Princeton
> University Press (2017).

In a similar vein, a paper that helped stimulate our thinking is:

> Nicholas Bloom, Charles I. Jones, John Van Reenen, Michael Webb,
> "Are Ideas Getting Harder to Find?" (2018).

Bentley Glass's article and John Horgan's book are two (of many)
entries in the genre of concern over slowdowns in science:

> Bentley Glass, "Science: Endless Horizon or Golden Age", Science
> *171*, 3966 (1971).
>
> John Horgan, &ldquo;The End of Science: Facing The Limits Of
> Knowledge In The Twilight Of The Scientific Age&rdquo;, Basic Books
> (1996).

## Acknowledgements

Thanks to Sarah Majors, who gathered the names of people to
survey. Thanks to Santo Fortunato, who shared the data on
publications in Web of Science.  And thanks to Kelly Kang, for
sharing NSF data on number of PhDs granted.

Many people have shaped our thinking on this subject. We'd
particularly like to thank Scott Aaronson, Marc Andreessen, Pierre
Azoulay, Nick Bloom, Adam Brown, Tyler Cowen, Julia Galef, Patrick
Hayden, Andy Matuschak, Luke Muehlhauser, Brian Nosek, Lee Smolin,
Michael Webb, and Eric Weinstein.

