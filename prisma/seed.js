import prisma from "../src/lib/prisma.js";

const products = [
  { id: 1, name: "Buku", price: 15000 },
  { id: 2, name: "Pulpen", price: 5000 }
];

try {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product
    });
  }
  console.log("Data awal produk berhasil disiapkan");
} catch (error) {
  console.error("Gagal menyiapkan data awal:", error.message);
  process.exitCode = 1;
} finally {
  await prisma.$disconnect();
}
