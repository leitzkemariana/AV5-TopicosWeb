import Link from "next/link";

export default function Menu() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <ul className="flex gap-6">
        {/* links para as páginas do sistema: menu de opções */}
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/form_login">Login</Link>
        </li>
        <li>
          <Link href="/listar_pessoas">Listar Pessoas</Link>
        </li>
        <li>
          <Link href="/form_incluir_pessoa">Nova Pessoa</Link>
        </li>
        <li>
          <Link href="/form_incluir_jogo">Incluir Jogo</Link>
        </li>
        <li>
          <Link href="/listar_jogos">Listar Jogos</Link>
        </li>
      </ul>
    </nav>
  );
}
