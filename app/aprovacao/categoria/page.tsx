"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Check, X, Eye, ChevronDown, Upload, Download, Search, FolderTree, ArrowRight } from "lucide-react"
import { AppLayout } from "@/components/app-layout"

interface PendingCategoria {
  id: string
  productId: string
  productName: string
  productImage: string
  currentCategory: string
  suggestedCategory: string
  confidence: number
  createdAt: string
  status: "pending" | "approved" | "rejected"
}

const mockPendingCategorias: PendingCategoria[] = [
  {
    id: "CAT001",
    productId: "8007912482",
    productName: "Bentley Continental Gt Speed 2012 Kinsmart Azul 1:38",
    productImage: "/bentley-miniature-blue-car.jpg",
    currentCategory: "Sem categoria",
    suggestedCategory: "Miniaturas > Carros de Luxo > Bentley",
    confidence: 95,
    createdAt: "2024-01-15 14:32",
    status: "pending",
  },
  {
    id: "CAT002",
    productId: "8007912444",
    productName: "Miniatura Pickup Ford 1940 Preta Motormax 1:24",
    productImage: "/ford-pickup-1940-miniature-black.jpg",
    currentCategory: "Veículos",
    suggestedCategory: "Miniaturas > Carros Clássicos > Ford",
    confidence: 88,
    createdAt: "2024-01-15 10:15",
    status: "pending",
  },
]

