import Sequelize from 'sequelize';
import pg from 'pg';

// Importe as funções que definem os modelos
import getPessoaModel from './pessoa.js';
import getExperienciaModel from './experiencia.js';
import getEducacaoModel from './educacao.js';
import getHabilidadeModel from './habilidade.js';

// Verifica se a URL do banco está definida no .env
if (!process.env.POSTGRES_URL) {
  throw new Error('A variável de ambiente POSTGRES_URL não está definida.');
}

// Inicializa o Sequelize
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  dialect: 'postgres',
  protocol: 'postgres', // Adicionado baseado na referência
  dialectModule: pg, // Necessário para alguns ambientes/hospedagens
  dialectOptions: { // Opções SSL podem ser necessárias dependendo da hospedagem
    ssl: process.env.POSTGRES_URL.includes('sslmode=require') ? {
      require: true,
      rejectUnauthorized: false, // Pode ser necessário para conexões autoassinadas
    } : false,
  },
  logging: false, // Desabilita logs SQL no console
});

// Cria um objeto para guardar os modelos
const models = {
  Pessoa: getPessoaModel(sequelize, Sequelize),
  Experiencia: getExperienciaModel(sequelize, Sequelize),
  Educacao: getEducacaoModel(sequelize, Sequelize),
  Habilidade: getHabilidadeModel(sequelize, Sequelize),
};

// Executa a função 'associate' de cada modelo, se existir, para criar os relacionamentos
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

// Exporta a instância do Sequelize e os modelos
export { sequelize };
export default models;