import { getProductsByCategory, getCategories } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { notFound } from "next/navigation"

// Definimos explícitamente la interfaz para las props de esta página
interface CategoryProductsPageProps {
  params: Promise<{
    categorySlug: string
  }>
  // searchParams es opcional y puede ser útil incluirlo para compatibilidad
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CategoryProductsPage({ params }: CategoryProductsPageProps) {
  const { categorySlug } = await params // params es una Promise en Next.js 15

  const categories = await getCategories()
  const category = categories.find((cat) => cat.slug === categorySlug)

  if (!category || category.slug === "all") {
    notFound()
  }

  const filteredProducts = await getProductsByCategory(categorySlug)
  const totalProducts = filteredProducts.length

  return (
    <div className="container px-4 py-8 md:px-6 lg:py-12">
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{category.name}</h1>
        <p className="text-muted-foreground">
          {/* You might want to store these descriptions in the DB or a separate config */}
          {category.slug === "remeras" && "Remeras cómodas y con estilo para tu día a día"}
          {category.slug === "buzos" && "Buzos cómodos y modernos para todas las ocasiones"}
          {category.slug === "pantalones" && "Pantalones versátiles para tu día a día"}
        </p>
        <p className="text-sm text-muted-foreground">{totalProducts} productos encontrados</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
