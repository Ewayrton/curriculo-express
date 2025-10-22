const getExperienciaModel = (sequelize, { DataTypes }) => {
  const Experiencia = sequelize.define('experiencia', {
    cargo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    empresa: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    dataInicio: {
      type: DataTypes.DATEONLY, // Usar DATEONLY se não precisar da hora
      allowNull: false,
    },
    dataFim: {
      type: DataTypes.DATEONLY,
      allowNull: true, // Pode ser nulo se for o emprego atual
    },
    descricao: {
      type: DataTypes.TEXT,
    },
    // A chave estrangeira 'pessoaId' será adicionada automaticamente pela associação
  });

  // Define a associação inversa (uma Experiencia pertence a uma Pessoa)
  Experiencia.associate = (models) => {
    Experiencia.belongsTo(models.Pessoa);
  };

  return Experiencia;
};

export default getExperienciaModel;