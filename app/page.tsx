"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  ArrowUpDown,
  Eye,
  Sparkles,
  Trash2,
  MoreHorizontal,
  Download,
  RefreshCw,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertTriangle,
  History,
  Copy,
  Edit,
  ShoppingCart,
  Package,
  Store,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AppLayout } from "@/components/app-layout"
import { EnrichModal } from "@/components/enrich-modal"
import { ProductViewModal } from "@/components/product-view-modal"
import { ProductHistoryModal } from "@/components/product-history-modal"
import { ProductEditModal } from "@/components/product-edit-modal"

const products = [
  {
    id: "8007812412",
    ref: "(888)",
    name: "2008 Cross Bones Harley Davidson Série 27 1:18 Maisto",
    image: "/red-rc-car.jpg",
    status: "Ativo",
    enriched: "Não",
    category: "Categoria",
    brand: "Maisto",
    qualityScore: 45,
    enrichmentProgress: 0,
    lastUpdated: "2024-01-15",
  },
  {
    id: "8007912444",
    ref: "(885)",
    name: "Miniatura Pickup Ford 1940 Preta Motormax 1:24",
    image: "/white-porsche-toy.jpg",
    status: "Ativo",
    enriched: "Já Enriquecido",
    category: "Carros escala 1/24 - 1/25",
    brand: "Motormax",
    qualityScore: 92,
    enrichmentProgress: 100,
    lastUpdated: "2024-01-20",
  },
  {
    id: "8007912482",
    ref: "(884)",
    name: "Bentley Continental Gt Speed 2012 Kinsmart Azul 1:38",
    image: "/black-mustang-toy.jpg",
    status: "Ativo",
    enriched: "Já Enriquecido",
    category: "Categoria",
    brand: "Kinsmart",
    qualityScore: 88,
    enrichmentProgress: 100,
    lastUpdated: "2024-01-18",
  },
  {
    id: "8007912500",
    ref: "(883)",
    name: "Bentley Continental Gt Speed 2012 Kinsmart Prata 1:38",
    image: "/black-hilux-toy.jpg",
    status: "Ativo",
    enriched: "Processando",
    category: "Categoria",
    brand: "Kinsmart",
    qualityScore: 65,
    enrichmentProgress: 60,
    lastUpdated: "2024-01-22",
  },
]

const channels = [
  { id: "nuvemshop", name: "Nuvemshop", icon: Store, color: "text-blue-600" },
  { id: "bling", name: "Bling", icon: Package, color: "text-amber-600" },
  { id: "tray", name: "Tray", icon: ShoppingCart, color: "text-green-600" },
  { id: "tiny", name: "Tiny ERP", icon: Zap, color: "text-purple-600" },
]

