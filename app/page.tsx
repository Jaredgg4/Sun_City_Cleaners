"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Image from "next/image";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Step {
  icon: string;
  title: string;
  body: string;
  color: "gold" | "blue" | "green";
}

interface Service {
  badge: string;
  title: string;
  body: string;
  features: string[];
  price: string;
  image: string;
  featured?: boolean;
  bg: string;
}

interface Reason {
  icon: string;
  title: string;
  body: string;
  variant: "gold" | "blue";
}

interface Review {
  stars: number;
  text: string;
  author: string;
  location: string;
  initial: string;
  avatarBg: string;
  avatarColor: string;
}

interface FooterColumn {
  heading: string;
  links: string[];
}

// ─────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────

const NAV_LINKS: NavLink[] = [
  { label: "How It Works", href: "#how" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#why" },
  { label: "Reviews", href: "#reviews" },
];

const STATS: Stat[] = [
  { value: "500+", label: "Homes Cleaned" },
  { value: "5.0★", label: "Average Rating" },
  { value: "3 yrs", label: "In Business" },
  { value: "100%", label: "Satisfaction Guarantee" },
];

const STEPS: Step[] = [
  {
    icon: "📅",
    title: "Book Online",
    body: "Choose your service, pick a date and time, and tell us about your space. Our booking form takes under 2 minutes.",
    color: "gold",
  },
  {
    icon: "✅",
    title: "We Show Up",
    body: "Our vetted, insured cleaning team arrives on time, equipped with everything needed to get the job done right.",
    color: "blue",
  },
  {
    icon: "✨",
    title: "Enjoy Your Space",
    body: "Come home to a fresh, immaculate space. Not happy? We'll re-clean for free — no questions asked.",
    color: "green",
  },
];

const SERVICES: Service[] = [
  {
    badge: "Most Popular",
    title: "Routine Cleaning",
    body: "A thorough top-to-bottom clean of your home — kitchens, bathrooms, bedrooms, and living areas.",
    features: [
      "Dusting, vacuuming & mopping",
      "Kitchen & bathroom deep clean",
      "Available weekly or bi-weekly",
    ],
    price: "$200",
    image: "/assets/rountine.png",
    bg: "linear-gradient(135deg,#e8f6fb,#b8e4f5)",
  },
  {
    badge: "Business",
    title: "Office Cleaning",
    body: "Keep your workspace professional and sanitized. Flexible scheduling around your business hours.",
    features: [
      "Office desks, floors & restrooms",
      "Before/after-hours availability",
      "Monthly contracts available",
    ],
    price: "$300",
    image: "/assets/office.png",
    featured: true,
    bg: "linear-gradient(135deg,#1a3a5c,#0d2640)",
  },
  {
    badge: "Full-Service",
    title: "Move In / Move Out",
    body: "Stress-free transition cleans. Leave your old place spotless or walk into a fresh new home.",
    features: [
      "Inside cabinets & appliances",
      "Windows, walls & baseboards",
      "Deposit-return guaranteed",
    ],
    price: "$400",
    image: "/assets/move in _ out.png",
    bg: "linear-gradient(135deg,#e8faf0,#a0dbb8)",
  },
  {
    badge: "Specialized",
    title: "Local Churches",
    body: "Respectful, thorough cleaning for places of worship. We understand the unique needs of religious spaces.",
    features: [
      "Sanctuaries & fellowship halls",
      "Pew & altar cleaning",
      "Flexible scheduling around services",
    ],
    price: "$350",
    image: "/assets/church.png",
    bg: "linear-gradient(135deg,#f5e6d3,#e8c9a8)",
  },
  {
    badge: "Flexible",
    title: "Basic One-Time",
    body: "Perfect for spring cleaning or special occasions. A deep clean when you need it most.",
    features: [
      "Deep cleaning of all rooms",
      "Baseboards & window sills",
      "Appliance interiors",
    ],
    price: "$250",
    image: "/assets/One time clean .png",
    bg: "linear-gradient(135deg,#e8f0fa,#c8d8f0)",
  },
  {
    badge: "Professional",
    title: "Realtor Services",
    body: "Help your listings shine. Professional cleaning for showings, open houses, and staging.",
    features: [
      "Show-ready presentation",
      "Quick turnaround available",
      "Bulk pricing for multiple properties",
    ],
    price: "$280",
    image: "/assets/realtor.png",
    bg: "linear-gradient(135deg,#f0e8f5,#e0d0f0)",
  },
];

const REASONS: Reason[] = [
  {
    icon: "🛡️",
    title: "Insured & Background-Checked",
    body: "Every cleaner on our team is fully vetted, insured, and trained to our rigorous standards.",
    variant: "gold",
  },
  {
    icon: "🌿",
    title: "Eco-Friendly Products",
    body: "We use non-toxic, pet and family-safe cleaning products on every job, always.",
    variant: "blue",
  },
  {
    icon: "💯",
    title: "Satisfaction Guarantee",
    body: "Not 100% satisfied? We come back and re-clean at no extra charge — simple as that.",
    variant: "gold",
  },
  {
    icon: "🕐",
    title: "Flexible Scheduling",
    body: "Morning, evening, weekends — we work around your schedule, not the other way around.",
    variant: "blue",
  },
];

const REVIEWS: Review[] = [
  {
    stars: 5,
    text: "Never seen my house so clean. I've tried three other services and Sun City blows them all out of the water. The attention to detail is unreal.",
    author: "Maria G.",
    location: "El Paso, TX",
    initial: "M",
    avatarBg: "#FFF0C8",
    avatarColor: "#8B5A00",
  },
  {
    stars: 5,
    text: "They did our move-out clean and our landlord was shocked. We got our full deposit back. Worth every single penny. Already booked them for our new place.",
    author: "James R.",
    location: "El Paso, TX",
    initial: "J",
    avatarBg: "#C8F0FF",
    avatarColor: "#005A8B",
  },
  {
    stars: 5,
    text: "Super professional and on time. They even left a little note after finishing. We have them on a bi-weekly schedule now. Couldn't be happier.",
    author: "Amanda T.",
    location: "El Paso, TX",
    initial: "A",
    avatarBg: "#C8FFD8",
    avatarColor: "#00590A",
  },
];

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      "Routine Cleaning",
      "Office Cleaning",
      "Move In / Move Out",
      "Local Churches",
      "Basic One-Time",
      "Realtor Services",
    ],
  },
  {
    heading: "About",
    links: ["About Us"],
  },
  {
    heading: "Contact",
    links: [
      "📍 El Paso, TX",
      "📞 (915) 555-0182",
      "✉ hello@suncitycleaners.com",
      "Hours: Mon–Sat 8am–6pm",
    ],
  },
];

