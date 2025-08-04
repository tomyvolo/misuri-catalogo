"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getCategories } from "@/data/products" // Import getCategories from data/products
import type { Category } from "@/types/product"

export function Navbar() {
  const pathname = usePathname()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)
    }
    fetchCategories()
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          Misuri
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={category.slug === "all" ? "/products" : `/products/category/${category.slug}`}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                (pathname === "/products" && category.slug === "all") ||
                  (pathname.startsWith("/products/category/") && pathname.includes(category.slug))
                  ? "text-primary"
                  : "text-muted-foreground",
              )}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
