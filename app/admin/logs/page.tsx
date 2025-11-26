"use client"

import { AppLayout } from "@/components/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Download, Filter, AlertCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"
import { useState } from "react"

export default function SystemLogsPage() {
  const [selectedLog, setSelectedLog] = useState<any>(null)

  const logs = [
    {
      id: 1,
      timestamp: "2025-11-24 13:45:23",
      user: "Richard da Silva",
      action: "Enriquecimento de produto",
      level: "info",
      details: "Produto #1342 enriquecido com sucesso",
      ip: "192.168.1.100",
    },
    {
      id: 2,
      timestamp: "2025-11-24 13:42:10",
      user: "Sistema",
      action: "Importação Bling",
      level: "success",
      details: "Importação #47 finalizada - 150 produtos importados",
      ip: "Sistema",
    },
    {
      id: 3,
      timestamp: "2025-11-24 13:38:45",
      user: "Richard da Silva",
      action: "Login",
      level: "info",
      details: "Login realizado com sucesso",
      ip: "192.168.1.100",
    },
    {
      id: 4,
      timestamp: "2025-11-24 13:35:12",
      user: "Sistema",
      action: "Erro de API",
      level: "error",
      details: "Falha ao conectar com API do Bling - Timeout",
      ip: "Sistema",
    },
    {
      id: 5,
      timestamp: "2025-11-24 13:30:55",
      user: "Admin",
      action: "Criação de usuário",
      level: "warning",
      details: "Novo usuário criado sem grupo de permissão",
      ip: "192.168.1.105",
    },
    {
      id: 6,
      timestamp: "2025-11-24 13:25:33",
      user: "Sistema",
      action: "Backup automático",
      level: "success",
      details: "Backup diário realizado com sucesso",
      ip: "Sistema",
    },
    {
      id: 7,
      timestamp: "2025-11-24 13:20:18",
      user: "Richard da Silva",
      action: "Exclusão de produto",
      level: "warning",
      details: "Produto #1293 removido do catálogo",
      ip: "192.168.1.100",
    },
    {
      id: 8,
      timestamp: "2025-11-24 13:15:42",
      user: "Sistema",
      action: "Enriquecimento em lote",
      level: "info",
      details: "Iniciado enriquecimento de 25 produtos",
      ip: "Sistema",
    },
  ]

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Info className="h-4 w-4 text-blue-500" />
    }
  }

  const getLevelBadge = (level: string) => {
    const variants: Record<string, string> = {
      error: "bg-red-100 text-red-700 border-red-200",
      warning: "bg-amber-100 text-amber-700 border-amber-200",
      success: "bg-green-100 text-green-700 border-green-200",
      info: "bg-blue-100 text-blue-700 border-blue-200",
    }
    return (
      <Badge variant="outline" className={`${variants[level]} capitalize`}>
        {level}
      </Badge>
    )
  }

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">Logs do Sistema</h1>
            <p className="text-sm text-muted-foreground mt-1">Histórico completo de ações e eventos</p>
          </div>
          <Button className="bg-amber-500 hover:bg-amber-600 text-black">
            <Download className="h-4 w-4 mr-2" />
            Exportar Logs
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Logs</p>
                <p className="text-2xl font-bold text-foreground mt-1">1.247</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Erros (24h)</p>
                <p className="text-2xl font-bold text-red-600 mt-1">8</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avisos (24h)</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">15</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Sucesso (24h)</p>
                <p className="text-2xl font-bold text-green-600 mt-1">342</p>
              </div>
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar logs..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="bg-gray-50 border-gray-200">
                <SelectValue placeholder="Nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os níveis</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
                <SelectItem value="warning">Aviso</SelectItem>
                <SelectItem value="success">Sucesso</SelectItem>
                <SelectItem value="info">Informação</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="bg-gray-50 border-gray-200">
                <SelectValue placeholder="Usuário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os usuários</SelectItem>
                <SelectItem value="richard">Richard da Silva</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="system">Sistema</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="today">
              <SelectTrigger className="bg-gray-50 border-gray-200">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mês</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 border-gray-200">
                <TableHead className="text-muted-foreground font-medium">Nível</TableHead>
                <TableHead className="text-muted-foreground font-medium">Data/Hora</TableHead>
                <TableHead className="text-muted-foreground font-medium">Usuário</TableHead>
                <TableHead className="text-muted-foreground font-medium">Ação</TableHead>
                <TableHead className="text-muted-foreground font-medium">Detalhes</TableHead>
                <TableHead className="text-muted-foreground font-medium">IP</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow
                  key={log.id}
                  className="border-gray-200 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedLog(log)}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getLevelIcon(log.level)}
                      {getLevelBadge(log.level)}
                    </div>
                  </TableCell>
                  <TableCell className="text-foreground font-mono text-sm">{log.timestamp}</TableCell>
                  <TableCell className="text-foreground">{log.user}</TableCell>
                  <TableCell className="text-foreground">{log.action}</TableCell>
                  <TableCell className="text-muted-foreground max-w-md truncate">{log.details}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">{log.ip}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">Mostrando 8 de 1.247 logs</p>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-200 bg-transparent">
              Anterior
            </Button>
            <Button variant="outline" className="border-gray-200 bg-transparent">
              Próxima
            </Button>
          </div>
        </div>
      </div>

      {/* Log Details Dialog */}
      <Dialog open={!!selectedLog} onOpenChange={() => setSelectedLog(null)}>
        <DialogContent className="bg-white border-gray-200 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl">Detalhes do Log</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Informações completas sobre esta ação do sistema
            </DialogDescription>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Nível</label>
                  <div className="mt-1">{getLevelBadge(selectedLog.level)}</div>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Data/Hora</label>
                  <p className="text-foreground font-mono text-sm mt-1">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Usuário</label>
                  <p className="text-foreground mt-1">{selectedLog.user}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">IP</label>
                  <p className="text-foreground font-mono text-sm mt-1">{selectedLog.ip}</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Ação</label>
                <p className="text-foreground mt-1">{selectedLog.action}</p>
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Detalhes</label>
                <p className="text-foreground mt-1">{selectedLog.details}</p>
              </div>
              <div className="bg-gray-100 border border-gray-200 rounded-lg p-4">
                <label className="text-sm text-muted-foreground">Stack Trace (se aplicável)</label>
                <pre className="text-xs text-foreground mt-2 overflow-x-auto">
                  {selectedLog.level === "error"
                    ? "Error: Connection timeout\n  at BlingAPI.connect (bling-api.ts:45)\n  at importProducts (import.ts:120)"
                    : "Nenhum erro detectado"}
                </pre>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
