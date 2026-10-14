"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  NotebookPen, Plus, Search, Trash2, Camera, MapPin, Sprout,
  Calendar, Tag, X, FileText, CheckCircle2, AlertTriangle, Loader2,
  Sparkles, Image as ImageIcon, BookOpen, User, Palette, Eraser,
  RotateCcw, Edit3, Circle, Square, Minus, Grid, File, Flower2,
  Undo2, Layers, Compass
} from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const COLOR_PALETTE = [
  { name: 'Orman Yeşili', color: '#82ad76' },
  { name: 'Koyu Klorofil', color: '#2d5a27' },
  { name: 'Nane Yeşili', color: '#66ccaa' },
  { name: 'Altın Sarısı', color: '#e5c368' },
  { name: 'Güveç Turuncusu', color: '#d97736' },
  { name: 'Çiçek Kırmızısı', color: '#c47660' },
  { name: 'Gül Pembesi', color: '#e68aa8' },
  { name: 'Orkide Moru', color: '#9b66cc' },
  { name: 'Gökyüzü Mavisi', color: '#66a3cc' },
  { name: 'Toprak Kahvesi', color: '#7c5234' },
  { name: 'Kömür Siyahı', color: '#121814' },
  { name: 'Saf Beyaz', color: '#ffffff' },
];

