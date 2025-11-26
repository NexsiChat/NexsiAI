"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { AppLayout } from "@/components/app-layout"

export default function CriarTemplatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    promptTitulo: "",
    tomVoz: "",
    palavrasNegativas: "",
    palavrasChave: "",
    promptDescricao: "",
    metaTitle: "",
    metaDescription: "",
    metaTags: "",
  })

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Template saved:", formData)
    router.push("/templates")
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
              className="mb-6 bg-primary text-primary-foreground hover:bg-primary/90 border-0"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Criar Template</h1>
              <p className="text-muted-foreground">
                Crie seu template a partir de um modelo pronto ou descreva o que precisa, e a Nexsi faz o resto!
              </p>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Prompt do Título */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="font-semibold">Prompt do Título</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-primary" />
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
                    <Button variant="default" size="sm" className="bg-primary text-primary-foreground">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Gerar a partir de uma descrição
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary hover:bg-primary/10 bg-transparent"
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
                Salvar e continuar
              </Button>
            </div>
          </div>
        </div>
      </TooltipProvider>
    </AppLayout>
  )
}
