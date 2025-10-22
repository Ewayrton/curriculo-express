const getHabilidadeModel = (sequelize, { DataTypes }) => {
  const Habilidade = sequelize.define('habilidade', {
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    nivel: {
      type: DataTypes.STRING, // Ex: Básico, Intermediário, Avançado
    },
    // A chave estrangeira 'pessoaId' será adicionada automaticamente
  });

  Habilidade.associate = (models) => {
    Habilidade.belongsTo(models.Pessoa);
  };

  return Habilidade;
};

export default getHabilidadeModel;