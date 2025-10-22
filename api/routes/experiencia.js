import { Router } from 'express';
import {
  criarExperiencia,
  listarExperienciasPorPessoa,
  listarExperienciaPorId,
  atualizarExperiencia,
  deletarExperiencia
} from '../controllers/experienciaController.js';

const router = Router();

router.post('/', criarExperiencia);
router.get('/pessoa/:pessoaId', listarExperienciasPorPessoa);
router.get('/:id', listarExperienciaPorId);
router.put('/:id', atualizarExperiencia);
router.delete('/:id', deletarExperiencia);

export default router;