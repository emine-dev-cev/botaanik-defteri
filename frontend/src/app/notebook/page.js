"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Folder, FolderPlus, FolderOpen, ChevronRight, ChevronLeft,
  Trash2, Plus, Search, Edit3, Camera, MapPin, Sprout,
  Calendar, Tag, X, FileText, CheckCircle2, AlertTriangle, Loader2,
  Sparkles, Image as ImageIcon, BookOpen, User, Palette, Eraser,
  RotateCcw, Circle, Square, Minus, Grid, File, Undo2,
  SquarePen, UploadCloud, Download, ExternalLink, HardDrive,
  FileCode, FileSpreadsheet, Paperclip, MoreVertical, FolderInput,
  Layers, ArrowUpDown, Filter, Eye
} from 'lucide-react';

import { API_URL } from '@/lib/api';

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
  // Klasör ve Gezgin Durumu
  const [folders, setFolders] = useState([]);
  const [loadingFolders, setLoadingFolders] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState('all'); // 'all' | 'trash' | folderId

  // İçerik (Notlar ve Dosyalar) Durumu
  const [entries, setEntries] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingContent, setLoadingContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'notes' | 'files'

  // Sayaçlar
  const [trashCount, setTrashCount] = useState(0);

  // Modallar
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [creatingFolder, setCreatingFolder] = useState(false);

  // Dosya Yükleme Durumu
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadTargetFolder, setUploadTargetFolder] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState(false);

  // Öğe Taşıma Modalı (Not veya Dosya)
  const [movingItem, setMovingItem] = useState(null); // { type: 'note'|'file', item: ... }
  const [targetFolderId, setTargetFolderId] = useState('');
  const [movingProcess, setMovingProcess] = useState(false);

  // Not Ekleme Modalı
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFolderForNew, setSelectedFolderForNew] = useState('');
  const [inputTab, setInputTab] = useState('photo'); // 'photo' | 'drawing'

  // Not Form Alanları
  const [title, setTitle] = useState('');
  const [plantName, setPlantName] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  // Çizim Tuvali State'leri
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#82ad76');
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);
  const [toolMode, setToolMode] = useState('brush');
  const [paperStyle, setPaperStyle] = useState('dark');
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [canvasSnapshot, setCanvasSnapshot] = useState(null);
  const [historyStack, setHistoryStack] = useState([]);

  // AI & Not Detay
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [aiSuccessMsg, setAiSuccessMsg] = useState(null);
  const [activeEntry, setActiveEntry] = useState(null);

  // 1. Klasörleri ve Çöp Kutusunu Çek
  const fetchFolders = async () => {
    try {
      const resFolders = await fetch(`${API_URL}/api/notebook/folders`);
      if (resFolders.ok) {
        const data = await resFolders.json();
        setFolders(data);
      }
      const resTrash = await fetch(`${API_URL}/api/notebook?deleted=true`);
      if (resTrash.ok) {
        const trashData = await resTrash.json();
        setTrashCount(trashData.length);
      }
    } catch (err) {
      console.error('Klasörler yüklenirken hata:', err);
    } finally {
      setLoadingFolders(false);
    }
  };

  // 2. Seçili Klasörün Notlarını ve Dosyalarını Çek
  const fetchContent = async (folderSelection) => {
    setLoadingContent(true);
    try {
      // Notları al
      let notesUrl = `${API_URL}/api/notebook`;
      if (folderSelection === 'trash') {
        notesUrl += '?deleted=true';
      } else if (folderSelection !== 'all' && folderSelection) {
        notesUrl += `?folder_id=${folderSelection}`;
      }
      const resNotes = await fetch(notesUrl);
      if (resNotes.ok) {
        const notesData = await resNotes.json();
        setEntries(notesData);
      }

      // Dosyaları al (çöp kutusunda değilse)
      if (folderSelection !== 'trash') {
        let filesUrl = `${API_URL}/api/notebook/files`;
        if (folderSelection !== 'all' && folderSelection) {
          filesUrl += `?folder_id=${folderSelection}`;
        }
        const resFiles = await fetch(filesUrl);
        if (resFiles.ok) {
          const filesData = await resFiles.json();
          setFiles(filesData);
        }
      } else {
        setFiles([]);
      }
    } catch (err) {
      console.error('İçerik yüklenirken hata:', err);
    } finally {
      setLoadingContent(false);
    }
  };

  // İlk yüklemede klasörleri ve içeriği getir
  useEffect(() => {
    let isMounted = true;
    const init = async () => {
      setLoadingFolders(true);
      try {
        const resFolders = await fetch(`${API_URL}/api/notebook/folders`);
        if (resFolders.ok && isMounted) {
          const data = await resFolders.json();
          setFolders(data);
        }
        const resTrash = await fetch(`${API_URL}/api/notebook?deleted=true`);
        if (resTrash.ok && isMounted) {
          const trashData = await resTrash.json();
          setTrashCount(trashData.length);
        }
        // Tüm içeriği yükle
        const resNotes = await fetch(`${API_URL}/api/notebook`);
        if (resNotes.ok && isMounted) {
          setEntries(await resNotes.json());
        }
        const resFiles = await fetch(`${API_URL}/api/notebook/files`);
        if (resFiles.ok && isMounted) {
          setFiles(await resFiles.json());
        }
      } catch (err) {
        console.error('Başlangıç hatası:', err);
      } finally {
        if (isMounted) setLoadingFolders(false);
      }
    };
    init();
    return () => { isMounted = false; };
  }, []);

  // Klasör Değiştir
  const handleSelectFolder = (folderId) => {
    setSelectedFolder(folderId);
    setSearchQuery('');
    fetchContent(folderId);
  };

  // Yeni Klasör Oluştur
  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setCreatingFolder(true);
    try {
      const res = await fetch(`${API_URL}/api/notebook/folders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFolderName.trim(), color: '#e5a93c', icon: 'folder' })
      });
      if (!res.ok) throw new Error('Klasör oluşturulamadı.');
      setNewFolderName('');
      setIsFolderModalOpen(false);
      fetchFolders();
    } catch (err) {
      alert(err.message);
    } finally {
      setCreatingFolder(false);
    }
  };

  // Klasör Sil
  const handleDeleteFolder = async (folderId, folderName, e) => {
    e?.stopPropagation();
    if (!confirm(`"${folderName}" klasörünü silmek istediğinize emin misiniz? (İçindeki notlar ve dosyalar silinmez, genel arşive taşınır)`)) return;

    try {
      const res = await fetch(`${API_URL}/api/notebook/folders/${folderId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Klasör silinemedi.');
      if (selectedFolder === folderId) {
        setSelectedFolder('all');
        fetchContent('all');
      }
      fetchFolders();
    } catch (err) {
      alert(err.message);
    }
  };

  // Çoklu Dosya Yükleme (PDF, Word, Görsel, Rapor vb.)
  const handleUploadFiles = async (e) => {
    e.preventDefault();
    if (!selectedFiles || selectedFiles.length === 0) {
      alert('Lütfen en az bir dosya seçin.');
      return;
    }

    setUploadingFiles(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('files', selectedFiles[i]);
      }
      const targetFolder = uploadTargetFolder || (selectedFolder !== 'all' && selectedFolder !== 'trash' ? selectedFolder : '');
      if (targetFolder) {
        formData.append('folder_id', targetFolder);
      }

      const res = await fetch(`${API_URL}/api/notebook/files`, {
        method: 'POST',
        body: formData
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Dosya yükleme başarısız.');
      }

      setSelectedFiles([]);
      setIsUploadModalOpen(false);
      fetchFolders();
      fetchContent(selectedFolder);
    } catch (err) {
      alert(err.message || 'Dosyalar yüklenirken hata oluştu.');
    } finally {
      setUploadingFiles(false);
    }
  };

  // Dosya Silme
  const handleDeleteFile = async (fileId, e) => {
    e?.stopPropagation();
    if (!confirm('Bu dosyayı silmek istediğinizden emin misiniz?')) return;

    try {
      const res = await fetch(`${API_URL}/api/notebook/files/${fileId}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Dosya silinemedi.');
      setFiles(prev => prev.filter(f => f.id !== fileId));
      fetchFolders();
    } catch (err) {
      alert(err.message);
    }
  };

  // Not veya Dosya Taşıma
  const handleMoveSubmit = async (e) => {
    e.preventDefault();
    if (!movingItem) return;

    setMovingProcess(true);
    try {
      if (movingItem.type === 'note') {
        const res = await fetch(`${API_URL}/api/notebook/${movingItem.item.id}/move`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder_id: targetFolderId || null })
        });
        if (!res.ok) throw new Error('Not taşınamadı.');
      } else if (movingItem.type === 'file') {
        const res = await fetch(`${API_URL}/api/notebook/files/${movingItem.item.id}/move`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ folder_id: targetFolderId || null })
        });
        if (!res.ok) throw new Error('Dosya taşınamadı.');
      }

      setMovingItem(null);
      fetchFolders();
      fetchContent(selectedFolder);
    } catch (err) {
      alert(err.message);
    } finally {
      setMovingProcess(false);
    }
  };

  // Not Silme (Çöp Kutusu)
  const handleDeleteNote = async (id, e) => {
    e?.stopPropagation();
    if (!confirm('Bu notu silmek (Son Silinenler klasörüne göndermek) istiyor musunuz?')) return;

    try {
      const res = await fetch(`${API_URL}/api/notebook/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Silinemedi.');
      setEntries(prev => prev.filter(n => n.id !== id));
      if (activeEntry?.id === id) setActiveEntry(null);
      fetchFolders();
    } catch (err) {
      alert(err.message);
    }
  };

  // Not Geri Yükle
  const handleRestoreNote = async (id, e) => {
    e?.stopPropagation();
    try {
      const res = await fetch(`${API_URL}/api/notebook/${id}/restore`, { method: 'POST' });
      if (!res.ok) throw new Error('Geri yüklenemedi.');
      setEntries(prev => prev.filter(n => n.id !== id));
      fetchFolders();
      alert('Not başarıyla geri yüklendi.');
    } catch (err) {
      alert(err.message);
    }
  };

  // Not Kalıcı Sil
  const handlePermanentDeleteNote = async (id, e) => {
    e?.stopPropagation();
    if (!confirm('Bu not KALICI olarak silinecektir! Onaylıyor musunuz?')) return;

    try {
      const res = await fetch(`${API_URL}/api/notebook/${id}/permanent`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Kalıcı silme başarısız.');
      setEntries(prev => prev.filter(n => n.id !== id));
      fetchFolders();
    } catch (err) {
      alert(err.message);
    }
  };

  // Tuval Dokusu & Başlatma
  const applyPaperStyle = (ctx, width, height, style) => {
    if (style === 'parchment') {
      ctx.fillStyle = '#f4eee1';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(180, 160, 120, 0.08)';
      for (let i = 0; i < 40; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * width, Math.random() * height, Math.random() * 30 + 10, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (style === 'grid') {
      ctx.fillStyle = '#101713';
      ctx.fillRect(0, 0, width, height);
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
      ctx.fillStyle = '#121a14';
      ctx.fillRect(0, 0, width, height);
    }
  };

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

  // Çizim Geçmişi (Undo)
  const saveToHistory = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistoryStack(prev => [...prev.slice(-15), imageData]);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const newStack = [...historyStack];
    const lastState = newStack.pop();
    setHistoryStack(newStack);
    if (lastState) ctx.putImageData(lastState, 0, 0);
  };

  // Botanik Şablonlar
  const addBotanicalStamp = (type) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    saveToHistory();

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = Math.max(brushSize, 2);
    ctx.fillStyle = brushColor + '22';

    if (type === 'leaf') {
      ctx.beginPath();
      ctx.moveTo(cx, cy - 65);
      ctx.bezierCurveTo(cx + 50, cy - 30, cx + 50, cy + 30, cx, cy + 65);
      ctx.bezierCurveTo(cx - 50, cy + 30, cx - 50, cy - 30, cx, cy - 65);
      ctx.fill(); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - 65); ctx.lineTo(cx, cy + 85); ctx.stroke();
    } else if (type === 'flower') {
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5;
        const px = cx + Math.cos(angle) * 35;
        const py = cy + Math.sin(angle) * 35;
        ctx.beginPath(); ctx.arc(px, py, 22, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      }
      ctx.fillStyle = '#e5c368';
      ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    } else if (type === 'pot') {
      ctx.beginPath(); ctx.rect(cx - 55, cy - 45, 110, 20);
      ctx.moveTo(cx - 45, cy - 25); ctx.lineTo(cx - 35, cy + 55);
      ctx.lineTo(cx + 35, cy + 55); ctx.lineTo(cx + 45, cy - 25); ctx.fill(); ctx.stroke();
    } else if (type === 'stem') {
      ctx.beginPath(); ctx.moveTo(cx - 40, cy + 70); ctx.quadraticCurveTo(cx, cy, cx + 30, cy - 70); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx - 15, cy + 25, 12, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + 20, cy - 20, 12, 0, Math.PI * 2); ctx.stroke();
    }
    setHasDrawn(true);
  };

  // Çizim Olayları
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
      ctx.beginPath(); ctx.moveTo(x, y);
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
      ctx.lineTo(x, y); ctx.stroke();
    } else if (canvasSnapshot) {
      ctx.putImageData(canvasSnapshot, 0, 0);
      ctx.beginPath();
      if (toolMode === 'line') {
        ctx.moveTo(startPos.x, startPos.y); ctx.lineTo(x, y);
      } else if (toolMode === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        ctx.arc(startPos.x, startPos.y, radius, 0, Math.PI * 2); ctx.fill();
      } else if (toolMode === 'rectangle') {
        ctx.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y); ctx.fill();
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

  // Yapay Zekâ Analiz
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

      const res = await fetch(`${API_URL}/api/identify`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Analiz tamamlanamadı.');
      const resData = await res.json();
      const plantInfo = resData.data?.temel || {};
      const careInfo = resData.data?.bakim || {};

      if (plantInfo.turkish_name && !plantName) setPlantName(plantInfo.turkish_name);
      let extra = '';
      if (plantInfo.description) extra += `\n\n✨ [Yapay Zekâ Tanısı]: ${plantInfo.description}`;
      if (careInfo.light_need || careInfo.watering_need) extra += `\n💧 [Bakım]: ${careInfo.light_need || ''} | ${careInfo.watering_need || ''}`;
      setContent(prev => prev ? prev + extra : extra.trim());
      setAiSuccessMsg('Yapay zekâ analizi başarıyla tamamlandı!');
    } catch (err) {
      alert(err.message || 'Yapay zekâ analizinde hata oluştu.');
    } finally {
      setAiAnalyzing(false);
    }
  };

  // Yeni Not Ekleme
  const handleSubmitNote = async (e) => {
    e.preventDefault();
    let drawingDataUrl = null;
    if (hasDrawn && canvasRef.current) drawingDataUrl = canvasRef.current.toDataURL('image/png');

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

      const targetF = selectedFolderForNew || (selectedFolder !== 'all' && selectedFolder !== 'trash' ? selectedFolder : null);
      if (targetF) formData.append('folder_id', targetF);

      const res = await fetch(`${API_URL}/api/notebook`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Not eklenirken hata oluştu.');

      setTitle(''); setPlantName(''); setLocation(''); setContent(''); setTags('');
      setPhotoFile(null); setPhotoPreview(null); setHasDrawn(false);
      setIsModalOpen(false);

      fetchFolders();
      fetchContent(selectedFolder);
    } catch (err) {
      alert(err.message || 'Not kaydedilemedi.');
    } finally {
      setSubmitting(false);
    }
  };

  // Dosya Formatı İkonu ve Rengi Yardımcısı
  const getFileBadge = (type) => {
    switch (type) {
      case 'pdf':
        return { label: 'PDF', bg: 'rgba(239, 68, 68, 0.18)', border: 'rgba(239, 68, 68, 0.35)', color: '#f87171', icon: <FileText size={20} /> };
      case 'word':
        return { label: 'DOCX', bg: 'rgba(59, 130, 246, 0.18)', border: 'rgba(59, 130, 246, 0.35)', color: '#60a5fa', icon: <FileText size={20} /> };
      case 'excel':
        return { label: 'TABLO', bg: 'rgba(34, 197, 94, 0.18)', border: 'rgba(34, 197, 94, 0.35)', color: '#4ade80', icon: <FileSpreadsheet size={20} /> };
      case 'presentation':
        return { label: 'SUNUM', bg: 'rgba(249, 115, 22, 0.18)', border: 'rgba(249, 115, 22, 0.35)', color: '#fb923c', icon: <FileText size={20} /> };
      case 'image':
        return { label: 'GÖRSEL', bg: 'rgba(168, 85, 247, 0.18)', border: 'rgba(168, 85, 247, 0.35)', color: '#c084fc', icon: <ImageIcon size={20} /> };
      case 'archive':
        return { label: 'ARŞİV', bg: 'rgba(234, 179, 8, 0.18)', border: 'rgba(234, 179, 8, 0.35)', color: '#facc15', icon: <HardDrive size={20} /> };
      default:
        return { label: 'DOSYA', bg: 'rgba(148, 163, 184, 0.18)', border: 'rgba(148, 163, 184, 0.35)', color: '#cbd5e1', icon: <File size={20} /> };
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Bilinmiyor';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // Filtrelemeler
  const filteredNotes = entries.filter(item => {
    const q = searchQuery.toLowerCase();
    return (
      (item.title && item.title.toLowerCase().includes(q)) ||
      (item.plant_name && item.plant_name.toLowerCase().includes(q)) ||
      (item.content && item.content.toLowerCase().includes(q)) ||
      (item.location && item.location.toLowerCase().includes(q)) ||
      (item.tags && item.tags.toLowerCase().includes(q))
    );
  });

  const filteredFiles = files.filter(item => {
    const q = searchQuery.toLowerCase();
    return item.name && item.name.toLowerCase().includes(q);
  });

  // Seçili Klasörün Bilgisi
  const currentFolderObj = folders.find(f => f.id === selectedFolder);
  const currentFolderName = selectedFolder === 'all'
    ? 'Tüm Notlar'
    : selectedFolder === 'trash'
    ? 'Çöp Kutusu'
    : currentFolderObj?.name || 'Klasör';

  return (
    <div className="animate-enter" style={{ paddingTop: '1.2rem', paddingBottom: '5rem', width: '100%', maxWidth: '1440px', margin: '0 auto' }}>
      
      {/* ─── ÜST HEADER & AKSİYON BARI ─── */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        marginBottom: '1.5rem',
        padding: '1.25rem 1.6rem',
        background: 'linear-gradient(135deg, rgba(20, 28, 23, 0.9), rgba(12, 18, 14, 0.95))',
        border: '1px solid rgba(201, 168, 76, 0.25)',
        borderRadius: '20px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', color: '#e5c368', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
            <FolderOpen size={16} />
            <span>Botanik Arşivi</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#ffffff', margin: 0, fontWeight: 700, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            Not Defteri
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.55)', fontSize: '0.88rem', margin: '0.2rem 0 0' }}>
            Bitki notlarınızı, arazi fotoğraflarınızı, çizimlerinizi ve ders belgelerinizi klasörlerde düzenleyin.
          </p>
        </div>

        {/* Aksiyon Butonları */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Yeni Klasör */}
          <button
            onClick={() => setIsFolderModalOpen(true)}
            style={{
              padding: '0.65rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid rgba(229, 169, 60, 0.35)',
              background: 'rgba(229, 169, 60, 0.12)',
              color: '#e5c368',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <FolderPlus size={17} />
            <span>Yeni Klasör</span>
          </button>

          {/* Dosya Yükle */}
          <button
            onClick={() => {
              setUploadTargetFolder(selectedFolder !== 'all' && selectedFolder !== 'trash' ? selectedFolder : (folders[0]?.id || ''));
              setIsUploadModalOpen(true);
            }}
            style={{
              padding: '0.65rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid rgba(130, 173, 118, 0.4)',
              background: 'rgba(130, 173, 118, 0.18)',
              color: '#a3d198',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <UploadCloud size={17} />
            <span>Dosya Yükle</span>
          </button>

          {/* Yeni Not Ekle */}
          <button
            onClick={() => {
              setSelectedFolderForNew(selectedFolder !== 'all' && selectedFolder !== 'trash' ? selectedFolder : (folders[0]?.id || ''));
              setIsModalOpen(true);
            }}
            style={{
              padding: '0.65rem 1.3rem',
              borderRadius: '12px',
              border: 'none',
              background: '#e5a93c',
              color: '#000000',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              boxShadow: '0 4px 18px rgba(229, 169, 60, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            <Plus size={17} />
            <span>Yeni Not</span>
          </button>
        </div>
      </div>

      {/* ─── ANA DÜZEN: SOL KLASÖRLER + SAĞ İÇERİK GEZGİNİ ─── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(260px, 310px) 1fr',
        gap: '1.5rem',
        alignItems: 'start'
      }}>

        {/* ─── SOL SÜTUN: KLASÖRLER LİSTESİ (APPLE/FINDER STİLİ) ─── */}
        <div style={{
          background: 'rgba(18, 26, 21, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '1.25rem 1rem',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          position: 'sticky',
          top: '1rem'
        }}>
          {/* Başlık */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 0.5rem 0.8rem 0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '0.8rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#e5c368', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Klasörlerim
            </span>
            <button
              onClick={() => setIsFolderModalOpen(true)}
              title="Yeni Klasör Ekle"
              style={{ background: 'transparent', border: 'none', color: '#e5c368', cursor: 'pointer', padding: 0 }}
            >
              <FolderPlus size={17} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {/* TÜMÜ (GENEL ARŞİV) */}
            <div
              onClick={() => handleSelectFolder('all')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.7rem 0.9rem',
                borderRadius: '12px',
                background: selectedFolder === 'all' ? 'rgba(229, 169, 60, 0.18)' : 'transparent',
                border: selectedFolder === 'all' ? '1px solid rgba(229, 169, 60, 0.4)' : '1px solid transparent',
                color: selectedFolder === 'all' ? '#e5c368' : '#ffffff',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { if (selectedFolder !== 'all') e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (selectedFolder !== 'all') e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Layers size={19} color="#e5c368" />
                <span style={{ fontSize: '0.92rem', fontWeight: selectedFolder === 'all' ? 600 : 400 }}>Tüm Arşiv</span>
              </div>
              <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.45)', background: 'rgba(255,255,255,0.06)', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                {entries.length + files.length}
              </span>
            </div>

            {/* DİNAMİK KLASÖRLER (Notlar, Mesleki Uygulama Ödevi, Ödev vb.) */}
            {loadingFolders ? (
              <div style={{ padding: '1rem', textAlign: 'center', color: '#e5c368' }}>
                <Loader2 size={20} style={{ animation: 'spin 1s linear infinite', margin: '0 auto' }} />
              </div>
            ) : (
              folders.map((f) => {
                const isSelected = selectedFolder === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => handleSelectFolder(f.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.7rem 0.9rem',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(229, 169, 60, 0.18)' : 'transparent',
                      border: isSelected ? '1px solid rgba(229, 169, 60, 0.4)' : '1px solid transparent',
                      color: isSelected ? '#e5c368' : '#ffffff',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
                    onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                      <Folder size={19} fill="#e5a93c" color="#e5a93c" style={{ flexShrink: 0 }} />
                      <span style={{ fontSize: '0.92rem', fontWeight: isSelected ? 600 : 400, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {f.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexShrink: 0 }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', background: 'rgba(255,255,255,0.06)', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                        {(f.entry_count || 0) + (f.file_count || 0)}
                      </span>

                      {!f.is_system && (
                        <button
                          onClick={(e) => handleDeleteFolder(f.id, f.name, e)}
                          title="Klasörü Sil"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'rgba(239, 68, 68, 0.6)',
                            padding: '0.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                          onMouseLeave={e => e.currentTarget.style.color = 'rgba(239, 68, 68, 0.6)'}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}

            {/* ÇÖP KUTUSU (SON SİLİNENLER) */}
            <div
              onClick={() => handleSelectFolder('trash')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.7rem 0.9rem',
                borderRadius: '12px',
                marginTop: '0.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                background: selectedFolder === 'trash' ? 'rgba(239, 68, 68, 0.18)' : 'transparent',
                border: selectedFolder === 'trash' ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid transparent',
                color: selectedFolder === 'trash' ? '#f87171' : 'rgba(255, 255, 255, 0.75)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={e => { if (selectedFolder !== 'trash') e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
              onMouseLeave={e => { if (selectedFolder !== 'trash') e.currentTarget.style.background = 'transparent'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Trash2 size={18} color={selectedFolder === 'trash' ? '#f87171' : '#e5a93c'} />
                <span style={{ fontSize: '0.92rem' }}>Son Silinenler</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#f87171', background: 'rgba(239, 68, 68, 0.15)', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
                {trashCount}
              </span>
            </div>

          </div>
        </div>

        {/* ─── SAĞ SÜTUN: SEÇİLİ KLASÖRÜN İÇERİĞİ (NOTLAR & DOSYALAR) ─── */}
        <div style={{
          background: 'rgba(18, 26, 21, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '1.5rem',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          minHeight: '70vh'
        }}>
          
          {/* KLASÖR BAŞLIĞI, ARAMA & SEKMELER */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            marginBottom: '1.5rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Folder size={24} fill="#e5a93c" color="#e5a93c" />
                <h2 style={{ fontSize: '1.55rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                  {currentFolderName}
                </h2>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.86rem', margin: '0.25rem 0 0' }}>
                {selectedFolder === 'trash'
                  ? 'Silinen notlar burada saklanır. İstediğinizde geri yükleyebilir veya kalıcı silebilirsiniz.'
                  : `${filteredNotes.length} Not • ${filteredFiles.length} Dosya`}
              </p>
            </div>

            {/* Arama ve Filtreleme */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', minWidth: '220px' }}>
                <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255, 255, 255, 0.4)' }} />
                <input
                  type="text"
                  placeholder="Ara..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.85rem 0.55rem 2.4rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: '#121814',
                    color: '#ffffff',
                    fontSize: '0.86rem',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Sekmeler (Tümü / Notlar / Dosyalar) */}
              {selectedFolder !== 'trash' && (
                <div style={{ display: 'flex', background: '#121814', padding: '3px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <button
                    onClick={() => setActiveTab('all')}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: activeTab === 'all' ? '#e5a93c' : 'transparent',
                      color: activeTab === 'all' ? '#000000' : 'rgba(255, 255, 255, 0.65)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Tümü ({filteredNotes.length + filteredFiles.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('notes')}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: activeTab === 'notes' ? '#e5a93c' : 'transparent',
                      color: activeTab === 'notes' ? '#000000' : 'rgba(255, 255, 255, 0.65)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Notlar ({filteredNotes.length})
                  </button>

                  <button
                    onClick={() => setActiveTab('files')}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      border: 'none',
                      background: activeTab === 'files' ? '#e5a93c' : 'transparent',
                      color: activeTab === 'files' ? '#000000' : 'rgba(255, 255, 255, 0.65)',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Dosyalar ({filteredFiles.length})
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* HIZLI DOSYA YÜKLEME SÜRÜKLE-BIRAK ALANI (Sadece aktif klasörlerde) */}
          {selectedFolder !== 'trash' && (activeTab === 'all' || activeTab === 'files') && (
            <div
              onClick={() => {
                setUploadTargetFolder(selectedFolder !== 'all' ? selectedFolder : (folders[0]?.id || ''));
                setIsUploadModalOpen(true);
              }}
              style={{
                border: '1.5px dashed rgba(229, 169, 60, 0.35)',
                borderRadius: '14px',
                padding: '1.1rem',
                textAlign: 'center',
                background: 'rgba(229, 169, 60, 0.04)',
                marginBottom: '1.6rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e5a93c'; e.currentTarget.style.background = 'rgba(229, 169, 60, 0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(229, 169, 60, 0.35)'; e.currentTarget.style.background = 'rgba(229, 169, 60, 0.04)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.65rem' }}>
                <UploadCloud size={22} style={{ color: '#e5a93c' }} />
                <span style={{ fontSize: '0.92rem', color: '#ffffff', fontWeight: 500 }}>
                  Bu klasöre dosya ekleyin (PDF, Word, Görsel)
                </span>
                <span style={{ fontSize: '0.8rem', color: '#e5a93c', textDecoration: 'underline' }}>
                  Dosya Seçin
                </span>
              </div>
            </div>
          )}

          {/* YÜKLENİYOR DURUMU */}
          {loadingContent ? (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: '#e5a93c' }}>
              <Loader2 size={36} style={{ animation: 'spin 1.2s linear infinite', margin: '0 auto 0.75rem' }} />
              <div>İçerikler yükleniyor...</div>
            </div>
          ) : (
            <div>
              
              {/* ─── 1. BÖLÜM: YÜKLENEN DOSYALAR (PDF, WORD, EXCEL VB.) ─── */}
              {selectedFolder !== 'trash' && (activeTab === 'all' || activeTab === 'files') && filteredFiles.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
                    <Paperclip size={18} style={{ color: '#e5a93c' }} />
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0, fontWeight: 600 }}>
                      Dosyalar ({filteredFiles.length})
                    </h3>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1rem'
                  }}>
                    {filteredFiles.map((file) => {
                      const badge = getFileBadge(file.file_type);
                      const fullUrl = file.file_url.startsWith('http') ? file.file_url : `${API_URL}${file.file_url}`;
                      return (
                        <div
                          key={file.id}
                          style={{
                            background: '#151d18',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '14px',
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '0.75rem',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.25)'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(229, 169, 60, 0.4)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                        >
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                            <div style={{
                              width: 40, height: 40,
                              borderRadius: '10px',
                              background: badge.bg,
                              border: `1px solid ${badge.border}`,
                              color: badge.color,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              {badge.icon}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <h4 style={{
                                fontSize: '0.9rem',
                                color: '#ffffff',
                                margin: '0 0 0.25rem 0',
                                fontWeight: 600,
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                              }} title={file.name}>
                                {file.name}
                              </h4>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.45)' }}>
                                <span style={{ color: badge.color, fontWeight: 600 }}>{badge.label}</span>
                                <span>•</span>
                                <span>{formatFileSize(file.file_size)}</span>
                                <span>•</span>
                                <span>{new Date(file.created_at).toLocaleDateString('tr-TR')}</span>
                              </div>
                            </div>
                          </div>

                          {/* Dosya Aksiyonları */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '0.65rem' }}>
                            <a
                              href={fullUrl}
                              target="_blank"
                              rel="noreferrer"
                              download={file.name}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                color: '#e5a93c',
                                fontSize: '0.78rem',
                                fontWeight: 500,
                                textDecoration: 'none'
                              }}
                            >
                              <Download size={14} />
                              İndir
                            </a>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <button
                                onClick={() => {
                                  setMovingItem({ type: 'file', item: file });
                                  setTargetFolderId(file.folder_id || '');
                                }}
                                title="Klasöre Taşı"
                                style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0.2rem' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#e5a93c'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                              >
                                <FolderInput size={15} />
                              </button>

                              <button
                                onClick={(e) => handleDeleteFile(file.id, e)}
                                title="Sil"
                                style={{ background: 'transparent', border: 'none', color: 'rgba(239, 68, 68, 0.6)', cursor: 'pointer', padding: '0.2rem' }}
                                onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                                onMouseLeave={e => e.currentTarget.style.color = 'rgba(239, 68, 68, 0.6)'}
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ─── 2. BÖLÜM: NOTLAR ─── */}
              {(activeTab === 'all' || activeTab === 'notes' || selectedFolder === 'trash') && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
                    <Edit3 size={18} style={{ color: '#82ad76' }} />
                    <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0, fontWeight: 600 }}>
                      Notlar ({filteredNotes.length})
                    </h3>
                  </div>

                  {filteredNotes.length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '3rem 1.5rem',
                      background: '#151d18',
                      borderRadius: '16px',
                      border: '1px dashed rgba(255, 255, 255, 0.12)',
                      color: 'rgba(255, 255, 255, 0.5)'
                    }}>
                      <div style={{ fontSize: '0.92rem', marginBottom: '0.75rem' }}>
                        {searchQuery ? 'Aramanızla eşleşen not bulunamadı.' : 'Bu klasörde henüz yazılmış bir not bulunmuyor.'}
                      </div>
                      {!searchQuery && selectedFolder !== 'trash' && (
                        <button
                          onClick={() => {
                            setSelectedFolderForNew(selectedFolder !== 'all' ? selectedFolder : (folders[0]?.id || ''));
                            setIsModalOpen(true);
                          }}
                          style={{
                            padding: '0.55rem 1.2rem',
                            borderRadius: '10px',
                            border: 'none',
                            background: '#e5a93c',
                            color: '#000000',
                            fontWeight: 600,
                            fontSize: '0.86rem',
                            cursor: 'pointer'
                          }}
                        >
                          + Not Ekle
                        </button>
                      )}
                    </div>
                  ) : (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                      gap: '1.25rem'
                    }}>
                      {filteredNotes.map((entry) => (
                        <div
                          key={entry.id}
                          onClick={() => setActiveEntry(entry)}
                          style={{
                            background: '#151d18',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.45)'; }}
                          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; }}
                        >
                          {/* Fotoğraf veya Çizim Önizleme */}
                          {(entry.photo_url || entry.drawing_data) && (
                            <div style={{ width: '100%', height: '170px', overflow: 'hidden', position: 'relative', background: '#0e1410' }}>
                              <img
                                src={entry.photo_url ? (entry.photo_url.startsWith('/uploads') ? `${API_URL}${entry.photo_url}` : entry.photo_url) : entry.drawing_data}
                                alt={entry.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              {entry.drawing_data && !entry.photo_url && (
                                <div style={{
                                  position: 'absolute', top: '0.5rem', right: '0.5rem',
                                  background: 'rgba(229, 169, 60, 0.3)', backdropFilter: 'blur(8px)',
                                  border: '1px solid rgba(229, 169, 60, 0.5)', color: '#e5a93c',
                                  fontSize: '0.72rem', fontWeight: 600, padding: '0.15rem 0.55rem', borderRadius: '15px',
                                  display: 'flex', alignItems: 'center', gap: '0.3rem'
                                }}>
                                  <Palette size={12} /> El Çizimi
                                </div>
                              )}
                              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(21, 29, 24, 0.95) 0%, transparent 60%)' }} />
                            </div>
                          )}

                          <div style={{ padding: '1.1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '0.45rem' }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                                  <Calendar size={13} style={{ color: '#e5a93c' }} />
                                  {new Date(entry.created_at).toLocaleDateString('tr-TR')}
                                </span>
                                {entry.plant_name && (
                                  <span style={{ background: 'rgba(125, 155, 110, 0.18)', color: '#82ad76', padding: '0.15rem 0.55rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.72rem' }}>
                                    {entry.plant_name}
                                  </span>
                                )}
                              </div>

                              <h4 style={{ fontSize: '1.1rem', color: '#ffffff', margin: '0 0 0.4rem 0', fontWeight: 600 }}>
                                {entry.title}
                              </h4>

                              {entry.location && (
                                <div style={{ fontSize: '0.76rem', color: 'rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.5rem' }}>
                                  <MapPin size={12} style={{ color: '#82ad76' }} />
                                  <span>{entry.location}</span>
                                </div>
                              )}

                              {entry.content && (
                                <p style={{
                                  fontSize: '0.84rem',
                                  color: 'rgba(255, 255, 255, 0.7)',
                                  lineHeight: 1.5,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 3,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                  margin: '0 0 0.75rem 0'
                                }}>
                                  {entry.content}
                                </p>
                              )}
                            </div>

                            {/* Kart Aksiyonları */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255, 255, 255, 0.07)', paddingTop: '0.65rem' }}>
                              <span style={{ fontSize: '0.76rem', color: '#e5a93c', fontWeight: 500 }}>
                                İncele &rarr;
                              </span>

                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                {selectedFolder !== 'trash' && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setMovingItem({ type: 'note', item: entry });
                                      setTargetFolderId(entry.folder_id || '');
                                    }}
                                    title="Taşı"
                                    style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', padding: '0.2rem' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#e5a93c'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                                  >
                                    <FolderInput size={15} />
                                  </button>
                                )}

                                {selectedFolder === 'trash' ? (
                                  <>
                                    <button
                                      onClick={(e) => handleRestoreNote(entry.id, e)}
                                      title="Geri Yükle"
                                      style={{ background: 'rgba(34, 197, 94, 0.2)', border: 'none', color: '#4ade80', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer' }}
                                    >
                                      Geri Yükle
                                    </button>
                                    <button
                                      onClick={(e) => handlePermanentDeleteNote(entry.id, e)}
                                      title="Kalıcı Sil"
                                      style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', color: '#f87171', padding: '0.2rem 0.5rem', borderRadius: '6px', fontSize: '0.72rem', cursor: 'pointer' }}
                                    >
                                      Kalıcı Sil
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={(e) => handleDeleteNote(entry.id, e)}
                                    title="Sil"
                                    style={{ background: 'transparent', border: 'none', color: 'rgba(239, 68, 68, 0.6)', cursor: 'pointer', padding: '0.2rem' }}
                                    onMouseEnter={e => e.currentTarget.style.color = '#f87171'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(239, 68, 68, 0.6)'}
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      {/* ─── MODAL 1: YENİ KLASÖR OLUŞTURMA MODALI ─── */}
      {isFolderModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#1c241e', border: '1px solid rgba(229, 169, 60, 0.35)', borderRadius: '20px', width: '100%', maxWidth: '380px', padding: '1.8rem', boxShadow: '0 25px 60px rgba(0,0,0,0.85)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(229, 169, 60, 0.15)', color: '#e5a93c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                <FolderPlus size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Yeni Klasör Oluştur</h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.55)', margin: '0.25rem 0 0' }}>Örn: Mesleki Uygulama Ödevi, Saha Notları</p>
            </div>
            <form onSubmit={handleCreateFolder}>
              <input
                type="text"
                required
                autoFocus
                placeholder="Klasör Adı..."
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: '#121814', color: '#ffffff', fontSize: '0.95rem', outline: 'none', marginBottom: '1.2rem' }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button type="button" onClick={() => setIsFolderModalOpen(false)} style={{ padding: '0.7rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#ffffff', cursor: 'pointer' }}>Vazgeç</button>
                <button type="submit" disabled={creatingFolder || !newFolderName.trim()} style={{ padding: '0.7rem', borderRadius: '10px', border: 'none', background: '#e5a93c', color: '#000000', fontWeight: 600, cursor: 'pointer' }}>{creatingFolder ? 'Kaydediliyor...' : 'Oluştur'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: DOSYA YÜKLEME MODALI (PDF, WORD, EXCEL, GÖRSEL VB.) ─── */}
      {isUploadModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#1c241e', border: '1px solid rgba(130, 173, 118, 0.4)', borderRadius: '20px', width: '100%', maxWidth: '480px', padding: '1.8rem', boxShadow: '0 25px 60px rgba(0,0,0,0.85)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <div style={{ width: 50, height: 50, borderRadius: '50%', background: 'rgba(130, 173, 118, 0.2)', color: '#82ad76', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                <UploadCloud size={26} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Klasöre Dosya Yükle</h3>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.55)', margin: '0.25rem 0 0' }}>PDF, Word (.docx), Excel, Rapor, Sunum veya Görseller</p>
            </div>

            <form onSubmit={handleUploadFiles} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#e5c368', marginBottom: '0.35rem' }}>Hedef Klasör</label>
                <select
                  value={uploadTargetFolder}
                  onChange={e => setUploadTargetFolder(e.target.value)}
                  style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: '#121814', color: '#ffffff', outline: 'none' }}
                >
                  <option value="">Genel (Klasörsüz)</option>
                  {folders.map(f => (
                    <option key={f.id} value={f.id}>📁 {f.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#82ad76', marginBottom: '0.35rem' }}>Dosya Seçin (Çoklu Seçilebilir)</label>
                <input
                  type="file"
                  multiple
                  required
                  onChange={e => setSelectedFiles(e.target.files)}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: '1.5px dashed rgba(130, 173, 118, 0.4)', background: '#121814', color: '#ffffff', cursor: 'pointer' }}
                />
                {selectedFiles && selectedFiles.length > 0 && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: '#a3d198' }}>
                    {selectedFiles.length} dosya seçildi.
                  </div>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsUploadModalOpen(false)} style={{ padding: '0.7rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#ffffff', cursor: 'pointer' }}>Vazgeç</button>
                <button type="submit" disabled={uploadingFiles || !selectedFiles || selectedFiles.length === 0} style={{ padding: '0.7rem', borderRadius: '10px', border: 'none', background: '#82ad76', color: '#000000', fontWeight: 600, cursor: 'pointer' }}>{uploadingFiles ? 'Yükleniyor...' : 'Yükle'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: ÖĞE TAŞIMA MODALI (NOT VEYA DOSYA) ─── */}
      {movingItem && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#1c241e', border: '1px solid rgba(229, 169, 60, 0.35)', borderRadius: '20px', width: '100%', maxWidth: '380px', padding: '1.8rem', boxShadow: '0 25px 60px rgba(0,0,0,0.85)' }}>
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(229, 169, 60, 0.15)', color: '#e5a93c', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
                <FolderInput size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>
                {movingItem.type === 'file' ? 'Dosyayı Taşı' : 'Notu Taşı'}
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.55)', margin: '0.25rem 0 0' }}>
                &ldquo;{movingItem.item.name || movingItem.item.title}&rdquo; hangi klasöre taşınsın?
              </p>
            </div>

            <form onSubmit={handleMoveSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', marginBottom: '1.2rem' }}>
                {folders.map(f => (
                  <label
                    key={f.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.65rem 0.9rem',
                      borderRadius: '10px',
                      background: targetFolderId === f.id ? 'rgba(229, 169, 60, 0.2)' : '#121814',
                      border: targetFolderId === f.id ? '1px solid #e5a93c' : '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer'
                    }}
                  >
                    <input type="radio" name="targetFolder" value={f.id} checked={targetFolderId === f.id} onChange={() => setTargetFolderId(f.id)} />
                    <Folder size={18} fill="#e5a93c" color="#e5a93c" />
                    <span style={{ fontSize: '0.9rem', color: '#ffffff' }}>{f.name}</span>
                  </label>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <button type="button" onClick={() => setMovingItem(null)} style={{ padding: '0.7rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: '#ffffff', cursor: 'pointer' }}>Vazgeç</button>
                <button type="submit" disabled={movingProcess} style={{ padding: '0.7rem', borderRadius: '10px', border: 'none', background: '#e5a93c', color: '#000000', fontWeight: 600, cursor: 'pointer' }}>{movingProcess ? 'Taşınıyor...' : 'Taşı'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 4: YENİ NOT EKLEME MODALI (ÇİZİM STÜDYOSU & FOTOĞRAF) ─── */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#1c241e', border: '1px solid rgba(229, 169, 60, 0.35)', borderRadius: '24px', width: '100%', maxWidth: '680px', maxHeight: '94vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.85)', position: 'relative' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={20} /></button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.4rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(229, 169, 60, 0.15)', color: '#e5a93c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SquarePen size={22} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', color: '#ffffff', margin: 0, fontWeight: 700 }}>Yeni Botanik Notu</h2>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.55)', margin: 0 }}>Gözleminizi, arazi çiziminizi veya fotoğrafınızı ekleyin</p>
              </div>
            </div>

            <form onSubmit={handleSubmitNote} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#e5c368', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Klasör Seçin</label>
                <select value={selectedFolderForNew} onChange={e => setSelectedFolderForNew(e.target.value)} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: '#121814', color: '#ffffff', outline: 'none' }}>
                  <option value="">Genel (Klasörsüz)</option>
                  {folders.map(f => (<option key={f.id} value={f.id}>📁 {f.name}</option>))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#82ad76', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Not Başlığı *</label>
                <input type="text" required placeholder="Örn: Paşa Kılıcı Sulama Gözlemleri" value={title} onChange={e => setTitle(e.target.value)} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: '#121814', color: '#ffffff', outline: 'none' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#82ad76', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Bitki Adı (Opsiyonel)</label>
                  <input type="text" placeholder="Örn: Monstera Deliciosa" value={plantName} onChange={e => setPlantName(e.target.value)} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: '#121814', color: '#ffffff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#82ad76', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Konum</label>
                  <input type="text" placeholder="Örn: Kampüs Botanik Bahçesi" value={location} onChange={e => setLocation(e.target.value)} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: '#121814', color: '#ffffff', outline: 'none' }} />
                </div>
              </div>

              {/* Görsel Sekmeleri (Fotoğraf / Çizim) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#82ad76', textTransform: 'uppercase', marginBottom: '0.45rem' }}>Görsel</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#121814', padding: '3px', borderRadius: '10px', marginBottom: '0.8rem' }}>
                  <button type="button" onClick={() => setInputTab('photo')} style={{ padding: '0.5rem', border: 'none', borderRadius: '8px', background: inputTab === 'photo' ? 'rgba(125,155,110,0.35)' : 'transparent', color: inputTab === 'photo' ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}><Camera size={15} /> Fotoğraf Yükle</button>
                  <button type="button" onClick={() => setInputTab('drawing')} style={{ padding: '0.5rem', border: 'none', borderRadius: '8px', background: inputTab === 'drawing' ? 'rgba(229,169,60,0.35)' : 'transparent', color: inputTab === 'drawing' ? '#e5a93c' : 'rgba(255,255,255,0.5)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}><Palette size={15} /> Çizim Stüdyosu 🎨</button>
                </div>

                {inputTab === 'photo' && (
                  photoPreview ? (
                    <div style={{ position: 'relative', width: '100%', height: '170px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(229, 169, 60, 0.4)' }}>
                      <img src={photoPreview} alt="Önizleme" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <button type="button" onClick={() => { setPhotoFile(null); setPhotoPreview(null); }} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.7)', border: 'none', color: '#fff', borderRadius: '50%', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={15} /></button>
                    </div>
                  ) : (
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.4rem', borderRadius: '10px', border: '1.5px dashed rgba(229, 169, 60, 0.4)', background: '#121814', cursor: 'pointer' }}>
                      <Camera size={24} style={{ color: '#e5a93c', marginBottom: '0.35rem' }} />
                      <span style={{ fontSize: '0.84rem', color: '#ffffff' }}>Fotoğraf Seçin</span>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                    </label>
                  )
                )}

                {inputTab === 'drawing' && (
                  <div style={{ background: '#0e1410', borderRadius: '14px', border: '1px solid rgba(229, 169, 60, 0.3)', padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#82ad76', fontWeight: 600 }}>Doku:</span>
                        {[{ id: 'dark', label: 'Koyu' }, { id: 'grid', label: 'Kareli' }, { id: 'parchment', label: 'Parşömen' }].map(p => (
                          <button key={p.id} type="button" onClick={() => { setPaperStyle(p.id); initCanvas(p.id); }} style={{ padding: '0.2rem 0.5rem', borderRadius: '6px', border: '1px solid ' + (paperStyle === p.id ? '#e5a93c' : 'rgba(255,255,255,0.15)'), background: paperStyle === p.id ? 'rgba(229,169,60,0.25)' : 'transparent', color: paperStyle === p.id ? '#e5a93c' : 'rgba(255,255,255,0.5)', fontSize: '0.72rem', cursor: 'pointer' }}>{p.label}</button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ fontSize: '0.72rem', color: '#e5a93c', fontWeight: 600 }}>Şablon:</span>
                        <button type="button" onClick={() => addBotanicalStamp('leaf')} style={{ padding: '0.2rem 0.4rem', borderRadius: '6px', border: '1px solid rgba(229,169,60,0.3)', background: 'rgba(229,169,60,0.15)', color: '#82ad76', fontSize: '0.7rem', cursor: 'pointer' }}>🌿 Yaprak</button>
                        <button type="button" onClick={() => addBotanicalStamp('flower')} style={{ padding: '0.2rem 0.4rem', borderRadius: '6px', border: '1px solid rgba(229,169,60,0.3)', background: 'rgba(229,169,60,0.15)', color: '#c47660', fontSize: '0.7rem', cursor: 'pointer' }}>🌸 Çiçek</button>
                        <button type="button" onClick={() => addBotanicalStamp('pot')} style={{ padding: '0.2rem 0.4rem', borderRadius: '6px', border: '1px solid rgba(229,169,60,0.3)', background: 'rgba(229,169,60,0.15)', color: '#e5c368', fontSize: '0.7rem', cursor: 'pointer' }}>🪴 Saksı</button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', background: '#151d18', padding: '0.4rem 0.6rem', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        {[{ id: 'brush', label: 'Fırça' }, { id: 'line', label: 'Çizgi' }, { id: 'circle', label: 'Daire' }, { id: 'rectangle', label: 'Kutu' }].map(t => (
                          <button key={t.id} type="button" onClick={() => { setToolMode(t.id); setIsEraser(false); }} style={{ padding: '0.25rem 0.5rem', borderRadius: '5px', border: '1px solid ' + (!isEraser && toolMode === t.id ? '#82ad76' : 'rgba(255,255,255,0.12)'), background: !isEraser && toolMode === t.id ? 'rgba(130,173,118,0.3)' : 'transparent', color: !isEraser && toolMode === t.id ? '#fff' : 'rgba(255,255,255,0.6)', fontSize: '0.72rem', cursor: 'pointer' }}>{t.label}</button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button type="button" onClick={() => setIsEraser(prev => !prev)} style={{ padding: '0.25rem 0.5rem', borderRadius: '5px', border: '1px solid ' + (isEraser ? '#f87171' : 'rgba(255,255,255,0.12)'), background: isEraser ? 'rgba(239,68,68,0.25)' : 'transparent', color: isEraser ? '#fca5a5' : 'rgba(255,255,255,0.5)', fontSize: '0.72rem', cursor: 'pointer' }}>Silgi</button>
                        <button type="button" onClick={handleUndo} disabled={historyStack.length === 0} style={{ padding: '0.25rem 0.5rem', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: historyStack.length > 0 ? '#e5a93c' : 'rgba(255,255,255,0.2)', fontSize: '0.72rem', cursor: 'pointer' }}>Geri Al</button>
                        <button type="button" onClick={() => initCanvas(paperStyle)} style={{ padding: '0.25rem 0.5rem', borderRadius: '5px', border: '1px solid rgba(255,255,255,0.12)', background: 'transparent', color: 'rgba(255,255,255,0.5)', fontSize: '0.72rem', cursor: 'pointer' }}>Temizle</button>
                      </div>
                    </div>

                    {/* Renkler & Kalınlık */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', background: '#151d18', padding: '0.4rem 0.6rem', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {COLOR_PALETTE.map(c => (
                          <button key={c.color} type="button" onClick={() => { setBrushColor(c.color); setIsEraser(false); }} style={{ width: 18, height: 18, borderRadius: '50%', background: c.color, border: brushColor === c.color && !isEraser ? '2px solid #fff' : '1px solid rgba(255,255,255,0.2)', cursor: 'pointer' }} />
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)' }}>
                        <span>{brushSize}px</span>
                        <input type="range" min="1" max="24" value={brushSize} onChange={e => setBrushSize(Number(e.target.value))} style={{ width: '60px', accentColor: '#e5a93c' }} />
                      </div>
                    </div>

                    <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: '10px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.15)', cursor: isEraser ? 'cell' : 'crosshair' }}>
                      <canvas ref={canvasRef} width={600} height={220} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} style={{ width: '100%', height: '100%', touchAction: 'none' }} />
                      {!hasDrawn && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.84rem' }}>Çizim için dokunun veya şablon seçin</div>}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#82ad76', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Gözlem Notları</label>
                <textarea rows={3} placeholder="Bitkinin gelişimi, toprak nemi, sulama veya bakım detayları..." value={content} onChange={e => setContent(e.target.value)} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: '#121814', color: '#ffffff', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#82ad76', textTransform: 'uppercase', marginBottom: '0.35rem' }}>Etiketler (Virgülle)</label>
                <input type="text" placeholder="Örn: Arazi, Sulama, Çiçek, Ödev" value={tags} onChange={e => setTags(e.target.value)} style={{ width: '100%', padding: '0.7rem 1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', background: '#121814', color: '#ffffff', outline: 'none' }} />
              </div>

              {aiSuccessMsg && <div style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'rgba(34,197,94,0.18)', border: '1px solid rgba(74,222,128,0.35)', color: '#bbf7d0', fontSize: '0.82rem' }}>{aiSuccessMsg}</div>}

              <button type="button" onClick={handleAiAnalyze} disabled={aiAnalyzing} style={{ width: '100%', padding: '0.7rem', fontSize: '0.88rem', fontWeight: 600, borderRadius: '10px', border: '1px solid rgba(196,118,201,0.45)', background: 'linear-gradient(135deg, rgba(65,30,60,0.85), rgba(40,20,45,0.9))', color: '#f5b5f8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.45rem' }}>
                {aiAnalyzing ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> Gemini İnceliyor...</> : <><Sparkles size={16} /> Yapay Zekâ İle Notu Zenginleştir</>}
              </button>

              <button type="submit" disabled={submitting} style={{ width: '100%', padding: '0.8rem', fontSize: '0.95rem', fontWeight: 600, borderRadius: '10px', border: 'none', background: '#e5a93c', color: '#000000', cursor: 'pointer' }}>
                {submitting ? 'Kaydediliyor...' : 'Deftere Kaydet'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 5: NOT DETAY İNCELEME MODALI ─── */}
      {activeEntry && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#1c241e', border: '1px solid rgba(229, 169, 60, 0.4)', borderRadius: '24px', width: '100%', maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto', padding: '2rem', boxShadow: '0 25px 60px rgba(0,0,0,0.85)', position: 'relative' }}>
            <button onClick={() => setActiveEntry(null)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={20} /></button>

            {(activeEntry.photo_url || activeEntry.drawing_data) && (
              <div style={{ width: '100%', maxHeight: '350px', borderRadius: '14px', overflow: 'hidden', marginBottom: '1.2rem', border: '1px solid rgba(255,255,255,0.1)', position: 'relative' }}>
                <img src={activeEntry.photo_url ? (activeEntry.photo_url.startsWith('/uploads') ? `${API_URL}${activeEntry.photo_url}` : activeEntry.photo_url) : activeEntry.drawing_data} alt={activeEntry.title} style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0e1410' }} />
              </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginBottom: '0.8rem', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.45)' }}>
              <span>{new Date(activeEntry.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              {activeEntry.plant_name && <span style={{ background: 'rgba(125, 155, 110, 0.2)', color: '#82ad76', padding: '0.15rem 0.65rem', borderRadius: '15px' }}>{activeEntry.plant_name}</span>}
              {activeEntry.location && <span style={{ background: 'rgba(229, 169, 60, 0.15)', color: '#e5a93c', padding: '0.15rem 0.65rem', borderRadius: '15px' }}>{activeEntry.location}</span>}
            </div>

            <h2 style={{ fontSize: '1.5rem', color: '#ffffff', margin: '0 0 1rem 0', fontWeight: 700 }}>{activeEntry.title}</h2>

            {activeEntry.content && (
              <div style={{ background: '#121814', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.2rem', fontSize: '0.94rem', lineHeight: 1.65, color: '#ffffff', whiteSpace: 'pre-wrap', marginBottom: '1.2rem' }}>
                {activeEntry.content}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1rem' }}>
              <button onClick={(e) => handleDeleteNote(activeEntry.id, e)} style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.5rem 0.9rem', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem' }}><Trash2 size={15} /> Sil</button>
              <button onClick={() => setActiveEntry(null)} style={{ background: '#121814', color: '#ffffff', border: '1px solid rgba(255,255,255,0.15)', padding: '0.5rem 1.1rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>Kapat</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
