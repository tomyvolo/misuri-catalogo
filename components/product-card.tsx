import Image from "next/image"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import type { Product } from "@/types/product" // Updated import path

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group">
      <Card className="overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-md">
        <Image
          src={product.image_url || "/placeholder.svg"} // Use image_url
          alt={product.name}
          width={300}
          height={300}
          className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-muted-foreground text-sm">{product.size}</p> {/* Use product.size */}
          <p className="mt-2 text-xl font-bold">${product.price.toLocaleString()}</p>
          <p className="text-muted-foreground text-sm line-clamp-2 mt-1">{product.description}</p>
        </div>
      </Card>
    </Link>
  )
}
