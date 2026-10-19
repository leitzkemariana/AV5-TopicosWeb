// trazendo o componente que tabela de pessoas
import TabelaDeJogos from "../components/TabelaDeJogos";

export default function Listar_Jogos() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Jogos
        </h1>

        <TabelaDeJogos />
      </main>
    </div>
  );
}
