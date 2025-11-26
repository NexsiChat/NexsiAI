"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Sparkles, Package, Search, Ruler, X } from "lucide-react"

interface ProductViewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: {
    id: string
    ref: string
    name: string
    image: string
    brand: string
    category: string
    description?: string
    metaTitle?: string
    metaDescription?: string
    metaTags?: string
    weight?: string
    height?: string
    width?: string
    length?: string
    ean?: string
    images?: string[]
  } | null
  onEnrich?: () => void
}

export function ProductViewModal({ open, onOpenChange, product, onEnrich }: ProductViewModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) return null

  const images = product.images || [product.image, product.image, product.image, product.image, product.image]

  const description =
    product.description ||
    `${product.name} – um modelo colecionável que une realismo e qualidade em cada detalhe!

Este carro em escala 1:24, fabricado pela ${product.brand}, é construído com metal e plástico resistentes, acompanhado de pneus de borracha que garantem um toque autêntico. Com dimensões de 21 cm de comprimento, 7,5 cm de largura e 6 cm de altura, é ideal para exibição em sua coleção.

O modelo oferece funcionalidades impressionantes: abre portas, capô e porta-malas para maior interatividade. Possui sistema de fricção para movimentação, faróis e lanternas traseiras que acendem, além de som realista, proporcionando uma experiência completa.

Apesar das rodas não esterçarem, este modelo é perfeito para colecionadores que buscam fidelidade e detalhes minuciosos. A embalagem é avulsa, sem base expositora ou caixa acrílica.

Garanta já o seu e tenha um ícone do automobilismo em miniatura com qualidade superior!`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] !max-w-[1200px] max-h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Visualizar Produto</DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[90vh]">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="default"
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                  onClick={() => onOpenChange(false)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <h1 className="text-2xl font-bold">Detalhes do Produto</h1>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
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
                          alt={`${product.name} - imagem ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Main Image */}
                  <div className="flex-1">
                    <div className="aspect-square rounded-xl overflow-hidden border border-gray-200 bg-gray-50 mb-4">
                      <img
                        src={images[selectedImage] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Description Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 mt-4">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    Descrição do Produto
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    <p className="whitespace-pre-line text-gray-600 leading-relaxed text-sm">{description}</p>
                  </div>
                  <Button className="mt-4 bg-amber-500 hover:bg-amber-600 text-white" onClick={onEnrich}>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Enriquecer com IA
                  </Button>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-gray-500">Referência:</Label>
                      <Input
                        value={product.ref.replace(/[()]/g, "") || product.id}
                        readOnly
                        className="mt-1 bg-gray-50 h-9 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">EAN:</Label>
                      <Input value={product.ean || "7904737004818"} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                    </div>

                    <div className="col-span-2">
                      <Label className="text-xs text-gray-500">Nome:</Label>
                      <Input value={product.name} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Marca:</Label>
                      <Input value={product.brand} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Categoria:</Label>
                      <Input value={product.category} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                    </div>
                  </div>
                </div>

                {/* SEO Card */}
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Search className="h-5 w-5 text-green-500" />
                    SEO
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs text-gray-500">Meta Title:</Label>
                      <Input
                        value={product.metaTitle || product.name.split(" ").slice(0, 6).join(" ")}
                        readOnly
                        className="mt-1 bg-gray-50 h-9 text-sm"
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Meta Description:</Label>
                      <Textarea
                        value={
                          product.metaDescription || `${product.name} – modelo colecionável com realismo e qualidade.`
                        }
                        readOnly
                        className="mt-1 bg-gray-50 resize-none text-sm"
                        rows={2}
                      />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Tags:</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {(product.metaTags || "escala_1:24, miniatura, colecionável").split(",").map((tag, i) => (
                          <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
                            {tag.trim()}
                          </span>
                        ))}
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
                      <Input value={product.weight || "0.370"} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Altura (cm):</Label>
                      <Input value={product.height || "6.00"} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Largura (cm):</Label>
                      <Input value={product.width || "7.50"} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                    </div>

                    <div>
                      <Label className="text-xs text-gray-500">Comprimento (cm):</Label>
                      <Input value={product.length || "21.00"} readOnly className="mt-1 bg-gray-50 h-9 text-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
