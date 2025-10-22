import models from '../models/index.js';

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// CREATE Experiencia (associada a uma Pessoa)
export const criarExperiencia = asyncHandler(async (req, res) => {
    const { pessoaId, ...experienciaData } = req.body; // Pega o ID da pessoa e o resto dos dados

    if (!pessoaId) {
         return res.status(400).json({ error: 'O ID da pessoa (pessoaId) é obrigatório.' });
    }

    // Verifica se a pessoa existe
    const pessoa = await models.Pessoa.findByPk(pessoaId);
    if (!pessoa) {
         return res.status(404).json({ error: 'Pessoa não encontrada para associar a experiência.' });
    }

    // Cria a experiência associada
    const novaExperiencia = await models.Experiencia.create({
        ...experienciaData,
        pessoaId: pessoaId, // Garante que o ID da pessoa seja passado
    });

    res.status(201).json(novaExperiencia);
});

// GET ALL by Pessoa ID - Listar experiências de uma pessoa específica
export const listarExperienciasPorPessoa = asyncHandler(async (req, res) => {
    const { pessoaId } = req.params;
    const experiencias = await models.Experiencia.findAll({
        where: { pessoaId: pessoaId }
    });
    res.status(200).json(experiencias);
});

//PUT
export const atualizarExperiencia = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [updated] = await models.Experiencia.update(req.body, {
        where: { id: id }
    });

    if (!updated) {
        return res.status(404).json({ error: 'Experiência não encontrada.' });
    }
    const experienciaAtualizada = await models.Experiencia.findByPk(id);
    res.status(200).json(experienciaAtualizada);
});

// DELETE Experiencia (Exemplo)
 export const deletarExperiencia = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletada = await models.Experiencia.destroy({ where: { id: id } });
    if (!deletada) {
        return res.status(404).json({ error: 'Experiência não encontrada.' });
    }
    res.status(204).send();
});