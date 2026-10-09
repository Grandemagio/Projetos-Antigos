const endpoints = require("express");
const conexao = require("../database/connection");

const router = endpoints.Router();


// ==========================================
// CALCULAR COMPATIBILIDADE
// ==========================================

function calcularMatch(adotante, animal) {

    let pontos = 0;
    let motivos = [];


    // ==========================================
    // ESPAÇO - 25 PONTOS
    // ==========================================

    if (adotante.espaco === animal.espaco) {

        pontos += 25;

        motivos.push("Espaço compatível");
    }


    // ==========================================
    // ATIVIDADE / ENERGIA - 20 PONTOS
    // ==========================================

    if (
        adotante.atividade === "alta" &&
        animal.energia === "alta"
    ) {

        pontos += 20;

        motivos.push("Nível de atividade compatível");
    }

    if (
        adotante.atividade === "baixa" &&
        animal.energia === "baixa"
    ) {

        pontos += 20;

        motivos.push("Nível de atividade compatível");
    }


    // ==========================================
    // TEMPO / ATENÇÃO - 20 PONTOS
    // ==========================================

    if (
        adotante.tempo === "muito" &&
        animal.atencao === "muita"
    ) {

        pontos += 20;

        motivos.push("Tempo disponível compatível");
    }

    if (
        adotante.tempo === "pouco" &&
        animal.atencao === "pouca"
    ) {

        pontos += 20;

        motivos.push("Tempo disponível compatível");
    }


    // ==========================================
    // EXPERIÊNCIA - 15 PONTOS
    // ==========================================

    if (adotante.experiencia === animal.experiencia) {

        pontos += 15;

        motivos.push("Experiência compatível");
    }


    // ==========================================
    // CRIANÇAS - 10 PONTOS
    // ==========================================

    if (
        Boolean(adotante.criancas) ===
        Boolean(animal.criancas)
    ) {

        pontos += 10;

        if (animal.criancas) {
            motivos.push("Compatível com crianças");
        } else {
            motivos.push("Compatível com a ausência de crianças");
        }
    }


    // ==========================================
    // OUTROS PETS - 10 PONTOS
    // ==========================================

    if (
        Boolean(adotante.outros_pets) ===
        Boolean(animal.outros_pets)
    ) {

        pontos += 10;

        if (animal.outros_pets) {
            motivos.push("Compatível com outros pets");
        } else {
            motivos.push("Compatível com a ausência de outros pets");
        }
    }


    return {
        pontos,
        motivos
    };
}


// ==========================================
// BUSCAR MATCH DE UM ADOTANTE
// GET /match/adotante/:usuario_id
// ==========================================

router.get("/adotante/:usuario_id", (req, res) => {

    const usuarioId = Number(req.params.usuario_id);


    if (!usuarioId) {

        return res.status(400).send({
            mensagem: "ID do usuário inválido."
        });

    }


    // ==========================================
    // BUSCAR PERFIL DO ADOTANTE
    // ==========================================

    const comandoAdotante = `
        SELECT
            usuario_id,
            espaco,
            atividade,
            tempo,
            experiencia,
            criancas,
            outros_pets
        FROM perfis_adotantes
        WHERE usuario_id = ?
    `;


    conexao.query(
                comandoAdotante,
                [usuarioId],
                (erro, adotantes) => {

                    if (erro) {
                        console.log("Erro ao buscar adotante:", erro);
                        return res.status(500).send({
                            mensagem: "Erro ao buscar perfil do adotante.",
                            erro: erro.message
                        });
                    }

                    if (adotantes.length === 0) {
                        return res.status(404).send({
                            mensagem: "Perfil do adotante não encontrado."
                        });
                    }

                    const adotante = adotantes[0];

                    // ==========================================
                    // BUSCAR ANIMAIS DISPONÍVEIS
                    // ==========================================
                    const comandoAnimais = `
                        SELECT
                            id,
                            nome,
                            porte,
                            espaco,
                            energia,
                            atencao,
                            experiencia,
                            criancas,
                            outrosPets AS outros_pets
                        FROM pets
                    `;

                    conexao.query(
                        comandoAnimais,
                        (erro, animais) => {

                            if (erro) {
                                console.log("Erro ao buscar animais:", erro);
                                return res.status(500).send({
                                    mensagem: "Erro ao buscar animais.",
                                    erro: erro.message
                                });
                            }

                            // ==========================================
                            // CALCULAR MATCH
                            // ==========================================
                            const resultados = animais.map(animal => {
                                const resultado = calcularMatch(adotante, animal);

                                return {
                                    id: animal.id,
                                    nome: animal.nome,
                                    especie: animal.especie,
                                    raca: animal.raca,
                                    porte: animal.porte,
                                    foto_url: animal.foto_url,
                                    compatibilidade: resultado.pontos,
                                    motivos: resultado.motivos
                                };
                            });

                            // ==========================================
                            // ORDENAR DO MAIOR PARA O MENOR
                            // ==========================================
                            resultados.sort(
                                (a, b) => b.compatibilidade - a.compatibilidade
                            );

                            // ==========================================
                            // RETORNAR RESULTADO
                            // ==========================================
                            // RETORNAR RESULTADO
                            res.send({
                                adotante: adotante,
                                quantidade: resultados.length,
                                animais: resultados
                            });
                        }
                    );
                }
            );
});

module.exports = router;