"use client"

import { Store, Globe, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AppSidebar } from "@/components/app-sidebar"

export default function IntegrationsPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Integrações</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-accent px-3 py-2">
                <span className="text-sm">⚡</span>
                <span className="text-sm font-medium">Bling Conectado</span>
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Store className="h-5 w-5 text-primary" />
              ERPs e Plataformas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-primary bg-primary/5">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
                        <span className="font-bold text-green-600">B</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">Bling</CardTitle>
                        <CardDescription>ERP e Gestão</CardDescription>
                      </div>
                    </div>
                    <Badge className="bg-green-500 hover:bg-green-600">Conectado</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Sistema ERP online que integra gestão de vendas, estoque, financeiro e emissão de notas fiscais.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Configurar
                  </Button>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                    Desinstalar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D3277]/10">
                        <span className="font-bold text-[#2D3277]">N</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">Nuvemshop</CardTitle>
                        <CardDescription>E-commerce</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Plataforma de e-commerce focada em pequenos e médios negócios, oferecendo loja virtual completa.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20">
                    <Plus className="mr-2 h-4 w-4" />
                    Conectar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0047FF]/10">
                        <span className="font-bold text-[#0047FF]">T</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">Tray</CardTitle>
                        <CardDescription>E-commerce</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Plataforma robusta com ferramentas de gestão de vendas, integrações e automação de marketing.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20">
                    <Plus className="mr-2 h-4 w-4" />
                    Conectar
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00B4AA]/10">
                        <span className="font-bold text-[#00B4AA]">LI</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">Loja Integrada</CardTitle>
                        <CardDescription>E-commerce</CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Plataforma simples e acessível para criação de lojas virtuais e gestão de produtos.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary/10 text-primary hover:bg-primary/20">
                    <Plus className="mr-2 h-4 w-4" />
                    Conectar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Marketplaces
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFE600]/10">
                        <span className="font-bold text-[#FFE600]">ML</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">Mercado Livre</CardTitle>
                        <CardDescription>Marketplace</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Em Breve</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Marketplace líder na América Latina, permitindo gestão de anúncios e vendas integrada.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button disabled className="w-full">
                    Aguarde
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D3277]/10">
                        <span className="font-bold text-[#2D3277]">O</span>
                      </div>
                      <div>
                        <CardTitle className="text-base">Olist</CardTitle>
                        <CardDescription>Store in Store</CardDescription>
                      </div>
                    </div>
                    <Badge variant="secondary">Em Breve</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Hub de vendas que conecta lojas a grandes marketplaces e oferece gestão integrada.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button disabled className="w-full">
                    Aguarde
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
