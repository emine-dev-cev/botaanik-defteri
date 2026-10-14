"use client";
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Compass, Sun, CloudSun, Cloud, Droplet, Thermometer, MapPin,
  Sparkles, Sprout, ArrowRight, Check, RotateCcw, BookOpen,
  NotebookPen, ExternalLink, Filter, HelpCircle, Layers, CheckCircle2,
  Loader2, Info, ChevronRight, Wind, ShieldCheck, Flower2, Search,
  X, Bookmark, Plus
} from 'lucide-react';

const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:3001';
  }
  return 'https://botaanik-defteri.onrender.com';
};

// İklim Seçenekleri
const CLIMATE_OPTIONS = [
  {
    id: 'akdeniz',
    label: 'Akdeniz & Ege İklimi',
    sublabel: 'Sıcak & kurak yazlar, ılıman kışlar, deniz esintisi',
    badge: 'Ilıman Kışlar',
    icon: '☀️',
    desc: 'Yaz kuraklığına, yüksek buharlaşmaya ve sahil rüzgarlarına dayanıklı bitkiler.'
  },
  {
    id: 'karasal',
    label: 'Karasal & Soğuk İklim',
    sublabel: 'İç & Doğu Anadolu, sert donlar (-15°C / -30°C)',
    badge: 'Yüksek Don Direnci',
    icon: '❄️',
    desc: 'Sert kış soğuklarına, don olaylarına ve gece-gündüz sıcaklık farkına dayanıklı türler.'
  },
  {
    id: 'karadeniz',
    label: 'Karadeniz & Nemli İklim',
    sublabel: 'Bol yağış, serin dağ/yayla, yüksek bağıl nem',
    badge: 'Sürekli Nem',
    icon: '🌧️',
    desc: 'Düzenli yağış alan, yaz kuraklığı yaşamayan, serin ve nemli orman iklimi bitkileri.'
  },
  {
    id: 'marmara',
    label: 'Marmara Geçiş İklimi',
    sublabel: 'Dengeli dört mevsim, nemli ve ılıman kışlar',
    badge: 'Dört Mevsim',
    icon: '🌤️',
    desc: 'Akdeniz ve Karadeniz iklimleri arasında geçiş gösteren, geniş toleranslı bitkiler.'
  },
  {
    id: 'kurak',
    label: 'Kurak & Yarı Kurak İklim',
    sublabel: 'Az yağış, kurak yazlar, yüksek sıcaklık',
    badge: 'Su Tasarruflu',
    icon: '🏜️',
    desc: 'Kısıtlı su kaynaklarıyla yetinen, kserofit ve kurakçıl bitki karakterleri.'
  },
  {
    id: 'subtropikal',
    label: 'Ilıman / Subtropikal & Kış Bahçesi',
    sublabel: 'Donsuz ortamlar, seralar, korunaklı teraslar',
    badge: 'Donsuz Ortam',
    icon: '🌿',
    desc: '-5°C altı don görmeyen, ılıman sahil şeritleri veya kış bahçeleri için egzotik türler.'
  }
];

// Toprak Türü Seçenekleri
const SOIL_OPTIONS = [
  {
    id: 'kirecli',
    label: 'Kireçli / Kalkerli Toprak',
    sublabel: 'Alkali pH (7.5+), taşlı ve kireç oranı yüksek',
    tag: 'Bazik pH',
    icon: '🪨',
    desc: 'Kalkerli anakaya üzerinde oluşan, geçirgen kireçli bahçe toprakları.'
  },
  {
    id: 'kumlu',
    label: 'Kumlu / Süzek Toprak',
    sublabel: 'Hafif dokulu, drenajı çok yüksek, çabuk ısınan',
    tag: 'Yüksek Drenaj',
    icon: '🏖️',
    desc: 'Su tutmayan, kök boğazı çürümesini önleyen havadar sahil ve alüvyon toprakları.'
  },
  {
    id: 'killi',
    label: 'Killi / Ağır Toprak',
    sublabel: 'Sıkı dokulu, su ve besin tutma kapasitesi yüksek',
    tag: 'Zengin & Sıkı',
    icon: '🧱',
    desc: 'Yavaş süzülen ancak mineralce zengin, kökleri sıkı kavrayan topraklar.'
  },
  {
    id: 'asidik',
    label: 'Asidik / Torflu / Orman Toprağı',
    sublabel: 'Düşük pH (5.0 - 6.5), çam iğnesi ve funda örtüsü',
    tag: 'Asidik pH',
    icon: '🍂',
    desc: 'Kireçsiz, granit veya orman altı organik artıklarından oluşan asidik topraklar.'
  },
  {
    id: 'humuslu',
    label: 'Humuslu & Verimli Bahçe Toprağı',
    sublabel: 'Dengeli tınlı, kompostlu, nemli ve canlı',
    tag: 'İdeal Verim',
    icon: '🌱',
    desc: 'Hemen hemen her bitkinin en yüksek gelişim performansını gösterdiği verimli toprak.'
  },
  {
    id: 'fakir',
    label: 'Fakir / Taşlı / Şev Toprağı',
    sublabel: 'Besin maddesi az, kayalık, erozyona maruz',
    tag: 'Zorlu Zemin',
    icon: '⛰️',
    desc: 'İstinat duvarı üstleri, taşlık bayırlar ve erozyon önleme kuşakları.'
  }
];

// Güneş / Işık Koşulu Seçenekleri
const SUN_OPTIONS = [
  {
    id: 'tam_gunes',
    label: 'Tam Güneş',
    sublabel: 'Günde 6+ saat doğrudan kesintisiz güneş ışığı',
    icon: '☀️',
    desc: 'Açık güney ve batı cepheler, geniş bahçeler, yoğun ışık seven ağaç ve çalılar.'
  },
  {
    id: 'yari_golge',
    label: 'Yarı Gölge / Sabah Güneşi',
    sublabel: 'Günde 3-5 saat hafif veya filtrelenmiş güneş',
    icon: '⛅',
    desc: 'Doğu cepheler, ağaçların filtrelediği yumuşak ışık alan korunaklı alanlar.'
  },
  {
    id: 'golge',
    label: 'Tam Gölge / Az Işık',
    sublabel: 'Kuzey cephe, ulu ağaç altları, duvar dipleri',
    icon: '☁️',
    desc: 'Doğrudan yakıcı güneş almayan, serin ve gölgeli kuytu bölgeler.'
  }
];

// Ek Filtreler: Mekân
const PLACEMENT_OPTIONS = [
  { id: 'all', label: 'Tüm Mekânlar' },
  { id: 'dis', label: 'Dış Mekân (Bahçe & Park)' },
  { id: 'balkon', label: 'Balkon & Teras (Saksı)' },
  { id: 'ic', label: 'İç Mekân (Ev & Salon)' }
];

// Ek Filtreler: Sulama
const WATERING_OPTIONS = [
  { id: 'all', label: 'Tüm Sulama Tipleri' },
  { id: 'az', label: 'Az Su (Kuraklığa Dayanıklı)' },
  { id: 'orta', label: 'Orta / Standart Sulama' },
  { id: 'bol', label: 'Bol Su (Sürekli Nemli)' }
];

