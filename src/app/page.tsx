"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Halo! Saya asisten AI Muhammad Farhan. Saya bisa membantu Anda mengetahui lebih lanjut tentang skills, project, dan pengalaman saya. Ada yang ingin Anda tanyakan?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const openImageModal = (image: string, title: string) => {
    setSelectedImage({ image, title });
    setIsModalOpen(true);
  };

  const closeImageModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const sendMessage = async () => {
  if (!inputMessage.trim() || isLoading) return;

  const userMessage = inputMessage.trim();
  setInputMessage('');
  setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
  setIsLoading(true);

  try {
    // Call your Next.js API route instead of Anthropic directly
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Pastikan Anda mengirim seluruh riwayat percakapan yang relevan
        messages: [
          ...messages.slice(1).map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          { role: "user", content: userMessage }
        ],
      })
    });

    const result = await response.json();
    
    if (!result.success) {
      // Jika backend mengirim { success: false, error: '...' }
      throw new Error(result.error);
    }

    // --- FIX KRUSIAL DI SINI ---
    // Backend (route.ts) mengembalikan { success: true, message: "..." }.
    // Kita harus langsung mengakses result.message.
    const assistantMessage = result.message;
    // --- AKHIR FIX KRUSIAL ---

    setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
  } catch (error) {
    console.error('Error:', error);
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: 'Maaf, terjadi kesalahan. Silakan coba lagi.' 
    }]);
  } finally {
    setIsLoading(false);
  }
};

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const projects: Project[] = [
    {
      title: "StuntCheck",
      description: "Aplikasi mobile untuk monitoring dan mencegah stunting pada balita. Menggunakan Jetpack Compose dengan integrasi Firebase untuk tracking pertumbuhan anak dan analisis data kesehatan.",
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
      description: "Aplikasi mobile untuk membantu tunanetra mengenali objek menggunakan kamera smartphone dengan fitur voice feedback dan real-time object detection berbasis AI.",
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
      description: "Aplikasi booking tiket transportasi antar kota menggunakan Kotlin Multiplatform dengan integrasi payment Xendit dan dashboard operator yang comprehensive.",
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
      description: "Platform pemesanan makanan berbasis QR Code yang memungkinkan restoran mengelola menu digital, menerima pesanan real-time, dan memantau transaksi melalui dashboard admin modern berbasis Next.js.",
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
      description: "Dashboard admin untuk mengelola tenant, menu, pesanan, dan transaksi dalam platform QR Ordering SaaS. Dirancang dengan antarmuka modern dan responsif untuk kemudahan operasional restoran.",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "ShadCN UI"],
      image: "/images/qr-order-admin.png",
      year: "2025",
      status: "Active Development",
      features: ["Tenant Management", "Menu Management", "Order Tracking", "Analytics & Reports"],
      demo: "#",
      github: "https://github.com/mhdfarhann",
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Image Modal */}
      {isModalOpen && selectedImage && (
        <div 
          className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={closeImageModal}
        >
          <button
            onClick={closeImageModal}
            className="absolute top-6 right-6 z-[10000] text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="relative max-w-6xl max-h-[90vh] w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full flex flex-col items-center">
              <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden border border-gray-800">
                <Image
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  fill
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="600"%3E%3Crect fill="%23111111" width="800" height="600"/%3E%3Ctext fill="%23666666" font-family="system-ui" font-size="24" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3EImage Preview%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <h3 className="text-xl font-medium text-gray-300 text-center">{selectedImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-md border-b border-gray-900" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="text-xl font-medium text-white">
              Muhammad Farhan
            </div>

            <div className="hidden md:flex gap-8">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-900">
              <div className="py-4 flex flex-col gap-4">
                {["Home", "About", "Projects", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-left text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Mobile & Web Developer
          </h1>
          
          <p className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
            Hi, saya <span className="text-white">Muhammad Farhan</span>! 
          </p>
          <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
            Full-Stack Developer yang fokus mengembangkan aplikasi mobile dengan Kotlin Multiplatform & Jetpack Compose, 
            serta website modern menggunakan Next.js & React
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm"
            >
              Lihat Project Saya
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border border-gray-800 text-white hover:bg-gray-900 transition-colors duration-200 rounded-md text-sm"
            >
              Hubungi Saya
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16">
            Tentang Saya
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <p className="text-gray-400 mb-4 leading-relaxed">
                  Hi! Saya Muhammad Farhan, seorang Full-Stack Developer yang passionate dalam pengembangan aplikasi mobile dengan 
                  Kotlin Multiplatform & Jetpack Compose, serta website modern menggunakan Next.js & React. 
                  Lulusan cum laude dari Universitas Syiah Kuala dengan IPK 3.85/4.00 dan
                  merupakan salah satu dari Top 10 GPA achievers.
                </p>
                <p className="text-gray-400 leading-relaxed">
                  Sebagai peserta terpilih program Bangkit Academy (Google, Tokopedia, Gojek, Traveloka), 
                  saya telah menyelesaikan 900+ jam program Mobile Development. 
                  Berpengalaman dalam pengembangan full-stack dengan integrasi Firebase, Supabase, dan modern web technologies.
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Mobile Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Kotlin", "Jetpack Compose", "KMP", "Android"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-400 text-xs rounded-md border border-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Web Development</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "Tailwind", "TypeScript"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-400 text-xs rounded-md border border-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Backend & Database</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Firebase", "Supabase", "REST API"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-400 text-xs rounded-md border border-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wider">Other Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "C", "Linux", "Git"].map((skill) => (
                      <span key={skill} className="px-3 py-1 bg-gray-900 text-gray-400 text-xs rounded-md border border-gray-800">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="w-48 h-48 rounded-lg overflow-hidden border border-gray-900">
                <Image
                  src="/images/profile.jpg"
                  alt="Muhammad Farhan Profile"
                  width={192}
                  height={192}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-16">
            Project Saya
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group border border-gray-900 rounded-lg overflow-hidden hover:border-gray-800 transition-all duration-300"
              >
                <div 
                  className="relative h-56 bg-gray-900 overflow-hidden cursor-pointer"
                  onClick={() => openImageModal(project.image, project.title)}
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    fill
                    className="object-cover group-hover:opacity-75 transition-opacity duration-300"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23111111" width="400" height="300"/%3E%3Ctext fill="%23666666" font-family="system-ui" font-size="16" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E' + encodeURIComponent(project.title) + '%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      project.status === 'Active Development' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  <div className="absolute top-3 left-3">
                    <span className="bg-black/70 text-gray-400 px-2 py-1 rounded text-xs font-medium">
                      {project.year}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-900 text-gray-400 text-xs rounded border border-gray-800">
                          {tech}
                        </span>
                      ))}
                      {project.tech.length > 3 && (
                        <span className="px-2 py-1 text-gray-500 text-xs">
                          +{project.tech.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => window.open(project.github, '_blank')}
                    className="w-full px-4 py-2 border border-gray-800 text-gray-400 hover:bg-gray-900 hover:text-white rounded text-sm transition-colors duration-200"
                  >
                    View on GitHub
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => window.open('https://github.com/mhdfarhann', '_blank')}
              className="px-6 py-3 border border-gray-800 text-gray-400 hover:bg-gray-900 hover:text-white rounded-md text-sm transition-colors duration-200"
            >
              Lihat Project Lainnya di GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 lg:px-8 border-t border-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-8 text-center">
            Hubungi Saya
          </h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Mari berkolaborasi dalam project mobile & web development berikutnya! 
            Saya siap membantu mewujudkan ide aplikasi Anda.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { 
                icon: "📧", 
                title: "Email", 
                value: "mhdadfarhan03@gmail.com",
                link: "mailto:mhdadfarhan03@gmail.com",
              },
              { 
                icon: "💼", 
                title: "LinkedIn", 
                value: "linkedin.com/in/mhdadfarhan",
                link: "https://www.linkedin.com/in/mhdadfarhan/",
              },
              { 
                icon: "🐙", 
                title: "GitHub", 
                value: "github.com/mhdfarhann",
                link: "https://github.com/mhdfarhann",
              }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block border border-gray-900 rounded-lg p-6 hover:border-gray-800 hover:bg-gray-900/50 transition-all duration-200 text-center"
              >
                <div className="text-3xl mb-3">{contact.icon}</div>
                <h4 className="text-white font-medium text-sm mb-2">{contact.title}</h4>
                <p className="text-gray-400 text-xs">{contact.value}</p>
              </a>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => window.open('mailto:mhdadfarhan03@gmail.com', '_blank')}
              className="px-8 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-200 transition-colors duration-200 text-sm"
            >
              Mari Berkolaborasi! 🚀
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-900 py-12 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-center sm:text-left">
              <div className="text-xl font-medium text-white mb-1">
                Muhammad Farhan
              </div>
              <p className="text-gray-500 text-sm">Full-Stack Developer</p>
            </div>
            
            <div className="flex gap-6">
              <a
                href="https://github.com/mhdfarhann"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mhdadfarhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:mhdadfarhan03@gmail.com"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-900 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
              <p className="text-gray-600">
                © 2025 Muhammad Farhan. All rights reserved.
              </p>
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available for freelance
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-200 transition-all duration-200 z-40"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {isChatOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-black border border-gray-800 rounded-lg shadow-2xl flex flex-col z-40">
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-semibold">
                MF
              </div>
              <div>
                <h3 className="text-sm font-medium text-white">Muhammad Farhan AI</h3>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-white text-black'
                      : 'bg-gray-900 text-gray-300 border border-gray-800'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-900 text-gray-300 border border-gray-800 rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Tanya tentang skills, project, atau pengalaman..."
                className="flex-1 bg-gray-900 text-white border border-gray-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-700"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-white text-black px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}