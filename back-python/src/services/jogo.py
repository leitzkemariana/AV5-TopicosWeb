from config import *
from models.jogo import Jogo


def criar_jogo(data):
    jogo = Jogo(
        nome=data["nome"],
        ano_lancamento=data["ano_lancamento"],
        genero=data["genero"],
        classificao=data["classificao"],
        desenvolvedor=data.get("desenvolvedor"),
    )

    db.session.add(jogo)
    db.session.commit()

    return jogo


def retornar_jogo():
    jogos = Jogo.query.all()

    return jogos
