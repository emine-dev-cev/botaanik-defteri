const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const monstera = await prisma.plant.upsert({
    where: { scientific_name: 'Monstera deliciosa' },
    update: {},
    create: {
      scientific_name: 'Monstera deliciosa',
      turkish_name: 'Deve Tabanı',
      english_name: 'Swiss Cheese Plant',
      family: 'Araceae',
      genus: 'Monstera',
      description: 'Dev yaprakları ve karakteristik delikleriyle bilinen, iç mekanların en popüler tropikal bitkilerinden biridir.',
      care_difficulty: 3,
      toxicity_info: 'Evcil hayvanlar ve insanlar için yutulduğunda toksiktir. Ağızda tahrişe neden olabilir.',
      is_toxic: true,
      care: {
        create: {
          light_level: 6,
          light_description: 'Parlak, dolaylı ışık. Doğrudan güneş ışığı yaprakları yakabilir.',
          watering_frequency_summer: 'Haftada 1-2 kez',
          watering_frequency_winter: '10-14 günde 1 kez',
          watering_instructions: 'Toprağın üst 3-4 cm kısmı kuruduğunda sulayın. Kış aylarında sulama sıklığını azaltın. Saksı altında su birikmesine izin vermeyin.',
          humidity_min: 50,
          humidity_ideal: 70,
          temperature_ideal_min: 18,
          temperature_ideal_max: 27,
          soil_type: 'Havadar, iyi drene olan torf bazlı toprak.',
          fertilizer_instructions: 'İlkbahar ve yaz aylarında ayda bir kez sıvı gübre uygulayın.'
        }
      },
      habitat: {
        create: {
          native_regions: 'Orta Amerika (Meksika güneyinden Panama\'ya kadar)',
          climate_type: 'Tropikal',
          indoor_outdoor_preference: 'İç mekanlarda mükemmel, ılıman iklimlerde dış mekanda da yetişebilir.'
        }
      },
      images: {
        create: [
          {
            image_url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image_type: 'gallery'
          }
        ]
      }
    },
  });

  const sansevieria = await prisma.plant.upsert({
    where: { scientific_name: 'Sansevieria trifasciata' },
    update: {},
    create: {
      scientific_name: 'Sansevieria trifasciata',
      turkish_name: 'Paşa Kılıcı',
      english_name: 'Snake Plant',
      family: 'Asparagaceae',
      genus: 'Sansevieria',
      description: 'Havayı temizleme özelliğiyle bilinen, bakımı en kolay salon bitkilerinden biridir.',
      care_difficulty: 1,
      toxicity_info: 'Kedi ve köpekler için hafif toksiktir.',
      is_toxic: true,
      care: {
        create: {
          light_level: 4,
          light_description: 'Düşük ışıktan tam güneşe kadar geniş bir yelpazeyi tolere edebilir.',
          watering_frequency_summer: '2-3 haftada 1 kez',
          watering_frequency_winter: 'Ayda 1 kez',
          watering_instructions: 'Toprak tamamen kurumadan sulamayın. Fazla sulama kök çürümesine yol açar.',
          humidity_min: 30,
          humidity_ideal: 40,
          temperature_ideal_min: 15,
          temperature_ideal_max: 30,
          soil_type: 'Kaktüs/sukulent toprağı.',
          fertilizer_instructions: 'Sadece büyüme döneminde (ilkbahar-yaz) yılda 2-3 kez hafif gübre verin.'
        }
      },
      images: {
        create: [
          {
            image_url: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            image_type: 'gallery'
          }
        ]
      }
    }
  });

  console.log('Seed data inserted:', { monstera, sansevieria });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
