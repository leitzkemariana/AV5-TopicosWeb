"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FormIncluirJogo() {
  const [nome, setNome] = useState<string>("");
  const [anoLancamento, setAnoLancamento] = useState<number>(0);
  const [genero, setGenero] = useState<string>("");
  const [classificacao, setClassificacao] = useState<number | "">("");
  const [desenvolvedor, setDesenvolvedor] = useState<string>("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  // obtém da variável de ambiente o endereço do backend (API)
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // tenta buscar a token
    const savedToken = localStorage.getItem("token");
    // se não houver token
    if (!savedToken) {
      // encaminha para o login
      router.replace("/form_login");
    }
    // persiste o token
    setToken(savedToken);
  }, [router]);

  useEffect(() => {
    // se não houver mensagem, encerra
    if (!message) return;

    // exibe a mensagem por 5 segundos
    const timer = setTimeout(() => {
      setMessage("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (!error) return;
    const timer = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const enviar = async (e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    setMessage("");
    setError("");

    setLoading(true);

    try {
      const resposta = await fetch(apiUrl + "/jogos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nome: nome,
          ano_lancamento: anoLancamento,
          genero: genero,
          classificacao: classificacao,
          desenvolvedor: desenvolvedor,
        }),
      });

      switch (resposta.status) {
        case 200:
        case 201:
          setMessage("Jogo cadastrado com sucesso!");
          // limpa os campos
          setNome("");
          setAnoLancamento(0);
          setGenero("");
          setClassificacao("");
          setDesenvolvedor("");
          break;
        case 400:
          const erroApi = await resposta.json();
          setError(erroApi.detalhes || "Invalid data.");
          break;
        case 401:
          setError("A sessão expirou. Por favor, faça login novamente!");
          // Optional:
          // localStorage.removeItem("token");
          // router.push("/login");
          break;
        case 403:
          setError("Você não tem permissão para realizar esta ação.");
          break;
        case 500:
          setError("Erro interno no servidor backend.");
          break;
        default:
          const resultado = await resposta.json();
          setError(resultado.message || "Um erro inesperado ocorreu.");
      }
    } catch (error) {
      console.log("error", error);
      setError("Não foi possível conectar-se ao backend");
    } finally {
      setLoading(false);
    }
  };

  // se não houver token, encerra a página
  if (!token) {
    return null;
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
          Cadastrar Jogo
        </h1>

        {message && <p className="text-green-600 font-medium">{message}</p>}

        {error && <p className="text-red-600 font-medium">{error}</p>}

        <form className="flex flex-col gap-4 w-full" onSubmit={enviar}>
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          <input
            type="number"
            name="ano_lancamento"
            placeholder="Ano de lançamento"
            value={anoLancamento || ""}
            onChange={e =>
              setAnoLancamento(
                e.target.value === "" ? 0 : Number(e.target.value),
              )
            }
            required
            className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="text"
            name="genero"
            placeholder="Gênero"
            value={genero}
            onChange={e => setGenero(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          <input
            type="number"
            name="classificacao"
            placeholder="Classificação"
            min="0"
            value={classificacao}
            onChange={e =>
              setClassificacao(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
            required
            className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <input
            type="text"
            name="desenvolvedor"
            placeholder="Desenvolvedor"
            value={desenvolvedor}
            onChange={e => setDesenvolvedor(e.target.value)}
            className="rounded-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </main>
    </div>
  );
}
