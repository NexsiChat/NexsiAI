"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import {
  ImagePlus,
  Upload,
  Plus,
  HelpCircle,
  FileCode,
  X,
  Trash2,
  Search,
  Sparkles,
  Package,
  Barcode,
  Tag,
  FileText,
  Send,
  CheckCircle2,
  Loader2,
  Camera,
  Link,
  AlertCircle,
  ChevronRight,
  Info,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"

interface Caracteristica {
  nome: string
  valor: string
}

interface ProdutoCadastro {
  id: number
  ean: string
  nome: string
  marca: string
  template: string
  imagem: string | null
  imagensAdicionais: string[]
  caracteristicas: Caracteristica[]
  descricao: string
  categoria: string
  preco: string
  sku: string
  enriquecerAutomatico: boolean
}

export default function CadastroProdutoPage() {
  const [produtos, setProdutos] = useState<ProdutoCadastro[]>([
    {
      id: 1,
      ean: "",
      nome: "",
      marca: "",
      template: "padrao-nexsi",
      imagem: null,
      imagensAdicionais: [],
      caracteristicas: [],
      descricao: "",
      categoria: "",
      preco: "",
      sku: "",
      enriquecerAutomatico: true,
    },
  ])
  const [buscandoEan, setBuscandoEan] = useState<number | null>(null)
  const [showXmlModal, setShowXmlModal] = useState(false)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [produtoPreview, setProdutoPreview] = useState<ProdutoCadastro | null>(null)
  const [enviando, setEnviando] = useState(false)
  const [enviadoSucesso, setEnviadoSucesso] = useState(false)

  const handleInputChange = (id: number, field: keyof ProdutoCadastro, value: string | boolean) => {
    setProdutos((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)))
  }

  const handleAddProduto = () => {
    const newId = Math.max(...produtos.map((p) => p.id)) + 1
    setProdutos([
      ...produtos,
      {
        id: newId,
        ean: "",
        nome: "",
        marca: "",
        template: "padrao-nexsi",
        imagem: null,
        imagensAdicionais: [],
        caracteristicas: [],
        descricao: "",
        categoria: "",
        preco: "",
        sku: "",
        enriquecerAutomatico: true,
      },
    ])
  }

  const handleRemoveProduto = (id: number) => {
    if (produtos.length > 1) {
      setProdutos(produtos.filter((p) => p.id !== id))
    }
  }

  const handleImageUpload = (id: number) => {
    handleInputChange(id, "imagem", `/placeholder.svg?height=200&width=200&query=produto-${id}`)
  }

  const handleAddCaracteristica = (id: number) => {
    setProdutos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, caracteristicas: [...p.caracteristicas, { nome: "", valor: "" }] } : p)),
    )
  }

  const handleCaracteristicaChange = (produtoId: number, index: number, field: "nome" | "valor", value: string) => {
    setProdutos((prev) =>
      prev.map((p) => {
        if (p.id === produtoId) {
          const newCaracteristicas = [...p.caracteristicas]
          newCaracteristicas[index] = { ...newCaracteristicas[index], [field]: value }
          return { ...p, caracteristicas: newCaracteristicas }
        }
        return p
      }),
    )
  }

  const handleRemoveCaracteristica = (produtoId: number, index: number) => {
    setProdutos((prev) =>
      prev.map((p) => {
        if (p.id === produtoId) {
          const newCaracteristicas = p.caracteristicas.filter((_, i) => i !== index)
          return { ...p, caracteristicas: newCaracteristicas }
        }
        return p
      }),
    )
  }

  const handleBuscarEan = async (id: number, ean: string) => {
    if (!ean || ean.length < 8) return
    setBuscandoEan(id)
    // Simular busca por EAN
    await new Promise((resolve) => setTimeout(resolve, 1500))
    // Preencher dados simulados
    setProdutos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            nome: "Miniatura Porsche 911 GT3 RS",
            marca: "Bburago",
            categoria: "Carros escala 1/24",
            preco: "189.90",
          }
        }
        return p
      }),
    )
    setBuscandoEan(null)
  }

  const handlePreview = (produto: ProdutoCadastro) => {
    setProdutoPreview(produto)
    setShowPreviewModal(true)
  }

  const handleEnviar = async () => {
    setEnviando(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setEnviando(false)
    setEnviadoSucesso(true)
    setTimeout(() => setEnviadoSucesso(false), 3000)
  }

  const produtosPreenchidos = produtos.filter((p) => p.ean || p.nome || p.imagem).length

  return (
    <TooltipProvider>
      <AppLayout>
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Header com estatísticas */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground font-serif">Cadastro de produto</h1>
              <p className="text-muted-foreground max-w-2xl">
                Cadastre produtos através do EAN, Nome e Marca ou apenas com a Imagem. A IA irá enriquecer
                automaticamente com descrições e SEO otimizado.
              </p>
            </div>

            {/* Contador e ações rápidas */}
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 border border-purple-200 rounded-lg px-4 py-2 flex items-center gap-3">
                <Package className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-xs text-purple-600 font-medium">Produtos</p>
                  <p className="text-lg font-bold text-purple-700">{produtos.length}</p>
                </div>
              </div>
              {produtosPreenchidos > 0 && (
                <Button
                  onClick={handleEnviar}
                  className="bg-amber-500 hover:bg-amber-600 text-black"
                  disabled={enviando}
                >
                  {enviando ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : enviadoSucesso ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Enviado!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Cadastrar {produtosPreenchidos > 1 ? `${produtosPreenchidos} produtos` : "produto"}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Dica de cadastro rápido */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
            <div className="bg-amber-100 rounded-lg p-2">
              <Sparkles className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900">Dica: Cadastro inteligente</h3>
              <p className="text-sm text-amber-700 mt-1">
                Digite o EAN e clique em buscar para preencher automaticamente. Ou faça upload de uma imagem e a IA
                identificará o produto para você.
              </p>
            </div>
            <Button variant="ghost" size="sm" className="text-amber-700 hover:text-amber-900 hover:bg-amber-100">
              Saiba mais
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>

          {/* Product Cards */}
          {produtos.map((produto, produtoIndex) => (
            <div key={produto.id} className="bg-card border border-border rounded-xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gray-50 border-b border-border px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 rounded-lg p-1.5">
                    <Package className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="font-medium text-foreground">Produto {produtoIndex + 1}</span>
                  {produto.nome && (
                    <Badge variant="outline" className="bg-white">
                      {produto.nome.slice(0, 30)}
                      {produto.nome.length > 30 ? "..." : ""}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {(produto.ean || produto.nome) && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview(produto)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <FileText className="mr-1 h-4 w-4" />
                      Prévia
                    </Button>
                  )}
                  {produtos.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemoveProduto(produto.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Left Side - Form Fields */}
                  <div className="flex-1 space-y-5">
                    {/* EAN com busca */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Barcode className="h-4 w-4 text-muted-foreground" />
                        <Label htmlFor={`ean-${produto.id}`} className="text-sm font-medium">
                          EAN / Código de Barras
                        </Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="h-4 w-4 text-amber-500 cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Código de barras do produto (8-13 dígitos)</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id={`ean-${produto.id}`}
                          value={produto.ean}
                          onChange={(e) => handleInputChange(produto.id, "ean", e.target.value)}
                          className="bg-background border-border font-mono"
                          placeholder="0000000000000"
                        />
                        <Button
                          variant="outline"
                          onClick={() => handleBuscarEan(produto.id, produto.ean)}
                          disabled={buscandoEan === produto.id || !produto.ean}
                          className="shrink-0"
                        >
                          {buscandoEan === produto.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <>
                              <Search className="mr-2 h-4 w-4" />
                              Buscar
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Nome */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Tag className="h-4 w-4 text-muted-foreground" />
                          <Label htmlFor={`nome-${produto.id}`} className="text-sm font-medium">
                            Nome do Produto
                          </Label>
                        </div>
                        <Input
                          id={`nome-${produto.id}`}
                          value={produto.nome}
                          onChange={(e) => handleInputChange(produto.id, "nome", e.target.value)}
                          className="bg-background border-border"
                          placeholder="Ex: Miniatura Porsche 911 GT3"
                        />
                      </div>

                      {/* Marca */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`marca-${produto.id}`} className="text-sm font-medium">
                            Marca
                          </Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-amber-500 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Fabricante ou marca do produto</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Input
                          id={`marca-${produto.id}`}
                          value={produto.marca}
                          onChange={(e) => handleInputChange(produto.id, "marca", e.target.value)}
                          className="bg-background border-border"
                          placeholder="Ex: Bburago"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Categoria */}
                      <div className="space-y-2">
                        <Label htmlFor={`categoria-${produto.id}`} className="text-sm font-medium">
                          Categoria
                        </Label>
                        <Select
                          value={produto.categoria}
                          onValueChange={(value) => handleInputChange(produto.id, "categoria", value)}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="carros-1-18">Carros escala 1/18</SelectItem>
                            <SelectItem value="carros-1-24">Carros escala 1/24</SelectItem>
                            <SelectItem value="carros-1-43">Carros escala 1/43</SelectItem>
                            <SelectItem value="carros-1-64">Carros escala 1/64</SelectItem>
                            <SelectItem value="motos">Motos</SelectItem>
                            <SelectItem value="caminhoes">Caminhões</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* SKU */}
                      <div className="space-y-2">
                        <Label htmlFor={`sku-${produto.id}`} className="text-sm font-medium">
                          SKU (opcional)
                        </Label>
                        <Input
                          id={`sku-${produto.id}`}
                          value={produto.sku}
                          onChange={(e) => handleInputChange(produto.id, "sku", e.target.value)}
                          className="bg-background border-border"
                          placeholder="SKU interno"
                        />
                      </div>

                      {/* Preço */}
                      <div className="space-y-2">
                        <Label htmlFor={`preco-${produto.id}`} className="text-sm font-medium">
                          Preço (opcional)
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                            R$
                          </span>
                          <Input
                            id={`preco-${produto.id}`}
                            value={produto.preco}
                            onChange={(e) => handleInputChange(produto.id, "preco", e.target.value)}
                            className="bg-background border-border pl-10"
                            placeholder="0,00"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Template e Enriquecimento */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                      <div className="space-y-2 flex-1">
                        <Label htmlFor={`template-${produto.id}`} className="text-sm font-medium">
                          Modelo de template
                        </Label>
                        <Select
                          value={produto.template}
                          onValueChange={(value) => handleInputChange(produto.id, "template", value)}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Selecione um template" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="padrao-nexsi">Padrão NexsiAI</SelectItem>
                            <SelectItem value="completo">Completo</SelectItem>
                            <SelectItem value="simples">Simples</SelectItem>
                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-center gap-3 bg-purple-50 border border-purple-200 rounded-lg px-4 py-2.5">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        <Label
                          htmlFor={`enriquecer-${produto.id}`}
                          className="text-sm font-medium text-purple-900 cursor-pointer"
                        >
                          Enriquecer automaticamente
                        </Label>
                        <Switch
                          id={`enriquecer-${produto.id}`}
                          checked={produto.enriquecerAutomatico}
                          onCheckedChange={(checked) => handleInputChange(produto.id, "enriquecerAutomatico", checked)}
                        />
                      </div>
                    </div>

                    {/* Características */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Label className="text-sm font-medium">Características adicionais</Label>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <HelpCircle className="h-4 w-4 text-amber-500 cursor-help" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Adicione atributos extras como cor, tamanho, material, etc.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <Button
                          onClick={() => handleAddCaracteristica(produto.id)}
                          variant="outline"
                          size="sm"
                          className="border-amber-500 text-amber-600 hover:bg-amber-50"
                        >
                          <Plus className="mr-1 h-3 w-3" />
                          Adicionar
                        </Button>
                      </div>

                      {produto.caracteristicas.length > 0 ? (
                        <div className="space-y-2">
                          {produto.caracteristicas.map((carac, index) => (
                            <div key={index} className="flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                              <Input
                                value={carac.nome}
                                onChange={(e) => handleCaracteristicaChange(produto.id, index, "nome", e.target.value)}
                                placeholder="Atributo (ex: Cor)"
                                className="bg-white border-border flex-1 h-9"
                              />
                              <Input
                                value={carac.valor}
                                onChange={(e) => handleCaracteristicaChange(produto.id, index, "valor", e.target.value)}
                                placeholder="Valor (ex: Vermelho)"
                                className="bg-white border-border flex-1 h-9"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveCaracteristica(produto.id, index)}
                                className="text-muted-foreground hover:text-destructive shrink-0 h-9 w-9"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground bg-gray-50 rounded-lg p-3 text-center">
                          Nenhuma característica adicional. Clique em "Adicionar" para incluir atributos.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Side - Image Upload */}
                  <div className="lg:w-72 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold">Imagens do produto</h3>
                      <Badge variant="outline" className="text-xs">
                        {produto.imagem ? 1 + produto.imagensAdicionais.length : 0} / 5
                      </Badge>
                    </div>

                    {/* Main Image */}
                    <div
                      className="relative border-2 border-dashed border-amber-400 rounded-xl p-4 flex flex-col items-center justify-center min-h-[180px] hover:border-amber-500 hover:bg-amber-50/50 transition-all cursor-pointer bg-background group"
                      onClick={() => handleImageUpload(produto.id)}
                    >
                      {produto.imagem ? (
                        <>
                          <img
                            src={produto.imagem || "/placeholder.svg"}
                            alt="Produto"
                            className="w-full h-full object-contain max-h-32"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                            <Button size="sm" variant="secondary">
                              <Camera className="mr-2 h-4 w-4" />
                              Alterar
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="bg-amber-100 rounded-full p-3 mb-3">
                            <ImagePlus className="h-8 w-8 text-amber-600" />
                          </div>
                          <p className="text-sm text-muted-foreground text-center mb-3">
                            Arraste uma imagem ou clique para fazer upload
                          </p>
                          <Button className="bg-amber-500 hover:bg-amber-600 text-black" size="sm">
                            <Upload className="mr-2 h-4 w-4" />
                            Importar
                          </Button>
                        </>
                      )}
                    </div>

                    {/* Additional options */}
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                        <Camera className="mr-1 h-3 w-3" />
                        Câmera
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 text-xs bg-transparent">
                        <Link className="mr-1 h-3 w-3" />
                        URL
                      </Button>
                    </div>

                    {/* AI Info */}
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-purple-600 mt-0.5 shrink-0" />
                        <p className="text-xs text-purple-700">
                          A IA pode identificar o produto automaticamente pela imagem e preencher as informações.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom Action Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-gray-50 border border-border rounded-xl p-4">
            <Button
              onClick={handleAddProduto}
              variant="outline"
              className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar mais produtos
            </Button>
            <Button
              variant="outline"
              className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-white"
              onClick={() => setShowXmlModal(true)}
            >
              <FileCode className="mr-2 h-4 w-4" />
              Importar XML
            </Button>
            <div className="sm:ml-auto text-sm text-muted-foreground flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              Você pode cadastrar até 50 produtos por vez
            </div>
          </div>
        </div>

        {/* XML Import Modal */}
        <Dialog open={showXmlModal} onOpenChange={setShowXmlModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-serif">Importar XML</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Faça upload de um arquivo XML com os dados dos produtos para importação em massa.
              </p>
              <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-amber-500 transition-colors cursor-pointer">
                <FileCode className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-3">Arraste o arquivo XML ou clique para selecionar</p>
                <Button variant="outline">
                  <Upload className="mr-2 h-4 w-4" />
                  Selecionar arquivo
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Info className="h-4 w-4" />
                Formatos aceitos: XML do Bling, Tiny, Olist, NF-e
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowXmlModal(false)}>
                Cancelar
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">Importar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Preview Modal */}
        <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-serif">Prévia do Cadastro</DialogTitle>
            </DialogHeader>
            {produtoPreview && (
              <div className="space-y-4">
                <div className="flex gap-6">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                    {produtoPreview.imagem ? (
                      <img
                        src={produtoPreview.imagem || "/placeholder.svg"}
                        alt="Produto"
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <ImagePlus className="h-8 w-8 text-muted-foreground/40" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="font-semibold text-lg">{produtoPreview.nome || "Nome não informado"}</h3>
                    <div className="flex gap-2">
                      {produtoPreview.marca && <Badge variant="outline">{produtoPreview.marca}</Badge>}
                      {produtoPreview.categoria && <Badge variant="outline">{produtoPreview.categoria}</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">EAN: {produtoPreview.ean || "Não informado"}</p>
                    {produtoPreview.preco && (
                      <p className="text-xl font-bold text-green-600">R$ {produtoPreview.preco}</p>
                    )}
                  </div>
                </div>
                {produtoPreview.caracteristicas.length > 0 && (
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-2">Características</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {produtoPreview.caracteristicas.map((c, i) => (
                        <div key={i} className="bg-gray-50 rounded-lg px-3 py-2 text-sm">
                          <span className="text-muted-foreground">{c.nome}:</span> {c.valor}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {produtoPreview.enriquecerAutomatico && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <span className="text-sm text-purple-700">
                      Este produto será enriquecido automaticamente com descrição e SEO otimizado
                    </span>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowPreviewModal(false)}>
                Fechar
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black">
                <Send className="mr-2 h-4 w-4" />
                Cadastrar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AppLayout>
    </TooltipProvider>
  )
}
