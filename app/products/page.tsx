import { getProducts } from "@/lib/data" // Updated import
import { ProductCard } from "@/components/product-card"

export default async function AllProductsPage() {
  const allProducts = await getProducts() // Fetch from Supabase
  const totalProducts = allProducts.length

  return (
    <div className="container px-4 py-8 md:px-6 lg:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Misuri - Todos los Productos</h1>
        <p className="text-muted-foreground">Descubre toda nuestra colección</p>
        <p className="text-sm text-muted-foreground">{totalProducts} productos disponibles</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
