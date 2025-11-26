"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Check,
  Sparkles,
  Building2,
  Rocket,
  Zap,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  CreditCard,
  Calendar,
  TrendingUp,
  Shield,
  Clock,
  Users,
  MessageCircle,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"

export default function PlansPage() {
  const [isAnnual, setIsAnnual] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Plano atual do usuário (mock)
  const currentPlan = {
    name: "Pro",
    productsUsed: 1847,
    productsLimit: 3000,
    renewDate: "15/12/2024",
    daysLeft: 20,
  }

  const plans = [
    {
      id: "pro",
      name: "Pro",
      icon: Rocket,
      description: "Ideal para pequenos lojistas iniciando no e-commerce",
      priceMonthly: 249.9,
      priceAnnual: 199.9,
      color: "from-blue-500 to-blue-600",
      borderColor: "hover:border-blue-500/50",
      features: [
        "Até 3.000 produtos melhorados por mês",
        "Melhoria de produto com IA",
        "Funciona em qualquer canal: Bling, Tray, Tiny",
        "Ajuste automático de Título, descrição, SEO",
        "Limpeza de caracteres e formatação",
        "Envio das melhorias de volta para o canal",
        "Suporte padrão por email",
      ],
      cta: "Selecionar Plano",
      popular: false,
      current: true,
    },
    {
      id: "business",
      name: "Business",
      icon: Building2,
      description: "Indicado para sellers com múltiplos canais ativos",
      priceMonthly: 499.9,
      priceAnnual: 399.9,
      color: "from-primary to-pink-600",
      borderColor: "border-primary",
      features: [
        "Até 5.000 produtos melhorados por mês",
        "Maior capacidade para grandes catálogos",
        "Processamento prioritário na fila de IA",
        "Suporte Avançado com chat",
        "Relatórios de performance",
        "Tudo do plano Pro",
      ],
      cta: "Selecionar Plano",
      popular: true,
      trial: "Teste grátis por 14 dias",
      current: false,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: Sparkles,
      description: "Para grandes operações em escala",
      priceMonthly: null,
      priceAnnual: null,
      color: "from-amber-500 to-amber-600",
      borderColor: "hover:border-amber-500/50",
      features: [
        "IA ilimitada",
        "Processamento dedicado e mais rápido",
        "Suporte VIP prioritário",
        "Canais personalizados e API's próprias",
        "Acompanhamento dedicado",
        "Onboarding personalizado",
        "Tudo dos demais planos",
      ],
      cta: "Falar com Consultor",
      popular: false,
      current: false,
    },
  ]

  const faqs = [
    {
      question: "Posso mudar de plano a qualquer momento?",
      answer:
        "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se fizer upgrade, a diferença será cobrada proporcionalmente. Se fizer downgrade, o crédito será aplicado na próxima fatura.",
    },
    {
      question: "O que acontece se eu exceder o limite de produtos?",
      answer:
        "Quando você atingir 80% do limite, enviaremos um aviso. Ao atingir 100%, os novos produtos entrarão em uma fila e serão processados no próximo ciclo, ou você pode fazer upgrade para continuar processando.",
    },
    {
      question: "Como funciona o período de teste?",
      answer:
        "O plano Business oferece 14 dias de teste grátis. Durante esse período, você tem acesso a todos os recursos. Não cobramos nada até o fim do período de teste.",
    },
    {
      question: "Quais formas de pagamento são aceitas?",
      answer:
        "Aceitamos cartão de crédito, boleto bancário e Pix. Para planos anuais, oferecemos parcelamento em até 12x sem juros no cartão.",
    },
    {
      question: "Posso cancelar quando quiser?",
      answer:
        "Sim, você pode cancelar a qualquer momento. Não há multa ou fidelidade. O acesso continua até o fim do período já pago.",
    },
  ]

  const comparisonFeatures = [
    { name: "Produtos por mês", pro: "3.000", business: "5.000", enterprise: "Ilimitado" },
    { name: "Canais integrados", pro: "Todos", business: "Todos", enterprise: "Todos + Custom" },
    { name: "Processamento IA", pro: "Padrão", business: "Prioritário", enterprise: "Dedicado" },
    { name: "Suporte", pro: "WhatsApp", business: "WhatsApp", enterprise: "WhatsApp VIP" },
    { name: "Relatórios", pro: "Básico", business: "Avançado", enterprise: "Personalizado" },
    { name: "API própria", pro: false, business: false, enterprise: true },
    { name: "Onboarding", pro: "Autoatendimento", business: "Guiado", enterprise: "Dedicado" },
  ]

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Planos</h1>
          <p className="text-muted-foreground">
            Todos os planos incluem os mesmos recursos. A diferença é a quantidade de produtos processados pela IA por
            mês.
          </p>
        </div>

        {/* Current Plan Status */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-blue-500 flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
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
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">
                    {currentPlan.productsUsed.toLocaleString()} / {currentPlan.productsLimit.toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">Produtos usados</p>
                </div>
              </div>
              <div className="h-8 w-px bg-border hidden lg:block" />
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(currentPlan.productsUsed / currentPlan.productsLimit) * 100}%` }}
                />
              </div>
              <Button variant="outline" size="sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Gerenciar Assinatura
              </Button>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${!isAnnual ? "text-foreground" : "text-muted-foreground"}`}>
            Mensal
          </span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <span className={`text-sm font-medium ${isAnnual ? "text-foreground" : "text-muted-foreground"}`}>Anual</span>
          {isAnnual && <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Economize 20%</Badge>}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const Icon = plan.icon
            const price = isAnnual ? plan.priceAnnual : plan.priceMonthly

            return (
              <div
                key={plan.id}
                className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
                  plan.popular
                    ? "border-2 border-primary scale-105 shadow-xl z-10"
                    : `border-border ${plan.borderColor}`
                } ${plan.current ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
              >
                {plan.popular && (
                  <div className="bg-primary text-primary-foreground text-center text-sm font-medium py-1">
                    Mais Popular
                  </div>
                )}
                {plan.current && !plan.popular && (
                  <div className="bg-blue-500 text-white text-center text-sm font-medium py-1">Plano Atual</div>
                )}

                <div className={`bg-gradient-to-br ${plan.color} p-6 text-white`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-6 w-6" />
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                  </div>
                  <p className="text-white/80 text-sm">{plan.description}</p>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    {price ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-foreground">
                          R$ {price.toFixed(2).replace(".", ",")}
                        </span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-foreground">Sob consulta</span>
                        <span className="text-muted-foreground">/mês</span>
                      </div>
                    )}
                    {isAnnual && price && (
                      <p className="text-sm text-green-600 mt-1">
                        Economia de R$ {((plan.priceMonthly! - plan.priceAnnual!) * 12).toFixed(2).replace(".", ",")}{" "}
                        por ano
                      </p>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : plan.current ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                    variant={plan.popular || plan.current ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Plano Atual" : plan.cta}
                  </Button>

                  {plan.trial && <p className="text-center text-sm text-muted-foreground mt-3">{plan.trial}</p>}
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
                      <Rocket className="h-5 w-5 text-blue-500" />
                      <span>Pro</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Building2 className="h-5 w-5 text-primary" />
                      <span>Business</span>
                    </div>
                  </th>
                  <th className="text-center p-4 font-medium">
                    <div className="flex flex-col items-center gap-1">
                      <Sparkles className="h-5 w-5 text-amber-500" />
                      <span>Enterprise</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="p-4 font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      {typeof feature.pro === "boolean" ? (
                        feature.pro ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      ) : (
                        <span className="text-sm">{feature.pro}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary/5">
                      {typeof feature.business === "boolean" ? (
                        feature.business ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      ) : (
                        <span className="text-sm">{feature.business}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof feature.enterprise === "boolean" ? (
                        feature.enterprise ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )
                      ) : (
                        <span className="text-sm">{feature.enterprise}</span>
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
            <Button className="bg-primary hover:bg-primary/90">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