export default function NotebookPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Sekme State (Fotoğraf vs. Çizim)
  const [inputTab, setInputTab] = useState('photo'); // 'photo' | 'drawing'

  // Form Fields
  const [title, setTitle] = useState('');
  const [plantName, setPlantName] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Çizim Tuvali Gelişmiş State'leri
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#82ad76');
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  // Gelişmiş Çizim Araçları State'leri
  const [toolMode, setToolMode] = useState('brush'); // 'brush' | 'line' | 'circle' | 'rectangle'
  const [paperStyle, setPaperStyle] = useState('dark'); // 'dark' | 'grid' | 'parchment'
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [canvasSnapshot, setCanvasSnapshot] = useState(null);
  const [historyStack, setHistoryStack] = useState([]);

  // AI State'leri
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState(null);

  // Expanded Entry View State
  const [activeEntry, setActiveEntry] = useState(null);

  // Yapay Zekâ İle Notu Zenginleştirme / Analiz Etme
  const handleAiAnalyze = async () => {
    setAiAnalyzing(true);
    setAiSuccessMsg(null);
    try {
      const formData = new FormData();
      if (photoFile) {
        formData.append('images', photoFile);
      } else if (hasDrawn && canvasRef.current) {
        const drawingDataUrl = canvasRef.current.toDataURL('image/png');
        const blob = await (await fetch(drawingDataUrl)).blob();
        formData.append('images', blob, 'drawing.png');
      }

      if (content || title || plantName) {
        formData.append('notes', `${title} ${plantName} ${content}`);
      }

      const res = await fetch(`${API_URL}/api/identify`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Yapay zekâ analizi gerçekleştirilemedi.');
      }

      const resData = await res.json();
      const plantInfo = resData.data?.temel || {};
      const careInfo = resData.data?.bakim || {};

      if (plantInfo.turkish_name && !plantName) {
        setPlantName(plantInfo.turkish_name);
      }

      let extraNotes = '';
      if (plantInfo.description) {
        extraNotes += `\n\n✨ [Yapay Zekâ Tanısı]: ${plantInfo.description}`;
      }
      if (careInfo.light_need || careInfo.watering_need) {
        extraNotes += `\n💧 [Bakım İpucu]: Işık: ${careInfo.light_need || 'Güneşli/Aydınlık'} | Sulama: ${careInfo.watering_need || 'Düzenli'}`;
      }

      setContent(prev => prev ? prev + extraNotes : extraNotes.trim());
      setTags(prev => prev ? `${prev}, YapayZekâ, Botanik` : 'YapayZekâ, Botanik');
      setAiSuccessMsg('Yapay zekâ analizi başarıyla tamamlandı! İpuçları notunuza eklendi ✨');
    } catch (err) {
      alert(err.message || 'Yapay zekâ analizi yapılırken hata oluştu.');
    } finally {
      setAiAnalyzing(false);
    }
  };

  // Notları Getir
  const fetchEntries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/api/notebook`);
      if (!res.ok) throw new Error('Notlar yüklenirken bir hata oluştu.');
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error('Notebook hatası:', err);
      setError('Not defteri yüklenemedi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // Tuval Arka Planı Doku Çizimi
  const applyPaperStyle = (ctx, width, height, style) => {
    if (style === 'parchment') {
      ctx.fillStyle = '#f4eee1';
      ctx.fillRect(0, 0, width, height);
      // Nostaljik doku lekeleri
      ctx.fillStyle = 'rgba(180, 160, 120, 0.08)';
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 30 + 10, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (style === 'grid') {
      ctx.fillStyle = '#101713';
      ctx.fillRect(0, 0, width, height);
      // Izgara çizgileri
      ctx.strokeStyle = 'rgba(143, 164, 134, 0.15)';
      ctx.lineWidth = 1;
      const gridSize = 20;
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
    } else {
      // Dark botanical default
      ctx.fillStyle = '#121a14';
      ctx.fillRect(0, 0, width, height);
    }
  };

  // Tuval Başlatma & Sıfırlama
  const initCanvas = (style = paperStyle) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    applyPaperStyle(ctx, canvas.width, canvas.height, style);
    setHasDrawn(false);
    setHistoryStack([]);
  };

  useEffect(() => {
    if (isModalOpen && inputTab === 'drawing') {
      setTimeout(() => initCanvas(paperStyle), 100);
    }
  }, [isModalOpen, inputTab, paperStyle]);

  // Durumu Geçmişe Kaydet (Undo için)
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistoryStack(prev => [...prev.slice(-15), imageData]); // Son 15 adımı sakla
  };

  // Geri Al (Undo)
  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const newStack = [...historyStack];
    const lastState = newStack.pop();
    setHistoryStack(newStack);

    if (lastState) {
      ctx.putImageData(lastState, 0, 0);
    }
  };

  // Botanik Şablon Ekleme (Damgalar)
  const addBotanicalStamp = (type) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    saveToHistory();

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    ctx.strokeStyle = brushColor;
    ctx.lineWidth = Math.max(brushSize, 2);
    ctx.fillStyle = brushColor + '22'; // Yarı şeffaf dolgu

    if (type === 'leaf') {
      // Yaprak Çizimi
      ctx.beginPath();
      ctx.moveTo(cx, cy - 65);
      ctx.bezierCurveTo(cx + 50, cy - 30, cx + 50, cy + 30, cx, cy + 65);
      ctx.bezierCurveTo(cx - 50, cy + 30, cx - 50, cy - 30, cx, cy - 65);
      ctx.fill();
      ctx.stroke();
      // Orta damar
      ctx.beginPath();
      ctx.moveTo(cx, cy - 65);
      ctx.lineTo(cx, cy + 85);
      ctx.stroke();
    } else if (type === 'flower') {
      // 5 Yapraklı Çiçek
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5;
        const px = cx + Math.cos(angle) * 35;
        const py = cy + Math.sin(angle) * 35;
        ctx.beginPath();
        ctx.arc(px, py, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      // Orta göbek
      ctx.fillStyle = '#e5c368';
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (type === 'pot') {
      // Saksı Çizimi
      ctx.beginPath();
      ctx.rect(cx - 55, cy - 45, 110, 20); // Saksı Ağzı
      ctx.moveTo(cx - 45, cy - 25);
      ctx.lineTo(cx - 35, cy + 55);
      ctx.lineTo(cx + 35, cy + 55);
      ctx.lineTo(cx + 45, cy - 25);
      ctx.fill();
      ctx.stroke();
    } else if (type === 'stem') {
      // Dal ve Sürgün Çizimi
      ctx.beginPath();
      ctx.moveTo(cx - 40, cy + 70);
      ctx.quadraticCurveTo(cx, cy, cx + 30, cy - 70);
      ctx.stroke();
      // Küçük yan yapraklar
      ctx.beginPath(); ctx.arc(cx - 15, cy + 25, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + 20, cy - 20, 12, 0, Math.PI * 2); ctx.stroke();
    }

    setHasDrawn(true);
  };

  // Çizim Olayları (Mouse & Touch)
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    saveToHistory();
    setStartPos({ x, y });

    if (toolMode !== 'brush') {
      setCanvasSnapshot(ctx.getImageData(0, 0, canvas.width, canvas.height));
    } else {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }

    setIsDrawing(true);
    setHasDrawn(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isEraser ? (paperStyle === 'parchment' ? '#f4eee1' : '#121a14') : brushColor;
    ctx.fillStyle = brushColor + '33';

    if (toolMode === 'brush') {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else if (canvasSnapshot) {
      // Şekil Çizim Önizlemesi (Snapshots)
      ctx.putImageData(canvasSnapshot, 0, 0);
      ctx.beginPath();
      if (toolMode === 'line') {
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(x, y);
      } else if (toolMode === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2);
        ctx.fill();
      } else if (toolMode === 'rectangle') {
        ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
        ctx.fill();
      }
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.closePath();
    setIsDrawing(false);
    setCanvasSnapshot(null);
  };

  // Fotoğraf Seçimi
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // Yeni Not Ekleme
  const handleSubmit = async (e) => {
    e.preventDefault();

    let drawingDataUrl = null;
    if (hasDrawn && canvasRef.current) {
      drawingDataUrl = canvasRef.current.toDataURL('image/png');
    }

    if (!title.trim() || (!content.trim() && !photoFile && !drawingDataUrl)) {
      alert('Lütfen en az bir başlık ve not içeriği, fotoğraf veya çizim ekleyin.');
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', title);
      if (plantName) formData.append('plant_name', plantName);
      if (location) formData.append('location', location);
      if (content) formData.append('content', content);
      if (tags) formData.append('tags', tags);
      if (photoFile) formData.append('photo', photoFile);
      if (drawingDataUrl) formData.append('drawing_data', drawingDataUrl);

      const res = await fetch(`${API_URL}/api/notebook`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Not eklenirken hata oluştu.');
      }

      // Formu sıfırla & modal kapat
      setTitle('');
      setPlantName('');
      setLocation('');
      setContent('');
      setTags('');
      setPhotoFile(null);
      setPhotoPreview(null);
      setHasDrawn(false);
      setIsModalOpen(false);

      // Yeniden yükle
      fetchEntries();
    } catch (err) {
      alert(err.message || 'Not eklenemedi.');
    } finally {
      setSubmitting(false);
    }
  };

  // Not Silme
  const handleDelete = async (id, e) => {
    e?.stopPropagation();
    if (!confirm('Bu botanik notunu silmek istediğinizden emin misiniz?')) return;

    try {
      const res = await fetch(`${API_URL}/api/notebook/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Silme işlemi başarısız.');

      setEntries(prev => prev.filter(item => item.id !== id));
      if (activeEntry?.id === id) setActiveEntry(null);
    } catch (err) {
      alert(err.message || 'Not silinemedi.');
    }
  };

  // Filtrelenmiş notlar
  const filteredEntries = entries.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.plant_name && item.plant_name.toLowerCase().includes(q)) ||
      (item.content && item.content.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.tags && item.tags.toLowerCase().includes(q))
    );
  });

  return (
    <div className="animate-enter" style={{ paddingTop: '1.5rem', paddingBottom: '4rem' }}>
      
      {/* ─── SAYFA BAŞLIĞI VE AKSİYONLAR ─── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem',
        marginBottom: '2.5rem',
        borderBottom: '1px solid rgba(143, 164, 134, 0.15)',
        paddingBottom: '1.5rem'
      }}>
        <div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(201, 168, 76, 0.12)',
            border: '1px solid rgba(201, 168, 76, 0.25)',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            color: 'var(--accent-gold)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem'
          }}>
            <NotebookPen size={15} />
            <span>Kişisel Botanik Saha Notları</span>
          </div>

          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', color: '#f3efe6', margin: 0 }}>
            Kişisel Not Defterim
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.35rem' }}>
            Bitkilerinize ait özel gözlemleri, el çizimlerinizi, fotoğrafları ve günlük bakım notlarını kaydedin.
          </p>
        </div>

        {/* Yeni Not Ekle Butonu */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary"
          style={{
            padding: '0.75rem 1.6rem',
            fontSize: '0.95rem',
            boxShadow: '0 6px 20px rgba(130, 173, 118, 0.3)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.55rem'
          }}
        >
          <Plus size={18} />
          <span>Yeni Not Ekle</span>
        </button>
      </div>

      {/* ─── ARAMA BAR & SAYAÇ ─── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ position: 'relative', minWidth: '280px', flex: 1, maxWidth: '450px' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Bitki adı, not veya başlık ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.8rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(143, 164, 134, 0.25)',
              background: 'rgba(20, 27, 23, 0.75)',
              color: '#f3efe6',
              fontSize: '0.9rem',
              outline: 'none',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>

        <div style={{ fontSize: '0.88rem', color: 'var(--text-tertiary)', background: 'rgba(20, 27, 23, 0.5)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(143, 164, 134, 0.15)' }}>
          Toplam <strong>{filteredEntries.length}</strong> botanik notu kayıtlı
        </div>
      </div>

      {/* ─── İÇERİK LİSTESİ / DEFTER KARTLARI ─── */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--accent-sage)' }}>
          <Loader2 size={36} style={{ animation: 'spin 1.2s linear infinite', marginBottom: '1rem' }} />
          <div>Not defteriniz yükleniyor...</div>
        </div>
      ) : error ? (
        <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(239, 68, 68, 0.1)', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(239, 68, 68, 0.25)', color: '#fca5a5' }}>
          <AlertTriangle size={32} style={{ marginBottom: '0.5rem' }} />
          <div>{error}</div>
          <button onClick={fetchEntries} className="btn btn-secondary" style={{ marginTop: '1rem' }}>Tekrar Dene</button>
        </div>
      ) : filteredEntries.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '4.5rem 2rem',
          background: 'rgba(20, 27, 23, 0.55)',
          backdropFilter: 'blur(16px)',
          borderRadius: 'var(--radius-xl)',
          border: '1px dashed rgba(201, 168, 76, 0.3)',
          maxWidth: '600px',
          margin: '2rem auto'
        }}>
          <div style={{
            width: 64, height: 64,
            borderRadius: '50%',
            background: 'rgba(201, 168, 76, 0.12)',
            color: 'var(--accent-gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.2rem'
          }}>
            <NotebookPen size={32} />
          </div>
          <h3 style={{ fontSize: '1.4rem', color: '#f3efe6', marginBottom: '0.5rem' }}>
            {searchQuery ? 'Aramanızla eşleşen not bulunamadı.' : 'Not Defteriniz Henüz Boş'}
          </h3>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.92rem', maxWidth: '420px', margin: '0 auto 1.8rem', lineHeight: 1.5 }}>
            {searchQuery ? 'Farklı kelimeler aramayı deneyebilir veya tüm notları listeleyebilirsiniz.' : 'Bitkilerinize ait gözlemleri, fotoğrafları ve el çizimlerinizi kaydetmek için ilk notunuzu ekleyin.'}
          </p>
          {!searchQuery && (
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
              <Plus size={18} />
              İlk Notu Ekle
            </button>
          )}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.6rem'
        }}>
          {filteredEntries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => setActiveEntry(entry)}
              style={{
                background: 'linear-gradient(145deg, rgba(24, 34, 28, 0.85), rgba(16, 24, 19, 0.9))',
                backdropFilter: 'blur(16px)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(201, 168, 76, 0.25)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.55)';
                e.currentTarget.style.boxShadow = '0 14px 35px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.25)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.35)';
              }}
            >
              {/* Not Fotoğrafı veya Çizim Görseli */}
              {(entry.photo_url || entry.drawing_data) && (
                <div style={{ width: '100%', height: '190px', overflow: 'hidden', position: 'relative', background: '#0a100c' }}>
                  <img
                    src={entry.photo_url ? (entry.photo_url.startsWith('/uploads') ? `${API_URL}${entry.photo_url}` : entry.photo_url) : entry.drawing_data}
                    alt={entry.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {entry.drawing_data && !entry.photo_url && (
                    <div style={{
                      position: 'absolute', top: '0.6rem', right: '0.6rem',
                      background: 'rgba(201, 168, 76, 0.25)', backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(201, 168, 76, 0.4)', color: 'var(--accent-gold)',
                      fontSize: '0.72rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)',
                      display: 'flex', alignItems: 'center', gap: '0.3rem'
                    }}>
                      <Palette size={12} /> El Çizimi
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(16, 24, 19, 0.9) 0%, transparent 50%)' }} />
                </div>
              )}

              {/* Kart Gövdesi */}
              <div style={{ padding: '1.3rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  {/* Etiket & Tarih Barı */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: '0.65rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} style={{ color: 'var(--accent-gold)' }} />
                      {new Date(entry.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>

                    {entry.plant_name && (
                      <span style={{
                        background: 'rgba(125, 155, 110, 0.18)',
                        color: 'var(--accent-green)',
                        border: '1px solid rgba(125, 155, 110, 0.3)',
                        padding: '0.15rem 0.65rem',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                      }}>
                        <Sprout size={12} />
                        {entry.plant_name}
                      </span>
                    )}
                  </div>

                  {/* Başlık */}
                  <h3 style={{ fontSize: '1.2rem', color: '#f3efe6', marginBottom: '0.5rem', lineHeight: 1.35, fontFamily: "'Lora', Georgia, serif" }}>
                    {entry.title}
                  </h3>

                  {/* Konum */}
                  {entry.location && (
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.75rem' }}>
                      <MapPin size={13} style={{ color: 'var(--accent-sage)' }} />
                      <span>{entry.location}</span>
                    </div>
                  )}

                  {/* İçerik Özeti */}
                  {entry.content && (
                    <p style={{
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.55,
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      marginBottom: '1rem'
                    }}>
                      {entry.content}
                    </p>
                  )}
                </div>

                {/* Alt Detay / Sil Butonu */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(143, 164, 134, 0.12)',
                  paddingTop: '0.75rem',
                  marginTop: '0.5rem'
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', fontWeight: 500 }}>
                    Detayları Oku &rarr;
                  </span>

                  <button
                    onClick={(e) => handleDelete(entry.id, e)}
                    title="Notu Sil"
                    style={{
                      background: 'rgba(239, 68, 68, 0.12)',
                      border: '1px solid rgba(239, 68, 68, 0.25)',
                      color: '#f87171',
                      width: 32, height: 32,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.25)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.12)'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── YENİ NOT EKLEME MODALI (GELİŞMİŞ BİTKİ ÇİZİM STÜDYOSU) ─── */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8, 14, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'rgba(20, 29, 23, 0.95)',
            border: '1px solid rgba(201, 168, 76, 0.35)',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '94vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            position: 'relative',
            animation: 'enter 0.25s ease-out'
          }}>
            {/* Modal Kapat Butonu */}
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem', right: '1.25rem',
                background: 'rgba(255,255,255,0.08)',
                border: 'none', color: '#f3efe6',
                width: 36, height: 36,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {/* Modal Başlık */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: 42, height: 42,
                borderRadius: '50%',
                background: 'rgba(201, 168, 76, 0.15)',
                color: 'var(--accent-gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <NotebookPen size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.45rem', color: '#f3efe6', margin: 0 }}>Yeni Botanik Notu</h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-tertiary)', margin: 0 }}>Saha gözlemlerinizi, fotoğrafınızı veya el çiziminizi ekleyin</p>
              </div>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* Not Başlığı */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                  Not Başlığı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Salon Monstera Sulama Gözlemleri veya Yaprak Çizimi"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(143, 164, 134, 0.25)',
                    background: 'rgba(10, 16, 12, 0.6)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Bitki Adı & Konum Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    Bitki Adı (İsteğe Bağlı)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Paşa Kılıcı"
                    value={plantName}
                    onChange={e => setPlantName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(143, 164, 134, 0.25)',
                      background: 'rgba(10, 16, 12, 0.6)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                    Konum / Mekân
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Ev / Güney Balkonu"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid rgba(143, 164, 134, 0.25)',
                      background: 'rgba(10, 16, 12, 0.6)',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {/* ─── GÖRSEL SEÇENEĞİ: FOTOĞRAF YÜKLE VEYA BİTKİNİ ÇİZ ─── */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  Görsel veya Çizim Ekle
                </label>

                {/* Sekme Değiştirici */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  background: 'rgba(10, 16, 12, 0.7)',
                  padding: '3px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(143, 164, 134, 0.2)',
                  marginBottom: '1rem'
                }}>
                  <button
                    type="button"
                    onClick={() => setInputTab('photo')}
                    style={{
                      padding: '0.55rem',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      background: inputTab === 'photo' ? 'rgba(125, 155, 110, 0.35)' : 'transparent',
                      color: inputTab === 'photo' ? '#ffffff' : 'var(--text-tertiary)',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Camera size={16} />
                    Fotoğraf Yükle
                  </button>

                  <button
                    type="button"
                    onClick={() => setInputTab('drawing')}
                    style={{
                      padding: '0.55rem',
                      border: 'none',
                      borderRadius: 'var(--radius-md)',
                      background: inputTab === 'drawing' ? 'rgba(201, 168, 76, 0.35)' : 'transparent',
                      color: inputTab === 'drawing' ? 'var(--accent-gold)' : 'var(--text-tertiary)',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Palette size={16} />
                    Gelişmiş Botanik Çizim Stüdyosu 🎨
                  </button>
                </div>

                {/* Sekme 1: Fotoğraf Yükleme */}
                {inputTab === 'photo' && (
                  <div>
                    {photoPreview ? (
                      <div style={{ position: 'relative', width: '100%', height: '180px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(201, 168, 76, 0.4)' }}>
                        <img src={photoPreview} alt="Önizleme" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <button
                          type="button"
                          onClick={() => { setPhotoFile(null); setPhotoPreview(null); }}
                          style={{
                            position: 'absolute', top: '0.5rem', right: '0.5rem',
                            background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff',
                            borderRadius: '50%', width: 30, height: 30,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1.5rem',
                        borderRadius: 'var(--radius-md)',
                        border: '1.5px dashed rgba(201, 168, 76, 0.4)',
                        background: 'rgba(10, 16, 12, 0.4)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}>
                        <Camera size={26} style={{ color: 'var(--accent-gold)', marginBottom: '0.4rem' }} />
                        <span style={{ fontSize: '0.86rem', color: '#f3efe6', fontWeight: 500 }}>Fotoğraf Seç veya Çek</span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-tertiary)' }}>JPG, PNG veya WEBP formatı</span>
                        <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                      </label>
                    )}
                  </div>
                )}

                {/* Sekme 2: GELİŞMİŞ BOTANİK ÇİZİM STÜDYOSU */}
                {inputTab === 'drawing' && (
                  <div style={{
                    background: 'rgba(10, 16, 12, 0.85)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid rgba(201, 168, 76, 0.35)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                  }}>
                    {/* ARAÇ SATIRI 1: Doku (Paper Style) & Şablon Damgaları */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', borderBottom: '1px solid rgba(143, 164, 134, 0.15)', paddingBottom: '0.6rem' }}>
                      
                      {/* Kağıt Dokusu */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.74rem', color: 'var(--accent-sage)', fontWeight: 600 }}>Doku:</span>
                        {[
                          { id: 'dark', label: 'Koyu Botanik', icon: <File size={13} /> },
                          { id: 'grid', label: 'Kareli Defter', icon: <Grid size={13} /> },
                          { id: 'parchment', label: 'Parşömen', icon: <FileText size={13} /> }
                        ].map(p => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => { setPaperStyle(p.id); initCanvas(p.id); }}
                            style={{
                              padding: '0.25rem 0.65rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid ' + (paperStyle === p.id ? 'var(--accent-gold)' : 'rgba(255,255,255,0.15)'),
                              background: paperStyle === p.id ? 'rgba(201, 168, 76, 0.25)' : 'rgba(255,255,255,0.04)',
                              color: paperStyle === p.id ? 'var(--accent-gold)' : 'var(--text-tertiary)',
                              fontSize: '0.74rem',
                              display: 'flex', alignItems: 'center', gap: '0.3rem',
                              cursor: 'pointer'
                            }}
                          >
                            {p.icon}
                            {p.label}
                          </button>
                        ))}
                      </div>

                      {/* Şablon Damgaları (Stamps) */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <span style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 600 }}>Şablon:</span>
                        <button type="button" onClick={() => addBotanicalStamp('leaf')} title="Yaprak Şablonu" style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 168, 76, 0.3)', background: 'rgba(201, 168, 76, 0.15)', color: '#82ad76', fontSize: '0.74rem', cursor: 'pointer' }}>🌿 Yaprak</button>
                        <button type="button" onClick={() => addBotanicalStamp('flower')} title="Çiçek Şablonu" style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 168, 76, 0.3)', background: 'rgba(201, 168, 76, 0.15)', color: '#c47660', fontSize: '0.74rem', cursor: 'pointer' }}>🌸 Çiçek</button>
                        <button type="button" onClick={() => addBotanicalStamp('pot')} title="Saksı Şablonu" style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 168, 76, 0.3)', background: 'rgba(201, 168, 76, 0.15)', color: '#e5c368', fontSize: '0.74rem', cursor: 'pointer' }}>🪴 Saksı</button>
                        <button type="button" onClick={() => addBotanicalStamp('stem')} title="Dal Şablonu" style={{ padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(201, 168, 76, 0.3)', background: 'rgba(201, 168, 76, 0.15)', color: '#a2ba9a', fontSize: '0.74rem', cursor: 'pointer' }}>🌳 Dal</button>
                      </div>

                    </div>

                    {/* ARAÇ SATIRI 2: Mod (Fırça, Çizgi, Daire, Dikdörtgen), Silgi, Geri Al, Temizle */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', background: 'rgba(20, 30, 24, 0.7)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
                      
                      {/* Çizim Modları */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        {[
                          { id: 'brush', label: 'Serbest', icon: <Edit3 size={13} /> },
                          { id: 'line', label: 'Çizgi', icon: <Minus size={13} /> },
                          { id: 'circle', label: 'Daire', icon: <Circle size={13} /> },
                          { id: 'rectangle', label: 'Kutu', icon: <Square size={13} /> },
                        ].map(t => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => { setToolMode(t.id); setIsEraser(false); }}
                            style={{
                              padding: '0.3rem 0.6rem',
                              borderRadius: 'var(--radius-sm)',
                              border: '1px solid ' + (!isEraser && toolMode === t.id ? 'var(--accent-green)' : 'rgba(255,255,255,0.15)'),
                              background: !isEraser && toolMode === t.id ? 'rgba(125, 155, 110, 0.3)' : 'transparent',
                              color: !isEraser && toolMode === t.id ? '#ffffff' : 'var(--text-secondary)',
                              fontSize: '0.76rem',
                              display: 'flex', alignItems: 'center', gap: '0.3rem',
                              cursor: 'pointer'
                            }}
                          >
                            {t.icon}
                            {t.label}
                          </button>
                        ))}
                      </div>

                      {/* Silgi, Geri Al & Temizle */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        
                        {/* Silgi */}
                        <button
                          type="button"
                          onClick={() => setIsEraser(prev => !prev)}
                          style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid ' + (isEraser ? '#f87171' : 'rgba(255,255,255,0.15)'),
                            background: isEraser ? 'rgba(239, 68, 68, 0.25)' : 'transparent',
                            color: isEraser ? '#fca5a5' : 'var(--text-tertiary)',
                            fontSize: '0.76rem',
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            cursor: 'pointer'
                          }}
                        >
                          <Eraser size={13} />
                          Silgi
                        </button>

                        {/* Geri Al (Undo) */}
                        <button
                          type="button"
                          onClick={handleUndo}
                          disabled={historyStack.length === 0}
                          title="Son Çizimi Geri Al"
                          style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: historyStack.length > 0 ? 'rgba(201, 168, 76, 0.15)' : 'transparent',
                            color: historyStack.length > 0 ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)',
                            fontSize: '0.76rem',
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            cursor: historyStack.length > 0 ? 'pointer' : 'default'
                          }}
                        >
                          <Undo2 size={13} />
                          Geri Al
                        </button>

                        {/* Temizle */}
                        <button
                          type="button"
                          onClick={() => initCanvas(paperStyle)}
                          title="Tuvali Temizle"
                          style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            background: 'transparent',
                            color: 'var(--text-tertiary)',
                            fontSize: '0.76rem',
                            display: 'flex', alignItems: 'center', gap: '0.3rem',
                            cursor: 'pointer'
                          }}
                        >
                          <RotateCcw size={13} />
                          Temizle
                        </button>
                      </div>

                    </div>

                    {/* ARAÇ SATIRI 3: Renk Paleti (12 Renk) & Kalınlık */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.6rem', background: 'rgba(15, 22, 17, 0.6)', padding: '0.5rem 0.8rem', borderRadius: 'var(--radius-md)' }}>
                      
                      {/* Zengin Renk Paleti */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                        {COLOR_PALETTE.map((item) => (
                          <button
                            key={item.color}
                            type="button"
                            title={item.name}
                            onClick={() => { setBrushColor(item.color); setIsEraser(false); }}
                            style={{
                              width: 22, height: 22,
                              borderRadius: '50%',
                              background: item.color,
                              border: !isEraser && brushColor === item.color ? '2px solid #ffffff' : '1px solid rgba(255,255,255,0.2)',
                              boxShadow: !isEraser && brushColor === item.color ? '0 0 8px ' + item.color : 'none',
                              cursor: 'pointer',
                              transform: !isEraser && brushColor === item.color ? 'scale(1.18)' : 'scale(1)',
                              transition: 'all 0.15s ease'
                            }}
                          />
                        ))}
                      </div>

                      {/* Kalınlık Slider */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        <span>Kalınlık:</span>
                        <input
                          type="range"
                          min="1"
                          max="24"
                          value={brushSize}
                          onChange={e => setBrushSize(Number(e.target.value))}
                          style={{ width: '70px', accentColor: 'var(--accent-gold)', cursor: 'pointer' }}
                        />
                        <span style={{ minWidth: '18px', color: '#fff', fontWeight: 600 }}>{brushSize}px</span>
                      </div>

                    </div>

                    {/* Canvas (Çizim Tuvali) */}
                    <div style={{ position: 'relative', width: '100%', height: '240px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid rgba(143, 164, 134, 0.35)', cursor: isEraser ? 'cell' : 'crosshair' }}>
                      <canvas
                        ref={canvasRef}
                        width={600}
                        height={240}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        style={{ width: '100%', height: '100%', touchAction: 'none' }}
                      />

                      {!hasDrawn && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          pointerEvents: 'none', color: paperStyle === 'parchment' ? 'rgba(50, 40, 20, 0.45)' : 'rgba(243, 239, 230, 0.35)',
                          fontSize: '0.88rem', gap: '0.4rem'
                        }}>
                          <Edit3 size={18} />
                          <span>Buraya tıklayarak veya şablon seçerek çiziminizi yapın</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Not İçeriği */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                  Botanik Notları & Gözlemler
                </label>
                <textarea
                  rows={3}
                  placeholder="Bitkinin gelişimi, yaprak durumu, toprak nemi veya gübreleme detaylarını yazın..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(143, 164, 134, 0.25)',
                    background: 'rgba(10, 16, 12, 0.6)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Etiketler */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent-sage)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                  Etiketler (Virgülle ayırın)
                </label>
                <input
                  type="text"
                  placeholder="Örn: Çizim, Bakım, Sulama, Saha Notu"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(143, 164, 134, 0.25)',
                    background: 'rgba(10, 16, 12, 0.6)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Yapay Zekâ Başarı Bildirimi */}
              {aiSuccessMsg && (
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(34, 197, 94, 0.18)',
                  border: '1px solid rgba(74, 222, 128, 0.35)',
                  color: '#bbf7d0',
                  fontSize: '0.86rem',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  <CheckCircle2 size={18} style={{ color: '#4ade80', flexShrink: 0 }} />
                  <span>{aiSuccessMsg}</span>
                </div>
              )}

              {/* Yapay Zekâ Analiz Butonu */}
              <button
                type="button"
                onClick={handleAiAnalyze}
                disabled={aiAnalyzing}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid rgba(196, 118, 201, 0.45)',
                  background: 'linear-gradient(135deg, rgba(65, 30, 60, 0.85), rgba(40, 20, 45, 0.9))',
                  color: '#f5b5f8',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(196, 118, 201, 0.25)',
                  transition: 'all 0.2s ease'
                }}
              >
                {aiAnalyzing ? (
                  <>
                    <Loader2 size={17} style={{ animation: 'spin 1s linear infinite' }} />
                    Gemini Yapay Zekâsı Notunuzu İceliyor...
                  </>
                ) : (
                  <>
                    <Sparkles size={17} />
                    Yapay Zekâ İle Notu Zenginleştir & Analiz Et
                  </>
                )}
              </button>

              {/* Kaydet Butonu */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  fontSize: '1rem',
                  marginTop: '0.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.55rem'
                }}
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Kaydediliyor...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Deftere Kaydet
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── NOT DETAY İNCELEME MODALI ─── */}
      {activeEntry && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(8, 14, 10, 0.85)',
          backdropFilter: 'blur(16px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            background: 'rgba(20, 29, 23, 0.95)',
            border: '1px solid rgba(201, 168, 76, 0.4)',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2.2rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.7)',
            position: 'relative'
          }}>
            <button
              onClick={() => setActiveEntry(null)}
              style={{
                position: 'absolute',
                top: '1.25rem', right: '1.25rem',
                background: 'rgba(255,255,255,0.08)',
                border: 'none', color: '#f3efe6',
                width: 36, height: 36,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {/* Fotoğraf veya Çizim Var İse Büyük Görsel */}
            {(activeEntry.photo_url || activeEntry.drawing_data) && (
              <div style={{ width: '100%', maxHeight: '350px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid rgba(143, 164, 134, 0.2)', position: 'relative' }}>
                <img
                  src={activeEntry.photo_url ? (activeEntry.photo_url.startsWith('/uploads') ? `${API_URL}${activeEntry.photo_url}` : activeEntry.photo_url) : activeEntry.drawing_data}
                  alt={activeEntry.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#080d09' }}
                />
                {activeEntry.drawing_data && !activeEntry.photo_url && (
                  <div style={{ position: 'absolute', bottom: '0.8rem', right: '0.8rem', background: 'rgba(201, 168, 76, 0.25)', color: 'var(--accent-gold)', border: '1px solid rgba(201, 168, 76, 0.5)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Palette size={14} /> El Çiziminiz
                  </div>
                )}
              </div>
            )}

            {/* Tarih & Rozetler */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', fontSize: '0.84rem', color: 'var(--text-tertiary)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={14} style={{ color: 'var(--accent-gold)' }} />
                {new Date(activeEntry.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>

              {activeEntry.plant_name && (
                <span style={{ background: 'rgba(125, 155, 110, 0.2)', color: 'var(--accent-green)', padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sprout size={13} />
                  {activeEntry.plant_name}
                </span>
              )}

              {activeEntry.location && (
                <span style={{ background: 'rgba(201, 168, 76, 0.15)', color: 'var(--accent-gold)', padding: '0.2rem 0.75rem', borderRadius: 'var(--radius-full)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                  <MapPin size={13} />
                  {activeEntry.location}
                </span>
              )}
            </div>

            {/* Not Başlığı */}
            <h2 style={{ fontSize: '1.7rem', color: '#f3efe6', marginBottom: '1.2rem', fontFamily: "'Lora', Georgia, serif" }}>
              {activeEntry.title}
            </h2>

            {/* Not İçeriği */}
            {activeEntry.content && (
              <div style={{
                background: 'rgba(10, 16, 12, 0.5)',
                border: '1px solid rgba(143, 164, 134, 0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '1.25rem',
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                marginBottom: '1.5rem'
              }}>
                {activeEntry.content}
              </div>
            )}

            {/* Etiketler */}
            {activeEntry.tags && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <Tag size={15} style={{ color: 'var(--accent-sage)' }} />
                {activeEntry.tags.split(',').map((tag, idx) => (
                  <span key={idx} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'var(--text-secondary)', padding: '0.2rem 0.65rem', borderRadius: 'var(--radius-sm)', fontSize: '0.78rem' }}>
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}

            {/* Kapat & Sil Butonları */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(143, 164, 134, 0.15)', paddingTop: '1rem' }}>
              <button
                onClick={(e) => handleDelete(activeEntry.id, e)}
                className="btn"
                style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)' }}
              >
                <Trash2 size={16} />
                Notu Sil
              </button>

              <button onClick={() => setActiveEntry(null)} className="btn btn-secondary">
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