// ─────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

// ─────────────────────────────────────────────
// REVEAL WRAPPER
// ─────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ${delay}ms, transform 0.6s ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled
          ? "rgba(11,37,69,0.98)"
          : "rgba(11,37,69,0.96)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "0 5%",
        transition: "background 0.3s",
      }}
    >
      {/* Top row */}
      <div
        style={{
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/assets/logo.png"
            alt="Sun City Cleaners Logo"
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              flexShrink: 0,
              objectFit: "contain",
            }}
          />
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#fff",
              fontFamily: "Outfit,sans-serif",
            }}
          >
            <span style={{ color: "#FFA800" }}>Sun City</span> Cleaners
          </span>
        </div>

        {/* Desktop links */}
        <div className="nav-desktop-links">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(255,255,255,0.7)",
                fontFamily: "Outfit,sans-serif",
                letterSpacing: "0.02em",
                transition: "color 0.2s",
                padding: "0 4px",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLButtonElement).style.color = "#FFA800")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLButtonElement).style.color =
                  "rgba(255,255,255,0.7)")
              }
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              background: "#FFA800",
              color: "#0B2545",
              border: "none",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "Outfit,sans-serif",
              padding: "9px 22px",
              borderRadius: 8,
              letterSpacing: "0.02em",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "translateY(-1px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 6px 20px rgba(255,168,0,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
            }}
          >
            Get a Quote
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            width: 40,
            height: 40,
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            padding: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: "100%",
                height: 2,
                background: "#fff",
                borderRadius: 2,
                transition: "transform 0.25s, opacity 0.25s",
                transform:
                  menuOpen && i === 0
                    ? "translateY(7px) rotate(45deg)"
                    : menuOpen && i === 2
                    ? "translateY(-7px) rotate(-45deg)"
                    : "",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? 400 : 0,
          transition: "max-height 0.35s ease",
          borderTop: menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            padding: menuOpen ? "12px 0 20px" : 0,
          }}
        >
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 16,
                fontWeight: 400,
                color: "rgba(255,255,255,0.75)",
                fontFamily: "Outfit,sans-serif",
                textAlign: "left",
                padding: "14px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.2s",
              }}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            style={{
              marginTop: 16,
              background: "#FFA800",
              color: "#0B2545",
              border: "none",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 700,
              fontFamily: "Outfit,sans-serif",
              padding: "13px",
              borderRadius: 10,
              width: "100%",
            }}
          >
            Get a Free Quote
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────

