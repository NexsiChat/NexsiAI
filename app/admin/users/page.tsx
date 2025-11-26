"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, Search, MoreVertical, Edit, Trash2, Shield, Mail, Info } from "lucide-react"
import { AppLayout } from "@/components/app-layout"

type User = {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  roleId: string
  status: "active" | "inactive"
  lastAccess: string
}

const permissionGroups = [
  { id: "base", name: "Grupo Base", isDefault: true },
  { id: "comercial", name: "Grupo Comercial", isDefault: false },
  { id: "admin", name: "Administrador", isDefault: false },
  { id: "operacional", name: "Grupo Operacional", isDefault: false },
]

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const [editName, setEditName] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [editRole, setEditRole] = useState("")
  const [editStatus, setEditStatus] = useState<"active" | "inactive">("active")

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Richard da Silva",
      email: "contato@nexsi.com.br",
      avatar: "R",
      role: "Grupo Comercial",
      roleId: "comercial",
      status: "active",
      lastAccess: "Há 2 horas",
    },
    {
      id: "2",
      name: "Ana Paula Costa",
      email: "ana.costa@nexsi.com.br",
      avatar: "A",
      role: "Administrador",
      roleId: "admin",
      status: "active",
      lastAccess: "Há 1 dia",
    },
    {
      id: "3",
      name: "Carlos Mendes",
      email: "carlos.mendes@nexsi.com.br",
      avatar: "C",
      role: "Grupo Base",
      roleId: "base",
      status: "inactive",
      lastAccess: "Há 3 dias",
    },
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditUser = (user: User) => {
    setSelectedUser(user)
    setEditName(user.name)
    setEditEmail(user.email)
    setEditRole(user.roleId)
    setEditStatus(user.status)
    setIsEditUserOpen(true)
  }

  const handleSaveEdit = () => {
    if (selectedUser) {
      const group = permissionGroups.find((g) => g.id === editRole)
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id
            ? {
                ...u,
                name: editName,
                email: editEmail,
                roleId: editRole,
                role: group?.name || "Grupo Base",
                status: editStatus,
              }
            : u,
        ),
      )
    }
    setIsEditUserOpen(false)
  }

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-amber-500" />
            <h1 className="font-serif text-3xl font-bold text-foreground">Administração de Usuários</h1>
          </div>
          <p className="text-muted-foreground">Gerencie os usuários da loja Imports bazar</p>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Usuários da Loja</h2>
              <p className="text-sm text-muted-foreground">Lista de todos os usuários associados à Imports bazar</p>
            </div>
            <Button onClick={() => setIsAddUserOpen(true)} className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
              <Plus className="h-4 w-4" />
              Associar Usuário
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground">{users.length}</div>
              <div className="text-sm text-muted-foreground">Total de Usuários</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-500">
                {users.filter((u) => u.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Usuários Ativos</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-amber-500">
                {users.filter((u) => u.status === "inactive").length}
              </div>
              <div className="text-sm text-muted-foreground">Usuários Inativos</div>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Usuário</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Email</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Grupo de Permissão</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Último Acesso</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-semibold">
                          {user.avatar}
                        </div>
                        <span className="font-medium text-foreground">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className="gap-1">
                        <Shield className="h-3 w-3" />
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      {user.status === "active" ? (
                        <Badge variant="default" className="bg-green-500/10 text-green-500 hover:bg-green-500/20">
                          Ativo
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-amber-500/10 text-amber-500">
                          Inativo
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground text-sm">{user.lastAccess}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2" onClick={() => handleEditUser(user)}>
                              <Edit className="h-4 w-4" />
                              Editar Usuário
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 text-red-500"
                              onClick={() => {
                                setSelectedUser(user)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              Remover Usuário
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Associar Novo Usuário</DialogTitle>
            <DialogDescription>Adicione um novo usuário ao sistema</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="Digite o nome do usuário" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="usuario@exemplo.com" />
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <Info className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800">Grupo de Permissão Padrão</p>
                <p className="text-amber-700">
                  O usuário será associado automaticamente ao <strong>Grupo Base</strong>. Você pode alterar o grupo de
                  permissão após o cadastro, editando o usuário.
                </p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsAddUserOpen(false)} className="bg-amber-500 hover:bg-amber-600">
              Adicionar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>Altere as informações e permissões do usuário</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome Completo</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Digite o nome do usuário"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="usuario@exemplo.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Grupo de Permissão</Label>
              <Select value={editRole} onValueChange={setEditRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um grupo" />
                </SelectTrigger>
                <SelectContent>
                  {permissionGroups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      <div className="flex items-center gap-2">
                        {group.name}
                        {group.isDefault && (
                          <Badge variant="outline" className="text-xs">
                            Padrão
                          </Badge>
                        )}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={editStatus} onValueChange={(v) => setEditStatus(v as "active" | "inactive")}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit} className="bg-amber-500 hover:bg-amber-600">
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remover Usuário</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja remover {selectedUser?.name}? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
