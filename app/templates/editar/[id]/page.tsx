"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, HelpCircle, Sparkles, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AppLayout } from "@/components/app-layout"
import { initialTemplates } from "../../page"

export default function EditarTemplatePage() {
  const router = useRouter()
  const params = useParams()
  const templateId = Number(params.id)

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    promptTitulo: "",
    tomVoz: "",
    palavrasNegativas: "",
    palavrasChave: "",
    promptDescricao: "",
    metaTitle: "",
    metaDescription: "",
    metaTags: "",
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load template data
    const template = initialTemplates.find((t) => t.id === templateId)
    if (template) {
      setFormData({
        name: template.name,
        description: template.description,
        promptTitulo: template.promptTitulo || "",
        tomVoz: template.tomVoz || "",
        palavrasNegativas: template.palavrasNegativas || "",
        palavrasChave: template.palavrasChave || "",
        promptDescricao: template.promptDescricao || "",
        metaTitle: template.metaTitle || "",
        metaDescription: template.metaDescription || "",
        metaTags: template.metaTags || "",
      })
    }
    setIsLoading(false)
  }, [templateId])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Template updated:", formData)
    router.push("/templates")
  }

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <TooltipProvider>
        <div className="flex-1 overflow-auto">
          <div className="p-6 max-w-4xl">
            {/* Back button */}
            <Button
              variant="outline"
              size="icon"
              className="mb-6 bg-amber-500 text-white hover:bg-amber-600 border-0"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Editar Template</h1>
              <p className="text-muted-foreground">Edite as configurações do seu template de geração de conteúdo.</p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Nome do Template */}
              <div className="space-y-2">
                <Label className="font-semibold">Nome do Template</Label>
                <Input
                  placeholder="Nome do template"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Descrição */}
              <div className="space-y-2">
                <Label className="font-semibold">Descrição</Label>
                <Input
                  placeholder="Descrição breve do template"
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Prompt do Título */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="font-semibold">Prompt do Título</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-amber-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Defina o formato do título do produto</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  placeholder="EX: [Nome produto] + [Brand] + [dados tecnicos]"
                  value={formData.promptTitulo}
                  onChange={(e) => handleChange("promptTitulo", e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Tom de voz */}
              <div className="space-y-2">
                <Label className="font-semibold">Tom de voz</Label>
                <Input
                  placeholder="Escolha um tom de voz ou escreva um novo"
                  value={formData.tomVoz}
                  onChange={(e) => handleChange("tomVoz", e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Palavras negativas */}
              <div className="space-y-2">
                <Label className="font-semibold">Palavras negativas</Label>
                <Textarea
                  placeholder='Insira termos que não devem aparecer no conteúdo gerado. Ex: "barato", "promoção", "usado".'
                  value={formData.palavrasNegativas}
                  onChange={(e) => handleChange("palavrasNegativas", e.target.value)}
                  className="bg-background min-h-[120px]"
                />
              </div>

              {/* Palavras-chave */}
              <div className="space-y-2">
                <Label className="font-semibold">Palavras-chave</Label>
                <Textarea
                  placeholder="Defina os termos que você deseja destacar no conteúdo. Eles serão incluídos de forma estratégica para melhorar seu SEO."
                  value={formData.palavrasChave}
                  onChange={(e) => handleChange("palavrasChave", e.target.value)}
                  className="bg-background min-h-[120px]"
                />
              </div>

              {/* Prompt da descrição */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="font-semibold">Prompt da descrição</Label>
                  <div className="flex gap-2">
                    <Button variant="default" size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Gerar a partir de uma descrição
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-amber-500 text-amber-600 hover:bg-amber-50 bg-transparent"
                    >
                      Testar Descrição
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Descreva como a descrição do produto deve ser gerada..."
                  value={formData.promptDescricao}
                  onChange={(e) => handleChange("promptDescricao", e.target.value)}
                  className="bg-background min-h-[300px]"
                />
              </div>

              {/* Meta Title */}
              <div className="space-y-2">
                <Label className="font-semibold">Meta Title</Label>
                <Textarea
                  placeholder="Exemplo prático: Crie um meta title com até 60 caracteres, destacando o nome do produto, sua principal vantagem e uma palavra-chave relevante para SEO."
                  value={formData.metaTitle}
                  onChange={(e) => handleChange("metaTitle", e.target.value)}
                  className="bg-background min-h-[120px]"
                />
              </div>

              {/* Meta Description */}
              <div className="space-y-2">
                <Label className="font-semibold">Meta Description</Label>
                <Textarea
                  placeholder="Exemplo prático: Crie uma meta description com até 160 caracteres, destacando o nome do produto, seus principais benefícios e incentivando o clique."
                  value={formData.metaDescription}
                  onChange={(e) => handleChange("metaDescription", e.target.value)}
                  className="bg-background min-h-[120px]"
                />
              </div>

              {/* Meta Tags */}
              <div className="space-y-2">
                <Label className="font-semibold">Meta Tags</Label>
                <Textarea
                  placeholder="Exemplo prático: Liste meta tags separadas por vírgula, incluindo o nome do produto, categoria e palavras-chave relacionadas ao uso ou benefício."
                  value={formData.metaTags}
                  onChange={(e) => handleChange("metaTags", e.target.value)}
                  className="bg-background min-h-[120px]"
                />
              </div>

              {/* Save button */}
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700 text-white">
                <Save className="h-4 w-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </AppLayout>
  )
}
