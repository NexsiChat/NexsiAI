"use client"

import { useState, useRef, useEffect } from "react"
import {
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  Bot,
  User,
  TrendingUp,
  Package,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Lightbulb,
  BarChart3,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  actions?: {
    label: string
    onClick: () => void
    variant?: "default" | "outline"
  }[]
  insights?: {
    icon: "trend" | "alert" | "success" | "package"
    text: string
  }[]
}

const quickActions = [
  { icon: TrendingUp, label: "Produtos com baixa conversão", query: "Quais produtos estão com baixa conversão?" },
  { icon: Package, label: "Estoque parado", query: "Quais produtos estão com estoque parado há mais de 30 dias?" },
  { icon: BarChart3, label: "Análise do catálogo", query: "Faça uma análise geral do meu catálogo" },
  { icon: Zap, label: "Oportunidades de melhoria", query: "Quais produtos têm maior potencial de melhoria?" },
]

const mockResponses: Record<string, Message> = {
  "baixa conversão": {
    id: "1",
    role: "assistant",
    content:
      "Encontrei **12 produtos** com taxa de conversão abaixo de 2% nos últimos 30 dias. Os principais problemas identificados são:\n\n• **Títulos pouco descritivos** (5 produtos)\n• **Falta de imagens secundárias** (4 produtos)\n• **Descrições muito curtas** (3 produtos)\n\nPosso otimizar automaticamente esses produtos para você?",
    timestamp: new Date(),
    insights: [
      { icon: "alert", text: "12 produtos precisam de atenção" },
      { icon: "trend", text: "Potencial de +35% em conversão" },
    ],
    actions: [
      { label: "Otimizar todos", onClick: () => {}, variant: "default" },
      { label: "Ver lista", onClick: () => {}, variant: "outline" },
    ],
  },
  "estoque parado": {
    id: "2",
    role: "assistant",
    content:
      "Identifiquei **8 produtos** com estoque parado há mais de 30 dias, totalizando **R$ 4.250,00** em capital imobilizado.\n\nSugestões para movimentar esse estoque:\n\n• Criar promoção relâmpago (desconto de 15-20%)\n• Melhorar posicionamento nas buscas\n• Adicionar esses produtos em kits/combos",
    timestamp: new Date(),
    insights: [
      { icon: "package", text: "8 produtos parados" },
      { icon: "alert", text: "R$ 4.250 imobilizados" },
    ],
    actions: [
      { label: "Criar promoção", onClick: () => {}, variant: "default" },
      { label: "Otimizar SEO", onClick: () => {}, variant: "outline" },
    ],
  },
  análise: {
    id: "3",
    role: "assistant",
    content:
      "**Análise do Catálogo - Imports Bazar**\n\n📊 **Visão Geral**\n• 901 produtos cadastrados\n• 78% com descrição otimizada\n• Score médio de qualidade: 72/100\n\n✅ **Pontos Fortes**\n• Boa variedade de categorias\n• 85% dos produtos com imagens\n\n⚠️ **Oportunidades**\n• 156 produtos sem categoria definida\n• 89 produtos com títulos muito longos\n• 45 produtos sem EAN cadastrado",
    timestamp: new Date(),
    insights: [
      { icon: "success", text: "Score geral: 72/100" },
      { icon: "trend", text: "22% de melhoria possível" },
    ],
    actions: [
      { label: "Corrigir categorias", onClick: () => {}, variant: "default" },
      { label: "Ver relatório completo", onClick: () => {}, variant: "outline" },
    ],
  },
  melhoria: {
    id: "4",
    role: "assistant",
    content:
      "**Top 5 produtos com maior potencial de melhoria:**\n\n1. **Miniatura Ferrari F40** - Score 45/100\n   → Falta descrição e categoria\n\n2. **Bentley Continental GT** - Score 52/100\n   → Título pode ser otimizado\n\n3. **Ford Pickup 1940** - Score 58/100\n   → Sem tags de busca\n\n4. **Porsche 911 GT3** - Score 61/100\n   → Meta description ausente\n\n5. **Lamborghini Aventador** - Score 63/100\n   → Imagens secundárias faltando\n\nPosso enriquecer todos esses produtos agora?",
    timestamp: new Date(),
    insights: [
      { icon: "trend", text: "Potencial de +40% vendas" },
      { icon: "success", text: "5 produtos prioritários" },
    ],
    actions: [
      { label: "Enriquecer todos", onClick: () => {}, variant: "default" },
      { label: "Escolher produtos", onClick: () => {}, variant: "outline" },
    ],
  },
}

