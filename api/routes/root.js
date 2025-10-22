import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "🌟 API de Currículos - Ativa e funcionando!",
    versao: "1.0.0",
    descricao: "API desenvolvida para gerenciar currículos com pessoas, experiências, educações e habilidades.",
    endpoints: {
      pessoa: "/pessoa",
      experiencia: "/experiencia",
      educacao: "/educacao",
      habilidade: "/habilidade",
    },
  });
});

export default router;