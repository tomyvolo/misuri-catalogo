import type { Product, Category } from "@/types/product"

// IMPORTANTE: Reemplaza esta URL con la URL CSV de tu Google Sheet publicada.
// Cómo obtener esta URL:
// 1. Abre tu Google Sheet.
// 2. Ve a Archivo > Compartir > Publicar en la web.
// 3. Elige la hoja que quieres publicar.
// 4. Selecciona "Valores separados por comas (.csv)" para el formato.
// 5. Copia la URL generada.
const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vR_YOUR_SHEET_ID_HERE/pub?gid=0&single=true&output=csv" // <-- ¡REEMPLAZA ESTA URL CON LA TUYA!

let cachedProducts: Product[] | null = null

async function fetchProductsFromSheet(): Promise<Product[]> {
  // Simple caché para evitar múltiples fetches en la misma solicitud del servidor
  if (cachedProducts) {
    return cachedProducts
  }

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet data: ${response.statusText}`)
    }
    const csvText = await response.text()

    const lines = csvText.split("\n").filter((line) => line.trim() !== "")
    if (lines.length === 0) return []

    const productsData: Product[] = lines
      .slice(1)
      .map((line) => {
        const parts = line.split(",")
        if (parts.length < 7) {
          console.warn("Skipping malformed CSV line:", line)
          return null
        }

        const id = Number.parseInt(parts[0].trim(), 10)
        const name = parts[1].trim()
        const price = Number.parseInt(parts[2].trim(), 10)
        const category = parts[3].trim()
        const description = parts[4].trim()

        const size = parts
          .slice(5, parts.length - 1)
          .join(",")
          .trim()

        const rawImageUrl = parts[parts.length - 1].trim()
        const imageUrl =
          rawImageUrl.startsWith("http://") || rawImageUrl.startsWith("https://") || rawImageUrl.startsWith("/")
            ? rawImageUrl
            : "/placeholder.svg?height=200&width=200"

        const product: Partial<Product> = {
          id,
          name,
          price,
          category,
          description,
          size,
          image_url: imageUrl,
        }

        if (
          product.id &&
          product.name &&
          product.price &&
          product.category &&
          product.description &&
          product.size &&
          product.image_url
        ) {
          return product as Product
        }
        return null
      })
      .filter((p) => p !== null) as Product[]

    cachedProducts = productsData
    return productsData
  } catch (error) {
    console.error("Error fetching or parsing Google Sheet:", error)
    return []
  }
}

export async function getProducts(): Promise<Product[]> {
  return fetchProductsFromSheet()
}

export async function getProductById(id: number): Promise<Product | null> {
  const allProducts = await fetchProductsFromSheet()
  return allProducts.find((product) => product.id === id) || null
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const allProducts = await fetchProductsFromSheet()
  return allProducts.filter((product) => product.category === categorySlug)
}

export async function getCategories(): Promise<Category[]> {
  const allProducts = await fetchProductsFromSheet()
  const uniqueCategories = Array.from(new Set(allProducts.map((product) => product.category)))
  return [
    { name: "Todos los Productos", slug: "all" },
    ...uniqueCategories.map((cat) => ({ name: cat.charAt(0).toUpperCase() + cat.slice(1), slug: cat })),
  ]
}
