"use client"

import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Upload, Download, Clock, CheckCircle, XCircle, Loader2, Eye } from "lucide-react"
import { useState } from "react"

export default function ImportsPage() {
  const [selectedImport, setSelectedImport] = useState<any>(null)

  const imports = [
    {
      id: 54,
      name: "bling-import-product",
      status: "completed",
      startDate: "22 de nov. de 2025",
      endDate: "22 de nov. de 2025",
      progress: 100,
      totalProducts: 150,
      successProducts: 150,
      failedProducts: 0,
      duration: "2m 35s",
    },
    {
      id: 53,
      name: "bling-import-product",
      status: "completed",
      startDate: "20 de nov. de 2025",
      endDate: "20 de nov. de 2025",
      progress: 100,
      totalProducts: 200,
      successProducts: 198,
      failedProducts: 2,
      duration: "3m 12s",
    },
    {
      id: 52,
      name: "bling-import-product",
      status: "processing",
      startDate: "18 de nov. de 2025",
      endDate: null,
      progress: 67,
      totalProducts: 300,
      successProducts: 201,
      failedProducts: 0,
      duration: "1m 45s",
    },
    {
      id: 51,
      name: "bling-import-product",
      status: "failed",
      startDate: "15 de nov. de 2025",
      endDate: "15 de nov. de 2025",
      progress: 45,
      totalProducts: 100,
      successProducts: 45,
      failedProducts: 55,
      duration: "1m 20s",
    },
    {
      id: 50,
      name: "bling-import-product",
      status: "completed",
      startDate: "15 de nov. de 2025",
      endDate: "15 de nov. de 2025",
      progress: 100,
      totalProducts: 175,
      successProducts: 175,
      failedProducts: 0,
      duration: "2m 48s",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Finalizada
          </Badge>
        )
      case "processing":
        return (
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Em Progresso
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            Falhou
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="border-gray-300">
            Aguardando
          </Badge>
        )
    }
  }

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-serif">Importações</h1>
            <p className="text-sm text-muted-foreground mt-1">Gerencie as filas de importação de produtos</p>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600 text-white">
            <Upload className="h-4 w-4 mr-2" />
            Nova Importação
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">Total de Importações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">54</p>
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Upload className="h-6 w-6 text-gray-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">Finalizadas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-green-600">48</p>
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">Em Progresso</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-blue-600">1</p>
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-gray-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-muted-foreground font-normal">Com Erro</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-red-600">5</p>
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar importações..." className="pl-10 bg-white border-gray-200" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full md:w-48 bg-white border-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="completed">Finalizadas</SelectItem>
                <SelectItem value="processing">Em Progresso</SelectItem>
                <SelectItem value="failed">Com Erro</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-full md:w-48 bg-white border-gray-200">
                <SelectValue placeholder="Ordenar" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Mais recentes</SelectItem>
                <SelectItem value="oldest">Mais antigas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Imports List */}
        <div className="space-y-4">
          {imports.map((imp) => (
            <Card key={imp.id} className="bg-white border-gray-200 hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <Download className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">Importação #{imp.id}</h3>
                        {getStatusBadge(imp.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{imp.name}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-200 hover:bg-gray-50 bg-transparent"
                    onClick={() => setSelectedImport(imp)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Detalhes
                  </Button>
                </div>

                {/* Progress Bar */}
                {imp.status === "processing" && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progresso</span>
                      <span className="text-sm font-medium text-foreground">{imp.progress}%</span>
                    </div>
                    <Progress value={imp.progress} className="h-2" />
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Data de Início</p>
                    <p className="text-sm text-foreground">{imp.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total de Produtos</p>
                    <p className="text-sm text-foreground">{imp.totalProducts}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Sucesso</p>
                    <p className="text-sm text-green-600">{imp.successProducts}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Falhas</p>
                    <p className="text-sm text-red-600">{imp.failedProducts}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Duração</p>
                    <p className="text-sm text-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {imp.duration}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">Mostrando 5 de 54 importações</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-200 hover:bg-gray-50 bg-transparent">
              Anterior
            </Button>
            <Button variant="outline" className="border-gray-200 hover:bg-gray-50 bg-transparent">
              Próxima
            </Button>
          </div>
        </div>
      </div>

      {/* Import Details Dialog */}
      <Dialog open={!!selectedImport} onOpenChange={() => setSelectedImport(null)}>
        <DialogContent className="bg-white border-gray-200 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalhes da Importação #{selectedImport?.id}</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Informações completas sobre esta importação
            </DialogDescription>
          </DialogHeader>
          {selectedImport && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  {getStatusBadge(selectedImport.status)}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Progresso</p>
                  <p className="text-2xl font-bold text-foreground">{selectedImport.progress}%</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Total de Produtos</p>
                  <p className="text-2xl font-bold text-foreground">{selectedImport.totalProducts}</p>
                </div>
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Duração</p>
                  <p className="text-2xl font-bold text-foreground">{selectedImport.duration}</p>
                </div>
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Sucesso</p>
                  <p className="text-2xl font-bold text-green-600">{selectedImport.successProducts}</p>
                </div>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Falhas</p>
                  <p className="text-2xl font-bold text-red-600">{selectedImport.failedProducts}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-muted-foreground mb-3">Timeline</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Importação iniciada</p>
                      <p className="text-xs text-muted-foreground">{selectedImport.startDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Loader2 className="h-5 w-5 text-blue-600 flex-shrink-0 animate-spin" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">Processando produtos</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedImport.successProducts} de {selectedImport.totalProducts} processados
                      </p>
                    </div>
                  </div>
                  {selectedImport.status === "completed" && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Importação finalizada</p>
                        <p className="text-xs text-muted-foreground">{selectedImport.endDate}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {selectedImport.failedProducts > 0 && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-700 mb-2 font-medium">Produtos com Erro</p>
                  <p className="text-sm text-red-600">
                    {selectedImport.failedProducts} produtos falharam na importação. Verifique os logs para mais
                    detalhes.
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
