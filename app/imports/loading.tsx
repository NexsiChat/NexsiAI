export default function ImportsLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#E94F85] border-r-transparent"></div>
        <p className="mt-4 text-zinc-400">Carregando importações...</p>
      </div>
    </div>
  )
}
