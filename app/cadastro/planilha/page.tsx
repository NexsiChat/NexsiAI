"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileSpreadsheet,
  Upload,
  Download,
  Settings,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Table,
  Sparkles,
  HelpCircle,
  FileCheck,
  ArrowRight,
  Eye,
  Trash2,
  RefreshCw,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Mock data for preview
const mockPreviewData = [
  {
    ean: "7891234567890",
    nome: "Porsche 911 GT3 RS 2023 Escala 1:18",
    marca: "Maisto",
    preco: "459,90",
    estoque: "25",
  },
  {
    ean: "7891234567891",
    nome: "Ferrari F40 1987 Vermelho Escala 1:24",
    marca: "Bburago",
    preco: "289,90",
    estoque: "12",
  },
  { ean: "7891234567892", nome: "Lamborghini Countach LP400 Branco", marca: "Kinsmart", preco: "349,90", estoque: "8" },
  { ean: "7891234567893", nome: "BMW M3 E30 1988 Preto", marca: "Solido", preco: "199,90", estoque: "15" },
]

const columnMappings = [
  { source: "Coluna A", target: "EAN", status: "mapped" },
  { source: "Coluna B", target: "Nome do Produto", status: "mapped" },
  { source: "Coluna C", target: "Marca", status: "mapped" },
  { source: "Coluna D", target: "Preço", status: "mapped" },
  { source: "Coluna E", target: "Estoque", status: "mapped" },
  { source: "Coluna F", target: "Categoria", status: "unmapped" },
  { source: "Coluna G", target: "Descrição", status: "optional" },
]

