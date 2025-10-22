const getEducacaoModel = (sequelize, { DataTypes }) => {
  const Educacao = sequelize.define('educacao', {
    instituicao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Pode ser nulo se estiver cursando
    },
    // A chave estrangeira 'pessoaId' será adicionada automaticamente
  });

  Educacao.associate = (models) => {
    Educacao.belongsTo(models.Pessoa);
  };

  return Educacao;
};

export default getEducacaoModel;