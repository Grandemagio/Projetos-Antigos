const express = require('express');
const router = express.Router();
const conexao = require("../database/connection");

// GET /adocao - Listar todas as solicitações (Geral / Painel da ONG)
router.get('/', (req, res) => {
    const comando = `
        SELECT 
            a.id AS adocao_id,
            a.status,
            a.data_solicitacao,
            p.id AS pet_id,
            p.nome AS pet_nome,
            p.porte AS pet_porte,
            u.usuario_id,
            u.espaco,
            u.atividade
        FROM adocoes a
        INNER JOIN pets p ON a.pet_id = p.id
        INNER JOIN perfis_adotantes u ON a.usuario_id = u.usuario_id
        ORDER BY a.data_solicitacao DESC
    `;

    conexao.query(comando, (erro, resultados) => {
        if (erro) {
            return res.status(500).send({
                mensagem: 'Erro ao consultar solicitações de adoção.',
                erro: erro.message
            });
        }

        res.status(200).send({
            quantidade: resultados.length,
            adocoes: resultados
        });
    });
});

// GET /adocao/adotante/:usuario_id - Listar adoções de um usuário específico
router.get('/adotante/:usuario_id', (req, res) => {
    const { usuario_id } = req.params;

    const comando = `
        SELECT 
            a.id AS adocao_id,
            a.status,
            a.data_solicitacao,
            p.id AS pet_id,
            p.nome AS pet_nome,
            p.porte AS pet_porte
        FROM adocoes a
        INNER JOIN pets p ON a.pet_id = p.id
        WHERE a.usuario_id = ?
        ORDER BY a.data_solicitacao DESC
    `;

    conexao.query(comando, [usuario_id], (erro, resultados) => {
        if (erro) {
            return res.status(500).send({
                mensagem: 'Erro ao buscar histórico do adotante.',
                erro: erro.message
            });
        }

        res.status(200).send({
            usuario_id: Number(usuario_id),
            quantidade: resultados.length,
            adocoes: resultados
        });
    });
});

// POST /adocao - Registrar solicitação de adoção
router.post('/', (req, res) => {
    const { usuario_id, pet_id } = req.body;

    if (!usuario_id || !pet_id) {
        return res.status(400).send({
            mensagem: 'Informe o usuario_id e o pet_id.'
        });
    }

    const comando = `
        INSERT INTO adocoes (usuario_id, pet_id, status)
        VALUES (?, ?, 'pendente')
    `;

    conexao.query(comando, [usuario_id, pet_id], (erro, resultado) => {
        if (erro) {
            return res.status(500).send({
                mensagem: 'Erro ao registrar solicitação de adoção.',
                erro: erro.message
            });
        }

        res.status(201).send({
            mensagem: 'Solicitação de adoção registrada com sucesso!',
            adocao_id: resultado.insertId,
            usuario_id,
            pet_id,
            status: 'pendente'
        });
    });
});

// PUT /adocao/:id - Atualizar status (aprovado / recusado / pendente)
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).send({
            mensagem: 'Informe o novo status.'
        });
    }

    const comando = `
        UPDATE adocoes 
        SET status = ? 
        WHERE id = ?
    `;

    conexao.query(comando, [status, id], (erro, resultado) => {
        if (erro) {
            return res.status(500).send({
                mensagem: 'Erro ao atualizar status da solicitação.',
                erro: erro.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).send({
                mensagem: 'Solicitação de adoção não encontrada.'
            });
        }

        res.status(200).send({
            mensagem: 'Status da solicitação atualizado com sucesso!',
            adocao_id: id,
            novo_status: status
        });
    });
});

// DELETE /adocao/:id - Cancelar/remover solicitação
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const comando = `DELETE FROM adocoes WHERE id = ?`;

    conexao.query(comando, [id], (erro, resultado) => {
        if (erro) {
            return res.status(500).send({
                mensagem: 'Erro ao deletar solicitação de adoção.',
                erro: erro.message
            });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).send({
                mensagem: 'Solicitação de adoção não encontrada.'
            });
        }

        res.status(200).send({
            mensagem: 'Solicitação de adoção removida com sucesso!',
            adocao_id: id
        });
    });
});

module.exports = router;