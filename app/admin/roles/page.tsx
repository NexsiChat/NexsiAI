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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Shield,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Users,
  Settings,
  Package,
  BarChart,
  Lock,
  Info,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"

type Role = {
  id: string
  name: string
  description: string
  usersCount: number
  permissions: string[]
  isDefault?: boolean // Flag para grupo base
}

const availablePermissions = [
  { id: "view_products", label: "Visualizar Produtos", icon: Package },
  { id: "edit_products", label: "Editar Produtos", icon: Package },
  { id: "enrich_products", label: "Enriquecer Produtos com IA", icon: Package },
  { id: "view_dashboard", label: "Visualizar Dashboard", icon: BarChart },
  { id: "manage_users", label: "Gerenciar Usuários", icon: Users },
  { id: "manage_roles", label: "Gerenciar Permissões", icon: Shield },
  { id: "view_integrations", label: "Visualizar Integrações", icon: Settings },
  { id: "manage_integrations", label: "Gerenciar Integrações", icon: Settings },
]

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const roles: Role[] = [
    {
      id: "base",
      name: "Grupo Base",
      description: "Grupo padrão para novos usuários. Não pode ser excluído.",
      usersCount: 3,
      permissions: ["view_products", "view_dashboard"],
      isDefault: true,
    },
    {
      id: "579147dc-3413-4302-80f3-ec2516450f9b",
      name: "Grupo Comercial",
      description: "Grupo teste",
      usersCount: 2,
      permissions: ["view_products", "edit_products", "enrich_products", "view_dashboard"],
      isDefault: false,
    },
    {
      id: "2",
      name: "Administrador",
      description: "Acesso total ao sistema",
      usersCount: 1,
      permissions: availablePermissions.map((p) => p.id),
      isDefault: false,
    },
    {
      id: "3",
      name: "Operacional",
      description: "Operações básicas do dia a dia",
      usersCount: 5,
      permissions: ["view_products", "enrich_products", "view_dashboard"],
      isDefault: false,
    },
  ]

  const filteredRoles = roles.filter(
    (role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteClick = (role: Role) => {
    if (role.isDefault) {
      return // Não permite excluir grupo base
    }
    setSelectedRole(role)
    setIsDeleteDialogOpen(true)
  }

  return (
    <AppLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-amber-500" />
            <h1 className="font-serif text-3xl font-bold text-foreground">Grupos de Permissão</h1>
          </div>
          <p className="text-muted-foreground">Gerencie os grupos de permissão da loja Imports bazar</p>
        </div>

        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
          <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-800">Sobre o Grupo Base</p>
            <p className="text-blue-700">
              O <strong>Grupo Base</strong> é o grupo padrão atribuído automaticamente a novos usuários. Este grupo não
              pode ser excluído para garantir que todos os usuários sempre tenham um grupo de permissão válido. Você
              pode alterar o grupo de um usuário a qualquer momento na tela de edição do usuário.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-1">Grupos de Permissão</h2>
              <p className="text-sm text-muted-foreground">
                Lista de todos os Grupos de permissão da loja Imports bazar
              </p>
            </div>
            <Button onClick={() => setIsAddRoleOpen(true)} className="gap-2 bg-amber-500 hover:bg-amber-600 text-white">
              <Plus className="h-4 w-4" />
              Criar Grupo de Permissão
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar grupos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-foreground">{roles.length}</div>
              <div className="text-sm text-muted-foreground">Total de Grupos</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-500">
                {roles.reduce((acc, role) => acc + role.usersCount, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Usuários Associados</div>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="text-2xl font-bold text-amber-500">{availablePermissions.length}</div>
              <div className="text-sm text-muted-foreground">Permissões Disponíveis</div>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Descrição</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Usuários</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Permissões</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredRoles.map((role) => (
                  <tr key={role.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">{role.name}</span>
                        {role.isDefault && (
                          <Badge variant="outline" className="gap-1 text-blue-600 border-blue-300 bg-blue-50">
                            <Lock className="h-3 w-3" />
                            Padrão
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-muted-foreground text-sm">{role.description}</span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="secondary" className="gap-1">
                        <Users className="h-3 w-3" />
                        {role.usersCount} usuário{role.usersCount !== 1 ? "s" : ""}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline">
                        {role.permissions.length} permiss{role.permissions.length !== 1 ? "ões" : "ão"}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Editar Grupo
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Shield className="h-4 w-4" />
                              Gerenciar Permissões
                            </DropdownMenuItem>
                            {role.isDefault ? (
                              <DropdownMenuItem className="gap-2 text-gray-400 cursor-not-allowed" disabled>
                                <Lock className="h-4 w-4" />
                                Não pode ser excluído
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="gap-2 text-red-500" onClick={() => handleDeleteClick(role)}>
                                <Trash2 className="h-4 w-4" />
                                Excluir Grupo
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Mostrando {filteredRoles.length} de {roles.length} grupos
          </div>
        </div>
      </div>

      {/* Add Role Dialog */}
      <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Grupo de Permissão</DialogTitle>
            <DialogDescription>Defina o nome, descrição e permissões para o novo grupo</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="role-name">Nome do Grupo</Label>
              <Input id="role-name" placeholder="Ex: Grupo Comercial" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role-description">Descrição</Label>
              <Textarea id="role-description" placeholder="Descreva as responsabilidades deste grupo..." rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Permissões</Label>
              <div className="border border-gray-200 rounded-lg p-4 space-y-3 max-h-64 overflow-y-auto">
                {availablePermissions.map((permission) => {
                  const Icon = permission.icon
                  return (
                    <div key={permission.id} className="flex items-center space-x-3">
                      <Checkbox
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPermissions([...selectedPermissions, permission.id])
                          } else {
                            setSelectedPermissions(selectedPermissions.filter((p) => p !== permission.id))
                          }
                        }}
                      />
                      <label
                        htmlFor={permission.id}
                        className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        <Icon className="h-4 w-4 text-muted-foreground" />
                        {permission.label}
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRoleOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsAddRoleOpen(false)} className="bg-amber-500 hover:bg-amber-600">
              Criar Grupo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Grupo de Permissão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o grupo "{selectedRole?.name}"?
              {selectedRole && selectedRole.usersCount > 0 && (
                <span className="block mt-2 text-amber-600">
                  Atenção: {selectedRole.usersCount} usuário(s) serão movidos automaticamente para o{" "}
                  <strong>Grupo Base</strong>.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Excluir Grupo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