export default function ProductsPage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [showClearDialog, setShowClearDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showBulkActions, setShowBulkActions] = useState(false)
  const [showEnrichModal, setShowEnrichModal] = useState(false)
  const [productsToEnrich, setProductsToEnrich] = useState<string[]>([])
  const [showProductView, setShowProductView] = useState(false)
  const [selectedProductForView, setSelectedProductForView] = useState<(typeof products)[0] | null>(null)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [selectedProductForHistory, setSelectedProductForHistory] = useState<(typeof products)[0] | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProductForEdit, setSelectedProductForEdit] = useState<(typeof products)[0] | null>(null)

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.map((p) => p.id))
    }
  }

  const toggleSelectProduct = (id: string) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((pId) => pId !== id))
    } else {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id)
    setShowDeleteDialog(true)
  }

  const selectByStatus = (status: string) => {
    const filtered = products.filter((p) => p.enriched === status).map((p) => p.id)
    setSelectedProducts(filtered)
    setShowBulkActions(false)
  }

  const selectByQuality = (minScore: number) => {
    const filtered = products.filter((p) => p.qualityScore < minScore).map((p) => p.id)
    setSelectedProducts(filtered)
    setShowBulkActions(false)
  }

  const handleEnrichProduct = (productId: string) => {
    setProductsToEnrich([productId])
    setShowEnrichModal(true)
  }

  const handleBulkEnrich = () => {
    setProductsToEnrich(selectedProducts)
    setShowEnrichModal(true)
  }

  const handleEnrichConfirm = (options: any) => {
    console.log("Enriching products:", productsToEnrich, "with options:", options)
    setProductsToEnrich([])
  }

  const handleViewProduct = (product: (typeof products)[0]) => {
    setSelectedProductForView(product)
    setShowProductView(true)
  }

  const handleViewHistory = (product: (typeof products)[0]) => {
    setSelectedProductForHistory(product)
    setShowHistoryModal(true)
  }

  const handleEditProduct = (product: (typeof products)[0]) => {
    setSelectedProductForEdit(product)
    setShowEditModal(true)
  }

  const handleDuplicateProduct = (product: (typeof products)[0]) => {
    // Simular duplicação - em produção, isso criaria um novo produto no banco
    console.log("Duplicating product:", product.id)
    alert(`Produto "${product.name}" duplicado com sucesso!`)
  }

  const handleSaveProduct = (updatedProduct: (typeof products)[0]) => {
    // Simular salvamento - em produção, isso atualizaria o banco
    console.log("Saving product:", updatedProduct)
    alert(`Produto "${updatedProduct.name}" atualizado com sucesso!`)
  }

  return (
    <AppLayout>
      {/* Sugestão IA */}
      <div className="mb-6 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-primary">Sugestão de IA</h3>
              <p className="text-sm text-muted-foreground">
                Você tem 2 produtos com qualidade abaixo de 50%. Enriquecer esses produtos pode aumentar suas
                conversões.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs font-medium"
                >
                  {i}
                </div>
              ))}
            </div>
            <Button
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={() => {
                const lowQualityProducts = products.filter((p) => p.qualityScore < 50).map((p) => p.id)
                setProductsToEnrich(lowQualityProducts)
                setShowEnrichModal(true)
              }}
            >
              <Sparkles className="h-4 w-4" />
              Enriquecer Agora (2 produtos)
            </Button>
            <Button variant="outline">Ver detalhes</Button>
          </div>
        </div>
      </div>

      {/* Channel Selector Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Catálogo de produtos</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie seus produtos por canal de venda</p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2 border-2 bg-transparent">
              {(() => {
                const Icon = selectedChannel.icon
                return <Icon className={`h-4 w-4 ${selectedChannel.color}`} />
              })()}
              <span className="font-medium">{selectedChannel.name}</span>
              <ArrowUpDown className="h-4 w-4 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {channels.map((channel) => {
              const Icon = channel.icon
              return (
                <DropdownMenuItem key={channel.id} onClick={() => setSelectedChannel(channel)} className="gap-2">
                  <Icon className={`h-4 w-4 ${channel.color}`} />
                  <span>{channel.name}</span>
                  {selectedChannel.id === channel.id && <CheckCircle2 className="ml-auto h-4 w-4 text-primary" />}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Actions Bar */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Ordenar por
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar catálogo
            </Button>
            <DropdownMenu open={showBulkActions} onOpenChange={setShowBulkActions}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Seleção Inteligente
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                <div className="p-2">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Selecionar por status</p>
                  <DropdownMenuItem onClick={() => selectByStatus("Não")}>
                    <AlertTriangle className="mr-2 h-4 w-4 text-orange-500" />
                    Não enriquecidos ({products.filter((p) => p.enriched === "Não").length})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => selectByStatus("Processando")}>
                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                    Em processamento ({products.filter((p) => p.enriched === "Processando").length})
                  </DropdownMenuItem>
                </div>
                <div className="border-t p-2">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Selecionar por qualidade</p>
                  <DropdownMenuItem onClick={() => selectByQuality(50)}>
                    <TrendingUp className="mr-2 h-4 w-4 text-red-500" />
                    Qualidade baixa (&lt;50) ({products.filter((p) => p.qualityScore < 50).length})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => selectByQuality(80)}>
                    <TrendingUp className="mr-2 h-4 w-4 text-yellow-500" />
                    Qualidade média (&lt;80) ({products.filter((p) => p.qualityScore < 80).length})
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="destructive" size="sm" onClick={() => setShowClearDialog(true)}>
              Limpar Catálogo
            </Button>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Pesquisar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="flex items-center gap-2 rounded-lg border border-primary bg-primary/5 px-4 py-2.5">
            <span className="text-sm font-medium">{selectedProducts.length} selecionados</span>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={handleBulkEnrich}>
                <Sparkles className="mr-2 h-4 w-4" />
                Enriquecer ({selectedProducts.length} produtos)
              </Button>
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Exportar
              </Button>
              <Button size="sm" variant="destructive" onClick={() => setShowClearDialog(true)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Remover
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <div className="min-w-[1100px]">
          {/* Table Header */}
          <div className="grid grid-cols-[40px_80px_100px_200px_80px_120px_100px_100px_100px_120px] items-center gap-2 border-b border-border px-4 py-3 text-sm font-medium text-muted-foreground">
            <Checkbox checked={selectedProducts.length === products.length} onCheckedChange={toggleSelectAll} />
            <span>{products.length} produtos</span>
            <span>Imagem</span>
            <span>Nome</span>
            <span>Status</span>
            <span>Enriquecimento</span>
            <span>Qualidade</span>
            <span>Categoria</span>
            <span>Marca</span>
            <span className="text-right">Ações</span>
          </div>

          {/* Table Body */}
          <div>
            {products.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-[40px_80px_100px_200px_80px_120px_100px_100px_100px_120px] items-center gap-2 border-b border-border px-4 py-3 last:border-b-0 hover:bg-muted/50"
              >
                <Checkbox
                  checked={selectedProducts.includes(product.id)}
                  onCheckedChange={() => toggleSelectProduct(product.id)}
                />
                {/* ID */}
                <div className="text-sm font-medium">
                  {product.id}
                  <p className="text-xs text-muted-foreground">
                    {new Date(product.lastUpdated).toLocaleDateString("pt-BR")}
                  </p>
                </div>
                {/* Imagem */}
                <div>
                  <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-border bg-muted">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0.5 right-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        product.qualityScore >= 80
                          ? "bg-green-500 text-white"
                          : product.qualityScore >= 50
                            ? "bg-yellow-500 text-white"
                            : "bg-red-500 text-white"
                      }`}
                    >
                      {product.qualityScore}
                    </div>
                  </div>
                </div>
                {/* Nome */}
                <div>
                  <p className="text-sm line-clamp-2">{product.name}</p>
                </div>
                {/* Status */}
                <div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20 text-xs">
                    {product.status}
                  </Badge>
                </div>
                {/* Enriquecimento */}
                <div>
                  {product.enriched === "Já Enriquecido" ? (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20 text-xs">
                      <CheckCircle2 className="mr-1 h-3 w-3" />
                      Enriquecido
                    </Badge>
                  ) : product.enriched === "Processando" ? (
                    <div className="space-y-1">
                      <Badge
                        variant="outline"
                        className="bg-purple-500/10 text-purple-500 border-purple-500/20 text-xs"
                      >
                        <Clock className="mr-1 h-3 w-3" />
                        Processando
                      </Badge>
                      <div className="h-1 w-full bg-accent rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 transition-all"
                          style={{ width: `${product.enrichmentProgress}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20 text-xs">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Não
                    </Badge>
                  )}
                </div>
                {/* Qualidade */}
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            product.qualityScore >= 80
                              ? "bg-green-500"
                              : product.qualityScore >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${product.qualityScore}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-medium w-6">{product.qualityScore}</span>
                  </div>
                </div>
                {/* Categoria */}
                <div>
                  <span className="text-sm text-muted-foreground">{product.category}</span>
                </div>
                {/* Marca */}
                <div>
                  <span className="text-sm">{product.brand}</span>
                </div>
                {/* Ações */}
                <div className="flex items-center justify-end gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleViewProduct(product)}
                  >
                    <Eye className="h-4 w-4 text-white" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 bg-amber-500 hover:bg-amber-600"
                    onClick={() => handleEnrichProduct(product.id)}
                  >
                    <Sparkles className="h-4 w-4 text-white" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 bg-amber-500 hover:bg-amber-600">
                        <MoreHorizontal className="h-4 w-4 text-white" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewProduct(product)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEnrichProduct(product.id)}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Enriquecer
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleViewHistory(product)}>
                        <History className="mr-2 h-4 w-4" />
                        Ver Histórico
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateProduct(product)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditProduct(product)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Clear Catalog Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Limpar Catálogo</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover todos os produtos do catálogo? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowClearDialog(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setShowClearDialog(false)}>
              Limpar Catálogo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Product Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Produto</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                setShowDeleteDialog(false)
                setProductToDelete(null)
              }}
            >
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Enrich Modal */}
      <EnrichModal
        open={showEnrichModal}
        onOpenChange={setShowEnrichModal}
        productCount={productsToEnrich.length}
        onConfirm={handleEnrichConfirm}
      />

      <ProductViewModal
        open={showProductView}
        onOpenChange={setShowProductView}
        product={selectedProductForView}
        onEnrich={() => {
          if (selectedProductForView) {
            setShowProductView(false)
            handleEnrichProduct(selectedProductForView.id)
          }
        }}
      />

      {/* Product History Modal */}
      <ProductHistoryModal
        open={showHistoryModal}
        onOpenChange={setShowHistoryModal}
        product={selectedProductForHistory}
      />

      {/* Product Edit Modal */}
      <ProductEditModal
        product={selectedProductForEdit}
        open={showEditModal}
        onOpenChange={setShowEditModal}
        onSave={handleSaveProduct}
      />
    </AppLayout>
  )
}
