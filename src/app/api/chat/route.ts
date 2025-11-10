import { NextRequest, NextResponse } from 'next/server';

// Definisikan interface untuk tipe data
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export async function POST(request: NextRequest) {
  try {
    const { messages }: { messages: Message[] } = await request.json();

    // Context tetap di sini, tapi akan dipindah ke systemInstruction
    const portfolioContext = `
Anda adalah asisten AI untuk Muhammad Farhan, seorang Full-Stack Developer. Jawab pertanyaan dengan ramah, informatif, dan profesional dalam Bahasa Indonesia. Berikut informasi lengkapnya:

PROFIL:
- Nama: Muhammad Farhan
- Posisi: Full-Stack Developer (Mobile & Web Specialist)
- Pendidikan: Lulusan Cum Laude Universitas Syiah Kuala dengan IPK 3.85/4.00
- Prestasi: Top 10 GPA achievers
- Program: Peserta terpilih Bangkit Academy (Google, Tokopedia, Gojek, Traveloka) - 900+ jam Mobile Development
- Lokasi: Aceh, Indonesia
- Status: Available for freelance

SKILLS:
Mobile Development:
- Kotlin, Jetpack Compose, Kotlin Multiplatform (KMP), Android Development

Web Development:
- Next.js, React, Tailwind CSS, TypeScript, JavaScript

Backend & Database:
- Firebase, Supabase, REST API, Real-time Database

Other Technologies:
- Java, C, Linux, IT Support, Git, Responsive Design

PROJECTS:
1. StuntCheck (2024) - Completed
    - Aplikasi mobile monitoring stunting pada balita
    - Tech: Kotlin, Jetpack Compose, Firebase, Machine Learning
    - Features: Real-time Growth Tracking, Health Analytics, Parent Dashboard

2. MataNetra (2023) - Capstone Project
    - Aplikasi untuk tunanetra mengenali objek dengan AI
    - Tech: Kotlin, TensorFlow Lite, Voice API, Camera2 API
    - Features: Object Detection, Voice Feedback, Offline Processing

3. RuteKita (2025) - In Development
    - Aplikasi booking tiket transportasi antar kota
    - Tech: Kotlin Multiplatform, Jetpack Compose, Xendit, Supabase
    - Features: Multi-platform Support, Payment Integration, Admin Dashboard

4. QR Ordering SaaS (2025) - Active Development
    - Platform pemesanan makanan berbasis QR Code untuk restoran
    - Tech: Next.js, TypeScript, Supabase, Tailwind CSS
    - Features: QR Code Menu, Real-time Ordering, Admin Dashboard, Multi-tenant Support

5. QR Ordering Admin Dashboard (2025) - Active Development
    - Dashboard admin untuk platform QR Ordering
    - Tech: Next.js, TypeScript, Supabase, Tailwind CSS, ShadCN UI
    - Features: Tenant Management, Menu Management, Order Tracking, Analytics & Reports

KONTAK:
- Email: mhdadfarhan03@gmail.com
- LinkedIn: linkedin.com/in/mhdadfarhan
- GitHub: github.com/mhdfarhann

Jika ditanya tentang project atau skills, berikan detail yang relevan. Jika ada pertanyaan di luar konteks portfolio, arahkan kembali ke topik profesional Muhammad Farhan.
`;

    // Ambil riwayat percakapan dari frontend, dengan memastikan format role yang benar
    const conversationHistory: GeminiMessage[] = messages.map((msg: Message) => ({
      // Perhatikan: role 'assistant' dari frontend harus dikonversi menjadi 'model' untuk Gemini API
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Ganti V1 menjadi V1BETA untuk mendukung systemInstruction
    const response = await fetch(
      // PERUBAHAN KRUSIAL DI SINI: v1 DIGANTI MENJADI v1beta
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GOOGLE_GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: conversationHistory, // Riwayat percakapan yang bersih

          // Gunakan systemInstruction untuk mendefinisikan persona dan konteks model.
          systemInstruction: {
            parts: [{ text: portfolioContext }]
          },
          
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE"
            }
          ]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error:', errorData);
      // Pengecekan error tetap penting
      throw new Error(`API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    
    const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'Maaf, saya tidak dapat memproses pertanyaan Anda.';

    return NextResponse.json({ 
      success: true, 
      message: assistantMessage
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Terjadi kesalahan saat memproses pesan'
      },
      { status: 500 }
    );
  }
}