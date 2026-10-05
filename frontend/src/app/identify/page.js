"use client";
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Camera, Image as ImageIcon, ArrowRight, Loader2, AlertTriangle,
  ArrowLeft, CheckCircle2, ChevronDown, ChevronUp, Save, Eye,
  Trash2, Plus, Edit3, Droplet, Sun, Wind, Thermometer, MapPin,
  Sprout, Flower2, HeartHandshake, Layers, Sparkles, BookOpen, NotebookPen,
  X, SwitchCamera, RefreshCw
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Belirsiz alan kontrolü
const isUncertain = (val) => val === 'BELIRSIZ' || val === 'Belirlenemedi' || val === 'Doğrulanmalı' || val === null || val === undefined || val === '';

function StatCard({ icon, label, value, color }) {
  const displayVal = isUncertain(value) ? 'Belirlenemedi' : value;
  const isPending = isUncertain(value);

  return (
    <div style={{
      background: 'rgba(24, 32, 27, 0.75)',
      border: '1px solid rgba(143, 164, 134, 0.18)',
      borderRadius: 'var(--radius-md)',
      padding: '0.9rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.35rem',
      transition: 'var(--transition-fast)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.72rem', fontWeight: 600, color: color || 'var(--accent-sage)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {icon}
        <span>{label}</span>
      </div>
      <div style={{
        fontSize: '0.92rem',
        fontWeight: isPending ? 400 : 600,
        color: isPending ? 'var(--text-muted)' : 'var(--text-primary)',
        fontStyle: isPending ? 'italic' : 'normal',
        lineHeight: 1.3
      }}>
        {displayVal}
      </div>
    </div>
  );
}

function SectionAccordion({ title, icon, color, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{
      borderBottom: '1px solid rgba(143, 164, 134, 0.15)',
      padding: '0.5rem 0'
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.85rem 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: color || 'var(--accent-sage)',
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 600,
          fontSize: '0.9rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          {icon}
          <span>{title}</span>
        </div>
        {open ? <ChevronUp size={16} style={{ color: 'var(--text-tertiary)' }} /> : <ChevronDown size={16} style={{ color: 'var(--text-tertiary)' }} />}
      </button>
      {open && <div style={{ paddingBottom: '1rem' }}>{children}</div>}
    </div>
  );
}

function DataField({ label, value, onChange, isEditing, textarea = false, placeholder = "Belirtilmedi" }) {
  if (isEditing) {
    return (
      <div style={{ marginBottom: '0.85rem' }}>
        <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--accent-sage)', marginBottom: '0.3rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {label}
        </label>
        {textarea ? (
          <textarea
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            rows={3}
            style={{
              width: '100%',
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(143, 164, 134, 0.3)',
              background: 'rgba(15, 20, 17, 0.9)',
              color: 'var(--text-primary)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.9rem',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        ) : (
          <input
            type="text"
            value={value || ''}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            style={{
              width: '100%',
              padding: '0.55rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(143, 164, 134, 0.3)',
              background: 'rgba(15, 20, 17, 0.9)',
              color: 'var(--text-primary)',
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
        )}
      </div>
    );
  }

  const isPending = isUncertain(value);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: '1.2rem',
      padding: '0.55rem 0',
      borderBottom: '1px dashed rgba(255, 255, 255, 0.06)'
    }}>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', flexShrink: 0 }}>{label}</span>
      <span style={{
        fontSize: '0.9rem',
        color: isPending ? 'var(--text-muted)' : 'var(--text-primary)',
        textAlign: 'right',
        fontStyle: isPending ? 'italic' : 'normal',
        fontWeight: isPending ? 400 : 500,
        maxWidth: '65%'
      }}>
        {isPending ? 'Belirlenemedi' : value}
      </span>
    </div>
  );
}

export default function IdentifyPage() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const videoRef = useRef(null);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [plantData, setPlantData] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedPlantId, setSavedPlantId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [userNotes, setUserNotes] = useState('');
  const [isSavedToNotebook, setIsSavedToNotebook] = useState(false);
  const [savingNotebook, setSavingNotebook] = useState(false);

  // Yapay zekâda okutulan bitkiyi doğrudan Kişisel Not Defterime kaydetme
  const saveToNotebook = async () => {
    if (!result?.data) return;
    setSavingNotebook(true);
    try {
      const temel = plantData?.temel || result?.data?.temel || {};
      const bakim = plantData?.bakim || result?.data?.bakim || {};
      const habitat = plantData?.habitat || result?.data?.habitat || {};

      const plantTitle = temel.turkish_name || temel.scientific_name || 'Botanik Saha Notu';

      const formData = new FormData();
      formData.append('title', `${plantTitle} — AI Saha Notu`);
      if (temel.turkish_name) formData.append('plant_name', temel.turkish_name);
      if (habitat.natural_habitat || habitat.origin) formData.append('location', habitat.natural_habitat || habitat.origin);

      let contentStr = `${temel.description || ''}\n\n`;
      contentStr += `🌿 Bilimsel Adı: ${temel.scientific_name || 'Belirtilmedi'}\n`;
      contentStr += `Familya: ${temel.family || 'Belirtilmedi'}\n`;
      if (bakim.light_need || bakim.watering_need) {
        contentStr += `💧 Işık: ${bakim.light_need || 'Güneşli/Aydınlık'} | Sulama: ${bakim.watering_need || 'Normal'}\n`;
      }
      formData.append('content', contentStr.trim());
      formData.append('tags', `${temel.family || 'Botanik'}, Saha Notu, YapayZekâ`);

      if (previewUrls.length > 0) {
        const response = await fetch(previewUrls[0]);
        const blob = await response.blob();
        formData.append('photo', blob, 'notebook-plant.jpg');
      }

      const res = await fetch(`${API_URL}/api/notebook`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Not defterine eklenirken hata oluştu.');
      }

      setIsSavedToNotebook(true);
    } catch (err) {
      alert(err.message || 'Not defterine eklenemedi.');
    } finally {
      setSavingNotebook(false);
    }
  };

  // Kamera State'leri
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');

  // Canlı kamerayı başlat
  const startCamera = async (mode = facingMode) => {
    setIsCameraOpen(true);
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: { ideal: mode },
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } else {
        throw new Error('Tarayıcınız kamera erişimini desteklemiyor.');
      }
    } catch (err) {
      console.error('Kamera hatası:', err);
      setCameraError('Kameraya erişilemedi. Lütfen tarayıcınızın kamera iznini kontrol edin veya galeriden fotoğraf seçin.');
    }
  };

  // Kamerayı kapat
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
    setCameraError(null);
  };

  // Kamerayı ön/arka arasında değiştir
  const toggleCamera = () => {
    stopCamera();
    const newMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(newMode);
    setTimeout(() => {
      startCamera(newMode);
    }, 300);
  };

  // Kameradan anlık fotoğraf çek
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `bitki_kamera_${Date.now()}.jpg`, { type: 'image/jpeg' });
      handleFilesAdded([file]);
      stopCamera();
    }, 'image/jpeg', 0.92);
  };

  // Dosya seçildiğinde
  const handleFilesAdded = (files) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    const newFiles = [...selectedFiles, ...fileArray].slice(0, 5); // En fazla 5 görsel
    setSelectedFiles(newFiles);

    const newUrls = newFiles.map(f => URL.createObjectURL(f));
    setPreviewUrls(newUrls);
    setError(null);
  };

  // Tekil görsel sil
  const removeImage = (index) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedUrls = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    setPreviewUrls(updatedUrls);
  };

  // Bitkiyi Tanı / Analiz Et
  const handleAnalyze = async () => {
    if (selectedFiles.length === 0) return;
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const res = await fetch(`${API_URL}/api/analyze-note`, {
        method: 'POST',
        body: formData
      });

      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.error || 'Bitki analizi sırasında bir hata oluştu.');
      }

      setResult(responseData);
      setPlantData(responseData.data);
      setUploadedImages(responseData.images || []);
    } catch (err) {
      console.error('Analiz hatası:', err);
      setError(err.message || 'Yapay zekâ bağlantısı yapılandırılmamış veya servis yanıt vermiyor. GEMINI_API_KEY ekleyin.');
    } finally {
      setIsLoading(false);
    }
  };

  // Kişisel Not Defterime Kaydet
  const handleSave = async () => {
    if (!plantData && !result?.data) return;
    setIsSaving(true);
    try {
      const dataToSave = plantData || result?.data;
      const temel = dataToSave?.temel || {};
      const bakim = dataToSave?.bakim || {};
      const habitat = dataToSave?.habitat || {};

      const plantTitle = temel.turkish_name || temel.scientific_name || 'Botanik Saha Notu';

      const formData = new FormData();
      formData.append('title', `${plantTitle} — Saha Notu`);
      if (temel.turkish_name) formData.append('plant_name', temel.turkish_name);
      if (habitat.natural_habitat || habitat.origin) formData.append('location', habitat.natural_habitat || habitat.origin);

      let contentStr = `${temel.description || ''}\n\n`;
      contentStr += `🌿 Bilimsel Adı: ${temel.scientific_name || 'Belirtilmedi'}\n`;
      contentStr += `Familya: ${temel.family || 'Belirtilmedi'}\n`;
      if (bakim.light_need || bakim.watering_need) {
        contentStr += `💧 Işık: ${bakim.light_need || 'Güneşli/Aydınlık'} | Sulama: ${bakim.watering_need || 'Normal'}\n`;
      }
      if (userNotes) {
        contentStr += `\n📝 Ek Saha Notu: ${userNotes}\n`;
      }
      formData.append('content', contentStr.trim());
      formData.append('tags', `${temel.family || 'Botanik'}, Saha Notu, YapayZekâ`);

      if (previewUrls.length > 0) {
        const response = await fetch(previewUrls[0]);
        const blob = await response.blob();
        formData.append('photo', blob, 'notebook-plant.jpg');
      }

      const res = await fetch(`${API_URL}/api/notebook`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Not defterine eklenirken hata oluştu.');
      }

      const saved = await res.json();
      setIsSavedToNotebook(true);
      setSavedPlantId(saved.entry?.id || 'saved');
    } catch (err) {
      console.error('Kayıt hatası:', err);
      setError(err.message || 'Not defterine kaydedilemedi.');
    } finally {
      setIsSaving(false);
    }
  };

  // Sıfırla / Yeni Fotoğraf
  const resetAll = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    setResult(null);
    setPlantData(null);
    setUploadedImages([]);
    setError(null);
    setSavedPlantId(null);
    setIsEditing(false);
    setUserNotes('');
  };

  // Helper nested state updater
  const updateNestedField = (category, field, value) => {
    setPlantData(prev => ({
      ...prev,
      [category]: {
        ...(prev?.[category] || {}),
        [field]: value
      }
    }));
  };

  return (
    <div className="animate-enter" style={{ maxWidth: '920px', margin: '0 auto', paddingTop: '1.5rem' }}>

      {/* ─── YÜKLEME EKRANI (Analiz yapılmadıysa) ─── */}
      {!result ? (
        <>
          {/* Başlık */}
          <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(125, 155, 110, 0.12)',
              border: '1px solid rgba(125, 155, 110, 0.25)',
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              color: 'var(--accent-green)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              <Camera size={15} />
              <span>Bitki Tanıma & Botanik Not Defteri</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '0.75rem', color: '#f3efe6' }}>
              Bitkinin Fotoğrafını Yükle
            </h1>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontSize: '0.98rem', lineHeight: 1.6 }}>
              Ağaç, çalı veya yaprak fotoğrafı yükleyin; el yazısı botanik saha notlarınızı ve kitap sayfalarınızı yapay zekâ ile anında tanıyıp yapılandırın.
            </p>
          </div>

          {/* Ana Yükleme Kutusu */}
          <div style={{
            background: 'rgba(20, 27, 23, 0.75)',
            border: isDragging ? '2px dashed var(--accent-green)' : '1px solid rgba(143, 164, 134, 0.22)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem 1.5rem',
            textAlign: 'center',
            marginBottom: '2rem',
            boxShadow: '0 12px 35px rgba(0,0,0,0.35)',
            transition: 'var(--transition)'
          }}
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              handleFilesAdded(e.dataTransfer.files);
            }}
          >
            {/* Önizleme Yoksa: Büyük Yükleme Alanı */}
            {previewUrls.length === 0 ? (
              <div style={{ padding: '2rem 1rem' }}>
                <div style={{
                  width: 72, height: 72,
                  margin: '0 auto 1.5rem',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(125,155,110,0.18), rgba(125,155,110,0.03))',
                  border: '1px solid rgba(125,155,110,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-green)'
                }}>
                  <Camera size={34} strokeWidth={1.5} />
                </div>

                <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.35rem', color: '#f3efe6', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Fotoğrafları Buraya Sürükleyin veya Seçin
                </h3>
                <p style={{ color: 'var(--text-tertiary)', fontSize: '0.88rem', marginBottom: '1.8rem' }}>
                  JPG, PNG veya WEBP • Birden fazla fotoğraf seçebilirsiniz
                </p>

                {/* Eylem Butonları */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => fileInputRef.current?.click()}
                    style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
                  >
                    <ImageIcon size={18} />
                    Galeriden Seç
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => startCamera()}
                    style={{ padding: '0.75rem 1.6rem', fontSize: '0.95rem' }}
                  >
                    <Camera size={18} />
                    Fotoğraf Çek
                  </button>
                </div>
              </div>
            ) : (
              /* Seçilen Fotoğrafların Önizlemesi */
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid rgba(143, 164, 134, 0.15)'
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--accent-sage)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Seçilen Fotoğraflar ({previewUrls.length})
                  </span>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-green)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Camera size={16} /> Fotoğraf Çek
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--accent-gold)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem'
                      }}
                    >
                      <Plus size={16} /> Galeriden Ekle
                    </button>
                  </div>
                </div>

                {/* Thumbnail Izgarası */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2rem'
                }}>
                  {previewUrls.map((url, idx) => (
                    <div key={idx} style={{
                      position: 'relative',
                      height: 120,
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      border: '1px solid rgba(143, 164, 134, 0.3)',
                      background: '#0d120f'
                    }}>
                      <img src={url} alt={`Önizleme ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          background: 'rgba(0,0,0,0.7)',
                          color: '#f07070',
                          border: 'none',
                          borderRadius: '50%',
                          width: 24,
                          height: 24,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          backdropFilter: 'blur(4px)'
                        }}
                        title="Fotoğrafı Kaldır"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Tanıma Butonu */}
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={resetAll}
                    disabled={isLoading}
                    style={{ fontSize: '0.9rem' }}
                  >
                    Temizle
                  </button>

                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAnalyze}
                    disabled={isLoading || previewUrls.length === 0}
                    style={{ minWidth: 220, fontSize: '1rem', padding: '0.85rem 2rem' }}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                        Yapay Zekâ Analiz Ediyor...
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        Bitkiyi & Notu Tanı
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Gizli file inputlar */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/jpeg,image/png,image/webp,image/heic"
              multiple
              onChange={e => handleFilesAdded(e.target.files)}
              style={{ display: 'none' }}
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              onChange={e => handleFilesAdded(e.target.files)}
              style={{ display: 'none' }}
            />
          </div>

          {/* ─── CANLI KAMERA MODALI ─── */}
          {isCameraOpen && (
            <div style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              zIndex: 9999,
              background: 'rgba(10, 15, 12, 0.95)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}>
              {/* Üst Başlık & Kapat */}
              <div style={{
                width: '100%',
                maxWidth: '640px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem',
                color: '#f3efe6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600, fontSize: '1.05rem', fontFamily: "'Outfit', sans-serif" }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: '50%', background: '#4ade80',
                    boxShadow: '0 0 10px #4ade80', display: 'inline-block'
                  }} />
                  <span>Canlı Bitki Kamerası</span>
                </div>
                <button
                  type="button"
                  onClick={stopCamera}
                  style={{
                    background: 'rgba(255,255,255,0.12)',
                    border: 'none',
                    color: '#fff',
                    borderRadius: '50%',
                    width: 38, height: 38,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)'
                  }}
                  title="Kapat"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Kamera Vizör Kutusu */}
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '640px',
                height: '440px',
                background: '#050806',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '2px solid rgba(125, 155, 110, 0.4)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cameraError ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: '#f07070', maxWidth: '420px' }}>
                    <AlertTriangle size={42} style={{ marginBottom: '1rem', opacity: 0.9 }} />
                    <p style={{ fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>{cameraError}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => { stopCamera(); fileInputRef.current?.click(); }}
                      style={{ padding: '0.75rem 1.5rem' }}
                    >
                      <ImageIcon size={18} />
                      Galeriden Fotoğraf Seç
                    </button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* Kamera Vizör Çerçevesi */}
                    <div style={{
                      position: 'absolute',
                      inset: '25px',
                      border: '2px dashed rgba(125, 155, 110, 0.45)',
                      borderRadius: 'var(--radius-lg)',
                      pointerEvents: 'none',
                      boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3)'
                    }} />
                    <div style={{
                      position: 'absolute',
                      bottom: '15px',
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(4px)',
                      color: 'var(--accent-sage)',
                      padding: '0.35rem 0.9rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.78rem',
                      fontWeight: 500
                    }}>
                      Bitkiyi veya not sayfasını çerçeveye ortalayın
                    </div>
                  </>
                )}
              </div>

              {/* Kamera Alt Kontrolleri */}
              {!cameraError && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  marginTop: '1.8rem'
                }}>
                  {/* Ön/Arka Değiştir */}
                  <button
                    type="button"
                    onClick={toggleCamera}
                    title="Kamerayı Değiştir"
                    style={{
                      background: 'rgba(255,255,255,0.12)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: '#fff',
                      borderRadius: '50%',
                      width: 48, height: 48,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'var(--transition-fast)'
                    }}
                  >
                    <SwitchCamera size={22} />
                  </button>

                  {/* Fotoğraf Çek (Deklanşör) */}
                  <button
                    type="button"
                    onClick={capturePhoto}
                    title="Fotoğrafı Çek"
                    style={{
                      width: 74, height: 74,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent-green), #4a673c)',
                      border: '4px solid #ffffff',
                      boxShadow: '0 0 30px rgba(125, 155, 110, 0.65)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff',
                      cursor: 'pointer',
                      transition: 'transform 0.15s ease'
                    }}
                    onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
                    onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <Camera size={32} />
                  </button>

                  {/* İptal */}
                  <button
                    type="button"
                    onClick={stopCamera}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'var(--text-secondary)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.65rem 1.2rem',
                      fontSize: '0.88rem',
                      cursor: 'pointer'
                    }}
                  >
                    İptal
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Hata Bildirimi */}
          {error && (
            <div style={{
              display: 'flex',
              gap: '0.85rem',
              alignItems: 'flex-start',
              padding: '1.2rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(192, 80, 74, 0.1)',
              border: '1px solid rgba(192, 80, 74, 0.3)',
              color: '#f07070',
              fontSize: '0.92rem',
              lineHeight: 1.5,
              marginBottom: '2rem'
            }}>
              <AlertTriangle size={20} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ display: 'block', marginBottom: '0.2rem' }}>Analiz Başarısız Oldu</strong>
                <span>{error}</span>
              </div>
            </div>
          )}
        </>
      ) : (

        /* ─── ANALİZ SONUCU EKRANI ─── */
        <div className="animate-enter" style={{ paddingBottom: '3rem' }}>

          {/* Üst Bar: Geri / Yeni Fotoğraf / Düzenleme Modu */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <button
              onClick={resetAll}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.85rem',
                color: 'var(--text-tertiary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ArrowLeft size={16} /> Yeni Fotoğraf Analizi
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={saveToNotebook}
                disabled={savingNotebook || isSavedToNotebook}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.85rem',
                  padding: '0.45rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  background: isSavedToNotebook ? 'rgba(34, 197, 94, 0.25)' : 'linear-gradient(135deg, rgba(201, 168, 76, 0.25), rgba(125, 155, 110, 0.2))',
                  color: isSavedToNotebook ? '#bbf7d0' : 'var(--accent-gold)',
                  border: '1px solid ' + (isSavedToNotebook ? 'rgba(74, 222, 128, 0.4)' : 'rgba(201, 168, 76, 0.4)'),
                  cursor: isSavedToNotebook ? 'default' : 'pointer',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                }}
              >
                {savingNotebook ? (
                  <>
                    <Loader2 size={15} style={{ animation: 'spin 1s linear infinite' }} />
                    Ekleniyor...
                  </>
                ) : isSavedToNotebook ? (
                  <>
                    <CheckCircle2 size={15} style={{ color: '#4ade80' }} />
                    Not Defterinize Eklendi!
                  </>
                ) : (
                  <>
                    <NotebookPen size={15} />
                    Not Defterime Kaydet
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(e => !e)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontSize: '0.85rem',
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-full)',
                  background: isEditing ? 'var(--accent-gold)' : 'rgba(216, 194, 122, 0.15)',
                  color: isEditing ? '#121614' : 'var(--accent-gold)',
                  border: '1px solid rgba(216, 194, 122, 0.3)',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                <Edit3 size={15} />
                {isEditing ? 'Düzenlemeyi Tamamla' : 'Bilgileri Düzenle'}
              </button>
            </div>
          </div>

          {/* Not Defterine Eklendi Bildirimi */}
          {(isSavedToNotebook || savedPlantId) && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              padding: '1.1rem 1.4rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(201, 168, 76, 0.15)',
              border: '1px solid rgba(201, 168, 76, 0.45)',
              marginBottom: '2rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CheckCircle2 size={24} style={{ color: 'var(--accent-gold)' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--accent-gold)', fontSize: '0.98rem' }}>
                    Saha notunuz başarıyla Kişisel Not Defterinize eklendi! 📖
                  </div>
                  <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                    Kişisel Not Defterim sayfanızdan dilediğiniz an inceleyebilir veya yeni gözlemler ekleyebilirsiniz.
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => router.push('/notebook')}
                style={{
                  fontSize: '0.88rem',
                  padding: '0.55rem 1.3rem',
                  background: 'linear-gradient(135deg, #e5c368, #b8953f)',
                  color: '#121814',
                  fontWeight: 600,
                  flexShrink: 0
                }}
              >
                <NotebookPen size={16} /> Not Defterime Git &rarr;
              </button>
            </div>
          )}

          {/* ─── ÜST BÖLÜM: BİTKİ FOTOĞRAFI VE BAŞLIK BİLGİLERİ ─── */}
          <div style={{
            background: 'rgba(20, 27, 23, 0.85)',
            border: '1px solid rgba(143, 164, 134, 0.2)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            marginBottom: '2rem',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: previewUrls.length > 0 ? 'minmax(280px, 360px) 1fr' : '1fr',
              gap: '1.5rem'
            }}>
              {/* Fotoğraf */}
              {previewUrls.length > 0 && (
                <div style={{ position: 'relative', height: '100%', minHeight: 280, background: '#0a0e0b' }}>
                  <img
                    src={previewUrls[0]}
                    alt={plantData?.temel?.turkish_name || 'Tanınan Bitki'}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {previewUrls.length > 1 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '10px',
                      left: '10px',
                      background: 'rgba(0,0,0,0.75)',
                      backdropFilter: 'blur(6px)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      color: '#f3efe6'
                    }}>
                      +{previewUrls.length - 1} ek fotoğraf
                    </div>
                  )}
                </div>
              )}

              {/* Bitki İsimleri ve Açıklaması */}
              <div style={{ padding: '1.75rem 1.75rem 1.75rem 0.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {isEditing ? (
                  <div>
                    <DataField
                      label="Türkçe Adı"
                      value={plantData?.temel?.turkish_name}
                      onChange={v => updateNestedField('temel', 'turkish_name', v)}
                      isEditing={true}
                    />
                    <DataField
                      label="Bilimsel Adı (Latince)"
                      value={plantData?.temel?.scientific_name}
                      onChange={v => updateNestedField('temel', 'scientific_name', v)}
                      isEditing={true}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                      <DataField
                        label="Familya"
                        value={plantData?.temel?.family}
                        onChange={v => updateNestedField('temel', 'family', v)}
                        isEditing={true}
                      />
                      <DataField
                        label="Cins"
                        value={plantData?.temel?.genus}
                        onChange={v => updateNestedField('temel', 'genus', v)}
                        isEditing={true}
                      />
                    </div>
                    <DataField
                      label="Botanik Açıklama / Özet"
                      value={plantData?.temel?.description}
                      onChange={v => updateNestedField('temel', 'description', v)}
                      isEditing={true}
                      textarea={true}
                    />
                  </div>
                ) : (
                  <div>
                    {plantData?.temel?.family && (
                      <span style={{
                        display: 'inline-block',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        color: 'var(--accent-sage)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        marginBottom: '0.4rem'
                      }}>
                        {plantData.temel.family} {plantData?.temel?.genus ? `• ${plantData.temel.genus}` : ''}
                      </span>
                    )}

                    <h1 style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                      color: '#f3efe6',
                      lineHeight: 1.15,
                      marginBottom: '0.3rem'
                    }}>
                      {plantData?.temel?.turkish_name || plantData?.temel?.scientific_name || 'Bilinmeyen Bitki'}
                    </h1>

                    <div style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: '1.15rem',
                      color: 'var(--accent-gold)',
                      fontStyle: 'italic',
                      marginBottom: '1rem'
                    }}>
                      {plantData?.temel?.scientific_name}
                      {plantData?.temel?.alternative_names && (
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', fontStyle: 'normal', marginLeft: '0.5rem' }}>
                          ({plantData.temel.alternative_names})
                        </span>
                      )}
                    </div>

                    {plantData?.temel?.description && (
                      <p style={{
                        fontSize: '0.92rem',
                        lineHeight: 1.7,
                        color: 'var(--text-secondary)',
                        borderLeft: '2px solid rgba(216, 194, 122, 0.35)',
                        paddingLeft: '1rem',
                        marginTop: '0.5rem'
                      }}>
                        {plantData.temel.description}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ─── HIZLI KARTLAR: SULAMA, IŞIK, TOPRAK, NEM, SICAKLIK, KÖKEN ─── */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
            gap: '0.85rem',
            marginBottom: '2rem'
          }}>
            <StatCard
              icon={<Droplet size={14} style={{ color: '#89b8cb' }} />}
              label="💧 Sulama"
              value={plantData?.bakim?.watering_need}
              color="#89b8cb"
            />
            <StatCard
              icon={<Sun size={14} style={{ color: '#d8c27a' }} />}
              label="☀️ Işık"
              value={plantData?.bakim?.light_need}
              color="#d8c27a"
            />
            <StatCard
              icon={<Sprout size={14} style={{ color: 'var(--accent-green)' }} />}
              label="🌱 Toprak"
              value={plantData?.bakim?.soil_type}
              color="var(--accent-green)"
            />
            <StatCard
              icon={<Wind size={14} style={{ color: '#83bba6' }} />}
              label="💨 Nem"
              value={plantData?.bakim?.humidity_need}
              color="#83bba6"
            />
            <StatCard
              icon={<Thermometer size={14} style={{ color: '#8ec7d9' }} />}
              label="🌡️ Sıcaklık"
              value={plantData?.bakim?.cold_tolerance || plantData?.bakim?.temperature_need}
              color="#8ec7d9"
            />
            <StatCard
              icon={<MapPin size={14} style={{ color: '#baa892' }} />}
              label="🌍 Kökeni"
              value={plantData?.habitat?.origin}
              color="#baa892"
            />
          </div>

          {/* ─── AÇILIR BOTANİK DEFTERİ BÖLÜMLERİ ─── */}
          <div style={{
            background: 'rgba(20, 27, 23, 0.75)',
            border: '1px solid rgba(143, 164, 134, 0.2)',
            borderRadius: 'var(--radius-xl)',
            padding: '1.25rem 1.75rem',
            marginBottom: '2rem'
          }}>

            {/* 1. GENEL & FİZİKSEL ÖZELLİKLER */}
            <SectionAccordion title="Genel & Fiziksel Özellikler" icon={<Layers size={16} />} color="var(--accent-sage)" defaultOpen>
              <DataField
                label="Ortalama Boy"
                value={plantData?.fiziksel?.physical_avg_height}
                onChange={v => updateNestedField('fiziksel', 'physical_avg_height', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Ortalama Genişlik"
                value={plantData?.fiziksel?.physical_avg_width}
                onChange={v => updateNestedField('fiziksel', 'physical_avg_width', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Büyüme Şekli / Formu"
                value={plantData?.fiziksel?.physical_growth_form}
                onChange={v => updateNestedField('fiziksel', 'physical_growth_form', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Yaprak Özellikleri"
                value={plantData?.fiziksel?.leaf_description}
                onChange={v => updateNestedField('fiziksel', 'leaf_description', v)}
                isEditing={isEditing}
                textarea={isEditing}
              />
            </SectionAccordion>

            {/* 2. BAKIM */}
            <SectionAccordion title="Bakım" icon={<Droplet size={16} />} color="var(--accent-green)" defaultOpen>
              <DataField
                label="Işık Gereksinimi"
                value={plantData?.bakim?.light_need}
                onChange={v => updateNestedField('bakim', 'light_need', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Direkt Güneş Toleransı"
                value={plantData?.bakim?.direct_sun_tolerance}
                onChange={v => updateNestedField('bakim', 'direct_sun_tolerance', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Sulama Bilgisi"
                value={plantData?.bakim?.watering_description || plantData?.bakim?.watering_need}
                onChange={v => updateNestedField('bakim', 'watering_description', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Kuraklık Dayanımı"
                value={plantData?.bakim?.drought_tolerance}
                onChange={v => updateNestedField('bakim', 'drought_tolerance', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Soğuğa / Dona Dayanıklılık"
                value={plantData?.bakim?.cold_tolerance}
                onChange={v => updateNestedField('bakim', 'cold_tolerance', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Budama Gereksinimi"
                value={plantData?.bakim?.pruning_need}
                onChange={v => updateNestedField('bakim', 'pruning_need', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Bakım Zorluk Derecesi (1-10)"
                value={plantData?.bakim?.care_difficulty?.toString()}
                onChange={v => updateNestedField('bakim', 'care_difficulty', v)}
                isEditing={isEditing}
              />
            </SectionAccordion>

            {/* 3. ÇİÇEKLENME & MEYVE */}
            <SectionAccordion title="Çiçeklenme & Meyve" icon={<Flower2 size={16} />} color="var(--accent-gold)">
              <DataField
                label="Çiçek Özellikleri"
                value={plantData?.fiziksel?.flower_description}
                onChange={v => updateNestedField('fiziksel', 'flower_description', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Çiçek Rengi"
                value={plantData?.fiziksel?.flower_color}
                onChange={v => updateNestedField('fiziksel', 'flower_color', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Çiçeklenme Dönemi"
                value={plantData?.fiziksel?.flowering_period}
                onChange={v => updateNestedField('fiziksel', 'flowering_period', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Meyve / Kozalak / Tohum"
                value={plantData?.fiziksel?.fruit_seed_info}
                onChange={v => updateNestedField('fiziksel', 'fruit_seed_info', v)}
                isEditing={isEditing}
              />
            </SectionAccordion>

            {/* 4. TOPRAK & İKLİM */}
            <SectionAccordion title="Toprak & İklim" icon={<Sprout size={16} />} color="#9ca66b">
              <DataField
                label="Toprak Türü"
                value={plantData?.bakim?.soil_type}
                onChange={v => updateNestedField('bakim', 'soil_type', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Toprak pH Değeri"
                value={plantData?.bakim?.soil_ph}
                onChange={v => updateNestedField('bakim', 'soil_ph', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Drenaj İhtiyacı"
                value={plantData?.bakim?.drainage_need}
                onChange={v => updateNestedField('bakim', 'drainage_need', v)}
                isEditing={isEditing}
              />
              <DataField
                label="İklim Tercihi"
                value={plantData?.habitat?.climate_preference}
                onChange={v => updateNestedField('habitat', 'climate_preference', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Doğal Yaşam Alanı (Habitat)"
                value={plantData?.habitat?.natural_habitat}
                onChange={v => updateNestedField('habitat', 'natural_habitat', v)}
                isEditing={isEditing}
              />
            </SectionAccordion>

            {/* 5. PEYZAJ KULLANIMI */}
            <SectionAccordion title="Peyzaj Kullanımı" icon={<MapPin size={16} />} color="#baa892">
              <DataField
                label="İç / Dış Mekân Uygunluğu"
                value={plantData?.habitat?.placement}
                onChange={v => updateNestedField('habitat', 'placement', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Peyzaj Kullanım Alanları"
                value={plantData?.habitat?.landscape_use || plantData?.kullanim?.landscape_use}
                onChange={v => updateNestedField('habitat', 'landscape_use', v)}
                isEditing={isEditing}
                textarea={isEditing}
              />
              <DataField
                label="Dekoratif / Süs Değeri"
                value={plantData?.kullanim?.ornamental_use}
                onChange={v => updateNestedField('kullanim', 'ornamental_use', v)}
                isEditing={isEditing}
              />
            </SectionAccordion>

            {/* 6. TIBBİ / FAYDALI ÖZELLİKLER */}
            <SectionAccordion title="Tıbbi / Faydalı Özellikler" icon={<HeartHandshake size={16} />} color="#d8c27a">
              <DataField
                label="Tıbbi Kullanım / Bitki Çayı"
                value={plantData?.kullanim?.medical_use}
                onChange={v => updateNestedField('kullanim', 'medical_use', v)}
                isEditing={isEditing}
              />
              <DataField
                label="Geleneksel Halk Hekimliği"
                value={plantData?.kullanim?.traditional_use}
                onChange={v => updateNestedField('kullanim', 'traditional_use', v)}
                isEditing={isEditing}
              />
            </SectionAccordion>

            {/* 7. ARICILIK */}
            <SectionAccordion title="Arıcılık" icon={<Sparkles size={16} />} color="#e5c368">
              <DataField
                label="Arıcılık ve Bal Değeri"
                value={plantData?.kullanim?.beekeeping_value}
                onChange={v => updateNestedField('kullanim', 'beekeeping_value', v)}
                isEditing={isEditing}
              />
            </SectionAccordion>

            {/* 8. NOTLAR & SAHA GÜNLÜĞÜ */}
            <SectionAccordion title="Notlar" icon={<Edit3 size={16} />} color="#8fa486" defaultOpen>
              <DataField
                label="Kitap / Saha Notları"
                value={plantData?.kullanim?.other_notes}
                onChange={v => updateNestedField('kullanim', 'other_notes', v)}
                isEditing={isEditing}
                textarea={isEditing}
              />

              <div style={{ marginTop: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--accent-sage)', marginBottom: '0.35rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Kullanıcı Özel Saha Notu
                </label>
                <textarea
                  value={userNotes}
                  onChange={e => setUserNotes(e.target.value)}
                  placeholder="Bu bitkiyle ilgili kendi gözlemlerinizi, tarih veya konum bilgilerinizi buraya yazabilirsiniz..."
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(143, 164, 134, 0.3)',
                    background: 'rgba(15, 20, 17, 0.9)',
                    color: 'var(--text-primary)',
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>
            </SectionAccordion>
          </div>

          {/* ─── ALT AKSİYON ÇUBUĞU: KAYDET VE YENİ FOTOĞRAF ─── */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            paddingTop: '1rem'
          }}>
            <button
              className="btn btn-secondary"
              onClick={resetAll}
              style={{ fontSize: '0.92rem' }}
            >
              <ArrowLeft size={16} /> Yeni Fotoğraf
            </button>

            {!savedPlantId ? (
              <button
                className="btn btn-primary"
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  minWidth: 240,
                  fontSize: '1rem',
                  padding: '0.85rem 2.2rem',
                  boxShadow: '0 4px 20px rgba(201, 168, 76, 0.35)',
                  background: 'linear-gradient(135deg, #e5c368, #b8953f)',
                  color: '#121814',
                  fontWeight: 600
                }}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Not Defterine Kaydediliyor...
                  </>
                ) : (
                  <>
                    <NotebookPen size={18} />
                    📖 Not Defterime Kaydet
                  </>
                )}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => router.push('/notebook')}
                style={{ fontSize: '0.95rem', background: 'linear-gradient(135deg, #e5c368, #b8953f)', color: '#121814', fontWeight: 600 }}
              >
                <NotebookPen size={16} /> 📖 Not Defterime Git
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
