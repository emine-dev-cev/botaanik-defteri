import './globals.css';
import Link from 'next/link';
import { Leaf, Camera, BookOpen, NotebookPen, Sparkles, User, Compass } from 'lucide-react';
import Navbar from './Navbar';

export const metadata = {
  title: 'Sunsiree — Bitki Tanıma & Saha Günlüğü',
  description: 'Bitki fotoğraflarını ve el yazısı notları yapay zekâ ile tanı, botanik defterine kaydet.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        {/* Sabit Arka Plan Görseli & Şeffaf Botanik Karartma Katmanı (Mobilde Asla Zoom Yapmaz) */}
        <div className="bg-image-fixed" />
        <div className="bg-image-overlay" />

        {/* Responsive Navbar & Mobil Yan Menü (Drawer) */}
        <Navbar />

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
          padding: '0.75rem 1.2rem',
          justifyContent: 'space-around',
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

          <Link href="/plant-select" className="mobile-nav-item" style={{ textAlign: 'center', color: 'var(--accent-green)', textDecoration: 'none' }}>
            <Compass size={20} />
            <div style={{ fontSize: '0.72rem', marginTop: 2 }}>Seçici & Ara</div>
          </Link>

          <Link href="/identify" className="mobile-nav-fab" style={{
            background: 'var(--accent-green)',
            color: '#121814',
            width: 44, height: 44,
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(130, 173, 118, 0.4)',
            textDecoration: 'none'
          }}>
            <Camera size={20} />
          </Link>

          <Link href="/notebook" className="mobile-nav-item" style={{ textAlign: 'center', color: 'var(--accent-gold)', textDecoration: 'none' }}>
            <NotebookPen size={20} />
            <div style={{ fontSize: '0.72rem', marginTop: 2 }}>Defterim</div>
          </Link>
        </div>
      </body>
    </html>
  );
}
