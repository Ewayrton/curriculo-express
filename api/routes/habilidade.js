import { Router } from 'express';
import {
  criarHabilidade,
  listarHabilidadesPorPessoa,
  listarHabilidadePorId,
  atualizarHabilidade,
  deletarHabilidade
} from '../controllers/habilidadeController.js';

const router = Router();

router.post('/', criarHabilidade);
router.get('/pessoa/:pessoaId', listarHabilidadesPorPessoa);
router.get('/:id', listarHabilidadePorId);
router.put('/:id', atualizarHabilidade);
router.delete('/:id', deletarHabilidade);

export default router;
