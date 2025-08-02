export type Product = {
  id: number
  name: string
  price: number
  category: string
  description: string
  size: string // As per your Supabase schema, 'size' is a single string
  image_url: string
  created_at: string // Timestamp from Supabase
}

export type Category = {
  name: string
  slug: string
}
