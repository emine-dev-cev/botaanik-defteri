const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Kullanıcı Kaydı (Register)
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-posta ve şifre zorunludur." });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Bu e-posta adresi ile zaten bir hesap var." });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name ? name.trim() : email.split("@")[0],
        email: email.toLowerCase().trim(),
        password: password, // Üretim için bcrypt eklenebilir
      }
    });

    const userObj = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    res.status(201).json({
      success: true,
      message: "Hesap başarıyla oluşturuldu.",
      user: userObj,
      token: "demo_token_" + newUser.id
    });
  } catch (err) {
    next(err);
  }
};

// Kullanıcı Girişi (Login)
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Lütfen e-posta ve şifrenizi girin." });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: "E-posta adresi veya şifre hatalı." });
    }

    const userObj = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json({
      success: true,
      message: "Giriş başarılı.",
      user: userObj,
      token: "demo_token_" + user.id
    });
  } catch (err) {
    next(err);
  }
};

// Profil Bilgisi (Me)
exports.getMe = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: "Oturum bulunamadı." });
    }
    const token = authHeader.replace("Bearer ", "");
    const userId = token.replace("demo_token_", "");

    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı." });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    next(err);
  }
};
