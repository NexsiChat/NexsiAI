"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  UploadIcon,
  Settings,
  ChevronRight,
  ChevronDown,
  Shield,
  CheckSquare,
  PenSquare,
  FileText,
  Grid3X3,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export function AppSidebar() {
  const pathname = usePathname()
  const [adminOpen, setAdminOpen] = useState(true)
  const [productsOpen, setProductsOpen] = useState(true)
  const [cadastroOpen, setCadastroOpen] = useState(false)
  const [aprovacaoOpen, setAprovacaoOpen] = useState(false)
  const [templatesOpen, setTemplatesOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  const pendingEnriquecimento = 2
  const pendingCategoria = 1

  return (
    <aside className="w-64 border-r border-border bg-card flex flex-col">
      <div className="p-6 flex-1">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">N</span>
          </div>
          <span className="text-xl font-bold">nexsi</span>
        </Link>

        <nav className="space-y-1">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive("/dashboard")
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>

          {/* Produtos */}
          <div>
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive("/") || isActive("/products")
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4" />
                Produtos
              </div>
              {productsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {productsOpen && (
              <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                <Link
                  href="/"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Todos os Produtos
                </Link>
              </div>
            )}
          </div>

          {/* Cadastro */}
          <div>
            <button
              onClick={() => setCadastroOpen(!cadastroOpen)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname?.startsWith("/cadastro")
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <PenSquare className="h-4 w-4" />
                Cadastro
              </div>
              {cadastroOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {cadastroOpen && (
              <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                <Link
                  href="/cadastro/produto"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/cadastro/produto")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  de Produto
                </Link>
                <Link
                  href="/cadastro/planilha"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/cadastro/planilha")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  por Planilha
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/categorias"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive("/categorias")
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Grid3X3 className="h-4 w-4" />
            Categorias
          </Link>

          {/* Aprovação */}
          <div>
            <button
              onClick={() => setAprovacaoOpen(!aprovacaoOpen)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname?.startsWith("/aprovacao")
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <CheckSquare className="h-4 w-4" />
                Aprovação
              </div>
              {aprovacaoOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {aprovacaoOpen && (
              <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                <Link
                  href="/aprovacao/cadastro"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/aprovacao/cadastro")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  de Cadastro
                </Link>
                <Link
                  href="/aprovacao/enriquecimento"
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/aprovacao/enriquecimento")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  de Enriquecimento
                  {pendingEnriquecimento > 0 && (
                    <Badge className="bg-amber-500 text-white hover:bg-amber-500 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                      {pendingEnriquecimento}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/aprovacao/categoria"
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/aprovacao/categoria")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  de Categoria
                  {pendingCategoria > 0 && (
                    <Badge className="bg-amber-500 text-white hover:bg-amber-500 h-5 w-5 p-0 flex items-center justify-center text-xs rounded-full">
                      {pendingCategoria}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/aprovacao/aprovados"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/aprovacao/aprovados")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Aprovados
                </Link>
              </div>
            )}
          </div>

          {/* Integrações */}
          <Link
            href="/integrations"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive("/integrations")
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <UploadIcon className="h-4 w-4" />
            Integrações
          </Link>

          {/* Templates */}
          <div>
            <button
              onClick={() => setTemplatesOpen(!templatesOpen)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname?.startsWith("/templates")
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4" />
                Templates
              </div>
              {templatesOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {templatesOpen && (
              <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                <Link
                  href="/templates"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/templates")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Meus Templates
                </Link>
                <Link
                  href="/templates/criar"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/templates/criar")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Criar Template
                </Link>
              </div>
            )}
          </div>

          {/* Administrativo */}
          <div>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                pathname?.startsWith("/admin")
                  ? "bg-accent font-medium text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4" />
                Administrativo
              </div>
              {adminOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </button>
            {adminOpen && (
              <div className="ml-6 mt-1 space-y-1 border-l border-border pl-3">
                <Link
                  href="/admin/users"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/admin/users")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Usuários
                </Link>
                <Link
                  href="/admin/roles"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/admin/roles")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Grupos de Permissão
                </Link>
                <Link
                  href="/admin/logs"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/admin/logs")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Logs do Sistema
                </Link>
                <Link
                  href="/admin/plans"
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm transition-colors",
                    isActive("/admin/plans")
                      ? "bg-accent font-medium text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  )}
                >
                  Planos
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/faq"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive("/faq")
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <HelpCircle className="h-4 w-4" />
            FAQ Nexsi
          </Link>

          {/* Configurações */}
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              isActive("/settings")
                ? "bg-accent font-medium text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
            Configurações
          </Link>
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-border bg-card p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            IB
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Imports bazar</p>
            <p className="text-xs text-muted-foreground truncate">13.976.770/0001-16</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </aside>
  )
}
