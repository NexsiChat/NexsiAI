"use client"

import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { TopHeader } from "@/components/top-header"
import { NexsiCopilot } from "@/components/nexsi-copilot"

interface PanelLayoutProps {
  children: React.ReactNode
}

export function PanelLayout({ children }: PanelLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <TopHeader />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
      <NexsiCopilot />
    </div>
  )
}
