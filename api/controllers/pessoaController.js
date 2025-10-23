import models from '../models/index.js'; // Importa os modelos inicializados

const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// CREATE
export const criarPessoa = asyncHandler(async (req, res) => {
    try {
        const novaPessoa = await models.Pessoa.create(req.body);
        res.status(201).json(novaPessoa);
    } catch (error) {
        console.error("ERRO DETALHADO AO CRIAR PESSOA:", error); // Log essencial
        // Envia resposta de erro para o cliente
        res.status(400).json({
            error: 'Erro ao criar pessoa.',
            details: error.message, // Mensagem principal
            name: error.name,        // Tipo do erro (ex: SequelizeUniqueConstraintError)
            fields: error.fields     // (Opcional) Campos que falharam na validação
         });
    }
});

// GET ALL
export const listarPessoas = asyncHandler(async (req, res) => {
    const pessoas = await models.Pessoa.findAll(); // Busca todos
    res.status(200).json(pessoas);
});

// GET BY ID
export const listarPessoaPorId = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const pessoa = await models.Pessoa.findByPk(id, {
        // Inclui os dados associados
        include: [
            models.Experiencia,
            models.Educacao,
            models.Habilidade,
        ],
    });
    if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    res.status(200).json(pessoa);
});

// UPDATE
export const atualizarPessoa = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [updated] = await models.Pessoa.update(req.body, {
        where: { id: id }
    }); // Retorna um array, o primeiro elemento é o número de linhas atualizadas

    if (!updated) {
        return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    const pessoaAtualizada = await models.Pessoa.findByPk(id); // Busca o registro atualizado
    res.status(200).json(pessoaAtualizada);
});

// DELETE
export const deletarPessoa = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletada = await models.Pessoa.destroy({
        where: { id: id }
    }); // Retorna o número de linhas deletadas

    if (!deletada) {
        return res.status(404).json({ error: 'Pessoa não encontrada.' });
    }
    // CASCADE definido nos modelos cuidará dos dados relacionados
    res.status(204).send(); // Resposta de sucesso sem conteúdo
});