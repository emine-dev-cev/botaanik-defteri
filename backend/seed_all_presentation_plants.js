const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lecturePlants = [
  {
    "turkish_name": "Mabet Ağacı, Çin Mabed Ağacı",
    "scientific_name": "Ginkgo biloba",
    "english_name": "Maidenhair Tree",
    "alternative_names": "Ginkgo, Yaşayan Fosil",
    "family": "Ginkgoaceae",
    "genus": "Ginkgo",
    "description": "20-35 m boylanabilen, gençlikte dar piramidal, yaşlılıkta geniş dağınık tepeli, kışın yaprak döken, açık tohumluların yaşayan en eski tek temsilcisi olan ulu bir ağaçtır.",
    "physical_avg_height": "20–35 metre",
    "physical_avg_width": "8–12 metre",
    "physical_growth_form": "Piramidalden geniş kubbeliye doğru gelişen heykelsi ulu ağaç",
    "leaf_description": "Yelpaze biçimli, iki loplu, paralel çatalsı damarlı, sonbaharda muhteşem altın sarısına dönen yapraklar.",
    "flower_description": "İki evcikli. Erkek çiçekler kedicik şeklinde, dişi çiçekler sap ucunda iki tohum taslağı taşır.",
    "flower_color": "Sarımsı yeşil",
    "fruit_seed_info": "Etli dış kabuğa sahip eriksi tohum; olgunlaştığında bütirik asit nedeniyle koku yayar.",
    "flowering_period": "İlkbahar / Tohum dökümü Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s10_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s11_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s12_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s12_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s12_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s13_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Doğu Asya (Çin)",
      "natural_habitat": "Dağ vadileri ve tapınak korulukları",
      "regions": "Çin, Japonya, Avrupa, Türkiye parkları",
      "climate_preference": "Ilıman ve sıcak ılıman; kent kirliliğine olağanüstü dayanıklıdır.",
      "placement": "Dış mekân / Parklar, caddeler, meydanlar",
      "landscape_use": "Soliter simge ağaç, cadde ve bulvar ağaçlandırması (erkek klonlar), sonbahar renk vurgusu."
    },
    "care": {
      "light_need": "Tam güneş veya hafif yarı gölge",
      "watering_need": "Orta sulama; yerleştikten sonra kuraklığa çok dayanıklıdır.",
      "humidity_need": "Orta",
      "temperature_need": "-30°C'ye kadar dayanıklıdır.",
      "temperature_min": -30,
      "soil_type": "Derin, tınlı, iyi drene topraklar.",
      "soil_ph": "5.5 - 7.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda organik kompost.",
      "pruning_need": "Budama gerektirmez.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Tohumun dış eti deride dermatit yapabilir; çiğ tohum fazla tüketilmemelidir.",
      "toxicity_cats": "Etli tohum dış kabuğu toksiktir.",
      "toxicity_dogs": "Etli tohum dış kabuğu toksiktir.",
      "risk_children": "Kötü kokulu tohumlar tüketilmemelidir."
    },
    "usage": {
      "medical_use": "Standardize yaprak özleri (EGb 761) beyin kan dolaşımını ve hafızayı destekler.",
      "traditional_use": "Geleneksel Çin tıbbında binlerce yıldır şifa ve tapınak ağacıdır.",
      "beekeeping_value": "İlkbaharda polen kaynağı",
      "ornamental_use": "Yelpaze yaprakları ve altın sarısı sonbahar rengiyle en prestijli süs ağaçlarındandır.",
      "other_notes": "Hiroşima patlamasından sağ kurtulan ilk canlıdır."
    }
  },
  {
    "turkish_name": "Yalancı Palmiye, Sikas, Japon Sikası",
    "scientific_name": "Cycas revoluta",
    "english_name": "Sago Palm, King Sago",
    "alternative_names": "Kral Sikası, Cycas",
    "family": "Cycadaceae",
    "genus": "Cycas",
    "description": "1.5-3 metre boylanan, kalın pürüzlü gövdeli, taç kısmında koyu yeşil rozet teleksi yapraklar taşıyan yaşayan fosil bir açık tohumludur.",
    "physical_avg_height": "1.5–3 metre",
    "physical_avg_width": "1.5–2.5 metre",
    "physical_growth_form": "Çok yavaş büyüyen, silindirik gövdeli ve taç rozet yapraklı",
    "leaf_description": "Derimsi, koyu parlak yeşil, teleksi yapraklar; yaprakçık kenarları alta kıvrık ve uçları batıcı sivridir.",
    "flower_description": "İki evcikli. Erkek koni merkezde büyük; dişi megasporofiller tüylü ve turuncu tohumlu.",
    "flower_color": "Sarımsı kahve / Turuncu-kırmızı tohum",
    "fruit_seed_info": "Büyük, etli, parlak turuncu-kırmızı tohumlar.",
    "flowering_period": "Yaz ayları",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s20_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s20_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s21_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s22_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s23_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_materyaliII-2020-2_s24_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güney Japonya ve Ryukyu Adaları",
      "natural_habitat": "Kıyı kayalıkları ve subtropikal yamaçlar",
      "regions": "Akdeniz, Ege sahil kuşağı, iç mekan ve kış bahçeleri",
      "climate_preference": "Sıcak ılıman ve subtropikal; -5°C altındaki donlardan korunmalıdır.",
      "placement": "Dış mekân (Ilıman sahiller) / İç mekân büyük saksılar",
      "landscape_use": "Vurgu bitkisi, havuz kenarları, bina girişleri, kaya bahçeleri, saksılı teras peyzajı."
    },
    "care": {
      "light_need": "Tam güneş veya aydınlık yarı gölge",
      "watering_need": "Az-orta sulama; toprak kurudukça sulanmalıdır.",
      "humidity_need": "Orta-yüksek nem",
      "temperature_need": "İdeal 18–28°C; minimum -5°C",
      "temperature_min": -5,
      "soil_type": "Kumlu, geçirgen humuslu toprak.",
      "soil_ph": "6.0 - 7.0",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "İlkbahar-yaz aylarında yavaş salınımlı gübre.",
      "pruning_need": "Yalnızca kuruyan alt yapraklar kesilir.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Tüm kısımları (özellikle tohumları) cycasin toksini içerir; yutulması tehlikelidir.",
      "toxicity_cats": "Kediler için ölümcül zehirlidir!",
      "toxicity_dogs": "Köpekler için ölümcül zehirlidir!",
      "risk_children": "Tohumları kesinlikle yenmemelidir."
    },
    "usage": {
      "medical_use": "Toksisite nedeniyle tıbbi kullanımı yoktur.",
      "traditional_use": "Gövdesinden zehirleri arındırılarak sago nişastası elde edilir.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Tropikal zarafeti ve heykelsi rozet formuyla prestijli süs bitkisidir.",
      "other_notes": "Dinozorlar çağından bu yana neredeyse hiç değişmemiştir."
    }
  },
  {
    "turkish_name": "Adi Porsuk, Porsuk Ağacı",
    "scientific_name": "Taxus baccata",
    "english_name": "European Yew, Common Yew",
    "alternative_names": "Orman Porsuğu",
    "family": "Taxaceae",
    "genus": "Taxus",
    "description": "10-20 m boylanabilen, sık dallı, koyu yeşil taçlı, herdemyeşil, gölgeye ve budamaya son derece dayanıklı, tohumunun etrafında kırmızı kadeh şeklinde etli 'aril' taşıyan tarihi bir ağaçtır.",
    "physical_avg_height": "10–20 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Yoğun kubbeli veya piramidal, çok veya tek gövdeli",
    "leaf_description": "Yassı, batıcı olmayan, üst yüzü koyu parlak yeşil, alt yüzü açık yeşil iğne yapraklar; taraksı dizilir.",
    "flower_description": "İki evcikli. Sarımsı erkek çiçekler ve tek tohum taslaklı dişi çiçekler.",
    "flower_color": "Sarımsı (erkek) / Kırmızı etli aril",
    "fruit_seed_info": "Tohumu çevreleyen parlak kırmızı, etli kadeh şeklinde 'Arillus' bulunur.",
    "flowering_period": "İlkbahar / Aril olgunlaşması Ağustos - Ekim",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s12_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s12_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s13_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s13_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s14_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s14_img2.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Avrupa, Kuzey Afrika, Batı Asya (Türkiye'de doğal)",
      "natural_habitat": "Nemli ve gölgeli dağ vadileri, karışık orman altları",
      "regions": "Karadeniz, Marmara, Toroslar, tüm Avrupa",
      "climate_preference": "Ilıman-serin ve nemli; derin gölgeye en toleranslı ibrelidir.",
      "placement": "Dış mekân / Parklar, bahçeler, formal çitler, gölgeli alanlar",
      "landscape_use": "Budamalı formal çit (Topiary), labirentler, gölge bahçeleri, soliter vurgu."
    },
    "care": {
      "light_need": "Tam gölge, yarı gölge veya tam güneş",
      "watering_need": "Düzenli ve orta sulama; su göllenmesinden kaçınılmalıdır.",
      "humidity_need": "Orta-yüksek nem",
      "temperature_need": "-25°C",
      "temperature_min": -25,
      "soil_type": "Kireçli, derin, organik maddece zengin, iyi drene topraklar.",
      "soil_ph": "6.0 - 8.0",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda organik gübre.",
      "pruning_need": "Budamaya ve makasa olağanüstü dayanıklıdır.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Kırmızı etli aril hariç tüm bitki parçaları taksin alkaloidi içerir ve ölümcül zehirlidir!",
      "toxicity_cats": "Ölümcül zehirlidir.",
      "toxicity_dogs": "Ölümcül zehirlidir.",
      "risk_children": "Kırmızı ariller çocukların ilgisini çekebilir; tohumu çiğnenmemelidir!"
    },
    "usage": {
      "medical_use": "Kanser ilacı 'Paklitaksel (Taxol)' etken maddesi üretilir.",
      "traditional_use": "Esnek odunundan tarihi İngiliz uzun savaş yayları yapılmıştır.",
      "beekeeping_value": "İlkbaharda erken polen",
      "ornamental_use": "Koyu yeşil dokusu ve heykel gibi budanabilme yeteneğiyle klasik bahçe sanatının 1 numarasıdır.",
      "other_notes": "Türkiye'de 4112 yaşında anıt porsuk ağacı bulunmaktadır."
    }
  },
  {
    "turkish_name": "Japon Porsuğu",
    "scientific_name": "Taxus cuspidata",
    "english_name": "Japanese Yew",
    "alternative_names": "Uzak Doğu Porsuğu",
    "family": "Taxaceae",
    "genus": "Taxus",
    "description": "5-15 m boylanabilen, geniş taçlı, yaprak uçlarında küçük sivri kılçık taşıyan, sert kışlara ve soğuklara Taxus baccata'dan daha dayanıklı porsuk türüdür.",
    "physical_avg_height": "5–15 metre",
    "physical_avg_width": "4–8 metre",
    "physical_growth_form": "Geniş taçlı, çok gövdeli çalı veya küçük ağaç",
    "leaf_description": "Yaprak ucunda aniden sivrilen küçük bir kılçık (mukro) bulunur; üst yüzü koyu mat yeşil.",
    "flower_description": "İki evcikli. Sarımsı erkek çiçekler ve kırmızı arilli dişi tohumlar.",
    "flower_color": "Sarımsı / Kırmızı aril",
    "fruit_seed_info": "Tohumu saran parlak kırmızı arillus.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s38_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s38_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s38_img3.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-3_s39_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Japonya, Kore, Kuzeydoğu Çin ve Rusya Uzak Doğusu",
      "natural_habitat": "Soğuk dağ ormanları",
      "regions": "Uzak Doğu, Kuzey Amerika ve Avrupa soğuk bölgeleri",
      "climate_preference": "Soğuk ılıman; -35°C kış dondurucu soğuklarına dayanır.",
      "placement": "Dış mekân / Soğuk bölge bahçeleri, çitler, bonsai",
      "landscape_use": "Soğuk iklim çitleri, kitle dikimi ve bonsai sanatı."
    },
    "care": {
      "light_need": "Yarı gölge - gölge - tam güneş",
      "watering_need": "Orta sulama",
      "humidity_need": "Orta",
      "temperature_need": "-35°C",
      "temperature_min": -35,
      "soil_type": "Geçirgen, humusça zengin topraklar.",
      "soil_ph": "6.0 - 7.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda dengeli gübre.",
      "pruning_need": "Budamaya fevkalade dayanıklıdır.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Aril dışındaki tüm kısımlar şiddetle zehirlidir.",
      "toxicity_cats": "Yüksek derecede zehirlidir.",
      "toxicity_dogs": "Yüksek derecede zehirlidir.",
      "risk_children": "Tohumları tüketilmemelidir."
    },
    "usage": {
      "medical_use": "Taksoid bileşikleri içerir.",
      "traditional_use": "Japon bahçe ve bonsai sanatında kullanılır.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Kompakt formu ve koyu yeşil yapraklarıyla yüksek süs değerindedir.",
      "other_notes": "Ağır kar yüklerine karşı dalları oldukça esnektir."
    }
  },
  {
    "turkish_name": "Melez Porsuk (Hicks Porsuğu)",
    "scientific_name": "Taxus x media",
    "english_name": "Anglo-Japanese Yew",
    "alternative_names": "Taxus baccata x Taxus cuspidata",
    "family": "Taxaceae",
    "genus": "Taxus",
    "description": "3-5 m boylanan, sütunsu dik dallı, düzenli formlu, şehir koşullarına ve soğuğa ebeveynlerinden daha dayanıklı popüler melez porsuk kültivarıdır.",
    "physical_avg_height": "3–5 metre",
    "physical_avg_width": "1.5–3 metre",
    "physical_growth_form": "Dar sütunsu, dik dallı, çok sıkı ve düzenli",
    "leaf_description": "Koyu zümrüt yeşili, parlak ve yoğun iğne yapraklar.",
    "flower_description": "Melez takson; sonbaharda bol kırmızı aril üretir.",
    "flower_color": "Kırmızı arilli tohumlar",
    "fruit_seed_info": "Sonbaharda çok sayıda dekoratif kırmızı aril üretir.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [],
    "habitat": {
      "origin": "Kültür melezi",
      "natural_habitat": "Bahçe kültürü",
      "regions": "Ilıman ve soğuk ılıman kentler",
      "climate_preference": "Kent koşullarına ve -30°C soğuğa dayanıklıdır.",
      "placement": "Dış mekân / Dar bahçeler, bina girişleri, simetrik akslar",
      "landscape_use": "Sütunsu dikey mimari vurgu, dar alan formal çitleri."
    },
    "care": {
      "light_need": "Güneş - Yarı gölge - Gölge",
      "watering_need": "Orta",
      "humidity_need": "Orta",
      "temperature_need": "-30°C",
      "temperature_min": -30,
      "soil_type": "İyi drene bahçe toprağı.",
      "soil_ph": "6.0 - 7.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda hafif kompost.",
      "pruning_need": "İlkbaharda hafif form budaması.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Tohum ve yaprakları zehirlidir.",
      "toxicity_cats": "Zehirlidir.",
      "toxicity_dogs": "Zehirlidir.",
      "risk_children": "Kırmızı meyveleri yenmemelidir."
    },
    "usage": {
      "medical_use": "Taxol üretimi.",
      "traditional_use": "Kentsel mimaride dar alan çitlerinde yaygındır ('Hicksii').",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Zarif sütun formuyla modern yapılara mükemmel uyum sağlar.",
      "other_notes": "Budandığında formunu yıllarca korur."
    }
  },
  {
    "turkish_name": "Japon Yalancı Porsuğu, Japon Eriği",
    "scientific_name": "Cephalotaxus harringtonia",
    "english_name": "Japanese Plum Yew",
    "alternative_names": "Cephalotaxus drupacea",
    "family": "Cephalotaxaceae",
    "genus": "Cephalotaxus",
    "description": "2-4 m boylanan, zarif kavisli sürgünlü, alt yüzünde iki gümüşi stoma bandı taşıyan orak biçimli iğneli ve erik benzeri etli büyük tohumlu gölge çalısıdır.",
    "physical_avg_height": "2–4 metre",
    "physical_avg_width": "2–3.5 metre",
    "physical_growth_form": "Genişleyen, dolgun ve kavislenen sürgünlü herdemyeşil çalı",
    "leaf_description": "Porsuğa benzer ancak daha uzun (3-5 cm), yukarı kıvrık, alt yüzünde 2 belirgin gümüşi stoma bantlı.",
    "flower_description": "İki evcikli. Erkek çiçekler küresel; dişi çiçekler küçük kozalakçık.",
    "flower_color": "Yeşilimsi sarı / Zeytuni tohum",
    "fruit_seed_info": "2.5–3 cm boyunda erik veya zeytine benzeyen etli, büyük tohum.",
    "flowering_period": "İlkbahar / Meyve 2. yıl sonbaharı",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s14_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s14_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s15_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s15_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s15_img3.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s16_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Japonya, Kore ve Kuzey Çin",
      "natural_habitat": "Gölgeli nemli vadiler ve orman altları",
      "regions": "Doğu Asya, ılıman gölge bahçeleri",
      "climate_preference": "Ilıman, yazları nemli iklimler.",
      "placement": "Dış mekân / Gölge bahçeleri, kuzey cepheler, saksılar",
      "landscape_use": "Gölge vurgu bitkisi, Hosta ve Eğreltiler ile doku kontrastı."
    },
    "care": {
      "light_need": "Yarı gölge veya tam gölge",
      "watering_need": "Düzenli sulama; nemli toprak sever.",
      "humidity_need": "Yüksek nem",
      "temperature_need": "-20°C",
      "temperature_min": -20,
      "soil_type": "Organik zengin, asidik-nötr orman toprağı.",
      "soil_ph": "5.5 - 6.8",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda yaprak kompostu.",
      "pruning_need": "Kış sonunda hafif budama.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Tohum ve yaprakları toksiktir.",
      "toxicity_cats": "Toksiktir.",
      "toxicity_dogs": "Toksiktir.",
      "risk_children": "Tohumları çocuklardan uzak tutulmalıdır."
    },
    "usage": {
      "medical_use": "Homoharringtonin alkaloidi üretir.",
      "traditional_use": "Japon bahçelerinde su kenarlarına dikilir.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Parlak koyu yeşil gür yapraklarıyla gölge alanları canlandırır.",
      "other_notes": "Geyiklerin yemediği dayanıklı bir çalıdır."
    }
  },
  {
    "turkish_name": "Çin Yalancı Porsuğu, Fortune Yalancı Porsuğu",
    "scientific_name": "Cephalotaxus fortunei",
    "english_name": "Chinese Plum Yew",
    "alternative_names": "Fortune Eriksi Porsuğu",
    "family": "Cephalotaxaceae",
    "genus": "Cephalotaxus",
    "description": "3-6 m boylanan, yatay dallı ve sarkıcı uçlu, 5-10 cm uzunluğundaki dev iğne yapraklarıyla tropik palmiye görünümü sunan nadide açık tohumludur.",
    "physical_avg_height": "3–6 metre",
    "physical_avg_width": "3–5 metre",
    "physical_growth_form": "Dalları yatay duruşlu, uçları sarkık, gevşek zarif taçlı",
    "leaf_description": "Cinsin en uzun yapraklı türü (5-10 cm); parlak koyu yeşil, sivri uçlu, altı çift beyaz stoma bantlı.",
    "flower_description": "İki evcikli. Erkek çiçekler küre, dişi kozalakçıklar uçta.",
    "flower_color": "Yeşilimsi sarı / Morumsu kahve tohum",
    "fruit_seed_info": "2.5 cm uzunluğunda zeytin biçimli etli tohum.",
    "flowering_period": "İlkbahar / Meyve Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s19_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s19_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s20_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s20_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s20_img3.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s26_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güney ve Orta Çin",
      "natural_habitat": "Dağ orman altları",
      "regions": "Çin, nemli ılıman botanik parkları",
      "climate_preference": "Sıcak ılıman, nemli; kuru rüzgarlardan korunmalıdır.",
      "placement": "Dış mekân / Gölge bahçeleri, avlular, teraslar",
      "landscape_use": "Gölge bahçelerinde soliter vurgu, eğim stabilizasyonu, büyük kaplar."
    },
    "care": {
      "light_need": "Yarı gölge - gölge",
      "watering_need": "Düzenli sulama",
      "humidity_need": "Yüksek nem",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Nemli, humuslu drenajlı toprak.",
      "soil_ph": "5.5 - 6.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda organik gübre.",
      "pruning_need": "Budama gerektirmez.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Yutulması toksiktir.",
      "toxicity_cats": "Toksiktir.",
      "toxicity_dogs": "Toksiktir.",
      "risk_children": "Tohumları yenmemelidir."
    },
    "usage": {
      "medical_use": "Harringtonin alkaloidleri içerir.",
      "traditional_use": "Çin bahçe düzenlemeleri.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "10 cm'ye varan uzun ibreleriyle tropikal bir hava yaratır.",
      "other_notes": "Robert Fortune tarafından keşfedilmiştir."
    }
  },
  {
    "turkish_name": "Büyük Yapraklı Ayaklı Porsuk, Budist Çamı",
    "scientific_name": "Podocarpus macrophyllus",
    "english_name": "Buddhist Pine, Yew Plum Pine",
    "alternative_names": "Podokarpus, Kusamaki",
    "family": "Podocarpaceae",
    "genus": "Podocarpus",
    "description": "5-15 m boylanan, dik sütunsu taçlı, şeritsi-mızraksı derimsi yapraklı, tohum altında etli renkli reseptakl taşıyan herdemyeşil prestij ağacıdır.",
    "physical_avg_height": "5–15 metre",
    "physical_avg_width": "3–6 metre",
    "physical_growth_form": "Dik sütunsu veya konik taçlı, yoğun yapraklı",
    "leaf_description": "Şeritsi-mızraksı, 7-12 cm boyunda, derimsi, parlak koyu yeşil, belirgin orta damarlı.",
    "flower_description": "İki evcikli. Etli renkli reseptakl kaidesi üzerinde tohum taşır.",
    "flower_color": "Morumsu kırmızı kaide + yeşil tohum",
    "fruit_seed_info": "Tohum altındaki etli sap mor-kırmızı ve tatlıdır; tohumun içi toksiktir.",
    "flowering_period": "İlkbahar / Meyve Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s34_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s35_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s35_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s36_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s36_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki Mateyali2-2020-4_s41_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güney Japonya ve Doğu Çin",
      "natural_habitat": "Kıyı vadileri ve ormanlar",
      "regions": "Akdeniz, Ege kıyıları, iç mekanlar",
      "climate_preference": "Sıcak ılıman ve Akdeniz; -10°C hafif donlara dayanır.",
      "placement": "Dış mekân (Sahil kuşağı) / İç mekân salon bitkisi / Saksı",
      "landscape_use": "Çit ve perdeleme, rüzgar kalkanı, bonsai, salon ağacı."
    },
    "care": {
      "light_need": "Tam güneş - Aydınlık yarı gölge",
      "watering_need": "Orta sulama; kuraklığa dayanıklıdır.",
      "humidity_need": "Orta",
      "temperature_need": "-10°C",
      "temperature_min": -10,
      "soil_type": "Hafif asidik, iyi drene toprak.",
      "soil_ph": "5.5 - 7.0",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Büyüme mevsiminde sıvı gübre.",
      "pruning_need": "Budamaya ve form vermeye çok yatkındır.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Etli kaide yenilebilir, tohumun içi toksiktir.",
      "toxicity_cats": "Mide hassasiyeti yapabilir.",
      "toxicity_dogs": "Toksiktir.",
      "risk_children": "Tohumu tüketilmemelidir."
    },
    "usage": {
      "medical_use": "Geleneksel tıpta kullanılmıştır.",
      "traditional_use": "Feng Shui felsefesinde bereket ağacıdır.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Yoğun yaprak dokusu ve dik duruşuyla çok popülerdir.",
      "other_notes": "Tuzlu deniz rüzgarlarına çok dayanıklıdır."
    }
  },
  {
    "turkish_name": "Maymun Çıkmazı Ağacı, Şili Çamı",
    "scientific_name": "Araucaria araucana",
    "english_name": "Monkey Puzzle Tree",
    "alternative_names": "Şili Araukaryası",
    "family": "Araucariaceae",
    "genus": "Araucaria",
    "description": "15-30 m boylanan, kat kat halkasal dallı, üçgen jilet gibi sert ve batıcı yapraklarıyla gövdeyi zırh gibi saran sıra dışı bir heykelsi ağaçtır.",
    "physical_avg_height": "15–30 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Katlar halinde halkasal çevrel dallı, kubbeli veya piramidal",
    "leaf_description": "Üçgen-mızraksı, kalın, çok sert, derimsi, parlak koyu yeşil, batıcı sivri; 10-15 yıl dökülmez.",
    "flower_description": "Genellikle iki evcikli. Dişi kozalaklar devasa küresel (15-20 cm).",
    "flower_color": "Kahverengi",
    "fruit_seed_info": "Büyük, 3-4 cm boyunda yenilebilir lezzetli fındıksı tohumlar (Piñones).",
    "flowering_period": "Yaz / Kozalak 2-3 yılda olgunlaşır",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s14_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s14_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s14_img3.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s14_img4.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s1_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s1_img2.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Şili ve Batı Arjantin (And Dağları)",
      "natural_habitat": "Volkanik dağ yamaçları",
      "regions": "Güney Amerika, ılıman okyanusal bölgeler",
      "climate_preference": "Serin, nemli okyanusal iklim; -15°C soğuğa dayanır.",
      "placement": "Dış mekân / Geniş çim alanlar, prestij yapıları önü",
      "landscape_use": "Soliter simge ağaç, mimari vurgu, botanik bahçeleri."
    },
    "care": {
      "light_need": "Tam güneş veya hafif yarı gölge",
      "watering_need": "Düzenli derin sulama; yaz kuraklığından korunmalıdır.",
      "humidity_need": "Orta-yüksek",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Derin, volkanik veya humuslu asidik toprak.",
      "soil_ph": "5.5 - 6.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda hafif asit gübresi.",
      "pruning_need": "Asla budanmaz.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir; yaprakları çok keskin ve batıcıdır!",
      "toxicity_cats": "Batıcı yapraklar yaralanma riski taşır.",
      "toxicity_dogs": "Batıcı yapraklar yaralanma riski taşır.",
      "risk_children": "Oyun alanlarından uzakta konumlandırılmalıdır."
    },
    "usage": {
      "medical_use": "Gövde reçinesi yaralarda kullanılmıştır.",
      "traditional_use": "Şili'nin milli ağacıdır; tohumları Mapuche yerlilerinin temel gıdasıdır.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Dinozor çağını yansıtan geometrisiyle dünyanın en çarpıcı soliter ağaçlarındandır.",
      "other_notes": "Maymunların bile tırmanamayacağı kadar batıcıdır."
    }
  },
  {
    "turkish_name": "Salon Çamı, Norfolk Çamı",
    "scientific_name": "Araucaria heterophylla",
    "english_name": "Norfolk Island Pine",
    "alternative_names": "Araucaria excelsa",
    "family": "Araucariaceae",
    "genus": "Araucaria",
    "description": "Doğada 50-65 m, iç mekanda 1.5-3 m boylanan, kusursuz piramidal simetriye ve yatay kat kat dallara sahip sevilen salon çamıdır.",
    "physical_avg_height": "Doğada 50–65 m; İç mekanda 1.5–3 m",
    "physical_avg_width": "Dışarıda 10–15 m; İç mekanda 1–1.5 m",
    "physical_growth_form": "Kusursuz simetrik, kat kat yatay dallı piramidal ağaç",
    "leaf_description": "Yumuşak, tığ biçimli, taze açık yeşil; kat kat dizilişli.",
    "flower_description": "İki evcikli. Küremsi dişi kozalaklar.",
    "flower_color": "Yeşilimsi kahverengi",
    "fruit_seed_info": "Geniş kanatlı üçgen tohumlar.",
    "flowering_period": "Yaz",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s16_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s17_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s17_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s17_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s18_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s22_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Norfolk Adası (Güney Pasifik)",
      "natural_habitat": "Okyanus kıyı yamaçları",
      "regions": "Akdeniz sahil şeridi, tüm dünyada salonlar",
      "climate_preference": "Dona duyarlıdır (min 2°C).",
      "placement": "İç mekân (salonlar, lobiler) / Sahillerde dış mekan",
      "landscape_use": "Yılbaşı ağacı, salon vurgu bitkisi, sahil kordonu simge ağacı."
    },
    "care": {
      "light_need": "Çok aydınlık direkt/yarı direkt ışık",
      "watering_need": "Düzenli sulama; toprak kurudukça sulanmalıdır.",
      "humidity_need": "Yüksek hava nemi (%60-80)",
      "temperature_need": "İdeal 15–25°C; kışın 10°C altı olmamalı.",
      "temperature_min": 2,
      "soil_type": "Hafif asidik torf ve perlit harcı.",
      "soil_ph": "5.5 - 6.5",
      "drainage_need": "Çok iyi drenaj",
      "fertilizing_info": "İlkbahar-yaz aylarında ibreli besini.",
      "pruning_need": "Budanmaz; tepe sürgünü kesilmemelidir.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Mide hassasiyeti yapabilir.",
      "toxicity_dogs": "Hafif hassasiyet yapabilir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Yoktur.",
      "traditional_use": "Canlı iç mekan salon çamı.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Mükemmel katlı simetrisiyle yaşayan bir heykel gibidir.",
      "other_notes": "Tuzlu deniz rüzgarlarına dış mekanda çok dayanıklıdır."
    }
  },
  {
    "turkish_name": "Japon Kriptomeryası, Japon Sediri, Sugi",
    "scientific_name": "Cryptomeria japonica",
    "english_name": "Japanese Cedar, Sugi",
    "alternative_names": "Sugi Ağacı",
    "family": "Cupressaceae",
    "genus": "Cryptomeria",
    "description": "20-40 m boylanan, lifli kırmızı-kahve kabuklu, kışın bronz-kırmızı renge dönen yumuşak orak biçimli ibreli Japonya'nın milli ağacıdır.",
    "physical_avg_height": "20–40 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Dar konik tepeli, lifli kırmızımsı gövdeli ulu ağaç",
    "leaf_description": "Biz biçimli, içeri kıvrık, kışın bronzlaşan parlak yeşil yapraklar.",
    "flower_description": "Tek evcikli. Sarı-turuncu erkek çiçekler ve rozet pullu kozalaklar.",
    "flower_color": "Kahverengi",
    "fruit_seed_info": "1.5–2 cm çapında küremsi dikenli pullu kozalaklar.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s29_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s29_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s29_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s29_img4.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s30_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s30_img2.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Japonya ve Çin",
      "natural_habitat": "Nemli dağ ormanları",
      "regions": "Karadeniz, Marmara, ılıman nemli parklar",
      "climate_preference": "Bol yağışlı, nemli ılıman-serin iklimler.",
      "placement": "Dış mekân / Parklar, botanik bahçeleri, kaya bahçeleri (bodur formlar)",
      "landscape_use": "Soliter veya grup ağacı, kış renk etkisi (bronz ibreler), bodur formlarıyla kaya bahçesi."
    },
    "care": {
      "light_need": "Tam güneş veya aydınlık yarı gölge",
      "watering_need": "Düzenli ve bol sulama; toprak sürekli nemli olmalı.",
      "humidity_need": "Yüksek nem",
      "temperature_need": "-20°C",
      "temperature_min": -20,
      "soil_type": "Derin, humuslu, asidik orman toprağı.",
      "soil_ph": "5.0 - 6.5",
      "drainage_need": "İyi drenajlı ama nem tutucu",
      "fertilizing_info": "İlkbaharda asidik kompost.",
      "pruning_need": "Budama gerektirmez.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Uçucu yağları aromaterapide kullanılır.",
      "traditional_use": "Japon tapınak mimarisinde birincil kerestedir.",
      "beekeeping_value": "Polen kaynağı",
      "ornamental_use": "Kışın bronzlaşan yapraklarıyla 4 mevsim görsel şölen sunar.",
      "other_notes": "Japonya'da binlerce yıllık anıt ağaçları vardır."
    }
  },
  {
    "turkish_name": "Çin Köknarı, Mızraksı Kunninghamya",
    "scientific_name": "Cunninghamia lanceolata",
    "english_name": "China Fir",
    "alternative_names": "Cunninghamia sinensis",
    "family": "Cupressaceae",
    "genus": "Cunninghamia",
    "description": "15-30 m boylanan, piramidal taçlı, 3-7 cm boyundaki sert mızraksı ibreleri kışın bronzlaşan, kesildiğinde kökten sürgün veren Uzak Doğu ağacıdır.",
    "physical_avg_height": "15–30 metre",
    "physical_avg_width": "5–8 metre",
    "physical_growth_form": "Piramidal taçlı, yatay katlı dallı, dipten sürgün veren",
    "leaf_description": "Mızrak biçimli, 3-7 cm, sert, derimsi, ucu sivri; altı 2 beyaz stoma bantlı; kışın bronzlaşır.",
    "flower_description": "Tek evcikli. Erkek çiçekler demetler halinde; dişi kozalaklar sürgün ucunda.",
    "flower_color": "Kahverengi",
    "fruit_seed_info": "2.5–3 cm boyunda derimsi pullu kozalaklar.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s29_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s29_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s29_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s29_img4.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s30_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s30_img2.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güney ve Orta Çin, Tayvan",
      "natural_habitat": "Dağ vadileri ve ormanlar",
      "regions": "Doğu Asya, ılıman nemli parklar",
      "climate_preference": "Ilıman, nemli, sıcak yazlı iklimler.",
      "placement": "Dış mekân / Geniş parklar, arboretumlar",
      "landscape_use": "Soliter ağaç, egzotik ibreli kompozisyonları."
    },
    "care": {
      "light_need": "Güneş - Yarı gölge",
      "watering_need": "Orta-yüksek sulama",
      "humidity_need": "Yüksek nem",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Asidik, derin, verimli topraklar.",
      "soil_ph": "5.0 - 6.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda dengeli gübre.",
      "pruning_need": "Dipten çıkan fazla sürgünler temizlenebilir.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Yaprak uçları batıcıdır."
    },
    "usage": {
      "medical_use": "Odun yağı geleneksel tıpta kullanılmıştır.",
      "traditional_use": "Çin'de dayanıklı kerestesiyle tapınak ve gemi yapımında kullanılır.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "Geniş mızraksı ibreleri ve bronz kış rengiyle dikkat çeker.",
      "other_notes": "Kök kütüğünden yeniden sürgün verme yeteneğine sahiptir."
    }
  },
  {
    "turkish_name": "Mamut Ağacı, Dev Sekoya, Dağ Sekoyası",
    "scientific_name": "Sequoiadendron giganteum",
    "english_name": "Giant Sequoia, Sierra Redwood",
    "alternative_names": "Sequoia gigantea, Wellingtonia",
    "family": "Cupressaceae",
    "genus": "Sequoiadendron",
    "description": "50-85 m boya ve 8-10 m gövde çapına ulaşabilen, dünyanın en hacimli canlısı olan, kalın kırmızı süngerimsi kabuklu dev anıt ağacıdır.",
    "physical_avg_height": "50–85 metre",
    "physical_avg_width": "10–15 metre",
    "physical_growth_form": "Devasa konik gövdeli, kalın kırmızı süngerimsi kabuklu piramidal ulu ağaç",
    "leaf_description": "Biz veya pul biçimli, sürgünü spiral saran mavimsi-yeşil sert yapraklar; anason kokuludur.",
    "flower_description": "Tek evcikli. Sarı erkek çiçekler ve oval odunsu dişi kozalaklar.",
    "flower_color": "Kırmızımsı kahverengi",
    "fruit_seed_info": "5–8 cm boyunda, oval, kalın odunsu kalkan pullu kozalaklar.",
    "flowering_period": "İlkbahar / Kozalak 2 yılda olgunlaşır",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s41_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img4.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s43_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "ABD - Kaliforniya (Sierra Nevada Dağları)",
      "natural_habitat": "1400–2150 m rakımlı dağ korulukları",
      "regions": "Kaliforniya, Avrupa ve Türkiye'nin ılıman-serin büyük parkları",
      "climate_preference": "Kışları karlı ve serin, yazları dağ iklimi; -25°C soğuğa dayanır.",
      "placement": "Dış mekân / Çok geniş kampüsler, botanik bahçeleri, büyük parklar",
      "landscape_use": "Anıtsal simge ağaç, soliter odak noktası, asırlık prestij peyzajı."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Gençken düzenli sulama, köklendikten sonra kuraklığa dayanır.",
      "humidity_need": "Orta",
      "temperature_need": "-25°C",
      "temperature_min": -25,
      "soil_type": "Derin, gevşek, kumlu-tınlı, iyi drene topraklar.",
      "soil_ph": "6.0 - 7.5",
      "drainage_need": "Çok iyi drenaj",
      "fertilizing_info": "İlkbaharda kompost.",
      "pruning_need": "Asla budanmaz.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Yüksek tanen içerir.",
      "traditional_use": "Amerikan yerlileri için kutsal ağaçtır.",
      "beekeeping_value": "Orta",
      "ornamental_use": "Süngerimsi tarçın kırmızısı kabuğu ve devasa gövdesiyle doğanın en büyük anıtıdır.",
      "other_notes": "Kabuğu yangınlara karşı doğal zırh gibidir."
    }
  },
  {
    "turkish_name": "Sahil Sekoyası, Kıyı Sekoyası",
    "scientific_name": "Sequoia sempervirens",
    "english_name": "Coast Redwood, California Redwood",
    "alternative_names": "Kızıl Ağaç, Kıyı Sekoyası",
    "family": "Cupressaceae",
    "genus": "Sequoia",
    "description": "60-115 m boya ulaşabilen (dünyanın en uzun canlısı), sütun gibi dimdik yükselen gövdeli, kızıl-kahve lifli kabuklu muazzam bir okyanus kıyısı ağacıdır.",
    "physical_avg_height": "60–115 metre",
    "physical_avg_width": "8–12 metre",
    "physical_growth_form": "Göğe dimdik yükselen dev sütun gövde, dar piramidal taç",
    "leaf_description": "Yan sürgünlerde porsuk gibi iki sıralı ve yassı; tepe sürgünlerinde pulsu yapraklar.",
    "flower_description": "Tek evcikli. Sürgün uçlarında küçük erkek ve dişi kozalaklar.",
    "flower_color": "Kahverengi",
    "fruit_seed_info": "1.5–3 cm boyunda küçük, oval, kırmızımsı kahverengi kozalaklar.",
    "flowering_period": "Kış sonu / Kozalak Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s41_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img4.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s43_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "ABD - Pasifik Sahil Şeridi (Kaliforniya ve Oregon)",
      "natural_habitat": "Okyanus sisi alan kıyı vadileri",
      "regions": "Okyanusal nemli kıyılar, Karadeniz ve Marmara kıyı parkları",
      "climate_preference": "Yüksek hava nemi, okyanus sisi ve ılıman kışlar.",
      "placement": "Dış mekân / Sahil parkları, geniş arboretumlar",
      "landscape_use": "Görkemli soliter ağaç, grup koru alanı, rüzgar ve ses perdesi."
    },
    "care": {
      "light_need": "Güneş - Yarı gölge",
      "watering_need": "Bol ve düzenli sulama; nemli toprak ister.",
      "humidity_need": "Çok yüksek nem (%70-90)",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Derin, serin, nemli, asidik alüvyal topraklar.",
      "soil_ph": "5.5 - 6.5",
      "drainage_need": "Nem tutucu ama su basmayan toprak",
      "fertilizing_info": "İlkbaharda organik madde takviyesi.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Antiseptik tanenler içerir.",
      "traditional_use": "Çürümeye dayanıklı kızıl ahşabı tarihi yapılarda kullanılmıştır.",
      "beekeeping_value": "Düşük",
      "ornamental_use": "115 metreye varan boyu (Hyperion) ve kızıl gövdesiyle eşsiz bir botanik şaheserdir.",
      "other_notes": "Suyunun %40'ını doğrudan yapraklarıyla sisten çeker."
    }
  },
  {
    "turkish_name": "Su Ladini, Çin Sekoyası, Yaşayan Fosil Sekoya",
    "scientific_name": "Metasequoia glyptostroboides",
    "english_name": "Dawn Redwood",
    "alternative_names": "Şafak Sekoyası",
    "family": "Cupressaceae",
    "genus": "Metasequoia",
    "description": "25-40 m boylanan, kışın yaprak döken ibreli, tüy gibi yumuşak yaprakları sonbaharda olağanüstü bakır-kızıl renklere bürünen hızlı büyüyen ulu ağaçtır.",
    "physical_avg_height": "25–40 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Dar piramidal simetrik, oluklu kırmızımsı-turuncu gövdeli",
    "leaf_description": "Yumuşak, taze açık yeşil; sonbaharda alev kırmızısı ve bakır-bronz renge dönerek dökülür.",
    "flower_description": "Tek evcikli. Sarkık erkek salkımlar ve küçük dişi kozalaklar.",
    "flower_color": "Açık kahverengi",
    "fruit_seed_info": "1.5–2.5 cm boyunda küremsi kalkan pullu kozalaklar.",
    "flowering_period": "İlkbahar / Sonbahar yaprak dökümü",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s41_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s42_img4.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-5-1_s43_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Orta Çin (Hubei vadileri)",
      "natural_habitat": "Nehir kıyıları ve sulak vadiler",
      "regions": "Tüm dünyada ılıman ve sulak parklar",
      "climate_preference": "Ilıman, bol sulak ve nemli alanlar; -30°C soğuğa dayanıklıdır.",
      "placement": "Dış mekân / Gölet ve dere kenarları, sulak parklar, çim alanlar",
      "landscape_use": "Su kenarı peyzajı, sonbahar kızıl renk şöleni, soliter ve sıra ağaçlandırması."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Bol ve sürekli su; ıslak toprağı sever.",
      "humidity_need": "Yüksek nem",
      "temperature_need": "-30°C",
      "temperature_min": -30,
      "soil_type": "Nemli, ıslak, organik maddece zengin topraklar.",
      "soil_ph": "5.5 - 7.0",
      "drainage_need": "Islak ve ağır topraklara en toleranslı ibrelidir.",
      "fertilizing_info": "İlkbaharda kompost.",
      "pruning_need": "Budama gerekmez.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Yapraklarında flavonoidler bulunur.",
      "traditional_use": "1944 yılında keşfedilene kadar soyu tükenmiş sanılıyordu.",
      "beekeeping_value": "Orta",
      "ornamental_use": "Taze yeşil ilkbahar ve alev kırmızısı sonbahar rengiyle peyzajın yıldızıdır.",
      "other_notes": "Kışın yaprak döken nadir kozalaklılardandır."
    }
  },
  {
    "turkish_name": "Doğu Karadeniz Göknarı, Kafkas Göknarı",
    "scientific_name": "Abies nordmanniana subsp. nordmanniana",
    "english_name": "Caucasian Fir, Nordmann Fir",
    "alternative_names": "Abies nordmanniana",
    "family": "Pinaceae",
    "genus": "Abies",
    "description": "50-60 metre boya ulaşabilen, reçinesiz tomurcuklu, sürgünü önden örten parlak koyu yeşil iğneli, 15-20 cm dik silindirik reçineli kozalaklı görkemli Karadeniz orman ağacıdır.",
    "physical_avg_height": "40–60 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Dar piramidal, düzenli katlı dallı, göğe dimdik yükselen ulu ağaç",
    "leaf_description": "2-3.5 cm boyunda, ucu küt veya çentikli, üstü parlak koyu yeşil, altı 2 tebeşir beyazı stoma bantlı; sürgünü fırça gibi örter.",
    "flower_description": "Tek evcikli. Erkek çiçekler açık kırmızı; dişi kozalaklar sürgünde dimdik durur.",
    "flower_color": "Kırmızı erkek / Yeşil-kahve dişi kozalak",
    "fruit_seed_info": "15–20 cm boyunda dik silindirik reçineli kozalak; brakteler dışarı taşar ve geriye kıvrıktır; dökülünce ekseni dalda kalır.",
    "flowering_period": "İlkbahar (Mayıs) / Kozalak Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s1_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s1_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s2_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s3_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s3_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s4_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Türkiye (Doğu Karadeniz) ve Kafkasya",
      "natural_habitat": "1000–2000 m rakımlı nemli dağ ormanları",
      "regions": "Doğu Karadeniz (Artvin, Rize, Trabzon, Giresun) ve Kafkaslar",
      "climate_preference": "Serin, bol yağışlı ve nemli dağ iklimi; yaz kuraklığına duyarlıdır.",
      "placement": "Dış mekân / Geniş parklar, orman alanları, serin dağ bahçeleri",
      "landscape_use": "Soliter simge ağaç, grup park dikimleri, dünyada en kaliteli yılbaşı (Noel) ağacı."
    },
    "care": {
      "light_need": "Yarı gölge veya tam güneş (gençken gölge ister)",
      "watering_need": "Düzenli ve bol sulama; toprak sürekli nemli olmalı.",
      "humidity_need": "Yüksek hava nemi",
      "temperature_need": "-25°C",
      "temperature_min": -25,
      "soil_type": "Derin, serin, nemli, humuslu asidik-tınlı topraklar.",
      "soil_ph": "5.0 - 6.5",
      "drainage_need": "İyi drenajlı ama nem tutucu",
      "fertilizing_info": "İlkbaharda organik kompost.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir; reçinesi hoş kokuludur.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Göknar sakızı ve reçinesi göğüs yumuşatıcı ve yara iyileştirici olarak kullanılır.",
      "traditional_use": "Karadeniz mimarisinde ve kaliteli mobilyacılıkta değerlidir.",
      "beekeeping_value": "Göknar balı (salgı balı) üretiminde çok değerlidir.",
      "ornamental_use": "Kusursuz formu ve parlak koyu yeşil ibreleriyle dünyanın 1 numaralı yılbaşı ağacıdır.",
      "other_notes": "İbreleri kesildikten sonra bile haftalarca dökülmeden taze kalır."
    }
  },
  {
    "turkish_name": "Uludağ Göknarı",
    "scientific_name": "Abies nordmanniana subsp. bornmuelleriana",
    "english_name": "Uludağ Fir, Bornmueller's Fir",
    "alternative_names": "Abies bornmuelleriana (Türkiye Endemiği)",
    "family": "Pinaceae",
    "genus": "Abies",
    "description": "30-40 m boylanan, reçineli tomurcuklu, çıplak sürgünlü, Türkiye'ye özgü endemik ve çok değerli bir göknar alt türüdür.",
    "physical_avg_height": "30–40 metre",
    "physical_avg_width": "6–8 metre",
    "physical_growth_form": "Piramidal taçlı, dik gövdeli ulu orman ağacı",
    "leaf_description": "2-3.5 cm boyunda, üst yüzü parlak koyu yeşil, altı 2 beyaz stoma bantlı; sürgünü üstten fırça gibi örter.",
    "flower_description": "Tek evcikli. Dik silindirik kozalaklar.",
    "flower_color": "Kahverengi",
    "fruit_seed_info": "15–20 cm boyunda dik kozalaklar; brakteler dışarı belirgin taşmaz (örtülüdür).",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s1_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s1_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s2_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s3_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s3_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s4_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Türkiye (Kuzeybatı ve Batı Karadeniz Endemiği)",
      "natural_habitat": "Uludağ, Bolu, Kastamonu, Sinop dağları (1000-2000 m)",
      "regions": "Batı Karadeniz ve Marmara dağ kuşağı",
      "climate_preference": "Nemli, serin dağ iklimi; Kafkas göknarına göre kış kuraklığına ve soğuğa biraz daha toleranslıdır.",
      "placement": "Dış mekân / Parklar, botanik bahçeleri, yüksek rakımlı alanlar",
      "landscape_use": "Soliter park ağacı, grup dikimleri, erozyon kontrolü."
    },
    "care": {
      "light_need": "Yarı gölge - Güneş",
      "watering_need": "Düzenli sulama",
      "humidity_need": "Orta-yüksek",
      "temperature_need": "-25°C",
      "temperature_min": -25,
      "soil_type": "Derin, serin, humuslu dağ toprağı.",
      "soil_ph": "5.5 - 6.8",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda organik gübre.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Reçinesi geleneksel şifada kullanılır.",
      "traditional_use": "Kaliteli ahşap üretimi.",
      "beekeeping_value": "Göknar salgı balı",
      "ornamental_use": "Heybetli formuyla dağ peyzajlarının vazgeçilmezidir.",
      "other_notes": "Yalnızca Türkiye'de yetişen çok değerli bir endemik taksondur."
    }
  },
  {
    "turkish_name": "Kazdağı Göknarı, Truva Göknarı",
    "scientific_name": "Abies nordmanniana subsp. equi-trojani",
    "english_name": "Trojan Fir, Mount Ida Fir",
    "alternative_names": "Abies equi-trojani, Kazdağı Endemiği",
    "family": "Pinaceae",
    "genus": "Abies",
    "description": "25-35 m boylanan, bol reçineli tomurcuklu, sivri uçlu iğne yapraklı, mitolojide Truva Atı'nın yapıldığı efsanevi Kazdağı endemik göknarıdır.",
    "physical_avg_height": "25–35 metre",
    "physical_avg_width": "5–8 metre",
    "physical_growth_form": "Geniş piramidal taçlı, güçlü gövdeli ağaç",
    "leaf_description": "İbrelerin ucu belirgin sivri ve batıcıdır; parlak koyu yeşil, altı çift beyaz stoma çizgili.",
    "flower_description": "Tek evcikli. Dik silindirik 15-20 cm boyunda kozalaklar.",
    "flower_color": "Kahverengi reçineli",
    "fruit_seed_info": "Dik reçineli kozalaklar; brakteler dışarı hafif taşkındır.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s1_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s1_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s2_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s3_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s3_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s4_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Türkiye (Kazdağı / Balıkesir-Çanakkale Endemiği)",
      "natural_habitat": "Kazdağı Milli Parkı (800-1600 m)",
      "regions": "Kazdağları ve Batı Anadolu",
      "climate_preference": "Bol oksijenli, deniz etkili serin dağ iklimi.",
      "placement": "Dış mekân / Özel koleksiyonlar, parklar, anı bahçeleri",
      "landscape_use": "Mitolojik ve tarihi prestij simge ağacı, soliter vurgu."
    },
    "care": {
      "light_need": "Güneş - Yarı gölge",
      "watering_need": "Orta-düzenli sulama",
      "humidity_need": "Orta-yüksek",
      "temperature_need": "-20°C",
      "temperature_min": -20,
      "soil_type": "Derin, iyi drene volkanik-humuslu dağ toprağı.",
      "soil_ph": "5.5 - 6.8",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda hafif kompost.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "İğne uçları sivridir."
    },
    "usage": {
      "medical_use": "Kazdağı zengin oksijen ve göknar terpenleri şifalı kabul edilir.",
      "traditional_use": "Mitolojide Truva Atı'nın Kazdağı göknarından yapıldığı rivayet edilir.",
      "beekeeping_value": "Yüksek kaliteli dağ çam/göknar balı",
      "ornamental_use": "Tarihi ve estetik değeri çok yüksek nadir bir endemiktir.",
      "other_notes": "Dünyada yalnızca Kazdağları'nda doğal olarak yetişir."
    }
  },
  {
    "turkish_name": "Toros Göknarı, Kilikya Göknarı",
    "scientific_name": "Abies cilicica",
    "english_name": "Cilician Fir, Taurus Fir",
    "alternative_names": "Toros Köknarı",
    "family": "Pinaceae",
    "genus": "Abies",
    "description": "25-35 m boylanan, reçinesiz tomurcuklu, 15-25 cm boyundaki dev kozalaklarıyla bölgenin en iri kozalaklı, Toros Dağları'nda sedirle karışım yapan Akdeniz dağ göknarıdır.",
    "physical_avg_height": "25–35 metre",
    "physical_avg_width": "6–8 metre",
    "physical_growth_form": "Dar piramidal, yaşlanınca kubbeleşen gövdeli ulu ağaç",
    "leaf_description": "2-4 cm boyunda, yassı, yumuşak, ucu çentikli veya sivrice, üstü koyu yeşil, altı çift beyaz stoma bantlı.",
    "flower_description": "Tek evcikli. Dik, devasa 15-25 cm boyunda silindirik kozalaklar.",
    "flower_color": "Açık kahverengi reçineli",
    "fruit_seed_info": "15–25 cm boyunda, 6 cm çapında çok iri dik kozalaklar; brakteler pulların içinde saklıdır.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s11_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s11_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s12_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s12_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s13_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-6_s14_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Türkiye (Toros Dağları), Suriye ve Lübnan",
      "natural_habitat": "1000–2000 m Toros kalker dağ yamaçları",
      "regions": "Akdeniz Bölgesi dağ kuşağı (Mersin, Antalya, Adana, Kahramanmaraş)",
      "climate_preference": "Akdeniz dağ iklimi; yaz kuraklığına ve kireçli topraklara diğer göknarlardan daha toleranslıdır.",
      "placement": "Dış mekân / Parklar, dağ bahçeleri, ağaçlandırma sahaları",
      "landscape_use": "Soliter odak ağacı, Toros Sediri ile doğal peyzaj birliktelikleri, erozyon kontrolü."
    },
    "care": {
      "light_need": "Tam güneş veya hafif yarı gölge",
      "watering_need": "Orta sulama; yerleştikten sonra yaz kuraklığına dayanır.",
      "humidity_need": "Orta",
      "temperature_need": "-20°C",
      "temperature_min": -20,
      "soil_type": "Kalkerli, kireçli, taşlı ve iyi drene dağ toprakları.",
      "soil_ph": "6.5 - 8.0",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gençlikte hafif organik gübre.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Reçinesi geleneksel antiseptik olarak kullanılır.",
      "traditional_use": "Tarih boyunca Akdeniz gemi ve tapınak inşaatlarında kullanılmıştır.",
      "beekeeping_value": "Toros dağ balı",
      "ornamental_use": "Dev kozalakları ve asil duruşuyla Akdeniz dağ bahçelerine mükemmel uyum sağlar.",
      "other_notes": "Kireçli toprağa en dayanıklı göknar türlerindendir."
    }
  },
  {
    "turkish_name": "Gümüşi Göknar, Amerikan Ak Göknarı",
    "scientific_name": "Abies concolor",
    "english_name": "White Fir, Colorado Fir",
    "alternative_names": "Colorado Göknarı",
    "family": "Pinaceae",
    "genus": "Abies",
    "description": "30-50 m boylanan, 4-8 cm uzunluğunda orak gibi yukarı kıvrık gümüşi mavi-gri iğne yapraklı, kentsel kuraklığa ve sıcağa en dayanıklı muhteşem süs göknarıdır.",
    "physical_avg_height": "30–50 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Kusursuz simetrik dar piramidal taçlı, yere kadar dallanan asil ağaç",
    "leaf_description": "4-8 cm boyunda (göknarların en uzun yapraklısı), orak biçiminde yukarı kıvrık, her iki yüzü de gümüşi mavi-gri renkli.",
    "flower_description": "Tek evcikli. Dik silindirik 8-14 cm boyunda zeytuni-mor kozalaklar.",
    "flower_color": "Morumsu yeşil / Olgunlaşınca açık kahverengi",
    "fruit_seed_info": "8–14 cm dik kozalaklar; reçinelidir.",
    "flowering_period": "İlkbahar / Kozalak Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s14_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s14_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s15_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s15_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s16_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s16_img2.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Kuzey Amerika (Kayalık Dağları ve Kaliforniya Dağları)",
      "natural_habitat": "1800–3000 m yüksek dağ yamaçları",
      "regions": "Kuzey Amerika, tüm dünyada ılıman ve karasal parklar",
      "climate_preference": "Geniş iklim toleransı; kışın -35°C dondurucu soğuğa, yazın ise kuraklığa ve sıcağa göknarlar arasında en dayanıklı türdür.",
      "placement": "Dış mekân / Prestij parkları, geniş çim alanlar, meydanlar",
      "landscape_use": "Soliter odak ağacı, gümüşi renk kontrastı, prestij konut bahçeleri, yılbaşı ağacı."
    },
    "care": {
      "light_need": "Tam güneş (en iyi gümüşi rengini güneşte alır)",
      "watering_need": "Orta-az sulama; yerleştikten sonra kuraklığa çok dayanıklıdır.",
      "humidity_need": "Düşük-orta (kuru havaya toleranslıdır)",
      "temperature_need": "-35°C",
      "temperature_min": -35,
      "soil_type": "Derin, kumlu, tınlı, iyi drene topraklar.",
      "soil_ph": "5.5 - 7.5",
      "drainage_need": "Mükemmel drenaj; taban suyunu sevmez.",
      "fertilizing_info": "İlkbaharda hafif kompost.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir; ezilen yaprakları taze narenciye/limon kokusu verir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Limon kokulu esansiyel yağları parfümeride kullanılır.",
      "traditional_use": "Kuzey Amerika yerlileri tarafından şifa amaçlı kullanılmıştır.",
      "beekeeping_value": "Orta",
      "ornamental_use": "Gümüşi mavi uzun ibreleri ve kusursuz konik formuyla peyzajın en popüler lüks ibrelisidir.",
      "other_notes": "Şehir havasına, kentsel kirliliğe ve yaz kuraklığına göknarlar arasında en dayanıklı olanıdır."
    }
  },
  {
    "turkish_name": "İspanya Göknarı, Endülüs Göknarı",
    "scientific_name": "Abies pinsapo",
    "english_name": "Spanish Fir",
    "alternative_names": "Pinsapo Göknarı",
    "family": "Pinaceae",
    "genus": "Abies",
    "description": "20-30 m boylanan, sürgün üzerinde fırça gibi ışınsal dizilen kısa, sert ve kalın iğne yapraklarıyla kirpiyi andıran çok dekoratif Akdeniz göknarıdır.",
    "physical_avg_height": "20–30 metre",
    "physical_avg_width": "5–8 metre",
    "physical_growth_form": "Kompakt piramidal, çok sık dallı ve düzenli",
    "leaf_description": "1-1.5 cm boyunda, kısa, kalın, sert, ucu küt; sürgünün her tarafına eşit ışınsal dağılır (fırça gibi); mavimsi-yeşil renklidir.",
    "flower_description": "Tek evcikli. Dik silindirik 10-15 cm morumsu-kahve kozalaklar.",
    "flower_color": "Morumsu kahverengi",
    "fruit_seed_info": "10–15 cm dik kozalaklar.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s21_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s21_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s22_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s23_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s29_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s29_img2.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güney İspanya (Endülüs) ve Kuzey Fas dağları",
      "natural_habitat": "1000–1800 m kalkerli dağ zirveleri",
      "regions": "Akdeniz havzası, Avrupa ve Türkiye parkları",
      "climate_preference": "Sıcak yazlı, kurak Akdeniz dağ iklimi; kireçli toprağa çok dayanıklıdır.",
      "placement": "Dış mekân / Parklar, Akdeniz bahçeleri, taşlık alanlar",
      "landscape_use": "Soliter mimari vurgu ağacı, 'Glauca' mavi formuyla renk odak noktası."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az-orta sulama; kuraklığa çok dayanıklıdır.",
      "humidity_need": "Düşük-orta",
      "temperature_need": "-20°C",
      "temperature_min": -20,
      "soil_type": "Kireçli, taşlı, kalkerli iyi drene topraklar.",
      "soil_ph": "6.5 - 8.2",
      "drainage_need": "Mükemmel drenaj şarttır.",
      "fertilizing_info": "İlkbaharda hafif organik gübre.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "İğneleri serttir."
    },
    "usage": {
      "medical_use": "Reçinesi antiseptiktir.",
      "traditional_use": "Endülüs bölgesinin sembol ağacıdır.",
      "beekeeping_value": "Orta",
      "ornamental_use": "Işınsal kirpi yaprak dokusu ve 'Glauca' kültivarının masmavi rengiyle çok kıymetlidir.",
      "other_notes": "Buzul çağından kalma relikt bir türdür."
    }
  },
  {
    "turkish_name": "Kore Göknarı",
    "scientific_name": "Abies koreana",
    "english_name": "Korean Fir",
    "alternative_names": "Kore Çamı",
    "family": "Pinaceae",
    "genus": "Abies",
    "description": "8-15 m boylanan, küçük bahçelere mükemmel uyan, genç yaşta bile bol miktarda menekşe-mor renkli dik kozalaklar üreten göz alıcı süs göknarıdır.",
    "physical_avg_height": "8–15 metre (Kültivarları 1–3 m)",
    "physical_avg_width": "3–5 metre",
    "physical_growth_form": "Kompakt, geniş piramidal, yavaş büyüyen küçük ağaç",
    "leaf_description": "1-2 cm boyunda, uca doğru genişleyen, üstü koyu yeşil, altı parlak tebeşir beyazı iki stoma bantlı; kıvrıldığında gümüşi parlar.",
    "flower_description": "Tek evcikli. Henüz 1-2 metrelik genç fidanlarda bile bolca muazzam mavi-menekşe kozalaklar açar.",
    "flower_color": "İlk zamanlar parlak menekşe-mor / Olgunlaşınca kahverengi",
    "fruit_seed_info": "4–7 cm boyunda dik duruşlu, menekşe-mavi reçineli kozalaklar.",
    "flowering_period": "İlkbahar / Yaz (mor kozalak dönemi)",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s38_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s38_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s38_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s38_img4.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s39_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-7-1_s39_img2.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güney Kore (Jeju Adası ve güney dağları)",
      "natural_habitat": "1000–1850 m serin dağ zirveleri",
      "regions": "Uzak Doğu, tüm dünya küçük bahçeleri",
      "climate_preference": "Serin, nemli yazlar ve soğuk kışlar; -30°C soğuğa dayanır.",
      "placement": "Dış mekân / Küçük konut bahçeleri, kaya bahçeleri, teraslar",
      "landscape_use": "Soliter süs bitkisi, menekşe kozalak şovu, kaya bahçeleri ('Silberlocke' kıvrık yapraklı formu)."
    },
    "care": {
      "light_need": "Güneş - Yarı gölge",
      "watering_need": "Düzenli sulama; nemli toprak ister.",
      "humidity_need": "Orta-yüksek",
      "temperature_need": "-30°C",
      "temperature_min": -30,
      "soil_type": "Humuslu, asidik-nötr, serin ve iyi drene topraklar.",
      "soil_ph": "5.5 - 6.8",
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
      "medical_use": "Yoktur.",
      "traditional_use": "Kore tapınak bahçelerinde kullanılır.",
      "beekeeping_value": "Düşük-orta",
      "ornamental_use": "Erken yaşta açan mor-menekşe dik kozalakları ve gümüşi parlayan yapraklarıyla en popüler butik bahçe ağacıdır.",
      "other_notes": "'Silberlocke' formu yaprakları geriye kıvrılarak tamamen gümüş gibi parlar."
    }
  },
  {
    "turkish_name": "Toros Sediri, Lübnan Sediri, Katran Ağacı",
    "scientific_name": "Cedrus libani",
    "english_name": "Cedar of Lebanon",
    "alternative_names": "Lübnan Sediri, Toros Sediri",
    "family": "Pinaceae",
    "genus": "Cedrus",
    "description": "30-40 m boya ve asırlık yaşlarda devasa şemsiye/tabla şekilli tepeye ulaşan, yatay katmanlı güçlü dallı, heybetli, kokulu reçineli tarihi ve milli ulu ağacımızdır.",
    "physical_avg_height": "30–40 metre",
    "physical_avg_width": "10–18 metre",
    "physical_growth_form": "Gençken piramidal, yaşlandıkça yatay tabla katlı ve geniş şemsiye tepeli ulu ağaç",
    "leaf_description": "Kısa sürgünlerde 20-40 adetlik demetler halinde dizilen, 1.5-3.5 cm boyunda, sert, batıcı koyu yeşil veya grimsi-yeşil iğne yapraklar.",
    "flower_description": "Tek evcikli. Erkek çiçekler dik silindirik sarı; dişi kozalaklar fıçı biçiminde reçinelidir.",
    "flower_color": "Sarı erkek / Fıçı dişi kozalak",
    "fruit_seed_info": "8–12 cm boyunda, 4-6 cm çapında fıçı biçimli dik duran kozalaklar; 26 ayda olgunlaşır ve pulları dökülerek dağılır.",
    "flowering_period": "Sonbahar (Eylül-Ekim çiçeklenmesi - diğer ibrelilerden farklıdır!)",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s14_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s14_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s15_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s15_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s16_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s16_img2.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Türkiye (Toros Dağları - Dünya popülasyonunun %90'ı) ve Lübnan",
      "natural_habitat": "1000–2100 m kalkerli Toros yamaçları",
      "regions": "Toroslar (Antalya, Isparta, Muğla, Mersin, Adana), Lübnan",
      "climate_preference": "Akdeniz dağ iklimi; yaz kuraklığına, yakıcı güneşe ve kışın -25°C soğuğa çok dayanıklıdır.",
      "placement": "Dış mekân / Büyük parklar, kampüsler, meydanlar, tarihi alanlar",
      "landscape_use": "Anıtsal soliter simge ağaç, rüzgar kalkanı, geniş perspektif odak noktası, erozyon ıslahı."
    },
    "care": {
      "light_need": "Tam güneş (gölgeden kesinlikle hoşlanmaz)",
      "watering_need": "Gençlikte orta sulama; köklendikten sonra aşırı kuraklığa dayanıklıdır.",
      "humidity_need": "Düşük-orta",
      "temperature_need": "-25°C",
      "temperature_min": -25,
      "soil_type": "Kireçli, kalkerli, taşlı, derin ve çok iyi drene topraklar.",
      "soil_ph": "6.5 - 8.5",
      "drainage_need": "Mükemmel drenaj; su basmasına dayanamaz.",
      "fertilizing_info": "Gençlikte hafif kompost.",
      "pruning_need": "Budanmaz; alt dalları gövdeye kadar geniş yatay tablalar yapar.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir; odunu ve reçinesi fevkalade güzel kokuludur.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "İğne uçları batıcıdır."
    },
    "usage": {
      "medical_use": "Sedir katranı cilt hastalıkları ve antiseptik olarak asırlardır kullanılır.",
      "traditional_use": "Süleyman Mabedi, Firavun lahitleri ve tarihi gemiler çürümeyen sedir odunundan yapılmıştır.",
      "beekeeping_value": "Sedir salgı balı çok kıymetlidir.",
      "ornamental_use": "Asırlık tabla formu ve görkemiyle peyzajın tartışmasız en asil ağaçlarındandır.",
      "other_notes": "Lübnan bayrağının simgesidir; dünyadaki en geniş sedir ormanları Türkiye'dedir."
    }
  },
  {
    "turkish_name": "Atlas Sediri, Mavi Sedir",
    "scientific_name": "Cedrus atlantica",
    "english_name": "Atlas Cedar, Blue Atlas Cedar",
    "alternative_names": "Cedrus libani subsp. atlantica",
    "family": "Pinaceae",
    "genus": "Cedrus",
    "description": "30-40 m boylanan, dik tepe sürgününe sahip, 'Glauca' kültivarıyla masmavi-gümüşi renkli, kuvvetli rüzgarlara ve kuraklığa son derece dayanıklı prestij sediridir.",
    "physical_avg_height": "30–40 metre",
    "physical_avg_width": "8–12 metre",
    "physical_growth_form": "Piramidalden genişleyen güçlü dallı konik taç",
    "leaf_description": "Kısa sürgünlerde 19-28 adetlik demetler halinde, 1.5-2.5 cm boyunda, gümüşi mavi-yeşil iğneler.",
    "flower_description": "Tek evcikli. Dik silindirik sarımsı erkek çiçekler ve fıçı kozalaklar.",
    "flower_color": "Sarı / Fıçı kozalak",
    "fruit_seed_info": "5–7 cm boyunda fıçı biçimli dik kozalaklar.",
    "flowering_period": "Sonbahar (Eylül - Ekim)",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s27_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s27_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s28_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s28_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s28_img3.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s29_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Kuzey Afrika (Fas ve Cezayir - Atlas Dağları)",
      "natural_habitat": "1300–2200 m Atlas Dağları",
      "regions": "Kuzey Afrika, tüm dünya park ve bahçeleri",
      "climate_preference": "Ilıman, kurak ve yarı kurak iklimler; -20°C soğuğa dayanır.",
      "placement": "Dış mekân / Parklar, meydanlar, prestij alanları",
      "landscape_use": "Soliter odak ağacı ('Glauca' masmavi formu), rüzgar perdesi, kentsel yeşil alanlar."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Orta-az sulama; kuraklığa olağanüstü dayanıklıdır.",
      "humidity_need": "Düşük",
      "temperature_need": "-20°C",
      "temperature_min": -20,
      "soil_type": "Kireçli veya hafif asidik, iyi drene topraklar.",
      "soil_ph": "6.0 - 8.0",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "İlkbaharda hafif kompost.",
      "pruning_need": "Budanmaz ('Glauca Pendula' formu hariç destekle şekillendirilir).",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "İğneleri batıcıdır."
    },
    "usage": {
      "medical_use": "Sedir ağacı yağı aromaterapide kullanılır.",
      "traditional_use": "Kokulu ahşabı güve kovucu olarak dolap yapımında kullanılır.",
      "beekeeping_value": "Orta",
      "ornamental_use": "'Glauca' kültivarı masmavi rengiyle peyzajın en çok tercih edilen mavi ibrelisidir.",
      "other_notes": "Kuvvetli rüzgarlara karşı en dayanıklı ibreli ağaçlardandır."
    }
  },
  {
    "turkish_name": "Himalaya Sediri, Tanrı Ağacı",
    "scientific_name": "Cedrus deodara",
    "english_name": "Deodar Cedar, Himalayan Cedar",
    "alternative_names": "Deodar Sediri",
    "family": "Pinaceae",
    "genus": "Cedrus",
    "description": "40-50 m boylanan, sarkıcı zarif lider sürgünü ve dal uçlarıyla sedirlerin en narin ve romantik görünümlü, 3-5 cm uzunluğunda yumuşak ibreli türüdür.",
    "physical_avg_height": "40–50 metre",
    "physical_avg_width": "8–12 metre",
    "physical_growth_form": "Piramidal taçlı, dal uçları ve tepe sürgünü zarifçe aşağı sarkan heykelsi ağaç",
    "leaf_description": "Sedirler içinde en uzun ibrelisi (3-5 cm); parlak açık yeşil veya mavimsi-yeşil, yumuşakça.",
    "flower_description": "Tek evcikli. Fıçı biçimli dik kozalaklar.",
    "flower_color": "Açık kahverengi",
    "fruit_seed_info": "7–10 cm boyunda fıçı kozalaklar.",
    "flowering_period": "Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s46_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s46_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s47_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s47_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s48_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-88_s49_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Batı Himalayalar (Afganistan, Pakistan, Hindistan, Nepal)",
      "natural_habitat": "1500–3200 m Himalaya yamaçları",
      "regions": "Himalayalar, Akdeniz ve ılıman dünya parkları",
      "climate_preference": "Ilıman ve nemli iklimleri sever; aşırı kuru ve donlu karasal bölgelerde gençken korunmalıdır (-15°C).",
      "placement": "Dış mekân / Geniş çim alanlar, parklar, sahil kordonları",
      "landscape_use": "Zarif soliter odak ağacı, sarkıcı dal formuyla romantik bahçe tasarımları."
    },
    "care": {
      "light_need": "Tam güneş veya hafif yarı gölge",
      "watering_need": "Düzenli ve orta sulama",
      "humidity_need": "Orta-yüksek",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Derin, verimli, iyi drene, nemli topraklar.",
      "soil_ph": "6.0 - 7.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda organik gübre.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir; kokulu odun.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Himalaya sedir yağı Ayurveda tıbbında kullanılır.",
      "traditional_use": "Sanskritçe 'Devadaru' (Tanrıların Ağacı) anlamına gelir; tapınak çevrelerine dikilir.",
      "beekeeping_value": "Orta",
      "ornamental_use": "Zarifçe sarkan dal uçları ve narin dokusuyla sedirlerin en zarifidir.",
      "other_notes": "Parklarda heybetiyle göz doldurur."
    }
  },
  {
    "turkish_name": "Doğu Ladini, Kafkas Ladini",
    "scientific_name": "Picea orientalis",
    "english_name": "Caucasian Spruce, Oriental Spruce",
    "alternative_names": "Doğu Ladini",
    "family": "Pinaceae",
    "genus": "Picea",
    "description": "40-50 m boylanan, 6-10 mm boyundaki minik, parlak koyu yeşil ve batıcı olmayan ibreleriyle ladinlerin en kısa yapraklı, Doğu Karadeniz'in simge ağacıdır.",
    "physical_avg_height": "40–50 metre",
    "physical_avg_width": "6–8 metre",
    "physical_growth_form": "Sık dallı, dar piramidal sütunsu taçlı, yere kadar dallanan ulu ağaç",
    "leaf_description": "6-10 mm (çok kısa), dört köşeli, ucu küt ve batmayan, cila gibi parlak koyu zümrüt yeşili iğneler.",
    "flower_description": "Tek evcikli. Erkek çiçekler kırmızı; dişi kozalaklar sürgünden aşağı sarkar.",
    "flower_color": "Gençken yakut kırmızısı-mor / Olgunlaşınca parlak deri kahverengi",
    "fruit_seed_info": "6–9 cm boyunda, ince silindirik, aşağıya sarkık, parlak pürüzsüz pullu kozalaklar; ladinlerde kozalak bütün olarak dökülür.",
    "flowering_period": "İlkbahar (Mayıs) / Kozalak Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s10_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s11_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s12_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s13_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s13_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s14_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Türkiye (Doğu Karadeniz) ve Kafkasya",
      "natural_habitat": "1000–2200 m sisli ve bol yağışlı Karadeniz dağları",
      "regions": "Doğu Karadeniz (Trabzon, Rize, Artvin, Giresun)",
      "climate_preference": "Bol yağışlı, yüksek nemli ve serin dağ iklimi; yaz kuraklığına duyarlıdır.",
      "placement": "Dış mekân / Parklar, serin nemli bahçeler, koru alanları",
      "landscape_use": "Soliter odak ağacı, rüzgar perdesi, 'Aurea' formuyla altın sarısı ilkbahar sürgün vurgusu."
    },
    "care": {
      "light_need": "Yarı gölge veya tam güneş",
      "watering_need": "Düzenli ve bol sulama; toprak sürekli nemli tutulmalıdır.",
      "humidity_need": "Yüksek hava nemi (%70-90)",
      "temperature_need": "-30°C",
      "temperature_min": -30,
      "soil_type": "Derin, serin, asidik, nemli ve humuslu topraklar.",
      "soil_ph": "4.5 - 6.0",
      "drainage_need": "Nem tutucu ama iyi havalanan toprak",
      "fertilizing_info": "İlkbaharda asidik kompost.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 3
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "İbreleri batıcı değildir (diğer ladinlerin aksine küt uçludur)."
    },
    "usage": {
      "medical_use": "Taze sürgünleri C vitamini ve çam sakızı içerir.",
      "traditional_use": "Akustik kalitesi yüksek rezonans odunu keman ve piyano yapımında dünyaca ünlüdür.",
      "beekeeping_value": "Ladin balı üretimi",
      "ornamental_use": "Koyu zümrüt parlaklığı ve yakut renkli genç kozalaklarıyla birinci sınıf park ağacıdır.",
      "other_notes": "Ladinler kozalaklarını göknarlar gibi parçalamaz, bütün halde yere döker."
    }
  },
  {
    "turkish_name": "Mavi Ladin, Colorado Mavi Ladini",
    "scientific_name": "Picea pungens",
    "english_name": "Blue Spruce, Colorado Blue Spruce",
    "alternative_names": "Gümüşi Ladin",
    "family": "Pinaceae",
    "genus": "Picea",
    "description": "25-35 m boylanan, 2-3 cm boyunda çok sert ve batıcı gümüşi çelik mavisi iğne yapraklı, piramidal formlu dünyanın en ünlü mavi ibreli süs ağacıdır.",
    "physical_avg_height": "25–35 metre",
    "physical_avg_width": "6–9 metre",
    "physical_growth_form": "Kusursuz geometrik piramidal taçlı, yere kadar sıkı dallı",
    "leaf_description": "2-3 cm boyunda, dört köşeli, ucu çok sivri ve batıcı; üzeri kalın mumsu gümüşi mavi-beyaz tabaka ile kaplıdır.",
    "flower_description": "Tek evcikli. Sürgün uçlarında aşağı sarkan açık kahverengi dalgalı pullu kozalaklar.",
    "flower_color": "Açık saman kahverengisi",
    "fruit_seed_info": "6–10 cm boyunda silindirik, esnek dalgalı pullu sarkık kozalaklar.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s23_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s23_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s24_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s24_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s24_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-10_s25_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "ABD (Kayalık Dağları - Colorado, Utah, Wyoming)",
      "natural_habitat": "1800–3000 m dağ dereleri kenarı",
      "regions": "Kuzey Amerika, tüm dünyada parklar ve bahçeler",
      "climate_preference": "Karasal iklimlere, -40°C kış dondurucu soğuklarına ve hava kirliliğine ladinler içinde en dayanıklısıdır.",
      "placement": "Dış mekân / Prestij bahçeleri, parklar, meydanlar, kavşaklar",
      "landscape_use": "Soliter renk odak noktası ('Hoopsii', 'Koster' kültivarları), yılbaşı ağacı, mimari vurgu."
    },
    "care": {
      "light_need": "Tam güneş (yoğun güneş ışığında mumu artarak daha mavi olur)",
      "watering_need": "Orta sulama; yerleştikten sonra kuraklığa diğer ladinlerden daha dayanıklıdır.",
      "humidity_need": "Orta",
      "temperature_need": "-40°C",
      "temperature_min": -40,
      "soil_type": "Geçirgen, tınlı-kumlu, hafif asidik-nötr topraklar.",
      "soil_ph": "5.5 - 7.0",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda hafif dengeli gübre.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "İğneleri çok batıcı ve sivridir!"
    },
    "usage": {
      "medical_use": "Reçinesi antiseptiktir.",
      "traditional_use": "Colorado ve Utah eyaletlerinin resmi ağacıdır.",
      "beekeeping_value": "Orta",
      "ornamental_use": "Göz kamaştırıcı çelik mavisi rengi ve kusursuz konik formuyla peyzajın en popüler mavi ağacıdır.",
      "other_notes": "Mavi renk yaprağın üzerindeki doğal mum tabakasından kaynaklanır."
    }
  },
  {
    "turkish_name": "Sarıçam",
    "scientific_name": "Pinus sylvestris",
    "english_name": "Scots Pine, Scotch Pine",
    "alternative_names": "Sarı Çam",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "20-40 m boylanan, gövdesinin üst kısmındaki tilki sarısı-turuncu renkli soyulan kabuğuyla ve ikili mavi-yeşil burkuk ibreleriyle tanınan, soğuğa en dayanıklı milli çamımızdır.",
    "physical_avg_height": "20–40 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Gençken piramidal, yaşlanınca şemsiye/kubbe taçlı, üst gövdesi parlak turuncu-sarı kabuklu",
    "leaf_description": "Kısa sürgünde 2'li demet halinde, 4-7 cm boyunda, mavimsi-yeşil, ekseni etrafında hafifçe burkulmuş sert iğneler.",
    "flower_description": "Tek evcikli. Sarı erkek çiçekler ve küçük konik dişi kozalaklar.",
    "flower_color": "Sarı erkek / Mat gri-kahve kozalak",
    "fruit_seed_info": "3–7 cm boyunda küçük, sivri uçlu, mat gri-kahverengi kısa saplı kozalaklar.",
    "flowering_period": "İlkbahar (Mayıs - Haziran) / Kozalak 2 yılda olgunlaşır",
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
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s14_img1.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Avrupa ve Asya (Türkiye'de Karadeniz ve İç Anadolu dağlarında geniş ormanlar)",
      "natural_habitat": "1000–2500 m yüksek dağ kuşağı (Sarıkamış ormanları)",
      "regions": "Kuzey Anadolu, Sarıkamış, Bolu, İç Anadolu dağları",
      "climate_preference": "Sert karasal ve dağ iklimi; -45°C dondurucu soğuklara olağanüstü dayanıklıdır.",
      "placement": "Dış mekân / Geniş parklar, dağ bahçeleri, ağaçlandırma sahaları",
      "landscape_use": "Soliter ağaç (turuncu gövde ve mavi ibre kontrastı), rüzgar perdesi, grup orman alanı."
    },
    "care": {
      "light_need": "Tam güneş (tam bir ışık ağacıdır)",
      "watering_need": "Az-orta; kuraklığa ve kumlu topraklara çok dayanıklıdır.",
      "humidity_need": "Düşük-orta",
      "temperature_need": "-45°C",
      "temperature_min": -45,
      "soil_type": "Kumlu, fakir, asidik veya nötr geçirgen topraklar.",
      "soil_ph": "5.0 - 7.0",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gübre istemez.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Toksik değildir; taze sürgünleri çam çayı olarak demlenebilir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Çam terebentini ve sürgünleri solunum yolları tedavisinde kullanılır.",
      "traditional_use": "Üstün kaliteli inşaat ve doğrama kerestesi.",
      "beekeeping_value": "Çam balı ve polen kaynağı",
      "ornamental_use": "Üst gövdesinin tilki sarısı kabuk dokusu kış peyzajında eşsizdir.",
      "other_notes": "Sarıkamış ormanlarının ünlü 'Kristal Kar' altındaki asil ağacıdır."
    }
  },
  {
    "turkish_name": "Karaçam, Anadolu Karaçamı",
    "scientific_name": "Pinus nigra",
    "english_name": "Black Pine, Austrian Pine",
    "alternative_names": "Pinus nigra subsp. pallasiana",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "25-40 m boylanan, koyu siyahımsı-gri derin çatlaklı kabuklu, 2'li demet halinde sert, batıcı koyu yeşil iğneli, kuraklığa ve soğuğa en dirençli orman ağaçlarımızdandır.",
    "physical_avg_height": "25–40 metre",
    "physical_avg_width": "8–12 metre",
    "physical_growth_form": "Geniş piramidal, yaşlanınca düz tepeli şemsiye formlu, kalın koyu gövdeli",
    "leaf_description": "2'li demet halinde, 8-16 cm boyunda, koyu parlak yeşil, çok sert, kalın ve batıcı iğneler.",
    "flower_description": "Tek evcikli. Sarı erkek çiçekler ve parlak kahverengi kozalaklar.",
    "flower_color": "Sarı / Parlak sarı-kahverengi kozalak",
    "fruit_seed_info": "5–10 cm boyunda parlak sarımsı-kahverengi simetrik kozalaklar.",
    "flowering_period": "İlkbahar / Kozalak 2. yıl sonbaharında açılır",
    "images": [
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
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s19_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-11-1_s19_img3.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güney Avrupa, Balkanlar ve Türkiye (Batı, Orta ve Güney Anadolu)",
      "natural_habitat": "400–1800 m dağ yamaçları",
      "regions": "Tüm Anadolu dağ kuşağı, İç Anadolu erozyon sahaları",
      "climate_preference": "Sert karasal, kurak ve donlu iklimler; kireçli toprağa, rüzgara ve -30°C soğuğa çok dayanıklıdır.",
      "placement": "Dış mekân / Parklar, otoyol şevleri, rüzgar kırma kuşakları, ormanlar",
      "landscape_use": "Rüzgar ve ses perdesi, erozyon kontrolü, kentsel yeşil alanlar, soliter ulu ağaç."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az sulama; olağanüstü kuraklık dayanımı.",
      "humidity_need": "Düşük",
      "temperature_need": "-30°C",
      "temperature_min": -30,
      "soil_type": "Kireçli, killi, fakir, taşlı her türlü toprak.",
      "soil_ph": "6.0 - 8.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "Gübre istemez.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "İğneleri sert ve batıcıdır."
    },
    "usage": {
      "medical_use": "Reçinesi çıban ve yara merhemlerinde kullanılır.",
      "traditional_use": "Maden direği, telefon direği ve demiryolu traversi yapımında dayanıklılığıyla meşhurdur.",
      "beekeeping_value": "Polen ve çam salgısı",
      "ornamental_use": "Koyu siyah gövdesi ve yoğun ibre kütlesiyle güçlü bir fon oluşturur.",
      "other_notes": "Toprak istekleri bakımından en kanaatkar çam türüdür."
    }
  },
  {
    "turkish_name": "Kızılçam, Türk Çamı",
    "scientific_name": "Pinus brutia",
    "english_name": "Turkish Pine, Calabrian Pine",
    "alternative_names": "Doğu Akdeniz Çamı",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "15-25 m boylanan, kızıl-kahverengi kabuklu, 2'li demet halinde açık fıstık yeşili iğneli, gövde ve kalın dallara sapsız oturan reçineli kozalaklarıyla Akdeniz'in en yaygın asli orman ağacıdır.",
    "physical_avg_height": "15–25 metre",
    "physical_avg_width": "6–10 metre",
    "physical_growth_form": "Geniş dağınık tepeli, gençken konik yaşlanınca yuvarlak taçlı",
    "leaf_description": "2'li demet halinde, 10-18 cm boyunda, açık canlı fıstık yeşili, ince ve esnek iğneler.",
    "flower_description": "Tek evcikli. Kozalakları sapsız olarak doğrudan gövde ve kalın dallara dik/yatay yapışıktır.",
    "flower_color": "Kırmızımsı kahverengi kozalak",
    "fruit_seed_info": "6–11 cm boyunda, sapsız veya çok kısa saplı, kalın parlak pullu kozalaklar; ağaç üzerinde yıllarca açılmadan kalabilir.",
    "flowering_period": "İlkbahar (Mart - Nisan)",
    "images": [],
    "habitat": {
      "origin": "Doğu Akdeniz Havzası (Dünyanın en geniş kızılçam ormanları Türkiye'dedir)",
      "natural_habitat": "0–1200 m Akdeniz ve Ege kıyı kuşağı",
      "regions": "Akdeniz, Ege, Marmara kıyıları",
      "climate_preference": "Akdeniz iklimi; yaz kuraklığına, yüksek sıcağa ve yangın ekolojisine uyarlanmıştır.",
      "placement": "Dış mekân / Sahil parkları, yol boyu yeşillendirme, koruluklar",
      "landscape_use": "Sahil peyzajı, erozyon önleme, Akdeniz bitki örtüsü restorasyonu."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az sulama; aşırı yaz kuraklığına tam dayanıklıdır.",
      "humidity_need": "Düşük-orta",
      "temperature_need": "-10°C",
      "temperature_min": -10,
      "soil_type": "Kireçli, kalkerli, taşlı, fakir Akdeniz toprakları.",
      "soil_ph": "6.5 - 8.2",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "Gerekmez.",
      "pruning_need": "Budanmaz.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Kozalak pulları serttir."
    },
    "usage": {
      "medical_use": "Çam reçinesi ve yağı.",
      "traditional_use": "Dünyaca ünlü Türk Çam Balı'nın ana kaynağıdır (Marchalina hellenica böceğinin salgısıyla).",
      "beekeeping_value": "Türkiye'nin dünyada 1 numara olduğu 'Çam Balı'nın tek üreticisi!",
      "ornamental_use": "Açık yeşil taze ibre rengi ve Akdeniz sahil dokusu yaratmasıyla değerlidir.",
      "other_notes": "Yangın sonrası tohumları serbest bırakarak kendini yenileyen pirofitik bir türdür."
    }
  },
  {
    "turkish_name": "Fıstık Çamı",
    "scientific_name": "Pinus pinea",
    "english_name": "Stone Pine, Umbrella Pine, Italian Pine",
    "alternative_names": "Şemsiye Çamı",
    "family": "Pinaceae",
    "genus": "Pinus",
    "description": "15-25 m boylanan, devasa kusursuz bir şemsiye/mantar tepesi oluşturan, iri küremsi kozalaklarında dünyaca ünlü lezzetli 'çam fıstığı' üreten asil Akdeniz ağacıdır.",
    "physical_avg_height": "15–25 metre",
    "physical_avg_width": "10–18 metre",
    "physical_growth_form": "Kusursuz kubbeli dev şemsiye taçlı, alt dalları dökülen heykelsi ağaç",
    "leaf_description": "2'li demet halinde, 10-18 cm boyunda, parlak canlı yeşil, fırça gibi sık ibreler.",
    "flower_description": "Tek evcikli. Büyük küremsi parlak kestane renkli kozalaklar.",
    "flower_color": "Parlak kestane kahverengi",
    "fruit_seed_info": "10–15 cm boyunda devasa ağır küresel kozalaklar; içinde sert kabuklu, lezzetli ve çok değerli 'Çam Fıstığı' tohumları bulunur (3 yılda olgunlaşır).",
    "flowering_period": "İlkbahar / Kozalak 3. yılda olgunlaşır",
    "images": [],
    "habitat": {
      "origin": "Akdeniz Havzası (Türkiye'de Bergama Kozak Yaylası, Aydın, Antalya, Kahramanmaraş)",
      "natural_habitat": "Kıyı kumulları ve alçak tepeler",
      "regions": "Ege, Akdeniz, Marmara sahil kuşağı",
      "climate_preference": "Akdeniz iklimi, kumlu sahil rüzgarlarına ve sıcağa çok dayanıklıdır; -12°C soğuğa dayanır.",
      "placement": "Dış mekân / Sahil parkları, geniş meydanlar, prestij siteleri, golf sahaları",
      "landscape_use": "Gölge sağlayan muazzam şemsiye taç, soliter simge ağaç, sahil kordonları, fıstık üretimi."
    },
    "care": {
      "light_need": "Tam güneş (yoğun ışık ister)",
      "watering_need": "Az sulama; kuraklığa ve kumlu toprağa mükemmel uyumludur.",
      "humidity_need": "Düşük-orta",
      "temperature_need": "-12°C",
      "temperature_min": -12,
      "soil_type": "Derin, gevşek kumlu, granit kökenli iyi drene topraklar.",
      "soil_ph": "5.5 - 7.5",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gübre istemez.",
      "pruning_need": "Budanmaz; alt dallarını kendisi budayarak şemsiye formunu doğal oluşturur.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Tohumları (çam fıstığı) son derece lezzetli ve besleyicidir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Düşen ağır kozalaklarına dikkat edilmelidir."
    },
    "usage": {
      "medical_use": "Çam fıstığı yüksek protein, E vitamini ve mineral deposudur.",
      "traditional_use": "Türk mutfağında dolma, helva ve zeytinyağlıların vazgeçilmezidir (Kozak fıstığı).",
      "beekeeping_value": "Polen kaynağı",
      "ornamental_use": "Görkemli şemsiye silüetiyle Akdeniz sahil ve villa peyzajının en prestijli ağacıdır.",
      "other_notes": "Kozalaklarının olgunlaşması 3 yıl sürer."
    }
  },
  {
    "turkish_name": "Akdeniz Servisi, Kara Servi, Sütun Servi",
    "scientific_name": "Cupressus sempervirens",
    "english_name": "Mediterranean Cypress, Italian Cypress",
    "alternative_names": "Sütun Servi ('Stricta'), Piramidal Servi",
    "family": "Cupressaceae",
    "genus": "Cupressus",
    "description": "20-30 m boylanan, göğe ok gibi yükselen kusursuz dar sütun formuyla Akdeniz kültürünün, tarihi anıtların ve zarif mezarlıkların asil sembol ağacıdır.",
    "physical_avg_height": "20–30 metre",
    "physical_avg_width": "1.5–3 metre (sütun formunda)",
    "physical_growth_form": "Kusursuz dar sütunsu ('Stricta') veya yatay dallı ('Horizontalis') ulu ağaç",
    "leaf_description": "Pul biçimli, küçük (0.5-1 mm), koyu zümrüt yeşili, sürgünleri dört köşeli kiremitvari sıkıca örten yapraklar; ezilince reçine kokar.",
    "flower_description": "Tek evcikli. Küremsi 2.5-4 cm çapında gri-kahverengi odunsu kozalaklar.",
    "flower_color": "Gri-kahverengi",
    "fruit_seed_info": "2.5–4 cm çapında kalkan biçimli 8-14 pullu küresel sert kozalaklar; 2 yılda olgunlaşır.",
    "flowering_period": "İlkbahar (Mart)",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s22_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s22_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s22_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s22_img4.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s23_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s24_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Doğu Akdeniz Havzası (Türkiye - Antalya Köprülü Kanyon doğal ormanı, Kıbrıs, Yunanistan)",
      "natural_habitat": "Kalkerli Akdeniz kayalıkları ve vadileri",
      "regions": "Tüm Akdeniz havzası, Ege, Güney Avrupa",
      "climate_preference": "Akdeniz iklimi; aşırı yaz kuraklığına, rüzgara ve sıcağa çok dayanıklıdır; -15°C donlara dayanır.",
      "placement": "Dış mekân / Villa girişleri, cadde aksları, simetrik bahçeler, rüzgar perdeleri",
      "landscape_use": "Dikey mimari vurgu, resmi giriş aksı (Ale), rüzgar kıran, İtalyan Rönesans bahçe tarzı."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az sulama; köklendikten sonra su istemez.",
      "humidity_need": "Düşük",
      "temperature_need": "-15°C",
      "temperature_min": -15,
      "soil_type": "Kireçli, fakir, taşlı, kuru iyi drene topraklar.",
      "soil_ph": "6.5 - 8.5",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gübre istemez.",
      "pruning_need": "Budanmaz; formunu doğal olarak korur.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Uçucu servi yağı varis tedavisinde ve dolaşım düzenleyici olarak kullanılır.",
      "traditional_use": "Çürümeyen kokulu odunundan tarihi cami kapıları ve sandıklar yapılmıştır.",
      "beekeeping_value": "Erken ilkbahar poleni",
      "ornamental_use": "Dar sütun silüetiyle peyzajda derinlik ve dikey perspektif sağlayan 1 numaralı ağaçtır.",
      "other_notes": "Antalya Köprülü Kanyon'da dünyanın en saf doğal servi ormanı bulunur."
    }
  },
  {
    "turkish_name": "Arizona Servisi, Mavi Servi",
    "scientific_name": "Cupressus arizonica",
    "english_name": "Arizona Cypress, Blue Cypress",
    "alternative_names": "Mavi Arizona Servisi",
    "family": "Cupressaceae",
    "genus": "Cupressus",
    "description": "15-25 m boylanan, gümüşi mavi-gri pul yapraklarıyla, kireçli topraklara, aşırı kuraklığa ve dona (-20°C) Akdeniz servisinden daha dayanıklı popüler park ağacıdır.",
    "physical_avg_height": "15–25 metre",
    "physical_avg_width": "4–7 metre",
    "physical_growth_form": "Geniş konik veya piramidal taçlı, sık dallı",
    "leaf_description": "Pul yapraklar, gümüşi mavi-gri veya buz mavisi renkli, sırtında beyaz reçine damlası taşır; ezilince keskin aromatik kokuludur.",
    "flower_description": "Tek evcikli. Küremsi 2-3 cm boyunda koyu kahverengi kalkan pullu kozalaklar.",
    "flower_color": "Koyu kahverengi / Gümüşi mavi yapraklar",
    "fruit_seed_info": "2–3 cm çapında küresel odunsu kozalaklar.",
    "flowering_period": "İlkbahar / Sonbahar",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s22_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s22_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s22_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s22_img4.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s23_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s24_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Kuzey Amerika (Güneybatı ABD ve Kuzey Meksika çöl dağları)",
      "natural_habitat": "1000–2200 m kurak kanyonlar",
      "regions": "Tüm dünyada ılıman, kurak ve karasal parklar",
      "climate_preference": "Sıcak, kurak, rüzgarlı ve -20°C soğuk iklimlere fevkalade dayanıklıdır.",
      "placement": "Dış mekân / Parklar, yol kenarları, çitler, rüzgar perdeleri",
      "landscape_use": "Gümüşi mavi renk kontrastı, rüzgar kıran perde, budamalı çit ('Fastigiata' kültivarı)."
    },
    "care": {
      "light_need": "Tam güneş (güneşte maviliği artar)",
      "watering_need": "Az sulama; olağanüstü kuraklık toleransı.",
      "humidity_need": "Düşük",
      "temperature_need": "-20°C",
      "temperature_min": -20,
      "soil_type": "Kireçli, killi, fakir her türlü toprak.",
      "soil_ph": "6.0 - 8.5",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "Gerekmez.",
      "pruning_need": "Çit olarak budanabilir.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Uçucu yağları antiseptiktir.",
      "traditional_use": "Kurak bölgelerde rüzgar erozyonunu önlemede kullanılır.",
      "beekeeping_value": "Polen kaynağı",
      "ornamental_use": "Buz mavisi rengi ve hızlı büyümesiyle en yaygın kullanılan mavi ibrelidir.",
      "other_notes": "Şehir kirliliğine ve egzoz dumanına çok dayanıklıdır."
    }
  },
  {
    "turkish_name": "Adi Ardıç, Yaygın Ardıç",
    "scientific_name": "Juniperus communis",
    "english_name": "Common Juniper",
    "alternative_names": "Çoban Ardıcı",
    "family": "Cupressaceae",
    "genus": "Juniperus",
    "description": "1-8 m boylanan, dik sütunsu veya yayılıcı çalı formunda, 3'lü çevrel dizilen batıcı sivri iğneli, mavi-siyah etli meyvemsi kozalaklarıyla (Ardıç Tohumu) tanınan şifalı türdür.",
    "physical_avg_height": "1–8 metre (Formuna göre yerörtücü veya sütun)",
    "physical_avg_width": "1–4 metre",
    "physical_growth_form": "Sütunsu dik ('Compressa', 'Hibernica') veya yayılıcı yerörtücü çalı",
    "leaf_description": "3'lü çevrel (halkasal) dizilişli, 1-1.5 cm boyunda, çok sivri ve batıcı, üst yüzünde geniş tek beyaz stoma bandı bulunur.",
    "flower_description": "İki evcikli. Etli küresel mavi-siyah meyvemsi kozalaklar.",
    "flower_color": "Mavi-siyah dumanlı",
    "fruit_seed_info": "6–9 mm çapında etli, dumanlı koyu mavi-siyah kozalak (Galbül); 2-3 yılda olgunlaşır, aromatik kokuludur.",
    "flowering_period": "İlkbahar / Meyve 2-3. yıl sonbaharı",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s46_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s46_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s47_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s47_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s48_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bitki_Mateyali2-2020-12-13-14-1_s48_img2.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Kuzey Yarımküre'nin tamamı (Türkiye dağlarında doğal)",
      "natural_habitat": "Yüksek dağ meraları, taşlık yamaçlar, orman sınırları",
      "regions": "Tüm Anadolu dağları, Avrupa, Asya, Kuzey Amerika",
      "climate_preference": "Geniş tolerans; -40°C dondurucu soğuktan sıcak taşlı yamaçlara kadar her koşula dayanır.",
      "placement": "Dış mekân / Kaya bahçeleri, şevler, taşlık alanlar, saksılar",
      "landscape_use": "Kaya bahçesi, yer örtücü ('Repanda'), dar alan sütun vurgusu ('Hibernica'), şev tutma."
    },
    "care": {
      "light_need": "Tam güneş",
      "watering_need": "Az sulama; aşırı kuraklığa dayanıklıdır.",
      "humidity_need": "Düşük-orta",
      "temperature_need": "-40°C",
      "temperature_min": -40,
      "soil_type": "Fakir, taşlı, kireçli veya asidik süzek topraklar.",
      "soil_ph": "5.5 - 8.0",
      "drainage_need": "Mükemmel drenaj",
      "fertilizing_info": "Gerekmez.",
      "pruning_need": "Gerekmez.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Meyveleri baharat olarak kullanılır; aşırı tüketimi böbrek hastalarında sakıncalıdır.",
      "toxicity_cats": "Fazla tüketimi toksik olabilir.",
      "toxicity_dogs": "Fazla tüketimi toksik olabilir.",
      "risk_children": "İbreleri batıcıdır."
    },
    "usage": {
      "medical_use": "Ardıç yağı ve meyveleri idrar söktürücü, antiseptik ve romatizma tedavisinde kullanılır.",
      "traditional_use": "Cin (Gin) içkisine ve et yemeklerine lezzet veren ana baharattır.",
      "beekeeping_value": "Polen kaynağı",
      "ornamental_use": "Kaya bahçeleri ve kurakçıl peyzajın vazgeçilmez temel bitkisidir.",
      "other_notes": "Dünyada coğrafi yayılışı en geniş olan ibreli türüdür."
    }
  },
  {
    "turkish_name": "Kaymak Ağacı, Feijoa",
    "scientific_name": "Acca sellowiana",
    "english_name": "Pineapple Guava, Feijoa",
    "alternative_names": "Feijoa sellowiana",
    "family": "Myrtaceae",
    "genus": "Acca",
    "description": "2-4 m boylanan, herdemyeşil, kalın oval yapraklı, kırmızı püsküllü muazzam tatlı yenen çiçekli ve ananas aromalı nefis meyveler veren egzotik Akdeniz çalısıdır.",
    "physical_avg_height": "2–4 metre",
    "physical_avg_width": "2–3.5 metre",
    "physical_growth_form": "Herdemyeşil, yuvarlak taçlı, toprak yüzeyinden dallanan küçük ağaççık / çalı",
    "leaf_description": "Karşılıklı dizili, 4-6 cm boyunda oval, derimsi, üst yüzü parlak koyu yeşil, alt yüzü gümüşi-beyaz keçemsi tüylü.",
    "flower_description": "Yaprak koltuklarında tek veya çift; 4 etli beyaz-pembe taç yapraklı, ortasında yüzlerce parlak kırmızı erkek organ püskülü taşır; çiçek taç yaprakları tatlıdır ve yenir!",
    "flower_color": "Beyaz-pembe taç yapraklar ve parlak kırmızı stamen püskülleri",
    "fruit_seed_info": "5–8 cm boyunda yeşil kabuklu, kaymak kıvamında, ananas-çilek aromalı çok lezzetli meyve.",
    "flowering_period": "Yaz başı (Mayıs - Haziran) / Meyve Sonbahar (Ekim - Kasım)",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s3_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s4_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s4_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s5_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s5_img2.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s6_img1.jpg",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Güney Amerika (Brezilya, Paraguay, Uruguay, Arjantin)",
      "natural_habitat": "Subtropikal dağ etekleri ve orman kenarları",
      "regions": "Akdeniz, Ege ve Karadeniz sahil şeritleri",
      "climate_preference": "Ilıman ve sıcak ılıman; -10°C kısa süreli donlara dayanır.",
      "placement": "Dış mekân / Meyve bahçeleri, sahil peyzajı, çitler, teraslar",
      "landscape_use": "Yenen peyzaj (Edible landscaping), çiçekli çit, soliter süs çalısı, teras meyveciliği."
    },
    "care": {
      "light_need": "Tam güneş veya aydınlık yarı gölge",
      "watering_need": "Düzenli sulama; meyve döneminde sulama meyve iriliğini artırır.",
      "humidity_need": "Orta",
      "temperature_need": "-10°C",
      "temperature_min": -10,
      "soil_type": "Verimli, humuslu, iyi drene hafif asidik topraklar.",
      "soil_ph": "5.5 - 7.0",
      "drainage_need": "İyi drenaj",
      "fertilizing_info": "İlkbaharda organik kompost ve potasyumlu gübre.",
      "pruning_need": "Meyve hasadından sonra hafif şekil budaması.",
      "care_difficulty": 2
    },
    "safety": {
      "toxicity_humans": "Toksik değildir; hem çiçek taç yaprakları hem meyvesi gurme lezzettir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Meyvesi yüksek iyot, C vitamini ve antioksidan içerir (guatr ve tiroid için faydalıdır).",
      "traditional_use": "Reçel, marmelat ve taze meyve olarak tüketilir.",
      "beekeeping_value": "Arılar ve kuşlar çiçeklerine yoğun ilgi gösterir.",
      "ornamental_use": "Gümüşi yaprakları, kırmızı püsküllü harika çiçekleri ve lezzetli meyveleriyle komple bir bahçe süsüdür.",
      "other_notes": "Deniz tuzuna ve rüzgara karşı sahil kesiminde çok dayanıklıdır."
    }
  },
  {
    "turkish_name": "Yalancı Çivit, Çivit Çalısı",
    "scientific_name": "Amorpha fruticosa",
    "english_name": "False Indigo, Desert False Indigo",
    "alternative_names": "Yalancı Çivit Ağacı",
    "family": "Fabaceae (Leguminosae)",
    "genus": "Amorpha",
    "file": "bitkiIII/Bit_Materyali_III_2_ders.pptx",
    "description": "2-5 m boylanan, ince dallı, narin yapılı, tüysü yapraklı, yazın mor-menekşe renkli dik başaklar halinde muazzam çiçek açan, toprak ıslah edici çalıdır.",
    "physical_avg_height": "2–5 metre",
    "physical_avg_width": "2–4 metre",
    "physical_growth_form": "Çok gövdeli, dağınık tepeli, ince dallı narin çalı",
    "leaf_description": "Tek teleksi (11-25 yaprakçıklı), 15-30 cm boyunda, açık yeşil zarif yapraklar.",
    "flower_description": "10-20 cm boyunda dik terminal salkımlar halinde; mor-menekşe renkli taç yapraklar ve ucunda altın sarısı polen taşıyan organlar.",
    "flower_color": "Mor-menekşe ve sarı polenler",
    "fruit_seed_info": "7–9 mm boyunda küçük, kıvrık, reçine bezeli bakla meyve.",
    "flowering_period": "Yaz (Haziran - Temmuz)",
    "images": [
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s10_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s11_img1.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s11_img2.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s11_img3.png",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s12_img1.jpg",
        "image_type": "gallery",
        "verified": true
      },
      {
        "image_url": "http://localhost:3001/uploads/Bit_Materyali_III_2_ders_s12_img2.png",
        "image_type": "gallery",
        "verified": true
      }
    ],
    "habitat": {
      "origin": "Kuzey Amerika",
      "natural_habitat": "Nehir kıyıları, nemli orman açıkları, kumullar",
      "regions": "Tüm dünyada ılıman ve sulak alanlar",
      "climate_preference": "Güneşli - yarı gölge yerler; soğuğa, donlara ve su baskınlarına çok dayanıklıdır.",
      "placement": "Dış mekân / Dere kenarları, gölet kıyıları, erozyon şevleri",
      "landscape_use": "Erozyon kontrolü, su kenarı bitkilendirmesi, mor çiçek bordürleri, azot bağlayıcı toprak ıslahı."
    },
    "care": {
      "light_need": "Tam güneş veya yarı gölge",
      "watering_need": "Nemli-ıslak toprakları tercih eder, kuraklığa da toleranslıdır.",
      "humidity_need": "Orta",
      "temperature_need": "-30°C",
      "temperature_min": -30,
      "soil_type": "Kumlu, balçıklı, nemli-ıslak her türlü toprak; kökleriyle havanın azotunu toprağa bağlar.",
      "soil_ph": "6.0 - 8.0",
      "drainage_need": "Islak topraklara dayanıklıdır.",
      "fertilizing_info": "Azotlu gübre istemez (kendi azotunu üretir).",
      "pruning_need": "Kış sonunda sert budanarak kompakt tutulabilir.",
      "care_difficulty": 1
    },
    "safety": {
      "toxicity_humans": "Toksik değildir.",
      "toxicity_cats": "Güvenlidir.",
      "toxicity_dogs": "Güvenlidir.",
      "risk_children": "Güvenlidir."
    },
    "usage": {
      "medical_use": "Meyvelerindeki amorphin bileşiği yatıştırıcı ve insektisit özellik taşır.",
      "traditional_use": "Eski zamanlarda mavi boya (çivit) elde etmek için indigo yerine kullanılmıştır.",
      "beekeeping_value": "Arıcılar için yazın çok zengin nektar ve polen kaynağıdır.",
      "ornamental_use": "Mor-menekşe dik çiçek başakları ve narin tüysü yapraklarıyla su kenarlarını süsler.",
      "other_notes": "Kök nodülleri sayesinde fakir toprakları organik olarak zenginleştirir."
    }
  }
];


