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
  CreditCard,
  Calendar,
  Shield,
  Clock,
  MessageCircle,
  Star,
  Crown,
  X,
  ImageIcon,
  Store,
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
      description: "Para lojas pequenas que querem testar o poder da IA na prática",
      price: 99.7,
      priceYearly: 1196.4,
      credits: "1.000",
      skuLimit: "1.000",
      channels: 1,
      color: "from-green-500 to-green-600",
      borderColor: "hover:border-green-500/50",
      features: [
        "Melhorias de título, descrição e atributos por IA",
        "Diagnóstico de catálogo",
        "Sugestões de SEO por IA",
        "Painel completo de acompanhamento",
        "10 melhorias grátis para teste",
        "Envio de melhorias para qualquer canal conectado",
        "Suporte via WhatsApp",
      ],
      imageNote: "Imagem padrão inclusa (sem IA)",
      notIncluded: ["Melhoria de imagem por IA"],
      multistore: "R$ 149,90 por loja extra",
      cta: "Selecionar Plano",
      popular: false,
      current: true,
    },
    {
      id: "basic",
      name: "Basic",
      icon: Rocket,
      description: "Para quem tem volume maior e quer acelerar a operação",
      price: 249.7,
      priceYearly: 2996.4,
      credits: "3.000",
      skuLimit: "3.000",
      channels: 2,
      color: "from-blue-500 to-blue-600",
      borderColor: "hover:border-blue-500/50",
      inherited: "Tudo do plano Start +",
      features: [
        "Cadastro por 1 clique ou leitura por código de barras",
        "Melhoria de Imagens por IA liberada",
        "Notificações básicas por WhatsApp sobre status da conta",
      ],
      imageNote: "2 imagens geradas = 1 crédito adicional",
      multistore: "R$ 149,90 por loja extra",
      cta: "Selecionar Plano",
      popular: false,
      current: false,
    },
    {
      id: "business",
      name: "Business",
      icon: Building2,
      description: "Pensado para operações profissionais",
      price: 416.7,
      priceYearly: 5000.4,
      credits: "5.000",
      skuLimit: "5.000",
      channels: 3,
      color: "from-primary to-pink-600",
      borderColor: "border-primary",
      inherited: "Tudo do plano Basic +",
      features: [
        "Suporte avançado por WhatsApp",
        "Notificações inteligentes de catálogo",
        "Alertas de baixa performance",
        "IA monitora catálogo e sugere melhorias automaticamente",
        "Templates de otimização liberados",
      ],
      imageNote: "2 imagens geradas = 1 crédito adicional",
      multistore: "R$ 149,90 por loja extra",
      cta: "Selecionar Plano",
      popular: true,
      trial: "Teste grátis por 14 dias",
      current: false,
    },
    {
      id: "professional",
      name: "Professional",
      icon: Crown,
      description: "Para quem quer tudo, sem limites operacionais",
      price: 799.7,
      priceYearly: 9596.4,
      credits: "10.000",
      skuLimit: "10.000",
      channels: 4,
      color: "from-amber-500 to-amber-600",
      borderColor: "hover:border-amber-500/50",
      inherited: "Tudo do plano Business +",
      features: [
        "Atendimento prioritário",
        "IA integrada ao WhatsApp como 'agente de catálogo'",
        "Notificações avançadas: saúde do catálogo",
        "Performance por canal",
        "Alertas de quedas de conversão",
        "Sugestões automáticas de melhoria",
      ],
      imageNote: "2 imagens geradas = 1 crédito adicional",
      highlight: "Plano completo para máxima conversão",
      multistore: "R$ 99,90 por loja extra",
      cta: "Selecionar Plano",
      popular: false,
      current: false,
    },
  ]

  const faqs = [
    {
      question: "Como funcionam os créditos de IA?",
      answer:
        "Cada SKU (produto único) que você melhora com a IA consome 1 crédito do seu plano. Por exemplo: se você melhorou 300 produtos, usou 300 dos seus créditos anuais. Para imagens: a cada 2 imagens geradas pela IA, consome +1 crédito adicional. Se gerar só 1 imagem, não consome crédito extra. Os créditos são renovados a cada ano de assinatura.",
    },
    {
      question: "A melhoria de imagem por IA está inclusa em todos os planos?",
      answer:
        "Não. No plano Start, a melhoria de imagem por IA NÃO está disponível (apenas imagem padrão, sem IA). A partir do plano Basic, a melhoria de imagens por IA está liberada, sendo que a cada 2 imagens geradas, consome 1 crédito adicional.",
    },
    {
      question: "O que é Multiloja e como funciona?",
      answer:
        "Multiloja permite adicionar lojas extras à sua conta por R$ 149,90/mês cada. Cada loja extra tem: produtos separados, canais separados, melhorias separadas e permissões separadas. Todas as lojas compartilham os mesmos créditos do plano principal.",
    },
    {
      question: "Posso mudar de plano a qualquer momento?",
      answer:
        "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. Se fizer upgrade, a diferença será cobrada proporcionalmente. Se fizer downgrade, o crédito será aplicado na próxima fatura.",
    },
    {
      question: "O que acontece se eu usar todos os créditos antes do fim do ano?",
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
    { name: "Limite de SKUs", start: "1.000", basic: "3.000", business: "5.000", professional: "10.000" },
    { name: "Melhorias de IA por ano", start: "1.000", basic: "3.000", business: "5.000", professional: "10.000" },
    { name: "Canais de integração", start: "1", basic: "2", business: "3", professional: "4" },
    {
      name: "Melhorias de título, descrição e atributos",
      start: true,
      basic: true,
      business: true,
      professional: true,
    },
    { name: "Diagnóstico de catálogo", start: true, basic: true, business: true, professional: true },
    { name: "Sugestões de SEO por IA", start: true, basic: true, business: true, professional: true },
    { name: "Painel completo de acompanhamento", start: true, basic: true, business: true, professional: true },
    { name: "Cadastro por 1 clique / código de barras", start: false, basic: true, business: true, professional: true },
    { name: "Melhoria de Imagem por IA", start: false, basic: true, business: true, professional: true },
    {
      name: "Notificações por WhatsApp",
      start: false,
      basic: "Básicas",
      business: "Inteligentes",
      professional: "Avançadas",
    },
    { name: "Alertas de baixa performance", start: false, basic: false, business: true, professional: true },
    { name: "IA monitora e sugere melhorias", start: false, basic: false, business: true, professional: true },
    { name: "Templates de otimização", start: false, basic: false, business: true, professional: true },
    { name: "IA integrada ao WhatsApp", start: false, basic: false, business: false, professional: true },
    { name: "Atendimento prioritário", start: false, basic: false, business: false, professional: true },
    {
      name: "Suporte",
      start: "WhatsApp",
      basic: "WhatsApp",
      business: "WhatsApp Avançado",
      professional: "Prioritário",
    },
    { name: "Multiloja", start: "+R$ 149,90", basic: "+R$ 149,90", business: "+R$ 149,90", professional: "+R$ 99,90" },
  ]

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Planos</h1>
          <p className="text-muted-foreground">
            Escolha o plano ideal para o tamanho do seu catálogo. Modelo baseado em SKUs + Créditos de IA.
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
                  <p className="text-xs text-muted-foreground">Créditos usados</p>
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

        {/* Info Banner - Regras de Crédito */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Regras de Crédito</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <strong>Cada SKU melhorado = 1 crédito</strong> consumido
                </li>
                <li>
                  • <strong>Imagens por IA:</strong> a cada 2 imagens geradas = +1 crédito adicional (1 imagem não
                  consome extra)
                </li>
                <li>
                  • Créditos são <strong>renovados anualmente</strong> conforme o plano
                </li>
              </ul>
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
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-foreground">
                        R$ {plan.price.toFixed(2).replace(".", ",")}
                      </span>
                      <span className="text-muted-foreground text-sm">/mês</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Cobrado anualmente (R$ {plan.priceYearly.toFixed(2).replace(".", ",")})
                    </p>
                  </div>

                  {/* Créditos e Limites */}
                  <div className="space-y-2 mb-4">
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-2">
                      <p className="text-xs font-medium text-amber-700">
                        <Zap className="h-3 w-3 inline mr-1" />
                        {plan.credits} créditos IA/ano
                      </p>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <span className="bg-gray-100 px-2 py-1 rounded">{plan.skuLimit} SKUs</span>
                      <span className="bg-gray-100 px-2 py-1 rounded">
                        {plan.channels} {plan.channels === 1 ? "canal" : "canais"}
                      </span>
                    </div>
                  </div>

                  {/* Inherited */}
                  {plan.inherited && (
                    <div className="mb-3 bg-blue-50 border border-blue-200 rounded-lg p-2">
                      <p className="text-xs font-medium text-blue-700 text-center">{plan.inherited}</p>
                    </div>
                  )}

                  {/* Features */}
                  <ul className="space-y-2 mb-4">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Image Note */}
                  {plan.imageNote && (
                    <div className="mb-3 bg-gray-50 border border-gray-200 rounded-lg p-2">
                      <p className="text-xs text-gray-600 flex items-center gap-1">
                        <ImageIcon className="h-3 w-3" />
                        {plan.imageNote}
                      </p>
                    </div>
                  )}

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

                  {/* Highlight (Professional) */}
                  {plan.highlight && (
                    <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-2">
                      <p className="text-xs text-green-700 font-medium text-center">{plan.highlight}</p>
                    </div>
                  )}

                  {/* Multiloja */}
                  <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                    <Store className="h-3 w-3" />
                    <span>Multiloja: {plan.multistore}</span>
                  </div>

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
                    <td className="p-4 font-medium text-sm">{feature.name}</td>
                    <td className="p-4 text-center">
                      {typeof feature.start === "boolean" ? (
                        feature.start ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-sm">{feature.start}</span>
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
                        <span className="text-sm">{feature.basic}</span>
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
                        <span className="text-sm">{feature.business}</span>
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
                        <span className="text-sm">{feature.professional}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl">
            <Shield className="h-8 w-8 text-green-500" />
            <div>
              <p className="font-medium text-sm">Pagamento Seguro</p>
              <p className="text-xs text-muted-foreground">Criptografia SSL</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl">
            <Clock className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-medium text-sm">Sem Fidelidade</p>
              <p className="text-xs text-muted-foreground">Cancele quando quiser</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl">
            <MessageCircle className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-sm">Suporte WhatsApp</p>
              <p className="text-xs text-muted-foreground">Em todos os planos</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl">
            <Zap className="h-8 w-8 text-amber-500" />
            <div>
              <p className="font-medium text-sm">10 Melhorias Grátis</p>
              <p className="text-xs text-muted-foreground">Para testar a IA</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="p-6 border-b border-border bg-muted/50">
            <h2 className="font-serif text-xl font-bold">Perguntas Frequentes</h2>
            <p className="text-sm text-muted-foreground mt-1">Tire suas dúvidas sobre os planos</p>
          </div>

          <div className="divide-y divide-border">
            {faqs.map((faq, index) => (
              <div key={index} className="p-4">
                <button
                  className="flex items-center justify-between w-full text-left"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-primary/10 to-pink-500/10 border border-primary/20 rounded-xl p-8 text-center">
          <h2 className="font-serif text-2xl font-bold mb-2">Ainda tem dúvidas?</h2>
          <p className="text-muted-foreground mb-6">
            Fale com nossa equipe e descubra o melhor plano para o seu negócio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-primary hover:bg-primary/90">
              <MessageCircle className="h-4 w-4 mr-2" />
              Falar com Especialista
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Demonstração
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
