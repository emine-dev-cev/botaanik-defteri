import './globals.css';
import Link from 'next/link';
import { Leaf, Camera, BookOpen, NotebookPen, Sparkles, User } from 'lucide-react';

export const metadata = {
  title: 'Sunrise — Bitki Tanıma & Saha Günlüğü',
  description: 'Bitki fotoğraflarını ve el yazısı notları yapay zekâ ile tanı, botanik defterine kaydet.',
  other: {
    'link': [
      '<link rel="preconnect" href="https://botaanik-defteri.onrender.com" crossorigin="anonymous">',
      '<link rel="dns-prefetch" href="https://botaanik-defteri.onrender.com">',
      '<link rel="preconnect" href="https://fonts.googleapis.com">',
      '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">',
    ]
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <header className="container" style={{ paddingTop: '1.25rem' }}>
          <nav className="navbar animate-enter" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.85rem 1.6rem',
            background: 'rgba(20, 27, 23, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(143, 164, 134, 0.2)',
            borderRadius: 'var(--radius-full)',
            marginBottom: '2rem',
          }}>
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '1.2rem',
                fontWeight: '600',
                fontFamily: "'Lora', Georgia, serif",
                color: '#f3efe6',
                letterSpacing: '-0.01em',
                textDecoration: 'none'
              }}
            >
              <div style={{
                width: 38, height: 38,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid rgba(201, 168, 76, 0.6)',
                boxShadow: '0 0 12px rgba(201, 168, 76, 0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <img src="/sunsiree-logo.jpg" alt="Sunrise Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span><span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>Sunrise</span> Bitki</span>
            </Link>

            {/* Mobil & Masaüstü Üst Giriş Yap Butonu */}
            <Link
              href="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.85rem',
                color: '#121814',
                background: 'linear-gradient(135deg, var(--accent-gold), #eed588)',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(229, 195, 104, 0.35)',
                flexShrink: 0
              }}
            >
              <User size={15} />
              <span>Giriş Yap</span>
            </Link>

            {/* Masaüstü Linkler */}
            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link href="/" className="nav-link" style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                transition: 'var(--transition-fast)'
              }}>
                Ana Sayfa
              </Link>
              
              <Link href="/plants" className="nav-link" style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'var(--transition-fast)'
              }}>
                <BookOpen size={16} />
                Bitki Koleksiyonu
              </Link>

              <Link href="/notebook" className="nav-link" style={{
                fontSize: '0.92rem',
                color: 'var(--accent-gold)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'var(--transition-fast)',
                background: 'rgba(201, 168, 76, 0.1)',
                border: '1px solid rgba(201, 168, 76, 0.25)'
              }}>
                <NotebookPen size={16} />
                Not Defterim
              </Link>

              <Link href="/login" className="nav-link" style={{
                fontSize: '0.92rem',
                color: 'var(--text-secondary)',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-full)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                transition: 'var(--transition-fast)'
              }}>
                <User size={16} />
                Giriş Yap
              </Link>

              <Link
                href="/identify"
                className="btn btn-primary"
                style={{
                  padding: '0.55rem 1.3rem',
                  fontSize: '0.9rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: 600,
                  boxShadow: '0 4px 14px rgba(130, 173, 118, 0.25)'
                }}
              >
                <Camera size={16} />
                Fotoğraf Yükle & Tanı
              </Link>
            </div>
          </nav>
        </header>

        <main className="container" style={{ minHeight: 'calc(100vh - 180px)', paddingBottom: '5rem' }}>
          {children}
        </main>

        {/* Mobil Alt Navigasyon */}
        <div className="mobile-nav" style={{
          display: 'none', // CSS ile mobilde açılır
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(15, 20, 17, 0.95)',
          backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(143, 164, 134, 0.15)',
          padding: '0.65rem 1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 100
        }}>
          <Link href="/" className="mobile-nav-item" style={{ textAlign: 'center', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <Leaf size={20} />
            <div style={{ fontSize: '0.72rem', marginTop: 2 }}>Keşfet</div>
          </Link>

          <Link href="/plants" className="mobile-nav-item" style={{ textAlign: 'center', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <BookOpen size={20} />
            <div style={{ fontSize: '0.72rem', marginTop: 2 }}>Koleksiyon</div>
          </Link>

          <Link href="/identify" className="mobile-nav-fab" style={{
            background: 'var(--accent-green)',
            color: '#121814',
            width: 46, height: 46,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(130, 173, 118, 0.4)',
            textDecoration: 'none'
          }}>
            <Camera size={22} />
          </Link>

          <Link href="/notebook" className="mobile-nav-item" style={{ textAlign: 'center', color: 'var(--accent-gold)', textDecoration: 'none' }}>
            <NotebookPen size={20} />
            <div style={{ fontSize: '0.72rem', marginTop: 2 }}>Defterim</div>
          </Link>

          <Link href="/login" className="mobile-nav-item" style={{ textAlign: 'center', color: 'var(--text-secondary)', textDecoration: 'none' }}>
            <User size={20} />
            <div style={{ fontSize: '0.72rem', marginTop: 2 }}>Giriş Yap</div>
          </Link>
        </div>

        {/* Render Sunucusunu Arka Planda Uyandırma & Netlify Rozeti Temizleyici */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              // Render sunucusu uyandırma pinglemesi
              try {
                fetch('https://botaanik-defteri.onrender.com/api/plants', { mode: 'no-cors' }).catch(function(){});
              } catch(e) {}

              // Netlify rozeti temizleyici
              const clean = () => {
                const badge = document.querySelector('netlify-drawer, #netlify-drawer, [id*="netlify"], [class*="netlify-badge"], iframe[src*="netlify"]');
                if (badge) badge.remove();
              };
              setInterval(clean, 300);
            })();
          `
        }} />
      </body>
    </html>
  );
}
