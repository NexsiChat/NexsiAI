"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Check,
  X,
  Pencil,
  Sparkles,
  ChevronDown,
  Upload,
  Download,
  Search,
  ArrowLeft,
  Package,
  Ruler,
  ArrowRight,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"

interface PendingProduct {
  id: string
  reference: string
  name: string
  image: string
  images?: string[]
  brand: string
  category: string
  ean: string
  qualityScore: number
  originalTitle: string
  suggestedTitle: string
  originalDescription: string
  suggestedDescription: string
  originalCategory: string
  suggestedCategory: string
  originalMetaTitle: string
  suggestedMetaTitle: string
  originalMetaDescription: string
  suggestedMetaDescription: string
  originalTags: string
  suggestedTags: string
  qualityBefore: number
  qualityAfter: number
  weight: string
  height: string
  width: string
  length: string
  status: "pending" | "approved" | "rejected"
}

const mockPendingProducts: PendingProduct[] = [
  {
    id: "8007912482",
    reference: "884",
    name: "Bentley Continental Gt Speed 2012 Kinsmart Azul 1:38",
    image: "/blue-bentley-continental-miniature-car.jpg",
    images: [
      "/blue-bentley-continental-miniature-car-front.jpg",
      "/blue-bentley-continental-miniature-car-side.jpg",
      "/blue-bentley-continental-miniature-car-back.jpg",
      "/blue-bentley-continental-miniature-car-top.jpg",
    ],
    brand: "Kinsmart",
    category: "Categoria",
    ean: "880798989493",
    qualityScore: 53,
    originalTitle: "Bentley 2012",
    suggestedTitle: "Bentley Continental Gt Speed 2012 Kinsmart Azul 1:38",
    originalDescription: "Carro miniatura",
    suggestedDescription:
      "Miniatura colecionável do Bentley Continental GT Speed 2012, fabricada pela Kinsmart na escala 1:38. Acabamento em azul metálico com detalhes premium. Portas que abrem, pneus de borracha e rodas cromadas. Ideal para colecionadores e entusiastas de carros de luxo.",
    originalCategory: "Sem categoria",
    suggestedCategory: "Miniaturas > Carros de Luxo > Bentley",
    originalMetaTitle: "Bentley 2012",
    suggestedMetaTitle: "Bentley Continental GT Speed 2012 Miniatura 1:38 | Kinsmart",
    originalMetaDescription: "Carro miniatura",
    suggestedMetaDescription:
      "Compre a miniatura colecionável Bentley Continental GT Speed 2012 Kinsmart 1:38. Acabamento azul metálico, portas que abrem. Frete grátis!",
    originalTags: "carro, miniatura",
    suggestedTags: "bentley, continental gt, miniatura 1:38, kinsmart, carro de luxo, colecionável",
    qualityBefore: 35,
    qualityAfter: 88,
    weight: "0.150",
    height: "4.00",
    width: "5.00",
    length: "12.00",
    status: "pending",
  },
  {
    id: "8007912444",
    reference: "885",
    name: "Miniatura Pickup Ford 1940 Preta Motormax 1:24",
    image: "/black-ford-pickup-1940-miniature-vintage.jpg",
    images: ["/black-ford-pickup-1940-miniature-front.jpg", "/black-ford-pickup-1940-miniature-side.jpg", "/black-ford-pickup-1940-miniature-back.jpg"],
    brand: "Motormax",
    category: "Carros escala 1/24 - 1/25",
    ean: "880164580842",
    qualityScore: 46,
    originalTitle: "Ford 1940 Pickup",
    suggestedTitle: "Miniatura Pickup Ford 1940 Preta Motormax 1:24 Premium",
    originalDescription: "Pickup antiga",
    suggestedDescription:
      "Réplica em miniatura da clássica Pickup Ford 1940, produzida pela Motormax na escala 1:24. Modelo com portas que abrem, capô funcional e acabamento em pintura preta brilhante. Construída em metal e plástico de alta qualidade.",
    originalCategory: "Veículos",
    suggestedCategory: "Miniaturas > Carros Clássicos > Ford",
    originalMetaTitle: "Ford 1940",
    suggestedMetaTitle: "Pickup Ford 1940 Miniatura 1:24 Preta | Motormax Premium",
    originalMetaDescription: "Pickup antiga",
    suggestedMetaDescription:
      "Miniatura Pickup Ford 1940 Motormax 1:24. Acabamento premium em preto, portas e capô funcionais. Perfeita para colecionadores!",
    originalTags: "ford, pickup",
    suggestedTags: "ford 1940, pickup vintage, miniatura 1:24, motormax, carro clássico, colecionável",
    qualityBefore: 32,
    qualityAfter: 92,
    weight: "0.370",
    height: "6.00",
    width: "7.50",
    length: "21.00",
    status: "pending",
  },
]

