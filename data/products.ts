import type { Product, Category } from "@/types/product"
import Papa from "papaparse"

const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRfjQvKTAreSEkz5U9YEvH1alcZ8sYX4-FGe2KCfOxK360LDeen34Y1n_pUzQjmBjuyqTAQkAZnJsib/pub?output=csv"

let cachedProducts: Product[] | null = null

async function fetchProductsFromSheet(): Promise<Product[]> {
  if (cachedProducts) return cachedProducts

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL)
    if (!response.ok) throw new Error(`Failed to fetch sheet: ${response.statusText}`)

    const csvText = await response.text()
    const parsed = Papa.parse<string[]>(csvText, {
      skipEmptyLines: true,
    })

    const rows = parsed.data
    if (!rows || rows.length < 2) return []

    const products: Product[] = (rows.slice(1) as string[][])
      .map((cols) => {
        if (cols.length < 7) {
          console.warn("Línea malformada:", cols)
          return null
        }

        const id = parseInt(cols[0].trim(), 10)
        const name = cols[1].trim()
        const price = parseInt(cols[2].replace("$", "").trim(), 10)
        const category = cols[3].trim()
        const description = cols[4].trim()
        const size = cols[5].trim()
        const imageUrl = cols[6].trim()

        if (!id || !name || !price || !category || !description || !size) return null

        return {
          id,
          name,
          price,
          category,
          description,
          size,
          image_url:
            imageUrl.startsWith("http") || imageUrl.startsWith("/")
              ? imageUrl
              : "/placeholder.svg?height=200&width=200",
        } as Product
      })
      .filter((p): p is Product => p !== null)

    cachedProducts = products
    return products
  } catch (error) {
    console.error("Error fetching/parsing products:", error)
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
