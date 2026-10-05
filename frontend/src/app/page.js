"use client";
import Link from 'next/link';
import { Camera, NotebookPen, Leaf, Sparkles, Droplet, Sun, BookOpen, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-enter" style={{ paddingTop: '2.5rem', paddingBottom: '4rem' }}>

      {/* ─── HERO BÖLÜMÜ ─── */}
      <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 4.5rem' }}>

        {/* Dekoratif Rozet */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(125,155,110,0.12)', border: '1px solid rgba(125,155,110,0.25)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-green)', fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
          <Leaf size={15} />
          <span>Yapay Zekâ Destekli Botanik Not Defteri</span>
        </div>

        <h1 style={{ marginBottom: '1.2rem', fontSize: 'clamp(2.5rem, 5vw, 3.8rem)', lineHeight: 1.15, color: '#f3efe6' }}>
          Bitki Fotoğraflarını & Saha Notlarını<br />
          <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic', fontWeight: 500 }}>Keşfet & Kaydet</span>
        </h1>

        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
          Bitki fotoğraflarını yükleyin, el yazısı saha notlarınızı analiz ettirin ve kişisel botanik defterinizde çizimlerinizle birlikte saklayın.
        </p>

        {/* ─── DÖRT BELİRGİN VE GÖRKEMLİ ANA EYLEM KARTI ─── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1050px',
          margin: '0 auto 4rem',
        }}>
          {/* 1. Fotoğraf Yükle & Tanı */}
          <Link href="/identify" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(20, 32, 25, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(130, 173, 118, 0.4)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.4rem',
              textAlign: 'center',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(130, 173, 118, 0.8)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(130, 173, 118, 0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(130, 173, 118, 0.4)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)';
              }}
            >
              <div style={{
                width: 58, height: 58,
                borderRadius: '50%',
                background: 'rgba(130, 173, 118, 0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-green)',
                marginBottom: '1.1rem',
                border: '1px solid rgba(130, 173, 118, 0.4)'
              }}>
                <Camera size={28} strokeWidth={1.6} />
              </div>
              <div style={{ fontWeight: 600, fontSize: '1.12rem', color: '#ffffff', marginBottom: '0.4rem', fontFamily: "'Lora', Georgia, serif" }}>
                Fotoğraf Yükle & Tanı
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
                Bitki fotoğrafı yükleyip yapay zekâ ile türünü öğrenin
              </div>
            </div>
          </Link>

          {/* 2. Yapay Zekâ Botanik Asistanı */}
          <Link href="/identify" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(38, 25, 35, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(196, 118, 201, 0.45)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.4rem',
              textAlign: 'center',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(196, 118, 201, 0.85)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(196, 118, 201, 0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(196, 118, 201, 0.45)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)';
              }}
            >
              <div style={{
                width: 58, height: 58,
                borderRadius: '50%',
                background: 'rgba(196, 118, 201, 0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#e288e6',
                marginBottom: '1.1rem',
                border: '1px solid rgba(196, 118, 201, 0.4)'
              }}>
                <Sparkles size={28} strokeWidth={1.6} />
              </div>
              <div style={{ fontWeight: 600, fontSize: '1.12rem', color: '#ffffff', marginBottom: '0.4rem', fontFamily: "'Lora', Georgia, serif" }}>
                Yapay Zekâ Asistanı
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
                El yazısı not, reçete ve hastalık teşhisi yapın
              </div>
            </div>
          </Link>

          {/* 3. Kişisel Not Defterim & Çizim */}
          <Link href="/notebook" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(32, 28, 20, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(201, 168, 76, 0.45)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.4rem',
              textAlign: 'center',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.85)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(201, 168, 76, 0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.45)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)';
              }}
            >
              <div style={{
                width: 58, height: 58,
                borderRadius: '50%',
                background: 'rgba(201, 168, 76, 0.22)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-gold)',
                marginBottom: '1.1rem',
                border: '1px solid rgba(201, 168, 76, 0.4)'
              }}>
                <NotebookPen size={28} strokeWidth={1.6} />
              </div>
              <div style={{ fontWeight: 600, fontSize: '1.12rem', color: '#ffffff', marginBottom: '0.4rem', fontFamily: "'Lora', Georgia, serif" }}>
                Not Defterim & Çizim
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
                Saha notlarınızı saklayın ve bitkinizi tuvalde çizin
              </div>
            </div>
          </Link>

          {/* 4. Bitki Koleksiyonu */}
          <Link href="/plants" style={{ display: 'block', textDecoration: 'none' }}>
            <div style={{
              background: 'rgba(22, 30, 27, 0.85)',
              backdropFilter: 'blur(20px)',
              border: '1.5px solid rgba(162, 186, 154, 0.35)',
              borderRadius: 'var(--radius-xl)',
              padding: '2rem 1.4rem',
              textAlign: 'center',
              transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
              cursor: 'pointer',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)'
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(162, 186, 154, 0.75)';
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 18px 45px rgba(162, 186, 154, 0.2)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(162, 186, 154, 0.35)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.12)';
              }}
            >
              <div style={{
                width: 58, height: 58,
                borderRadius: '50%',
                background: 'rgba(162, 186, 154, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-sage)',
                marginBottom: '1.1rem',
                border: '1px solid rgba(162, 186, 154, 0.35)'
              }}>
                <BookOpen size={28} strokeWidth={1.6} />
              </div>
              <div style={{ fontWeight: 600, fontSize: '1.12rem', color: '#ffffff', marginBottom: '0.4rem', fontFamily: "'Lora', Georgia, serif" }}>
                Bitki Koleksiyonu
              </div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-tertiary)', lineHeight: 1.45 }}>
                Tüm kayıtlı bitkileri ve bakım rehberlerini listeleyin
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* ─── ÖNE ÇIKAN ÖZELLİKLER ─── */}
      <div style={{
        borderTop: '1px solid rgba(143, 164, 134, 0.15)',
        paddingTop: '3.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '2.5rem',
        maxWidth: '960px',
        margin: '0 auto',
      }}>
        {[
          {
            icon: <NotebookPen size={22} strokeWidth={1.5} />,
            color: 'var(--accent-gold)',
            title: 'El Yazısı & Kitap OCR',
            desc: 'Fotoğraftaki her not, paragraf ve başlık eksiksiz okunur.',
          },
          {
            icon: <Sparkles size={22} strokeWidth={1.5} />,
            color: 'var(--accent-sage)',
            title: 'Gerçek Vision AI',
            desc: 'Görseller Gemini Vision ile gerçek zamanlı analiz edilir.',
          },
          {
            icon: <Droplet size={22} strokeWidth={1.5} />,
            color: '#89b8cb',
            title: 'Kapsamlı Bakım Verisi',
            desc: 'Sulama, ışık, toprak, pH, nem ve soğuğa dayanıklılık bilgileri.',
          },
          {
            icon: <Sun size={22} strokeWidth={1.5} />,
            color: '#9ca66b',
            title: 'Peyzaj & Şifa Değeri',
            desc: 'Tıbbi çaylar, arıcılık ve bahçe sanatında kullanım rehberi.',
          },
        ].map((f, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div style={{
              width: 44, height: 44,
              borderRadius: 12,
              background: 'rgba(20, 27, 23, 0.75)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: f.color,
              border: '1px solid rgba(143, 164, 134, 0.18)',
            }}>
              {f.icon}
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.98rem', color: '#f3efe6', fontFamily: "'Outfit', sans-serif" }}>{f.title}</div>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'var(--text-tertiary)' }}>{f.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
