import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
        <Image
          src={product.image_url || "/placeholder.svg?height=200&width=200&query=product_image"}
          alt={product.name}
          width={300}
          height={300}
          className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="mt-2 text-xl font-bold">${product.price.toLocaleString()}</p>{" "}
          {/* Precio justo debajo del nombre */}
          <p className="text-muted-foreground text-sm mt-1 mb-1">{product.size}</p>{" "}
          {/* Talles sin prefijo y con espacio */}
          <p className="text-muted-foreground text-sm line-clamp-2">{product.description}</p>{" "}
          {/* Descripción al final */}
        </div>
      </Card>
    </Link>
  )
}
