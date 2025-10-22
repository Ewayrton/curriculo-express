import models from '../models/index.js';

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// CREATE Habilidade (associada a uma Pessoa)
export const criarHabilidade = asyncHandler(async (req, res) => {
    const { pessoaId, ...habilidadeData } = req.body;
    if (!pessoaId) {
         return res.status(400).json({ error: 'O ID da pessoa (pessoaId) é obrigatório.' });
    }
    // Verifica se a pessoa existe
    const pessoa = await models.Pessoa.findByPk(pessoaId);
    if (!pessoa) {
         return res.status(404).json({ error: 'Pessoa não encontrada para associar a habilidade.' });
    }

    // Cria a habilidade associada
    const novaHabilidade = await models.Habilidade.create({
        ...habilidadeData,
        pessoaId: pessoaId,
    });

    res.status(201).json(novaHabilidade);
});

// GET ALL by Pessoa ID - Listar habilidades de uma pessoa específica
export const listarHabilidadesPorPessoa = asyncHandler(async (req, res) => {
    const { pessoaId } = req.params;
    const habilidades = await models.Habilidade.findAll({
        where: { pessoaId: pessoaId }
    });
    res.status(200).json(habilidades);
});

// GET BY ID - Listar habilidade por ID
export const listarHabilidadePorId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const habilidade = await models.Habilidade.findByPk(id);
    if (!habilidade) {
        return res.status(404).json({ error: 'Habilidade não encontrada.' });
    }
    res.status(200).json(habilidade);
});

// PUT
export const atualizarHabilidade = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [updated] = await models.Habilidade.update(req.body, {
        where: { id: id }
    });
    if (!updated) {
        return res.status(404).json({ error: 'Habilidade não encontrada.' });
    }
    const habilidadeAtualizada = await models.Habilidade.findByPk(id);
    res.status(200).json(habilidadeAtualizada);
});

// DELETE Habilidade
export const deletarHabilidade = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletada = await models.Habilidade.destroy({ where: { id: id } });
    if (!deletada) {
        return res.status(404).json({ error: 'Habilidade não encontrada.' });
    }
    res.status(204).send();
});