function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#0B2545",
        display: "flex",
        alignItems: "center",
        padding: "100px 5% 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 70% at 70% 50%,rgba(59,189,228,0.08) 0%,transparent 70%),radial-gradient(ellipse 40% 60% at 10% 80%,rgba(255,168,0,0.06) 0%,transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div className="hero-inner">
        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,168,0,0.12)",
              border: "1px solid rgba(255,168,0,0.25)",
              color: "#FFA800",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "6px 14px",
              borderRadius: 100,
              marginBottom: 28,
              animation: "fadeUp 0.7s 0.1s both",
            }}
          >
            ★ #1 Rated Cleaning Service in El Paso
          </div>

          <h1
            style={{
              fontSize: "clamp(38px,5vw,70px)",
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              marginBottom: 24,
              animation: "fadeUp 0.7s 0.2s both",
            }}
          >
            A cleaner home,
            <br />a{" "}
            <em style={{ color: "#FFA800", fontStyle: "normal" }}>brighter</em>{" "}
            day.
          </h1>

          <p
            style={{
              fontSize: 17,
              fontWeight: 300,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              maxWidth: 440,
              marginBottom: 40,
              animation: "fadeUp 0.7s 0.3s both",
            }}
          >
            Professional residential and commercial cleaning services —
            meticulous, reliable, and tailored to your schedule.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              flexWrap: "wrap",
              animation: "fadeUp 0.7s 0.4s both",
            }}
          >
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-primary"
            >
              Book a Clean ↗
            </button>
            <button
              onClick={() => scrollTo("#services")}
              className="btn-outline-hero"
            >
              View Services
            </button>
          </div>

          {/* Mobile trust badges */}
          <div
            className="hero-trust-mobile"
            style={{ display: "flex", gap: 20, marginTop: 36, flexWrap: "wrap" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#FFA800", fontSize: 18 }}>🏆</span>
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 300,
                }}
              >
                500+ Happy customers
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#FFA800" }}>★★★★★</span>
              <span
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 300,
                }}
              >
                5.0 Rating
              </span>
            </div>
          </div>
        </div>

        {/* Image card (hidden on mobile) */}
        <div
          className="hero-image-col"
          style={{ position: "relative", zIndex: 2, animation: "fadeUp 0.8s 0.3s both" }}
        >
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 12px 60px rgba(11,37,69,0.4)",
              aspectRatio: "4/5",
              background: "linear-gradient(135deg,#1a3a5c,#0d2640)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Image
              src="/assets/home page.png"
              alt="Home cleaning"
              fill
              style={{
                objectFit: "cover",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(160deg,transparent 50%,rgba(11,37,69,0.5) 100%)",
              }}
            />
          </div>

          {/* Badge 1 */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: -28,
              background: "#fff",
              borderRadius: 14,
              padding: "16px 20px",
              boxShadow: "0 12px 40px rgba(11,37,69,0.2)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                background: "rgba(255,168,0,0.12)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              🏆
            </div>
            <div>
              <strong
                style={{
                  display: "block",
                  fontSize: 20,
                  fontWeight: 800,
                  color: "#0B2545",
                }}
              >
                500+
              </strong>
              <span style={{ fontSize: 12, color: "#5A6A7A" }}>
                Happy customers
              </span>
            </div>
          </div>

          {/* Badge 2 */}
          <div
            style={{
              position: "absolute",
              top: 24,
              right: -20,
              background: "#0B2545",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 12,
              padding: "12px 16px",
              boxShadow: "0 12px 40px rgba(11,37,69,0.3)",
              animation: "float 3s ease-in-out 1.5s infinite",
            }}
          >
            <div
              style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginBottom: 4 }}
            >
              Customer Rating
            </div>
            <div style={{ color: "#FFA800", fontSize: 14, letterSpacing: 2 }}>
              ★★★★★
            </div>
            <div
              style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 4 }}
            >
              5.0 / 5.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// STATS STRIP
