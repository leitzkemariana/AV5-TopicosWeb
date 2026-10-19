from config import *
from models.jogo import Jogo
import services.jogo as jogo_service


@app.route("/jogos", methods=["GET"])
def retornar_jogos():

    jogos = jogo_service.retornar_jogos()

    return jsonify({"resultado": "ok", "detalhes": [jogo.json() for jogo in jogos]})


@app.route("/jogos", methods=["POST"])
@jwt_required()
def criar_jogo():
    dados = request.json

    if (
        not dados
        or not dados.get("nome")
        or not dados.get("ano_lancamento")
        or not dados.get("genero")
        or dados.get("classificacao") is None
        or dados.get("classificacao") == ""
        or not dados.get("desenvolvedor")
    ):
        return (
            jsonify(
                {
                    "resultado": "erro",
                    "detalhes": "Nome, ano_lancamento, genero, classificacao e desenvolvedor são obrigatórios",
                }
            ),
            400,
        )

    jogo = jogo_service.criar_jogo(dados)

    return jsonify({"resultado": "ok", "detalhes": jogo.json()}), 201
