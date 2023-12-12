import bcrypt from "bcrypt";

const GenerateHashedPassword = async (password, saltSize = 10) => {
  // Gera um salt para o hash
  const salt = await bcrypt.genSalt(saltSize);

  // Senha com hash
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

// Gera hash para a senha cadastrada ou alterada
const SaveOrUpdatePasswordHash = (employeeSchema) => {
  employeeSchema.pre("save", async function (next) {
    const employee = this;

    // Não precisa de re-hash, se a senha não for modificada
    if (!employee.isModified("senha")) return next();

    try {
      //Substitui a senha orifinal pela senha hashada no objeto
      employee.senha = await GenerateHashedPassword(employee.senha);

      console.log(employee.senha);

      next();
    } catch (err) {
      return next(err);
    }
  });

  employeeSchema.pre("findOneAndUpdate", async function (next) {
    const newData = this._update.$set;
    console.log(newData);

    try {
      //Atualiza a senha original, pela senha hashada
      if (newData.senha)
        this.set({ senha: await GenerateHashedPassword(newData.senha) });
      
      next();
    } catch (err) {
      return next(err);
    }
  });
};

export default SaveOrUpdatePasswordHash;
