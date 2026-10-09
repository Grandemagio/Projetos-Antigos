const endpoints = require("express");
const conexao = require("../database/connection");

const router = endpoints.Router();


// ==========================================
// CADASTRAR PERFIL DO ADOTANTE
// ==========================================

router.post("/", (req, res) => {

    const {
        usuario_id,
        espaco,
        atividade,
        tempo,
        experiencia,
        criancas,
        outrosPets
    } = req.body;


    if (
        !usuario_id ||
        !espaco ||
        !atividade ||
        !tempo ||
        !experiencia ||
        criancas === undefined ||
        outrosPets === undefined
    ) {
        return res.status(400).send({
            mensagem: "Preencha todos os campos do perfil."
        });
    }


    const comando = `
        INSERT INTO perfis_adotantes
        (
            usuario_id,
            espaco,
            atividade,
            tempo,
            experiencia,
            criancas,
            outros_pets
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;


    const valores = [
        usuario_id,
        espaco,
        atividade,
        tempo,
        experiencia,
        criancas,
        outrosPets
    ];


    conexao.query(comando, valores, (erro, resultado) => {

        if (erro) {

            console.log("Erro ao cadastrar perfil:", erro);

            return res.status(500).send({
                mensagem: "Erro ao cadastrar perfil.",
                erro: erro.message
            });
        }


        res.status(201).send({
            mensagem: "Perfil do adotante cadastrado com sucesso!",
            id: resultado.insertId
        });

    });

});


// ==========================================
// ATUALIZAR PERFIL DO ADOTANTE
// ==========================================

router.put("/:usuario_id", (req, res) => {

    const usuarioId = Number(req.params.usuario_id);

    const {
        espaco,
        atividade,
        tempo,
        experiencia,
        criancas,
        outrosPets
    } = req.body;


    if (
        !usuarioId ||
        !espaco ||
        !atividade ||
        !tempo ||
        !experiencia ||
        criancas === undefined ||
        outrosPets === undefined
    ) {
        return res.status(400).send({
            mensagem: "Preencha todos os campos do perfil."
        });
    }


    const comando = `
        UPDATE perfis_adotantes
        SET
            espaco = ?,
            atividade = ?,
            tempo = ?,
            experiencia = ?,
            criancas = ?,
            outros_pets = ?
        WHERE usuario_id = ?
    `;


    const valores = [
        espaco,
        atividade,
        tempo,
        experiencia,
        criancas,
        outrosPets,
        usuarioId
    ];


    conexao.query(comando, valores, (erro, resultado) => {

        if (erro) {

            console.log("Erro ao atualizar perfil:", erro);

            return res.status(500).send({
                mensagem: "Erro ao atualizar perfil.",
                erro: erro.message
            });
        }


        if (resultado.affectedRows === 0) {

            return res.status(404).send({
                mensagem: "Perfil do adotante não encontrado."
            });
        }


        res.send({
            mensagem: "Perfil do adotante atualizado com sucesso!"
        });

    });

});


// ==========================================
// BUSCAR PERFIL DO ADOTANTE
// ==========================================

router.get("/:usuario_id", (req, res) => {

    const usuarioId = Number(req.params.usuario_id);


    if (!usuarioId) {

        return res.status(400).send({
            mensagem: "ID do usuário inválido."
        });

    }


    const comando = `
        SELECT
            id,
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
        comando,
        [usuarioId],
        (erro, resultados) => {

            if (erro) {

                console.log(
                    "Erro ao buscar perfil:",
                    erro
                );

                return res.status(500).send({
                    mensagem: "Erro ao buscar perfil.",
                    erro: erro.message
                });

            }


            if (resultados.length === 0) {

                return res.status(404).send({
                    mensagem: "Perfil do adotante não encontrado."
                });

            }


            res.send(resultados[0]);

        }
    );

});


// ==========================================
// EXPORTAR ROUTER
// ==========================================

module.exports = router;