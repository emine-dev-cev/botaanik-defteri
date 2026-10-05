"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Leaf, Mail, Lock, User, ArrowRight, CheckCircle2,
  AlertTriangle, Eye, EyeOff, Loader2, Sparkles, LogIn, UserPlus
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://botaanik-defteri.onrender.com';

export default function LoginPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Form State'leri
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // UI State'leri
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // Giriş / Kayıt Form Gönderimi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    const endpoint = activeTab === 'login' ? '/api/auth/login' : '/api/auth/register';
    const payload = activeTab === 'login'
      ? { email, password }
      : { name, email, password };

    try {
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'İşlem gerçekleştirilemedi.');
      }

      // Token ve kullanıcı bilgisini localStorage'a kaydet
      if (data.token) {
        localStorage.setItem('botanik_token', data.token);
        localStorage.setItem('botanik_user', JSON.stringify(data.user));
      }

      setSuccessMsg(
        activeTab === 'login'
          ? `Hoş geldiniz, ${data.user?.name || 'Kullanıcı'}! Giriş yapıldı.`
          : 'Hesabınız başarıyla oluşturuldu! Yönlendiriliyorsunuz...'
      );

      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1200);

    } catch (err) {
      console.error('Auth hatası:', err);
      setError(err.message || 'Giriş yapılırken sunucu hatası oluştu.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-enter" style={{
      position: 'relative',
      width: '100vw',
      minHeight: 'calc(100vh - 90px)',
      marginLeft: 'calc(-50vw + 50%)',
      marginRight: 'calc(-50vw + 50%)',
      marginTop: '-2rem',
      marginBottom: '-5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1.5rem',
      background: "url('/login-bg.jpg') center center / cover no-repeat",
      overflow: 'hidden'
    }}>

      {/* ─── HAFİF SİNEMATİK AYDINLIK KAPLAMA ─── */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, rgba(12, 22, 16, 0.2) 0%, rgba(6, 12, 9, 0.55) 100%)',
        zIndex: 1
      }} />

      {/* ─── ULTRA-MODERN ŞEFFAF (GLASSMORPHISM) GİRİŞ KARTI ─── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        width: '100%',
        maxWidth: '460px',
        background: 'rgba(15, 23, 18, 0.48)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        borderRadius: '28px',
        padding: '2.5rem 2.2rem',
        boxShadow: '0 30px 80px rgba(0, 0, 0, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>

        {/* Üst Rozet & Başlık */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'rgba(15, 23, 18, 0.65)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(201, 168, 76, 0.45)',
            padding: '0.35rem 1.1rem 0.35rem 0.55rem',
            borderRadius: 'var(--radius-full)',
            color: 'var(--accent-gold)',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.35)'
          }}>
            <div style={{
              width: 28, height: 28,
              borderRadius: '50%',
              overflow: 'hidden',
              border: '1px solid rgba(201, 168, 76, 0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0
            }}>
              <img src="/sunsiree-logo.jpg" alt="Sunsiree Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span>Sunsiree Bitki Dünyası</span>
          </div>

          <h1 style={{
            fontSize: '2rem',
            color: '#ffffff',
            marginBottom: '0.5rem',
            fontFamily: "'Lora', Georgia, serif",
            fontWeight: 500,
            letterSpacing: '-0.02em',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)'
          }}>
            {activeTab === 'login' ? 'Hesabınıza Giriş Yapın' : 'Yeni Hesap Oluşturun'}
          </h1>
          <p style={{
            color: 'rgba(243, 239, 230, 0.85)',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            textShadow: '0 1px 6px rgba(0,0,0,0.4)'
          }}>
            {activeTab === 'login'
              ? 'Saha notlarınızı ve bitki koleksiyonunuzu senkronize tutun.'
              : 'Botanik günlüğünüzü oluşturmak için hemen kaydolun.'}
          </p>
        </div>

        {/* ─── MODERN SEKMELER (TAB SWITCHER) ─── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'rgba(8, 14, 10, 0.55)',
          backdropFilter: 'blur(12px)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          marginBottom: '2rem',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
        }}>
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(null); setSuccessMsg(null); }}
            style={{
              padding: '0.68rem 0.5rem',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'login'
                ? 'linear-gradient(135deg, rgba(125, 155, 110, 0.85), rgba(75, 110, 65, 0.9))'
                : 'transparent',
              color: activeTab === 'login' ? '#ffffff' : 'rgba(243, 239, 230, 0.7)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
              boxShadow: activeTab === 'login' ? '0 4px 15px rgba(125, 155, 110, 0.4)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            <LogIn size={16} />
            Giriş Yap
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('register'); setError(null); setSuccessMsg(null); }}
            style={{
              padding: '0.68rem 0.5rem',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              background: activeTab === 'register'
                ? 'linear-gradient(135deg, rgba(125, 155, 110, 0.85), rgba(75, 110, 65, 0.9))'
                : 'transparent',
              color: activeTab === 'register' ? '#ffffff' : 'rgba(243, 239, 230, 0.7)',
              fontWeight: 600,
              fontSize: '0.88rem',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
              boxShadow: activeTab === 'register' ? '0 4px 15px rgba(125, 155, 110, 0.4)' : 'none',
              transition: 'all 0.25s ease'
            }}
          >
            <UserPlus size={16} />
            Kayıt Ol
          </button>
        </div>

        {/* Başarı Mesajı */}
        {successMsg && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.65rem',
            padding: '0.9rem 1.1rem',
            borderRadius: '16px',
            background: 'rgba(34, 197, 94, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(74, 222, 128, 0.4)',
            color: '#bbf7d0',
            fontSize: '0.88rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <CheckCircle2 size={18} style={{ flexShrink: 0, color: '#4ade80' }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Hata Mesajı */}
        {error && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.65rem',
            padding: '0.9rem 1.1rem',
            borderRadius: '16px',
            background: 'rgba(239, 68, 68, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(248, 113, 113, 0.4)',
            color: '#fca5a5',
            fontSize: '0.88rem',
            marginBottom: '1.5rem',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            <AlertTriangle size={18} style={{ flexShrink: 0, color: '#f87171' }} />
            <span>{error}</span>
          </div>
        )}

        {/* ─── FORM İÇERİĞİ ─── */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Ad Soyad (Sadece Kayıt) */}
          {activeTab === 'register' && (
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.76rem',
                color: 'rgba(243, 239, 230, 0.9)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.4rem',
                textShadow: '0 1px 3px rgba(0,0,0,0.5)'
              }}>
                Ad Soyad
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center' }}>
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Örn: Dr. Ahmet Yılmaz"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 2.8rem',
                    borderRadius: '16px',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    background: 'rgba(10, 16, 12, 0.45)',
                    backdropFilter: 'blur(8px)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                  }}
                  onFocus={e => {
                    e.target.style.borderColor = 'rgba(125, 155, 110, 0.8)';
                    e.target.style.boxShadow = '0 0 15px rgba(125, 155, 110, 0.35)';
                  }}
                  onBlur={e => {
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                    e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.2)';
                  }}
                />
              </div>
            </div>
          )}

          {/* E-posta Adresi */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.76rem',
              color: 'rgba(243, 239, 230, 0.9)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.4rem',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)'
            }}>
              E-posta Adresi
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center' }}>
                <Mail size={18} />
              </div>
              <input
                type="email"
                required
                placeholder="eposta@botanik.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.8rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  background: 'rgba(10, 16, 12, 0.45)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(125, 155, 110, 0.8)';
                  e.target.style.boxShadow = '0 0 15px rgba(125, 155, 110, 0.35)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.2)';
                }}
              />
            </div>
          </div>

          {/* Şifre */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.76rem',
              color: 'rgba(243, 239, 230, 0.9)',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.4rem',
              textShadow: '0 1px 3px rgba(0,0,0,0.5)'
            }}>
              Şifre
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.6)', display: 'flex', alignItems: 'center' }}>
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.8rem 2.8rem 0.8rem 2.8rem',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  background: 'rgba(10, 16, 12, 0.45)',
                  backdropFilter: 'blur(8px)',
                  color: '#ffffff',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'all 0.2s ease',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'rgba(125, 155, 110, 0.8)';
                  e.target.style.boxShadow = '0 0 15px rgba(125, 155, 110, 0.35)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.2)';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                style={{
                  position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'rgba(255, 255, 255, 0.6)', cursor: 'pointer', display: 'flex'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Beni Hatırla & Şifremi Unuttum */}
          {activeTab === 'login' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.84rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'rgba(243, 239, 230, 0.9)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  style={{ accentColor: 'var(--accent-green)', cursor: 'pointer', width: 16, height: 16 }}
                />
                Beni Hatırla
              </label>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); alert('Şifre sıfırlama bağlantısı e-posta adresinize gönderilecektir.'); }}
                style={{ color: 'var(--accent-gold)', textDecoration: 'none', fontWeight: 500 }}
              >
                Şifremi Unuttum?
              </a>
            </div>
          )}

          {/* ─── ANA EYLEM BUTONU ─── */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '1rem',
              fontWeight: 600,
              marginTop: '0.5rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'linear-gradient(135deg, #7d9b6e 0%, #4a673c 100%)',
              color: '#ffffff',
              boxShadow: '0 8px 25px rgba(125, 155, 110, 0.45)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(125, 155, 110, 0.6)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(125, 155, 110, 0.45)';
            }}
          >
            {isLoading ? (
              <>
                <Loader2 size={19} style={{ animation: 'spin 1s linear infinite' }} />
                İşlem Yapılıyor...
              </>
            ) : (
              <>
                {activeTab === 'login' ? 'Giriş Yap' : 'Hesabı Oluştur'}
                <ArrowRight size={19} />
              </>
            )}
          </button>
        </form>
      </div>

    </div>
  );
}
