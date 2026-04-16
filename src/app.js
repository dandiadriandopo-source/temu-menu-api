require("dotenv").config();

const path = require("path");
const fs = require("fs");
const express = require("express");
const sequelize = require("./config/koneksi");
const routerUser = require("./app/user/router");
const routerRecipes = require("./app/recipes/router");
const routerSteps = require("./app/steps/router");
const routerRate = require("./app/rate/router");
const routerAct = require("./app/activity/router");
const routerAuth = require("./app/auth/router");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const uploadFolder = path.join(process.cwd(), "src", "upload");

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}
app.use("/uploads", express.static(uploadFolder));

app.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({ nassage: "Koneksi Berhasil Terhubung" });
  } catch (error) {
    return res
      .status(500)
      .json({ nassage: "Koneksi Gagal Terhubung: " + error.message });
  }
});

app.use("/api", routerAuth);
app.use("/api/user", routerUser);
app.use("/api/recipes", routerRecipes);
app.use("/api/steps", routerSteps);
app.use("/api/rate", routerRate);
app.use("/api/act", routerAct);

app.use((req, res) => {
  return res.status(404).json({
    status: "error",
    message: "Maaf, halaman tidak ditemukan",
  });
});

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
