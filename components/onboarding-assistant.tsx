"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  ChevronRight,
  ChevronLeft,
  Store,
  Package,
  Plug,
  Wand2,
  CheckCircle2,
  SkipForward,
  ArrowRight,
  Rocket,
  Target,
  Zap,
  Trophy,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface OnboardingStep {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  image?: string
  tips: string[]
  action?: {
    label: string
    href: string
  }
}

const onboardingSteps: OnboardingStep[] = [
  {
    id: "welcome",
    title: "Bem-vindo à Nexsi!",
    description:
      "Sua jornada para catálogos perfeitos começa agora. Vamos configurar tudo em poucos minutos para você aproveitar o poder da IA.",
    icon: <Rocket className="h-8 w-8" />,
    tips: [
      "A Nexsi usa IA avançada para melhorar seus produtos",
      "Você tem 10 créditos grátis para testar",
      "Cada SKU melhorado consome apenas 1 crédito",
    ],
  },
  {
    id: "store",
    title: "Configure sua Loja",
    description:
      "Primeiro, vamos configurar as informações básicas da sua loja. Isso nos ajuda a personalizar as melhorias para seu nicho.",
    icon: <Store className="h-8 w-8" />,
    tips: [
      "Adicione o nome e logo da sua loja",
      "Informe seu segmento de atuação",
      "Configure suas preferências de idioma",
    ],
    action: {
      label: "Configurar Loja",
      href: "/settings",
    },
  },
  {
    id: "integration",
    title: "Conecte seus Canais",
    description:
      "Integre sua plataforma de e-commerce para importar produtos automaticamente. Suportamos os principais marketplaces do Brasil.",
    icon: <Plug className="h-8 w-8" />,
    tips: ["Nuvemshop, Bling, Tray, Tiny e mais", "Importação automática de catálogo", "Sincronização em tempo real"],
    action: {
      label: "Adicionar Integração",
      href: "/integracoes",
    },
  },
  {
    id: "import",
    title: "Importe seus Produtos",
    description:
      "Com a integração ativa, importe seu catálogo completo ou selecione produtos específicos para começar.",
    icon: <Package className="h-8 w-8" />,
    tips: [
      "Importe todo o catálogo de uma vez",
      "Ou selecione produtos específicos",
      "A IA analisa automaticamente a qualidade",
    ],
    action: {
      label: "Ver Produtos",
      href: "/",
    },
  },
  {
    id: "enrich",
    title: "Enriqueça com IA",
    description:
      "Agora é a hora mágica! Use a IA da Nexsi para melhorar títulos, descrições, SEO e muito mais com um clique.",
    icon: <Wand2 className="h-8 w-8" />,
    tips: [
      "Selecione produtos e clique em 'Enriquecer'",
      "A IA melhora título, descrição e SEO",
      "Revise e aprove as sugestões",
    ],
    action: {
      label: "Enriquecer Produtos",
      href: "/",
    },
  },
  {
    id: "done",
    title: "Tudo Pronto!",
    description:
      "Parabéns! Você está pronto para transformar seu catálogo. Lembre-se: quanto melhor o catálogo, maiores as vendas!",
    icon: <Trophy className="h-8 w-8" />,
    tips: [
      "Explore o Dashboard para ver métricas",
      "Use o Nexsi Copilot para dúvidas rápidas",
      "Acompanhe a qualidade dos seus produtos",
    ],
    action: {
      label: "Ir para Dashboard",
      href: "/dashboard",
    },
  },
]

export function OnboardingAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false)

  useEffect(() => {
    // Check if user has seen onboarding
    const seen = localStorage.getItem("nexsi-onboarding-seen")
    const completed = localStorage.getItem("nexsi-onboarding-completed")

    if (completed) {
      setCompletedSteps(JSON.parse(completed))
    }

    if (!seen) {
      // Show onboarding after a short delay for new users
      const timer = setTimeout(() => {
        setIsOpen(true)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      setHasSeenOnboarding(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      const stepId = onboardingSteps[currentStep].id
      if (!completedSteps.includes(stepId)) {
        const newCompleted = [...completedSteps, stepId]
        setCompletedSteps(newCompleted)
        localStorage.setItem("nexsi-onboarding-completed", JSON.stringify(newCompleted))
      }
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem("nexsi-onboarding-seen", "true")
    setHasSeenOnboarding(true)
    setIsOpen(false)
  }

  const handleComplete = () => {
    const allSteps = onboardingSteps.map((s) => s.id)
    setCompletedSteps(allSteps)
    localStorage.setItem("nexsi-onboarding-completed", JSON.stringify(allSteps))
    localStorage.setItem("nexsi-onboarding-seen", "true")
    setHasSeenOnboarding(true)
    setIsOpen(false)
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setCompletedSteps([])
    localStorage.removeItem("nexsi-onboarding-completed")
    setIsOpen(true)
  }

  const progress = ((currentStep + 1) / onboardingSteps.length) * 100
  const step = onboardingSteps[currentStep]

  return (
    <>
      {/* Floating button to reopen onboarding */}
      {hasSeenOnboarding && !isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:shadow-xl transition-shadow"
          title="Assistente de Onboarding"
        >
          <Target className="h-5 w-5" />
        </motion.button>
      )}

      {/* Onboarding Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleSkip}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Header with gradient */}
                <div className="relative bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 px-6 py-8 text-white">
                  {/* Close button */}
                  <button
                    onClick={handleSkip}
                    className="absolute right-4 top-4 rounded-full p-1 hover:bg-white/20 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>

                  {/* Step indicator */}
                  <div className="mb-4 flex items-center gap-2">
                    {onboardingSteps.map((s, index) => (
                      <div
                        key={s.id}
                        className={cn(
                          "h-2 flex-1 rounded-full transition-colors",
                          index <= currentStep ? "bg-white" : "bg-white/30",
                        )}
                      />
                    ))}
                  </div>

                  {/* Step info */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
                      {step.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white/80">
                        Passo {currentStep + 1} de {onboardingSteps.length}
                      </p>
                      <h2 className="text-2xl font-bold">{step.title}</h2>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="mb-6 text-gray-600 leading-relaxed">{step.description}</p>

                  {/* Tips */}
                  <div className="mb-6 space-y-3">
                    {step.tips.map((tip, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-100">
                          <Zap className="h-3 w-3 text-pink-600" />
                        </div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action button */}
                  {step.action && (
                    <a
                      href={step.action.href}
                      onClick={handleSkip}
                      className="mb-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 px-6 py-3 text-white font-medium hover:from-pink-600 hover:to-pink-700 transition-all"
                    >
                      {step.action.label}
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  )}

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>Progresso do Onboarding</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t bg-gray-50 px-6 py-4">
                  <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
                    <SkipForward className="mr-2 h-4 w-4" />
                    Pular Tutorial
                  </Button>

                  <div className="flex gap-2">
                    {currentStep > 0 && (
                      <Button variant="outline" onClick={handlePrev}>
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Voltar
                      </Button>
                    )}

                    {currentStep < onboardingSteps.length - 1 ? (
                      <Button onClick={handleNext} className="bg-pink-600 hover:bg-pink-700">
                        Próximo
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={handleComplete} className="bg-green-600 hover:bg-green-700">
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Concluir
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Restart button when viewing again */}
              {hasSeenOnboarding && (
                <div className="mt-4 text-center">
                  <button onClick={handleRestart} className="text-sm text-white/80 hover:text-white underline">
                    Reiniciar tutorial do início
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