async function seedAll() {
  console.log(`🌱 Toplam ${lecturePlants.length} adet orijinal ders materyali bitkisi veritabanına aktarılıyor...`);
  
  // Önceki kayıtları sıfırla
  await prisma.plantProblem.deleteMany({});
  await prisma.plantImage.deleteMany({});
  await prisma.plantCare.deleteMany({});
  await prisma.plantHabitat.deleteMany({});
  await prisma.plantUsage.deleteMany({});
  await prisma.plantSafety.deleteMany({});
  await prisma.plant.deleteMany({});

  for (const p of lecturePlants) {
    const { habitat, care, usage, safety, problems, images, file, ...base } = p;

    const plant = await prisma.plant.create({
      data: {
        ...base,
        ...(care && { care: { create: care } }),
        ...(habitat && { habitat: { create: habitat } }),
        ...(usage && { usage: { create: usage } }),
        ...(safety && { safety: { create: safety } }),
        ...(problems && problems.length > 0 && {
          problems: {
            create: problems.map(prob => ({
              problem_type: prob.problem_type,
              problem_name: prob.problem_name,
              symptoms: prob.symptoms,
              solutions: prob.solutions
            }))
          }
        }),
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

    console.log(`✅ [${plant.family}] ${plant.turkish_name} (${plant.scientific_name}) başarıyla eklendi. (Görsel: ${images ? images.length : 0})`);
  }
  
  console.log(`🎉 Tebrikler! Tüm ders sunumlarındaki ${lecturePlants.length} bitki eksiksiz olarak kaydedildi.`);
}

seedAll()
  .catch((e) => {
    console.error('Seed hatası:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
