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

const years = projects.map((p) => Number(p.year));
const yearRange = `${Math.min(...years)} – ${Math.max(...years)}`;

const statusDot = (status: string) =>
  status === "Completed"
    ? "bg-sea"
    : status.includes("Development")
      ? "bg-accent"
      : "bg-muted";

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
  const ref = useRef<HTMLDivElement>(null);
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

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
          className="rise inline-block transition-colors duration-300 hover:text-accent"
          style={{ animationDelay: `${(offset + i) * 55}ms` }}
        >
          {char}
        </span>
      ))}
    </>
  );
}

function SectionHeader({ title, note }: { title: string; note?: string }) {
  return (
    <div>
      <Reveal variant="line" className="h-px bg-line" />
      <div className="flex items-baseline justify-between pt-6">
        <Reveal>
          <h2 className="font-display text-3xl font-bold">{title}</h2>
        </Reveal>
        {note && <p className="text-muted">{note}</p>}
      </div>
    </div>
  );
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        nameRef.current.style.transform = `translateY(${Math.min(y, 900) * 0.2}px)`;
        nameRef.current.style.opacity = String(Math.max(0, 1 - y / (window.innerHeight * 0.9)));
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

  const underline =
    "underline decoration-accent decoration-2 underline-offset-8 transition-colors hover:text-accent";

  return (
    <div className="min-h-svh overflow-x-clip bg-ink text-fg">
      {/* Progress scroll */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[60] h-[2px] w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Image modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.title}
          className="pop fixed inset-0 z-[9999] flex items-center justify-center bg-ink/95 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedImage(null)}
            aria-label="Tutup gambar"
            className="absolute right-2 top-2 p-3 text-muted transition-colors hover:text-fg sm:right-5 sm:top-5"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="mx-4 w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-line bg-raised sm:aspect-video">
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
        className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
          isScrolled || isMenuOpen ? "border-line bg-ink/95 backdrop-blur-md" : "border-transparent"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 sm:py-5">
            <button
              type="button"
              onClick={() => scrollToSection("home")}
              className="font-display text-base font-bold"
            >
              Muhammad Farhan
            </button>

            <div className="hidden gap-8 md:flex">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="font-display relative text-sm text-muted transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-accent after:transition-transform after:duration-300 hover:text-fg hover:after:scale-x-100"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMenuOpen}
              className="-mr-2 p-2 text-muted hover:text-fg md:hidden"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="msg-in flex flex-col border-t border-line py-2 md:hidden">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="font-display py-3 text-left text-base text-muted transition-colors hover:text-fg"
                >
                  {item.label}
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
        className="relative flex min-h-svh flex-col justify-end overflow-hidden px-6 pb-12 pt-28 sm:pb-14 sm:pt-36 lg:px-8"
      >
        <div className="spotlight pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-6xl">
          <h1
            ref={nameRef}
            aria-label="Muhammad Farhan"
            className="parallax font-display stretch-wide text-[clamp(2.25rem,12.5vw,10rem)] font-extrabold leading-[0.92] tracking-[-0.02em] will-change-transform"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <Letters text="Muhammad" />
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <Letters text="Farhan" offset={8} />
            </span>
          </h1>

          <div className="draw mt-8 h-px bg-accent sm:mt-10" />

          <div className="mt-6 grid gap-6 sm:mt-8 sm:gap-8 md:grid-cols-12">
            <div className="rise md:col-span-4" style={{ animationDelay: "1100ms" }}>
              <p className="font-display text-xl font-semibold">Mobile &amp; web developer</p>
              <p className="mt-1 text-muted">Aceh, Indonesia</p>
            </div>

            <div
              className="rise md:col-span-8 lg:col-span-6 lg:col-start-7"
              style={{ animationDelay: "1250ms" }}
            >
              <p className="max-w-[34rem] text-lg leading-relaxed sm:text-xl">
                Saya membangun aplikasi mobile dengan Kotlin Multiplatform dan Jetpack Compose,
                serta website dengan Next.js dan React. Dari aplikasi pemantau tumbuh kembang
                anak sampai platform pemesanan restoran.
              </p>

              <div className="font-display mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => scrollToSection("projects")}
                  className="rounded-sm bg-accent px-5 py-3 text-ink transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Lihat project
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSection("contact")}
                  className={underline}
                >
                  Hubungi saya
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee teknologi */}
      <div className="marquee overflow-hidden border-y border-line py-6" aria-hidden="true">
        <div className="marquee-track flex w-max">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <div key={i} className="flex items-center gap-10 pr-10">
              <span className="outline-text font-display stretch-wide cursor-default text-[clamp(2rem,5vw,4rem)] font-extrabold leading-none">
                {item}
              </span>
              <span className="h-2 w-2 rotate-45 bg-accent" />
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section id="about" className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Tentang" />

          <div className="mt-8 grid gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-12">
            <Reveal variant="wipe" className="lg:col-span-4">
              <div className="relative aspect-[4/5] w-44 overflow-hidden rounded-sm border border-line bg-raised sm:w-52">
                <SafeImage
                  src="/images/profile.jpg"
                  alt="Foto Muhammad Farhan"
                  label="MF"
                  sizes="208px"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <div className="lg:col-span-8">
              <Reveal>
                <p className="max-w-[38rem] text-xl leading-snug sm:text-2xl">
                  Full-Stack Developer yang berfokus pada aplikasi mobile dengan Kotlin
                  Multiplatform dan Jetpack Compose, serta website modern dengan Next.js dan React.
                </p>
              </Reveal>

              <Reveal delay={120} className="mt-6 max-w-[38rem] space-y-4 text-[1.0625rem] leading-relaxed text-fg/80 sm:mt-8 sm:text-lg">
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

              <dl className="mt-10 border-t border-line sm:mt-12">
                {skillGroups.map((group, i) => (
                  <Reveal
                    key={group.title}
                    delay={i * 90}
                    className="grid gap-1 border-b border-line py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                  >
                    <dt className="font-display text-sm font-semibold text-muted">{group.title}</dt>
                    <dd className="text-[1.0625rem] sm:text-lg">{group.items.join(", ")}</dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Project" note={yearRange} />

          <div className="divide-y divide-line">
            {projects.map((project, index) => (
              <article
                key={project.title}
                className="group grid items-center gap-6 py-10 md:grid-cols-12 md:gap-12 md:py-12"
              >
                <Reveal
                  variant="wipe"
                  className={`md:col-span-7 ${index % 2 === 1 ? "md:order-2" : ""}`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedImage({ image: project.image, title: project.title })}
                    aria-label={`Perbesar gambar ${project.title}`}
                    className="relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-sm border border-line bg-raised transition-colors duration-500 group-hover:border-accent"
                  >
                    <SafeImage
                      src={project.image}
                      alt={`Tampilan ${project.title}`}
                      label={project.title}
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover brightness-90 transition duration-700 group-hover:scale-105 group-hover:brightness-100"
                    />
                    <span className="font-display absolute bottom-3 left-3 translate-y-2 rounded-sm bg-ink/85 px-2 py-1 text-xs font-semibold opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Perbesar
                    </span>
                  </button>
                </Reveal>

                <Reveal delay={150} className="md:col-span-5">
                  <div className="flex items-center justify-between text-sm text-muted">
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${statusDot(project.status)}`}
                        aria-hidden="true"
                      />
                      {project.status}
                    </span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="font-display mt-3 text-2xl font-bold leading-tight transition-colors sm:mt-4 sm:text-3xl duration-300 group-hover:text-accent">
                    {project.title}
                  </h3>

                  <p className="mt-3 text-[1.0625rem] leading-relaxed text-fg/80 sm:mt-4 sm:text-lg">{project.description}</p>

                  <p className="mt-5 text-muted">{project.tech.join(", ")}</p>

                  <div className="font-display mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={underline}
                    >
                      Kode di GitHub
                    </a>
                    {project.demo !== "#" && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={underline}
                      >
                        Lihat demo
                      </a>
                    )}
                  </div>
                </Reveal>
              </article>
            ))}
          </div>

          <div className="border-t border-line pt-8">
            <a
              href="https://github.com/mhdfarhann"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-display text-sm font-semibold ${underline}`}
            >
              Project lainnya di GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeader title="Kontak" />

          <div className="mt-10 grid gap-10 sm:mt-16 sm:gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-8">
              <p className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
                Punya ide aplikasi mobile atau website? Ceritakan kebutuhannya lewat email.
              </p>
              <a
                href="mailto:mhdadfarhan03@gmail.com"
                className="font-display mt-6 inline-block text-[clamp(1.125rem,5.6vw,3.25rem)] font-bold leading-tight underline decoration-accent decoration-2 underline-offset-8 transition-colors [overflow-wrap:anywhere] hover:text-accent"
              >
                mhdadfarhan03@gmail.com
              </a>
            </Reveal>

            <dl className="lg:col-span-4">
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
                  className="border-t border-line py-4 last:border-b"
                >
                  <dt className="font-display text-sm font-semibold text-muted">{contact.title}</dt>
                  <dd className="mt-1">
                    <a
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg transition-colors [overflow-wrap:anywhere] hover:text-accent"
                    >
                      {contact.value}
                    </a>
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line px-6 py-8 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Muhammad Farhan</p>
          <p className="flex items-center gap-2">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sea opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sea" />
            </span>
            Terbuka untuk proyek freelance
          </p>
        </div>
      </footer>

      {/* AI chatbot */}
      {!isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="font-display fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5 flex items-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-0.5"
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
        <div className="pop fixed inset-x-0 bottom-0 z-40 flex h-[min(37.5rem,85dvh)] w-full flex-col rounded-t-lg border border-line bg-ink sm:inset-x-auto sm:bottom-4 sm:right-4 sm:h-[min(37.5rem,calc(100dvh-2rem))] sm:w-96 sm:rounded-md shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)]">
          <div className="flex items-center justify-between border-b border-line p-4">
            <div className="flex items-center gap-3">
              <div className="font-display flex h-10 w-10 items-center justify-center rounded-sm bg-accent text-sm font-bold text-ink">
                MF
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
              className="text-muted transition-colors hover:text-fg"
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
                  className={`max-w-[85%] rounded-md px-3 py-2 ${
                    message.role === "user"
                      ? "bg-accent text-ink"
                      : "border border-line bg-raised text-fg/90"
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
                <div className="rounded-md border border-line bg-raised px-3 py-3">
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
                className="flex-1 rounded-md border border-line bg-raised px-3 py-2 text-base text-fg placeholder:text-muted sm:text-sm focus:border-accent focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                aria-label="Kirim pesan"
                className="rounded-md bg-accent px-3 py-2 text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}