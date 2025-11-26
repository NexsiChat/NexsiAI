"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Check,
  X,
  Eye,
  ChevronDown,
  Upload,
  Download,
  Search,
  Package,
  Tag,
  Ruler,
  Globe,
  User,
  Calendar,
  DollarSign,
  Boxes,
  Sparkles,
  AlertTriangle,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"

interface PendingCadastro {
  id: string
  name: string
  images: string[]
  sku: string
  ean: string
  price: number
  stock: number
  createdAt: string
  createdBy: string
  status: "pending" | "approved" | "rejected"
  // New fields
  description: string
  category: string
  brand: string
  metaTitle: string
  metaDescription: string
  tags: string[]
  weight: string
  height: string
  width: string
  depth: string
  qualityScore: number
  warnings: string[]
}

const mockPendingCadastros: PendingCadastro[] = [
  {
    id: "CAD001",
    name: "Porsche 911 GT3 RS 2023 Escala 1:18",
    images: [
      "/porsche-miniature-car-red.jpg",
      "/porsche-911-front-view.jpg",
      "/porsche-911-side.png",
      "/porsche-911-back-view.jpg",
    ],
    sku: "POR-911-GT3",
    ean: "7891234567890",
    price: 459.9,
    stock: 25,
    createdAt: "2024-01-15 14:32",
    createdBy: "João Silva",
    status: "pending",
    description:
      "Miniatura em escala 1:18 do icônico Porsche 911 GT3 RS 2023. Fabricado com materiais premium, incluindo corpo em metal fundido e detalhes em plástico ABS de alta qualidade. Portas, capô e porta-malas funcionais. Rodas com suspensão e direção funcionais. Acabamento em pintura automotiva vermelha com detalhes em preto e fibra de carbono.",
    category: "Miniaturas > Carros de Luxo > Porsche",
    brand: "AutoArt",
    metaTitle: "Miniatura Porsche 911 GT3 RS 2023 Escala 1:18 - AutoArt",
    metaDescription:
      "Compre a miniatura do Porsche 911 GT3 RS 2023 em escala 1:18. Corpo em metal, portas funcionais e acabamento premium. Entrega para todo Brasil.",
    tags: ["miniatura", "porsche", "911", "gt3", "escala 1:18", "colecionável"],
    weight: "850g",
    height: "8cm",
    width: "12cm",
    depth: "28cm",
    qualityScore: 92,
    warnings: [],
  },
  {
    id: "CAD002",
    name: "Ferrari F40 1987 Vermelho Escala 1:24",
    images: ["/ferrari-f40-miniature-red.jpg", "/ferrari-f40-front.jpg"],
    sku: "FER-F40-87",
    ean: "7891234567891",
    price: 289.9,
    stock: 12,
    createdAt: "2024-01-15 10:15",
    createdBy: "Maria Santos",
    status: "pending",
    description:
      "Réplica em escala 1:24 da lendária Ferrari F40 de 1987. Modelo colecionável com detalhes fiéis ao original.",
    category: "Miniaturas > Carros de Luxo > Ferrari",
    brand: "Bburago",
    metaTitle: "Ferrari F40 1987 Miniatura Escala 1:24",
    metaDescription: "Miniatura Ferrari F40 1987 vermelha em escala 1:24. Modelo colecionável de alta qualidade.",
    tags: ["ferrari", "f40", "miniatura", "1987"],
    weight: "450g",
    height: "6cm",
    width: "9cm",
    depth: "18cm",
    qualityScore: 78,
    warnings: ["Descrição curta - recomendamos expandir", "Meta description pode ser melhorada"],
  },
  {
    id: "CAD003",
    name: "Lamborghini Countach LP400 Branco",
    images: ["/lamborghini-countach-white-miniature.jpg"],
    sku: "LAM-CNT-400",
    ean: "7891234567892",
    price: 349.9,
    stock: 8,
    createdAt: "2024-01-14 16:45",
    createdBy: "Carlos Oliveira",
    status: "pending",
    description: "Miniatura do clássico Lamborghini Countach LP400 na cor branca.",
    category: "",
    brand: "Kyosho",
    metaTitle: "",
    metaDescription: "",
    tags: ["lamborghini", "countach"],
    weight: "520g",
    height: "7cm",
    width: "10cm",
    depth: "22cm",
    qualityScore: 45,
    warnings: ["Categoria não definida", "Meta title ausente", "Meta description ausente", "Descrição muito curta"],
  },
]