// ─────────────────────────────────────────────

function StatsStrip() {
  return (
    <div
      style={{
        background: "#0B2545",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "0 5%",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
      }}
      className="stats-grid"
    >
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 80}>
          <div
            style={{
              padding: "36px 0",
              textAlign: "center",
              borderRight:
                i < STATS.length - 1
                  ? "1px solid rgba(255,255,255,0.06)"
                  : "none",
            }}
          >
            <div
              style={{
                fontSize: "clamp(28px,3vw,42px)",
                fontWeight: 800,
                color: "#FFA800",
                letterSpacing: "-0.03em",
              }}
            >
              {s.value}
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                marginTop: 4,
                fontWeight: 300,
              }}
            >
              {s.label}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────

function HowItWorks() {
  const iconBg: Record<Step["color"], string> = {
    gold: "rgba(255,168,0,0.12)",
    blue: "rgba(59,189,228,0.12)",
    green: "rgba(30,158,79,0.1)",
  };

  return (
    <section id="how" style={{ padding: "96px 5%", background: "#F7F5F0" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: 60,
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div>
          <Reveal>
            <div className="section-tag">How It Works</div>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="section-title">
              Simple, seamless,
              <br />
              <em style={{ color: "#FFA800", fontStyle: "normal" }}>
                spotless.
              </em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <p className="section-body">
            Getting started takes less than 2 minutes. We handle everything
            else.
          </p>
        </Reveal>
      </div>

      <div className="three-col-grid">
        {STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 100}>
            <div className="how-card" data-num={i + 1}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background: iconBg[step.color],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 24,
                }}
              >
                {step.icon}
              </div>
              <h3
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  marginBottom: 12,
                  color: "#0B2545",
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: "#5A6A7A",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────

function Services() {
  const [showAll, setShowAll] = useState(false);
  const displayedServices = showAll ? SERVICES : SERVICES.slice(0, 3);

  return (
    <section id="services" style={{ padding: "96px 5%", background: "#fff" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="section-tag" style={{ justifyContent: "center" }}>
          Our Services
        </div>
        <h2 className="section-title">
          Everything your space needs,
          <br />
          <em style={{ color: "#FFA800", fontStyle: "normal" }}>covered.</em>
        </h2>
        <p
          className="section-body"
          style={{ margin: "16px auto 0", textAlign: "center" }}
        >
          Transparent pricing, no hidden fees. All services include eco-friendly
          products.
        </p>
      </div>

      <div className="three-col-grid">
        {displayedServices.map((s, i) => (
          <Reveal key={s.title} delay={i * 100}>
            <div
              className="service-card"
              style={{
                background: s.featured ? "#0B2545" : "#F7F5F0",
              }}
            >
              {s.featured && (
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    background: "#FFA800",
                    color: "#0B2545",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 100,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  ⭐ Featured
                </div>
              )}

              {/* Image */}
              <div
                style={{
                  height: 200,
                  background: s.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Info */}
              <div
                style={{
                  padding: 28,
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#3BBDE4",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {s.badge}
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    marginBottom: 10,
                    letterSpacing: "-0.01em",
                    color: s.featured ? "#fff" : "#0B2545",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: s.featured ? "rgba(255,255,255,0.55)" : "#5A6A7A",
                    lineHeight: 1.6,
                    fontWeight: 300,
                    marginBottom: 20,
                  }}
                >
                  {s.body}
                </p>
                <div
                  style={{
                    borderTop: `1px solid ${
                      s.featured ? "rgba(255,255,255,0.08)" : "rgba(11,37,69,0.08)"
                    }`,
                    paddingTop: 16,
                    marginBottom: 20,
                  }}
                >
                  {s.features.map((f) => (
                    <div
                      key={f}
                      style={{
                        fontSize: 13,
                        color: s.featured
                          ? "rgba(255,255,255,0.55)"
                          : "#5A6A7A",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                        fontWeight: 300,
                      }}
                    >
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "#3BBDE4",
                          flexShrink: 0,
                        }}
                      />
                      {f}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: s.featured ? "#fff" : "#0B2545",
                    marginTop: "auto",
                  }}
                >
                  Starting at{" "}
                  <strong
                    style={{
                      fontSize: 28,
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.price}
                  </strong>
                </div>
                <button
                  className={s.featured ? "btn-service-gold" : "btn-service-outline"}
                  style={{ marginTop: 16 }}
                >
                  Book Now →
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Show More/Less Button */}
      {SERVICES.length > 3 && (
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            onClick={() => setShowAll(!showAll)}
            style={{
              background: "none",
              border: "2px solid #0B2545",
              color: "#0B2545",
              fontSize: 14,
              fontWeight: 600,
              padding: "12px 32px",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: "Outfit,sans-serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#0B2545";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
              e.currentTarget.style.color = "#0B2545";
            }}
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </section>
  );
}

// ─────────────────────────────────────────────
// WHY US
// ─────────────────────────────────────────────

function WhyUs() {
  return (
    <section
      id="why"
      className="why-section"
      style={{
        background: "#0B2545",
        padding: "96px 5%",
        display: "grid",
        gap: 64,
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle,rgba(59,189,228,0.08) 0%,transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <Reveal>
          <div className="section-tag" style={{ color: "#3BBDE4" }}>
            Why Sun City
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2
            className="section-title"
            style={{ color: "#fff", marginTop: 8 }}
          >
            We dont just clean.
            <br />
            <em style={{ color: "#FFA800", fontStyle: "normal" }}>We care.</em>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p
            className="section-body"
            style={{ color: "rgba(255,255,255,0.5)", margin: "16px 0 40px" }}
          >
            Founded in El Paso by locals, for locals. We treat every home like
            its our own.
          </p>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 80}>
              <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 10,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    background:
                      r.variant === "gold"
                        ? "rgba(255,168,0,0.12)"
                        : "rgba(59,189,228,0.12)",
                  }}
                >
                  {r.icon}
                </div>
                <div>
                  <strong
                    style={{
                      display: "block",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#fff",
                      marginBottom: 4,
                    }}
                  >
                    {r.title}
                  </strong>
                  <p
                    style={{
                      fontSize: 14,
                      color: "rgba(255,255,255,0.45)",
                      fontWeight: 300,
                      lineHeight: 1.6,
                    }}
                  >
                    {r.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Image col */}
      <Reveal>
        <div style={{ position: "relative" }}>
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              boxShadow: "0 12px 60px rgba(11,37,69,0.4)",
              aspectRatio: "4/5",
              background: "linear-gradient(135deg,#1a3a5c,#0d2640)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Image
              src="/assets/cleaning supplies.png"
              alt="Cleaning supplies"
              fill
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div
            style={{
              position: "absolute",
              bottom: -20,
              left: -20,
              background: "#fff",
              borderRadius: 14,
              padding: "18px 22px",
              boxShadow: "0 12px 40px rgba(11,37,69,0.3)",
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                background: "#1E9E4F",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
              }}
            >
              ✅
            </div>
            <div>
              <strong
                style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#0B2545" }}
              >
                Eco-Certified
              </strong>
              <span style={{ fontSize: 12, color: "#5A6A7A" }}>
                Green clean guaranteed
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────

function Testimonials() {
  return (
    <section id="reviews" style={{ padding: "96px 5%", background: "#F7F5F0" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <div className="section-tag" style={{ justifyContent: "center" }}>
          Reviews
        </div>
        <h2 className="section-title">What our customers say</h2>
      </div>

      <div className="three-col-grid">
        {REVIEWS.map((r, i) => (
          <Reveal key={r.author} delay={i * 100}>
            <div className="review-card">
              <div
                style={{
                  color: "#FFA800",
                  fontSize: 14,
                  letterSpacing: 2,
                  marginBottom: 16,
                }}
              >
                {"★".repeat(r.stars)}
              </div>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  color: "#5A6A7A",
                  lineHeight: 1.7,
                  flex: 1,
                  marginBottom: 24,
                  fontStyle: "italic",
                }}
              >
                {r.text}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: r.avatarBg,
                    color: r.avatarColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 16,
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {r.initial}
                </div>
                <div>
                  <div
                    style={{ fontSize: 14, fontWeight: 600, color: "#0B2545" }}
                  >
                    {r.author}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#5A6A7A", fontWeight: 300 }}
                  >
                    {r.location}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CTA BANNER
// ─────────────────────────────────────────────

function CTABanner() {
  return (
    <section
      id="contact"
      className="cta-banner"
      style={{
        background: "#FFA800",
        padding: "64px 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 40,
        flexWrap: "wrap",
      }}
    >
      <div>
        <h2
          style={{
            fontSize: "clamp(26px,3vw,46px)",
            fontWeight: 800,
            color: "#0B2545",
            letterSpacing: "-0.02em",
          }}
        >
          Ready for a cleaner,
          <br />
          brighter space?
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(11,37,69,0.65)",
            fontWeight: 300,
            marginTop: 10,
          }}
        >
          Book in under 2 minutes. First-time customers get 10% off.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          alignItems: "flex-end",
        }}
        className="cta-actions"
      >
        <button
          style={{
            background: "#0B2545",
            color: "#fff",
            fontFamily: "Outfit,sans-serif",
            fontSize: 15,
            fontWeight: 700,
            padding: "14px 32px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          Get a Free Quote →
        </button>
        <p style={{ fontSize: 13, color: "rgba(11,37,69,0.6)" }}>
          Or call us:{" "}
          <strong style={{ color: "#0B2545" }}>(915) 555-0182</strong>
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#07182E", padding: "64px 5% 32px" }}>
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src="/assets/logo.png"
                alt="Sun City Cleaners Logo"
                fill
                style={{
                  objectFit: "contain",
                  padding: 4,
                }}
              />
            </div>
            <span
              style={{ fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "Outfit,sans-serif" }}
            >
              Sun City Cleaners
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "rgba(255,255,255,0.4)",
              fontWeight: 300,
              lineHeight: 1.7,
              maxWidth: 260,
            }}
          >
            El Pasos trusted cleaning experts. Professional, reliable,
            eco-friendly — since 2022.
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
            {["f", "in", "ig", "g"].map((s) => (
              <div
                key={s}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Columns */}
        {FOOTER_COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                marginBottom: 18,
                fontFamily: "Outfit,sans-serif",
              }}
            >
              {col.heading}
            </h4>
            {col.links.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.45)",
                  fontWeight: 300,
                  marginBottom: 10,
                  fontFamily: "Outfit,sans-serif",
                  textDecoration: "none",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 28,
          marginTop: 48,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>
          © 2026 Sun City Cleaners. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Privacy Policy", "Terms of Service", "Sitemap"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                fontFamily: "Outfit,sans-serif",
              }}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500;600;700;800;900&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { font-family: 'Outfit', sans-serif; background: #F7F5F0; color: #0B2545; overflow-x: hidden; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }

  /* Section shared */
  .section-tag {
    display: inline-flex; align-items: center; gap: 8px;
    color: #3BBDE4; font-size: 12px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px;
  }
  .section-tag::before {
    content: ''; width: 20px; height: 2px;
    background: #3BBDE4; border-radius: 2px;
  }
  .section-title {
    font-size: clamp(30px, 3.5vw, 52px); font-weight: 800;
    letter-spacing: -0.03em; line-height: 1.1;
    font-family: 'Outfit', sans-serif;
  }
  .section-body {
    font-size: 16px; font-weight: 300; color: #5A6A7A;
    line-height: 1.7; max-width: 520px;
  }

  /* Hero layout */
  .hero-inner {
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center; gap: 60px;
    width: 100%; position: relative; z-index: 2;
  }

  /* Stats */
  .stats-grid { grid-template-columns: repeat(4,1fr); }

  /* Grids */
  .three-col-grid {
    display: grid; grid-template-columns: repeat(3,1fr); gap: 24px;
  }

  /* How cards */
  .how-card {
    background: #fff; border-radius: 16px; padding: 40px 32px;
    position: relative; overflow: hidden;
    border: 1px solid rgba(11,37,69,0.06);
    transition: transform 0.3s, box-shadow 0.3s;
    height: 100%;
  }
  .how-card::before {
    content: attr(data-num);
    position: absolute; top: -10px; right: 20px;
    font-size: 120px; font-weight: 900; color: #F7F5F0;
    line-height: 1; pointer-events: none; z-index: 0;
  }
  .how-card > * { position: relative; z-index: 1; }
  .how-card:hover { transform: translateY(-4px); box-shadow: 0 12px 60px rgba(11,37,69,0.18); }

  /* Service card */
  .service-card {
    border-radius: 16px; overflow: hidden;
    border: 1px solid rgba(11,37,69,0.08);
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex; flex-direction: column;
    position: relative; height: 100%;
  }
  .service-card:hover { transform: translateY(-6px); box-shadow: 0 12px 60px rgba(11,37,69,0.18); }

  /* Service buttons */
  .btn-service-gold, .btn-service-outline {
    padding: 12px 20px; border-radius: 10px;
    font-family: 'Outfit', sans-serif; font-size: 14px;
    font-weight: 600; cursor: pointer; border: none;
    display: flex; align-items: center; justify-content: center;
    gap: 6px; transition: transform 0.2s, box-shadow 0.2s; width: 100%;
  }
  .btn-service-gold { background: #FFA800; color: #0B2545; }
  .btn-service-gold:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(255,168,0,0.4); }
  .btn-service-outline { background: transparent; color: #0B2545; border: 1.5px solid rgba(11,37,69,0.15); }
  .btn-service-outline:hover { border-color: #0B2545; }

  /* Why section grid */
  .why-section { grid-template-columns: 1fr 1fr; }

  /* Review card */
  .review-card {
    background: #fff; border-radius: 16px; padding: 32px;
    border: 1px solid rgba(11,37,69,0.06);
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex; flex-direction: column; height: 100%;
  }
  .review-card:hover { transform: translateY(-4px); box-shadow: 0 12px 60px rgba(11,37,69,0.1); }

  /* Nav */
  .nav-hamburger { display: none; }
  .nav-desktop-links { display: flex; align-items: center; gap: 36px; }

  /* Hero buttons */
  .btn-primary {
    background: #FFA800; color: #0B2545; font-family: 'Outfit',sans-serif;
    font-size: 15px; font-weight: 700; padding: 14px 32px; border-radius: 10px;
    border: none; cursor: pointer; letter-spacing: 0.01em;
    transition: transform 0.2s, box-shadow 0.2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(255,168,0,0.45); }
  .btn-outline-hero {
    font-family: 'Outfit',sans-serif; font-size: 15px; font-weight: 500;
    padding: 13px 28px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.2);
    background: transparent; color: rgba(255,255,255,0.8); cursor: pointer;
    transition: border-color 0.2s, color 0.2s;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-outline-hero:hover { border-color: #3BBDE4; color: #3BBDE4; }

  /* Footer grid */
  .footer-grid {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: 48px; margin-bottom: 0;
  }

  /* ─── MOBILE ─── */
  @media (max-width: 900px) {
    .hero-inner { grid-template-columns: 1fr; gap: 0; }
    .hero-image-col { display: none; }
    .stats-grid { grid-template-columns: repeat(2,1fr); }
    .three-col-grid { grid-template-columns: 1fr; }
    .why-section { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
    .nav-hamburger { display: flex !important; }
    .nav-desktop-links { display: none !important; }
    .cta-banner { flex-direction: column; align-items: flex-start !important; }
    .cta-actions { align-items: flex-start !important; }
    .hero-trust-mobile { display: flex !important; }
  }

  @media (max-width: 600px) {
    .stats-grid { grid-template-columns: repeat(2,1fr); }
    .footer-grid { grid-template-columns: 1fr; }
    section { padding: 64px 5% !important; }
  }
`;

// ─────────────────────────────────────────────
// ROOT COMPONENT
// ─────────────────────────────────────────────

export default function SunCityCleaners() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <NavBar />
      <main>
        <Hero />
        <StatsStrip />
        <HowItWorks />
        <Services />
        <WhyUs />
        <Testimonials />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}