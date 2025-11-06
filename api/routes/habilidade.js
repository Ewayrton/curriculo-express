import { Router } from 'express';
import {
  criarHabilidade,
  listarHabilidades,
  listarHabilidadesPorPessoa,
  listarHabilidadePorId,
  atualizarHabilidade,
  deletarHabilidade
} from '../controllers/habilidadeController.js';

const router = Router();

router.post('/', criarHabilidade);
router.get('/', listarHabilidades);
router.get('/pessoa/:pessoaId', listarHabilidadesPorPessoa);
router.get('/:id', listarHabilidadePorId);
router.put('/:id', atualizarHabilidade);
router.delete('/:id', deletarHabilidade);

export default router;
