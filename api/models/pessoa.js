const getPessoaModel = (sequelize, { DataTypes }) => {
  const Pessoa = sequelize.define('pessoa', {
    id: { // Sequelize cria 'id' por padrão, mas é bom ser explícito
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true, // Adiciona validação de email
      },
    },
    telefone: {
      type: DataTypes.STRING,
    },
    resumo: {
      type: DataTypes.TEXT, // Usar TEXT para resumos mais longos
    },
    // createdAt e updatedAt são adicionados automaticamente pelo Sequelize
  });

  // Define as associações (relacionamentos)
  Pessoa.associate = (models) => {
    // Uma Pessoa tem muitas Experiencias
    Pessoa.hasMany(models.Experiencia, { onDelete: 'CASCADE' });
    // Uma Pessoa tem muitas Educacoes
    Pessoa.hasMany(models.Educacao, { onDelete: 'CASCADE' });
    // Uma Pessoa tem muitas Habilidades
    Pessoa.hasMany(models.Habilidade, { onDelete: 'CASCADE' });
  };

  return Pessoa;
};

export default getPessoaModel;