import { Router } from 'express';
import {
  criarEducacao,
  listarTodasEducacoes,
  listarEducacoesPorPessoa,
  listarEducacaoPorId,
  atualizarEducacao,
  deletarEducacao
} from '../controllers/educacaoController.js';

const router = Router();

router.post('/', criarEducacao);
router.get('/', listarTodasEducacoes);
router.get('/pessoa/:pessoaId', listarEducacoesPorPessoa);
router.get('/:id', listarEducacaoPorId);
router.put('/:id', atualizarEducacao);
router.delete('/:id', deletarEducacao);

export default router;
