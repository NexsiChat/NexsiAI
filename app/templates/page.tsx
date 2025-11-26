"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Plus, Search, MoreVertical, Edit, Trash2, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { AppLayout } from "@/components/app-layout"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export const initialTemplates = [
  {
    id: 1,
    name: "Padrão NexsiAI",
    description: "Template padrão para geração de conteúdo com IA",
    isDefault: true,
    createdAt: "2024-01-15",
    usageCount: 1250,
    promptTitulo: "[Nome produto] + [Brand] + [dados tecnicos]",
    tomVoz: "Profissional e persuasivo",
    palavrasNegativas: "barato, promoção, usado, desconto",
    palavrasChave: "qualidade, premium, original, garantia",
    promptDescricao:
      "Crie uma descrição detalhada do produto destacando suas principais características e benefícios...",
    metaTitle: "Crie um meta title com até 60 caracteres destacando o nome do produto",
    metaDescription: "Crie uma meta description com até 160 caracteres destacando benefícios",
    metaTags: "produto, categoria, marca",
  },
  {
    id: 2,
    name: "E-commerce Premium",
    description: "Template otimizado para produtos de alto valor",
    isDefault: false,
    createdAt: "2024-02-20",
    usageCount: 430,
    promptTitulo: "[Brand] [Nome produto] - [Categoria]",
    tomVoz: "Luxuoso e exclusivo",
    palavrasNegativas: "barato, popular, comum",
    palavrasChave: "exclusivo, premium, sofisticado, elegante",
    promptDescricao: "Crie uma descrição sofisticada destacando a exclusividade e qualidade premium...",
    metaTitle: "Meta title elegante para produtos premium",
    metaDescription: "Meta description focada em exclusividade",
    metaTags: "premium, exclusivo, luxo",
  },
  {
    id: 3,
    name: "Marketplace Básico",
    description: "Template simples para marketplaces",
    isDefault: false,
    createdAt: "2024-03-10",
    usageCount: 890,
    promptTitulo: "[Nome produto] [Especificação]",
    tomVoz: "Direto e informativo",
    palavrasNegativas: "",
    palavrasChave: "comprar, melhor preço, entrega rápida",
    promptDescricao: "Crie uma descrição objetiva e informativa do produto...",
    metaTitle: "Meta title otimizado para marketplace",
    metaDescription: "Meta description para conversão",
    metaTags: "comprar, online, entrega",
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [templates, setTemplates] = useState(initialTemplates)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null)

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (templateId: number) => {
    router.push(`/templates/editar/${templateId}`)
  }

  const handleDuplicate = (templateId: number) => {
    const templateToDuplicate = templates.find((t) => t.id === templateId)
    if (templateToDuplicate) {
      const newTemplate = {
        ...templateToDuplicate,
        id: Math.max(...templates.map((t) => t.id)) + 1,
        name: `${templateToDuplicate.name} (Cópia)`,
        isDefault: false,
        createdAt: new Date().toISOString().split("T")[0],
        usageCount: 0,
      }
      setTemplates([...templates, newTemplate])
    }
  }

  const handleDeleteClick = (templateId: number) => {
    setTemplateToDelete(templateId)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (templateToDelete) {
      setTemplates(templates.filter((t) => t.id !== templateToDelete))
      setDeleteDialogOpen(false)
      setTemplateToDelete(null)
    }
  }

  return (
    <AppLayout>
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold font-heading text-foreground">Templates</h1>
              <p className="text-muted-foreground mt-1">Gerencie seus templates de geração de conteúdo</p>
            </div>
            <Link href="/templates/criar">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Novo Template
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      {template.name}
                      {template.isDefault && (
                        <Badge variant="secondary" className="bg-pink-100 text-pink-600 text-xs">
                          Padrão
                        </Badge>
                      )}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(template.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicate(template.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteClick(template.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Usado {template.usageCount}x</span>
                    <span>Criado em {new Date(template.createdAt).toLocaleDateString("pt-BR")}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty state */}
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">Nenhum template encontrado</p>
              <Link href="/templates/criar">
                <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar primeiro template
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Template</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este template? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  )
}