export default function CadastroPlanilhaPage() {
  const [template, setTemplate] = useState("padrao-nexsi")
  const [isDragging, setIsDragging] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [addCompanyInfo, setAddCompanyInfo] = useState(false)
  const [addBrandInfo, setAddBrandInfo] = useState(false)
  const [autoEnrich, setAutoEnrich] = useState(true)
  const [generateSEO, setGenerateSEO] = useState(true)
  const [showPreview, setShowPreview] = useState(false)
  const [showMapping, setShowMapping] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processProgress, setProcessProgress] = useState(0)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.name.endsWith(".xlsx") || file.name.endsWith(".xls") || file.name.endsWith(".csv")) {
        setUploadedFile(file)
      }
    }
  }, [])

  const handleFileSelect = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".xlsx,.xls,.csv"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        setUploadedFile(file)
      }
    }
    input.click()
  }

  const handleProcess = () => {
    setIsProcessing(true)
    setProcessProgress(0)
    const interval = setInterval(() => {
      setProcessProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsProcessing(false)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  return (
    <AppLayout>
      <TooltipProvider>
        <div className="max-w-6xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold font-serif text-foreground mb-2">Cadastro de produtos por Planilha</h1>
              <p className="text-muted-foreground">Cadastre produtos em massa usando nossa planilha modelo.</p>
            </div>
            {uploadedFile && (
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 gap-1">
                <FileCheck className="h-3 w-3" />
                Arquivo carregado
              </Badge>
            )}
          </div>

          {/* Info Card */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-500 flex items-center justify-center shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-amber-900 mb-1">Dica: Enriquecimento Automático</h3>
                  <p className="text-sm text-amber-800">
                    Ao importar sua planilha, a IA pode enriquecer automaticamente os produtos com descrições, SEO e
                    categorização. Basta ativar as opções abaixo.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Upload Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Template and Upload */}
              <Card className="border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Table className="h-5 w-5 text-amber-500" />
                    Importar Planilha
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Template Selection */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Label className="text-sm font-medium text-foreground mb-2 block">Modelo de template</Label>
                      <Select value={template} onValueChange={setTemplate}>
                        <SelectTrigger className="bg-card border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="padrao-nexsi">Padrão NexsiAI</SelectItem>
                          <SelectItem value="completo">Completo (com variantes)</SelectItem>
                          <SelectItem value="basico">Básico (mínimo)</SelectItem>
                          <SelectItem value="marketplace">Marketplace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-amber-300 text-amber-700 hover:bg-amber-50 bg-transparent"
                      >
                        <Download className="h-4 w-4" />
                        Baixar Modelo
                      </Button>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <HelpCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Baixe o modelo correto para seu tipo de cadastro</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                      relative rounded-xl border-2 border-dashed p-8 text-center transition-all
                      ${isDragging ? "border-amber-500 bg-amber-50" : "border-gray-300 hover:border-amber-400 hover:bg-amber-50/50"}
                      ${uploadedFile ? "border-green-500 bg-green-50" : ""}
                    `}
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div
                        className={`h-14 w-14 rounded-xl flex items-center justify-center ${uploadedFile ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        {uploadedFile ? (
                          <CheckCircle2 className="h-7 w-7 text-green-600" />
                        ) : (
                          <FileSpreadsheet className="h-7 w-7 text-gray-400" />
                        )}
                      </div>

                      {uploadedFile ? (
                        <>
                          <div>
                            <p className="text-foreground font-medium">{uploadedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(uploadedFile.size / 1024).toFixed(1)} KB - {mockPreviewData.length} produtos detectados
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => setShowPreview(true)} className="gap-1">
                              <Eye className="h-4 w-4" />
                              Visualizar
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setShowMapping(true)} className="gap-1">
                              <Settings className="h-4 w-4" />
                              Mapear Colunas
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setUploadedFile(null)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <p className="text-foreground font-medium">Arraste sua planilha aqui</p>
                            <p className="text-sm text-muted-foreground">
                              ou clique para selecionar (.xlsx, .xls, .csv)
                            </p>
                          </div>
                          <Button
                            onClick={handleFileSelect}
                            className="bg-amber-500 hover:bg-amber-600 text-black gap-2"
                          >
                            <Upload className="h-4 w-4" />
                            Selecionar Arquivo
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Validation Summary */}
                  {uploadedFile && (
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-200">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-xs text-green-600">Válidos</p>
                          <p className="font-semibold text-green-700">4 produtos</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 border border-amber-200">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <div>
                          <p className="text-xs text-amber-600">Avisos</p>
                          <p className="font-semibold text-amber-700">0 produtos</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <div>
                          <p className="text-xs text-red-600">Erros</p>
                          <p className="font-semibold text-red-700">0 produtos</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Processing Progress */}
              {isProcessing && (
                <Card className="border-amber-200 bg-amber-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <RefreshCw className="h-5 w-5 text-amber-600 animate-spin" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p className="font-medium text-amber-900">Processando planilha...</p>
                          <span className="text-sm text-amber-700">{processProgress}%</span>
                        </div>
                        <Progress value={processProgress} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Settings Sidebar */}
            <div className="space-y-6">
              {/* AI Settings */}
              <Card className="border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-amber-500" />
                    Configurações de IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Enriquecer automaticamente</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Gera descrições completas com IA</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Switch checked={autoEnrich} onCheckedChange={setAutoEnrich} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label className="text-sm">Gerar SEO</Label>
                      <Tooltip>
                        <TooltipTrigger>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Meta título, descrição e tags</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Switch checked={generateSEO} onCheckedChange={setGenerateSEO} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Info da empresa</Label>
                    <Switch checked={addCompanyInfo} onCheckedChange={setAddCompanyInfo} />
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Info da marca</Label>
                    <Switch checked={addBrandInfo} onCheckedChange={setAddBrandInfo} />
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-border">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Modelos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2 border-gray-200 bg-transparent">
                    <Download className="h-4 w-4 text-amber-500" />
                    Modelo Simples
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 border-gray-200 bg-transparent">
                    <Download className="h-4 w-4 text-amber-500" />
                    Modelo com Variantes
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2 border-gray-200 bg-transparent">
                    <Download className="h-4 w-4 text-amber-500" />
                    Modelo Completo
                  </Button>
                </CardContent>
              </Card>

              {/* Process Button */}
              {uploadedFile && (
                <Button
                  size="lg"
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black gap-2 h-12"
                  onClick={handleProcess}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-5 w-5 animate-spin" />
                      Processando...
                    </>
                  ) : (
                    <>
                      <ArrowRight className="h-5 w-5" />
                      Processar {mockPreviewData.length} Produtos
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-amber-500" />
                Prévia dos Dados
              </DialogTitle>
            </DialogHeader>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3 text-left font-medium">EAN</th>
                    <th className="p-3 text-left font-medium">Nome</th>
                    <th className="p-3 text-left font-medium">Marca</th>
                    <th className="p-3 text-left font-medium">Preço</th>
                    <th className="p-3 text-left font-medium">Estoque</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPreviewData.map((row, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-mono text-xs">{row.ean}</td>
                      <td className="p-3">{row.nome}</td>
                      <td className="p-3">{row.marca}</td>
                      <td className="p-3">R$ {row.preco}</td>
                      <td className="p-3">{row.estoque} un</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>

        {/* Column Mapping Modal */}
        <Dialog open={showMapping} onOpenChange={setShowMapping}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-amber-500" />
                Mapeamento de Colunas
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              {columnMappings.map((col, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-lg border">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{col.source}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <Select defaultValue={col.target.toLowerCase().replace(/ /g, "_")}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecionar campo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ean">EAN</SelectItem>
                        <SelectItem value="nome_do_produto">Nome do Produto</SelectItem>
                        <SelectItem value="marca">Marca</SelectItem>
                        <SelectItem value="preco">Preço</SelectItem>
                        <SelectItem value="estoque">Estoque</SelectItem>
                        <SelectItem value="categoria">Categoria</SelectItem>
                        <SelectItem value="descricao">Descrição</SelectItem>
                        <SelectItem value="ignorar">Ignorar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      col.status === "mapped"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : col.status === "unmapped"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-gray-50 text-gray-700 border-gray-200"
                    }
                  >
                    {col.status === "mapped" ? "Mapeado" : col.status === "unmapped" ? "Não mapeado" : "Opcional"}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowMapping(false)}>
                Cancelar
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-black" onClick={() => setShowMapping(false)}>
                Salvar Mapeamento
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </TooltipProvider>
    </AppLayout>
  )
}
