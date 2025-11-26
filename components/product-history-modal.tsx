"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sparkles,
  Edit,
  Tag,
  ImageIcon,
  Package,
  Clock,
  User,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
} from "lucide-react"

interface HistoryEntry {
  id: string
  type: "enrichment" | "edit" | "category" | "image" | "create" | "sync"
  title: string
  description: string
  user: string
  date: string
  time: string
  status: "success" | "error" | "pending"
  changes?: {
    field: string
    before: string
    after: string
  }[]
}

interface ProductHistoryModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: string
    name: string
    image: string
  } | null
}

const mockHistory: HistoryEntry[] = [
  {
    id: "1",
    type: "enrichment",
    title: "Enriquecimento com IA",
    description: "Descrição, Meta Title e Meta Description enriquecidos automaticamente",
    user: "Sistema IA",
    date: "2024-01-20",
    time: "14:32",
    status: "success",
    changes: [
      {
        field: "Descrição",
        before: "Carro miniatura escala 1:18",
        after:
          "Descubra o 2008 Cross Bones Harley Davidson Série 27, uma miniatura em escala 1:18 da Maisto que captura cada detalhe da icônica motocicleta. Perfeita para colecionadores e entusiastas.",
      },
      {
        field: "Meta Title",
        before: "Harley Davidson Miniatura",
        after: "2008 Cross Bones Harley Davidson Série 27 1:18 Maisto | Miniatura Colecionável",
      },
      {
        field: "Meta Description",
        before: "",
        after:
          "Miniatura de coleção 2008 Cross Bones Harley Davidson. Escala 1:18, fabricada pela Maisto. Detalhes realistas e acabamento premium.",
      },
    ],
  },
  {
    id: "2",
    type: "edit",
    title: "Edição Manual",
    description: "Preço e estoque atualizados",
    user: "João Silva",
    date: "2024-01-19",
    time: "10:15",
    status: "success",
    changes: [
      {
        field: "Preço",
        before: "R$ 189,90",
        after: "R$ 159,90",
      },
      {
        field: "Estoque",
        before: "15 un",
        after: "25 un",
      },
    ],
  },
  {
    id: "3",
    type: "category",
    title: "Alteração de Categoria",
    description: "Categoria atualizada pela sugestão da IA",
    user: "Maria Santos",
    date: "2024-01-18",
    time: "16:45",
    status: "success",
    changes: [
      {
        field: "Categoria",
        before: "Categoria",
        after: "Motos escala 1/18",
      },
    ],
  },
  {
    id: "4",
    type: "image",
    title: "Atualização de Imagem",
    description: "Novas imagens adicionadas ao produto",
    user: "Carlos Oliveira",
    date: "2024-01-17",
    time: "09:30",
    status: "success",
    changes: [
      {
        field: "Imagens",
        before: "1 imagem",
        after: "5 imagens",
      },
    ],
  },
  {
    id: "5",
    type: "sync",
    title: "Sincronização",
    description: "Produto sincronizado com Nuvemshop",
    user: "Sistema",
    date: "2024-01-16",
    time: "08:00",
    status: "success",
  },
  {
    id: "6",
    type: "enrichment",
    title: "Tentativa de Enriquecimento",
    description: "Falha ao enriquecer - produto sem imagem",
    user: "Sistema IA",
    date: "2024-01-15",
    time: "11:20",
    status: "error",
  },
  {
    id: "7",
    type: "create",
    title: "Produto Cadastrado",
    description: "Produto criado via importação de planilha",
    user: "João Silva",
    date: "2024-01-14",
    time: "15:00",
    status: "success",
  },
]

const getTypeIcon = (type: HistoryEntry["type"]) => {
  switch (type) {
    case "enrichment":
      return <Sparkles className="h-4 w-4" />
    case "edit":
      return <Edit className="h-4 w-4" />
    case "category":
      return <Tag className="h-4 w-4" />
    case "image":
      return <ImageIcon className="h-4 w-4" />
    case "create":
      return <Package className="h-4 w-4" />
    case "sync":
      return <RefreshCw className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

const getTypeColor = (type: HistoryEntry["type"]) => {
  switch (type) {
    case "enrichment":
      return "bg-purple-100 text-purple-600"
    case "edit":
      return "bg-blue-100 text-blue-600"
    case "category":
      return "bg-amber-100 text-amber-600"
    case "image":
      return "bg-green-100 text-green-600"
    case "create":
      return "bg-gray-100 text-gray-600"
    case "sync":
      return "bg-cyan-100 text-cyan-600"
    default:
      return "bg-gray-100 text-gray-600"
  }
}

const getStatusIcon = (status: HistoryEntry["status"]) => {
  switch (status) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-green-500" />
    case "error":
      return <AlertCircle className="h-4 w-4 text-red-500" />
    case "pending":
      return <Clock className="h-4 w-4 text-amber-500" />
  }
}

export function ProductHistoryModal({ open, onOpenChange, product }: ProductHistoryModalProps) {
  const [expandedEntries, setExpandedEntries] = useState<string[]>([])

  const toggleExpand = (id: string) => {
    setExpandedEntries((prev) => (prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]))
  }

  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg overflow-hidden border">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-serif text-xl">Histórico do Produto</h2>
              <p className="text-sm text-muted-foreground font-normal truncate max-w-md">{product.name}</p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-4">
              {mockHistory.map((entry, index) => (
                <div key={entry.id} className="relative pl-12">
                  {/* Timeline dot */}
                  <div
                    className={`absolute left-3 top-2 h-5 w-5 rounded-full flex items-center justify-center ${getTypeColor(entry.type)}`}
                  >
                    {getTypeIcon(entry.type)}
                  </div>

                  <div className="rounded-lg border bg-card p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{entry.title}</h4>
                          {getStatusIcon(entry.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{entry.description}</p>
                      </div>

                      {entry.changes && entry.changes.length > 0 && (
                        <Button variant="ghost" size="sm" onClick={() => toggleExpand(entry.id)} className="shrink-0">
                          {expandedEntries.includes(entry.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </div>

                    {/* Expanded changes */}
                    {entry.changes && expandedEntries.includes(entry.id) && (
                      <div className="mt-4 space-y-3 border-t pt-4">
                        {entry.changes.map((change, i) => (
                          <div key={i} className="space-y-1">
                            <Badge variant="outline" className="text-xs">
                              {change.field}
                            </Badge>
                            <div className="flex items-start gap-2 text-sm">
                              <div className="flex-1 p-2 rounded bg-red-50 text-red-700 line-through">
                                {change.before || "(vazio)"}
                              </div>
                              <ArrowRight className="h-4 w-4 mt-2 shrink-0 text-muted-foreground" />
                              <div className="flex-1 p-2 rounded bg-green-50 text-green-700">{change.after}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer with user and time */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {entry.user}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(entry.date).toLocaleDateString("pt-BR")} às {entry.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollArea>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
