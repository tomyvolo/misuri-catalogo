import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { getProductById } from "@/data/products"
import { notFound } from "next/navigation"

// Definimos un tipo explícito para las props de la página
type ProductDetailPageProps = {
  params: {
    id: string
  }
  // Aunque no uses searchParams, incluirlo puede ayudar a satisfacer la restricción de PageProps
  searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  // Await params antes de desestructurarlo
  const { id } = await params
  const productId = Number.parseInt(id)
  const product = await getProductById(productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="container px-4 py-8 md:px-6 lg:py-12">
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Volver a productos
        </Link>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        <div className="flex items-center justify-center">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            width={500}
            height={500}
            className="aspect-square w-full max-w-md rounded-lg object-cover"
          />
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">{product.name}</h1>
            <p className="text-4xl font-bold">${product.price.toLocaleString()}</p>
          </div>
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold">Descripción</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Talles disponibles</h2>
              <p className="text-muted-foreground">{product.size}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold">Información del producto</h2>
              <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                <li>Material de alta calidad</li>
                <li>Cambios y devoluciones sin cargo</li>
                <li>Garantía de satisfacción</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  )
}
