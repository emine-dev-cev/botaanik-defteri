"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Droplet, Sun, Wind, Thermometer, Leaf,
  MapPin, Flower2, Bug, Sparkles, ArrowLeft,
  Sprout, Scissors, ShieldAlert, HeartHandshake, Compass,
  Layers, Bookmark, Trash2, Edit3, Save, X, AlertTriangle,
  Loader2, CheckCircle2
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://botaanik-defteri.onrender.com';

export default function PlantDetailPage({ params }) {
  const router = useRouter();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resolvedId, setResolvedId] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Düzenleme durumu
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Silme durumu
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    Promise.resolve(params).then(p => setResolvedId(p?.id));
  }, [params]);

  const loadPlant = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/plants/${id}`, { cache: 'no-store' });
      if (!res.ok) {
        setPlant(null);
        return;
      }
      const data = await res.json();
      setPlant(data);
      setEditFormData(JSON.parse(JSON.stringify(data)));
    } catch (e) {
      console.error('Bitki yüklenirken hata:', e);
      setPlant(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!resolvedId) return;
    loadPlant(resolvedId);
  }, [resolvedId]);

  // Güncellemeyi kaydet
  const handleSaveUpdate = async (e) => {
    e.preventDefault();
    if (!editFormData || !resolvedId) return;
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const res = await fetch(`${API_URL}/api/plants/${resolvedId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });

      if (!res.ok) throw new Error('Güncelleme başarısız oldu.');
      const updated = await res.json();
      setPlant(updated);
      setEditFormData(JSON.parse(JSON.stringify(updated)));
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Güncelleme hatası:', err);
      alert('Güncelleme kaydedilemedi: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  // Bitkiyi sil
  const handleDeletePlant = async () => {
    if (!resolvedId) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const res = await fetch(`${API_URL}/api/plants/${resolvedId}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Bitki silinemedi.');
      router.push('/plants');
    } catch (err) {
      console.error('Silme hatası:', err);
      setDeleteError(err.message);
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '7rem 2rem', textAlign: 'center', color: 'var(--accent-sage)' }}>
        <Leaf size={34} strokeWidth={1.5} style={{ animation: 'spin 2s linear infinite', margin: '0 auto 1.2rem', display: 'block' }} />
        <p style={{ fontSize: '0.95rem', color: 'var(--text-tertiary)', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic' }}>
          Botanik saha notları açılıyor...
        </p>
      </div>
    );
  }

  if (!plant) {
    return (
      <div style={{ padding: '6rem 2rem', textAlign: 'center', maxWidth: '580px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Lora', Georgia, serif", color: '#f3efe6', marginBottom: '0.75rem', fontWeight: 500 }}>
          Bitki Kaydı Bulunamadı
        </h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Aradığınız bitki veritabanımızda henüz kayıtlı değil veya kaldırılmış olabilir.
        </p>
        <Link
          href="/plants"
          className="btn btn-primary"
          style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem' }}
        >
          <ArrowLeft size={16} /> Botanik Koleksiyonuna Dön
        </Link>
      </div>
    );
  }

  const headerImage = plant.images?.[0]?.image_url;

  // Hızlı Bakım Notları
  const quickNotes = [
    (plant.care?.watering_need || plant.care?.watering_description) && {
      icon: <Droplet size={15} strokeWidth={1.8} />,
      label: 'SULAMA',
      value: plant.care?.watering_need || plant.care?.watering_description,
      note: plant.care?.watering_description && plant.care?.watering_need && plant.care.watering_description !== plant.care.watering_need ? plant.care.watering_description : null,
      accent: '#89b8cb'
    },
    plant.care?.light_need && {
      icon: <Sun size={15} strokeWidth={1.8} />,
      label: 'IŞIK',
      value: plant.care.light_need,
      note: plant.care.direct_sun_tolerance ? `Direkt Güneş: ${plant.care.direct_sun_tolerance}` : null,
      accent: '#d8c27a'
    },
    (plant.care?.soil_type || plant.care?.drainage_need) && {
      icon: <Sprout size={15} strokeWidth={1.8} />,
      label: 'TOPRAK & DRENAJ',
      value: plant.care.soil_type || 'İyi Drene Toprak',
      note: plant.care.drainage_need && plant.care.drainage_need !== plant.care.soil_type ? plant.care.drainage_need : null,
      accent: 'var(--accent-green)'
    },
    plant.care?.soil_ph && {
      icon: <Compass size={15} strokeWidth={1.8} />,
      label: 'TOPRAK pH',
      value: plant.care.soil_ph,
      note: null,
      accent: '#9ca66b'
    },
    plant.care?.drought_tolerance && {
      icon: <ShieldAlert size={15} strokeWidth={1.8} />,
      label: 'KURAKLIK DİRENCİ',
      value: plant.care.drought_tolerance,
      note: null,
      accent: '#cca573'
    },
    (plant.care?.cold_tolerance || plant.care?.temperature_min !== null) && {
      icon: <Thermometer size={15} strokeWidth={1.8} />,
      label: 'SOĞUK DİRENCİ',
      value: plant.care?.cold_tolerance || (plant.care?.temperature_min ? `${plant.care.temperature_min}°C` : null),
      note: null,
      accent: '#8ec7d9'
    },
    (plant.care?.humidity_need || plant.care?.humidity_ideal) && {
      icon: <Wind size={15} strokeWidth={1.8} />,
      label: 'NEM İHTİYACI',
      value: plant.care.humidity_need || plant.care.humidity_ideal,
      note: null,
      accent: '#83bba6'
    },
    plant.care?.pruning_need && {
      icon: <Scissors size={15} strokeWidth={1.8} />,
      label: 'BUDAMA',
      value: plant.care.pruning_need,
      note: null,
      accent: '#baa892'
    }
  ].filter(Boolean);

  const hasPhysical = plant.physical_avg_height || plant.physical_avg_width || plant.physical_growth_form || plant.leaf_description;
  const hasFlower = plant.flower_description || plant.flower_color || plant.flowering_period || plant.fruit_seed_info;
  const hasHabitat = plant.habitat && (
    plant.habitat.placement || plant.habitat.landscape_use || plant.habitat.climate_preference ||
    plant.habitat.origin || plant.habitat.natural_habitat || plant.habitat.regions
  );
  const hasUsage = plant.usage && (
    plant.usage.medical_use || plant.usage.traditional_use || plant.usage.beekeeping_value ||
    plant.usage.ornamental_use || plant.usage.landscape_use || plant.usage.other_notes
  );
  const hasProblems = plant.problems && plant.problems.length > 0;

  return (
    <div className="animate-enter" style={{ maxWidth: '1060px', margin: '0 auto', paddingTop: '1rem', paddingBottom: '5rem' }}>

      {/* ─── 1. ÜST NAVİGASYON & EYLEMLER ─── */}
      <div style={{
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <Link
          href="/plants"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.85rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent-sage)',
            fontWeight: 600,
            textDecoration: 'none'
          }}
        >
          <ArrowLeft size={16} />
          Botanik Koleksiyonuna Dön
        </Link>

        {/* Eylemler: Düzenle & Sil */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem', padding: '0.45rem 1rem' }}
          >
            <Edit3 size={15} />
            Düzenle
          </button>

          <button
            type="button"
            onClick={() => setShowDeleteModal(true)}
            style={{
              background: 'rgba(192, 80, 74, 0.12)',
              border: '1px solid rgba(192, 80, 74, 0.3)',
              color: '#f07070',
              padding: '0.45rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontWeight: 500
            }}
          >
            <Trash2 size={15} />
            Sil
          </button>
        </div>
      </div>

      {/* Başarı Bildirimi */}
      {saveSuccess && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(125, 155, 110, 0.15)',
          border: '1px solid rgba(125, 155, 110, 0.4)',
          color: 'var(--accent-green)',
          marginBottom: '1.5rem',
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={18} />
          <span>Bitki bilgileri başarıyla güncellendi.</span>
        </div>
      )}

      {/* ─── 2. ÜST GÖVDE: ASİMETRİK BOTANİK DEFTERİ YERLEŞİMİ ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem',
        marginBottom: '3rem'
      }}>

        {/* SOL TARAF: BOTANİK NUMUNE GÖRSELİ + BAŞLIK + AÇIKLAMA */}
        <div>
          {/* Numune Görseli */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '380px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: '#111613',
            border: '1px solid rgba(216, 194, 122, 0.22)',
            marginBottom: '1rem',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.45)'
          }}>
            {plant.images && plant.images.length > 0 ? (
              <img
                src={(() => {
                  const url = plant.images[activeImageIndex]?.image_url || plant.images[0]?.image_url;
                  if (!url) return '';
                  if (url.startsWith('http://localhost:3001')) return url.replace('http://localhost:3001', API_URL);
                  if (url.startsWith('/uploads')) return `${API_URL}${url}`;
                  return url;
                })()}
                alt={plant.turkish_name || plant.scientific_name}
                loading="lazy"
                decoding="async"
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a0e0b' }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                background: 'radial-gradient(ellipse at center, #1b231d 0%, #0d120f 100%)'
              }}>
                <Leaf size={48} strokeWidth={1} style={{ color: 'rgba(143, 164, 134, 0.4)' }} />
                <span style={{
                  fontSize: '0.76rem',
                  color: 'var(--accent-sage)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  fontFamily: "'Lora', Georgia, serif",
                  fontStyle: 'italic'
                }}>
                  Saha Numune Kaydı
                </span>
              </div>
            )}

            {/* Numune Etiket Rozeti */}
            <div style={{
              position: 'absolute',
              bottom: '1rem',
              left: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(17, 22, 19, 0.88)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(216, 194, 122, 0.3)',
              padding: '0.35rem 0.85rem',
              borderRadius: '4px',
              fontSize: '0.74rem',
              color: 'var(--accent-gold)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 600
            }}>
              <Bookmark size={13} style={{ color: 'var(--accent-green)' }} />
              <span>
                {plant.images?.[activeImageIndex]?.image_type === 'book_note' ? 'Kitap / Not Sayfası' : 'Botanik Fotoğrafı'}
              </span>
            </div>
          </div>

          {/* Çoklu Görsel Küçük Seçici (Thumbnails) */}
          {plant.images && plant.images.length > 1 && (
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1.6rem',
              overflowX: 'auto',
              flexWrap: 'nowrap',
              paddingBottom: '0.4rem',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(216, 194, 122, 0.3) transparent'
            }}>
              {plant.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.4rem 0.65rem',
                    borderRadius: 'var(--radius-md)',
                    background: activeImageIndex === idx ? 'rgba(216, 194, 122, 0.15)' : 'rgba(20, 27, 23, 0.7)',
                    border: activeImageIndex === idx ? '1px solid var(--accent-gold)' : '1px solid rgba(143, 164, 134, 0.2)',
                    color: activeImageIndex === idx ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    fontSize: '0.75rem',
                    fontWeight: activeImageIndex === idx ? 600 : 400,
                    transition: 'var(--transition-fast)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  <img
                    src={img.image_url?.startsWith('http://localhost:3001') ? img.image_url.replace('http://localhost:3001', API_URL) : img.image_url?.startsWith('/uploads') ? `${API_URL}${img.image_url}` : img.image_url}
                    alt="Thumbnail"
                    style={{ width: 28, height: 28, borderRadius: 4, objectFit: 'cover', flexShrink: 0 }}
                  />
                  <span>{img.image_type === 'book_note' ? 'Kitap Notu' : 'Bitki Fotoğrafı'}</span>
                </button>
              ))}
            </div>
          )}

          {/* Başlık Hiyerarşisi */}
          <div>
            {plant.family && (
              <div style={{
                fontSize: '0.76rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-sage)',
                fontWeight: 600,
                marginBottom: '0.35rem'
              }}>
                {plant.family} {plant.genus ? `• Cins: ${plant.genus}` : ''}
              </div>
            )}

            <h1 style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: 'clamp(2.2rem, 3.8vw, 2.9rem)',
              color: '#f3efe6',
              lineHeight: 1.15,
              fontWeight: 500,
              margin: '0.1rem 0 0.4rem 0'
            }}>
              {plant.turkish_name || plant.scientific_name}
            </h1>

            <div style={{
              fontFamily: "'Lora', Georgia, serif",
              fontSize: '1.2rem',
              color: 'var(--accent-gold)',
              fontStyle: 'italic',
              marginBottom: '1.2rem'
            }}>
              {plant.scientific_name}
              {plant.alternative_names && (
                <span style={{ fontSize: '0.88rem', color: 'var(--text-tertiary)', fontStyle: 'normal', marginLeft: '0.6rem' }}>
                  • {plant.alternative_names}
                </span>
              )}
            </div>

            {plant.description && (
              <div style={{
                fontSize: '0.96rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                borderLeft: '2px solid rgba(216, 194, 122, 0.35)',
                paddingLeft: '1.2rem',
                whiteSpace: 'pre-line'
              }}>
                {plant.description}
              </div>
            )}
          </div>
        </div>

        {/* SAĞ TARAF: SAHA & BAKIM KENAR NOTLARI */}
        <div style={{
          background: 'rgba(20, 27, 23, 0.75)',
          border: '1px solid rgba(143, 164, 134, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.8rem',
          height: 'fit-content',
          boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.6rem',
            paddingBottom: '0.7rem',
            borderBottom: '1px solid rgba(216, 194, 122, 0.2)'
          }}>
            <Sparkles size={16} style={{ color: 'var(--accent-gold)' }} />
            <span style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#f3efe6'
            }}>
              Saha & Bakım Notları
            </span>
          </div>

          {quickNotes.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {quickNotes.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                    paddingBottom: '0.8rem',
                    borderBottom: idx < quickNotes.length - 1 ? '1px dashed rgba(255, 255, 255, 0.07)' : 'none'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: item.accent || 'var(--accent-sage)'
                  }}>
                    {item.icon}
                    <span>{item.label}</span>
                  </div>

                  <div style={{
                    fontSize: '0.94rem',
                    color: '#f3efe6',
                    fontWeight: 500,
                    lineHeight: 1.4,
                    marginTop: '0.1rem'
                  }}>
                    {item.value}
                  </div>

                  {item.note && (
                    <div style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-tertiary)',
                      lineHeight: 1.45,
                      marginTop: '0.15rem'
                    }}>
                      {item.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Kayıtlı saha bakım notu bulunamadı.
            </p>
          )}

          {/* Bakım Zorluğu */}
          {plant.care?.care_difficulty !== null && plant.care?.care_difficulty !== undefined && (
            <div style={{
              marginTop: '1.8rem',
              paddingTop: '1.2rem',
              borderTop: '1px solid rgba(216, 194, 122, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.74rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-sage)',
                fontWeight: 700
              }}>
                <span>Bakım Zorluğu</span>
                <span style={{ color: 'var(--accent-gold)', fontFamily: "'Lora', Georgia, serif", fontStyle: 'italic', fontSize: '0.9rem' }}>
                  {plant.care.care_difficulty} / 10
                </span>
              </div>

              <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: i < plant.care.care_difficulty ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.08)'
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ─── 3. AYIRICI BOTANİK ÇİZGİ ─── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '2rem 0 3rem 0',
        position: 'relative'
      }}>
        <div style={{ height: '1px', width: '100%', backgroundColor: 'rgba(216, 194, 122, 0.18)' }} />
        <div style={{
          position: 'absolute',
          background: 'var(--bg-color)',
          padding: '0 1.2rem',
          color: 'var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.78rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontWeight: 600
        }}>
          <Leaf size={13} strokeWidth={1.6} style={{ color: 'var(--accent-green)' }} />
          <span>Detaylı Botanik Saha Raporu</span>
          <Leaf size={13} strokeWidth={1.6} style={{ color: 'var(--accent-green)', transform: 'scaleX(-1)' }} />
        </div>
      </div>

      {/* ─── 4. ALT BÖLÜM: BOTANİK BÖLÜMLER ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2.5rem 3rem'
      }}>

        {/* 🌿 BÖLÜM 1: GENEL VE FİZİKSEL ÖZELLİKLER */}
        {hasPhysical && (
          <div style={{
            background: 'rgba(20, 27, 23, 0.65)',
            border: '1px solid rgba(143, 164, 134, 0.18)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.6rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              paddingBottom: '0.65rem',
              borderBottom: '1px solid rgba(143, 164, 134, 0.2)',
              marginBottom: '1.2rem'
            }}>
              <Layers size={17} style={{ color: 'var(--accent-sage)' }} />
              <h3 style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: '1.2rem',
                color: '#f3efe6',
                fontWeight: 500,
                margin: 0
              }}>
                Genel & Fiziksel Nitelikler
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {plant.physical_avg_height && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Boyut & Yükseklik: </strong>
                  <span style={{ color: 'var(--accent-gold)' }}>{plant.physical_avg_height}</span>
                  {plant.physical_avg_width && <span> (Genişlik: {plant.physical_avg_width})</span>}
                </div>
              )}

              {plant.physical_growth_form && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Büyüme Şekli: </strong>
                  <span>{plant.physical_growth_form}</span>
                </div>
              )}

              {plant.leaf_description && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Yaprak Yapısı: </strong>
                  <span>{plant.leaf_description}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🌸 BÖLÜM 2: ÇİÇEKLENME VE MEYVE */}
        {hasFlower && (
          <div style={{
            background: 'rgba(20, 27, 23, 0.65)',
            border: '1px solid rgba(143, 164, 134, 0.18)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.6rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              paddingBottom: '0.65rem',
              borderBottom: '1px solid rgba(216, 194, 122, 0.2)',
              marginBottom: '1.2rem'
            }}>
              <Flower2 size={17} style={{ color: 'var(--accent-gold)' }} />
              <h3 style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: '1.2rem',
                color: '#f3efe6',
                fontWeight: 500,
                margin: 0
              }}>
                Çiçeklenme & Meyve
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {(plant.flower_description || plant.flower_color) && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-gold)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Çiçek Özellikleri: </strong>
                  {plant.flower_description && <span>{plant.flower_description} </span>}
                  {plant.flower_color && (
                    <span style={{ color: 'var(--accent-gold)' }}>
                      (Renk: {plant.flower_color})
                    </span>
                  )}
                </div>
              )}

              {plant.flowering_period && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-gold)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Çiçeklenme Dönemi: </strong>
                  <span style={{ color: 'var(--accent-gold)', fontStyle: 'italic' }}>
                    {plant.flowering_period}
                  </span>
                </div>
              )}

              {plant.fruit_seed_info && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-gold)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Meyve / Kozalak / Tohum: </strong>
                  <span>{plant.fruit_seed_info}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🗺️ BÖLÜM 3: YAŞAM ALANI & PEYZAJ */}
        {hasHabitat && (
          <div style={{
            background: 'rgba(20, 27, 23, 0.65)',
            border: '1px solid rgba(143, 164, 134, 0.18)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.6rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              paddingBottom: '0.65rem',
              borderBottom: '1px solid rgba(143, 164, 134, 0.2)',
              marginBottom: '1.2rem'
            }}>
              <MapPin size={17} style={{ color: 'var(--accent-sage)' }} />
              <h3 style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: '1.2rem',
                color: '#f3efe6',
                fontWeight: 500,
                margin: 0
              }}>
                Yaşam Alanı & Peyzaj
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {plant.habitat.placement && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Konum / Ortam: </strong>
                  <span>{plant.habitat.placement}</span>
                </div>
              )}

              {plant.habitat.landscape_use && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Peyzaj Kullanımı: </strong>
                  <span>{plant.habitat.landscape_use}</span>
                </div>
              )}

              {plant.habitat.climate_preference && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>İklim Uyumu: </strong>
                  <span>{plant.habitat.climate_preference}</span>
                </div>
              )}

              {plant.habitat.origin && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Kökeni: </strong>
                  <span>{plant.habitat.origin}</span>
                </div>
              )}

              {plant.habitat.regions && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-green)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Yayılış Alanları: </strong>
                  <span>{plant.habitat.regions}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ☕ BÖLÜM 4: ŞİFA, ARICILIK & FONKSİYONEL DEĞER */}
        {hasUsage && (
          <div style={{
            background: 'rgba(20, 27, 23, 0.65)',
            border: '1px solid rgba(143, 164, 134, 0.18)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.6rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.55rem',
              paddingBottom: '0.65rem',
              borderBottom: '1px solid rgba(216, 194, 122, 0.2)',
              marginBottom: '1.2rem'
            }}>
              <HeartHandshake size={17} style={{ color: 'var(--accent-gold)' }} />
              <h3 style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: '1.2rem',
                color: '#f3efe6',
                fontWeight: 500,
                margin: 0
              }}>
                Şifa, Arıcılık & Fonksiyonel Değer
              </h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {plant.usage.medical_use && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-gold)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Tıbbi Kullanım / Çay: </strong>
                  <span style={{ color: 'var(--accent-gold)' }}>{plant.usage.medical_use}</span>
                </div>
              )}

              {plant.usage.beekeeping_value && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-gold)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Arıcılık & Bal: </strong>
                  <span>{plant.usage.beekeeping_value}</span>
                </div>
              )}

              {plant.usage.ornamental_use && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-gold)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Süs Değeri: </strong>
                  <span>{plant.usage.ornamental_use}</span>
                </div>
              )}

              {plant.usage.other_notes && (
                <div style={{ fontSize: '0.92rem', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-gold)', marginRight: '0.45rem' }}>✦</span>
                  <strong style={{ color: '#f3efe6', fontWeight: 600 }}>Özel Notlar: </strong>
                  <span>{plant.usage.other_notes}</span>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ─── 5. DÜZENLEME MODALI ─── */}
      {isEditing && editFormData && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
          zIndex: 999
        }}>
          <div style={{
            background: '#161e19',
            border: '1px solid rgba(143, 164, 134, 0.3)',
            borderRadius: 'var(--radius-lg)',
            padding: '2rem',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(143, 164, 134, 0.2)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.3rem', color: '#f3efe6', margin: 0 }}>
                Bitki Bilgilerini Düzenle
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveUpdate}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-sage)', marginBottom: '0.3rem', fontWeight: 600 }}>
                  TÜRKÇE ADI
                </label>
                <input
                  type="text"
                  value={editFormData.turkish_name || ''}
                  onChange={e => setEditFormData({ ...editFormData, turkish_name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(143, 164, 134, 0.3)',
                    background: 'rgba(15, 20, 17, 0.9)',
                    color: 'var(--text-primary)',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-sage)', marginBottom: '0.3rem', fontWeight: 600 }}>
                  BİLİMSEL ADI (LATİNCE)
                </label>
                <input
                  type="text"
                  value={editFormData.scientific_name || ''}
                  onChange={e => setEditFormData({ ...editFormData, scientific_name: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(143, 164, 134, 0.3)',
                    background: 'rgba(15, 20, 17, 0.9)',
                    color: 'var(--text-primary)',
                    fontFamily: "'Outfit', sans-serif"
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-sage)', marginBottom: '0.3rem', fontWeight: 600 }}>
                    FAMİLYA
                  </label>
                  <input
                    type="text"
                    value={editFormData.family || ''}
                    onChange={e => setEditFormData({ ...editFormData, family: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(143, 164, 134, 0.3)',
                      background: 'rgba(15, 20, 17, 0.9)',
                      color: 'var(--text-primary)',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-sage)', marginBottom: '0.3rem', fontWeight: 600 }}>
                    CİNS
                  </label>
                  <input
                    type="text"
                    value={editFormData.genus || ''}
                    onChange={e => setEditFormData({ ...editFormData, genus: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(143, 164, 134, 0.3)',
                      background: 'rgba(15, 20, 17, 0.9)',
                      color: 'var(--text-primary)',
                      fontFamily: "'Outfit', sans-serif"
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--accent-sage)', marginBottom: '0.3rem', fontWeight: 600 }}>
                  AÇIKLAMA / SAHA NOTU
                </label>
                <textarea
                  rows={4}
                  value={editFormData.description || ''}
                  onChange={e => setEditFormData({ ...editFormData, description: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(143, 164, 134, 0.3)',
                    background: 'rgba(15, 20, 17, 0.9)',
                    color: 'var(--text-primary)',
                    fontFamily: "'Outfit', sans-serif",
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsEditing(false)}
                  disabled={isSaving}
                  style={{ fontSize: '0.9rem' }}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                  style={{ fontSize: '0.9rem', minWidth: 140 }}
                >
                  {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── 6. SİLME ONAY MODALI ─── */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.8)',
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
            textAlign: 'center',
            boxShadow: '0 20px 50px rgba(0,0,0,0.7)'
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
              Bu bitki ve tüm fotoğrafları, saha notları veritabanından kalıcı olarak silinecektir.
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
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                style={{ fontSize: '0.9rem', flex: 1 }}
              >
                Vazgeç
              </button>
              <button
                type="button"
                onClick={handleDeletePlant}
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