export default function PlantSelectPage() {
  const [activeTab, setActiveTab] = useState('selector'); // 'selector' | 'ai_advisor'

  // Seçili Kriterler
  const [selectedClimate, setSelectedClimate] = useState('');
  const [selectedSoil, setSelectedSoil] = useState('');
  const [selectedSun, setSelectedSun] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState('all');
  const [selectedWatering, setSelectedWatering] = useState('all');

  // Bitkiler ve Yüklenme Durumu
  const [allPlants, setAllPlants] = useState([]);
  const [isLoadingPlants, setIsLoadingPlants] = useState(true);

  // Yapay Zekâ Danışmanı Durumu
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiError, setAiError] = useState(null);

  // Ansiklopedik Arama Durumu
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isSavingPlant, setIsSavingPlant] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Herhangi bir bitkiyi hem veritabanında hem yapay zekâ ansiklopedisinde ara
  const handleSearchPlant = async (queryToSearch, forceAi = false) => {
    const q = (typeof queryToSearch === 'string' ? queryToSearch : searchQuery).trim();
    if (!q) return;
    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);
    setSaveSuccess(false);

    try {
      const apiUrl = getApiUrl();
      const url = forceAi
        ? `${apiUrl}/api/plants/search-any?q=${encodeURIComponent(q)}&ai=true`
        : `${apiUrl}/api/plants/search-any?q=${encodeURIComponent(q)}`;
      const res = await fetch(url);
      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || 'Bitki arama işlemi başarısız oldu.');
      }
      const data = await res.json();
      setSearchResult(data);
    } catch (err) {
      console.error('Bitki arama hatası:', err);
      setSearchError(err.message || 'Bitki aranırken bir hata oluştu.');
    } finally {
      setIsSearching(false);
    }
  };

  // Yapay zekâ tarafından bulunan bitkiyi veritabanı koleksiyonuna kaydet
  const handleSaveToCatalog = async (plantData) => {
    if (!plantData) return;
    setIsSavingPlant(true);
    try {
      const apiUrl = getApiUrl();
      const res = await fetch(`${apiUrl}/api/plants/save-ai`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plantData)
      });
      if (!res.ok) throw new Error('Kaydedilemedi.');
      const data = await res.json();
      setSaveSuccess(true);
      // Bitki listesini arka planda güncelle
      fetch(`${apiUrl}/api/plants`)
        .then(r => r.json())
        .then(list => { if (Array.isArray(list)) setAllPlants(list); })
        .catch(() => {});
    } catch (err) {
      alert('Bitki koleksiyona kaydedilemedi: ' + err.message);
    } finally {
      setIsSavingPlant(false);
    }
  };

  // Sayfa açıldığında tüm bitkileri çek
  useEffect(() => {
    async function loadData() {
      try {
        const apiUrl = getApiUrl();
        const res = await fetch(`${apiUrl}/api/plants`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) setAllPlants(data);
        }
      } catch (err) {
        console.error('Bitkiler yüklenirken hata:', err);
      } finally {
        setIsLoadingPlants(false);
      }
    }
    loadData();

    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      if (q && q.trim()) {
        setSearchQuery(q.trim());
        handleSearchPlant(q.trim());
      }
    }
  }, []);

  const totalFiltersActive = Boolean(selectedClimate || selectedSoil || selectedSun || (selectedPlacement !== 'all') || (selectedWatering !== 'all'));

  // İstemci taraflı botanik puanlama ve anında filtreleme
  const matchedPlants = useMemo(() => {
    if (!allPlants || allPlants.length === 0) return [];

    return allPlants.map(plant => {
      let totalWeight = 0;
      let totalScore = 0;
      const reasons = [];

      const climateText = `${plant.habitat?.climate_preference || ''} ${plant.habitat?.regions || ''} ${plant.description || ''}`.toLowerCase();
      const soilText = `${plant.care?.soil_type || ''} ${plant.care?.recommended_soil_mix || ''} ${plant.care?.drainage_need || ''}`.toLowerCase();
      const lightText = `${plant.care?.light_need || ''} ${plant.care?.direct_sun_tolerance || ''} ${plant.care?.semi_shade_tolerance || ''} ${plant.care?.shade_tolerance || ''}`.toLowerCase();
      const wateringText = `${plant.care?.watering_need || ''} ${plant.care?.drought_tolerance || ''} ${plant.care?.watering_description || ''}`.toLowerCase();
      const placementText = `${plant.habitat?.placement || ''} ${plant.habitat?.landscape_use || ''}`.toLowerCase();
      const tempMin = plant.care?.temperature_min;

      // 1. İKLİM UYUMU (Ağırlık: 35)
      if (selectedClimate) {
        totalWeight += 35;
        let cScore = 50;
        let cReason = '';

        if (selectedClimate === 'akdeniz') {
          if (climateText.includes('akdeniz') || climateText.includes('sahil') || climateText.includes('ege') || climateText.includes('sıcak')) {
            cScore = 100;
            cReason = 'Akdeniz ve Ege ikliminin sıcak yazlarına tam uyumlu; rüzgara ve sıcağa dayanıklı.';
          } else if (tempMin !== null && tempMin !== undefined && tempMin >= -15) {
            cScore = 80;
            cReason = 'Ilıman Akdeniz kuşağı kışlarında rahatlıkla yetişir.';
          } else {
            cScore = 60;
            cReason = 'Geniş iklim toleransıyla Akdeniz kıyılarında yetişebilir.';
          }
        } else if (selectedClimate === 'karasal') {
          if (climateText.includes('karasal') || climateText.includes('don') || climateText.includes('soğuk') || (tempMin !== null && tempMin <= -20)) {
            cScore = 100;
            cReason = `Sert karasal iklime mükemmel uyumlu (${tempMin !== null ? tempMin + "°C'ye kadar don dayanımı" : 'yüksek soğuk toleransı'}).`;
          } else if (tempMin !== null && tempMin <= -15) {
            cScore = 80;
            cReason = 'Karasal iklim kış soğuklarına ve donlara dayanıklıdır.';
          } else if (tempMin !== null && tempMin > -10) {
            cScore = 25;
            cReason = 'Dona hassastır; karasal kış koşullarında dondan korunması şarttır.';
          } else {
            cScore = 50;
          }
        } else if (selectedClimate === 'karadeniz') {
          if (climateText.includes('karadeniz') || climateText.includes('nemli') || climateText.includes('yağış') || climateText.includes('serin dağ') || soilText.includes('asidik')) {
            cScore = 100;
            cReason = 'Bol yağışlı ve serin Karadeniz iklimini ve yüksek nemi çok sever.';
          } else if (!climateText.includes('kurak')) {
            cScore = 75;
            cReason = 'Nemli ve ılıman Karadeniz koşullarında sağlıklı gelişir.';
          } else {
            cScore = 45;
          }
        } else if (selectedClimate === 'marmara') {
          if (tempMin === null || tempMin <= -10) {
            cScore = 95;
            cReason = 'Marmara geçiş ikliminin ılıman dört mevsim dengesine mükemmel adapte olur.';
          } else {
            cScore = 70;
          }
        } else if (selectedClimate === 'kurak') {
          if (climateText.includes('kurak') || wateringText.includes('kurak') || wateringText.includes('az') || climateText.includes('yangın') || climateText.includes('çöl')) {
            cScore = 100;
            cReason = 'Aşırı yaz kuraklığına, düşük su kaynaklarına ve sıcağa tam dayanıklıdır.';
          } else if (wateringText.includes('orta')) {
            cScore = 65;
          } else {
            cScore = 30;
          }
        } else if (selectedClimate === 'subtropikal') {
          if (climateText.includes('subtropikal') || climateText.includes('sıcak ılıman') || placementText.includes('iç mekân') || placementText.includes('kış bahçesi')) {
            cScore = 100;
            cReason = 'Subtropikal, kış bahçesi veya korunaklı teras iklimine kusursuz uyum sağlar.';
          } else {
            cScore = 60;
          }
        }
        totalScore += (cScore * 35) / 100;
        if (cReason) reasons.push({ type: 'climate', icon: '🏔️', text: cReason });
      }

      // 2. TOPRAK UYUMU (Ağırlık: 35)
      if (selectedSoil) {
        totalWeight += 35;
        let sScore = 60;
        let sReason = '';

        if (selectedSoil === 'kirecli') {
          if (soilText.includes('kireç') || soilText.includes('kalker') || soilText.includes('bazik') || soilText.includes('her türlü')) {
            sScore = 100;
            sReason = 'Kireçli ve kalkerli topraklarda kök gelişimi ve besin alımı mükemmeldir.';
          } else if (soilText.includes('asidik')) {
            sScore = 30;
            sReason = 'Asidik toprak sever; kireçli toprakta demir klorozu riski vardır.';
          } else {
            sScore = 70;
            sReason = 'Drenaj sağlandığında kireçli bahçe topraklarına iyi uyum sağlar.';
          }
        } else if (selectedSoil === 'kumlu') {
          if (soilText.includes('kum') || soilText.includes('kumul') || soilText.includes('süzek') || soilText.includes('hafif')) {
            sScore = 100;
            sReason = 'Kumlu ve süzek toprağa bayılır; kökleri hızlı su tahliyesini sever.';
          } else if (soilText.includes('her türlü')) {
            sScore = 90;
            sReason = 'Kumlu zemin dahil geniş toprak aralığına kolayca adapte olur.';
          } else {
            sScore = 60;
          }
        } else if (selectedSoil === 'killi') {
          if (soilText.includes('kil') || soilText.includes('balçık') || soilText.includes('ağır') || soilText.includes('her türlü')) {
            sScore = 100;
            sReason = 'Killi ve sıkı topraklarda kuvvetli kök tutunması gerçekleştirir.';
          } else if (soilText.includes('kum') && !soilText.includes('kil')) {
            sScore = 40;
            sReason = 'Ağır killi topraklarda kök havalanması için kum veya perlit takviyesi önerilir.';
          } else {
            sScore = 70;
          }
        } else if (selectedSoil === 'asidik') {
          if (soilText.includes('asidik') || soilText.includes('turba') || soilText.includes('torf') || soilText.includes('funda') || soilText.includes('çam')) {
            sScore = 100;
            sReason = 'Düşük pH ve asidik orman topraklarında en parlak gelişimini gösterir.';
          } else if (soilText.includes('her türlü') || !soilText.includes('kireç')) {
            sScore = 80;
            sReason = 'Hafif asidik ve nötr topraklarda sağlıklı büyür.';
          } else {
            sScore = 45;
          }
        } else if (selectedSoil === 'humuslu') {
          if (soilText.includes('humus') || soilText.includes('verimli') || soilText.includes('organik') || soilText.includes('derin') || soilText.includes('bahçe')) {
            sScore = 100;
            sReason = 'Organik maddece zengin humuslu bahçe toprağında güçlü ve iştahlı büyür.';
          } else {
            sScore = 80;
          }
        } else if (selectedSoil === 'fakir') {
          if (soilText.includes('fakir') || soilText.includes('taş') || soilText.includes('kaya') || soilText.includes('şev') || soilText.includes('erozyon')) {
            sScore = 100;
            sReason = 'Fakir, taşlı ve yamaç topraklarında dahi az besinle hayatta kalır.';
          } else if (soilText.includes('her türlü')) {
            sScore = 85;
          } else {
            sScore = 40;
          }
        }
        totalScore += (sScore * 35) / 100;
        if (sReason) reasons.push({ type: 'soil', icon: '🌱', text: sReason });
      }

      // 3. GÜNEŞ & IŞIK UYUMU (Ağırlık: 30)
      if (selectedSun) {
        totalWeight += 30;
        let lScore = 65;
        let lReason = '';

        if (selectedSun === 'tam_gunes') {
          if (lightText.includes('tam güneş') || lightText.includes('güneş') || lightText.includes('ışık ağacı') || lightText.includes('yoğun')) {
            lScore = 100;
            lReason = 'Günde 6+ saat tam güneş ile harika yaprak ve taç formu sergiler.';
          } else if (lightText.includes('yarı gölge')) {
            lScore = 75;
            lReason = 'Tam güneşi tolere eder, öğle sıcağında hafif filtrelenmeyi sever.';
          } else if (lightText.includes('derin gölge') || lightText.includes('tam gölge')) {
            lScore = 35;
            lReason = 'Gölge ağacıdır; kavurucu güneş yaprak uçlarını kurutabilir.';
          } else {
            lScore = 70;
          }
        } else if (selectedSun === 'yari_golge') {
          if (lightText.includes('yarı gölge') || lightText.includes('aydınlık') || lightText.includes('filtrelenmiş') || lightText.includes('sabah güneşi')) {
            lScore = 100;
            lReason = 'Aydınlık yarı gölge ve filtrelenmiş güneş ışığı için biçilmiş kaftandır.';
          } else if (lightText.includes('tam güneş veya') || lightText.includes('gölge veya')) {
            lScore = 90;
            lReason = 'Geniş ışık toleransı sayesinde yarı gölgede problemsiz büyür.';
          } else {
            lScore = 65;
          }
        } else if (selectedSun === 'golge') {
          if (lightText.includes('gölge') || lightText.includes('tam gölge') || lightText.includes('derin gölge')) {
            lScore = 100;
            lReason = 'Gölgeye olağanüstü dayanıklıdır; güneşsiz kuzey cephelerde yemyeşil kalır.';
          } else if (lightText.includes('yarı gölge')) {
            lScore = 70;
            lReason = 'Kısmi gölgeyi tolere edebilir.';
          } else {
            lScore = 25;
            lReason = 'Işık sevgisi yüksektir; derin gölgede yaprak dökebilir veya zayıflar.';
          }
        }
        totalScore += (lScore * 30) / 100;
        if (lReason) reasons.push({ type: 'sun', icon: '☀️', text: lReason });
      }

      // 4. MEKÂN (Ağırlık: 10)
      if (selectedPlacement && selectedPlacement !== 'all') {
        totalWeight += 10;
        let pScore = 60;
        if (selectedPlacement === 'dis') {
          if (placementText.includes('dış mekân') || placementText.includes('park') || placementText.includes('bahçe') || placementText.includes('şev')) pScore = 100;
          else pScore = 60;
        } else if (selectedPlacement === 'balkon') {
          if (placementText.includes('saksı') || placementText.includes('teras') || placementText.includes('balkon') || placementText.includes('çalı') || (plant.physical_avg_height && (plant.physical_avg_height.includes('0.') || plant.physical_avg_height.includes('1-2')))) pScore = 95;
          else pScore = 50;
        } else if (selectedPlacement === 'ic') {
          if (placementText.includes('iç mekân') || placementText.includes('ev') || placementText.includes('salon') || placementText.includes('kış bahçesi')) pScore = 100;
          else pScore = 20;
        }
        totalScore += (pScore * 10) / 100;
      }

      // 5. SULAMA (Ağırlık: 10)
      if (selectedWatering && selectedWatering !== 'all') {
        totalWeight += 10;
        let wScore = 60;
        if (selectedWatering === 'az') {
          if (wateringText.includes('az') || wateringText.includes('kurak') || wateringText.includes('istemez')) wScore = 100;
          else if (wateringText.includes('orta')) wScore = 65;
          else wScore = 35;
        } else if (selectedWatering === 'orta') {
          if (wateringText.includes('orta') || wateringText.includes('düzenli')) wScore = 100;
          else wScore = 75;
        } else if (selectedWatering === 'bol') {
          if (wateringText.includes('bol') || wateringText.includes('nemli') || wateringText.includes('ıslak')) wScore = 100;
          else wScore = 40;
        }
        totalScore += (wScore * 10) / 100;
      }

      const finalPercentage = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 100;

      return {
        ...plant,
        matchScore: finalPercentage,
        matchReasons: reasons
      };
    })
      .filter(p => (totalFiltersActive ? p.matchScore >= 45 : true))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [allPlants, selectedClimate, selectedSoil, selectedSun, selectedPlacement, selectedWatering, totalFiltersActive]);

  // Filtreleri Sıfırla
  const handleResetFilters = () => {
    setSelectedClimate('');
    setSelectedSoil('');
    setSelectedSun('');
    setSelectedPlacement('all');
    setSelectedWatering('all');
  };

  // Yapay Zekâ Botanik Danışmanını Çalıştır
  const handleAskAi = async (e) => {
    if (e) e.preventDefault();
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    try {
      const apiUrl = getApiUrl();
      const climateObj = CLIMATE_OPTIONS.find(c => c.id === selectedClimate);
      const soilObj = SOIL_OPTIONS.find(s => s.id === selectedSoil);
      const sunObj = SUN_OPTIONS.find(su => su.id === selectedSun);
      const placementObj = PLACEMENT_OPTIONS.find(p => p.id === selectedPlacement);
      const wateringObj = WATERING_OPTIONS.find(w => w.id === selectedWatering);

      const res = await fetch(`${apiUrl}/api/plants/ai-advisor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          climate: climateObj ? `${climateObj.label} (${climateObj.sublabel})` : 'Genel',
          soil: soilObj ? `${soilObj.label} (${soilObj.sublabel})` : 'Genel bahçe toprağı',
          light: sunObj ? `${sunObj.label} (${sunObj.sublabel})` : 'Genel gün ışığı',
          placement: placementObj?.id !== 'all' ? placementObj?.label : 'Açık hava / Bahçe',
          watering: wateringObj?.id !== 'all' ? wateringObj?.label : 'Normal',
          question: aiQuestion.trim()
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Yapay zekâ yanıt veremedi.');
      }

      const json = await res.json();
      if (json && json.data) {
        setAiResult(json.data);
      } else if (json) {
        setAiResult(json);
      }
    } catch (err) {
      console.error('Yapay zeka analiz hatası:', err);
      setAiError(err.message || 'Bir hata oluştu, lütfen tekrar deneyin.');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="animate-enter" style={{ paddingTop: '1.5rem', paddingBottom: '5rem' }}>

      {/* ─── HERO BAŞLIK BÖLÜMÜ ─── */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'rgba(201, 168, 76, 0.12)',
          border: '1px solid rgba(201, 168, 76, 0.3)',
          padding: '0.4rem 1.1rem',
          borderRadius: 'var(--radius-full)',
          color: 'var(--accent-gold)',
          fontSize: '0.82rem',
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1rem'
        }}>
          <Compass size={16} />
          <span>Ekolojik Bitki Seçici & Saha Rehberi</span>
        </div>

        <h1 style={{
          fontSize: 'clamp(2.1rem, 4vw, 3.2rem)',
          lineHeight: 1.2,
          color: '#f3efe6',
          marginBottom: '1rem',
          fontFamily: "'Lora', Georgia, serif"
        }}>
          İklime, Toprağa ve Güneşe Göre<br />
          <span style={{ color: 'var(--accent-green)', fontStyle: 'italic', fontWeight: 500 }}>
            En Doğru Bitkiyi Seçin
          </span>
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-secondary)',
          maxWidth: '650px',
          margin: '0 auto 2rem',
          lineHeight: 1.6
        }}>
          Bölgenizin iklim yapısını, bahçe toprağınızı ve gün ışığı miktarını belirleyin; ekosisteminize kusursuz uyum sağlayacak bitkileri eşleşme gerekçeleriyle keşfedin.
        </p>

        {/* MOD DEĞİŞTİRİCİ TAB BUTONLARI */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(20, 27, 23, 0.9)',
          padding: '0.35rem',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(143, 164, 134, 0.25)',
          gap: '0.4rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('selector')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeTab === 'selector' ? 'var(--accent-green)' : 'transparent',
              color: activeTab === 'selector' ? '#121814' : 'var(--text-secondary)',
              fontWeight: activeTab === 'selector' ? 700 : 500,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <Filter size={16} />
            <span>Kriterlere Göre Akıllı Seçici</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ai_advisor')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.4rem',
              borderRadius: 'var(--radius-full)',
              border: 'none',
              background: activeTab === 'ai_advisor' ? 'linear-gradient(135deg, var(--accent-gold), #eed588)' : 'transparent',
              color: activeTab === 'ai_advisor' ? '#121814' : 'var(--text-secondary)',
              fontWeight: activeTab === 'ai_advisor' ? 700 : 500,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <Sparkles size={16} />
            <span>Yapay Zekâ Botanik Danışmanı</span>
          </button>
        </div>
      </div>

      {/* ─── EVRENSEL BİTKİ ARAMA ÇUBUĞU & ANSİKLOPEDİ ─── */}
      <div style={{ maxWidth: '840px', margin: '0 auto 3rem' }}>
        <form onSubmit={(e) => { e.preventDefault(); handleSearchPlant(); }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(20, 32, 25, 0.95)',
            border: '1.5px solid rgba(201, 168, 76, 0.45)',
            borderRadius: 'var(--radius-full)',
            padding: '0.45rem 0.6rem 0.45rem 1.4rem',
            boxShadow: '0 10px 35px rgba(0,0,0,0.45), 0 0 20px rgba(201, 168, 76, 0.15)',
            transition: 'var(--transition)'
          }}>
            <Search size={22} style={{ color: 'var(--accent-gold)', flexShrink: 0, marginRight: '0.8rem' }} />
            <input
              type="text"
              placeholder="Merak ettiğiniz herhangi bir bitkiyi arayın... (Örn: Zeytin, Lavanta, Paşa Kılıcı, Monstera, Gül, Mavi Ladin)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '1rem',
                fontFamily: "'Outfit', sans-serif"
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSearchResult(null); setSearchError(null); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-tertiary)',
                  cursor: 'pointer',
                  padding: '0.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  marginRight: '0.4rem'
                }}
                title="Aramayı Temizle"
              >
                <X size={18} />
              </button>
            )}
            <button
              type="submit"
              disabled={isSearching || !searchQuery.trim()}
              className="btn btn-primary"
              style={{
                padding: '0.7rem 1.6rem',
                fontSize: '0.92rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--accent-gold), #eed588)',
                color: '#121814',
                boxShadow: '0 4px 15px rgba(201, 168, 76, 0.35)',
                cursor: isSearching || !searchQuery.trim() ? 'not-allowed' : 'pointer',
                flexShrink: 0
              }}
            >
              {isSearching ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1.2s linear infinite' }} />
                  <span>Ansiklopedi Taranıyor...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Bitkiyi Ara</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Hızlı Arama Öneri Rozetleri */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginTop: '0.85rem'
        }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)' }}>Popüler Bitkiler:</span>
          {['Zeytin Ağacı', 'Lavanta', 'Paşa Kılıcı', 'Monstera', 'Mavi Ladin', 'Gül', 'Kızılçam', 'Porsuk Ağacı'].map(name => (
            <button
              key={name}
              type="button"
              onClick={() => { setSearchQuery(name); handleSearchPlant(name); }}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(143,164,134,0.18)',
                borderRadius: 'var(--radius-full)',
                padding: '0.2rem 0.65rem',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-gold)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(143,164,134,0.18)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Arama Hatası */}
        {searchError && (
          <div style={{
            marginTop: '1.2rem',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(192, 80, 74, 0.15)',
            border: '1px solid rgba(192, 80, 74, 0.35)',
            color: '#f07070',
            fontSize: '0.88rem',
            textAlign: 'center'
          }}>
            {searchError}
          </div>
        )}

        {/* ─── ARAMA SONUCU: BOTANİK BİLGİ KARTI ─── */}
        {searchResult && (
          <div className="animate-enter" style={{
            marginTop: '2rem',
            background: 'rgba(22, 32, 26, 0.96)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(201, 168, 76, 0.5)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.55), 0 0 30px rgba(201, 168, 76, 0.12)',
            position: 'relative'
          }}>
            {/* Kapat Butonu */}
            <button
              type="button"
              onClick={() => setSearchResult(null)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'rgba(255,255,255,0.08)',
                border: 'none',
                borderRadius: '50%',
                width: 34,
                height: 34,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              title="Kapat"
            >
              <X size={18} />
            </button>

            {/* DURUM 1: VERİTABANI EŞLEŞMESİ */}
            {searchResult.source === 'database' && searchResult.plants && searchResult.plants.length > 0 && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.74rem', background: 'rgba(130, 173, 118, 0.2)', color: 'var(--accent-green)', fontWeight: 700, padding: '0.2rem 0.7rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(130, 173, 118, 0.3)' }}>
                    KOLEKSİYONUMUZDA BULUNDU ({searchResult.count} Bitki)
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem', marginBottom: '1.5rem' }}>
                  {searchResult.plants.map(p => (
                    <div key={p.id} style={{
                      background: 'rgba(15, 20, 17, 0.8)',
                      border: '1px solid rgba(143, 164, 134, 0.2)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <h4 style={{ fontSize: '1.15rem', color: '#f3efe6', fontFamily: "'Lora', Georgia, serif", marginBottom: '0.2rem' }}>
                          {p.turkish_name || p.scientific_name}
                        </h4>
                        <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontStyle: 'italic', marginBottom: '0.6rem' }}>
                          {p.scientific_name}
                        </div>
                        {p.description && (
                          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.8rem' }}>
                            {p.description.slice(0, 120)}...
                          </p>
                        )}
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-tertiary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {p.care?.light_need && <div>☀️ Işık: {p.care.light_need}</div>}
                          {p.care?.soil_type && <div>🌱 Toprak: {p.care.soil_type}</div>}
                          {p.habitat?.climate_preference && <div>🏔️ İklim: {p.habitat.climate_preference}</div>}
                        </div>
                      </div>

                      <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <Link href={`/plants/${p.id}`} className="btn btn-secondary" style={{ flex: 1, padding: '0.45rem', fontSize: '0.8rem', textAlign: 'center', justifyContent: 'center' }}>
                          Profili Gör
                        </Link>
                        <Link href={`/notebook?plant=${encodeURIComponent(p.turkish_name || p.scientific_name)}`} className="btn btn-primary" style={{ padding: '0.45rem 0.8rem', fontSize: '0.8rem' }}>
                          Deftere Ekle
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Yapay Zekâ ile daha detaylı rapor isteme butonu */}
                <div style={{ textAlign: 'center', borderTop: '1px solid rgba(143, 164, 134, 0.15)', paddingTop: '1.2rem' }}>
                  <button
                    type="button"
                    onClick={() => handleSearchPlant(searchResult.query, true)}
                    className="btn btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.86rem',
                      color: 'var(--accent-gold)',
                      border: '1px solid rgba(201, 168, 76, 0.35)'
                    }}
                  >
                    <Sparkles size={15} />
                    <span>"{searchResult.query}" Hakkında Yapay Zekâ Ansiklopedisinden Daha Derinlemesine Bilgi Getir</span>
                  </button>
                </div>
              </div>
            )}

            {/* DURUM 2: YAPAY ZEKÂ ANSİKLOPEDİ RAPORU (DÜNYADAKİ HERHANGİ BİR BİTKİ) */}
            {searchResult.source === 'ai_encyclopedia' && searchResult.plant && (
              <div>
                {/* Rozet ve Başlık */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(201, 168, 76, 0.15)', border: '1px solid rgba(201, 168, 76, 0.35)', padding: '0.25rem 0.8rem', borderRadius: 'var(--radius-full)', color: 'var(--accent-gold)', fontSize: '0.78rem', fontWeight: 600 }}>
                    <Sparkles size={14} />
                    <span>Yapay Zekâ Botanik Ansiklopedisi Raporu</span>
                  </div>

                  {saveSuccess ? (
                    <span style={{ fontSize: '0.82rem', color: 'var(--accent-green)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={16} />
                      <span>Koleksiyonunuza Kaydedildi!</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={isSavingPlant}
                      onClick={() => handleSaveToCatalog(searchResult.plant)}
                      className="btn btn-primary"
                      style={{
                        padding: '0.45rem 1rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'linear-gradient(135deg, var(--accent-green), #9ec592)',
                        color: '#121814'
                      }}
                    >
                      {isSavingPlant ? <Loader2 size={14} style={{ animation: 'spin 1.2s linear infinite' }} /> : <Plus size={14} />}
                      <span>Bu Bitkiyi Koleksiyona Ekle</span>
                    </button>
                  )}
                </div>

                {/* İsimler */}
                <div style={{ marginBottom: '1.2rem' }}>
                  <h3 style={{ fontSize: '1.8rem', color: '#f3efe6', fontFamily: "'Lora', Georgia, serif", marginBottom: '0.2rem' }}>
                    {searchResult.plant.turkish_name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.05rem', color: 'var(--accent-gold)', fontStyle: 'italic', fontFamily: "'Lora', Georgia, serif" }}>
                      {searchResult.plant.scientific_name}
                    </span>
                    {searchResult.plant.family && (
                      <span style={{ fontSize: '0.82rem', color: 'var(--accent-sage)', background: 'rgba(143,164,134,0.15)', padding: '0.15rem 0.6rem', borderRadius: 'var(--radius-full)' }}>
                        Familya: {searchResult.plant.family}
                      </span>
                    )}
                    {searchResult.plant.physical_summary && (
                      <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>
                        • {searchResult.plant.physical_summary}
                      </span>
                    )}
                  </div>
                </div>

                {/* Genel Tanıtım Açıklaması */}
                {searchResult.plant.description && (
                  <p style={{
                    fontSize: '0.94rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    marginBottom: '1.8rem',
                    background: 'rgba(15, 20, 17, 0.6)',
                    padding: '1.1rem 1.3rem',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '3px solid var(--accent-gold)'
                  }}>
                    {searchResult.plant.description}
                  </p>
                )}

                {/* 6'LI BAKIM VE EKOLOJİK BİLGİ KARTLARI (YETERİ BİLGİ GRİDİ) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '1rem',
                  marginBottom: '1.8rem'
                }}>
                  {/* 1. Güneş & Işık */}
                  <div style={{ background: 'rgba(15, 20, 17, 0.75)', border: '1px solid rgba(143, 164, 134, 0.18)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#f3b353', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <Sun size={16} />
                      <span>Güneş & Işık İhtiyacı</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 500, marginBottom: '0.2rem' }}>
                      {searchResult.plant.light_need || 'Belirtilmedi'}
                    </div>
                    {searchResult.plant.direct_sun_hours && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>
                        Önerilen süre: {searchResult.plant.direct_sun_hours}
                      </div>
                    )}
                  </div>

                  {/* 2. İklim & Don Dayanımı */}
                  <div style={{ background: 'rgba(15, 20, 17, 0.75)', border: '1px solid rgba(143, 164, 134, 0.18)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#c47660', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <Thermometer size={16} />
                      <span>İklim & Don Direnci</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 500, marginBottom: '0.2rem' }}>
                      {searchResult.plant.climate_preference || 'Genel iklim'}
                    </div>
                    {searchResult.plant.cold_tolerance_desc && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>
                        {searchResult.plant.cold_tolerance_desc}
                      </div>
                    )}
                  </div>

                  {/* 3. Toprak Yapısı */}
                  <div style={{ background: 'rgba(15, 20, 17, 0.75)', border: '1px solid rgba(143, 164, 134, 0.18)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-green)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <Sprout size={16} />
                      <span>Toprak & Drenaj</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 500, marginBottom: '0.2rem' }}>
                      {searchResult.plant.soil_type || 'Geçirgen bahçe toprağı'}
                    </div>
                    {searchResult.plant.soil_ph && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>
                        pH Tercihi: {searchResult.plant.soil_ph}
                      </div>
                    )}
                  </div>

                  {/* 4. Sulama & Nem */}
                  <div style={{ background: 'rgba(15, 20, 17, 0.75)', border: '1px solid rgba(143, 164, 134, 0.18)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#89b8cb', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <Droplet size={16} />
                      <span>Sulama Rejimi</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 500, marginBottom: '0.2rem' }}>
                      {searchResult.plant.watering_need || 'Toprak kurudukça sulama'}
                    </div>
                    {searchResult.plant.humidity_need && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>
                        Nem: {searchResult.plant.humidity_need}
                      </div>
                    )}
                  </div>

                  {/* 5. Budama & Gübreleme */}
                  <div style={{ background: 'rgba(15, 20, 17, 0.75)', border: '1px solid rgba(143, 164, 134, 0.18)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-gold)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <Wind size={16} />
                      <span>Budama & Gübreleme</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 500, marginBottom: '0.2rem' }}>
                      {searchResult.plant.pruning_info || 'Gençleştirme budaması'}
                    </div>
                    {searchResult.plant.fertilizing_info && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>
                        {searchResult.plant.fertilizing_info}
                      </div>
                    )}
                  </div>

                  {/* 6. Mekân & Peyzaj Değeri */}
                  <div style={{ background: 'rgba(15, 20, 17, 0.75)', border: '1px solid rgba(143, 164, 134, 0.18)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-sage)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <MapPin size={16} />
                      <span>Mekân & Kullanım</span>
                    </div>
                    <div style={{ fontSize: '0.84rem', color: '#ffffff', fontWeight: 500, marginBottom: '0.2rem' }}>
                      {searchResult.plant.placement || 'Bahçe / Balkon'}
                    </div>
                    {searchResult.plant.usage_and_benefits && (
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)' }}>
                        {searchResult.plant.usage_and_benefits}
                      </div>
                    )}
                  </div>
                </div>

                {/* Pratik Püf Noktaları */}
                {searchResult.plant.care_tips && Array.isArray(searchResult.plant.care_tips) && searchResult.plant.care_tips.length > 0 && (
                  <div style={{
                    background: 'rgba(201, 168, 76, 0.08)',
                    border: '1px solid rgba(201, 168, 76, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.2rem',
                    marginBottom: '1.5rem'
                  }}>
                    <div style={{ fontWeight: 600, color: 'var(--accent-gold)', fontSize: '0.88rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={16} />
                      <span>Uzman Bakım Püf Noktaları:</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {searchResult.plant.care_tips.map((tip, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.84rem', color: 'var(--text-secondary)' }}>
                          <Check size={14} style={{ color: 'var(--accent-green)', flexShrink: 0, marginTop: '0.2rem' }} />
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Alt Aksiyon Butonları */}
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', borderTop: '1px solid rgba(143, 164, 134, 0.15)', paddingTop: '1.2rem' }}>
                  <Link
                    href={`/notebook?plant=${encodeURIComponent(searchResult.plant.turkish_name || searchResult.plant.scientific_name)}`}
                    className="btn btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.65rem 1.4rem',
                      fontSize: '0.88rem'
                    }}
                  >
                    <NotebookPen size={15} />
                    <span>Botanik Defterime Not Al</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => setSearchResult(null)}
                    className="btn btn-secondary"
                    style={{
                      padding: '0.65rem 1.2rem',
                      fontSize: '0.88rem',
                      marginLeft: 'auto'
                    }}
                  >
                    Kapat
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          MOD 1: AKILLI SEÇİCİ VE FİLTRELEME
         ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'selector' && (
        <div>

          {/* ─── KRİTER KARTLARI KAPSAYICISI ─── */}
          <div style={{
            background: 'rgba(20, 27, 23, 0.75)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(143, 164, 134, 0.22)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            marginBottom: '3rem',
            boxShadow: '0 16px 40px rgba(0,0,0,0.35)'
          }}>

            {/* 1. ADIM: İKLİM SEÇİMİ */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(201, 168, 76, 0.2)', color: 'var(--accent-gold)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem'
                  }}>1</div>
                  <h3 style={{ fontSize: '1.25rem', color: '#f3efe6', fontFamily: "'Lora', Georgia, serif" }}>
                    Bölgenizin İklim Koşulunu Seçin
                  </h3>
                </div>
                {selectedClimate && (
                  <button
                    onClick={() => setSelectedClimate('')}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-gold)', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    İklim Seçimini Kaldır
                  </button>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}>
                {CLIMATE_OPTIONS.map(opt => {
                  const isSelected = selectedClimate === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedClimate(isSelected ? '' : opt.id)}
                      style={{
                        background: isSelected ? 'rgba(201, 168, 76, 0.16)' : 'rgba(28, 38, 32, 0.65)',
                        border: isSelected ? '1.5px solid var(--accent-gold)' : '1px solid rgba(143, 164, 134, 0.18)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.2rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? '0 0 20px rgba(201, 168, 76, 0.2)' : 'none'
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.5)';
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(143, 164, 134, 0.18)';
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
                          <span style={{
                            fontSize: '0.72rem',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-full)',
                            background: isSelected ? 'var(--accent-gold)' : 'rgba(143, 164, 134, 0.15)',
                            color: isSelected ? '#121814' : 'var(--text-tertiary)',
                            fontWeight: 600
                          }}>
                            {opt.badge}
                          </span>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '1.02rem', color: isSelected ? 'var(--accent-gold)' : '#ffffff', marginBottom: '0.25rem' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                          {opt.sublabel}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', borderTop: '1px solid rgba(143,164,134,0.1)', paddingTop: '0.5rem', lineHeight: 1.4 }}>
                        {opt.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. ADIM: TOPRAK TÜRÜ SEÇİMİ */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(130, 173, 118, 0.2)', color: 'var(--accent-green)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem'
                  }}>2</div>
                  <h3 style={{ fontSize: '1.25rem', color: '#f3efe6', fontFamily: "'Lora', Georgia, serif" }}>
                    Bahçe veya Zemin Toprak Yapısını Seçin
                  </h3>
                </div>
                {selectedSoil && (
                  <button
                    onClick={() => setSelectedSoil('')}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-green)', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Toprak Seçimini Kaldır
                  </button>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1rem'
              }}>
                {SOIL_OPTIONS.map(opt => {
                  const isSelected = selectedSoil === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedSoil(isSelected ? '' : opt.id)}
                      style={{
                        background: isSelected ? 'rgba(130, 173, 118, 0.16)' : 'rgba(28, 38, 32, 0.65)',
                        border: isSelected ? '1.5px solid var(--accent-green)' : '1px solid rgba(143, 164, 134, 0.18)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.2rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? '0 0 20px rgba(130, 173, 118, 0.2)' : 'none'
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(130, 173, 118, 0.6)';
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(143, 164, 134, 0.18)';
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.6rem' }}>{opt.icon}</span>
                          <span style={{
                            fontSize: '0.72rem',
                            padding: '0.2rem 0.55rem',
                            borderRadius: 'var(--radius-full)',
                            background: isSelected ? 'var(--accent-green)' : 'rgba(143, 164, 134, 0.15)',
                            color: isSelected ? '#121814' : 'var(--text-tertiary)',
                            fontWeight: 600
                          }}>
                            {opt.tag}
                          </span>
                        </div>
                        <div style={{ fontWeight: 600, fontSize: '1.02rem', color: isSelected ? 'var(--accent-green)' : '#ffffff', marginBottom: '0.25rem' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                          {opt.sublabel}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', borderTop: '1px solid rgba(143,164,134,0.1)', paddingTop: '0.5rem', lineHeight: 1.4 }}>
                        {opt.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. ADIM: GÜNEŞ & IŞIK KOŞULU */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(235, 170, 70, 0.2)', color: '#f3b353',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem'
                  }}>3</div>
                  <h3 style={{ fontSize: '1.25rem', color: '#f3efe6', fontFamily: "'Lora', Georgia, serif" }}>
                    Alanınızın Güneş & Işık Durumunu Seçin
                  </h3>
                </div>
                {selectedSun && (
                  <button
                    onClick={() => setSelectedSun('')}
                    style={{ background: 'none', border: 'none', color: '#f3b353', fontSize: '0.82rem', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Güneş Seçimini Kaldır
                  </button>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem'
              }}>
                {SUN_OPTIONS.map(opt => {
                  const isSelected = selectedSun === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedSun(isSelected ? '' : opt.id)}
                      style={{
                        background: isSelected ? 'rgba(235, 170, 70, 0.16)' : 'rgba(28, 38, 32, 0.65)',
                        border: isSelected ? '1.5px solid #f3b353' : '1px solid rgba(143, 164, 134, 0.18)',
                        borderRadius: 'var(--radius-md)',
                        padding: '1.2rem',
                        cursor: 'pointer',
                        transition: 'var(--transition)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: isSelected ? '0 0 20px rgba(235, 170, 70, 0.2)' : 'none'
                      }}
                      onMouseEnter={e => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(235, 170, 70, 0.6)';
                      }}
                      onMouseLeave={e => {
                        if (!isSelected) e.currentTarget.style.borderColor = 'rgba(143, 164, 134, 0.18)';
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{opt.icon}</div>
                        <div style={{ fontWeight: 600, fontSize: '1.05rem', color: isSelected ? '#f3b353' : '#ffffff', marginBottom: '0.25rem' }}>
                          {opt.label}
                        </div>
                        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', lineHeight: 1.35 }}>
                          {opt.sublabel}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--text-tertiary)', borderTop: '1px solid rgba(143,164,134,0.1)', paddingTop: '0.5rem', lineHeight: 1.4 }}>
                        {opt.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. EK İNCE AYARLAR (MEKÂN VE SULAMA) */}
            <div style={{
              borderTop: '1px solid rgba(143, 164, 134, 0.18)',
              paddingTop: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2rem',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                {/* Mekân Türü */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Mekân Türü:</span>
                  <select
                    value={selectedPlacement}
                    onChange={e => setSelectedPlacement(e.target.value)}
                    style={{
                      background: 'rgba(15, 20, 17, 0.9)',
                      border: '1px solid rgba(143, 164, 134, 0.25)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.45rem 1rem',
                      color: '#ffffff',
                      fontSize: '0.86rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {PLACEMENT_OPTIONS.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>

                {/* Sulama İmkanı */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>Sulama İmkanı:</span>
                  <select
                    value={selectedWatering}
                    onChange={e => setSelectedWatering(e.target.value)}
                    style={{
                      background: 'rgba(15, 20, 17, 0.9)',
                      border: '1px solid rgba(143, 164, 134, 0.25)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.45rem 1rem',
                      color: '#ffffff',
                      fontSize: '0.86rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    {WATERING_OPTIONS.map(w => (
                      <option key={w.id} value={w.id}>{w.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filtreleri Sıfırla Butonu */}
              {totalFiltersActive && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn btn-secondary"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.45rem 1rem',
                    fontSize: '0.84rem'
                  }}
                >
                  <RotateCcw size={14} />
                  <span>Kriterleri Sıfırla</span>
                </button>
              )}
            </div>

          </div>

          {/* ─── EŞLEŞEN BİTKİLER LİSTESİ / SONUÇLAR ─── */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', color: '#f3efe6', fontFamily: "'Lora', Georgia, serif" }}>
                  Eşleşen Bitkiler
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {totalFiltersActive
                    ? `Kriterlerinize göre değerlendirilmiş ${matchedPlants.length} bitki bulundu (Uyumluluk puanına göre sıralı).`
                    : `Toplam ${allPlants.length} bitki listeleniyor. Koşullarınızı seçerek daraltabilirsiniz.`}
                </p>
              </div>

              {/* Yapay Zekâya Danış Hızlı Butonu */}
              <button
                type="button"
                onClick={() => setActiveTab('ai_advisor')}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.88rem',
                  border: '1px solid rgba(201, 168, 76, 0.4)',
                  color: 'var(--accent-gold)'
                }}
              >
                <Sparkles size={16} />
                <span>Bu Seçimlerle Yapay Zekâya Danış</span>
              </button>
            </div>

            {isLoadingPlants ? (
              <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--accent-sage)' }}>
                <Loader2 size={36} style={{ animation: 'spin 1.2s linear infinite', margin: '0 auto 1rem', display: 'block' }} />
                <p style={{ fontSize: '0.95rem', color: 'var(--text-tertiary)' }}>Bitki koleksiyonu inceleniyor...</p>
              </div>
            ) : matchedPlants.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '1.5rem'
              }}>
                {matchedPlants.map(plant => {
                  const plantImg = plant.images?.[0]?.image_url;
                  const score = plant.matchScore || 100;

                  // Renk skalası
                  const scoreColor = score >= 90 ? 'var(--accent-green)' : score >= 75 ? 'var(--accent-gold)' : '#89b8cb';
                  const scoreBg = score >= 90 ? 'rgba(130, 173, 118, 0.15)' : score >= 75 ? 'rgba(201, 168, 76, 0.15)' : 'rgba(137, 184, 203, 0.15)';

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
                        boxShadow: '0 8px 24px rgba(0,0,0,0.25)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'rgba(201, 168, 76, 0.45)';
                        e.currentTarget.style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'rgba(143, 164, 134, 0.2)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      {/* Kart Görseli & Eşleşme Rozeti */}
                      <div style={{ position: 'relative', height: 200, background: '#0d120f' }}>
                        {plantImg ? (
                          <img
                            src={plantImg.startsWith('http://localhost:3001') ? plantImg.replace('http://localhost:3001', getApiUrl()) : plantImg.startsWith('/uploads') ? `${getApiUrl()}${plantImg}` : plantImg}
                            alt={plant.turkish_name || plant.scientific_name}
                            loading="lazy"
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
                            <Flower2 size={36} strokeWidth={1} style={{ color: 'rgba(143, 164, 134, 0.35)' }} />
                            <span style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Görsel Yok</span>
                          </div>
                        )}

                        <div style={{
                          position: 'absolute',
                          bottom: 0, left: 0, right: 0,
                          height: '50%',
                          background: 'linear-gradient(to top, rgba(15, 20, 17, 0.95), transparent)'
                        }} />

                        {/* Eşleşme Skoru Rozeti */}
                        {totalFiltersActive && (
                          <div style={{
                            position: 'absolute',
                            top: '0.75rem',
                            right: '0.75rem',
                            background: 'rgba(15, 20, 17, 0.9)',
                            backdropFilter: 'blur(8px)',
                            border: `1.5px solid ${scoreColor}`,
                            borderRadius: 'var(--radius-full)',
                            padding: '0.3rem 0.8rem',
                            fontSize: '0.82rem',
                            fontWeight: 700,
                            color: scoreColor,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
                          }}>
                            <CheckCircle2 size={14} />
                            <span>%{score} Uyum</span>
                          </div>
                        )}

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
                      </div>

                      {/* Kart Gövdesi */}
                      <div style={{ padding: '1.3rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
                            fontSize: '0.88rem',
                            color: 'var(--accent-gold)',
                            fontStyle: 'italic',
                            marginBottom: '0.8rem'
                          }}>
                            {plant.scientific_name}
                          </div>
                        </Link>

                        {/* Neden Uygun? Gerekçe Hapları */}
                        {plant.matchReasons && plant.matchReasons.length > 0 && (
                          <div style={{
                            background: 'rgba(15, 20, 17, 0.7)',
                            border: '1px solid rgba(143, 164, 134, 0.15)',
                            borderRadius: 'var(--radius-md)',
                            padding: '0.75rem',
                            marginBottom: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.45rem'
                          }}>
                            <div style={{ fontSize: '0.74rem', color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                              Ekolojik Uyum Nedenleri:
                            </div>
                            {plant.matchReasons.slice(0, 3).map((r, i) => (
                              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.35 }}>
                                <span style={{ flexShrink: 0 }}>{r.icon}</span>
                                <span>{r.text}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Temel Bakım Göstergeleri */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 1fr',
                          gap: '0.5rem',
                          fontSize: '0.76rem',
                          color: 'var(--text-tertiary)',
                          marginBottom: '1.2rem',
                          borderTop: '1px solid rgba(143, 164, 134, 0.1)',
                          paddingTop: '0.75rem'
                        }}>
                          {plant.care?.watering_need && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} title={`Sulama: ${plant.care.watering_need}`}>
                              <Droplet size={13} style={{ color: '#89b8cb', flexShrink: 0 }} />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {plant.care.watering_need}
                              </span>
                            </div>
                          )}

                          {plant.care?.light_need && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} title={`Işık: ${plant.care.light_need}`}>
                              <Sun size={13} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {plant.care.light_need}
                              </span>
                            </div>
                          )}

                          {plant.care?.temperature_min !== null && plant.care?.temperature_min !== undefined && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} title={`Min Sıcaklık: ${plant.care.temperature_min}°C`}>
                              <Thermometer size={13} style={{ color: '#c47660', flexShrink: 0 }} />
                              <span>{plant.care.temperature_min}°C Don</span>
                            </div>
                          )}

                          {plant.care?.soil_type && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }} title={`Toprak: ${plant.care.soil_type}`}>
                              <Sprout size={13} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {plant.care.soil_type}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Aksiyon Butonları */}
                        <div style={{
                          marginTop: 'auto',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          borderTop: '1px solid rgba(143, 164, 134, 0.12)',
                          paddingTop: '0.85rem'
                        }}>
                          <Link
                            href={`/plants/${plant.id}`}
                            className="btn btn-secondary"
                            style={{
                              flex: 1,
                              padding: '0.55rem',
                              fontSize: '0.82rem',
                              textAlign: 'center',
                              justifyContent: 'center',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                          >
                            <BookOpen size={14} />
                            <span>Detayları Gör</span>
                          </Link>

                          <Link
                            href={`/notebook?plant=${encodeURIComponent(plant.turkish_name || plant.scientific_name)}`}
                            className="btn btn-primary"
                            style={{
                              padding: '0.55rem 0.9rem',
                              fontSize: '0.82rem',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.35rem'
                            }}
                            title="Botanik Not Defterine Ekle"
                          >
                            <NotebookPen size={14} />
                            <span>Deftere Ekle</span>
                          </Link>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(20, 27, 23, 0.5)',
                border: '1px dashed rgba(143, 164, 134, 0.2)',
                borderRadius: 'var(--radius-xl)',
                maxWidth: '600px',
                margin: '2rem auto 0'
              }}>
                <Sprout size={36} style={{ color: 'var(--accent-green)', margin: '0 auto 1rem', display: 'block' }} />
                <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: '1.3rem', color: '#f3efe6', marginBottom: '0.5rem' }}>
                  Bu Kriter Kümeyle Eşleşen Bitki Bulunamadı
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Seçtiğiniz koşullar çok spesifik olabilir. Kriterlerden birini gevşetmeyi veya filtreleri sıfırlamayı deneyebilirsiniz.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.4rem', fontSize: '0.9rem' }}
                >
                  <RotateCcw size={15} />
                  <span>Kriterleri Sıfırla</span>
                </button>
              </div>
            )}

          </div>

        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          MOD 2: YAPAY ZEKÂ BOTANİK DANIŞMANI (GEMINI VISION & REASONING)
         ═══════════════════════════════════════════════════════════════════ */}
      {activeTab === 'ai_advisor' && (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>

          <div style={{
            background: 'rgba(28, 25, 36, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1.5px solid rgba(201, 168, 76, 0.35)',
            borderRadius: 'var(--radius-xl)',
            padding: '2.5rem 2rem',
            marginBottom: '2.5rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.45)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{
                width: 44, height: 44,
                borderRadius: '50%',
                background: 'rgba(201, 168, 76, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--accent-gold)'
              }}>
                <Sparkles size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', color: '#f3efe6', fontFamily: "'Lora', Georgia, serif" }}>
                  Kişiselleştirilmiş Botanik Danışmanlığı
                </h2>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Google Gemini destekli uzman botanik ve peyzaj zekâsı ile alan analizi yapın.
                </p>
              </div>
            </div>

            {/* Mevcut Seçili Parametre Özeti */}
            <div style={{
              background: 'rgba(15, 20, 17, 0.7)',
              border: '1px solid rgba(143, 164, 134, 0.2)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem 1.2rem',
              marginBottom: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Aktif Kriterleriniz:
              </span>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.78rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: selectedClimate ? 'rgba(201, 168, 76, 0.2)' : 'rgba(255,255,255,0.06)',
                  color: selectedClimate ? 'var(--accent-gold)' : 'var(--text-muted)'
                }}>
                  {selectedClimate ? `İklim: ${CLIMATE_OPTIONS.find(c => c.id === selectedClimate)?.label}` : 'İklim: Genel'}
                </span>

                <span style={{
                  fontSize: '0.78rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: selectedSoil ? 'rgba(130, 173, 118, 0.2)' : 'rgba(255,255,255,0.06)',
                  color: selectedSoil ? 'var(--accent-green)' : 'var(--text-muted)'
                }}>
                  {selectedSoil ? `Toprak: ${SOIL_OPTIONS.find(s => s.id === selectedSoil)?.label}` : 'Toprak: Genel'}
                </span>

                <span style={{
                  fontSize: '0.78rem',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  background: selectedSun ? 'rgba(235, 170, 70, 0.2)' : 'rgba(255,255,255,0.06)',
                  color: selectedSun ? '#f3b353' : 'var(--text-muted)'
                }}>
                  {selectedSun ? `Işık: ${SUN_OPTIONS.find(su => su.id === selectedSun)?.label}` : 'Işık: Genel'}
                </span>
              </div>
            </div>

            {/* Özel Açıklama / Soru Girişi */}
            <form onSubmit={handleAskAi}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.9rem', color: '#f3efe6', marginBottom: '0.5rem', fontWeight: 500 }}>
                  Alanınızı, Projenizi veya Özel İhtiyaçlarınızı Anlatın (İsteğe Bağlı):
                </label>
                <textarea
                  rows={4}
                  value={aiQuestion}
                  onChange={e => setAiQuestion(e.target.value)}
                  placeholder="Örn: Ankara'da kışın -20°C gören, rüzgarlı bir tepe bahçem var. Kireçli toprak için çit oluşturabilecek ve yaprak dökmeyen hangi bitkileri tavsiye edersiniz? Toprağı nasıl iyileştirmeliyim?"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid rgba(143, 164, 134, 0.25)',
                    background: 'rgba(15, 20, 17, 0.85)',
                    color: '#ffffff',
                    fontSize: '0.92rem',
                    fontFamily: "'Outfit', sans-serif",
                    lineHeight: 1.5,
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  onFocus={e => e.target.style.borderColor = 'var(--accent-gold)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(143, 164, 134, 0.25)'}
                />
              </div>

              <button
                type="submit"
                disabled={aiLoading}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.9rem 2rem',
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, var(--accent-gold), #eed588)',
                  color: '#121814',
                  boxShadow: '0 6px 20px rgba(201, 168, 76, 0.35)',
                  cursor: aiLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {aiLoading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1.2s linear infinite' }} />
                    <span>Yapay Zekâ Botanik Uzmanı Analiz Ediyor...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Yapay Zekâya Danış & Rapor Al</span>
                  </>
                )}
              </button>
            </form>

            {aiError && (
              <div style={{
                marginTop: '1.5rem',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(192, 80, 74, 0.15)',
                border: '1px solid rgba(192, 80, 74, 0.35)',
                color: '#f07070',
                fontSize: '0.88rem'
              }}>
                {aiError}
              </div>
            )}
          </div>

          {/* ─── YAPAY ZEKÂ ANALİZ SONUCU RAPORU ─── */}
          {aiResult && (
            <div className="animate-enter" style={{
              background: 'rgba(20, 27, 23, 0.85)',
              border: '1.5px solid rgba(201, 168, 76, 0.4)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem 2rem',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }}>

              {/* Rapor Başlığı */}
              <div style={{
                borderBottom: '1px solid rgba(143, 164, 134, 0.2)',
                paddingBottom: '1.5rem',
                marginBottom: '2rem'
              }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: 'var(--accent-gold)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem'
                }}>
                  <CheckCircle2 size={15} />
                  <span>Uzman Botanik Analiz Raporu</span>
                </div>
                <h3 style={{ fontSize: '1.7rem', color: '#f3efe6', fontFamily: "'Lora', Georgia, serif" }}>
                  Ekolojik Değerlendirme & Tavsiyeler
                </h3>
              </div>

              {/* 1. Özet Değerlendirme */}
              {aiResult.summary && (
                <div style={{
                  background: 'rgba(201, 168, 76, 0.1)',
                  border: '1px solid rgba(201, 168, 76, 0.25)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '2rem',
                  fontSize: '0.98rem',
                  lineHeight: 1.6,
                  color: '#f5f0e6'
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-gold)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Info size={16} />
                    <span>Genel Değerlendirme:</span>
                  </div>
                  {aiResult.summary}
                </div>
              )}

              {/* 2. En Uygun Bitki Önerileri */}
              {aiResult.top_matches && Array.isArray(aiResult.top_matches) && aiResult.top_matches.length > 0 && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{
                    fontSize: '1.25rem',
                    color: '#ffffff',
                    fontFamily: "'Lora', Georgia, serif",
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <Sprout size={20} style={{ color: 'var(--accent-green)' }} />
                    <span>Önerilen Öncelikli Bitkiler</span>
                  </h4>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {aiResult.top_matches.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'rgba(15, 20, 17, 0.75)',
                          border: '1px solid rgba(143, 164, 134, 0.2)',
                          borderRadius: 'var(--radius-md)',
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.5rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                            <span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#f3efe6', fontFamily: "'Lora', Georgia, serif" }}>
                              {item.turkish_name}
                            </span>
                            {item.scientific_name && (
                              <span style={{ fontSize: '0.88rem', color: 'var(--accent-gold)', fontStyle: 'italic' }}>
                                ({item.scientific_name})
                              </span>
                            )}
                          </div>

                          {item.match_score && (
                            <span style={{
                              fontSize: '0.78rem',
                              padding: '0.2rem 0.6rem',
                              borderRadius: 'var(--radius-full)',
                              background: 'rgba(130, 173, 118, 0.15)',
                              color: 'var(--accent-green)',
                              fontWeight: 700
                            }}>
                              %{item.match_score} Uyum
                            </span>
                          )}
                        </div>

                        {item.why_suitable && (
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                            <strong style={{ color: '#ffffff' }}>Neden Uygun? </strong>
                            {item.why_suitable}
                          </p>
                        )}

                        {item.planting_tip && (
                          <div style={{
                            fontSize: '0.82rem',
                            color: 'var(--accent-gold)',
                            background: 'rgba(201, 168, 76, 0.08)',
                            padding: '0.5rem 0.75rem',
                            borderRadius: 'var(--radius-sm)',
                            borderLeft: '3px solid var(--accent-gold)'
                          }}>
                            <strong>Dikim İpucu: </strong>{item.planting_tip}
                          </div>
                        )}

                        {item.plant_id && (
                          <div style={{ marginTop: '0.4rem' }}>
                            <Link
                              href={`/plants/${item.plant_id}`}
                              style={{
                                fontSize: '0.82rem',
                                color: 'var(--accent-green)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.3rem',
                                textDecoration: 'underline'
                              }}
                            >
                              <span>Koleksiyondaki Profilini İncele</span>
                              <ExternalLink size={13} />
                            </Link>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. Toprak İyileştirme & Gübreleme */}
              {aiResult.soil_recommendations && (
                <div style={{
                  background: 'rgba(15, 20, 17, 0.75)',
                  border: '1px solid rgba(143, 164, 134, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ fontWeight: 600, color: 'var(--accent-green)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sprout size={16} />
                    <span>Toprak İyileştirme & Drenaj Tavsiyeleri:</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {aiResult.soil_recommendations}
                  </p>
                </div>
              )}

              {/* 4. Işık ve Sulama Stratejisi */}
              {aiResult.sun_and_watering_advice && (
                <div style={{
                  background: 'rgba(15, 20, 17, 0.75)',
                  border: '1px solid rgba(143, 164, 134, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ fontWeight: 600, color: '#f3b353', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Sun size={16} />
                    <span>Işık Konumlandırması & Sulama Rejimi:</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {aiResult.sun_and_watering_advice}
                  </p>
                </div>
              )}

              {/* 5. Mevsimsel Dikim & Bakım Takvimi */}
              {aiResult.seasonal_guidelines && (
                <div style={{
                  background: 'rgba(15, 20, 17, 0.75)',
                  border: '1px solid rgba(143, 164, 134, 0.2)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.25rem'
                }}>
                  <div style={{ fontWeight: 600, color: '#89b8cb', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Thermometer size={16} />
                    <span>Mevsimsel Dikim ve Koruma Rehberi:</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {aiResult.seasonal_guidelines}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
}
