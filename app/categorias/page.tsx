"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, RefreshCw, Plus, Sparkles, ChevronRight, ChevronDown } from "lucide-react"

interface Category {
  id: string
  name: string
  code: string
  subcategories?: Category[]
  expanded?: boolean
}

const mockCategories: Category[] = [
  { id: "1", name: "Categoria", code: "1564499", subcategories: [] },
  { id: "2", name: "Carros escala 1/64", code: "2046666", subcategories: [] },
  { id: "3", name: "Ônibus 1/38 - 1/50", code: "1564721", subcategories: [] },
  { id: "4", name: "Em Breve", code: "1564714", subcategories: [] },
  { id: "5", name: "Carros escala 1/31", code: "1564712", subcategories: [] },
  { id: "6", name: "Caminhões escala 1/87", code: "1564711", subcategories: [] },
  { id: "7", name: "Caminhões escala 1/43", code: "1564710", subcategories: [] },
]

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [parentCategoryId, setParentCategoryId] = useState<string | null>(null)
  const [showEnrichModal, setShowEnrichModal] = useState(false)
  const [enrichCategoryId, setEnrichCategoryId] = useState<string | null>(null)
  const [descriptionSize, setDescriptionSize] = useState("longa")

  const filteredCategories = categories.filter(
    (cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()) || cat.code.includes(searchTerm),
  )

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return

    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      code: Math.floor(Math.random() * 9000000 + 1000000).toString(),
      subcategories: [],
    }

    if (parentCategoryId) {
      setCategories(
        categories.map((cat) => {
          if (cat.id === parentCategoryId) {
            return {
              ...cat,
              subcategories: [...(cat.subcategories || []), newCategory],
            }
          }
          return cat
        }),
      )
    } else {
      setCategories([...categories, newCategory])
    }

    setNewCategoryName("")
    setParentCategoryId(null)
    setShowAddModal(false)
  }

  const handleAddSubcategory = (parentId: string) => {
    setParentCategoryId(parentId)
    setShowAddModal(true)
  }

  const toggleExpanded = (categoryId: string) => {
    setCategories(
      categories.map((cat) => {
        if (cat.id === categoryId) {
          return { ...cat, expanded: !cat.expanded }
        }
        return cat
      }),
    )
  }

  const handleEnrichCategory = (categoryId: string) => {
    setEnrichCategoryId(categoryId)
    setShowEnrichModal(true)
  }

  const confirmEnrich = () => {
    console.log("Enriching category:", enrichCategoryId, "with size:", descriptionSize)
    setShowEnrichModal(false)
    setEnrichCategoryId(null)
  }

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold font-serif">Categorias</h1>
          <p className="text-muted-foreground mt-1">
            Para adicionar uma subcategoria, clique no botão com "+" na categoria pai.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Upload className="h-4 w-4" />
              Exportar dados
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Importar dados
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <RefreshCw className="h-4 w-4" />
              Sincronizar
            </Button>
          </div>
          <Button
            variant="outline"
            className="gap-2 bg-transparent"
            onClick={() => {
              setParentCategoryId(null)
              setShowAddModal(true)
            }}
          >
            <Plus className="h-4 w-4" />
            Inserir categoria pai
          </Button>
        </div>

        {/* Search */}
        <div>
          <Input
            placeholder="Pesquisar categoria"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-card"
          />
        </div>

        {/* Categories List */}
        <div className="space-y-3">
          {filteredCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3">
                  {category.subcategories && category.subcategories.length > 0 ? (
                    <button onClick={() => toggleExpanded(category.id)}>
                      {category.expanded ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  ) : (
                    <div className="w-4" />
                  )}
                  <span className="font-medium">
                    {category.name} ({category.code})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-amber-500 hover:bg-amber-600 border-amber-500 text-white"
                    onClick={() => handleAddSubcategory(category.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 bg-amber-500 hover:bg-amber-600 border-amber-500 text-white"
                    onClick={() => handleEnrichCategory(category.id)}
                  >
                    <Sparkles className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Subcategories */}
              {category.expanded && category.subcategories && category.subcategories.length > 0 && (
                <div className="ml-8 mt-2 space-y-2">
                  {category.subcategories.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between bg-card/50 border border-border rounded-lg p-3"
                    >
                      <span className="font-medium text-sm">
                        {sub.name} ({sub.code})
                      </span>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-amber-500 hover:bg-amber-600 border-amber-500 text-white"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7 bg-amber-500 hover:bg-amber-600 border-amber-500 text-white"
                          onClick={() => handleEnrichCategory(sub.id)}
                        >
                          <Sparkles className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Category Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{parentCategoryId ? "Adicionar Subcategoria" : "Adicionar Categoria Pai"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Nome da categoria</label>
                <Input
                  placeholder="Digite o nome da categoria"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddModal(false)
                  setNewCategoryName("")
                  setParentCategoryId(null)
                }}
              >
                Cancelar
              </Button>
              <Button className="bg-amber-500 hover:bg-amber-600 text-white" onClick={handleAddCategory}>
                Adicionar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Enrich Category Modal */}
        <Dialog open={showEnrichModal} onOpenChange={setShowEnrichModal}>
          <DialogContent className="sm:max-w-md bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-white">Enriquecer categoria</DialogTitle>
            </DialogHeader>
            <div className="py-6">
              <div className="flex items-center gap-3">
                <span className="text-white">Tamanho da descrição:</span>
                <Select value={descriptionSize} onValueChange={setDescriptionSize}>
                  <SelectTrigger className="w-32 bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    <SelectItem value="curta" className="text-white hover:bg-zinc-700">
                      Curta
                    </SelectItem>
                    <SelectItem value="media" className="text-white hover:bg-zinc-700">
                      Média
                    </SelectItem>
                    <SelectItem value="longa" className="text-white hover:bg-zinc-700">
                      Longa
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter className="flex justify-center gap-4 sm:justify-center">
              <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8" onClick={confirmEnrich}>
                Sim
              </Button>
              <Button
                className="bg-amber-500 hover:bg-amber-600 text-black font-medium px-8"
                onClick={() => setShowEnrichModal(false)}
              >
                Não
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}
