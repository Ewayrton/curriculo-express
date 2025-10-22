import 'dotenv/config'; // Carrega variáveis de .env logo no início
import cors from 'cors';
import express from 'express';

import models, { sequelize } from './models/index.js'; // Importa modelos e instância sequelize
import routes from './routes/index.js'; // Importa o agregador de rotas

const app = express();

// --- Middlewares Essenciais ---
app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Habilita o parsing de dados de formulário

// Middleware simples para logar requisições
 app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Middleware para injetar modelos no contexto
app.use((req, res, next) => {
  req.context = {
    models,
    // quando eu adicionar autenticação, adicionar o usuário logado aqui.
    // Ex: me: await models.User.findByPk(1), // Exemplo fixo, substituir por lógica de auth
  };
  next();
});

// --- Montagem das Rotas ---
app.use('/pessoas', routes.pessoa);
app.use('/experiencias', routes.experiencia);
app.use('/educacao', routes.educacao); // Certifique-se de ter criado api/routes/educacao.js
app.use('/habilidades', routes.habilidade); // Certifique-se de ter criado api/routes/habilidade.js

// Rota raiz simples (opcional)
app.get('/', (req, res) => {
  res.send('API Curriculo Express com Sequelize!');
});

// --- Sincronização com Banco e Inicialização ---
const port = process.env.PORT || 3000;
// Lê a variável de ambiente. Se for 'true', apaga e recria o banco. CUIDADO!
const eraseDatabaseOnSync = process.env.ERASE_DATABASE === 'true';

// Sincroniza o Sequelize com o banco de dados
// force: true -> APAGA TUDO e recria as tabelas. Usar apenas em desenvolvimento.
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  console.log('Banco de dados sincronizado com sucesso.');

  // Se a flag ERASE_DATABASE for true, executa o seed para popular o banco
  if (eraseDatabaseOnSync) {
    console.log('Criando dados iniciais (seed)...');
    await createPessoasIniciais(); // Chama a função que cria os dados das 2 pessoas
  }

  // Inicia o servidor Express somente após a sincronização (e seed, se aplicável)
  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
}).catch(error => {
  console.error('Erro ao sincronizar com o banco de dados:', error);
});

// --- Função de Seed (Dados Iniciais) ---
// Cria os dois currículos iniciais no banco de dados
const createPessoasIniciais = async () => {
  try {
    // Pessoa 1 com dados associados
    await models.Pessoa.create(
      {
        nome: 'Alice Silva',
        email: 'alice.silva@email.com',
        telefone: '11 98888-1111',
        resumo: 'Desenvolvedora Full Stack com 5 anos de experiência em React e Node.js.',
        // Criação aninhada de dados associados usando 'include'
        experiencias: [
          {
            cargo: 'Desenvolvedora Sênior',
            empresa: 'Tech Solutions',
            dataInicio: '2020-01-15', // Sequelize aceita string no formato YYYY-MM-DD
            descricao: 'Liderança técnica em projetos de microserviços.',
          },
          {
            cargo: 'Desenvolvedora Pleno',
            empresa: 'Web Company',
            dataInicio: '2018-03-01',
            dataFim: '2019-12-20',
            descricao: 'Desenvolvimento de APIs REST.',
          },
        ],
        educacoes: [ // Sequelize usa o nome plural definido na associação (ou nome da tabela)
          {
            instituicao: 'Universidade Federal de Tecnologia',
            curso: 'Engenharia de Software',
            dataInicio: '2014-01-01',
            dataFim: '2017-12-15',
          },
        ],
        habilidades: [
          { nome: 'Node.js', nivel: 'Avançado' },
          { nome: 'React', nivel: 'Avançado' },
          { nome: 'PostgreSQL', nivel: 'Intermediário' },
        ],
      },
      {
        // Informa ao Sequelize para incluir os modelos associados durante a criação
        include: [
          { model: models.Experiencia, as: 'experiencias' }, // 'as' pode ser necessário se definido no model
          { model: models.Educacao, as: 'educacoes' },
          { model: models.Habilidade, as: 'habilidades' },
        ],
      }
    );

    // Pessoa 2 com dados associados
    await models.Pessoa.create(
      {
        nome: 'Bruno Costa',
        email: 'bruno.costa@email.com',
        telefone: '21 97777-2222',
        resumo: 'Designer de UI/UX focado em aplicações móveis.',
        experiencias: [
          {
            cargo: 'UI/UX Designer Pleno',
            empresa: 'App Masters',
            dataInicio: '2019-05-10',
            descricao: 'Design de interfaces para apps iOS e Android.',
          },
        ],
        educacoes: [
          {
            instituicao: 'Instituto de Design Digital',
            curso: 'Design Gráfico',
            dataInicio: '2015-02-01',
            dataFim: '2018-12-01',
          },
        ],
        habilidades: [
          { nome: 'Figma', nivel: 'Avançado' },
          { nome: 'Adobe XD', nivel: 'Avançado' },
          { nome: 'User Research', nivel: 'Intermediário' },
        ],
      },
      {
        include: [
          { model: models.Experiencia, as: 'experiencias' },
          { model: models.Educacao, as: 'educacoes' },
          { model: models.Habilidade, as: 'habilidades' },
        ],
      }
    );

    console.log('Dados iniciais (2 pessoas) criados com sucesso!');
  } catch (error) {
    console.error('Erro ao criar dados iniciais (seed):', error);
  }
};

export default app;