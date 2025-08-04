import Link from "next/link"
import { Mail, Phone, InstagramIcon } from "lucide-react"

export function ContactBar() {
  return (
    <footer className="w-full bg-gray-100 py-8 dark:bg-gray-800">
      <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">Misuri</h3>
          <p className="text-sm text-muted-foreground">Tu estilo, nuestra pasión.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm md:gap-8">
          <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Mail className="h-4 w-4" />
            <span>contacto@misuri.com</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Phone className="h-4 w-4" />
            <span>+54 9 11 1234-5678</span>
          </Link>
          <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <InstagramIcon className="h-4 w-4" />
            <span>@misuri_oficial</span>
          </Link>
        </nav>
      </div>
    </footer>
  )
}
