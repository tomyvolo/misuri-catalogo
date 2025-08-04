import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { getCategories } from "@/data/products" // Import getCategories from data/products

export default async function HomePage() {
  const categories = await getCategories()
  const displayCategories = categories.filter((cat) => cat.slug !== "all")

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4 py-12 text-center md:px-6 lg:py-24">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Misuri</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Descubre nuestra colección de ropa moderna y cómoda. Calidad premium para tu estilo de vida.
        </p>
        <Button asChild size="lg" className="mt-6">
          <Link href="/products">
            Ver Productos
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
      <div className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
        {displayCategories.map((category) => (
          <Link
            key={category.slug}
            href={`/products/category/${category.slug}`}
            className="group flex flex-col items-center space-y-2"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl font-bold transition-colors group-hover:bg-primary/90">
              {category.name.charAt(0)}
            </div>
            <h2 className="text-xl font-semibold">{category.name}</h2>
            <p className="text-muted-foreground text-center text-sm">
              {/* You might want to store these descriptions in the DB or a separate config */}
              {category.slug === "remeras" && "Remeras básicas y estampadas de la mejor calidad"}
              {category.slug === "buzos" && "Buzos cómodos y modernos para todas las ocasiones"}
              {category.slug === "pantalones" && "Pantalones versátiles para tu día a día"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
