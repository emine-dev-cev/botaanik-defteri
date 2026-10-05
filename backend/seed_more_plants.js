const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const morePlants = [
  {
    "turkish_name": "Sahil Çamı, Deniz Çamı",
    "scientific_name": "Pinus pinaster",
    "english_name": "Maritime Pine, Cluster Pine",
    "alternative_names": "Pinus maritima",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "20-35 m boylanan, 2'li demet halinde 10-25 cm boyunda sert, kalın ve uzun iğneli, büyük reçineli kozalaklı, Atlantik ve Akdeniz sahil kumullarının asli orman ağacıdır.",
    "physical_avg_height": "20–35 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Düzensiz ve dağınık tepeli, güçlü dallı, sık reçineli gövdeli",
    "leaf_description": "2'li demet halinde, 10-25 cm boyunda, sert, kalın ve kıvrık parlak koyu yeşil iğneler.",
    "flower_description": "Tek evcikli. Büyük, 10-18 cm reçineli kozalaklar.",
    "flower_color": "Kestane-parlak kahverengi",
    "fruit_seed_info": "10–18 cm boyunda çok büyük, simetrik kozalaklar; yıllarca açılmadan dalda kalabilir.",
    "flowering_period": "İlkbahar / Kozalak 2-3. yılda olgunlaşır",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s2_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s3_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s3_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s4_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s4_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s8_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güneybatı Avrupa ve Kuzey Afrika (Atlantik ve Akdeniz sahil şeridi)",
      "natural_habitat": "Kıyı kumulları ve alçak kayalık tepeler",
      "regions": "Portekiz, İspanya, Fransa, İtalya, Kuzey Afrika sahilleri",
      "climate_preference": "Akdeniz ve Atlantik iklimi; deniz tuzuna, rüzgara ve kıyı kuraklığına mükemmel uyumludur.",
      "placement": "Dış mekân / Sahil ağaçlandırmaları, kumullar, deniz kıyısı parkları",
      "landscape_use": "Kıyı kumul stabilizasyonu, rüzgar kıran perde, sahil kordonları."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az sulama; tesis edildikten sonra su istemez.",
      "humidity_need": "Orta",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Kumlu, fakir, asidik sahil toprakları.",
      "soil_ph": "5.0 - 6.5",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gerekmez.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Reçinesinden terebentin ve katran elde edilir.",
      "traditional_use": "Fransız Landes Ormanı oluşturmak için geniş kumul ağaçlandırmalarında kullanılmıştır.",
      "beekeeping_value": "Orta",
      "ornamental_use": "Deniz kenarına has vahşi güzelliği ve büyük parlak kozalaklarıyla dekoratiftir.",
      "other_notes": "Kozalaklarının büyüklüğü ve parlaklığı ile diğer çamlardan kolayca ayrılır."
    }
  },
  {
    "turkish_name": "Büyük Kozalaklı Çam, Coulter Çamı",
    "scientific_name": "Pinus coulteri",
    "english_name": "Coulter Pine, Big-Cone Pine",
    "alternative_names": "Şeker Çamı, Dev Kozalaklı Çam",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "15-25 m boylanan, dünyanın en ağır kozalağına sahip (1-2.5 kg, 30-35 cm) çam türüdür. 3'lü demet halinde 15-30 cm uzunluğunda gri-mavi iğne yapraklıdır.",
    "physical_avg_height": "15–25 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Geniş piramidal, kalın gövdeli, derin çatlaklı koyu kabuklu",
    "leaf_description": "3'lü demet halinde, 15-30 cm boyunda, sert, gri-mavi mavimsi renkte uzun iğneler.",
    "flower_description": "Tek evcikli. Dünyanın en büyük ve en ağır kozalakları (1-2.5 kg).",
    "flower_color": "Amber-kahverengi",
    "fruit_seed_info": "30–35 cm boyunda ve 1-2.5 kg ağırlığında olağanüstü büyük, sert pullu, çöngel sivri kozalaklar.",
    "flowering_period": "İlkbahar / Kozalak 2-3. yılda olgunlaşır",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s10_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s10_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s11_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s11_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s11_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s9_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güneybatı ABD (Güney Kaliforniya kıyı dağları)",
      "natural_habitat": "800–2100 m kayalık kuru dağ yamaçları",
      "regions": "Küçük bir doğal yayılış alanında yetişir, dünya genelinde botanik bahçeleri",
      "climate_preference": "Yaz kuraklığına çok dayanıklıdır; -15°C kış soğuğuna dayanır.",
      "placement": "Dış mekân / Büyük parklar, özel koleksiyonlar",
      "landscape_use": "Soliter botanik merak ağacı, özel koleksiyon bahçeleri."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az sulama; kuraklığa çok dayanıklıdır.",
      "humidity_need": "Düşük-orta",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Fakir, kuru, taşlı dağ toprağı.",
      "soil_ph": "6.0 - 7.5",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gerekmez.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir; ancak devasa kozalakların düşme riski tehlikeli olabilir!",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Düşen ağır kozalaklar (1-2.5 kg) ciddi yaralanma riski oluşturur!"
    },
    "usage": {
      "medical_use": "Yoktur.",
      "traditional_use": "Tohumları Chumash yerlileri tarafından besin kaynağı olarak kullanılmıştır.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Dünyanın en büyük kozalaklarıyla botanik ilgi odağı ve koleksiyon bitkisidir.",
      "other_notes": "Kozalaklarının ağırlığı bir büyük çekiçle aynıdır; ağaçların altından geçmemek tavsiye edilir."
    }
  },
  {
    "turkish_name": "Veymut Çamı, Beyaz Çam",
    "scientific_name": "Pinus strobus",
    "english_name": "Eastern White Pine, Weymouth Pine",
    "alternative_names": "Beyaz Çam, Amerikan Veymut Çamı",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "30-50 m boylanan, 5'li demet halinde ince, yumuşak, gümüşi yeşil iğneli, çam türleri arasında en yumuşak dokuya sahip, hızlı büyüyen Kuzey Amerika'nın en büyük iğne yapraklısıdır.",
    "physical_avg_height": "30–50 metre",
    "physical_avg_width": "8–14 metre",
    "physical_growth_form": "Geniş piramidal, yatay katlı dallı, özellikle gençken çok estetik simetrik taçlı",
    "leaf_description": "5'li demet halinde (tanı kriteri), 6-14 cm boyunda, ince, yumuşak, mavimsi gümüşi yeşil iğneler.",
    "flower_description": "Tek evcikli. İnce silindirik sarkan salkım 8-16 cm kozalaklar.",
    "flower_color": "Açık kahverengi sarkık kozalak",
    "fruit_seed_info": "8–16 cm boyunda çok ince, silindirik, sarkık, reçineli kozalaklar.",
    "flowering_period": "İlkbahar / Kozalak 2. yıl olgunlaşır",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s15_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s15_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s16_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s16_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s16_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s19_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Doğu Kuzey Amerika (Kanada ve ABD)",
      "natural_habitat": "Nemli ormanlar ve vadi yamaçları",
      "regions": "Kuzey Amerika, ılıman ve nemli Avrupa parkları",
      "climate_preference": "Soğuk-ılıman, nemli iklimler; -40°C soğuğa dayanır.",
      "placement": "Dış mekân / Büyük parklar, serin dağ bahçeleri",
      "landscape_use": "Soliter ve grup dikimleri, doğa bahçeleri, hızlı perde ağacı."
    },
    "care": {
      "light_need": "Tam güneş - Yarı gölge",
      "watering_need": "Düzenli sulama; orta düzeyde nem ister.",
      "humidity_need": "Orta",
      "temperature_need": "-40°C",
      "temperature_min": -40,
      "soil_type": "Derin, iyi drene asidik-nötr topraklar.",
      "soil_ph": "5.5 - 7.0",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda hafif organik gübre.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "C vitamini açısından zengin genç iğneler çay olarak demlenebilir.",
      "traditional_use": "Amerika'nın kuruluş döneminde yapı kerestesi olarak çok yaygın kullanılmıştır.",
      "beekeeping_value": "Orta",
      "ornamental_use": "Yumuşak dokulu ince gümüşi iğneleri ve estetik form yapısıyla çok değerlidir.",
      "other_notes": "5'li demet iğneleri sadece bu türe özgüdür, sahadaki en belirgin tanı kriteridir."
    }
  },
  {
    "turkish_name": "Ağlayan Çam, Himalaya Çamı",
    "scientific_name": "Pinus wallichiana",
    "english_name": "Bhutan Pine, Blue Pine",
    "alternative_names": "Pinus griffithii, Mavi Himalaya Çamı",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "30-50 m boylanan, 5'li demet halinde 12-20 cm boyunda ince ve sarkıcı mavi-yeşil iğneli, 20-25 cm boyunda zarif sarkık kozalaklı, Himalaya dağlarının asil çamıdır.",
    "physical_avg_height": "30–50 metre",
    "physical_avg_width": "8–12 metre",
    "physical_growth_form": "Geniş piramidal, zarif sarkıcı dal uçları, görkemli ağaç",
    "leaf_description": "5'li demet halinde, 12-20 cm boyunda, ince ve sarkıcı (aşağı sarkan), mavimsi-gri gümüşi iğneler.",
    "flower_description": "Tek evcikli. 20-25 cm boyunda, zarif silindirik sarkık kozalaklar.",
    "flower_color": "Açık reçineli kahverengi",
    "fruit_seed_info": "20–25 cm boyunda ince uzun silindirik sarkık reçineli kozalaklar.",
    "flowering_period": "İlkbahar / Kozalak 2. yılda olgunlaşır",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s21_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s22_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s22_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s25_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s25_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s25_img3.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Himalayalar (Pakistan, Hindistan, Nepal, Bhutan, Tibet, Afganistan)",
      "natural_habitat": "1800–3500 m Himalaya dağ yamaçları",
      "regions": "Himalayalar, Karadeniz ve Marmara kıyı parkları",
      "climate_preference": "Ilıman ve serin nemli dağ iklimleri; -25°C soğuğa dayanır.",
      "placement": "Dış mekân / Büyük parklar, geniş alanlı bahçeler",
      "landscape_use": "Soliter odak ağacı, zarif sarkıcı dal formuyla vurgu noktası."
    },
    "care": {
      "light_need": "Tam güneş - Yarı gölge",
      "watering_need": "Düzenli sulama",
      "humidity_need": "Orta",
      "temperature_need": "-25°C",
      "temperature_min": -25,
      "soil_type": "Derin, iyi drene, hafif asidik toprak.",
      "soil_ph": "5.5 - 7.0",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda hafif kompost.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Reçinesi geleneksel şifada kullanılır.",
      "traditional_use": "Himalaya tapınak bahçelerinde kutsal ağaç kabul edilir.",
      "beekeeping_value": "Polen kaynağı",
      "ornamental_use": "Zarif sarkıcı ince gümüşi iğneleri ve uzun kozalaklarıyla çamların en romantik olanıdır.",
      "other_notes": "Sarkıcı iğneleri rüzgarda dalgalanırken olağanüstü estetik bir görünüm sunar."
    }
  },
  {
    "turkish_name": "Halep Çamı",
    "scientific_name": "Pinus halepensis",
    "english_name": "Aleppo Pine, Jerusalem Pine",
    "alternative_names": "Kudüs Çamı",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "10-25 m boylanan, düzensiz ve dağınık tepeli, 2'li demet halinde ince 6-12 cm açık yeşil iğneli, uzun konik kozalaklı, orta çevre ve yüksek sıcaklığa olağanüstü dayanıklı kurakçıl çam türüdür.",
    "physical_avg_height": "10–25 metre",
    "physical_avg_width": "5–10 metre",
    "physical_growth_form": "Geniş, düzensiz dağınık tepeli, dalları yamulmuş, kıvrık gövdeli",
    "leaf_description": "2'li demet halinde, 6-12 cm boyunda, ince ve esnek, açık yeşil iğneler.",
    "flower_description": "Tek evcikli. 8-18 cm uzun konik asimetrik kozalaklar.",
    "flower_color": "Kırmızımsı-kahverengi uzun kozalak",
    "fruit_seed_info": "8–18 cm boyunda uzun konik, asimetrik saplı kozalaklar; ağaç üzerinde yıllarca kalmaya dayanıklıdır.",
    "flowering_period": "İlkbahar / Kozalak 2-3. yılda olgunlaşır",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s69_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s70_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s70_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s71_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s72_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s79_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Doğu Akdeniz (Türkiye, Suriye, Lübnan, İsrail, Kuzey Afrika)",
      "natural_habitat": "Yüksek sıcaklıklı ve kurak Akdeniz kıyı düzlükleri (0-800 m)",
      "regions": "Doğu Akdeniz havzası, Türkiye Güney Ege ve Akdeniz kıyıları",
      "climate_preference": "Aşırı yaz sıcaklığı (+40°C) ve kuraklığa mükemmel dayanımı, ancak şiddetli donlara (-10°C altı) duyarlıdır.",
      "placement": "Dış mekân / Kıyı ağaçlandırmaları, şehir parkları, yol kenarları",
      "landscape_use": "Kurakçıl Akdeniz peyzajı, erozyon önleme, sahil rüzgar perdeleri."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Çok az sulama; kuraklığa olağanüstü dayanıklıdır.",
      "humidity_need": "Düşük",
      "temperature_need": "-10°C",
      "temperature_min": -10,
      "soil_type": "Çok fakir, kireçli, taşlı, kuru kıyı ve tepe toprakları.",
      "soil_ph": "7.0 - 8.5",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gerekmez.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Reçinesi antiseptik ve balsam olarak kullanılır.",
      "traditional_use": "Yunan retsina şarabının aromasını veren reçine bu çamdan elde edilir.",
      "beekeeping_value": "Polen kaynağı",
      "ornamental_use": "Yamulmuş ve kıvrık bükülmüş formuyla doğal bir heykel gibi pitoresk duruş sergiler.",
      "other_notes": "Yangın ekolojisine çok iyi adapte olmuştur; kozalakları yangın sonrası açılır."
    }
  },
  {
    "turkish_name": "Boylu Mazı, Batı Kırmızı Sediri",
    "scientific_name": "Thuja plicata",
    "english_name": "Western Red Cedar, Giant Arborvitae",
    "alternative_names": "Batı Mazısı",
    "family": "Cupressaceae",
    "genus": "Thuja",
    "description": "30-60 m boylanan, tabandan devasa konik büyüyen, aromatik ve çürümeye dayanıklı kızıl ahşabı için değerli, alt yüzünde kelebek şeklinde stoma deseni taşıyan büyük mazı ağacıdır.",
    "physical_avg_height": "30–60 metre",
    "physical_avg_width": "6–12 metre",
    "physical_growth_form": "Devasa konik, sık dallanmalı, tabandan genişleyen payandalı gövdeli ulu ağaç",
    "leaf_description": "Pul biçimli yapraklar; kelebek desenli beyaz stoma lekesi taşıyan alt yüzü 'kelebek işareti' ile Thuja occidentalis'ten kolayca ayrılır; ezilince anason veya meyve kokusu verir.",
    "flower_description": "Tek evcikli. Küçük oval 1-2 cm kozalaklar.",
    "flower_color": "Kırmızımsı turuncu erkek çiçekler / Küçük kahverengi kozalak",
    "fruit_seed_info": "1–2 cm boyunda dar oval kanatçıklı pullu kozalaklar.",
    "flowering_period": "İlkbahar / Kozalak Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s11_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s11_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s11_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s13_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s13_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s13_img3.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Batı Kuzey Amerika (İngiliz Kolombiyası'ndan Kuzey Kaliforniya'ya)",
      "natural_habitat": "Kıyı yağmur ormanları, 0-1500 m serin nemli vadiler",
      "regions": "Pasifik sahil şeridi, ılıman ve nemli Avrupa parkları",
      "climate_preference": "Bol yağışlı, serin ve nemli kıyı iklimi; -25°C soğuğa dayanır.",
      "placement": "Dış mekân / Büyük parklar, botanik bahçeleri, doğal orman alanları",
      "landscape_use": "Devasa soliter park ağacı, rüzgar kıran perde, doğa bahçesi."
    },
    "care": {
      "light_need": "Tam güneş - Yarı gölge",
      "watering_need": "Bol ve düzenli sulama",
      "humidity_need": "Yüksek nem",
      "temperature_need": "-25°C",
      "temperature_min": -25,
      "soil_type": "Derin, verimli, nemli asidik-nötr topraklar.",
      "soil_ph": "5.5 - 7.0",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda organik kompost.",
      "pruning_need": "Gerekmez.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Uçucu thujone içerir; büyük miktarda bitkisel çay olarak tüketilmemelidir.",
      "toxicity_cats": "Büyük miktarda toksik olabilir.",
      "toxicity_dogs": "Büyük miktarda toksik olabilir.",
      "risk_children": "Aşırı tüketimi zararlıdır."
    },
    "usage": {
      "medical_use": "Uçucu yağları antiparazitik olarak kullanılmıştır.",
      "traditional_use": "Kuzey Amerika yerlileri için kutsal ağaçtır; çürümeyen ahşabından kano yapılmıştır.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Anason kokusu ve kelebek stoma deseniyle tanı kolaylaştırıcı özelliğiyle öne çıkar.",
      "other_notes": "'Zebrina' formu altın çizgili renk varyasyonuyla çok değerlidir."
    }
  },
  {
    "turkish_name": "Batı Mazısı, Amerika Mazısı, Yaşam Ağacı",
    "scientific_name": "Thuja occidentalis",
    "english_name": "Northern White Cedar, American Arborvitae",
    "alternative_names": "Arborvitae, Yaşam Ağacı",
    "family": "Cupressaceae",
    "genus": "Thuja",
    "description": "15-20 m boylanan (kültivarları 1-8 m), piyasada yüzlerce kültivara sahip, yoğun konik veya sütunsu formlu, budamaya ve makasa çok dayanıklı, kış bahçeciliğinin bir numaralı bitkisidir.",
    "physical_avg_height": "15–20 metre (Kültivarları: 1–8 metre)",
    "physical_avg_width": "3–5 metre (Sütun formları: 0.5–1.5 m)",
    "physical_growth_form": "Yoğun konik veya sütunsu, sık dal örgülü, makasa mükemmel yanıt veren",
    "leaf_description": "Pul biçimli; yassı sürgünler üzerinde kiremit sıralı, koyu-açık yeşil; alt yüzünde mazı bezi, X veya küçük kelebek işareti bulunur (T. plicata'dakinin daha küçüğü).",
    "flower_description": "Tek evcikli. Küçük kahverengi oval kozalaklar.",
    "flower_color": "Kahverengi / Kışın sarı-turuncu dönen pul yapraklar ('Rheingold', 'Sunkist')",
    "fruit_seed_info": "1–1.5 cm boyunda oval kozalaklar.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s15_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s15_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s16_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s16_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s17_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s17_img2.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Doğu Kuzey Amerika (Kanada ve Doğu ABD)",
      "natural_habitat": "Nemli vadiler, göl kenarları, bataklık kenarları",
      "regions": "Kuzey Amerika, tüm dünyada bahçe kültürü",
      "climate_preference": "Soğuk-ılıman iklimler; -35°C kış soğuklarına dayanır.",
      "placement": "Dış mekân / Her türlü bahçe, çit, saksı, kaya bahçesi",
      "landscape_use": "Çit, bordür, sütun vurgu ('Smaragd', 'Columna'), kitle dikimi, topiary."
    },
    "care": {
      "light_need": "Güneş - Yarı gölge",
      "watering_need": "Orta sulama",
      "humidity_need": "Orta",
      "temperature_need": "-35°C",
      "temperature_min": -35,
      "soil_type": "Orta verimli, iyi drene, nem tutucu topraklar.",
      "soil_ph": "6.0 - 8.0",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda dengeli NPK gübresi.",
      "pruning_need": "Budamaya çok iyi yanıt verir; yılda 1-2 kez şekil budaması yapılabilir.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Thujone içerir; büyük miktarda yutulmamalıdır.",
      "toxicity_cats": "Toksik olabilir.",
      "toxicity_dogs": "Toksik olabilir.",
      "risk_children": "Aşırı tüketimi zararlıdır."
    },
    "usage": {
      "medical_use": "Uçucu yağları antiviral ve antifungal özellik taşır.",
      "traditional_use": "C vitamini kaynağı olarak tarihte büyük önem taşımıştır (Yaşam Ağacı ismi buradan gelir).",
      "beekeeping_value": "Polen kaynağı",
      "ornamental_use": "400+ kültivara sahip olmasıyla dünyada en çok yetiştirilen ibreli peyzaj bitkisidir.",
      "other_notes": "'Smaragd' (Emerald) kıvam ve her mevsim parlak yeşili korumasıyla en popüler kültivardır."
    }
  },
  {
    "turkish_name": "Doğu Mazısı, Şarkî Mazı, Servi Mazısı",
    "scientific_name": "Platycladus orientalis",
    "english_name": "Oriental Arborvitae, Chinese Arborvitae",
    "alternative_names": "Thuja orientalis, Biota orientalis",
    "family": "Cupressaceae",
    "genus": "Platycladus",
    "description": "5-20 m boylanan, dikey düzlemlerde gelişen fansi sürgünleri ve alt yüzünde glandlara özgü (mazı bezi) reçine damlası bulunmayan yapısıyla diğer mazılardan kolay ayrılır; kış soğuğuna en az dayanıklı mazı türüdür.",
    "physical_avg_height": "5–20 metre (Kültivarları: 1–5 m)",
    "physical_avg_width": "3–7 metre",
    "physical_growth_form": "Dar konik veya geniş piramidal, yoğun dallanmalı, dikey sürgün yüzeylerle dolgun",
    "leaf_description": "Pul biçimli yapraklar; her iki yüzü benzer görünümlü ve alt yüzde T. occidentalis gibi 'kelebek işareti' yoktur; dikey fansi sürgünler dalları karakteristik bir şekilde birbirinden ayırır.",
    "flower_description": "Tek evcikli. 1.5-2 cm boyunda eliptik, koyu mavi-yeşilden olgunlaşınca kahverengiye dönen kozalaklar; dikkat çekici çengel biçimli pul uçları.",
    "flower_color": "Koyu mavi-yeşil (genç) / Kahverengi (olgun)",
    "fruit_seed_info": "1.5–2 cm boyunda kolay tanınan eliptik kozalaklar; pulların uçları çengel biçimlidir.",
    "flowering_period": "İlkbahar / Kozalak Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s23_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s24_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s24_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s25_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s25_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s26_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Çin ve Kore (tüm Asya'ya yayılmış kültür bitkisi)",
      "natural_habitat": "Kalkerli kuru dağ yamaçları",
      "regions": "Akdeniz, Ege, Orta Doğu ve Türkiye bahçeleri",
      "climate_preference": "Akdeniz ve ılıman karasal; yaz kuraklığına, toza ve rüzgara dayanıklıdır; -15°C soğuğa dayanır.",
      "placement": "Dış mekân / Kentsel parklar, yol kenarları, mezarlıklar, bahçeler",
      "landscape_use": "Çit ve sınır bitkisi, sütunsu vurgu, mezarlık geleneksel bitkisi, Türk bahçe kültürünün simgesi."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az-orta sulama; kuraklık dayanımı yüksektir.",
      "humidity_need": "Düşük-orta",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Kireçli, kuru, fakir veya orta verimli topraklar.",
      "soil_ph": "6.5 - 8.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "Gübre istemez.",
      "pruning_need": "Budamaya ve makasla şekillendirmeye mükemmel yanıt verir.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Thujone içerir; büyük miktarda tüketilmemelidir.",
      "toxicity_cats": "Toksik olabilir.",
      "toxicity_dogs": "Toksik olabilir.",
      "risk_children": "Aşırı tüketimi sakıncalıdır."
    },
    "usage": {
      "medical_use": "Geleneksel Çin tıbbında kullanılır.",
      "traditional_use": "Türkiye'nin mezarlık sembol bitkisi olarak asırlardır kullanılmaktadır.",
      "beekeeping_value": "Polen kaynağı",
      "ornamental_use": "Kışlık altın-sarı renk tonları kazanan ('Aurea Nana', 'Semperaurea') kültüvarları çok popülerdir.",
      "other_notes": "Fansi dikey sürgün sistemi diğer bütün ibreli türlerden farklı olup sahada çok kolay tanınır."
    }
  },
  {
    "turkish_name": "Katran Ardıcı, Dikenli Ardıç",
    "scientific_name": "Juniperus oxycedrus",
    "english_name": "Prickly Juniper, Cade Juniper",
    "alternative_names": "Cade Ardıcı",
    "family": "Cupressaceae",
    "genus": "Juniperus",
    "description": "3-10 m boylanan, iğneli ve çok sivri-batıcı yapraklı, kırmızı-kahverengi olgunlaşan etli meyvemsi kozalaklı, katran yağı üretiminde önemli Akdeniz ardıcıdır.",
    "physical_avg_height": "3–10 metre",
    "physical_avg_width": "2–6 metre",
    "physical_growth_form": "Dik veya yayılıcı, çok gövdeli ağaççık ya da büyük çalı",
    "leaf_description": "3'lü çevrel dizilişli, 1-2 cm boyunda, çok sivri, batıcı iğneler; üst yüzünde 2 ayrı beyaz stoma bandı bulunur (Adi ardıçta 1 tek bantlı).",
    "flower_description": "İki evcikli. Etli, sferik, kırmızı-kahverengi meyvemsi kozalaklar.",
    "flower_color": "Kırmızı-kahverengi",
    "fruit_seed_info": "8–14 mm çapında, koyu kırmızı-kahverengi meyvemsi kozalak (galbül).",
    "flowering_period": "İlkbahar / Meyve 2. yıl sonbaharı",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s71_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s71_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s72_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s72_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s73_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s73_img2.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Akdeniz Havzası ve Türkiye (yaygın)",
      "natural_habitat": "Kıyı makisi, fundalıklar, taşlık yamaçlar",
      "regions": "Türkiye'nin Akdeniz, Ege ve Karadeniz kıyıları",
      "climate_preference": "Akdeniz ve ılıman iklimler; kuraklığa ve tuzlu sahil havasına dayanıklıdır.",
      "placement": "Dış mekân / Kaya bahçeleri, taşlık şevler, sahil şeritleri",
      "landscape_use": "Doğal yaban peyzajı, erozyon önleme, kaya bahçesi, doğa restorasyonu."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az sulama; kuraklığa çok dayanıklıdır.",
      "humidity_need": "Düşük",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Kireçli, taşlı, fakir Akdeniz toprağı.",
      "soil_ph": "6.5 - 8.5",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gerekmez.",
      "pruning_need": "Gerekmez.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Meyvemsi kozalakları az miktarda tüketilebilir; büyük dozlarda böbrek toksiktir.",
      "toxicity_cats": "Fazla tüketimi toksik.",
      "toxicity_dogs": "Fazla tüketimi toksik.",
      "risk_children": "İğneleri çok batıcıdır."
    },
    "usage": {
      "medical_use": "Odunundan elde edilen 'Katran Yağı' (Oleum Cadinum) ekzama, sedef hastalığı ve saç bakımında kullanılır.",
      "traditional_use": "Katran yağı asırlardır hayvan ve insan derisi hastalıklarında dışsal tedavide kullanılmıştır.",
      "beekeeping_value": "Nektar kaynağı",
      "ornamental_use": "Yoğun sivri iğneli dokusu ve kırmızı meyveleriyle doğal bitki örtüsünü yansıtır.",
      "other_notes": "Üst yüzündeki iki ayrı stoma bandı ile adi ardıçtan (bir bantlı) kesin olarak ayrılır."
    }
  },
  {
    "turkish_name": "Boylu Ardıç, İnci Ardıcı",
    "scientific_name": "Juniperus excelsa",
    "english_name": "Greek Juniper, Persian Juniper",
    "alternative_names": "Yunan Ardıcı",
    "family": "Cupressaceae",
    "genus": "Juniperus",
    "description": "10-20 m boylanan, genç sürgünleri pul yapraklı ve sütunsu dik formlu, mavi-siyah bezelye büyüklüğünde kozalaklı, İç ve Doğu Anadolu dağlarının asli yüksek rakım ardıcıdır.",
    "physical_avg_height": "10–20 metre",
    "physical_avg_width": "4–8 metre",
    "physical_growth_form": "Dar-sütunsu veya geniş piramidal, asimetrik dallı ağaç veya büyük çalı",
    "leaf_description": "Pul biçimli (juvenil bireylerde iğnemsi de olabilir), koyu yeşil-gri; ezilince çok belirgin katran-reçine kokusu verir.",
    "flower_description": "İki evcikli. Bezelye büyüklüğünde (6-8 mm) mavimsi-siyah etli kozalaklar.",
    "flower_color": "Mavi-siyah, donuk",
    "fruit_seed_info": "6–8 mm çapında küçük, donuk mavimsi-siyah meyvemsi kozalak.",
    "flowering_period": "İlkbahar / Meyve 2. yılda Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s79_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s79_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s80_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s80_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s81_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s81_img2.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Doğu Akdeniz, Türkiye İç ve Doğu Anadolu, Kafkasya, Orta Asya",
      "natural_habitat": "800–2600 m kalkerli dağ yamaçları; sedir orman sınırı üzerinde en toleranslı ağaç",
      "regions": "İç Anadolu, Doğu Anadolu, Güney Anadolu yüksek dağları",
      "climate_preference": "Sert karasal, kuru ve soğuk dağ iklimi; -30°C soğuğa ve yaz kuraklığına dayanır.",
      "placement": "Dış mekân / Yüksek dağ parkları, kuru ve karasal bahçeler",
      "landscape_use": "Sert iklim kurakçıl peyzajı, yüksek rakım orman ıslahı, doğal peyzaj."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az sulama; olağanüstü kuraklık dayanımı.",
      "humidity_need": "Düşük",
      "temperature_need": "-30°C",
      "temperature_min": -30,
      "soil_type": "Kireçli, taşlı, kuru, fakir dağ toprakları.",
      "soil_ph": "7.0 - 9.0",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gerekmez.",
      "pruning_need": "Gerekmez.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Meyveleri az miktarda baharat olarak kullanılabilir.",
      "toxicity_cats": "Fazla tüketimi toksik.",
      "toxicity_dogs": "Fazla tüketimi toksik.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Ardıç katranı antiseptik ve antifungal özellik taşır.",
      "traditional_use": "İç Anadolu'da ardıç katranı geleneksel halk tıbbının önemli ürünüdür.",
      "beekeeping_value": "Polen ve meyve nektarı",
      "ornamental_use": "Sütunsu formu ve asimetrik gövdesiyle kuru ve çıplak yamaçlara dramatik bir silüet katar.",
      "other_notes": "Türkiye'de en yüksek rakımlarda yetişebilen nadir ağaç türlerinden biridir."
    }
  }
];


