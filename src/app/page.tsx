"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  year: string;
  status: string;
  features: string[];
  demo: string;
  github: string;
}

interface SelectedImage {
  image: string;
  title: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

const navItems = [
  { label: "Beranda", id: "home" },
  { label: "Tentang", id: "about" },
  { label: "Project", id: "projects" },
  { label: "Kontak", id: "contact" },
];

const skillGroups = [
  { title: "Mobile", items: ["Kotlin", "Jetpack Compose", "KMP", "Android"] },
  { title: "Web", items: ["Next.js", "React", "Tailwind", "TypeScript"] },
  { title: "Backend & database", items: ["Firebase", "Supabase", "REST API"] },
  { title: "Lainnya", items: ["Java", "C", "Linux", "Git"] },
];

const marqueeItems = [
  "Kotlin",
  "Jetpack Compose",
  "Kotlin Multiplatform",
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "Firebase",
  "Tailwind CSS",
  "TensorFlow Lite",
];

const roles = ["Mobile developer", "Web developer", "Full-stack developer"];

const projects: Project[] = [
  {
    title: "StuntCheck",
    description:
      "Aplikasi mobile untuk monitoring dan mencegah stunting pada balita. Menggunakan Jetpack Compose dengan integrasi Firebase untuk tracking pertumbuhan anak dan analisis data kesehatan.",
    tech: ["Kotlin", "Jetpack Compose", "Firebase", "Machine Learning"],
    image: "/images/stuntcheck-thumbnail.png",
    year: "2024",
    status: "Completed",
    features: ["Real-time Growth Tracking", "Health Analytics", "Parent Dashboard"],
    demo: "#",
    github: "https://github.com/mhdfarhann/StuntCheck",
  },
  {
    title: "MataNetra",
    description:
      "Aplikasi mobile untuk membantu tunanetra mengenali objek menggunakan kamera smartphone dengan fitur voice feedback dan real-time object detection berbasis AI.",
    tech: ["Kotlin", "TensorFlow Lite", "Voice API", "Camera2 API"],
    image: "/images/matanetra-thumbnail.png",
    year: "2023",
    status: "Capstone Project",
    features: ["Object Detection", "Voice Feedback", "Offline Processing"],
    demo: "#",
    github: "https://github.com/mhdfarhann/MataNetra",
  },
  {
    title: "RuteKita",
    description:
      "Aplikasi booking tiket transportasi antar kota menggunakan Kotlin Multiplatform dengan integrasi payment Xendit dan dashboard operator yang comprehensive.",
    tech: ["Kotlin Multiplatform", "Jetpack Compose", "Xendit", "Supabase"],
    image: "/images/rutekita-thumbnail.png",
    year: "2025",
    status: "In Development",
    features: ["Multi-platform Support", "Payment Integration", "Admin Dashboard"],
    demo: "#",
    github: "https://github.com/mhdfarhann",
  },
  {
    title: "QR Ordering SaaS",
    description:
      "Platform pemesanan makanan berbasis QR Code yang memungkinkan restoran mengelola menu digital, menerima pesanan real-time, dan memantau transaksi melalui dashboard admin modern berbasis Next.js.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    image: "/images/qr-order.png",
    year: "2025",
    status: "Active Development",
    features: ["QR Code Menu", "Real-time Ordering", "Admin Dashboard", "Multi-tenant Support"],
    demo: "#",
    github: "https://github.com/mhdfarhann",
  },
  {
    title: "QR Ordering Admin Dashboard",
    description:
      "Dashboard admin untuk mengelola tenant, menu, pesanan, dan transaksi dalam platform QR Ordering SaaS. Dirancang dengan antarmuka modern dan responsif untuk kemudahan operasional restoran.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "ShadCN UI"],
    image: "/images/qr-order-admin.png",
    year: "2025",
    status: "Active Development",
    features: ["Tenant Management", "Menu Management", "Order Tracking", "Analytics & Reports"],
    demo: "#",
    github: "https://github.com/mhdfarhann",
  },
];

const stats = [
  { value: 3.85, decimals: 2, suffix: "", label: "IPK, cum laude" },
  { value: 900, decimals: 0, suffix: "+", label: "Jam Bangkit Academy" },
  { value: projects.length, decimals: 0, suffix: "", label: "Project unggulan" },
];

const years = projects.map((p) => Number(p.year));
const yearRange = `${Math.min(...years)} – ${Math.max(...years)}`;

const statusDot = (status: string) =>
  status === "Completed"
    ? "bg-sea"
    : status.includes("Development")
      ? "bg-accent"
      : "bg-muted";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Hook: true sekali saat elemen masuk viewport */
function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, shown] as const;
}

