"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Store, Sparkles, Crown, Upload, ImageIcon, X, LogOut, Bell } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Loja {
  id: string
  nome: string
  logo?: string
  role: "dono" | "admin" | "editor"
  produtos: number
  plano: string
}

const lojasData: Loja[] = [
  {
    id: "da762f4a",
    nome: "Imports Bazar",
    logo: "/imports-bazar-logo-store.jpg",
    role: "dono",
    produtos: 901,
    plano: "Business",
  },
  {
    id: "ea2d372b",
    nome: "Madesandri",
    logo: "/madesandri-furniture-logo.jpg",
    role: "dono",
    produtos: 234,
    plano: "Start",
  },
]

export default function LojasPage() {
  const [lojas, setLojas] = useState<Loja[]>(lojasData)
  const [showNovaLoja, setShowNovaLoja] = useState(false)
  const [novaLoja, setNovaLoja] = useState({ nome: "", logo: "" })
  const [previewLogo, setPreviewLogo] = useState<string | null>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewLogo(reader.result as string)
        setNovaLoja((prev) => ({ ...prev, logo: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCriarLoja = () => {
    if (novaLoja.nome) {
      const nova: Loja = {
        id: Math.random().toString(36).substr(2, 8),
        nome: novaLoja.nome,
        logo: novaLoja.logo || undefined,
        role: "dono",
        produtos: 0,
        plano: "Start",
      }
      setLojas([...lojas, nova])
      setNovaLoja({ nome: "", logo: "" })
      setPreviewLogo(null)
      setShowNovaLoja(false)
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "dono":
        return (
          <Badge className="bg-pink-100 text-pink-700 border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            Dono
          </Badge>
        )
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-700 border-0">
            <Crown className="h-3 w-3 mr-1" />
            Admin
          </Badge>
        )
      default:
        return <Badge className="bg-gray-100 text-gray-700 border-0">Editor</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r flex flex-col">
        <div className="p-6">
          <Image src="/nexsi-logo-pink.jpg" alt="Nexsi" width={120} height={40} className="h-10 w-auto" />
        </div>

        <nav className="flex-1 px-4">
          <Link
            href="/lojas"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-pink-50 text-pink-600 font-medium"
          >
            <Store className="h-5 w-5" />
            Minhas Lojas
          </Link>

          <button
            onClick={() => setShowNovaLoja(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 w-full mt-1"
          >
            <Plus className="h-5 w-5" />
            Criar Nova Loja
          </button>
        </nav>

        <div className="p-4 border-t">
          <button className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 w-full">
            <LogOut className="h-5 w-5" />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <p className="text-gray-500 italic">"Acredite em você mesmo e tudo será possível."</p>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-full">
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm font-medium">RS</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-4xl font-black text-pink-600 uppercase tracking-tight">Minhas Lojas</h1>
            <Button onClick={() => setShowNovaLoja(true)} className="bg-pink-600 hover:bg-pink-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nova Loja
            </Button>
          </div>

          {/* Filter */}
          <div className="mb-6">
            <Button variant="outline" className="rounded-full bg-transparent">
              Todas
            </Button>
          </div>

          {/* Lojas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lojas.map((loja) => (
              <Card key={loja.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {/* Logo Area */}
                  <div className="h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center border-b">
                    {loja.logo ? (
                      <Image
                        src={loja.logo || "/placeholder.svg"}
                        alt={loja.nome}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain rounded-lg"
                      />
                    ) : (
                      <div className="h-20 w-20 bg-white rounded-lg flex items-center justify-center shadow-sm border">
                        <Store className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Info Area */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{loja.nome}</h3>
                        <p className="text-sm text-gray-500 font-mono">ID: {loja.id}...</p>
                      </div>
                      {getRoleBadge(loja.role)}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>{loja.produtos} produtos</span>
                      <span className="text-pink-600 font-medium">Plano {loja.plano}</span>
                    </div>

                    <Link href="/dashboard">
                      <Button variant="outline" className="w-full bg-transparent">
                        <Store className="h-4 w-4 mr-2" />
                        Entrar
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Modal Nova Loja */}
      <Dialog open={showNovaLoja} onOpenChange={setShowNovaLoja}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Criar Nova Loja</DialogTitle>
            <DialogDescription>Adicione uma nova loja à sua conta Nexsi</DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label>Logo da Loja</Label>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
                  {previewLogo ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={previewLogo || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-contain p-1"
                      />
                      <button
                        onClick={() => {
                          setPreviewLogo(null)
                          setNovaLoja((prev) => ({ ...prev, logo: "" }))
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ) : (
                    <ImageIcon className="h-8 w-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <Label
                    htmlFor="logo-upload"
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    Enviar Logo
                  </Label>
                  <input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG até 2MB</p>
                </div>
              </div>
            </div>

            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Loja</Label>
              <Input
                id="nome"
                placeholder="Ex: Minha Loja Virtual"
                value={novaLoja.nome}
                onChange={(e) => setNovaLoja((prev) => ({ ...prev, nome: e.target.value }))}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNovaLoja(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCriarLoja} className="bg-pink-600 hover:bg-pink-700" disabled={!novaLoja.nome}>
              Criar Loja
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
