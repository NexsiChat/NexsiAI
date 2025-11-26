"use client"

import { Bell, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const quotes = [
  "Acredite em você mesmo e tudo será possível.",
  "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
  "Sua única limitação é a sua imaginação.",
  "Grandes coisas nunca vêm de zonas de conforto.",
  "O melhor momento para começar foi ontem. O segundo melhor é agora.",
]

export function TopHeader() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <p className="text-sm italic text-muted-foreground">"{randomQuote}"</p>

      <div className="flex items-center gap-3">
        <Button className="bg-primary hover:bg-primary/90">
          <RefreshCw className="mr-2 h-4 w-4" />
          Importações
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-red-500 p-0 text-xs text-white flex items-center justify-center">
            3
          </Badge>
        </Button>

        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">RS</div>
      </div>
    </header>
  )
}
