export default function SettingsLoading() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-2">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-sm text-muted-foreground">Carregando configurações...</p>
      </div>
    </div>
  )
}
