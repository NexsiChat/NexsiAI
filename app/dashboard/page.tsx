"use client"
import {
  Package,
  AlertCircle,
  Grid3x3,
  FileX,
  CreditCard,
  Clock,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  Target,
  Zap,
  DollarSign,
  BarChart3,
  Activity,
  AlertTriangle,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { AppSidebar } from "@/components/app-sidebar"

const enrichmentData = [
  { month: "Dez", descriptions: 0 },
  { month: "Jan", descriptions: 0 },
  { month: "Fev", descriptions: 0 },
  { month: "Mar", descriptions: 0 },
  { month: "Abr", descriptions: 0 },
  { month: "Mai", descriptions: 0 },
  { month: "Jun", descriptions: 0 },
  { month: "Jul", descriptions: 0 },
  { month: "Ago", descriptions: 0 },
  { month: "Set", descriptions: 0 },
  { month: "Out", descriptions: 0 },
  { month: "Nov", descriptions: 8 },
]

const catalogProducts = [
  {
    id: 1,
    name: "2008 Cross Bones Harley Davidson Série 27 1:18 Maisto",
    image: "/red-rc-car.jpg",
    category: "Categoria",
  },
  {
    id: 2,
    name: "Miniatura Pickup Ford 1940 Preta Motormax 1:24",
    image: "/white-porsche-toy.jpg",
    category: "Carros escala 1/24 - 1/25",
  },
  {
    id: 3,
    name: "Bentley Continental Gt Speed 2012 Kinsmart Azul 1:38",
    image: "/black-mustang-toy.jpg",
    category: "Categoria",
  },
  {
    id: 4,
    name: "Bentley Continental Gt Speed 2012 Kinsmart Prata 1:38",
    image: "/black-hilux-toy.jpg",
    category: "Categoria",
  },
  {
    id: 5,
    name: "Caminhão De Bombeiro Man 2000 NewRay 1:43",
    image: "/red-rc-car.jpg",
    category: "Categoria",
  },
  {
    id: 6,
    name: "Caminhão Scania G380 Toco 1:50 Preto",
    image: "/white-porsche-toy.jpg",
    category: "Categoria",
  },
]

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Seu painel de controle</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                Tutoriais
              </Button>
              <div className="relative">
                <Button variant="outline" size="icon" className="relative bg-transparent">
                  <span className="sr-only">Notificações</span>
                  <span className="text-lg">🔔</span>
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
                    0
                  </span>
                </Button>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-accent px-3 py-2">
                <span className="text-sm">⚡</span>
                <span className="text-sm font-medium">Bling</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {/* AI Insights Section */}
          <div className="mb-6 rounded-lg border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-bold mb-2">Insights Inteligentes</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Impacto Potencial</span>
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-2xl font-bold text-green-500 mb-1">+35%</p>
                    <p className="text-xs text-muted-foreground">
                      Aumento estimado em conversões ao enriquecer produtos pendentes
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Capacidade Disponível</span>
                      <Target className="h-4 w-4 text-blue-500" />
                    </div>
                    <p className="text-2xl font-bold text-blue-500 mb-1">4.988</p>
                    <p className="text-xs text-muted-foreground">Produtos que você ainda pode processar este mês</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="bg-primary">
                    <Zap className="mr-2 h-4 w-4" />
                    Otimizar Catálogo Agora
                  </Button>
                  <Button size="sm" variant="outline">
                    Ver Recomendações Completas
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-5 mb-6">
            <Card className="bg-gradient-to-br from-card to-accent/20 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                    <Package className="h-5 w-5 text-amber-500" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-green-500">
                    <ArrowUpRight className="h-3 w-3" />
                    12%
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Total cadastrados</p>
                <p className="text-4xl font-bold">5</p>
                <p className="text-xs text-muted-foreground mt-2">+3 este mês</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-accent/20 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20">
                    <Clock className="h-5 w-5 text-purple-500" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-purple-500">
                    <Activity className="h-3 w-3" />
                    Ativo
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Aguardando aprovação</p>
                <p className="text-4xl font-bold">3</p>
                <p className="text-xs text-muted-foreground mt-2">Tempo médio: 2h</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-accent/20 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/20">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-green-500">
                    <TrendingDown className="h-3 w-3" />
                    50%
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Aprovados com erro</p>
                <p className="text-4xl font-bold">0</p>
                <p className="text-xs text-muted-foreground mt-2">Redução significativa</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-accent/20 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20">
                    <Grid3x3 className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-blue-500">
                    <BarChart3 className="h-3 w-3" />
                    Alta
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Total de categorias</p>
                <p className="text-4xl font-bold">105</p>
                <p className="text-xs text-muted-foreground mt-2">Bem organizado</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-card to-accent/20 border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/20">
                    <FileX className="h-5 w-5 text-orange-500" />
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-orange-500">
                    <AlertTriangle className="h-3 w-3" />
                    Ação
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Não enriquecidos</p>
                <p className="text-4xl font-bold">1367</p>
                <p className="text-xs text-muted-foreground mt-2">Requer atenção</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-6 bg-gradient-to-r from-card to-accent/20 border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
                    <CreditCard className="h-5 w-5 text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Produtos Processados</h3>
                    <p className="text-sm text-muted-foreground">
                      Seu plano: <span className="font-medium text-purple-500">Business - 5.000 produtos/mês</span>
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Fazer Upgrade
                </Button>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">12 produtos melhorados de 5.000 disponíveis este mês</span>
                    <span className="text-sm font-medium text-green-500">0,24% usado</span>
                  </div>
                  <div className="h-3 w-full bg-accent rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-green-600" style={{ width: "0.24%" }} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-500">8</p>
                    <p className="text-xs text-muted-foreground">Concluídos</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-500">4</p>
                    <p className="text-xs text-muted-foreground">Em processo</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-500">4.988</p>
                    <p className="text-xs text-muted-foreground">Restantes</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Comparativo de Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Antes do enriquecimento</span>
                      <span className="text-sm font-medium">Qualidade média: 45%</span>
                    </div>
                    <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{ width: "45%" }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Após enriquecimento</span>
                      <span className="text-sm font-medium">Qualidade média: 90%</span>
                    </div>
                    <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: "90%" }} />
                    </div>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Melhoria Total</span>
                      <span className="text-2xl font-bold text-green-500">+100%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Alertas e Ações Recomendadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-orange-500/20 bg-orange-500/5">
                    <AlertTriangle className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">2 produtos precisam de atenção</p>
                      <p className="text-xs text-muted-foreground">Qualidade abaixo de 50%</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Resolver
                    </Button>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-green-500/20 bg-green-500/5">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">8 produtos otimizados</p>
                      <p className="text-xs text-muted-foreground">Prontos para venda</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver
                    </Button>
                  </div>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-blue-500/20 bg-blue-500/5">
                    <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium mb-1">Oportunidade de melhoria</p>
                      <p className="text-xs text-muted-foreground">Categorizar 15 produtos similares</p>
                    </div>
                    <Button size="sm" variant="outline">
                      Iniciar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Catálogo */}
          <Card className="mb-6 border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Catálogo</CardTitle>
              </div>
              <Button variant="ghost" size="sm">
                <span className="text-amber-500">⛶</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
                {catalogProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border-border hover:border-amber-500/50 transition-colors"
                  >
                    <CardContent className="p-3">
                      <div className="aspect-square rounded-lg bg-white mb-3 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <h4 className="text-xs font-medium line-clamp-2 mb-1">{product.name}</h4>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="h-1 w-full bg-accent rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-amber-600" style={{ width: "25%" }} />
              </div>
            </CardContent>
          </Card>

          {/* Total de descrições criadas */}
          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Total de descrições criadas</CardTitle>
                <select className="text-sm border border-border rounded-lg px-3 py-1 bg-card">
                  <option>Por mês</option>
                  <option>Por semana</option>
                  <option>Por dia</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={enrichmentData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="descriptions" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>

        {/* Help Button */}
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-amber-500 shadow-lg hover:bg-amber-600"
        >
          <HelpCircle className="h-6 w-6 text-white" />
        </Button>
      </div>
    </div>
  )
}