export function NexsiCopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Olá! Sou o **Nexsi Copilot**, seu assistente de vendas com IA. Posso ajudar você a:\n\n• Analisar performance do catálogo\n• Identificar oportunidades de melhoria\n• Otimizar produtos automaticamente\n• Responder dúvidas sobre suas vendas\n\nComo posso ajudar hoje?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simular resposta da IA
    setTimeout(() => {
      let response: Message

      const lowerText = messageText.toLowerCase()
      if (lowerText.includes("conversão") || lowerText.includes("vendendo mal")) {
        response = { ...mockResponses["baixa conversão"], id: Date.now().toString(), timestamp: new Date() }
      } else if (lowerText.includes("estoque") || lowerText.includes("parado")) {
        response = { ...mockResponses["estoque parado"], id: Date.now().toString(), timestamp: new Date() }
      } else if (lowerText.includes("análise") || lowerText.includes("catálogo") || lowerText.includes("geral")) {
        response = { ...mockResponses["análise"], id: Date.now().toString(), timestamp: new Date() }
      } else if (
        lowerText.includes("melhoria") ||
        lowerText.includes("potencial") ||
        lowerText.includes("oportunidade")
      ) {
        response = { ...mockResponses["melhoria"], id: Date.now().toString(), timestamp: new Date() }
      } else {
        response = {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Entendi sua pergunta! Para te ajudar melhor, posso fazer uma análise do seu catálogo. Algumas coisas que posso verificar:\n\n• Performance de vendas por produto\n• Qualidade das descrições\n• Oportunidades de categorização\n• Sugestões de preços\n\nQual dessas análises você gostaria que eu fizesse?",
          timestamp: new Date(),
          actions: [
            {
              label: "Análise completa",
              onClick: () => handleSend("Faça uma análise geral do meu catálogo"),
              variant: "default",
            },
          ],
        }
      }

      setMessages((prev) => [...prev, response])
      setIsLoading(false)
    }, 1500)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "trend":
        return <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
      case "alert":
        return <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
      case "success":
        return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
      case "package":
        return <Package className="h-3.5 w-3.5 text-blue-500" />
      default:
        return <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
    }
  }

  const formatContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      // Bold text
      const parts = line.split(/(\*\*.*?\*\*)/g)
      const formatted = parts.map((part, j) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={j}>{part.slice(2, -2)}</strong>
        }
        return part
      })
      return (
        <span key={i}>
          {formatted}
          {i < content.split("\n").length - 1 && <br />}
        </span>
      )
    })
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-pink-500 text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      >
        <Sparkles className="h-6 w-6" />
      </button>
    )
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-pink-500 px-4 py-3 text-white shadow-lg transition-all hover:scale-105"
        >
          <Sparkles className="h-5 w-5" />
          <span className="font-medium">Nexsi Copilot</span>
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex h-[600px] w-[420px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-primary to-pink-500 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Nexsi Copilot</h3>
            <p className="text-xs text-white/80">Seu assistente de vendas com IA</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <Minimize2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollRef} className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex gap-3", message.role === "user" ? "flex-row-reverse" : "flex-row")}
            >
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-gradient-to-r from-primary/20 to-pink-500/20",
                )}
              >
                {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4 text-primary" />}
              </div>
              <div className={cn("max-w-[85%] space-y-2", message.role === "user" ? "text-right" : "text-left")}>
                <div
                  className={cn(
                    "inline-block rounded-2xl px-4 py-2.5 text-sm",
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                  )}
                >
                  {formatContent(message.content)}
                </div>

                {/* Insights */}
                {message.insights && message.insights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {message.insights.map((insight, i) => (
                      <div key={i} className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-xs">
                        {getInsightIcon(insight.icon)}
                        <span>{insight.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                {message.actions && message.actions.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {message.actions.map((action, i) => (
                      <Button
                        key={i}
                        size="sm"
                        variant={action.variant || "default"}
                        onClick={action.onClick}
                        className="h-8 text-xs"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary/20 to-pink-500/20">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-muted px-4 py-2.5">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">Analisando...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="border-t border-border bg-muted/50 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Sugestões rápidas:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleSend(action.query)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs transition-colors hover:bg-accent"
              >
                <action.icon className="h-3.5 w-3.5 text-primary" />
                {action.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-background p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex gap-2"
        >
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pergunte sobre seu catálogo..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
