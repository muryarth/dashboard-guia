import bcrypt from "bcrypt";

// Gera hash para a senha cadastrada ou alterada
const savePasswordHash = async (employeeSchema) => {
  employeeSchema.pre("save", async function (next) {
    const employee = this;

    // Não precisa de re-hash, se a senha não for modificada
    if (!employee.isModified("senha")) return next();

    try {
      // Gera um salt
      const salt = await bcrypt.genSalt(10);

      // Hash
      hashedPassword = await bcrypt.hash(employee.senha, salt);

      //Substituir a senha orifinal pela senha hash
      employee.senha = hashedPassword;
      next();
    } catch (err) {
      return next(err);
    }
  });
};

export default savePasswordHash;