/* Muncul saat masuk viewport. Efeknya diatur di globals.css. */
function Reveal({
  children,
  className = "",
  variant = "up",
  delay = 0,
}: {
  children?: React.ReactNode;
  className?: string;
  variant?: "up" | "wipe" | "line";
  delay?: number;
}) {
  const [ref, shown] = useInView<HTMLDivElement>(0.1);
  const style = { transitionDelay: `${delay}ms` };

  // "wipe": yang diamati adalah wrapper luar yang tidak di-clip,
  // sehingga gambar tidak bisa terjebak tersembunyi.
  if (variant === "wipe") {
    return (
      <div ref={ref} data-shown={shown} className={className}>
        <div className="reveal reveal-wipe" style={style}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-shown={shown}
      style={style}
      className={`reveal ${variant === "up" ? "reveal-up" : "reveal-line"} ${className}`}
    >
      {children}
    </div>
  );
}

/* Judul yang tiap katanya naik dari balik masker */
function SplitHeading({
  text,
  as: Tag = "h2",
  className = "",
}: {
  text: string;
  as?: "h2" | "p";
  className?: string;
}) {
  const [ref, shown] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} data-shown={shown}>
      <Tag className={className} aria-label={text}>
        {text.split(" ").map((word, i) => (
          <span key={i} className="split-word" aria-hidden="true">
            <span style={{ transitionDelay: `${i * 70}ms` }}>{word}&nbsp;</span>
          </span>
        ))}
      </Tag>
    </div>
  );
}

