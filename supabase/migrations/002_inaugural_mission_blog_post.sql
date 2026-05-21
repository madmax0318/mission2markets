-- Inaugural mission blog post (safe to re-run if slug already exists)
insert into public.blog_posts (title, slug, excerpt, body, published)
values (
  'Why We Built Mission 2 Markets',
  'why-we-built-mission-2-markets',
  'Two Army veterans turned elite sales leaders share why they started Mission 2 Markets—and why they are passionate about helping every professional grow.',
  '## From Service to Sales. From Mission to Market.

Mission 2 Markets was not built to sell another generic training program. It was built because two founders—Patrick Steiner and Andrew Letarte—lived the hard transition from military leadership to high-stakes sales careers, and they refused to watch talented people struggle without a playbook.

We are veteran-led. We are open to everyone. And we are obsessed with one outcome: helping people grow in their careers with discipline, integrity, and results that last.

## Two paths, one standard

**Patrick Steiner** commissioned as a U.S. Army officer after serving as a Human Intelligence Collector in Iraq. He led infantry platoons and company-level operations through Ranger School, Airborne, and deployments to Afghanistan. After the military, he built a career in cardiac rhythm management—rising from field clinical specialist to regional sales director at BIOTRONIK and now leading territory sales at RhythmScience. His MBA from Notre Dame’s Mendoza College of Business sharpened the business lens; his time in uniform forged the leadership standard.

**Andrew Letarte** served nearly a decade as a U.S. Army Infantry Officer—from platoon operations to senior logistics and battalion staff roles at Fort Lewis and Fort Campbell. He managed complex missions, multi-million-dollar accountability, and teams under real pressure. In medical technology, he progressed from field clinical specialist to principal account manager at Inari Medical, with prior tenure at BIOTRONIK. His MBA from the University of Iowa’s Tippie College of Business and finance foundation from Providence College complement a career defined by competitive execution and clear communication.

Different deployments. Different sales territories. Same conclusion: the traits that win in military operations—preparation, ownership, adaptability, and mission focus—are the same traits that win in enterprise sales.

## What we saw—and what we could not ignore

We watched sharp, hardworking people enter civilian careers with world-class work ethic and no clear system for translating it into revenue, influence, or advancement. Some were veterans. Many were not. All of them deserved better than vague advice and motivational posters.

We also saw organizations leave performance on the table: inconsistent onboarding, weak sales discipline, and leaders who had never been coached with the rigor required to build elite teams.

Mission 2 Markets exists to close that gap.

## Our mission

We help professionals at every stage—whether you are changing careers, breaking into B2B sales, leading a team, or building a corporate partnership—develop the skills and habits of elite performers.

That means:

- **Clarity** — Define the objective before you engage. No activity without purpose.
- **Discipline** — Build daily standards that create freedom, not burnout.
- **Coaching** — Get honest feedback, practical frameworks, and accountability from operators who have carried quota and led people.
- **Community** — Join a collective that lifts people up and never leaves a teammate behind on the sales battlefield.

We translate military-grade preparation into marketplace results—not because only veterans benefit, but because this methodology works for anyone willing to do the work.

## Why we are passionate about your growth

We have sat across the table from customers when the deal mattered. We have rebuilt pipelines from zero. We have led teams through uncertainty. We know how it feels to be capable and still stuck—because we have been there.

That is why we coach with respect and push with standards. We do not want inspiration for a week. We want transformation you can measure: stronger discovery, cleaner negotiation, better leadership, and a career trajectory you own.

If you are ready to stop guessing and start executing, you are in the right place.

## What comes next

Explore our programs and resources on the site, connect with us through a consultation, and follow this blog for leadership insights from the field—not theory from the sidelines.

**Mission 2 Markets is veteran-led. Built for everyone. Committed to your growth.**

[Meet the founders](/founders) · [Book a consultation](/contact)',
  true
)
on conflict (slug) do update set
  title = excluded.title,
  excerpt = excluded.excerpt,
  body = excluded.body,
  published = excluded.published;
