"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { NexsiCopilot } from "@/components/nexsi-copilot"
import { OnboardingAssistant } from "@/components/onboarding-assistant"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
      <NexsiCopilot />
      <OnboardingAssistant />
    </div>
  )
}
