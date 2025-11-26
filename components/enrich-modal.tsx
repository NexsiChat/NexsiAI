"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EnrichModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productCount: number
  onConfirm: (options: EnrichOptions) => void
}

interface EnrichOptions {
  template: string
  fields: {
    descricao: boolean
    metaTitle: boolean
    metaDescription: boolean
    metaTags: boolean
  }
  enrichAlreadyEnriched: boolean
  selectedApis: string[]
}

export function EnrichModal({ open, onOpenChange, productCount, onConfirm }: EnrichModalProps) {
  const [template, setTemplate] = useState("padrao-nexsi")
  const [fields, setFields] = useState({
    descricao: true,
    metaTitle: true,
    metaDescription: true,
    metaTags: true,
  })
  const [enrichAlreadyEnriched, setEnrichAlreadyEnriched] = useState(false)
  const [selectedApis, setSelectedApis] = useState<string[]>([])

  const toggleField = (field: keyof typeof fields) => {
    setFields({ ...fields, [field]: !fields[field] })
  }

  const toggleApi = (api: string) => {
    if (selectedApis.includes(api)) {
      setSelectedApis(selectedApis.filter((a) => a !== api))
    } else {
      setSelectedApis([...selectedApis, api])
    }
  }

  const handleConfirm = () => {
    onConfirm({
      template,
      fields,
      enrichAlreadyEnriched,
      selectedApis,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Deseja enriquecer {productCount} produto{productCount !== 1 ? "s" : ""}?
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Template Selection */}
          <div className="flex items-center gap-3">
            <span className="text-sm">Modelo de descrição:</span>
            <Select value={template} onValueChange={setTemplate}>
              <SelectTrigger className="w-[200px] bg-card border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="padrao-nexsi">Padrão NexsiAI</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="marketplace">Marketplace</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Fields Selection */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-amber-500">Selecione abaixo os campos que deseja enriquecer</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="descricao"
                  checked={fields.descricao}
                  onCheckedChange={() => toggleField("descricao")}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label htmlFor="descricao" className="text-sm cursor-pointer">
                  Descrição
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="metaTitle"
                  checked={fields.metaTitle}
                  onCheckedChange={() => toggleField("metaTitle")}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label htmlFor="metaTitle" className="text-sm cursor-pointer">
                  Meta Title
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="metaDescription"
                  checked={fields.metaDescription}
                  onCheckedChange={() => toggleField("metaDescription")}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label htmlFor="metaDescription" className="text-sm cursor-pointer">
                  Meta Description
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="metaTags"
                  checked={fields.metaTags}
                  onCheckedChange={() => toggleField("metaTags")}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <label htmlFor="metaTags" className="text-sm cursor-pointer">
                  Meta Tags
                </label>
              </div>
            </div>
          </div>

          {/* Enrichment Options */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-amber-500">Opções de enriquecimento</p>
            <div className="flex items-center gap-2">
              <Checkbox
                id="enrichAlready"
                checked={enrichAlreadyEnriched}
                onCheckedChange={(checked) => setEnrichAlreadyEnriched(checked as boolean)}
              />
              <label htmlFor="enrichAlready" className="text-sm cursor-pointer">
                Enriquecer itens já enriquecidos
              </label>
            </div>
          </div>

          {/* API Selection */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-amber-500">Selecione a API para qual deseja enriquecer:</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="nuvemshop"
                  checked={selectedApis.includes("nuvemshop")}
                  onCheckedChange={() => toggleApi("nuvemshop")}
                />
                <img src="/nuvemshop-logo.jpg" alt="Nuvemshop" className="h-5 w-5" />
                <label htmlFor="nuvemshop" className="text-sm cursor-pointer">
                  Nuvemshop - Nuvemshop
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="mercadolivre"
                  checked={selectedApis.includes("mercadolivre")}
                  onCheckedChange={() => toggleApi("mercadolivre")}
                />
                <img src="/generic-online-marketplace-logo.png" alt="Mercado Livre" className="h-5 w-5" />
                <label htmlFor="mercadolivre" className="text-sm cursor-pointer">
                  Mercado Livre - Mercado Livre
                </label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="shopee"
                  checked={selectedApis.includes("shopee")}
                  onCheckedChange={() => toggleApi("shopee")}
                />
                <img src="/generic-e-commerce-logo.png" alt="Shopee" className="h-5 w-5" />
                <label htmlFor="shopee" className="text-sm cursor-pointer">
                  Shopee - Shopee
                </label>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-3 sm:gap-3">
          <Button onClick={handleConfirm} className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
            Confirmar
          </Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-amber-500 text-amber-500 hover:bg-amber-500/10"
          >
            Cancelar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
