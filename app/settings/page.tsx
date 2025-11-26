"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Save,
  Store,
  MapPin,
  Trash2,
  Phone,
  Mail,
  Building2,
  User,
  Bell,
  Sparkles,
  Shield,
  Key,
  Globe,
  FileText,
  Clock,
  Upload,
  Camera,
} from "lucide-react"
import { AppLayout } from "@/components/app-layout"
import Image from "next/image"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("loja")

  const [storeData, setStoreData] = useState({
    nomeComercial: "Imports bazar",
    telefone: "51985617110",
    email: "richard2bb@hotmail.com",
    cnpj: "13.976.770/0001-16",
    logo: "",
    pais: "Brasil",
    cep: "95560000",
    estado: "RS",
    cidade: "Torres",
    bairro: "igra",
    rua: "alexandre macedo couto",
    numero: "34",
    complemento: "Casa",
  })

  const [userData, setUserData] = useState({
    nome: "Richard da Silva",
    email: "richard2bb@hotmail.com",
    telefone: "51985617110",
    cargo: "Administrador",
    foto: "",
  })

  const [notifications, setNotifications] = useState({
    emailEnriquecimento: true,
    emailAprovacao: true,
    emailErros: true,
    pushEnriquecimento: false,
    pushAprovacao: true,
    pushErros: true,
    resumoDiario: true,
    resumoSemanal: false,
  })

  const [enrichmentSettings, setEnrichmentSettings] = useState({
    modeloPadrao: "padrao-nexsi",
    tomVoz: "profissional",
    tamanhoDescricao: "media",
    gerarMetaTags: true,
    gerarMetaTitle: true,
    gerarMetaDescription: true,
    palavrasNegativas: "barato, promoção, desconto",
    instrucaoExtra: "",
    aprovacaoAutomatica: false,
    limiteEnriquecimentoDia: "100",
  })

  const [securitySettings, setSecuritySettings] = useState({
    autenticacaoDoisFatores: false,
    sessaoAtiva: "30",
    notificarNovoLogin: true,
  })

  const handleStoreChange = (field: string, value: string) => {
    setStoreData((prev) => ({ ...prev, [field]: value }))
  }

  const handleUserChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [field]: value }))
  }

  const handleEnrichmentChange = (field: string, value: string | boolean) => {
    setEnrichmentSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Saving settings...")
  }

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Page Title */}
        <div className="space-y-1">
          <h1 className="text-2xl font-serif font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">Gerencie as configurações da sua conta e loja</p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="loja" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Store className="h-4 w-4" />
              Loja
            </TabsTrigger>
            <TabsTrigger value="conta" className="flex items-center gap-2 data-[state=active]:bg-white">
              <User className="h-4 w-4" />
              Minha Conta
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Bell className="h-4 w-4" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="enriquecimento" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Sparkles className="h-4 w-4" />
              Enriquecimento
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="flex items-center gap-2 data-[state=active]:bg-white">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
          </TabsList>

          {/* Tab: Loja */}
          <TabsContent value="loja" className="space-y-6">
            {/* Informações da Loja */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <Building2 className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Informações da Loja</h2>
                  <p className="text-sm text-muted-foreground">Dados principais do seu negócio</p>
                </div>
              </div>

              <div className="flex gap-6">
                {/* Logo Upload */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                    {storeData.logo ? (
                      <Image
                        src={storeData.logo || "/placeholder.svg"}
                        alt="Logo"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    ) : (
                      <Camera className="h-8 w-8 text-gray-400" />
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <Upload className="h-3 w-3 mr-1" />
                    Upload Logo
                  </Button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nomeComercial">Nome Comercial</Label>
                      <Input
                        id="nomeComercial"
                        value={storeData.nomeComercial}
                        onChange={(e) => handleStoreChange("nomeComercial", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input
                        id="cnpj"
                        value={storeData.cnpj}
                        onChange={(e) => handleStoreChange("cnpj", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telefone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Telefone
                      </Label>
                      <Input
                        id="telefone"
                        value={storeData.telefone}
                        onChange={(e) => handleStoreChange("telefone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={storeData.email}
                        onChange={(e) => handleStoreChange("email", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Endereço</h2>
                  <p className="text-sm text-muted-foreground">Localização da sua loja</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP</Label>
                    <Input id="cep" value={storeData.cep} onChange={(e) => handleStoreChange("cep", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado</Label>
                    <Select value={storeData.estado} onValueChange={(value) => handleStoreChange("estado", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RS">RS</SelectItem>
                        <SelectItem value="SC">SC</SelectItem>
                        <SelectItem value="PR">PR</SelectItem>
                        <SelectItem value="SP">SP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                      id="cidade"
                      value={storeData.cidade}
                      onChange={(e) => handleStoreChange("cidade", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="rua">Rua</Label>
                    <Input id="rua" value={storeData.rua} onChange={(e) => handleStoreChange("rua", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero">Número</Label>
                    <Input
                      id="numero"
                      value={storeData.numero}
                      onChange={(e) => handleStoreChange("numero", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro</Label>
                    <Input
                      id="bairro"
                      value={storeData.bairro}
                      onChange={(e) => handleStoreChange("bairro", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento (Opcional)</Label>
                  <Input
                    id="complemento"
                    value={storeData.complemento}
                    onChange={(e) => handleStoreChange("complemento", e.target.value)}
                    placeholder="Apartamento, sala, etc."
                  />
                </div>
              </div>
            </div>

            {/* Zona de Perigo */}
            <div className="bg-white border border-red-200 rounded-xl p-6 space-y-4 shadow-sm">
              <div className="flex items-center gap-3 border-b border-red-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <Trash2 className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-red-600">Zona de Perigo</h2>
                  <p className="text-sm text-muted-foreground">Ações irreversíveis</p>
                </div>
              </div>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remover Loja
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso irá permanentemente deletar sua loja e remover todos os
                      dados.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-600 hover:bg-red-700">Remover</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </TabsContent>

          {/* Tab: Minha Conta */}
          <TabsContent value="conta" className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                  <User className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Dados Pessoais</h2>
                  <p className="text-sm text-muted-foreground">Informações da sua conta</p>
                </div>
              </div>

              <div className="flex gap-6">
                {/* Foto */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 overflow-hidden">
                    {userData.foto ? (
                      <Image
                        src={userData.foto || "/placeholder.svg"}
                        alt="Foto"
                        width={128}
                        height={128}
                        className="object-cover"
                      />
                    ) : (
                      <User className="h-12 w-12 text-gray-400" />
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    <Upload className="h-3 w-3 mr-1" />
                    Alterar Foto
                  </Button>
                </div>

                {/* Form Fields */}
                <div className="flex-1 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome Completo</Label>
                      <Input
                        id="nome"
                        value={userData.nome}
                        onChange={(e) => handleUserChange("nome", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cargo">Cargo</Label>
                      <Input
                        id="cargo"
                        value={userData.cargo}
                        onChange={(e) => handleUserChange("cargo", e.target.value)}
                        disabled
                        className="bg-gray-50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="userEmail">Email</Label>
                      <Input
                        id="userEmail"
                        type="email"
                        value={userData.email}
                        onChange={(e) => handleUserChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="userTelefone">Telefone</Label>
                      <Input
                        id="userTelefone"
                        value={userData.telefone}
                        onChange={(e) => handleUserChange("telefone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Alterar Senha */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                  <Key className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Alterar Senha</h2>
                  <p className="text-sm text-muted-foreground">Mantenha sua conta segura</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senhaAtual">Senha Atual</Label>
                  <Input id="senhaAtual" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="novaSenha">Nova Senha</Label>
                  <Input id="novaSenha" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
                  <Input id="confirmarSenha" type="password" placeholder="••••••••" />
                </div>
              </div>

              <Button className="bg-amber-500 hover:bg-amber-600 text-white">Alterar Senha</Button>
            </div>
          </TabsContent>

          {/* Tab: Notificações */}
          <TabsContent value="notificacoes" className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Notificações por Email</h2>
                  <p className="text-sm text-muted-foreground">Escolha quais emails deseja receber</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Enriquecimento concluído</p>
                    <p className="text-sm text-muted-foreground">Receba um email quando o enriquecimento terminar</p>
                  </div>
                  <Switch
                    checked={notifications.emailEnriquecimento}
                    onCheckedChange={(value) => handleNotificationChange("emailEnriquecimento", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Itens aguardando aprovação</p>
                    <p className="text-sm text-muted-foreground">Notificação quando há novos itens para aprovar</p>
                  </div>
                  <Switch
                    checked={notifications.emailAprovacao}
                    onCheckedChange={(value) => handleNotificationChange("emailAprovacao", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Erros de processamento</p>
                    <p className="text-sm text-muted-foreground">Seja notificado sobre erros no sistema</p>
                  </div>
                  <Switch
                    checked={notifications.emailErros}
                    onCheckedChange={(value) => handleNotificationChange("emailErros", value)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Notificações Push</h2>
                  <p className="text-sm text-muted-foreground">Notificações no navegador</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Enriquecimento concluído</p>
                    <p className="text-sm text-muted-foreground">Push quando o enriquecimento terminar</p>
                  </div>
                  <Switch
                    checked={notifications.pushEnriquecimento}
                    onCheckedChange={(value) => handleNotificationChange("pushEnriquecimento", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Itens aguardando aprovação</p>
                    <p className="text-sm text-muted-foreground">Push quando há novos itens para aprovar</p>
                  </div>
                  <Switch
                    checked={notifications.pushAprovacao}
                    onCheckedChange={(value) => handleNotificationChange("pushAprovacao", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Erros de processamento</p>
                    <p className="text-sm text-muted-foreground">Push sobre erros no sistema</p>
                  </div>
                  <Switch
                    checked={notifications.pushErros}
                    onCheckedChange={(value) => handleNotificationChange("pushErros", value)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <FileText className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Resumos</h2>
                  <p className="text-sm text-muted-foreground">Relatórios periódicos</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Resumo diário</p>
                    <p className="text-sm text-muted-foreground">Receba um resumo das atividades do dia</p>
                  </div>
                  <Switch
                    checked={notifications.resumoDiario}
                    onCheckedChange={(value) => handleNotificationChange("resumoDiario", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Resumo semanal</p>
                    <p className="text-sm text-muted-foreground">Receba um resumo semanal com métricas</p>
                  </div>
                  <Switch
                    checked={notifications.resumoSemanal}
                    onCheckedChange={(value) => handleNotificationChange("resumoSemanal", value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Enriquecimento */}
          <TabsContent value="enriquecimento" className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                  <Sparkles className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Configurações de Enriquecimento</h2>
                  <p className="text-sm text-muted-foreground">Defina o comportamento padrão da IA</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Modelo de Template Padrão</Label>
                    <Select
                      value={enrichmentSettings.modeloPadrao}
                      onValueChange={(value) => handleEnrichmentChange("modeloPadrao", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="padrao-nexsi">Padrão NexsiAI</SelectItem>
                        <SelectItem value="e-commerce">E-commerce</SelectItem>
                        <SelectItem value="marketplace">Marketplace</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tom de Voz</Label>
                    <Select
                      value={enrichmentSettings.tomVoz}
                      onValueChange={(value) => handleEnrichmentChange("tomVoz", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profissional">Profissional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="tecnico">Técnico</SelectItem>
                        <SelectItem value="persuasivo">Persuasivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tamanho da Descrição</Label>
                    <Select
                      value={enrichmentSettings.tamanhoDescricao}
                      onValueChange={(value) => handleEnrichmentChange("tamanhoDescricao", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="curta">Curta (50-100 palavras)</SelectItem>
                        <SelectItem value="media">Média (100-200 palavras)</SelectItem>
                        <SelectItem value="longa">Longa (200-400 palavras)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Limite de Enriquecimentos por Dia</Label>
                    <Select
                      value={enrichmentSettings.limiteEnriquecimentoDia}
                      onValueChange={(value) => handleEnrichmentChange("limiteEnriquecimentoDia", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50 produtos</SelectItem>
                        <SelectItem value="100">100 produtos</SelectItem>
                        <SelectItem value="250">250 produtos</SelectItem>
                        <SelectItem value="500">500 produtos</SelectItem>
                        <SelectItem value="ilimitado">Ilimitado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Palavras Negativas</Label>
                  <Textarea
                    value={enrichmentSettings.palavrasNegativas}
                    onChange={(e) => handleEnrichmentChange("palavrasNegativas", e.target.value)}
                    placeholder="Separe por vírgula: barato, promoção, desconto..."
                    className="min-h-[80px]"
                  />
                  <p className="text-xs text-muted-foreground">Palavras que a IA deve evitar usar nas descrições</p>
                </div>

                <div className="space-y-2">
                  <Label>Instrução Extra para IA</Label>
                  <Textarea
                    value={enrichmentSettings.instrucaoExtra}
                    onChange={(e) => handleEnrichmentChange("instrucaoExtra", e.target.value)}
                    placeholder="Ex: Sempre mencionar garantia de 1 ano, destacar frete grátis..."
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Campos a Gerar</h2>
                  <p className="text-sm text-muted-foreground">
                    Selecione quais campos devem ser gerados automaticamente
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Meta Title</p>
                    <p className="text-sm text-muted-foreground">Título otimizado para SEO</p>
                  </div>
                  <Switch
                    checked={enrichmentSettings.gerarMetaTitle}
                    onCheckedChange={(value) => handleEnrichmentChange("gerarMetaTitle", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Meta Description</p>
                    <p className="text-sm text-muted-foreground">Descrição para mecanismos de busca</p>
                  </div>
                  <Switch
                    checked={enrichmentSettings.gerarMetaDescription}
                    onCheckedChange={(value) => handleEnrichmentChange("gerarMetaDescription", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Meta Tags</p>
                    <p className="text-sm text-muted-foreground">Tags e palavras-chave</p>
                  </div>
                  <Switch
                    checked={enrichmentSettings.gerarMetaTags}
                    onCheckedChange={(value) => handleEnrichmentChange("gerarMetaTags", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Aprovação Automática</p>
                    <p className="text-sm text-muted-foreground">Aprovar automaticamente enriquecimentos sem revisão</p>
                  </div>
                  <Switch
                    checked={enrichmentSettings.aprovacaoAutomatica}
                    onCheckedChange={(value) => handleEnrichmentChange("aprovacaoAutomatica", value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Tab: Segurança */}
          <TabsContent value="seguranca" className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Segurança da Conta</h2>
                  <p className="text-sm text-muted-foreground">Proteja sua conta com recursos adicionais</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Autenticação de Dois Fatores (2FA)</p>
                    <p className="text-sm text-muted-foreground">Adicione uma camada extra de segurança</p>
                  </div>
                  <Switch
                    checked={securitySettings.autenticacaoDoisFatores}
                    onCheckedChange={(value) => handleSecurityChange("autenticacaoDoisFatores", value)}
                  />
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium">Notificar Novo Login</p>
                    <p className="text-sm text-muted-foreground">
                      Receba um email quando houver login de novo dispositivo
                    </p>
                  </div>
                  <Switch
                    checked={securitySettings.notificarNovoLogin}
                    onCheckedChange={(value) => handleSecurityChange("notificarNovoLogin", value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tempo de Sessão Ativa</Label>
                  <Select
                    value={securitySettings.sessaoAtiva}
                    onValueChange={(value) => handleSecurityChange("sessaoAtiva", value)}
                  >
                    <SelectTrigger className="w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutos</SelectItem>
                      <SelectItem value="30">30 minutos</SelectItem>
                      <SelectItem value="60">1 hora</SelectItem>
                      <SelectItem value="480">8 horas</SelectItem>
                      <SelectItem value="1440">24 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6 shadow-sm">
              <div className="flex items-center gap-3 border-b border-gray-200 pb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Sessões Ativas</h2>
                  <p className="text-sm text-muted-foreground">Dispositivos conectados à sua conta</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Chrome - Windows</p>
                      <p className="text-sm text-muted-foreground">Torres, RS • Sessão atual</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Ativo agora</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium">Safari - iPhone</p>
                      <p className="text-sm text-muted-foreground">Torres, RS • Último acesso: 2h atrás</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    Encerrar
                  </Button>
                </div>
              </div>

              <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 bg-transparent">
                Encerrar todas as outras sessões
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-2 border-t border-gray-200 pt-6">
          <Button variant="outline" size="lg">
            Cancelar
          </Button>
          <Button onClick={handleSave} size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}
