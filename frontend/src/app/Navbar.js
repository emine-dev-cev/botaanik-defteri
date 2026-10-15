"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, X, BookOpen, Compass, NotebookPen, User, Camera, 
  Leaf, ChevronRight, Sparkles, FolderOpen, Search, LogIn
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Sol menü açıkken arka plan kaydırmasını kilitle
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
    { 
      href: '/', 
      label: 'Ana Sayfa', 
      desc: 'Genel Bakış',
      icon: Leaf 
    },
    { 
      href: '/plants', 
      label: 'Bitki Koleksiyonu', 
      desc: 'Botanik Kataloğu',
      icon: BookOpen 
    },
    { 
      href: '/plant-select', 
      label: 'Bitki Seçici', 
      desc: 'Detaylı Filtreleme',
      icon: Compass, 
      highlight: true 
    },
    { 
      href: '/notebook', 
      label: 'Not Defteri', 
      desc: 'Klasörler ve Dosyalar',
      icon: NotebookPen, 
      gold: true 
    },
    { 
      href: '/identify', 
      label: 'Bitki Tanı', 
      desc: 'Fotoğraflı Analiz',
      icon: Camera,
      green: true
    },
    { 
      href: '/login', 
      label: 'Giriş Yap', 
      desc: 'Kullanıcı Hesabı',
      icon: User 
    },
  ];

  return (
    <>
      {/* ─── ANA NAVBAR KUTUSU ─── */}
      <header className="container" style={{ paddingTop: '1.25rem', position: 'relative', zIndex: 40, width: '100%', maxWidth: '100%' }}>
        <nav style={{
          background: 'rgba(20, 27, 23, 0.92)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(143, 164, 134, 0.25)',
          borderRadius: 'var(--radius-xl)',
          padding: '0.65rem 1rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
          marginBottom: '1.5rem',
          width: '100%',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            width: '100%',
          }}>
            {/* SOL TARAFTA: LOGO */}
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: 'clamp(0.95rem, 3.2vw, 1.35rem)',
                fontWeight: '600',
                fontFamily: "'Lora', Georgia, serif",
                color: '#f3efe6',
                letterSpacing: '-0.01em',
                textDecoration: 'none',
                minWidth: 0,
                flexShrink: 1,
              }}
            >
              <div style={{
                width: 34,
                height: 34,
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
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                <span style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>Sunsiree</span> Bitki
                <span className="navbar-brand-sub" style={{ color: 'var(--accent-gold)', fontStyle: 'italic', fontWeight: 400 }}> Dünyası</span>
              </span>
            </Link>

            {/* SAĞ TARAFTA: HIZLI TANI BUTONU + MENÜ KUTUCUĞU */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
              
              {/* Hızlı Yapay Zekâ Tanı Butonu - Mobilde gizlenir (altta ve menüde var) */}
              <Link
                href="/identify"
                className="nav-identify-btn"
                style={{
                  background: 'linear-gradient(135deg, rgba(130, 173, 118, 0.25), rgba(130, 173, 118, 0.15))',
                  border: '1px solid rgba(130, 173, 118, 0.4)',
                  color: '#a8caa0',
                  padding: '0.45rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Camera size={14} />
                <span>Bitki Tanı</span>
              </Link>

              {/* ─── KULLANICININ İSTEDİĞİ SAĞ MENÜ KUTUCUĞU ─── */}
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Menüyü Aç"
                style={{
                  background: isOpen ? 'rgba(229, 169, 60, 0.25)' : 'rgba(229, 169, 60, 0.15)',
                  border: '1.5px solid rgba(229, 169, 60, 0.55)',
                  borderRadius: '12px',
                  padding: '0.45rem 0.85rem',
                  color: '#e5c368',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(229, 169, 60, 0.2)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                  flexShrink: 0
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(229, 169, 60, 0.3)';
                  e.currentTarget.style.borderColor = '#e5c368';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = isOpen ? 'rgba(229, 169, 60, 0.25)' : 'rgba(229, 169, 60, 0.15)';
                  e.currentTarget.style.borderColor = 'rgba(229, 169, 60, 0.55)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Menu size={18} />
                <span>Menü</span>
              </button>

            </div>
          </div>
        </nav>
      </header>

      {/* ─── KARARTMA ARKA PLANI (OVERLAY) ─── */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            zIndex: 998,
            animation: 'fadeIn 0.25s ease'
          }}
        />
      )}

      {/* ─── UYGULAMANIN SOL KISMINDAN AÇILAN GELİŞMİŞ MENÜ PANELİ (LEFT SIDEBAR DRAWER) ─── */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 'min(360px, 88vw)',
        background: 'linear-gradient(180deg, rgba(16, 24, 19, 0.98) 0%, rgba(10, 16, 12, 0.99) 100%)',
        backdropFilter: 'blur(28px)',
        borderRight: '1.5px solid rgba(201, 168, 76, 0.35)',
        boxShadow: '12px 0 45px rgba(0, 0, 0, 0.75)',
        zIndex: 999,
        padding: '1.6rem 1.4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: isOpen ? 'translateX(0)' : 'translateX(-105%)',
        transition: 'transform 0.32s cubic-bezier(0.2, 0.8, 0.2, 1)',
        overflowY: 'auto'
      }}>
        <div>
          {/* Sol Panel Üst Başlık & Kapat Butonu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.6rem',
            paddingBottom: '1.1rem',
            borderBottom: '1px solid rgba(143, 164, 134, 0.18)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1.5px solid var(--accent-gold)',
                boxShadow: '0 0 10px rgba(201, 168, 76, 0.4)'
              }}>
                <img src="/sunsiree-logo.jpg" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <span style={{ fontFamily: "'Lora', Georgia, serif", color: '#f3efe6', fontSize: '1.08rem', fontWeight: 700, display: 'block', lineHeight: 1.2 }}>
                  Sunsiree Dünyası
                </span>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 500 }}>
                  Botanik Asistanı
                </span>
              </div>
            </div>

            {/* Kapat Butonu */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Menüyü Kapat"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#f3efe6',
                borderRadius: '50%',
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)'}
            >
              <X size={19} />
            </button>
          </div>

          {/* Menü Başlığı Rozeti */}
          <div style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--accent-gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '0.75rem',
            paddingLeft: '0.4rem'
          }}>
            Kategoriler
          </div>

          {/* TÜM SEÇENEKLER LİSTESİ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
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
                    borderRadius: '16px',
                    textDecoration: 'none',
                    background: isActive 
                      ? 'rgba(229, 169, 60, 0.18)' 
                      : 'rgba(255, 255, 255, 0.03)',
                    border: isActive 
                      ? '1px solid rgba(229, 169, 60, 0.45)' 
                      : '1px solid rgba(143, 164, 134, 0.12)',
                    transition: 'all 0.18s ease'
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.07)';
                      e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.3)';
                      e.currentTarget.style.transform = 'translateX(3px)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      e.currentTarget.style.borderColor = 'rgba(143, 164, 134, 0.12)';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div style={{
                      width: 38,
                      height: 38,
                      borderRadius: '12px',
                      background: isActive 
                        ? 'rgba(229, 169, 60, 0.25)' 
                        : item.gold 
                        ? 'rgba(201, 168, 76, 0.12)' 
                        : item.green 
                        ? 'rgba(130, 173, 118, 0.15)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      color: isActive 
                        ? '#e5c368' 
                        : item.gold 
                        ? 'var(--accent-gold)' 
                        : item.green 
                        ? '#82ad76' 
                        : 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      <Icon size={19} />
                    </div>

                    <div>
                      <div style={{
                        fontSize: '0.94rem',
                        fontWeight: isActive ? 700 : 600,
                        color: isActive ? '#ffffff' : '#f3efe6',
                        lineHeight: 1.3
                      }}>
                        {item.label}
                      </div>
                      <div style={{
                        fontSize: '0.74rem',
                        color: isActive ? 'var(--accent-gold)' : 'rgba(255, 255, 255, 0.45)',
                        marginTop: '0.1rem'
                      }}>
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <ChevronRight size={17} style={{ color: isActive ? '#e5c368' : 'rgba(255, 255, 255, 0.25)' }} />
                </Link>
              );
            })}
          </div>
        </div>

        {/* ─── SOL MENÜ ALT KISMI: HIZLI EYLEM & BİLGİ KARTI ─── */}
        <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(143, 164, 134, 0.16)', marginTop: '1.5rem' }}>
          <Link
            href="/identify"
            onClick={() => setIsOpen(false)}
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '14px',
              border: 'none',
              background: 'linear-gradient(135deg, #82ad76, #6da060)',
              color: '#0e1811',
              fontSize: '0.92rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(130, 173, 118, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <Camera size={18} />
            <span>Bitkiyi Tanı</span>
          </Link>

          <div style={{ textAlign: 'center', marginTop: '0.9rem', fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.35)' }}>
            Sunsiree Bitki Dünyası © 2026
          </div>
        </div>
      </div>
    </>
  );
}
