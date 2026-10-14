"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, BookOpen, Compass, NotebookPen, User, Camera, 
  Leaf, ChevronRight, Sparkles
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Sayfa değiştiğinde yan menüyü kapat
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Yan menü açıkken arkadaki kaydırmayı kilitle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navItems = [
    { href: '/', label: 'Ana Sayfa', icon: Leaf },
    { href: '/plants', label: 'Bitki Koleksiyonu', icon: BookOpen },
    { href: '/plant-select', label: 'Bitki Seçici & Arama', icon: Compass, highlight: true },
    { href: '/notebook', label: 'Not Defterim', icon: NotebookPen, gold: true },
    { href: '/login', label: 'Giriş Yap', icon: User },
  ];

  return (
    <>
      {/* ─── ANA NAVBAR KUTUSU ─── */}
      <header className="container" style={{ paddingTop: '1.25rem', position: 'relative', zIndex: 40 }}>
        <nav style={{
          background: 'rgba(20, 27, 23, 0.88)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(143, 164, 134, 0.22)',
          borderRadius: 'var(--radius-xl)',
          padding: '0.75rem 1.25rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.35)',
          marginBottom: '1.5rem',
        }}>
          {/* ÜST SATIR: LOGO + DESKTOP LİNKLER + MOBİL MENÜ BUTONU */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}>
            {/* Logo */}
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: 'clamp(1.1rem, 3.5vw, 1.35rem)',
                fontWeight: '600',
                fontFamily: "'Lora', Georgia, serif",
                color: '#f3efe6',
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid rgba(201, 168, 76, 0.65)',
                boxShadow: '0 0 10px rgba(201, 168, 76, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <img src="/sunsiree-logo.jpg" alt="Sunsiree Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>Sunsiree</span> Bitki{' '}
                <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic', fontWeight: 400 }}>Dünyası</span>
              </span>
            </Link>

            {/* MASAÜSTÜ LİNKLERİ (Ekran genişken görünür) */}
            <div className="desktop-only-links" style={{ alignItems: 'center', gap: '0.65rem' }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      fontSize: '0.9rem',
                      color: item.highlight ? 'var(--accent-green)' : item.gold ? 'var(--accent-gold)' : isActive ? '#fff' : 'var(--text-secondary)',
                      padding: '0.5rem 0.95rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontWeight: isActive ? 600 : 500,
                      background: item.highlight 
                        ? 'rgba(130, 173, 118, 0.12)' 
                        : item.gold 
                        ? 'rgba(201, 168, 76, 0.1)' 
                        : isActive 
                        ? 'rgba(255,255,255,0.08)' 
                        : 'transparent',
                      border: item.highlight 
                        ? '1px solid rgba(130, 173, 118, 0.28)' 
                        : item.gold 
                        ? '1px solid rgba(201, 168, 76, 0.25)' 
                        : '1px solid transparent',
                      transition: 'var(--transition-fast)',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <Link
                href="/identify"
                className="btn btn-primary"
                style={{
                  padding: '0.55rem 1.2rem',
                  fontSize: '0.88rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 14px rgba(130, 173, 118, 0.25)'
                }}
              >
                <Camera size={16} />
                <span>Tanı</span>
              </Link>
            </div>

            {/* MOBİL SAĞ BUTONLAR (Hızlı Tanı + Yana Açılır Menü Butonu) */}
            <div className="mobile-only-controls" style={{ alignItems: 'center', gap: '0.6rem' }}>
              <Link
                href="/identify"
                style={{
                  background: 'linear-gradient(135deg, var(--accent-green), #9ec592)',
                  color: '#121814',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  textDecoration: 'none',
                  boxShadow: '0 3px 10px rgba(130, 173, 118, 0.35)'
                }}
              >
                <Camera size={14} />
                <span>Tanı</span>
              </Link>

              {/* Hamburger / Yan Menü Butonu */}
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Menüyü Aç"
                style={{
                  background: isOpen ? 'rgba(201, 168, 76, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(201, 168, 76, 0.4)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.45rem 0.75rem',
                  color: 'var(--accent-gold)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}
                <span>Menü</span>
              </button>
            </div>
          </div>

          {/* ─── MOBİLDE YANA KAYDIRILABİLİR TEK SATIR KATEGORİ MENÜSÜ ─── */}
          {/* Asla alt alta sarmaz veya ezilip yuvarlak balon olmaz, yana doğru pürüzsüz kayar */}
          <div className="mobile-horizontal-scroll-bar" style={{
            marginTop: '0.75rem',
            paddingTop: '0.65rem',
            borderTop: '1px solid rgba(143, 164, 134, 0.14)',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            display: 'none', // Sadece mobilde CSS ile flex olur
            gap: '0.45rem',
            whiteSpace: 'nowrap',
          }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.42rem 0.85rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: isActive ? 700 : 500,
                    flexShrink: 0,
                    whiteSpace: 'nowrap',
                    textDecoration: 'none',
                    color: item.highlight ? 'var(--accent-green)' : item.gold ? 'var(--accent-gold)' : isActive ? '#ffffff' : 'var(--text-secondary)',
                    background: item.highlight 
                      ? 'rgba(130, 173, 118, 0.18)' 
                      : item.gold 
                      ? 'rgba(201, 168, 76, 0.15)' 
                      : isActive 
                      ? 'rgba(255,255,255,0.12)' 
                      : 'rgba(255,255,255,0.05)',
                    border: item.highlight 
                      ? '1px solid rgba(130, 173, 118, 0.35)' 
                      : item.gold 
                      ? '1px solid rgba(201, 168, 76, 0.3)' 
                      : '1px solid rgba(143, 164, 134, 0.18)'
                  }}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </header>

      {/* ─── YANA AÇILAN MOBİL MENÜ (SIDE DRAWER / SAĞ PANEL) ─── */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.72)',
            backdropFilter: 'blur(8px)',
            zIndex: 998,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: 'min(320px, 85vw)',
        background: 'rgba(18, 25, 21, 0.98)',
        backdropFilter: 'blur(24px)',
        borderLeft: '1.5px solid rgba(201, 168, 76, 0.4)',
        boxShadow: '-10px 0 35px rgba(0,0,0,0.6)',
        zIndex: 999,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: isOpen ? 'translateX(0)' : 'translateX(105%)',
        transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
      }}>
        <div>
          {/* Yan Panel Başlığı */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.8rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid rgba(143, 164, 134, 0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                overflow: 'hidden', border: '1px solid var(--accent-gold)'
              }}>
                <img src="/sunsiree-logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ fontFamily: "'Lora', Georgia, serif", color: '#f3efe6', fontSize: '1.05rem', fontWeight: 600 }}>
                Menü
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Kapat"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                color: 'var(--text-secondary)',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Link Listesi */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 700 : 500,
                    color: item.highlight ? 'var(--accent-green)' : item.gold ? 'var(--accent-gold)' : isActive ? '#ffffff' : 'var(--text-primary)',
                    background: isActive 
                      ? 'rgba(255,255,255,0.1)' 
                      : item.highlight 
                      ? 'rgba(130, 173, 118, 0.12)' 
                      : 'rgba(255,255,255,0.03)',
                    border: item.highlight 
                      ? '1px solid rgba(130, 173, 118, 0.25)' 
                      : item.gold 
                      ? '1px solid rgba(201, 168, 76, 0.25)' 
                      : '1px solid rgba(143, 164, 134, 0.1)',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <Icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Yan Panel Alt Kısmı: Büyük Eylem Butonu */}
        <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(143, 164, 134, 0.18)' }}>
          <Link
            href="/identify"
            onClick={() => setIsOpen(false)}
            className="btn btn-primary"
            style={{
              width: '100%',
              padding: '0.85rem',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 6px 20px rgba(130, 173, 118, 0.35)'
            }}
          >
            <Camera size={18} />
            <span>Fotoğraf Yükle & Tanı</span>
          </Link>
        </div>
      </div>
    </>
  );
}