export default function AprovacaoCategoriaPage() {
  const [categorias, setCategorias] = useState<PendingCategoria[]>(mockPendingCategorias)
  const [selectedCategorias, setSelectedCategorias] = useState<string[]>([])
  const [previewCategoria, setPreviewCategoria] = useState<PendingCategoria | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")

  const toggleSelectCategoria = (categoriaId: string) => {
    setSelectedCategorias((prev) =>
      prev.includes(categoriaId) ? prev.filter((id) => id !== categoriaId) : [...prev, categoriaId],
    )
  }

  const toggleSelectAll = () => {
    if (selectedCategorias.length === categorias.filter((c) => c.status === "pending").length) {
      setSelectedCategorias([])
    } else {
      setSelectedCategorias(categorias.filter((c) => c.status === "pending").map((c) => c.id))
    }
  }

  const approveCategoria = (categoriaId: string) => {
    setCategorias((prev) => prev.map((c) => (c.id === categoriaId ? { ...c, status: "approved" as const } : c)))
    setSelectedCategorias((prev) => prev.filter((id) => id !== categoriaId))
  }

  const rejectCategoria = (categoriaId: string) => {
    setCategorias((prev) => prev.map((c) => (c.id === categoriaId ? { ...c, status: "rejected" as const } : c)))
    setSelectedCategorias((prev) => prev.filter((id) => id !== categoriaId))
  }

  const approveSelected = () => {
    setCategorias((prev) =>
      prev.map((c) => (selectedCategorias.includes(c.id) ? { ...c, status: "approved" as const } : c)),
    )
    setSelectedCategorias([])
  }

  const rejectSelected = () => {
    setCategorias((prev) =>
      prev.map((c) => (selectedCategorias.includes(c.id) ? { ...c, status: "rejected" as const } : c)),
    )
    setSelectedCategorias([])
  }

  const filteredCategorias = categorias.filter(
    (c) =>
      c.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.productId.includes(searchQuery) ||
      c.suggestedCategory.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const pendingCount = categorias.filter((c) => c.status === "pending").length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Aprovação de Categoria</h1>
          <p className="text-muted-foreground mt-1">{pendingCount} sugestão(ões) de categoria aguardando aprovação</p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-border bg-transparent">
                  <ChevronDown className="mr-2 h-4 w-4" />
                  Ordenar por
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy("recent")}>Mais recentes</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("oldest")}>Mais antigos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("confidence")}>Confiança</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" className="border-border bg-transparent">
              <Upload className="mr-2 h-4 w-4" />
              Exportar
            </Button>

            <Button variant="outline" className="border-border bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Importar
            </Button>
          </div>

          {selectedCategorias.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedCategorias.length} selecionado(s)</span>
              <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={approveSelected}>
                <Check className="mr-2 h-4 w-4" />
                Aprovar
              </Button>
              <Button size="sm" variant="destructive" onClick={rejectSelected}>
                <X className="mr-2 h-4 w-4" />
                Rejeitar
              </Button>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar por produto ou categoria..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Table Header */}
              <div className="grid grid-cols-[40px_70px_1fr_160px_30px_180px_70px_100px] items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium">
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={
                      selectedCategorias.length === categorias.filter((c) => c.status === "pending").length &&
                      categorias.filter((c) => c.status === "pending").length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </div>
                <div>Imagem</div>
                <div>Produto</div>
                <div>Categoria Atual</div>
                <div></div>
                <div>Categoria Sugerida</div>
                <div className="text-center">Confiança</div>
                <div className="text-right">Ações</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {filteredCategorias.map((categoria) => (
                  <div
                    key={categoria.id}
                    className={`grid grid-cols-[40px_70px_1fr_160px_30px_180px_70px_100px] items-center gap-2 px-4 py-4 transition-colors hover:bg-accent/30 ${
                      selectedCategorias.includes(categoria.id) ? "bg-primary/5" : ""
                    } ${categoria.status !== "pending" ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedCategorias.includes(categoria.id)}
                        onCheckedChange={() => toggleSelectCategoria(categoria.id)}
                        disabled={categoria.status !== "pending"}
                      />
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="bg-white rounded-lg p-1 shadow-sm">
                        <img
                          src={categoria.productImage || "/placeholder.svg"}
                          alt={categoria.productName}
                          className="h-12 w-12 rounded object-cover"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{categoria.productName}</p>
                      <p className="text-xs text-muted-foreground">ID: {categoria.productId}</p>
                    </div>

                    <div className="text-xs text-muted-foreground bg-rose-500/10 px-2 py-1 rounded truncate">
                      {categoria.currentCategory || "Sem categoria"}
                    </div>

                    <div className="flex justify-center">
                      <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0" />
                    </div>

                    <div className="text-xs font-medium text-green-600 bg-green-500/10 px-2 py-1 rounded truncate">
                      {categoria.suggestedCategory}
                    </div>

                    <div className="text-center">
                      <span
                        className={`text-sm font-bold ${
                          categoria.confidence >= 90
                            ? "text-green-600"
                            : categoria.confidence >= 70
                              ? "text-amber-600"
                              : "text-rose-600"
                        }`}
                      >
                        {categoria.confidence}%
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end gap-1 shrink-0">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 bg-transparent shrink-0"
                        onClick={() => setPreviewCategoria(categoria)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-green-600 hover:bg-green-700 text-white shrink-0"
                        onClick={() => approveCategoria(categoria.id)}
                        disabled={categoria.status !== "pending"}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        variant="destructive"
                        onClick={() => rejectCategoria(categoria.id)}
                        disabled={categoria.status !== "pending"}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredCategorias.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FolderTree className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Nenhuma sugestão de categoria encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Dialog */}
      <Dialog open={!!previewCategoria} onOpenChange={() => setPreviewCategoria(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Sugestão de Categoria</DialogTitle>
            <DialogDescription>Revise a sugestão de categoria gerada pela IA</DialogDescription>
          </DialogHeader>

          {previewCategoria && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white rounded-lg p-2 shadow-sm">
                  <img
                    src={previewCategoria.productImage || "/placeholder.svg"}
                    alt={previewCategoria.productName}
                    className="h-24 w-24 rounded object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{previewCategoria.productName}</h3>
                  <p className="text-sm text-muted-foreground">ID: {previewCategoria.productId}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Categoria Atual</p>
                  <p className="font-medium text-rose-600">{previewCategoria.currentCategory || "Sem categoria"}</p>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">Categoria Sugerida</p>
                  <p className="font-medium text-green-600">{previewCategoria.suggestedCategory}</p>
                </div>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-1">Confiança da IA</p>
                <p
                  className={`text-3xl font-bold ${
                    previewCategoria.confidence >= 90
                      ? "text-green-600"
                      : previewCategoria.confidence >= 70
                        ? "text-amber-600"
                        : "text-rose-600"
                  }`}
                >
                  {previewCategoria.confidence}%
                </p>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewCategoria(null)}>
              Fechar
            </Button>
            {previewCategoria?.status === "pending" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => {
                    rejectCategoria(previewCategoria.id)
                    setPreviewCategoria(null)
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Rejeitar
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    approveCategoria(previewCategoria.id)
                    setPreviewCategoria(null)
                  }}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Aprovar
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
