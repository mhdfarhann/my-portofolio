"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-cyan-500/20"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Muhammad Farhan
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
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
            <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-cyan-500/20">
              <div className="py-4 space-y-4">
                {["Home", "About", "Projects", "Contact"].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300 px-4"
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
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-10 animate-bounce"></div>
          <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
        </div>

        <div className="text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-fade-in">
            Mobile Developer
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Hi, saya Muhammad Farhan! Saya adalah seorang Mobile Developer yang passionate 
            dalam mengembangkan aplikasi Android menggunakan Kotlin Multiplatform dan Jetpack Compose
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30"
            >
              Lihat Project Saya
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-semibold rounded-full transition-all duration-300"
            >
              Hubungi Saya
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Tentang Saya
          </h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                Hi! Saya Muhammad Farhan, seorang Mobile Developer yang passionate dalam
                pengembangan aplikasi Android menggunakan Kotlin Multiplatform dan Jetpack Compose.
                Lulusan cum laude dari Universitas Syiah Kuala dengan IPK 3.85/4.00 dan
                merupakan salah satu dari Top 10 GPA achievers.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Sebagai peserta terpilih program Bangkit Academy (Google, Tokopedia, Gojek, Traveloka),
                saya telah menyelesaikan 900+ jam program Mobile Development. Berpengalaman dalam
                integrasi Firebase dan Supabase, serta memiliki latar belakang sebagai Assistant Laboratory
                dan IT Support dengan keahlian troubleshooting hardware dan network.
              </p>
              
              {/* Skills */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-cyan-400">Skills & Technologies</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Kotlin", "Jetpack Compose", "Kotlin Multiplatform", "Android Development", 
                    "Firebase", "Supabase", "Java", "C", "Linux", "IT Support"
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                  <span className="text-8xl">👨‍💻</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Project Saya
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "StuntCheck",
                description: "Aplikasi mobile untuk monitoring dan mencegah stunting pada balita. Menggunakan Jetpack Compose dengan integrasi Firebase untuk tracking pertumbuhan anak.",
                tech: ["Kotlin", "Jetpack Compose", "Firebase"],
                image: "📱",
                year: "2024",
                status: "Completed"
              },
              {
                title: "MataNetra",
                description: "Aplikasi mobile untuk membantu tunanetra mengenali objek menggunakan kamera smartphone dengan fitur voice feedback dan real-time object detection.",
                tech: ["Kotlin", "Image Recognition API", "Voice Feedback"],
                image: "👁️",
                year: "2023",
                status: "Capstone Project"
              },
              {
                title: "RuteKita",
                description: "Aplikasi booking tiket transportasi antar kota menggunakan Kotlin Multiplatform dengan integrasi payment Xendit dan dashboard operator.",
                tech: ["Kotlin Multiplatform", "Jetpack Compose", "Xendit", "Supabase"],
                image: "🎫",
                year: "2025",
                status: "In Development"
              }
            ].map((project, index) => (
              <div
                key={index}
                className="group bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20"
              >
                <div className="text-4xl mb-4 text-center">{project.image}</div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-1 rounded-full">
                    {project.year}
                  </span>
                </div>
                <div className="mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                    project.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-300' :
                    'bg-blue-500/20 text-blue-300'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <button className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-medium rounded-lg transition-all duration-300 text-sm">
                    Live Demo
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-600 hover:border-cyan-500 text-gray-300 hover:text-cyan-300 font-medium rounded-lg transition-all duration-300 text-sm">
                    GitHub
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-cyan-400 bg-clip-text text-transparent">
            Hubungi Saya
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            Mari berkolaborasi dalam project mobile development berikutnya! Saya siap membantu
            mewujudkan ide aplikasi mobile Anda dengan Kotlin Multiplatform dan teknologi modern.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: "📧", title: "Email", value: "mhdadfarhan03@gmail.com" },
              { icon: "💼", title: "LinkedIn", value: "linkedin.com/in/mhdadfarhan" },
              { icon: "🐙", title: "GitHub", value: "github.com/mhdfarhann" }
            ].map((contact, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-3xl mb-3">{contact.icon}</div>
                <h4 className="text-cyan-400 font-semibold mb-2">{contact.title}</h4>
                <p className="text-gray-300 text-sm">{contact.value}</p>
              </div>
            ))}
          </div>
          
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30">
            Mari Berkolaborasi dalam Mobile Development
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              M. Farhan
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/mhdfarhann"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/mhdadfarhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                LinkedIn
              </a>
              <a
                href="mailto:mhdadfarhan03@gmail.com"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}