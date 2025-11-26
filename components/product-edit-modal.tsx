"use client"

import { useState, useEffect } from "react"
import { X, Plus, Trash2, ImagePlus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: string
  ref?: string
  name: string
  image: string
  status: string
  enriched: string
  category: string
  brand: string
  qualityScore: number
  enrichmentProgress: number
  lastUpdated: string
}

interface ProductEditModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (product: Product) => void
}

export function ProductEditModal({ product, open, onOpenChange, onSave }: ProductEditModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    ean: "",
    sku: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    status: "Ativo",
    description: "",
    metaTitle: "",
    metaDescription: "",
    metaTags: "",
    weight: "",
    height: "",
    width: "",
    length: "",
    images: [] as string[],
  })

  const [characteristics, setCharacteristics] = useState<{ name: string; value: string }[]>([])

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        ean: product.id,
        sku: `SKU-${product.id.slice(-4)}`,
        brand: product.brand,
        category: product.category,
        price: "299,90",
        stock: "25",
        status: product.status,
        description: `Descrição detalhada do produto ${product.name}. Este é um modelo colecionável de alta qualidade, perfeito para colecionadores e entusiastas.`,
        metaTitle: product.name,
        metaDescription: `Compre ${product.name} - ${product.brand}. Produto de alta qualidade com entrega rápida.`,
        metaTags: "miniatura, coleção, escala",
        weight: "0.370",
        height: "6.00",
        width: "7.50",
        length: "21.00",
        images: [product.image],
      })
      setCharacteristics([
        { name: "Material", value: "Metal e Plástico" },
        { name: "Escala", value: "1:24" },
      ])
    }
  }, [product])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addCharacteristic = () => {
    setCharacteristics((prev) => [...prev, { name: "", value: "" }])
  }

  const updateCharacteristic = (index: number, field: "name" | "value", value: string) => {
    setCharacteristics((prev) => {
      const updated = [...prev]
      updated[index][field] = value
      return updated
    })
  }

  const removeCharacteristic = (index: number) => {
    setCharacteristics((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    if (product) {
      onSave({
        ...product,
        name: formData.name,
        brand: formData.brand,
        category: formData.category,
        status: formData.status,
      })
    }
    onOpenChange(false)
  }

  if (!product) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Editar Produto</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">Informações</TabsTrigger>
            <TabsTrigger value="description">Descrição</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="dimensions">Dimensões</TabsTrigger>
          </TabsList>

          {/* Aba Informações */}
          <TabsContent value="info" className="space-y-6 mt-4">
            {/* Imagens */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Imagens do Produto</Label>
              <div className="flex gap-3 flex-wrap">
                {formData.images.map((img, index) => (
                  <div key={index} className="relative group">
                    <div className="w-24 h-24 rounded-lg border overflow-hidden">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Produto ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <button className="w-24 h-24 rounded-lg border-2 border-dashed border-amber-400 flex flex-col items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors">
                  <ImagePlus className="h-6 w-6 mb-1" />
                  <span className="text-xs">Adicionar</span>
                </button>
              </div>
            </div>

            {/* Campos básicos */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="ean">EAN / Código de Barras</Label>
                <Input id="ean" value={formData.ean} onChange={(e) => handleChange("ean", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input id="sku" value={formData.sku} onChange={(e) => handleChange("sku", e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Marca</Label>
                <Input id="brand" value={formData.brand} onChange={(e) => handleChange("brand", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Categoria">Categoria</SelectItem>
                    <SelectItem value="Carros escala 1/24 - 1/25">Carros escala 1/24 - 1/25</SelectItem>
                    <SelectItem value="Carros escala 1/18">Carros escala 1/18</SelectItem>
                    <SelectItem value="Motos">Motos</SelectItem>
                    <SelectItem value="Caminhões">Caminhões</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input id="price" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Estoque</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.stock}
                  onChange={(e) => handleChange("stock", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Rascunho">Rascunho</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Características */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium">Características</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCharacteristic}
                  className="gap-1 text-amber-600 border-amber-300 hover:bg-amber-50 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar
                </Button>
              </div>
              <div className="space-y-2">
                {characteristics.map((char, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      placeholder="Nome"
                      value={char.name}
                      onChange={(e) => updateCharacteristic(index, "name", e.target.value)}
                      className="flex-1"
                    />
                    <Input
                      placeholder="Valor"
                      value={char.value}
                      onChange={(e) => updateCharacteristic(index, "value", e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeCharacteristic(index)}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                {characteristics.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhuma característica adicionada</p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Aba Descrição */}
          <TabsContent value="description" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição Completa</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={12}
                className="resize-none"
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="outline"
                className="gap-2 text-amber-600 border-amber-300 hover:bg-amber-50 bg-transparent"
              >
                <Sparkles className="h-4 w-4" />
                Gerar com IA
              </Button>
            </div>
          </TabsContent>

          {/* Aba SEO */}
          <TabsContent value="seo" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="metaTitle">Meta Title</Label>
              <Input
                id="metaTitle"
                value={formData.metaTitle}
                onChange={(e) => handleChange("metaTitle", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">{formData.metaTitle.length}/60 caracteres</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaDescription">Meta Description</Label>
              <Textarea
                id="metaDescription"
                value={formData.metaDescription}
                onChange={(e) => handleChange("metaDescription", e.target.value)}
                rows={3}
              />
              <p className="text-xs text-muted-foreground">{formData.metaDescription.length}/160 caracteres</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="metaTags">Meta Tags (separadas por vírgula)</Label>
              <Input
                id="metaTags"
                value={formData.metaTags}
                onChange={(e) => handleChange("metaTags", e.target.value)}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            {/* Preview Google */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">Preview no Google</p>
              <div className="space-y-1">
                <p className="text-blue-600 text-lg hover:underline cursor-pointer">
                  {formData.metaTitle || "Título da página"}
                </p>
                <p className="text-green-700 text-sm">
                  www.sualojaonline.com.br › produto › {formData.sku.toLowerCase()}
                </p>
                <p className="text-sm text-gray-600">
                  {formData.metaDescription || "Descrição da página que aparece nos resultados de busca..."}
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Aba Dimensões */}
          <TabsContent value="dimensions" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight">Peso (kg)</Label>
                <Input id="weight" value={formData.weight} onChange={(e) => handleChange("weight", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Altura da Embalagem (cm)</Label>
                <Input id="height" value={formData.height} onChange={(e) => handleChange("height", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="width">Largura da Embalagem (cm)</Label>
                <Input id="width" value={formData.width} onChange={(e) => handleChange("width", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="length">Comprimento da Embalagem (cm)</Label>
                <Input id="length" value={formData.length} onChange={(e) => handleChange("length", e.target.value)} />
              </div>
            </div>

            {/* Calculadora de frete */}
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm font-medium text-amber-800 mb-2">Dimensões para cálculo de frete</p>
              <p className="text-xs text-amber-700">
                Peso cúbico:{" "}
                {(
                  ((Number.parseFloat(formData.height) || 0) *
                    (Number.parseFloat(formData.width) || 0) *
                    (Number.parseFloat(formData.length) || 0)) /
                  6000
                ).toFixed(3)}{" "}
                kg
              </p>
              <p className="text-xs text-amber-700 mt-1">
                Peso considerado:{" "}
                {Math.max(
                  Number.parseFloat(formData.weight) || 0,
                  ((Number.parseFloat(formData.height) || 0) *
                    (Number.parseFloat(formData.width) || 0) *
                    (Number.parseFloat(formData.length) || 0)) /
                    6000,
                ).toFixed(3)}{" "}
                kg
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} className="bg-amber-500 hover:bg-amber-600 text-white">
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
