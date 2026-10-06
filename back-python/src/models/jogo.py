from config import *
class Jogo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(200), nullable=False)
    ano_lancamento = db.Column(db.Integer, nullable=False)
    genero = db.Column(db.String(200), nullable=False)
    classificao = db.Column(db.Integer, nullable=False)
    desenvolvedor = db.Column(db.String(200), nullable=False)

    def json(self):
        return {
            "id":self.id,
            "nome":self.nome,
            "ano_lancamento":self.ano_lancamento,
            "genero":self.genero,
            "classificacao":self.classificacao,
            "desenvolvedor":self.desenvolvedor
            }