"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  // Project data with image placeholders
  const projects = [
    {
      title: "StuntCheck",
      description: "Aplikasi mobile untuk monitoring dan mencegah stunting pada balita. Menggunakan Jetpack Compose dengan integrasi Firebase untuk tracking pertumbuhan anak dan analisis data kesehatan.",
      tech: ["Kotlin", "Jetpack Compose", "Firebase", "Machine Learning"],
      image: "/images/stuntcheck-thumbnail.png", // Ganti dengan path gambar sebenarnya
      year: "2024",
      status: "Completed",
      features: ["Real-time Growth Tracking", "Health Analytics", "Parent Dashboard"],
      demo: "#",
      github: "https://github.com/mhdfarhann/StuntCheck"
    },
    {
      title: "MataNetra",
      description: "Aplikasi mobile untuk membantu tunanetra mengenali objek menggunakan kamera smartphone dengan fitur voice feedback dan real-time object detection berbasis AI.",
      tech: ["Kotlin", "TensorFlow Lite", "Voice API", "Camera2 API"],
      image: "/images/matanetra-thumbnail.png", // Ganti dengan path gambar sebenarnya
      year: "2023",
      status: "Capstone Project",
      features: ["Object Detection", "Voice Feedback", "Offline Processing"],
      demo: "#",
      github: "https://github.com/mhdfarhann/MataNetra"
    },
    {
      title: "RuteKita",
      description: "Aplikasi booking tiket transportasi antar kota menggunakan Kotlin Multiplatform dengan integrasi payment Xendit dan dashboard operator yang comprehensive.",
      tech: ["Kotlin Multiplatform", "Jetpack Compose", "Xendit", "Supabase"],
      image: "/images/rutekita-thumbnail.png", // Ganti dengan path gambar sebenarnya
      year: "2025",
      status: "In Development",
      features: ["Multi-platform Support", "Payment Integration", "Admin Dashboard"],
      demo: "#",
      github: "https://github.com/mhdfarhann"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #00bcd4 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Muhammad Farhan
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-cyan-400 transition-all duration-300 relative group font-medium"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-cyan-500/20 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-cyan-500/20 rounded-b-lg">
              <div className="py-4 space-y-4">
                {["Home", "About", "Projects", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-4 font-medium"
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
      <section id="home" className="min-h-screen flex items-center justify-center relative">
        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse blur-sm"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-15 animate-bounce blur-sm"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse delay-1000 blur-sm"></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full opacity-30 animate-ping"></div>
          <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-bounce delay-500 blur-sm"></div>
        </div>

        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full animate-pulse"
            style={{
              backgroundImage: `linear-gradient(rgba(0,188,212,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(0,188,212,0.1) 1px, transparent 1px)`,
              backgroundSize: '100px 100px'
            }}
          ></div>
        </div>

        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur opacity-30 animate-pulse"></div>
              <h1 className="relative text-5xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-white via-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Mobile Developer
              </h1>
            </div>
          </div>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed">
            Hi, saya <span className="font-semibold text-cyan-400">Muhammad Farhan</span>! 
          </p>
          <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Seorang Mobile Developer yang passionate dalam mengembangkan aplikasi Android 
            menggunakan <span className="text-cyan-300 font-medium">Kotlin Multiplatform</span> dan 
            <span className="text-blue-300 font-medium"> Jetpack Compose</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="group px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 relative overflow-hidden"
            >
              <span className="relative z-10">Lihat Project Saya</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="group px-10 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 relative overflow-hidden"
            >
              <span className="relative z-10">Hubungi Saya</span>
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-6xl font-bold text-center mb-20 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Tentang Saya
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed">
                  Hi! Saya <span className="font-semibold text-cyan-400">Muhammad Farhan</span>, 
                  seorang Mobile Developer yang passionate dalam pengembangan aplikasi Android 
                  menggunakan Kotlin Multiplatform dan Jetpack Compose. Lulusan cum laude dari 
                  Universitas Syiah Kuala dengan <span className="text-green-400 font-medium">IPK 3.85/4.00</span> dan
                  merupakan salah satu dari <span className="text-yellow-400 font-medium">Top 10 GPA achievers</span>.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Sebagai peserta terpilih program <span className="text-blue-400 font-medium">Bangkit Academy</span> 
                  (Google, Tokopedia, Gojek, Traveloka), saya telah menyelesaikan 
                  <span className="text-cyan-400 font-medium"> 900+ jam</span> program Mobile Development. 
                  Berpengalaman dalam integrasi Firebase dan Supabase, serta memiliki latar belakang 
                  sebagai Assistant Laboratory dan IT Support.
                </p>
              </div>
              
              {/* Enhanced Skills Section */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
                  Skills & Technologies
                </h3>
                
                {/* Skill Categories */}
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-cyan-300 mb-3">Mobile Development</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Kotlin", "Jetpack Compose", "Kotlin Multiplatform", "Android Development"].map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 rounded-full text-cyan-300 text-sm font-medium hover:from-cyan-500/30 hover:to-blue-500/30 hover:border-cyan-400/60 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-blue-300 mb-3">Backend & Database</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Firebase", "Supabase", "REST API", "Real-time Database"].map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/40 rounded-full text-blue-300 text-sm font-medium hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/60 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-purple-300 mb-3">Other Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Java", "C", "Linux", "IT Support", "Git"].map((skill) => (
                        <span
                          key={skill}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 rounded-full text-purple-300 text-sm font-medium hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/60 transition-all duration-300 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Profile Image Section */}
            <div className="flex justify-center">
              <div className="relative group">
                {/* Outer Glow */}
                <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                
                {/* Profile Container */}
                <div className="relative w-80 h-80 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 group-hover:scale-105 transition-transform duration-500">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden relative">
                    {/* Ganti dengan foto asli Anda */}
                    <Image
                      src="/images/profile.jpg" // Ganti dengan path foto profil Anda
                      alt="Muhammad Farhan Profile"
                      width={300}
                      height={300}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        // Fallback jika gambar tidak ditemukan
                        e.currentTarget.style.display = 'none';
                      }}
                    />
              
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 via-black/50 to-gray-900/50 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #00bcd4 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-6xl font-bold text-center mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Project Saya
          </h2>
          <p className="text-center text-gray-400 text-lg mb-16 max-w-2xl mx-auto">
            Berikut adalah beberapa project mobile development yang telah saya kerjakan
          </p>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-700 to-gray-800 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} thumbnail`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Fallback jika gambar tidak ditemukan
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Completed' ? 'bg-green-500/90 text-white' :
                      project.status === 'In Development' ? 'bg-yellow-500/90 text-black' :
                      'bg-blue-500/90 text-white'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/70 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold">
                      {project.year}
                    </span>
                  </div>
                </div>
                
                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors mb-3">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Key Features</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded border border-gray-600/50"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, idx) => (
                        <span
                          key={tech}
                          className={`px-3 py-1 text-xs rounded-full border font-medium ${
                            idx === 0 ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' :
                            idx === 1 ? 'bg-blue-500/20 text-blue-300 border-blue-500/40' :
                            idx === 2 ? 'bg-purple-500/20 text-purple-300 border-purple-500/40' :
                            'bg-green-500/20 text-green-300 border-green-500/40'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button 
                      onClick={() => window.open(project.github, '_blank')}
                      className="flex-1 px-4 py-3 border-2 border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-300 font-semibold rounded-xl transition-all duration-300 text-sm hover:bg-cyan-500/10"
                    >
                      GitHub
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* View More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-4 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
              Lihat Project Lainnya di GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Hubungi Saya
          </h2>
          <p className="text-gray-300 text-xl mb-4 max-w-3xl mx-auto">
            Mari berkolaborasi dalam project mobile development berikutnya! 
          </p>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Saya siap membantu mewujudkan ide aplikasi mobile Anda dengan 
            <span className="text-cyan-300"> Kotlin Multiplatform</span> dan teknologi modern.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { 
                icon: "📧", 
                title: "Email", 
                value: "mhdadfarhan03@gmail.com",
                link: "mailto:mhdadfarhan03@gmail.com",
                color: "from-red-500/20 to-pink-500/20 border-red-500/40"
              },
              { 
                icon: "💼", 
                title: "LinkedIn", 
                value: "linkedin.com/in/mhdadfarhan",
                link: "https://www.linkedin.com/in/mhdadfarhan/",
                color: "from-blue-500/20 to-cyan-500/20 border-blue-500/40"
              },
              { 
                icon: "🐙", 
                title: "GitHub", 
                value: "github.com/mhdfarhann",
                link: "https://github.com/mhdfarhann",
                color: "from-gray-500/20 to-gray-700/20 border-gray-500/40"
              }
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-gradient-to-b from-gray-800/60 to-gray-900/60 backdrop-blur-sm border rounded-2xl p-8 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 group ${contact.color}`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{contact.icon}</div>
                <h4 className="text-cyan-400 font-bold text-lg mb-3 group-hover:text-cyan-300 transition-colors">{contact.title}</h4>
                <p className="text-gray-300 text-sm group-hover:text-white transition-colors">{contact.value}</p>
              </a>
            ))}
          </div>
          
          <button 
            onClick={() => window.open('mailto:mhdadfarhan03@gmail.com', '_blank')}
            className="group px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 relative overflow-hidden text-lg"
          >
            <span className="relative z-10">Mari Berkolaborasi dalam Mobile Development</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="border-t border-gray-800/50 py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/30 to-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-center sm:text-left">
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                Muhammad Farhan
              </div>
              <p className="text-gray-400 text-sm">Mobile Developer | Kotlin Enthusiast</p>
            </div>
            
            <div className="flex space-x-6">
              <a
                href="https://github.com/mhdfarhann"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mhdadfarhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="mailto:mhdadfarhan03@gmail.com"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 hover:scale-110 transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-1.06.469-2.202.788-3.396.93 1.22-.731 2.158-1.889 2.598-3.267-1.141.677-2.405 1.168-3.75 1.432-1.077-1.146-2.611-1.862-4.311-1.862-3.261 0-5.905 2.645-5.905 5.906 0 .463.052.914.152 1.346-4.905-.246-9.255-2.595-12.166-6.174-.508.871-.8 1.885-.8 2.967 0 2.049 1.043 3.855 2.625 4.915-.968-.03-1.877-.296-2.673-.738v.074c0 2.861 2.034 5.244 4.736 5.787-.495.135-1.016.207-1.554.207-.38 0-.749-.037-1.109-.105.749 2.34 2.924 4.044 5.501 4.089-2.016 1.578-4.558 2.519-7.317 2.519-.475 0-.945-.028-1.407-.082 2.611 1.674 5.709 2.651 9.037 2.651 10.842 0 16.768-8.984 16.768-16.768 0-.255-.006-.51-.017-.765 1.151-.83 2.149-1.869 2.938-3.051l-.003-.003z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div className="border-t border-gray-800/30 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                © 2025 Muhammad Farhan. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Available for freelance
                </span>
                <span>•</span>
                <span>Based in Aceh, Indonesia</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}