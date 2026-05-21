import Link from "next/link";
import Image from "next/image";
import {
  Target,
  Shield,
  TrendingUp,
  Users,
  Award,
  Zap,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getActiveProducts, formatPrice } from "@/lib/products";

const coreValues = [
  {
    icon: Shield,
    title: "Integrity Without Compromise",
    description:
      "Honor and accountability guide every client interaction and business decision.",
  },
  {
    icon: Target,
    title: "Mission First, People Always",
    description:
      "Clear objectives, disciplined execution, and genuine care for the team and the customer.",
  },
  {
    icon: TrendingUp,
    title: "Discipline Creates Freedom",
    description:
      "Structured habits and accountability unlock elite performance and lifestyle flexibility.",
  },
  {
    icon: Users,
    title: "Veteran Collective",
    description:
      "A community rooted in military brotherhood—open to all who commit to lifting each other up and never leaving a teammate behind.",
  },
  {
    icon: Award,
    title: "Defined Leadership",
    description:
      "Ownership at every level. Leaders who set the standard and hold the line.",
  },
  {
    icon: Zap,
    title: "Adapt and Overcome",
    description:
      "Military decisiveness translated into pipeline velocity and revenue wins.",
  },
];

const testimonials = [
  {
    quote:
      "Mission 2 Markets gave me a playbook I could execute from day one. I closed my first enterprise deal within 90 days.",
    name: "Marcus T.",
    role: "Enterprise Account Executive",
  },
  {
    quote:
      "This is not generic sales training—it is mission-built discipline that works whether you wore a uniform or not.",
    name: "Sarah K.",
    role: "Sales Development Leader",
  },
];

const services = [
  {
    title: "Sales Bootcamp",
    description:
      "Intensive cohort training for professionals entering or advancing in B2B and enterprise sales.",
  },
  {
    title: "Corporate Partnerships",
    description:
      "Build hiring pipelines and high-performance sales teams inside your organization.",
  },
  {
    title: "Executive Coaching",
    description:
      "1:1 mentorship from operators who have led revenue teams in the private sector.",
  },
];

export default async function HomePage() {
  const products = await getActiveProducts();
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const displayProducts = featured.length > 0 ? featured : products.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.08)_0%,_transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
                Elite Sales Excellence
              </p>
              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Transforming Military Discipline into{" "}
                <span className="text-gradient-gold">Elite Sales Leadership</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                From Service to Sales. From Mission to Market. Mission 2 Markets
                equips professionals with consulting, training, and resources to
                dominate high-performance sales careers—with a veteran-led edge.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  render={<Link href="/contact" />}
                  size="lg"
                  className="h-11 bg-gradient-gold px-8 font-bold text-primary-foreground shadow-[0_0_30px_rgba(255,215,0,0.3)] hover:opacity-90"
                >
                  Book Now
                  <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button
                  render={<Link href="/store" />}
                  variant="outline"
                  size="lg"
                  className="h-11 border-border px-8 hover:border-primary/50 hover:text-primary"
                >
                  Explore Store
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                alt="Professionals in a leadership discussion"
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          </div>

          <div className="mx-auto mt-20 grid max-w-4xl grid-cols-3 gap-8 border-t border-border/50 pt-12">
            {[
              { stat: "50+", label: "Professionals Trained (Year 1 Goal)" },
              { stat: "10+", label: "Corporate Partners (5-Year Goal)" },
              { stat: "250+", label: "Professionals Served (5-Year Goal)" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                  {item.stat}
                </p>
                <p className="mt-1 text-xs tracking-wide text-muted-foreground uppercase sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase">
            Trusted By Teams Building Elite Sales Talent
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm font-semibold tracking-wider text-muted-foreground/80 uppercase">
            {["Enterprise Sales", "Leadership Development", "Talent Pipelines", "Career Transition"].map(
              (name) => (
                <span key={name} className="rounded border border-border px-4 py-2">
                  {name}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Our Mission</h2>
            <p className="mt-4 text-muted-foreground">
              Translate discipline, accountability, and mission-focus into
              high-performing sales professionals and principled leaders—for everyone.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <Card key={service.title} className="border-border/80 bg-card">
                <CardHeader>
                  <CardTitle className="font-heading text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Link href="/services" className="text-sm font-medium text-primary hover:underline">
                    Learn more →
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="values" className="scroll-mt-16 border-y border-border bg-card/50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Core Values</h2>
            <p className="mt-4 text-muted-foreground">
              Ownership. Service beyond the uniform. Excellence as the baseline.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => (
              <Card key={value.title} className="border-gold-glow border-border/80 bg-card">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <value.icon className="size-5" />
                  </div>
                  <CardTitle className="font-heading text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {displayProducts.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <h2 className="font-heading text-3xl font-bold sm:text-4xl">Featured Products</h2>
                <p className="mt-4 text-muted-foreground">
                  Books, training, and consulting built for professionals ready to own the sales floor.
                </p>
              </div>
              <Button render={<Link href="/store" />} variant="outline" className="border-primary/30 text-primary">
                View All <ArrowRight className="size-4" />
              </Button>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {displayProducts.map((product) => (
                <Card key={product.id} className="border-border/80 bg-card">
                  <CardHeader>
                    <CardTitle className="font-heading text-xl">{product.title}</CardTitle>
                    <CardDescription className="line-clamp-3 text-base">
                      {product.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between">
                    <span className="font-heading text-lg font-bold text-primary">
                      {formatPrice(product.price_cents)}
                    </span>
                    <Link href="/store" className="text-sm text-primary hover:underline">
                      Buy now
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-y border-border bg-card/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center font-heading text-3xl font-bold">What Clients Say</h2>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-border/80 bg-card">
                <CardContent className="pt-6">
                  <Quote className="mb-4 size-8 text-primary/60" />
                  <p className="text-lg leading-relaxed text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-6 font-semibold text-foreground">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card px-6 py-16 sm:px-12">
            <div className="relative mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-3xl font-bold sm:text-4xl">Ready to Deploy?</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Book a consultation with our team. Your next mission starts in the marketplace.
              </p>
              <Button
                render={<Link href="/contact" />}
                size="lg"
                className="mt-10 h-11 bg-gradient-gold px-8 font-bold text-primary-foreground hover:opacity-90"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
