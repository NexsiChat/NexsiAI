"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Building2,
  Rocket,
  Zap,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CreditCard,
  Calendar,
  Shield,
  Clock,
  Users,
  MessageCircle,
  Star,
  Crown,
  Info,
  X,
  ImageIcon,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"

export default function PlansPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Plano atual do usuário (mock)
  const currentPlan = {
    name: "Start",
    creditsUsed: 347,
    creditsLimit: 1000,
    renewDate: "15/12/2024",
    daysLeft: 20,
  }

  const plans = [
    {
      id: "start",
      name: "Start",
      icon: Star,
      description: "Ideal para quem está começando ou quer testar IA na prática.",
      price: 99.7,
      credits: "1.000",
      channels: 1,
      color: "from-green-500 to-green-600",
      borderColor: "hover:border-green-500/50",
      imageAI: "none", // none, optional, included
      features: [
        "Até 1.000 SKUs melhorados por ano",
        "IA de títulos, descrições, atributos e SEO",
        "Otimização automática de produtos",
        "Cadastro inteligente com 1 clique",
        "1 canal de integração",
        "Suporte básico via WhatsApp",
      ],
      notIncluded: ["Melhoria de imagem por IA"],
      cta: "Selecionar Plano",
      popular: false,
      current: true,
    },
    {
      id: "basic",
      name: "Basic",
      icon: Rocket,
      description: "Para quem tem volume maior e quer acelerar a operação.",
      price: 249.7,
      credits: "3.000",
      channels: 2,
      color: "from-blue-500 to-blue-600",
      borderColor: "hover:border-blue-500/50",
      imageAI: "none",
      features: [
        "Até 3.000 SKUs melhorados por ano",
        "IA de títulos, descrições, atributos e SEO",
        "Otimização automática de produtos",
        "Cadastro inteligente com 1 clique",
        "2 canais de integração",
        "Suporte prioritário via WhatsApp",
      ],
      notIncluded: ["Melhoria de imagem por IA"],
      cta: "Selecionar Plano",
      popular: false,
      current: false,
    },
    {
      id: "business",
      name: "Business",
      icon: Building2,
      description: "Pensado para operações profissionais.",
      price: 399.7,
      credits: "5.000",
      channels: 3,
      color: "from-primary to-pink-600",
      borderColor: "border-primary",
      imageAI: "optional",
      features: [
        "Até 5.000 SKUs melhorados por ano",
        "IA de títulos, descrições, atributos e SEO",
        "Otimização automática de produtos",
        "Cadastro inteligente com 1 clique",
        "3 canais de integração",
        "Templates liberados",
        "Suporte premium via WhatsApp",
      ],
      optionalFeature: "Melhoria de imagem por IA → opcional por crédito",
      cta: "Selecionar Plano",
      popular: true,
      trial: "Teste grátis por 14 dias",
      current: false,
    },
    {
      id: "professional",
      name: "Professional",
      icon: Crown,
      description: "Para quem quer tudo, sem limites operacionais.",
      price: 799.7,
      credits: "10.000",
      channels: 4,
      color: "from-amber-500 to-amber-600",
      borderColor: "hover:border-amber-500/50",
      imageAI: "included",
      features: [
        "Até 10.000 SKUs melhorados por ano",
        "IA de títulos, descrições, atributos e SEO",
        "Otimização automática de produtos",
        "Cadastro inteligente com 1 clique",
        "4 canais de integração",
        "Templates liberados",
        "Suporte premium+ via WhatsApp",
        "Melhoria de imagem por IA 100% inclusa",
      ],
      highlight: "Plano completo para máxima conversão",
      cta: "Selecionar Plano",
      popular: false,
      current: false,
    },
  ]

  const faqs = [
    {
      question: "Como funcionam os SKUs melhorados?",
      answer:
        "Cada SKU (produto único) que você melhora com a IA consome 1 crédito do seu plano. Por exemplo: se você melhorou 300 produtos, usou 300 dos seus créditos anuais. Os créditos são renovados a cada ano de assinatura.",
    },
    {
      question: "A melhoria de imagem por IA está inclusa?",
      answer:
        "Nos planos Start e Basic, a melhoria de imagem NÃO está inclusa. No plano Business, ela é opcional e cobra créditos adicionais. Apenas no plano Professional a melhoria de imagem está 100% inclusa sem custos extras.",
    },
    {
      question: "Posso mudar de plano a qualquer momento?",
      answer:
        "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se fizer upgrade, a diferença será cobrada proporcionalmente. Se fizer downgrade, o crédito será aplicado na próxima fatura.",
    },
    {
      question: "O que acontece se eu usar todos os SKUs antes do fim do ano?",
      answer:
        "Você receberá um aviso quando atingir 80% dos créditos. Ao esgotar 100%, poderá comprar pacotes adicionais de créditos ou fazer upgrade para um plano maior.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Aceitamos cartão de crédito, boleto bancário e Pix. Oferecemos parcelamento em até 12x sem juros no cartão.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Sim, você pode cancelar a qualquer momento. Não há multa ou fidelidade. O acesso continua até o fim do período já pago.",
    },
  ]

  const comparisonFeatures = [
    { name: "SKUs melhorados por ano", start: "1.000", basic: "3.000", business: "5.000", professional: "10.000" },
    { name: "Canais integrados", start: "1", basic: "2", business: "3", professional: "4" },
    { name: "IA de títulos e descrições", start: true, basic: true, business: true, professional: true },
    { name: "IA de atributos e SEO", start: true, basic: true, business: true, professional: true },
    { name: "Otimização automática", start: true, basic: true, business: true, professional: true },
    { name: "Cadastro com 1 clique", start: true, basic: true, business: true, professional: true },
    { name: "Templates liberados", start: false, basic: false, business: true, professional: true },
    {
      name: "Melhoria de imagem por IA",
      start: "Não incluso",
      basic: "Não incluso",
      business: "Opcional",
      professional: "Incluso",
    },
    {
      name: "Suporte",
      start: "WhatsApp",
      basic: "WhatsApp Prioritário",
      business: "WhatsApp Premium",
      professional: "WhatsApp Premium+",
    },
  ]

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Planos</h1>
          <p className="text-muted-foreground">
            Escolha o plano ideal para o tamanho do seu catálogo. Todos os valores são cobrados mensalmente com contrato
            anual.
          </p>
        </div>

        {/* Current Plan Status */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-green-500 flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">Plano {currentPlan.name}</h3>
                  <Badge variant="secondary">Atual</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Renova em {currentPlan.renewDate} ({currentPlan.daysLeft} dias)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="text-sm font-medium">
                    {currentPlan.creditsUsed.toLocaleString()} / {currentPlan.creditsLimit.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">SKUs melhorados</p>
                </div>
              </div>
              <div className="h-8 w-px bg-border hidden lg:block" />
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-500 h-2 rounded-full"
                  style={{ width: `${(currentPlan.creditsUsed / currentPlan.creditsLimit) * 100}%` }}
                />
              </div>
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Gerenciar Assinatura
              </Button>
            </div>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Por que essa estrutura?</h4>
              <p className="text-sm text-muted-foreground">
                Texto e otimização são de uso diário, por isso estão em <strong>todos os planos</strong>. A melhoria de
                imagem por IA tem custo maior, então é liberada apenas nos planos Business (opcional) e Professional
                (inclusa).
              </p>
            </div>
          </div>
        </div>

        {/* Plans Grid - 4 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon

            return (
              <div
                key={plan.id}
                className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
                  plan.popular ? "border-2 border-primary shadow-xl z-10" : `border-border ${plan.borderColor}`
                } ${plan.current ? "ring-2 ring-green-500 ring-offset-2" : ""}`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center text-sm font-medium py-1">
                    Mais Popular
                  </div>
                )}
                {plan.current && !plan.popular && (
                  <div className="bg-green-500 text-white text-center text-sm font-medium py-1">Plano Atual</div>
                )}

                <div className={`bg-gradient-to-br ${plan.color} p-5 text-white`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-5 w-5" />
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-white/80 text-sm leading-tight">{plan.description}</p>
                </div>

                <div className="p-5">
                  <div className="mb-5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">
                        R$ {plan.price.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-muted-foreground text-sm">/mês</span>
                    </div>
                    <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-2">
                      <p className="text-xs font-medium text-amber-700">
                        <Zap className="h-3 w-3 inline mr-1" />
                        {plan.credits} SKUs melhorados/ano
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Not Included Items */}
                  {plan.notIncluded && plan.notIncluded.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {plan.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <X className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Optional Feature (Business) */}
                  {plan.optionalFeature && (
                    <div className="mb-4 bg-amber-50 border border-amber-200 rounded-lg p-2">
                      <p className="text-xs text-amber-700 flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {plan.optionalFeature}
                      </p>
                    </div>
                  )}

                  {/* Highlight (Professional) */}
                  {plan.highlight && (
                    <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="text-xs text-green-700 font-medium text-center">{plan.highlight}</p>
                    </div>
                  )}

                  <Button
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : plan.current ? "bg-green-500 hover:bg-green-600" : ""}`}
                    variant={plan.popular || plan.current ? "default" : "outline"}
                    disabled={plan.current}
                    size="sm"
                  >
                    {plan.current ? "Plano Atual" : plan.cta}
                  </Button>

                  {plan.trial && <p className="text-center text-xs text-muted-foreground mt-2">{plan.trial}</p>}
                </div>
              </div>
            )
          })}
        </div>

        {/* Feature Comparison Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border bg-muted/50">
            <h2 className="font-serif text-xl font-bold">Comparativo de Recursos</h2>
            <p className="text-sm text-muted-foreground mt-1">Veja o que cada plano oferece</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-medium">Recurso</th>
                  <th className="text-center p-4 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Star className="h-5 w-5 text-green-500" />
                      <span>Start</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Rocket className="h-5 w-5 text-blue-500" />
                      <span>Basic</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium bg-primary/5">
                    <div className="flex flex-col items-center gap-1">
                      <Building2 className="h-5 w-5 text-primary" />
                      <span>Business</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Crown className="h-5 w-5 text-amber-500" />
                      <span>Professional</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      {typeof feature.start === "boolean" ? (
                        feature.start ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className={`text-sm ${feature.start === "Não incluso" ? "text-red-500" : ""}`}>
                          {feature.start}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.basic === "boolean" ? (
                        feature.basic ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className={`text-sm ${feature.basic === "Não incluso" ? "text-red-500" : ""}`}>
                          {feature.basic}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary/5">
                      {typeof feature.business === "boolean" ? (
                        feature.business ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span
                          className={`text-sm ${feature.business === "Opcional" ? "text-amber-600 font-medium" : ""}`}
                        >
                          {feature.business}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.professional === "boolean" ? (
                        feature.professional ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span
                          className={`text-sm ${feature.professional === "Incluso" ? "text-green-600 font-medium" : ""}`}
                        >
                          {feature.professional}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <Shield className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Pagamento Seguro</h4>
            <p className="text-xs text-muted-foreground">Criptografia SSL</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Sem Fidelidade</h4>
            <p className="text-xs text-muted-foreground">Cancele quando quiser</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-medium text-sm">+2.000 Clientes</h4>
            <p className="text-xs text-muted-foreground">Confiam na Nexsi</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <MessageCircle className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Suporte Humanizado</h4>
            <p className="text-xs text-muted-foreground">Resposta em 24h</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              <h2 className="font-serif text-xl font-bold">Perguntas Frequentes</h2>
            </div>
          </div>

          <div className="divide-y divide-border">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <span className="font-medium text-foreground">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-purple-100 border border-primary/20 rounded-xl p-8 text-center">
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Ainda tem dúvidas?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Nossa equipe está pronta para ajudar você a escolher o melhor plano para o seu negócio.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline">
              <MessageCircle className="h-4 w-4 mr-2" />
              Falar com Especialista
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
