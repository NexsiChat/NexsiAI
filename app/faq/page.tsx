"use client"

import type React from "react"

import { useState } from "react"
import { PanelLayout } from "@/components/panel-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Search,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Package,
  Upload,
  CreditCard,
  Users,
  Zap,
  HelpCircle,
  MessageCircle,
  BookOpen,
  Play,
  ExternalLink,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface FAQItem {
  question: string
  answer: string
}

interface FAQCategory {
  id: string
  title: string
  icon: React.ReactNode
  color: string
  description: string
  items: FAQItem[]
}

const faqCategories: FAQCategory[] = [
  {
    id: "getting-started",
    title: "Primeiros Passos",
    icon: <Play className="h-5 w-5" />,
    color: "bg-emerald-500",
    description: "Como começar a usar a Nexsi",
    items: [
      {
        question: "Como faço para começar a usar a Nexsi?",
        answer:
          "Para começar, você precisa: 1) Criar sua conta na plataforma; 2) Conectar seu primeiro canal de vendas (Bling, Tiny, Tray, etc.); 3) Sincronizar seu catálogo de produtos; 4) Começar a enriquecer seus produtos com nossa IA. Todo o processo leva menos de 10 minutos!",
      },
      {
        question: "Quais canais de vendas a Nexsi suporta?",
        answer:
          "Atualmente suportamos os principais ERPs e marketplaces do Brasil: Bling, Tiny ERP, Tray, Nuvemshop, Mercado Livre, Amazon, Shopee, Magalu e muitos outros. Estamos constantemente adicionando novas integrações.",
      },
      {
        question: "Preciso de conhecimento técnico para usar a plataforma?",
        answer:
          "Não! A Nexsi foi desenvolvida para ser intuitiva e fácil de usar. Nossa IA faz todo o trabalho pesado de otimização. Você só precisa aprovar as sugestões ou deixar no modo automático.",
      },
      {
        question: "Quanto tempo leva para ver resultados?",
        answer:
          "Os primeiros resultados aparecem imediatamente após o enriquecimento dos produtos. Em média, nossos clientes veem um aumento de 25-40% nas conversões nas primeiras 2 semanas de uso.",
      },
    ],
  },
  {
    id: "ai-enrichment",
    title: "Enriquecimento com IA",
    icon: <Sparkles className="h-5 w-5" />,
    color: "bg-primary",
    description: "Como funciona nossa inteligência artificial",
    items: [
      {
        question: "Como funciona o enriquecimento de produtos com IA?",
        answer:
          "Nossa IA analisa as informações do seu produto (título, imagens, categoria) e gera automaticamente: descrições otimizadas para SEO, títulos mais atrativos, tags relevantes, meta descriptions e sugestões de categorização. Tudo é baseado em dados de milhões de produtos de sucesso.",
      },
      {
        question: "A IA pode errar nas sugestões?",
        answer:
          "Como qualquer IA, podem ocorrer sugestões que não se adequam perfeitamente. Por isso, oferecemos o modo de aprovação manual onde você revisa cada sugestão antes de aplicar. Você também pode editar qualquer sugestão antes de aprovar.",
      },
      {
        question: "Posso personalizar o estilo das descrições?",
        answer:
          "Sim! Você pode criar templates personalizados com o tom de voz da sua marca, incluir informações da empresa, definir estrutura de descrição preferida e muito mais. A IA seguirá suas preferências.",
      },
      {
        question: "O que é o Score de Qualidade?",
        answer:
          "O Score de Qualidade é uma nota de 0 a 100 que indica quão otimizado está seu produto. Ele considera: qualidade do título, descrição completa, imagens, categoria correta, SEO, e outros fatores. Quanto maior o score, maior a chance de conversão.",
      },
    ],
  },
  {
    id: "products",
    title: "Gestão de Produtos",
    icon: <Package className="h-5 w-5" />,
    color: "bg-blue-500",
    description: "Gerenciamento do seu catálogo",
    items: [
      {
        question: "Como importar meus produtos?",
        answer:
          "Você pode importar produtos de 3 formas: 1) Integração direta com seu ERP/marketplace (automático); 2) Upload de planilha Excel/CSV; 3) Cadastro manual produto por produto. Recomendamos a integração direta para manter tudo sincronizado.",
      },
      {
        question: "As alterações são enviadas automaticamente para meu canal de vendas?",
        answer:
          "Sim! Após aprovar as melhorias, elas são automaticamente sincronizadas com o canal de origem (Bling, Tiny, etc.). Você pode configurar para envio automático ou manual nas configurações.",
      },
      {
        question: "Posso editar produtos em lote?",
        answer:
          "Sim! Você pode selecionar múltiplos produtos e aplicar ações em lote como: enriquecer com IA, alterar categoria, exportar, aprovar sugestões e muito mais. Ideal para quem tem catálogos grandes.",
      },
      {
        question: "Como funciona a categorização automática?",
        answer:
          "Nossa IA analisa o título, descrição e imagens do produto para sugerir a categoria mais adequada. As sugestões aparecem na tela de 'Aprovação de Categoria' para sua revisão antes de aplicar.",
      },
    ],
  },
  {
    id: "integrations",
    title: "Integrações",
    icon: <Upload className="h-5 w-5" />,
    color: "bg-purple-500",
    description: "Conexão com outros sistemas",
    items: [
      {
        question: "Como conectar meu ERP à Nexsi?",
        answer:
          "Vá em 'Integrações' no menu lateral, selecione seu ERP (Bling, Tiny, etc.), clique em 'Conectar' e siga as instruções para autorizar o acesso. O processo é simples e leva menos de 2 minutos.",
      },
      {
        question: "A integração é segura?",
        answer:
          "Sim! Usamos conexões criptografadas (SSL) e tokens de acesso seguros. Nunca armazenamos suas credenciais de login. Você pode revogar o acesso a qualquer momento.",
      },
      {
        question: "Posso conectar múltiplos canais ao mesmo tempo?",
        answer:
          "Sim! Você pode conectar quantos canais quiser e gerenciar todos os catálogos em um só lugar. Cada canal aparece como uma opção no seletor de canais na tela de produtos.",
      },
      {
        question: "O que acontece se eu desconectar uma integração?",
        answer:
          "Seus produtos permanecem na Nexsi, mas param de sincronizar automaticamente. Você pode reconectar a qualquer momento para retomar a sincronização.",
      },
    ],
  },
  {
    id: "plans",
    title: "Planos e Pagamento",
    icon: <CreditCard className="h-5 w-5" />,
    color: "bg-amber-500",
    description: "Informações sobre assinatura",
    items: [
      {
        question: "Quais são os planos disponíveis?",
        answer:
          "Oferecemos 3 planos: Pro (R$ 249,90/mês - até 3.000 produtos), Business (R$ 499,90/mês - até 5.000 produtos) e Enterprise (sob consulta - ilimitado). Todos incluem os mesmos recursos, a diferença é o volume de produtos.",
      },
      {
        question: "Posso testar antes de assinar?",
        answer:
          "Sim! Oferecemos 14 dias de teste grátis no plano Business, sem compromisso e sem precisar de cartão de crédito. Você terá acesso a todos os recursos durante o período de teste.",
      },
      {
        question: "Como funciona o pagamento?",
        answer:
          "O pagamento é mensal via cartão de crédito, boleto ou PIX. No plano anual, você ganha 20% de desconto. Você pode cancelar a qualquer momento sem multa.",
      },
      {
        question: "O que acontece se eu exceder o limite de produtos?",
        answer:
          "Você receberá uma notificação para fazer upgrade do plano. Seus produtos existentes continuam funcionando, mas você não poderá adicionar novos até fazer o upgrade ou remover produtos.",
      },
    ],
  },
  {
    id: "team",
    title: "Equipe e Permissões",
    icon: <Users className="h-5 w-5" />,
    color: "bg-pink-500",
    description: "Gestão de usuários e acessos",
    items: [
      {
        question: "Posso adicionar outros usuários à minha conta?",
        answer:
          "Sim! Você pode convidar quantos usuários quiser. Vá em 'Administrativo > Usuários' e clique em 'Associar Novo Usuário'. O convidado receberá um email para criar sua senha.",
      },
      {
        question: "Como funcionam os grupos de permissão?",
        answer:
          "Grupos de permissão definem o que cada usuário pode fazer na plataforma. Você pode criar grupos personalizados (ex: 'Apenas visualização', 'Editor de produtos', 'Administrador') e atribuir usuários a eles.",
      },
      {
        question: "O que é o Grupo Base?",
        answer:
          "O Grupo Base é o grupo padrão de permissões que não pode ser excluído. Novos usuários são automaticamente atribuídos a ele. Você pode editar suas permissões, mas não pode removê-lo.",
      },
      {
        question: "Como remover um usuário da equipe?",
        answer:
          "Vá em 'Administrativo > Usuários', encontre o usuário, clique nos três pontos e selecione 'Remover'. O usuário perderá acesso imediatamente.",
      },
    ],
  },
  {
    id: "advanced",
    title: "Recursos Avançados",
    icon: <Zap className="h-5 w-5" />,
    color: "bg-orange-500",
    description: "Funcionalidades para usuários experientes",
    items: [
      {
        question: "O que é o Nexsi Copilot?",
        answer:
          "O Nexsi Copilot é nosso assistente de IA conversacional. Você pode perguntar sobre seu catálogo, pedir análises, solicitar otimizações e muito mais - tudo em linguagem natural. Ele aparece como um botão flutuante no canto inferior direito.",
      },
      {
        question: "Como criar templates personalizados?",
        answer:
          "Vá em 'Templates > Criar Template'. Você pode definir estrutura de título, formato de descrição, informações obrigatórias, tom de voz e muito mais. Os templates são aplicados automaticamente nas sugestões da IA.",
      },
      {
        question: "A Nexsi tem API para integração?",
        answer:
          "Sim! No plano Enterprise, você tem acesso à nossa API REST completa para integrar a Nexsi com seus sistemas internos. Documentação disponível mediante solicitação.",
      },
      {
        question: "Como funcionam os logs do sistema?",
        answer:
          "Os logs registram todas as ações realizadas na plataforma: quem fez o quê e quando. Útil para auditoria e acompanhamento. Acesse em 'Administrativo > Logs do Sistema'.",
      },
    ],
  },
]

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedCategory, setExpandedCategory] = useState<string | null>("getting-started")
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set())

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const key = `${categoryId}-${questionIndex}`
    setExpandedQuestions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
      }
      return newSet
    })
  }

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      items: category.items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((category) => category.items.length > 0 || searchQuery === "")

  const totalQuestions = faqCategories.reduce((acc, cat) => acc + cat.items.length, 0)

  return (
    <PanelLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-pink-500">
              <HelpCircle className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Central de Ajuda</h1>
          <p className="text-muted-foreground">
            Encontre respostas para suas dúvidas sobre a Nexsi. {totalQuestions} perguntas frequentes organizadas por
            categoria.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Buscar pergunta ou palavra-chave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base rounded-xl"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <span className="text-sm font-medium">Guia de Início</span>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <Play className="h-5 w-5 text-red-600" />
              </div>
              <span className="text-sm font-medium">Vídeos Tutoriais</span>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="text-sm font-medium">Suporte WhatsApp</span>
            </CardContent>
          </Card>
          <Card className="cursor-pointer hover:border-primary/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center gap-2">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <ExternalLink className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-sm font-medium">Blog Nexsi</span>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Categories Nav */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Categorias</h3>
                <nav className="space-y-1">
                  {faqCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setExpandedCategory(category.id)}
                      className={cn(
                        "w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                        expandedCategory === category.id
                          ? "bg-accent font-medium"
                          : "text-muted-foreground hover:bg-accent/50",
                      )}
                    >
                      <div
                        className={cn("h-8 w-8 rounded-lg flex items-center justify-center text-white", category.color)}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <p className="font-medium">{category.title}</p>
                        <p className="text-xs text-muted-foreground">{category.items.length} perguntas</p>
                      </div>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Questions */}
          <div className="lg:col-span-3 space-y-4">
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                className={cn(
                  "transition-all",
                  expandedCategory === category.id || searchQuery ? "block" : "hidden lg:block",
                )}
              >
                <CardContent className="p-6">
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                  >
                    <div
                      className={cn("h-10 w-10 rounded-lg flex items-center justify-center text-white", category.color)}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </div>
                    {expandedCategory === category.id ? (
                      <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>

                  {(expandedCategory === category.id || searchQuery) && (
                    <div className="mt-4 space-y-2">
                      {category.items.map((item, index) => {
                        const isExpanded = expandedQuestions.has(`${category.id}-${index}`)
                        return (
                          <div key={index} className="border border-border rounded-lg overflow-hidden">
                            <button
                              onClick={() => toggleQuestion(category.id, index)}
                              className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-accent/50 transition-colors"
                            >
                              <span className="font-medium">{item.question}</span>
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                              ) : (
                                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
                              )}
                            </button>
                            {isExpanded && (
                              <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3 bg-muted/30">
                                {item.answer}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}

            {filteredCategories.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Nenhum resultado encontrado</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Não encontramos perguntas relacionadas a "{searchQuery}"
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Limpar busca
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-pink-500/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-xl font-semibold mb-2">Não encontrou o que procurava?</h3>
            <p className="text-muted-foreground mb-4">
              Nossa equipe está pronta para ajudar você via WhatsApp ou email.
            </p>
            <div className="flex justify-center gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
              <Button variant="outline">Enviar email</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PanelLayout>
  )
}
