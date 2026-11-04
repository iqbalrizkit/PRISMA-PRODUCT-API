import "dotenv/config";
import express from "express";
import productRoutes from "./routes/productRoutes.js";
import prisma from "./lib/prisma.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/products", productRoutes);

app.use((req, res) => {
  return res.status(404).json({ message: "Endpoint tidak ditemukan" });
});

const server = app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

const shutdown = async () => {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
