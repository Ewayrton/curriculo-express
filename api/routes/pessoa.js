import { Router } from 'express';
import {
    criarPessoa,
    listarPessoas,
    listarPessoaPorId,
    atualizarPessoa,
    deletarPessoa
} from '../controllers/pessoaController.js'; // Ajuste o caminho se necessário

const router = Router();

router.post('/', criarPessoa);
router.get('/', listarPessoas);
router.get('/:id', listarPessoaPorId);
router.put('/:id', atualizarPessoa);
router.delete('/:id', deletarPessoa);

export default router;