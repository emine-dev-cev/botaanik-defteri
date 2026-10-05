const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const bookPlants = [
  {
    turkish_name: "Güzellik Çalısı",
    scientific_name: "Abelia x grandiflora",
    alternative_names: "Abelia (A. chinensis x A. uniflora melezi)",
    family: "Caprifoliaceae",
    genus: "Abelia",
    description: "Yarı herdemyeşil, (soğuk bölgelerde kışın yaprak döken), 2.5 metreye kadar boylanabilen, sürgünler dört köşeli, tüylü, kırmızı renkli; ince ve sık dallı, küçük bir çalıdır. Vatanı Doğu Çin'dir. (A. chinensis ile A. uniflora arasında meydana gelmiş melezdir.)",
    physical_avg_height: "2.5 metreye kadar",
    physical_growth_form: "İnce ve sık dallı, sürgünler dört köşeli, tüylü, kırmızı renkli küçük çalı",
    leaf_description: "Yapraklar karşılıklı dizili, yumurtamsı, damla uçlu, kenarı dişli, karşılıklı ve ikili dizilişli, üst yüzü çıplak, alt yüzünde sapa yakın tüylü, üst yüzü parlak ve koyu yeşil; sonbaharda kahverengimsi-kırmızı renklidir.",
    flower_description: "Çiçekler yaprak koltuklarında veya yan sürgünlerin ucunda terminal, tek veya kurullar halinde, bileşik salkım, taç yaprakların dip kısmı çan veya huni şeklinde birleşik, uç kısmı 5 loplu, beyaz veya uçuk pembe renkli, güzel kokuludur.",
    flower_color: "Beyaz veya uçuk pembe",
    fruit_seed_info: "Meyve derimsi ve tek tohumludur.",
    flowering_period: "Yaz - sonbahar aylarında çiçek açar",
    images: [
      { image_url: "http://localhost:3001/uploads/guzellik_calisi_photo.jpg", image_type: "gallery" },
      { image_url: "http://localhost:3001/uploads/guzellik_calisi_page.jpg", image_type: "book_note" }
    ],
    habitat: {
      origin: "Doğu Çin (A. chinensis ile A. uniflora melezidir)",
      placement: "Dış mekân / Bahçe / Kap içi",
      climate_preference: "Bol güneşli veya yarı gölge yerlerde ve ılıman iklimlerde yetişir (kışa dayanıklıdır)."
    },
    care: {
      light_need: "Bol güneşli veya yarı gölge yerler",
      soil_type: "Her türlü toprakta yetişir; ancak drenajı iyi, yaprak çürüğü ve humus bakımından zengin topraklarda daha iyi gelişir.",
      drainage_need: "İyi drenajlı toprak ister.",
      cold_tolerance: "Kışa dayanıklıdır (soğuk bölgelerde kışın yaprak döker).",
      pruning_need: "Makaslanarak değişik şekiller verilebilir.",
      care_difficulty: 3
    },
    usage: {
      landscape_use: "Guruplar halinde veya tek, geniş alanların bitkilendirilmesinde, kap içinde, oturma gurupları veya yürüme yollarının kenarlarında, kesme çiçekçilikte kullanılabilir.",
      ornamental_use: "Güzel kokulu beyaz-uçuk pembe çiçekleri, kızıllaşan sonbahar yaprakları ve makaslanabilme özelliğiyle yüksek süs değerindedir.",
      other_notes: "Tohumla, çelikle ve dip sürgünlerini ayırmak suretiyle üretilebilir. Makaslanarak değişik şekiller verilebilir."
    }
  },
  {
    turkish_name: "Gümüşi Köknar",
    scientific_name: "Abies alba",
    english_name: "Silver Fir",
    alternative_names: "Abies argentea",
    family: "Pinaceae",
    genus: "Abies",
    description: "Herdemyeşil, boyu 50 metreye ulaşabilen, tomurcuklar sürgün ucunda üçerli; genç sürgünler önce seyrek kısa tüylü, sonra tüysüz; kabuğu önce düz ve gri, sonra küçük plakalar halinde çatlaklı, dar piramidal tepeli bir ağaçtır. Vatanı Orta ve Güney Avrupa'dır.",
    physical_avg_height: "50 metreye kadar",
    physical_growth_form: "Dar piramidal tepeli ulu ağaç, tomurcuklar sürgün ucunda üçerli",
    leaf_description: "Yapraklar sarmal dizilişli, iğne yaprak, alt dallardaki iğne yapraklar tarak şeklinde, iki sıralı dizili, 8-12 yıl ağaç üzerinde kalır, 1.5-3.5 cm uzunluğunda, ucu küt veya çentikli; alt yüzü iki beyaz stoma bantlı, üst yüzü parlak koyu yeşildir.",
    flower_description: "Erkek çiçekler silindirik kurullarda (2-3 cm), sarımsı-yeşil; dişi çiçekler (kozalaklar) dik duruşlu, 10-15 cm uzunluğunda; kozalaklar kahverengi, reçineli, dış pul daha uzun, geriye kıvrık, dışarıdan görülebilir.",
    flower_color: "Sarımsı-yeşil (erkek çiçekler) / Kahverengi (kozalak)",
    fruit_seed_info: "Kozalaklar 10-15 cm uzunluğunda, reçineli; olgunlaştığında hemen dağılır, tohum geniş kanatlıdır.",
    flowering_period: "İlkbahar / Kozalaklar olgunlaştığında hemen dağılır",
    images: [
      { image_url: "http://localhost:3001/uploads/gumusi_koknar_photo.jpg", image_type: "gallery" },
      { image_url: "http://localhost:3001/uploads/gumusi_koknar_page.jpg", image_type: "book_note" }
    ],
    habitat: {
      origin: "Orta ve Güney Avrupa",
      placement: "Dış mekân / Park ve bahçeler",
      climate_preference: "Yarıgölge-gölge yerlerde ve ılıman iklimlerde yetişir. Yaz kuraklığına, şiddetli donlara, hava kirliliğine ve asit yağmurlarına karşı duyarlıdır."
    },
    care: {
      light_need: "Yarı gölge - gölge yerler",
      soil_type: "Nemli, verimli ve derin toprakları tercih eder.",
      cold_tolerance: "Şiddetli donlara ve asit yağmurlarına karşı duyarlıdır.",
      drought_tolerance: "Yaz kuraklığına duyarlıdır.",
      care_difficulty: 5
    },
    usage: {
      landscape_use: "Park ve bahçelerde tek veya guruplar halinde kullanılabilir. Bahçe sanatında kullanılan çeşitli varyete ve kültür formları vardır.",
      ornamental_use: "Gümüşi stoma bantlı yaprakları ve dar piramidal formu ile yüksek dekoratif değere sahiptir.",
      other_notes: "Tohum ve aşı ile üretilebilir. Odunu beyaz-sarımsı renkli, yumuşak, dış mekanlarda dayanıksız, kağıt endüstrisinde, müzik aletlerinin göğüs tahtalarının yapımında kullanılır."
    }
  },
  {
    turkish_name: "Kore Köknarı",
    scientific_name: "Abies koreana \"Horstman\"",
    english_name: "Korean Fir",
    alternative_names: "Abies koreana",
    family: "Pinaceae",
    genus: "Abies",
    description: "Herdemyeşil, boyu 15 metreye ulaşabilen, tomurcukları yuvarlak ve reçineli, genç sürgünler önce seyrek tüylü, sonra tüysüz olan, piramit tepeli bir ağaçtır. Vatanı Güney Kore'dir.",
    physical_avg_height: "15 metreye kadar",
    physical_growth_form: "Piramit tepeli ağaç, tomurcukları yuvarlak ve reçineli",
    leaf_description: "Yapraklar sürgünler üzerinde ışınsal dizilişli, 1-2 cm uzunluğunda, uca doğru genişleyen, ucu küt veya çentikli, üst yüzü koyu yeşil, alt yüzü tebeşir beyazıdır.",
    flower_description: "Kozalaklar dik duruşlu, 4-7 cm uzunluğunda, ilk zamanlar mavi-menekşe, olgunlaştığında kahverengi, reçineli, brakteler daha uzun olduğundan dışarıdan görülebilir.",
    flower_color: "İlk zamanlar mavi-menekşe, olgunlaştığında kahverengi",
    fruit_seed_info: "Kozalaklar dik duruşlu, 4-7 cm boyunda, reçineli, mavi-menekşe renkli.",
    flowering_period: "İlkbahar / Yaz (mavi-menekşe kozalak dönemi)",
    images: [
      { image_url: "http://localhost:3001/uploads/kore_koknari_photo.jpg", image_type: "gallery" },
      { image_url: "http://localhost:3001/uploads/kore_koknari_page.jpg", image_type: "book_note" }
    ],
    habitat: {
      origin: "Güney Kore",
      placement: "Dış mekân / Parklar ve bahçeler",
      climate_preference: "Dona karşı duyarlı olduğundan sıcak iklimlerde yetişir."
    },
    care: {
      light_need: "Güneşli veya ılıman yarı gölge alanlar",
      soil_type: "Yeterli oranda nemli olmak kaydı ile her türlü toprakta yetişebilir.",
      cold_tolerance: "Dona karşı duyarlıdır, ılıman/sıcak bölgeleri sever.",
      care_difficulty: 4
    },
    usage: {
      landscape_use: "Parkların nemli bölgelerinde, tek veya guruplar halinde kullanılabilir.",
      ornamental_use: "Mavi-menekşe renkli dik kozalakları ve yapraklarının tebeşir beyazı alt yüzeyi ile son derece dekoratiftir.",
      other_notes: "Tohum ve aşı ile üretilebilir."
    }
  },
  {
    turkish_name: "Kafkas Köknarı, Doğu Karadeniz Köknarı, Göknar",
    scientific_name: "Abies nordmanniana",
    english_name: "Caucasian Fir",
    alternative_names: "Doğu Karadeniz Köknarı, Göknar",
    family: "Pinaceae",
    genus: "Abies",
    description: "Boyu 50 metreye ulaşabilen; tomurcuklar sürgün uçlarında dörderli; genç sürgünler yeşilimsi renkli, esmer, sık ve kısa tüylü; kabuğu plakalar halinde çatlaklı, piramidal tepeli bir ağaçtır. Vatanı Türkiye ve Kafkaslardır.",
    physical_avg_height: "50 metreye kadar",
    physical_growth_form: "Piramidal tepeli ulu ağaç; tomurcuklar sürgün uçlarında dörderli",
    leaf_description: "Yapraklar sarmal dizilişli, 2-3 cm uzunluğunda, ucu küt veya çentikli, kozalıklı daldakiler sivri uçlu; alt yüzü iki beyaz stoma bantlı, üst yüzü parlak yeşil renklidir.",
    flower_description: "Erkek çiçekler silindirik kurullarda açık kırmızı; dişi çiçekler önce yeşil, sonra kırmızımsı-kahverengi; kozalak 15-20 cm boyunda, yumurta-silindir biçimli, reçineli, dış pul daha uzun, geriye kıvrık, dört köşe dışarıdan görülebilir.",
    flower_color: "Açık kırmızı (erkek çiçekler) / Yeşil ve kırmızımsı-kahverengi (dişi kozalaklar)",
    fruit_seed_info: "Kozalak 15-20 cm boyunda, reçineli; tohum üç köşeli, kahverengi ve kanatlıdır.",
    flowering_period: "İlkbahar / Sonbahar (kozalak)",
    images: [
      { image_url: "http://localhost:3001/uploads/kafkas_koknari_photo.jpg", image_type: "gallery" },
      { image_url: "http://localhost:3001/uploads/kafkas_koknari_page.jpg", image_type: "book_note" }
    ],
    habitat: {
      origin: "Türkiye ve Kafkaslar",
      placement: "Dış mekân / Parklar, orman alanları, geniş bahçeler",
      climate_preference: "Yarıgölge-gölge yerlerde ve ılıman iklimlerde yetişir. Yaz kuraklığına, şiddetli donlara, hava kirliliğine ve asit yağmurlarına karşı duyarlıdır."
    },
    care: {
      light_need: "Yarı gölge - gölge yerler",
      soil_type: "Nemli, verimli ve derin toprakları tercih eder.",
      cold_tolerance: "Şiddetli donlara ve asit yağmurlarına karşı duyarlıdır.",
      drought_tolerance: "Yaz kuraklığına duyarlıdır.",
      care_difficulty: 4
    },
    usage: {
      landscape_use: "Parkların nemli bölgelerinde, tek veya guruplar halinde kullanılabilir. Bahçe sanatında kullanılan çeşitli varyete ve kültür formları vardır.",
      ornamental_use: "Görkemli piramidal tepesi, parlak yaprakları ve 15-20 cm boyundaki dev kozalaklarıyla yüksek estetik değere sahiptir.",
      other_notes: "Odunu, beyaz-sarımsı renkli, yumuşak olup mobilyacılıkta kullanılır. Tohum ve aşı ile üretilebilir."
    }
  }
];

async function updateDb() {
  console.log("Veritabanı kitaptaki orijinal fotoğraflar ve birebir metinlerle güncelleniyor...");
  
  // Önceki kayıtları sıfırla
  await prisma.plantProblem.deleteMany({});
  await prisma.plantImage.deleteMany({});
  await prisma.plantCare.deleteMany({});
  await prisma.plantHabitat.deleteMany({});
  await prisma.plantUsage.deleteMany({});
  await prisma.plantSafety.deleteMany({});
  await prisma.plant.deleteMany({});

  for (const p of bookPlants) {
    const { habitat, care, usage, images, ...base } = p;

    const plant = await prisma.plant.create({
      data: {
        ...base,
        ...(care && { care: { create: care } }),
        ...(habitat && { habitat: { create: habitat } }),
        ...(usage && { usage: { create: usage } }),
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

    console.log(`✅ ${plant.turkish_name} (${plant.scientific_name}) güncellendi.`);
  }
}

updateDb()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