async function seedMore() {
  console.log(`🌿 ${morePlants.length} adet ek ders bitkisi veritabanına ekleniyor...`);

  for (const p of morePlants) {
    const { habitat, care, usage, safety, problems, images, file, ...base } = p;

    try {
      // Daha önce eklenip eklenmediğini kontrol et
      const existing = await prisma.plant.findUnique({ where: { scientific_name: base.scientific_name } });
      if (existing) {
        console.log(`⚠️  Zaten mevcut: ${base.scientific_name}, atlanıyor...`);
        continue;
      }

      const plant = await prisma.plant.create({
        data: {
          ...base,
          ...(care && { care: { create: care } }),
          ...(habitat && { habitat: { create: habitat } }),
          ...(usage && { usage: { create: usage } }),
          ...(safety && { safety: { create: safety } }),
          ...(images && images.length > 0 && {
            images: {
              create: images.map(img => ({
                image_url: img.image_url,
                image_type: img.image_type,
                verified: true
              }))
            }
          })
        }
      });
      console.log(`✅ [${plant.family}] ${plant.turkish_name} (${plant.scientific_name}) eklendi. (Görsel: ${images ? images.length : 0})`);
    } catch(e) {
      console.error(`❌ Hata: ${base.scientific_name}:`, e.message);
    }
  }
  
  const total = await prisma.plant.count();
  console.log(`🎉 Veritabanında toplam ${total} bitki kaydı bulunuyor!`);
}

seedMore()
  .catch(console.error)
  .finally(async () => { await prisma.$disconnect(); });
