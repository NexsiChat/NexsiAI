"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Upload, Search, CheckCircle, XCircle, Package, FolderTree, Sparkles, Eye } from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { ProductViewModal } from "@/components/product-view-modal"

interface ApprovedItem {
  id: string
  type: "cadastro" | "enriquecimento" | "categoria"
  productId: string
  productName: string
  productImage: string
  status: "approved" | "rejected"
  approvedAt: string
  approvedBy: string
  details: string
  brand?: string
  category?: string
  ean?: string
  description?: string
}

const mockApprovedItems: ApprovedItem[] = [
  {
    id: "APR001",
    type: "enriquecimento",
    productId: "8007912482",
    productName: "Bentley Continental Gt Speed 2012 Kinsmart Azul 1:38",
    productImage: "/bentley-miniature-blue.jpg",
    status: "approved",
    approvedAt: "2024-01-15 15:45",
    approvedBy: "João Silva",
    details: "Título, descrição e categoria atualizados",
    brand: "Kinsmart",
    category: "Miniaturas > Carros de Luxo",
    ean: "7904737004818",
  },
  {
    id: "APR002",
    type: "cadastro",
    productId: "CAD001",
    productName: "Porsche 911 GT3 RS 2023 Escala 1:18",
    productImage: "/porsche-miniature-red.jpg",
    status: "approved",
    approvedAt: "2024-01-15 14:30",
    approvedBy: "Maria Santos",
    details: "Novo produto cadastrado",
    brand: "Bburago",
    category: "Miniaturas > Esportivos",
    ean: "7904737004825",
  },
  {
    id: "APR003",
    type: "categoria",
    productId: "8007912444",
    productName: "Miniatura Pickup Ford 1940 Preta Motormax 1:24",
    productImage: "/ford-pickup-miniature-black.jpg",
    status: "rejected",
    approvedAt: "2024-01-15 12:20",
    approvedBy: "Carlos Oliveira",
    details: "Categoria sugerida: Miniaturas > Carros Clássicos",
    brand: "Motormax",
    category: "Carros escala 1/24 - 1/25",
    ean: "7904737004832",
  },
  {
    id: "APR004",
    type: "enriquecimento",
    productId: "8007912500",
    productName: "Ferrari 458 Italia Vermelho Escala 1:24",
    productImage: "/ferrari-miniature-red.jpg",
    status: "approved",
    approvedAt: "2024-01-14 16:10",
    approvedBy: "Ana Costa",
    details: "Descrição melhorada pela IA",
    brand: "Bburago",
    category: "Miniaturas > Esportivos",
    ean: "7904737004849",
  },
]

export default function AprovadosPage() {
  const [items, setItems] = useState<ApprovedItem[]>(mockApprovedItems)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedItem, setSelectedItem] = useState<ApprovedItem | null>(null)
  const [showProductModal, setShowProductModal] = useState(false)

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) || item.productId.includes(searchQuery)

    if (activeTab === "all") return matchesSearch
    if (activeTab === "approved") return matchesSearch && item.status === "approved"
    if (activeTab === "rejected") return matchesSearch && item.status === "rejected"
    return matchesSearch && item.type === activeTab
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "cadastro":
        return <Package className="h-4 w-4" />
      case "enriquecimento":
        return <Sparkles className="h-4 w-4" />
      case "categoria":
        return <FolderTree className="h-4 w-4" />
      default:
        return null
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "cadastro":
        return "Cadastro"
      case "enriquecimento":
        return "Enriquecimento"
      case "categoria":
        return "Categoria"
      default:
        return type
    }
  }

  const handleViewProduct = (item: ApprovedItem) => {
    setSelectedItem(item)
    setShowProductModal(true)
  }

  const approvedCount = items.filter((i) => i.status === "approved").length
  const rejectedCount = items.filter((i) => i.status === "rejected").length

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Histórico de Aprovações</h1>
          <p className="text-muted-foreground mt-1">
            {approvedCount} aprovado(s) e {rejectedCount} rejeitado(s)
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="approved" className="text-green-600">
              <CheckCircle className="h-4 w-4 mr-1" />
              Aprovados
            </TabsTrigger>
            <TabsTrigger value="rejected" className="text-rose-600">
              <XCircle className="h-4 w-4 mr-1" />
              Rejeitados
            </TabsTrigger>
            <TabsTrigger value="cadastro">Cadastro</TabsTrigger>
            <TabsTrigger value="enriquecimento">Enriquecimento</TabsTrigger>
            <TabsTrigger value="categoria">Categoria</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Action Buttons */}
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
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="border-border bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Exportar
          </Button>

          <div className="flex-1" />

          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Items List */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Table Header - Added Ações column */}
              <div className="grid grid-cols-[70px_1fr_110px_90px_140px_120px_80px] items-center gap-4 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium">
                <div>Imagem</div>
                <div>Produto</div>
                <div>Tipo</div>
                <div>Status</div>
                <div>Data</div>
                <div>Aprovado por</div>
                <div>Ações</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-[70px_1fr_110px_90px_140px_120px_80px] items-center gap-4 px-4 py-4 transition-colors hover:bg-accent/30"
                  >
                    <div className="flex items-center justify-center">
                      <div className="bg-white rounded-lg p-1 shadow-sm">
                        <img
                          src={item.productImage || "/placeholder.svg"}
                          alt={item.productName}
                          className="h-12 w-12 rounded object-cover"
                        />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">ID: {item.productId}</p>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{item.details}</p>
                    </div>

                    <div>
                      <Badge variant="outline" className="gap-1 text-xs">
                        {getTypeIcon(item.type)}
                        {getTypeLabel(item.type)}
                      </Badge>
                    </div>

                    <div>
                      {item.status === "approved" ? (
                        <Badge className="bg-green-600 hover:bg-green-700 gap-1 text-xs">
                          <CheckCircle className="h-3 w-3" />
                          Aprovado
                        </Badge>
                      ) : (
                        <Badge variant="destructive" className="gap-1 text-xs">
                          <XCircle className="h-3 w-3" />
                          Rejeitado
                        </Badge>
                      )}
                    </div>

                    <div className="text-xs text-muted-foreground">{item.approvedAt}</div>

                    <div className="text-xs truncate">{item.approvedBy}</div>

                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 bg-amber-500 hover:bg-amber-600 border-amber-500 text-white"
                        onClick={() => handleViewProduct(item)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Nenhum item encontrado</p>
            </div>
          )}
        </div>
      </div>

      <ProductViewModal
        open={showProductModal}
        onOpenChange={setShowProductModal}
        product={
          selectedItem
            ? {
                id: selectedItem.productId,
                ref: selectedItem.id,
                name: selectedItem.productName,
                image: selectedItem.productImage,
                brand: selectedItem.brand || "Marca",
                category: selectedItem.category || "Categoria",
                ean: selectedItem.ean,
                description: selectedItem.description,
              }
            : null
        }
      />
    </AppLayout>
  )
}