export default function AprovacaoEnriquecimentoPage() {
  const [products, setProducts] = useState<PendingProduct[]>(mockPendingProducts)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [previewProduct, setPreviewProduct] = useState<PendingProduct | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [selectedImage, setSelectedImage] = useState(0)

  const toggleSelectProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  const toggleSelectAll = () => {
    if (selectedProducts.length === products.filter((p) => p.status === "pending").length) {
      setSelectedProducts([])
    } else {
      setSelectedProducts(products.filter((p) => p.status === "pending").map((p) => p.id))
    }
  }

  const approveProduct = (productId: string) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, status: "approved" as const } : p)))
    setSelectedProducts((prev) => prev.filter((id) => id !== productId))
  }

  const rejectProduct = (productId: string) => {
    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, status: "rejected" as const } : p)))
    setSelectedProducts((prev) => prev.filter((id) => id !== productId))
  }

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.includes(searchQuery) ||
      p.ean.includes(searchQuery),
  )

  const images = previewProduct?.images || [previewProduct?.image]

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-foreground">Aprovação de enriquecimento</h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                <ChevronDown className="mr-2 h-4 w-4" />
                Ordenar por
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("recent")}>Mais recentes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("oldest")}>Mais antigos</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("quality")}>Qualidade</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>Nome</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="border-border bg-transparent">
            <Upload className="mr-2 h-4 w-4" />
            Exportar dados
          </Button>

          <Button variant="outline" className="border-border bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Importar dados
          </Button>

          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64 bg-background border-border"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              {/* Table Header */}
              <div className="grid grid-cols-[40px_80px_100px_70px_1fr_100px_150px_120px_100px] items-center gap-3 px-4 py-3 bg-muted/80 border-b border-border text-sm font-medium">
                <div className="flex items-center justify-center">
                  <Checkbox
                    checked={
                      selectedProducts.length === products.filter((p) => p.status === "pending").length &&
                      products.filter((p) => p.status === "pending").length > 0
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </div>
                <div className="flex items-center gap-1">
                  Imagem
                  <Sparkles className="h-3 w-3 text-amber-500" />
                </div>
                <div>Id</div>
                <div>Ref.</div>
                <div className="flex items-center gap-1">
                  Nome do produto
                  <Sparkles className="h-3 w-3 text-amber-500" />
                </div>
                <div>Marca</div>
                <div className="flex items-center gap-1">
                  Categoria
                  <Sparkles className="h-3 w-3 text-amber-500" />
                </div>
                <div>EAN</div>
                <div className="text-center">Ações</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-border">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`grid grid-cols-[40px_80px_100px_70px_1fr_100px_150px_120px_100px] items-center gap-3 px-4 py-3 transition-colors hover:bg-accent/30 ${
                      selectedProducts.includes(product.id) ? "bg-primary/5" : ""
                    } ${product.status !== "pending" ? "opacity-50" : ""}`}
                  >
                    <div className="flex items-center justify-center">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleSelectProduct(product.id)}
                        disabled={product.status !== "pending"}
                      />
                    </div>

                    {/* Image */}
                    <div className="flex items-center justify-center">
                      <div className="bg-white rounded-lg p-1 shadow-sm">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-14 w-14 rounded object-cover"
                        />
                      </div>
                    </div>

                    <div className="text-sm font-medium truncate">{product.id}</div>
                    <div className="text-sm text-muted-foreground">({product.reference})</div>

                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-sm font-medium truncate">{product.name}</span>
                      <span className="text-xs text-muted-foreground shrink-0">{product.qualityScore}</span>
                    </div>

                    <div className="text-sm truncate">{product.brand}</div>
                    <div className="text-sm truncate">{product.category}</div>
                    <div className="text-sm font-mono truncate">{product.ean}</div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-amber-500 hover:bg-amber-600 text-black shrink-0"
                        onClick={() => {
                          setSelectedImage(0)
                          setPreviewProduct(product)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-green-500 hover:bg-green-600 text-white shrink-0"
                        onClick={() => approveProduct(product.id)}
                        disabled={product.status !== "pending"}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        className="h-8 w-8 bg-rose-500 hover:bg-rose-600 text-white shrink-0"
                        onClick={() => rejectProduct(product.id)}
                        disabled={product.status !== "pending"}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!previewProduct} onOpenChange={() => setPreviewProduct(null)}>
        <DialogContent className="w-[95vw] !max-w-[1200px] max-h-[90vh] p-0 overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>Revisar Enriquecimento</DialogTitle>
          </DialogHeader>

          <ScrollArea className="max-h-[90vh]">
            {previewProduct && (
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="default"
                      size="icon"
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setPreviewProduct(null)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        Revisar Enriquecimento
                      </h1>
                      <p className="text-sm text-muted-foreground">Compare as alterações sugeridas pela IA</p>
                    </div>
                  </div>

                  {/* Quality Score */}
                  <div className="flex items-center gap-4 bg-muted/50 rounded-xl px-4 py-2">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Antes</p>
                      <p className="text-2xl font-bold text-rose-500">{previewProduct.qualityBefore}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Depois</p>
                      <p className="text-2xl font-bold text-green-500">{previewProduct.qualityAfter}</p>
                    </div>
                    <div className="ml-2 px-2 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-medium">
                      +{previewProduct.qualityAfter - previewProduct.qualityBefore} pts
                    </div>
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row gap-6">
                  {/* Left Section - Images + Description */}
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-4">
                      {/* Thumbnails */}
                      <div className="flex flex-col gap-2 w-20 shrink-0">
                        {images.slice(0, 5).map((img, index) => (
                          <div
                            key={index}
                            className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                              selectedImage === index
                                ? "border-primary ring-2 ring-primary/20"
                                : "border-gray-200 hover:border-primary/50"
                            }`}
                            onClick={() => setSelectedImage(index)}
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`${previewProduct.name} - imagem ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>

                      {/* Main Image */}
                      <div className="flex-1">
                        <div className="aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                          <img
                            src={images[selectedImage] || "/placeholder.svg"}
                            alt={previewProduct.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description Comparison Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5 mt-4">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Package className="h-5 w-5 text-primary" />
                        Descrição do Produto
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-rose-50 rounded-lg border border-rose-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                            <span className="text-xs font-medium text-rose-600">ORIGINAL</span>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{previewProduct.originalDescription}</p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-xs font-medium text-green-600">SUGERIDO</span>
                            <Sparkles className="h-3 w-3 text-amber-500" />
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">{previewProduct.suggestedDescription}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Section - Info Cards */}
                  <div className="w-full xl:w-[400px] shrink-0 space-y-4">
                    {/* Informações Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Package className="h-5 w-5 text-blue-500" />
                        Informações
                      </h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-gray-500">Referência:</Label>
                            <Input value={previewProduct.reference} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500">EAN:</Label>
                            <Input value={previewProduct.ean} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                          </div>
                        </div>

                        {/* Title Comparison */}
                        <div>
                          <Label className="text-xs text-gray-500 flex items-center gap-1">
                            Nome: <Sparkles className="h-3 w-3 text-amber-500" />
                          </Label>
                          <div className="mt-1 space-y-2">
                            <div className="p-2 bg-rose-50 rounded border border-rose-200 text-sm">
                              <span className="text-[10px] text-rose-500 font-medium">ORIGINAL</span>
                              <p className="text-gray-700">{previewProduct.originalTitle}</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded border border-green-200 text-sm">
                              <span className="text-[10px] text-green-500 font-medium">SUGERIDO</span>
                              <p className="text-gray-700">{previewProduct.suggestedTitle}</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-xs text-gray-500">Marca:</Label>
                            <Input value={previewProduct.brand} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                          </div>
                          <div>
                            <Label className="text-xs text-gray-500 flex items-center gap-1">
                              Categoria: <Sparkles className="h-3 w-3 text-amber-500" />
                            </Label>
                            <div className="mt-1 space-y-1">
                              <div className="p-1.5 bg-rose-50 rounded border border-rose-200 text-xs">
                                <span className="text-[10px] text-rose-500">ORIGINAL:</span>{" "}
                                {previewProduct.originalCategory}
                              </div>
                              <div className="p-1.5 bg-green-50 rounded border border-green-200 text-xs">
                                <span className="text-[10px] text-green-500">SUGERIDO:</span>{" "}
                                {previewProduct.suggestedCategory}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SEO Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Search className="h-5 w-5 text-green-500" />
                        SEO
                      </h3>

                      <div className="space-y-4">
                        {/* Meta Title */}
                        <div>
                          <Label className="text-xs text-gray-500 flex items-center gap-1">
                            Meta Title: <Sparkles className="h-3 w-3 text-amber-500" />
                          </Label>
                          <div className="mt-1 space-y-1">
                            <div className="p-2 bg-rose-50 rounded border border-rose-200 text-xs">
                              <span className="text-[10px] text-rose-500 font-medium">ORIGINAL</span>
                              <p className="text-gray-700">{previewProduct.originalMetaTitle}</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded border border-green-200 text-xs">
                              <span className="text-[10px] text-green-500 font-medium">SUGERIDO</span>
                              <p className="text-gray-700">{previewProduct.suggestedMetaTitle}</p>
                            </div>
                          </div>
                        </div>

                        {/* Meta Description */}
                        <div>
                          <Label className="text-xs text-gray-500 flex items-center gap-1">
                            Meta Description: <Sparkles className="h-3 w-3 text-amber-500" />
                          </Label>
                          <div className="mt-1 space-y-1">
                            <div className="p-2 bg-rose-50 rounded border border-rose-200 text-xs">
                              <span className="text-[10px] text-rose-500 font-medium">ORIGINAL</span>
                              <p className="text-gray-700">{previewProduct.originalMetaDescription}</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded border border-green-200 text-xs">
                              <span className="text-[10px] text-green-500 font-medium">SUGERIDO</span>
                              <p className="text-gray-700">{previewProduct.suggestedMetaDescription}</p>
                            </div>
                          </div>
                        </div>

                        {/* Tags */}
                        <div>
                          <Label className="text-xs text-gray-500 flex items-center gap-1">
                            Tags: <Sparkles className="h-3 w-3 text-amber-500" />
                          </Label>
                          <div className="mt-1 space-y-2">
                            <div className="p-2 bg-rose-50 rounded border border-rose-200">
                              <span className="text-[10px] text-rose-500 font-medium">ORIGINAL</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {previewProduct.originalTags.split(",").map((tag, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-white rounded text-xs text-gray-600 border border-rose-200"
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="p-2 bg-green-50 rounded border border-green-200">
                              <span className="text-[10px] text-green-500 font-medium">SUGERIDO</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {previewProduct.suggestedTags.split(",").map((tag, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 bg-white rounded text-xs text-gray-600 border border-green-200"
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Peso e Dimensões Card */}
                    <div className="rounded-xl border border-gray-200 bg-white p-5">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Ruler className="h-5 w-5 text-orange-500" />
                        Peso e Dimensões
                      </h3>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-gray-500">Peso (kg):</Label>
                          <Input value={previewProduct.weight} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Altura (cm):</Label>
                          <Input value={previewProduct.height} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Largura (cm):</Label>
                          <Input value={previewProduct.width} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-500">Comprimento (cm):</Label>
                          <Input value={previewProduct.length} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {previewProduct.status === "pending" && (
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="flex-1 text-rose-500 border-rose-300 hover:bg-rose-50 bg-transparent"
                          onClick={() => {
                            rejectProduct(previewProduct.id)
                            setPreviewProduct(null)
                          }}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Rejeitar
                        </Button>
                        <Button
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            approveProduct(previewProduct.id)
                            setPreviewProduct(null)
                          }}
                        >
                          <Check className="mr-2 h-4 w-4" />
                          Aprovar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
