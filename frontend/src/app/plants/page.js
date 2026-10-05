"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Loader2, Leaf, Droplet, Sun, Camera,
  Trash2, Eye, Plus, AlertTriangle, Sparkles, X
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://botaanik-defteri.onrender.com';

export default function PlantsDirectory() {
  const router = useRouter();
  const [plants, setPlants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deletingId, setDeletingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const fetchPlants = async (searchTerm = '') => {
    setIsLoading(true);
    try {
      const url = searchTerm.trim()
        ? `${API_URL}/api/plants?q=${encodeURIComponent(searchTerm.trim())}`
        : `${API_URL}/api/plants`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) throw new Error('Bitkiler alınamadı.');
      const data = await res.json();
      setPlants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Bitki listeleme hatası:', err);
      setPlants([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPlants(search);
    }, 250);

    return () => clearTimeout(timer);
  }, [search]);

  // Bitkiyi Sil
  const handleDeletePlant = async (id, e) => {
    if (e) e.stopPropagation();
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`${API_URL}/api/plants/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Bitki silinemedi.');
      setPlants(prev => prev.filter(p => p.id !== id));
      setDeletingId(null);
    } catch (err) {
      console.error('Silme hatası:', err);
      setDeleteError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="animate-enter" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>

      {/* ─── BAŞLIK VE EYLEM BUTONU ─── */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1.5rem',
        marginBottom: '2.5rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--accent-green)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem'
          }}>
            <Leaf size={15} />
            <span>Botanik Saha Koleksiyonu</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.7rem)', color: '#f3efe6', marginBottom: '0.4rem' }}>
            Bitki Koleksiyonu
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '540px' }}>
            Fotoğraflardan tanımlanmış ve botanik defterinize kaydedilmiş tüm bitkiler.
          </p>
        </div>

        <Link
          href="/identify"
          className="btn btn-primary"
          style={{
            padding: '0.75rem 1.6rem',
            fontSize: '0.95rem',
            boxShadow: '0 4px 16px rgba(130, 173, 118, 0.25)'
          }}
        >
          <Camera size={18} />
          Yeni Bitki Tanı & Ekle
        </Link>
      </div>

      {/* ─── ARAMA ÇUBUĞU ─── */}
      <div style={{ position: 'relative', maxWidth: '580px', marginBottom: '2.5rem' }}>
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: '1.25rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-tertiary)'
          }}
        />
        <input
          type="text"
          placeholder="Türkçe adı, bilimsel adı veya familyaya göre ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.9rem 2.8rem 0.9rem 3.2rem',
            fontSize: '0.95rem',
            borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(143, 164, 134, 0.22)',
            background: 'rgba(20, 27, 23, 0.85)',
            color: 'var(--text-primary)',
            fontFamily: "'Outfit', sans-serif",
            outline: 'none',
            boxShadow: '0 4px 18px rgba(0,0,0,0.25)',
            transition: 'var(--transition)'
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(125,155,110,0.5)'}
          onBlur={e => e.target.style.borderColor = 'rgba(143, 164, 134, 0.22)'}
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            style={{
              position: 'absolute',
              right: '1.2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: 'var(--text-tertiary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* ─── BİTKİ KARTLARI IZGARASI ─── */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '6rem 2rem', color: 'var(--accent-sage)' }}>
          <Loader2 size={36} style={{ animation: 'spin 1.2s linear infinite', margin: '0 auto 1rem', display: 'block' }} />
          <p style={{ fontSize: '0.95rem', color: 'var(--text-tertiary)' }}>Bitki koleksiyonu yükleniyor...</p>
        </div>
      ) : plants.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.6rem'
        }}>
          {plants.map((plant) => {
            const plantImg = plant.images?.[0]?.image_url;

            return (
              <div
                key={plant.id}
                style={{
                  background: 'rgba(20, 27, 23, 0.85)',
                  border: '1px solid rgba(143, 164, 134, 0.2)',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'var(--transition)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                  position: 'relative'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(216, 194, 122, 0.4)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(143, 164, 134, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Kart Görseli */}
                <Link href={`/plants/${plant.id}`} style={{ display: 'block', position: 'relative', height: 210, background: '#0d120f' }}>
                  {plantImg ? (
                    <img
                      src={plantImg}
                      alt={plant.turkish_name || plant.scientific_name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      background: 'radial-gradient(circle, #19241e 0%, #0d120f 100%)'
                    }}>
                      <Leaf size={38} strokeWidth={1} style={{ color: 'rgba(143, 164, 134, 0.35)' }} />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                        Görsel Yok
                      </span>
                    </div>
                  )}

                  {/* Gradient Karartma */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0, left: 0, right: 0,
                    height: '50%',
                    background: 'linear-gradient(to top, rgba(15, 20, 17, 0.95), transparent)'
                  }} />

                  {/* Familya Rozeti */}
                  {plant.family && (
                    <div style={{
                      position: 'absolute',
                      top: '0.75rem',
                      left: '0.75rem',
                      background: 'rgba(15, 20, 17, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(143, 164, 134, 0.3)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.25rem 0.7rem',
                      fontSize: '0.72rem',
                      color: 'var(--accent-sage)',
                      fontWeight: 600
                    }}>
                      {plant.family}
                    </div>
                  )}
                </Link>

                {/* Kart İçeriği */}
                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  <Link href={`/plants/${plant.id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: '1.25rem',
                      color: '#f3efe6',
                      marginBottom: '0.2rem',
                      fontWeight: 500,
                      lineHeight: 1.25
                    }}>
                      {plant.turkish_name || plant.scientific_name}
                    </h3>

                    <div style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: '0.9rem',
                      color: 'var(--accent-gold)',
                      fontStyle: 'italic',
                      marginBottom: '0.8rem'
                    }}>
                      {plant.scientific_name}
                    </div>
                  </Link>

                  {plant.description && (
                    <p style={{
                      fontSize: '0.86rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {plant.description}
                    </p>
                  )}

                  {/* Hızlı Özellik İkonları */}
                  <div style={{
                    marginTop: 'auto',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid rgba(143, 164, 134, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center' }}>
                      {plant.care?.watering_need && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }} title={`Sulama: ${plant.care.watering_need}`}>
                          <Droplet size={12} style={{ color: '#89b8cb' }} />
                          <span>{plant.care.watering_need}</span>
                        </div>
                      )}
                      {plant.care?.light_need && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }} title={`Işık: ${plant.care.light_need}`}>
                          <Sun size={12} style={{ color: 'var(--accent-gold)' }} />
                          <span>{plant.care.light_need}</span>
                        </div>
                      )}
                    </div>

                    {/* Silme Butonu */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeletingId(plant.id);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: '0.3rem',
                        borderRadius: 'var(--radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'var(--transition-fast)'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#f07070'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                      title="Bitkiyi Sil"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (

        /* ─── BOŞ DURUM (HENÜZ BİTKİ YOK VEYA ARAMA SONUCU YOK) ─── */
        <div style={{
          textAlign: 'center',
          padding: '5rem 2rem',
          background: 'rgba(20, 27, 23, 0.5)',
          border: '1px dashed rgba(143, 164, 134, 0.2)',
          borderRadius: 'var(--radius-xl)',
          maxWidth: '640px',
          margin: '2rem auto 0'
        }}>
          <div style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: 'rgba(125, 155, 110, 0.1)',
            border: '1px solid rgba(125, 155, 110, 0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            color: 'var(--accent-green)'
          }}>
            <Leaf size={28} strokeWidth={1.5} />
          </div>

          <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.4rem', color: '#f3efe6', marginBottom: '0.6rem', fontWeight: 500 }}>
            {search ? 'Aramanızla Eşleşen Bitki Bulunamadı' : 'Henüz bitki eklemediniz.'}
          </h3>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
            {search
              ? `"${search}" aramasına uygun kayıt bulunamadı. Aramayı temizlemeyi deneyin.`
              : 'İlk bitkinizi fotoğrafını yükleyerek tanımlayın.'}
          </p>

          {search ? (
            <button
              className="btn btn-secondary"
              onClick={() => setSearch('')}
              style={{ fontSize: '0.92rem' }}
            >
              Aramayı Temizle
            </button>
          ) : (
            <Link
              href="/identify"
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.8rem', fontSize: '0.95rem' }}
            >
              <Camera size={18} />
              İlk Bitkini Fotoğrafla Tanımla
            </Link>
          )}
        </div>
      )}

      {/* ─── SİLME ONAY MODALI ─── */}
      {deletingId && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          zIndex: 999
        }}>
          <div style={{
            background: '#161e19',
            border: '1px solid rgba(192, 80, 74, 0.35)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            maxWidth: '440px',
            width: '100%',
            boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
            textAlign: 'center'
          }}>
            <div style={{
              width: 52, height: 52,
              borderRadius: '50%',
              background: 'rgba(192, 80, 74, 0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1rem',
              color: '#f07070'
            }}>
              <AlertTriangle size={26} />
            </div>

            <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.25rem', color: '#f3efe6', marginBottom: '0.5rem', fontWeight: 500 }}>
              Bitkiyi Silmek İstiyor musunuz?
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.8rem', lineHeight: 1.5 }}>
              Bu işlem bitkinin tüm saha notlarını, bakım parametrelerini ve fotoğraflarını veritabanından kalıcı olarak silecektir.
            </p>

            {deleteError && (
              <div style={{ color: '#f07070', fontSize: '0.82rem', marginBottom: '1rem' }}>
                {deleteError}
              </div>
            )}

            <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center' }}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setDeletingId(null)}
                disabled={isDeleting}
                style={{ fontSize: '0.9rem', flex: 1 }}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={() => handleDeletePlant(deletingId)}
                disabled={isDeleting}
                style={{
                  background: '#c0504a',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.75rem 1.4rem',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                {isDeleting ? 'Siliniyor...' : 'Evet, Sil'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