export default function AprovacaoCadastroPage() {
  const [cadastros, setCadastros] = useState<PendingCadastro[]>(mockPendingCadastros)
  const [selectedCadastros, setSelectedCadastros] = useState<string[]>([])
  const [previewCadastro, setPreviewCadastro] = useState<PendingCadastro | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  const toggleSelectCadastro = (cadastroId: string) => {
    setSelectedCadastros((prev) =>
      prev.includes(cadastroId) ? prev.filter((id) => id !== cadastroId) : [...prev, cadastroId],
    )
  }

  const toggleSelectAll = () => {
    if (selectedCadastros.length === cadastros.filter((c) => c.status === "pending").length) {
      setSelectedCadastros([])
    } else {
      setSelectedCadastros(cadastros.filter((c) => c.status === "pending").map((c) => c.id))
    }
  }

  const approveCadastro = (cadastroId: string) => {
    setCadastros((prev) => prev.map((c) => (c.id === cadastroId ? { ...c, status: "approved" as const } : c)))
    setSelectedCadastros((prev) => prev.filter((id) => id !== cadastroId))
  }

  const rejectCadastro = (cadastroId: string) => {
    setCadastros((prev) => prev.map((c) => (c.id === cadastroId ? { ...c, status: "rejected" as const } : c)))
    setSelectedCadastros((prev) => prev.filter((id) => id !== cadastroId))
  }

  const approveSelected = () => {
    setCadastros((prev) =>
      prev.map((c) => (selectedCadastros.includes(c.id) ? { ...c, status: "approved" as const } : c)),
    )
    setSelectedCadastros([])
  }

  const rejectSelected = () => {
    setCadastros((prev) =>
      prev.map((c) => (selectedCadastros.includes(c.id) ? { ...c, status: "rejected" as const } : c)),
    )
    setSelectedCadastros([])
  }

  const filteredCadastros = cadastros.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.includes(searchQuery) ||
      c.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ean.includes(searchQuery),
  )

  const pendingCount = cadastros.filter((c) => c.status === "pending").length

  const getQualityColor = (score: number) => {
    if (score >= 80) return "text-green-600 bg-green-100"
    if (score >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const openPreview = (cadastro: PendingCadastro) => {
    setSelectedImageIndex(0)
    setPreviewCadastro(cadastro)
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Aprovação de Cadastro</h1>
          <p className="text-muted-foreground mt-1">{pendingCount} produto(s) aguardando aprovação</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
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
                <DropdownMenuItem onClick={() => setSortBy("name")}>Nome</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("price")}>Preço</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("quality")}>Qualidade</DropdownMenuItem>
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

          {selectedCadastros.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">{selectedCadastros.length} selecionado(s)</span>
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
            placeholder="Pesquisar por nome, SKU, EAN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            {/* Table Header - Added quality column */}
            <div className="grid grid-cols-[40px_70px_minmax(180px,1fr)_100px_130px_90px_70px_80px_120px_110px] items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border text-sm font-medium min-w-[1100px]">
              <div className="flex items-center justify-center">
                <Checkbox
                  checked={
                    selectedCadastros.length === cadastros.filter((c) => c.status === "pending").length &&
                    cadastros.filter((c) => c.status === "pending").length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                />
              </div>
              <div>Imagem</div>
              <div>Produto</div>
              <div>SKU</div>
              <div>EAN</div>
              <div>Preço</div>
              <div>Estoque</div>
              <div>Qualidade</div>
              <div>Criado por</div>
              <div className="text-center">Ações</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-border">
              {filteredCadastros.map((cadastro) => (
                <div
                  key={cadastro.id}
                  className={`grid grid-cols-[40px_70px_minmax(180px,1fr)_100px_130px_90px_70px_80px_120px_110px] items-center gap-3 px-4 py-4 transition-colors hover:bg-accent/30 min-w-[1100px] ${
                    selectedCadastros.includes(cadastro.id) ? "bg-primary/5" : ""
                  } ${cadastro.status !== "pending" ? "opacity-50" : ""}`}
                >
                  <div className="flex items-center justify-center">
                    <Checkbox
                      checked={selectedCadastros.includes(cadastro.id)}
                      onCheckedChange={() => toggleSelectCadastro(cadastro.id)}
                      disabled={cadastro.status !== "pending"}
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="bg-white rounded-lg p-1 shadow-sm relative">
                      <img
                        src={cadastro.images[0] || "/placeholder.svg"}
                        alt={cadastro.name}
                        className="h-12 w-12 rounded object-cover"
                      />
                      {cadastro.images.length > 1 && (
                        <span className="absolute -bottom-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          +{cadastro.images.length - 1}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{cadastro.name}</p>
                    <p className="text-xs text-muted-foreground">{cadastro.createdAt}</p>
                    {cadastro.warnings.length > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                        <span className="text-xs text-yellow-600">{cadastro.warnings.length} aviso(s)</span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm font-mono truncate">{cadastro.sku}</div>
                  <div className="text-sm font-mono truncate">{cadastro.ean}</div>
                  <div className="text-sm font-medium">R$ {cadastro.price.toFixed(2).replace(".", ",")}</div>
                  <div className="text-sm">{cadastro.stock} un</div>

                  <div>
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getQualityColor(cadastro.qualityScore)}`}
                    >
                      {cadastro.qualityScore}%
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground truncate">{cadastro.createdBy}</div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 bg-transparent shrink-0"
                      onClick={() => openPreview(cadastro)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-8 w-8 bg-green-600 hover:bg-green-700 text-white shrink-0"
                      onClick={() => approveCadastro(cadastro.id)}
                      disabled={cadastro.status !== "pending"}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      variant="destructive"
                      onClick={() => rejectCadastro(cadastro.id)}
                      disabled={cadastro.status !== "pending"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredCadastros.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Nenhum cadastro encontrado</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!previewCadastro} onOpenChange={() => setPreviewCadastro(null)}>
        <DialogContent className="w-[95vw] !max-w-[1200px] max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-xl">Detalhes do Cadastro</DialogTitle>
                <DialogDescription>Revise todas as informações antes de aprovar</DialogDescription>
              </div>
              {previewCadastro && (
                <div className="flex items-center gap-3">
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getQualityColor(previewCadastro.qualityScore)}`}
                  >
                    <Sparkles className="h-4 w-4" />
                    <span className="font-medium">Qualidade: {previewCadastro.qualityScore}%</span>
                  </div>
                  {previewCadastro.status === "pending" && (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          rejectCadastro(previewCadastro.id)
                          setPreviewCadastro(null)
                        }}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Rejeitar
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          approveCadastro(previewCadastro.id)
                          setPreviewCadastro(null)
                        }}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Aprovar
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogHeader>

          {previewCadastro && (
            <ScrollArea className="max-h-[calc(90vh-100px)]">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Column - Images */}
                  <div className="lg:w-[280px] shrink-0 space-y-4">
                    {/* Main Image */}
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-border">
                      <img
                        src={previewCadastro.images[selectedImageIndex] || "/placeholder.svg"}
                        alt={previewCadastro.name}
                        className="w-full aspect-square rounded-lg object-cover"
                      />
                    </div>

                    {/* Thumbnails */}
                    {previewCadastro.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2">
                        {previewCadastro.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`bg-white rounded-lg p-1 shadow-sm border-2 transition-colors ${
                              selectedImageIndex === index
                                ? "border-primary"
                                : "border-transparent hover:border-primary/50"
                            }`}
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`${previewCadastro.name} ${index + 1}`}
                              className="w-full aspect-square rounded object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Creator Info */}
                    <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                      <h4 className="font-medium flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-primary" />
                        Cadastrado por
                      </h4>
                      <div>
                        <p className="font-medium">{previewCadastro.createdBy}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {previewCadastro.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Product Details */}
                  <div className="flex-1 space-y-6 min-w-0">
                    {/* Warnings */}
                    {previewCadastro.warnings.length > 0 && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <h4 className="font-medium flex items-center gap-2 text-yellow-800 mb-2">
                          <AlertTriangle className="h-4 w-4" />
                          Avisos ({previewCadastro.warnings.length})
                        </h4>
                        <ul className="space-y-1">
                          {previewCadastro.warnings.map((warning, index) => (
                            <li key={index} className="text-sm text-yellow-700 flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                              {warning}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Product Name & Description */}
                    <div className="space-y-3">
                      <h2 className="text-2xl font-bold">{previewCadastro.name}</h2>
                      <p className="text-muted-foreground leading-relaxed">{previewCadastro.description}</p>
                    </div>

                    {/* Basic Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="bg-muted/50 rounded-xl p-4">
                        <p className="text-xs text-muted-foreground mb-1">SKU</p>
                        <p className="font-mono font-medium">{previewCadastro.sku}</p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4">
                        <p className="text-xs text-muted-foreground mb-1">EAN</p>
                        <p className="font-mono font-medium">{previewCadastro.ean}</p>
                      </div>
                      <div className="bg-primary/10 rounded-xl p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <DollarSign className="h-3 w-3" /> Preço
                        </p>
                        <p className="text-xl font-bold text-primary">
                          R$ {previewCadastro.price.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4">
                        <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                          <Boxes className="h-3 w-3" /> Estoque
                        </p>
                        <p className="text-xl font-bold">{previewCadastro.stock} un</p>
                      </div>
                    </div>

                    {/* Category & Brand */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-xl p-4">
                        <h4 className="font-medium flex items-center gap-2 text-sm mb-2">
                          <Tag className="h-4 w-4 text-primary" />
                          Categoria
                        </h4>
                        <p className={`text-sm ${previewCadastro.category ? "" : "text-red-500 italic"}`}>
                          {previewCadastro.category || "Não definida"}
                        </p>
                      </div>
                      <div className="bg-muted/50 rounded-xl p-4">
                        <h4 className="font-medium flex items-center gap-2 text-sm mb-2">
                          <Tag className="h-4 w-4 text-primary" />
                          Marca
                        </h4>
                        <p className="text-sm">{previewCadastro.brand}</p>
                      </div>
                    </div>

                    {/* Tags */}
                    {previewCadastro.tags.length > 0 && (
                      <div className="bg-muted/50 rounded-xl p-4">
                        <h4 className="font-medium flex items-center gap-2 text-sm mb-3">
                          <Tag className="h-4 w-4 text-primary" />
                          Tags
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {previewCadastro.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SEO */}
                    <div className="bg-muted/50 rounded-xl p-4 space-y-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" />
                        SEO
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Meta Title</p>
                          <p className={`text-sm ${previewCadastro.metaTitle ? "" : "text-red-500 italic"}`}>
                            {previewCadastro.metaTitle || "Não definido"}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Meta Description</p>
                          <p className={`text-sm ${previewCadastro.metaDescription ? "" : "text-red-500 italic"}`}>
                            {previewCadastro.metaDescription || "Não definida"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dimensions */}
                    <div className="bg-muted/50 rounded-xl p-4">
                      <h4 className="font-medium flex items-center gap-2 mb-3">
                        <Ruler className="h-4 w-4 text-primary" />
                        Dimensões
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Peso</p>
                          <p className="font-medium">{previewCadastro.weight}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Altura</p>
                          <p className="font-medium">{previewCadastro.height}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Largura</p>
                          <p className="font-medium">{previewCadastro.width}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Profundidade</p>
                          <p className="font-medium">{previewCadastro.depth}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
