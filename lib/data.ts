import { supabase } from "./supabase"
import type { Product, Category } from "@/types/product"

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("productos").select("*").order("id", { ascending: true })
  if (error) {
    console.error("Error fetching products:", error)
    return []
  }
  return data as Product[]
}

export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase.from("productos").select("*").eq("id", id).single()
  if (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    return null
  }
  return data as Product
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .eq("category", categorySlug)
    .order("id", { ascending: true })
  if (error) {
    console.error(`Error fetching products for category ${categorySlug}:`, error)
    return []
  }
  return data as Product[]
}

export async function getCategories(): Promise<Category[]> {
  // Fetch unique categories from products table
  const { data, error } = await supabase.from("productos").select("category")
  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }
  const uniqueCategories = Array.from(new Set(data.map((item: { category: string }) => item.category)))
  return [
    { name: "Todos los Productos", slug: "all" },
    ...uniqueCategories.map((cat) => ({ name: cat.charAt(0).toUpperCase() + cat.slice(1), slug: cat })),
  ]
}
