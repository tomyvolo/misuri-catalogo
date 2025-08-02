import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { ContactBar } from "@/components/contact-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Misuri - Tienda de Ropa",
  description: "Descubre la colección de ropa moderna y cómoda de Misuri.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <ContactBar />
        </div>
      </body>
    </html>
  )
}