/* Angka yang menghitung naik saat terlihat */
function CountUp({
  value,
  decimals = 0,
  suffix = "",
}: {
  value: number;
  decimals?: number;
  suffix?: string;
}) {
  const [ref, shown] = useInView<HTMLSpanElement>(0.5);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!shown) return;
    if (prefersReducedMotion()) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1800;
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [shown, value]);

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* Elemen yang sedikit "tertarik" ke arah kursor */
function Magnetic({
  children,
  strength = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${className}`}
    >
      {children}
    </div>
  );
}

/* Kartu dengan efek tilt 3D dan kilau mengikuti kursor */
function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--ry", `${(px - 0.5) * 8}deg`);
    el.style.setProperty("--rx", `${(0.5 - py) * 8}deg`);
    el.style.setProperty("--px", `${px * 100}%`);
    el.style.setProperty("--py", `${py * 100}%`);
    el.classList.add("is-active");
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.classList.remove("is-active");
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`tilt ${className}`}>
      {children}
      <div className="shine pointer-events-none absolute inset-0" aria-hidden="true" />
    </div>
  );
}

/* Kursor kustom: titik + cincin yang mengikuti dengan halus */
function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;

    const root = document.documentElement;
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dotRef.current) dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      root.classList.add("cursor-visible");

      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, input, [role='button']");
      setLabel(labelled?.dataset.cursor ?? "");
      ringRef.current?.classList.toggle("is-hover", !!interactive && !labelled);
    };

    const onLeave = () => root.classList.remove("cursor-visible");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      root.classList.remove("cursor-visible");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className={`cursor-ring ${label ? "has-label" : ""}`} aria-hidden="true">
        <span>{label}</span>
      </div>
    </>
  );
}

/* Gambar dengan placeholder yang selalu terlihat bila file gagal dimuat */
function SafeImage({
  src,
  alt,
  label,
  sizes,
  className,
}: {
  src: string;
  alt: string;
  label: string;
  sizes: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-raised p-4 text-center">
        <span className="font-display text-sm font-semibold text-muted">{label}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}

function Letters({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="rise inline-block transition-colors duration-500 hover:text-accent"
          style={{ animationDelay: `${200 + (offset + i) * 50}ms` }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

function SectionHeader({ index, title, note }: { index: string; title: string; note?: string }) {
  return (
    <div>
      <Reveal variant="line" className="h-px bg-line" />
      <div className="flex items-end justify-between gap-6 pt-6">
        <div className="flex items-baseline gap-4">
          <Reveal>
            <span className="font-display text-sm font-semibold text-accent">{index}</span>
          </Reveal>
          <SplitHeading
            text={title}
            className="font-display stretch-wide text-4xl font-extrabold tracking-tight sm:text-5xl"
          />
        </div>
        {note && (
          <Reveal delay={200}>
            <p className="font-display text-sm text-muted">{note}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Halo! Saya asisten AI Muhammad Farhan. Saya bisa membantu Anda mengetahui lebih lanjut tentang skills, project, dan pengalaman saya. Ada yang ingin Anda tanyakan?",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Scroll: status navbar, progress bar, dan nama hero yang bergeser pelan
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setIsScrolled(y > 50);

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      }
      if (nameRef.current) {
        const p = Math.min(y, 900);
        nameRef.current.style.transform = `translateY(${p * 0.25}px) scale(${1 - p * 0.00012})`;
        nameRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.85)));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Tandai menu navigasi sesuai section yang sedang dilihat
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Kunci scroll saat modal gambar terbuka, tutup dengan Escape
  useEffect(() => {
    if (!selectedImage) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selectedImage]);

  // Chat selalu menampilkan pesan terbaru
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const handleHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Kirim seluruh riwayat percakapan (tanpa sapaan awal)
          messages: [
            ...messages.slice(1).map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
            { role: "user", content: userMessage },
          ],
        }),
      });

      const result = await response.json();

      // Backend mengembalikan { success: true, message } atau { success: false, error }
      if (!result.success) {
        throw new Error(result.error);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: result.message }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Maaf, terjadi kesalahan. Silakan coba lagi." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      sendMessage();
    }
  };

  const arrow = (
    <svg className="h-4 w-4 transition-transform duration-500 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
    </svg>
  );

  return (
    <div className="min-h-svh overflow-x-clip bg-ink text-fg">
      <Cursor />
      <div className="grain" aria-hidden="true" />

      {/* Progress scroll */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-gradient-to-r from-accent/40 via-accent to-accent"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Image modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          className="pop fixed inset-0 z-[9999] flex items-center justify-center bg-ink/95 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Tutup gambar"
            className="absolute right-2 top-2 p-3 text-muted transition-all duration-300 hover:rotate-90 hover:text-fg sm:right-5 sm:top-5"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mx-4 w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-line bg-raised sm:aspect-video">
              <SafeImage
                src={selectedImage.image}
                alt={selectedImage.title}
                label={selectedImage.title}
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <p className="font-display mt-4 text-lg font-semibold">{selectedImage.title}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-500 ${
          isScrolled || isMenuOpen ? "py-3" : "py-5"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 lg:px-6">
          <div
            className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 sm:px-5 ${
              isScrolled || isMenuOpen
                ? "border-line bg-ink/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl"
                : "border-transparent"
            }`}
          >
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="font-display group flex items-center gap-2.5 text-sm font-bold"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-extrabold text-ink transition-transform duration-500 group-hover:rotate-[360deg]">
                MF
              </span>
              <span className="hidden sm:inline">Muhammad Farhan</span>
            </button>

            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`font-display relative rounded-full px-4 py-1.5 text-sm transition-colors duration-300 ${
                    activeSection === item.id ? "text-ink" : "text-muted hover:text-fg"
                  }`}
                >
                  <span
                    className={`absolute inset-0 -z-10 rounded-full bg-fg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      activeSection === item.id ? "scale-100 opacity-100" : "scale-75 opacity-0"
                    }`}
                  />
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMenuOpen}
              className="relative h-8 w-8 text-muted hover:text-fg md:hidden"
            >
              <span
                className={`absolute left-1.5 right-1.5 h-px bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-1/2 rotate-45" : "top-[11px]"
                }`}
              />
              <span
                className={`absolute left-1.5 right-1.5 h-px bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-1/2 -rotate-45" : "top-[20px]"
                }`}
              />
            </button>
          </div>

          {isMenuOpen && (
            <div className="pop mt-2 flex flex-col overflow-hidden rounded-2xl border border-line bg-ink/90 p-2 backdrop-blur-xl md:hidden">
              {navItems.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="msg-in font-display flex items-center justify-between rounded-xl px-4 py-3 text-left text-base text-muted transition-colors hover:bg-raised hover:text-fg"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {item.label}
                  <span className="text-xs text-accent">0{i + 1}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        onMouseMove={handleHeroMove}
        className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-12 pt-28 sm:pb-16 sm:pt-36 lg:px-8"
      >
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="aurora aurora-a" aria-hidden="true" />
        <div className="aurora aurora-b" aria-hidden="true" />
        <div className="spotlight pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div
            className="fade-up font-display mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-ink/40 px-3 py-1.5 text-xs font-semibold text-muted backdrop-blur sm:mb-10"
            style={{ animationDelay: "100ms" }}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sea opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sea" />
            </span>
            Tersedia untuk proyek freelance
          </div>

          <h1
            ref={nameRef}
            aria-label="Muhammad Farhan"
            className="parallax font-display stretch-wide origin-bottom-left text-[clamp(2.25rem,12.5vw,10rem)] font-extrabold leading-[0.92] tracking-[-0.02em] will-change-transform"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <Letters text="Muhammad" />
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <Letters text="Farhan" offset={8} />
              <span
                aria-hidden="true"
                className="rise inline-block text-accent"
                style={{ animationDelay: `${200 + 14 * 50}ms` }}
              >
                .
              </span>
            </span>
          </h1>

          <div className="draw mt-8 h-px bg-gradient-to-r from-accent via-accent/50 to-transparent sm:mt-10" />

          <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:grid-cols-12">
            <div className="fade-up md:col-span-4" style={{ animationDelay: "1100ms" }}>
              <p className="font-display text-xl font-semibold">
                <span className="rotator">
                  {roles.map((role) => (
                    <span key={role}>{role}</span>
                  ))}
                </span>
              </p>
              <p className="mt-1 text-muted">Aceh, Indonesia</p>
            </div>

            <div
              className="fade-up md:col-span-8 lg:col-span-6 lg:col-start-7"
              style={{ animationDelay: "1250ms" }}
            >
              <p className="max-w-[34rem] text-lg leading-relaxed text-fg/85 sm:text-xl">
                Saya membangun aplikasi mobile dengan Kotlin Multiplatform dan Jetpack Compose,
                serta website dengan Next.js dan React. Dari aplikasi pemantau tumbuh kembang
                anak sampai platform pemesanan restoran.
              </p>

              <div className="font-display mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm font-semibold">
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollToSection("projects")}
                    className="btn-fill group/link flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-ink"
                  >
                    Lihat project
                    {arrow}
                  </button>
                </Magnetic>
                <Magnetic>
                  <button
                    type="button"
                    onClick={() => scrollToSection("contact")}
                    className="rounded-full border border-line px-6 py-3.5 transition-colors duration-300 hover:border-fg"
                  >
                    Hubungi saya
                  </button>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("about")}
          aria-label="Gulir ke bawah"
          className="fade-up absolute bottom-8 right-6 hidden flex-col items-center gap-3 lg:right-8 lg:flex"
          style={{ animationDelay: "1600ms" }}
        >
          <span className="font-display text-[10px] font-semibold uppercase tracking-[0.3em] text-muted [writing-mode:vertical-rl]">
            Scroll
          </span>
          <span className="scroll-line h-14 w-px bg-line" />
        </button>
      </section>

      {/* Marquee teknologi */}
      <div className="space-y-3 border-y border-line py-6" aria-hidden="true">
        {[false, true].map((reverse) => (
          <div key={String(reverse)} className="marquee overflow-hidden">
            <div className={`marquee-track flex w-max ${reverse ? "reverse" : ""}`}>
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <div key={i} className="flex items-center gap-10 pr-10">
                  <span
                    className={`font-display stretch-wide cursor-default text-[clamp(1.75rem,4.5vw,3.5rem)] font-extrabold leading-none ${
                      reverse ? "outline-text" : "text-fg/90 transition-colors duration-300 hover:text-accent"
                    }`}
                  >
                    {item}
                  </span>
                  <span className="h-2 w-2 rotate-45 bg-accent" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* About */}
      <section id="about" className="px-6 py-20 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader index="01" title="Tentang" />

          <div className="mt-10 grid gap-10 sm:mt-14 sm:gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Reveal variant="wipe">
                <div className="group relative aspect-[4/5] w-48 overflow-hidden rounded-2xl border border-line bg-raised sm:w-60">
                  <SafeImage
                    src="/images/profile.jpg"
                    alt="Foto Muhammad Farhan"
                    label="MF"
                    sizes="240px"
                    className="object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <SplitHeading
                as="p"
                text="Full-Stack Developer yang berfokus pada aplikasi mobile dengan Kotlin Multiplatform dan Jetpack Compose, serta website modern dengan Next.js dan React."
                className="max-w-[40rem] text-2xl leading-snug sm:text-3xl"
              />

              <Reveal delay={120} className="mt-6 max-w-[38rem] space-y-4 text-[1.0625rem] leading-relaxed text-fg/75 sm:mt-8 sm:text-lg">
                <p>
                  Lulusan cum laude dari Universitas Syiah Kuala dengan IPK 3.85/4.00 dan salah
                  satu dari Top 10 GPA achievers.
                </p>
                <p>
                  Sebagai peserta terpilih program Bangkit Academy (Google, Tokopedia, Gojek,
                  Traveloka), saya telah menyelesaikan 900+ jam program Mobile Development.
                  Berpengalaman dalam pengembangan full-stack dengan integrasi Firebase,
                  Supabase, dan teknologi web modern.
                </p>
              </Reveal>

              {/* Statistik */}
              <div className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:mt-12">
                {stats.map((s, i) => (
                  <Reveal key={s.label} delay={i * 100} className="bg-ink p-4 sm:p-6">
                    <p className="font-display stretch-wide text-2xl font-extrabold text-accent sm:text-4xl">
                      <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                    </p>
                    <p className="font-display mt-1 text-xs text-muted sm:text-sm">{s.label}</p>
                  </Reveal>
                ))}
              </div>

              <dl className="mt-10 sm:mt-12">
                {skillGroups.map((group, i) => (
                  <Reveal
                    key={group.title}
                    delay={i * 90}
                    className="group grid gap-3 border-t border-line py-5 last:border-b sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="font-display text-sm font-semibold text-muted transition-colors duration-300 group-hover:text-accent">
                      {group.title}
                    </dt>
                    <dd className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="font-display rounded-full border border-line px-3 py-1 text-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                        >
                          {item}
                        </span>
                      ))}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-20 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader index="02" title="Project" note={yearRange} />

          <div className="mt-6">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group grid items-center gap-6 border-b border-line py-12 md:grid-cols-12 md:gap-12 md:py-16"
              >
                <Reveal
                  variant="wipe"
                  className={`md:col-span-7 ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <Tilt className="relative overflow-hidden rounded-2xl border border-line bg-raised transition-colors duration-500 group-hover:border-accent/60">
                    <button
                      type="button"
                      data-cursor="Lihat"
                      onClick={() => setSelectedImage({ image: project.image, title: project.title })}
                      aria-label={`Perbesar gambar ${project.title}`}
                      className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden"
                    >
                      <SafeImage
                        src={project.image}
                        alt={`Tampilan ${project.title}`}
                        label={project.title}
                        sizes="(min-width: 768px) 58vw, 100vw"
                        className="object-cover brightness-[0.85] transition duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:brightness-100"
                      />
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
                    </button>
                  </Tilt>
                </Reveal>

                <Reveal delay={150} className="md:col-span-5">
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span className="font-display flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${statusDot(project.status)}`}
                        aria-hidden="true"
                      />
                      {project.status}
                    </span>
                    <span className="font-display">{project.year}</span>
                  </div>

                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-display text-sm font-semibold text-accent">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display text-2xl font-bold leading-tight transition-transform duration-500 group-hover:translate-x-1 sm:text-3xl">
                      {project.title}
                    </h3>
                  </div>

                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-fg/75 sm:text-lg">
                    {project.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-display rounded-full bg-raised px-3 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="font-display mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-line group/link inline-flex items-center gap-1.5"
                    >
                      Kode di GitHub
                      {arrow}
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-line group/link inline-flex items-center gap-1.5"
                      >
                        Lihat demo
                        {arrow}
                      </a>
                    )}
                  </div>
                </Reveal>
              </article>
            ))}
          </div>

          <Reveal className="pt-10">
            <Magnetic>
              <a
                href="https://github.com/mhdfarhann"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display group/link inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors duration-300 hover:border-accent hover:text-accent"
              >
                Project lainnya di GitHub
                {arrow}
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="relative overflow-hidden px-6 py-20 sm:py-32 lg:px-8">
        <div className="aurora aurora-a opacity-60" aria-hidden="true" />
        <div className="relative mx-auto max-w-6xl">
          <SectionHeader index="03" title="Kontak" />

          <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <SplitHeading
                as="p"
                text="Punya ide aplikasi mobile atau website? Mari wujudkan bersama."
                className="font-display stretch-wide max-w-2xl text-[clamp(1.75rem,5vw,3.5rem)] font-extrabold leading-[1.05] tracking-tight"
              />
              <Reveal delay={200} className="mt-8">
                <a
                  href="mailto:mhdadfarhan03@gmail.com"
                  className="font-display group/link inline-flex items-center gap-3 text-[clamp(1rem,4.2vw,2rem)] font-semibold text-muted transition-colors duration-300 [overflow-wrap:anywhere] hover:text-accent"
                >
                  <span className="link-line">mhdadfarhan03@gmail.com</span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-500 group-hover/link:rotate-45 group-hover/link:border-accent group-hover/link:bg-accent group-hover/link:text-ink sm:h-12 sm:w-12">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </a>
              </Reveal>
            </div>

            <dl className="lg:col-span-4 lg:self-end">
              {[
                {
                  title: "LinkedIn",
                  value: "linkedin.com/in/mhdadfarhan",
                  link: "https://www.linkedin.com/in/mhdadfarhan/",
                },
                {
                  title: "GitHub",
                  value: "github.com/mhdfarhann",
                  link: "https://github.com/mhdfarhann",
                },
              ].map((contact, i) => (
                <Reveal
                  key={contact.title}
                  delay={150 + i * 100}
                  className="border-t border-line last:border-b"
                >
                  <a
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link flex items-center justify-between gap-4 py-5 transition-all duration-500 hover:px-2"
                  >
                    <div>
                      <dt className="font-display text-sm font-semibold text-muted">{contact.title}</dt>
                      <dd className="mt-1 text-lg transition-colors duration-300 [overflow-wrap:anywhere] group-hover/link:text-accent">
                        {contact.value}
                      </dd>
                    </div>
                    <span className="text-muted group-hover/link:text-accent">{arrow}</span>
                  </a>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line px-6 pb-8 pt-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <p
            aria-hidden="true"
            className="font-display stretch-wide select-none bg-gradient-to-b from-fg/15 to-transparent bg-clip-text text-[clamp(3rem,15vw,12rem)] font-extrabold leading-none tracking-tight text-transparent"
          >
            Farhan
          </p>
          <div className="mt-8 flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Muhammad Farhan</p>
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="font-display group inline-flex items-center gap-2 transition-colors hover:text-fg"
            >
              Kembali ke atas
              <svg className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </button>
          </div>
        </div>
      </footer>

      {/* AI chatbot */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="pulse-ring pop font-display fixed bottom-4 right-4 z-40 flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-ink shadow-[0_10px_40px_-10px_rgba(226,176,91,0.6)] transition-transform duration-300 hover:-translate-y-1 sm:bottom-6 sm:right-6"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          Tanya AI
        </button>
      )}

      {isChatOpen && (
        <div className="pop fixed inset-x-0 bottom-0 z-40 flex h-[min(37.5rem,85dvh)] w-full origin-bottom-right flex-col overflow-hidden rounded-t-2xl border border-line bg-ink/90 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:h-[min(37.5rem,calc(100dvh-3rem))] sm:w-96 sm:rounded-2xl">
          <div className="flex items-center justify-between border-b border-line p-4">
            <div className="flex items-center gap-3">
              <div className="font-display relative flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-ink">
                MF
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-ink bg-sea" />
              </div>
              <div>
                <h3 className="font-display text-sm font-semibold">Muhammad Farhan AI</h3>
                <p className="text-xs text-muted">Tanya soal skill dan project</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsChatOpen(false)}
              aria-label="Tutup chat"
              className="text-muted transition-all duration-300 hover:rotate-90 hover:text-fg"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`msg-in flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                    message.role === "user"
                      ? "rounded-br-md bg-accent text-ink"
                      : "rounded-bl-md border border-line bg-raised text-fg/90"
                  }`}
                >
                  <p className="whitespace-pre-wrap text-[0.95rem] leading-relaxed">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="msg-in flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-line bg-raised px-4 py-3">
                  <div className="flex gap-1" aria-label="Sedang mengetik">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-muted" />
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-muted"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-muted"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-line p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanya tentang skills, project, atau pengalaman..."
                aria-label="Pesan"
                className="flex-1 rounded-full border border-line bg-raised px-4 py-2 text-base text-fg transition-colors placeholder:text-muted focus:border-accent focus:outline-none sm:text-sm"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                aria-label="Kirim pesan"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-ink transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
