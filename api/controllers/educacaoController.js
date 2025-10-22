import models from "../models/index.js";

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// CREATE Educacao (associada a uma Pessoa)
export const criarEducacao = asyncHandler(async (req, res) => {
    const { pessoaId, ...educacaoData } = req.body;
    if (!pessoaId) {
         return res.status(400).json({ error: 'O ID da pessoa (pessoaId) é obrigatório.' });
    }

    // Verifica se a pessoa existe
    const pessoa = await models.Pessoa.findByPk(pessoaId);
    if (!pessoa) {
         return res.status(404).json({ error: 'Pessoa não encontrada para associar a educação.' });
    }

    // Cria a educação associada
    const novaEducacao = await models.Educacao.create({
        ...educacaoData,
        pessoaId: pessoaId,
    });

    res.status(201).json(novaEducacao);
});

// GET ALL by Pessoa ID - Listar educações de uma pessoa específica
export const listarEducacoesPorPessoa = asyncHandler(async (req, res) => {
    const { pessoaId } = req.params;
    const educacoes = await models.Educacao.findAll({
        where: { pessoaId: pessoaId }
    });
    res.status(200).json(educacoes);
});

// GET BY ID - Listar educação por ID
export const listarEducacaoPorId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const educacao = await models.Educacao.findByPk(id);
    if (!educacao) {
        return res.status(404).json({ error: 'Educação não encontrada.' });
    }
    res.status(200).json(educacao);
});

//PUT
export const atualizarEducacao = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [updated] = await models.Educacao.update(req.body, {
        where: { id: id }
    });
    if (!updated) {
        return res.status(404).json({ error: 'Educação não encontrada.' });
    }
    const educacaoAtualizada = await models.Educacao.findByPk(id);
    res.status(200).json(educacaoAtualizada);
});

// DELETE Educacao
 export const deletarEducacao = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletada = await models.Educacao.destroy({ where: { id: id } });
    if (!deletada) {
        return res.status(404).json({ error: 'Educação não encontrada.' });
    }
    res.status(204).send();
});