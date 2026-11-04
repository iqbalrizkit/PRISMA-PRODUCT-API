import prisma from "../lib/prisma.js";

const validateProduct = (name, price) => {
  return (
    typeof name === "string" &&
    name.trim() !== "" &&
    typeof price === "number" &&
    Number.isFinite(price) &&
    price >= 0
  );
};

const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({ orderBy: { id: "asc" } });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengambil data produk" });
  }
};

export const getProductById = async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ message: "ID produk harus berupa bilangan bulat positif" });

  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return res.status(404).json({ message: "Produk tidak ditemukan" });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Gagal mengambil data produk" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price } = req.body || {};
  if (!validateProduct(name, price)) {
    return res.status(400).json({ message: "name harus berupa teks dan price harus berupa angka >= 0" });
  }

  try {
    const product = await prisma.product.create({
      data: { name: name.trim(), price }
    });
    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Gagal menambahkan produk" });
  }
};

export const updateProduct = async (req, res) => {
  const id = parseId(req.params.id);
  const { id: bodyId, name, price } = req.body || {};

  if (!id) return res.status(400).json({ message: "ID produk pada URL tidak valid" });
  if (bodyId !== undefined && parseId(bodyId) !== id) {
    return res.status(400).json({ message: "ID pada body harus sama dengan ID pada URL" });
  }
  if (!validateProduct(name, price)) {
    return res.status(400).json({ message: "name harus berupa teks dan price harus berupa angka >= 0" });
  }

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return res.status(404).json({ message: "Produk tidak ditemukan" });

    const product = await prisma.product.update({
      where: { id },
      data: { name: name.trim(), price }
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Gagal memperbarui produk" });
  }
};

export const deleteProduct = async (req, res) => {
  const id = parseId(req.params.id);
  if (!id) return res.status(400).json({ message: "ID produk harus berupa bilangan bulat positif" });

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } });
    if (!existingProduct) return res.status(404).json({ message: "Produk tidak ditemukan" });

    await prisma.product.delete({ where: { id } });
    return res.status(200).json({ message: "Produk berhasil dihapus", product: existingProduct });
  } catch (error) {
    return res.status(500).json({ message: "Gagal menghapus produk" });
  }
};
