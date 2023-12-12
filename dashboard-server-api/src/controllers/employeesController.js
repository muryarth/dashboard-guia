import dotenv from "dotenv/config.js";
import { Employees } from "../models/index.js";
import { GetCurrentTimeObject, HandleQuerySearch } from "../services/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default class EmployeeController {
  // GET -> ./employees
  static GetAllEmployees = async (req, res) => {
    try {
      res.setHeader("Content-Type", "application/json");

      const { page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      // Calcula o número de documentos para pular
      const skip = (pageNumber - 1) * limitNumber;

      const employees = await Employees.find()
        .skip(skip)
        .limit(limitNumber)
        .select("-senha");

      if (employees.length > 0) {
        res.status(200).send({
          message: "Funcionários encontrados com sucesso.",
          results: employees,
        });
      } else {
        res.status(204).send(); // A requisição foi bem sucedida mas nenhum registro foi encontrado
      }
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // GET -> ./employees/search (Busca com filtro)
  static GetEmployeesByQuerySearch = async (req, res) => {
    if (req.query.nome || req.query.administrador) {
      try {
        res.setHeader("Content-Type", "application/json");

        const search = await HandleQuerySearch(req);
        const employees = await Employees.find(search, {}).select("-senha");

        if (employees.length > 0) {
          res.status(200).send({
            message: "Funcionários encontrados com sucesso.",
            results: employees,
          });
        } else {
          res.status(204).send(); // A requisição foi bem sucedida mas nenhum registro foi encontrado
        }
      } catch (err) {
        res.status(500).send({
          message: `Erro interno do servidor.`,
          err: err,
        });
      }
    } else {
      res.status(403).send({
        message: `A consulta solicitada é inválida.`,
      });
    }
  };

  // GET -> ./employees/:id
  static GetEmployeeById = async (req, res) => {
    const id = req.params.id;

    try {
      res.setHeader("Content-Type", "application/json");

      const employees = await Employees.findById(id).select("-senha");

      res.status(200).send({
        message: `Funcionário de ID:(${id}) encontrado com sucesso.`,
        results: employees,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // GET -> ./employees/auth | Autentica o funcionário
  static AuthenticateEmployee = async (req, res) => {
    const { login, senha } = req.query;

    // Valida se os dados foram preenchidos
    if (!login)
      return res.status(422).json({ msg: "O login deve ser informado!" });
    if (!senha)
      return res.status(422).json({ msg: "A senha deve ser informada!" });

    // Checa se o usuário existe
    const user = await Employees.findOne({ login: login });
    if (!user) return res.status(404).json({ msg: "Usuário não encontrado!" });

    // Checa se a senha bate
    const checkPassword = await bcrypt.compare(senha, user.senha);
    if (!checkPassword) return res.status(404).json({ msg: "Senha inválida!" });

    try {
      res.setHeader("Content-Type", "application/json");

      const secret = process.env.SECRET;

      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );

      res.status(200).json({
        msg: "Autenticação realizada com sucesso",
        token,
        user: {
          nome: user.nome,
          email: user.email,
          administrador: user.administrador,
        },
      });
    } catch (err) {
      console.log(err);

      res.status(500).json({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // POST -> ./employees
  static AddNewEmployee = async (req, res) => {
    const newEmployee = new Employees(req.body);

    try {
      res.setHeader("Content-Type", "application/json");

      await newEmployee.save();
      res.status(201).send({
        message: "Funcionário cadastrado com sucesso.",
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // PUT -> ./employees/:id
  static UpdateEmployee = async (req, res) => {
    const id = req.params.id;
    const lastUpdate = GetCurrentTimeObject();

    try {
      res.setHeader("Content-Type", "application/json");

      const updateEmployee = await Employees.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body, lastUpdate } },
        { new: true }
      );

      res.status(200).send({
        message: `Funcionário de ID:(${id}) atualizado com sucesso.`,
        results: updateEmployee,
      });
    } catch (err) {
      console.log(err);

      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // DELETE -> ./employees/:id
  static DeleteEmployee = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
      res.setHeader("Content-Type", "application/json");

      await Employees.findByIdAndDelete(id);

      res.status(200).send({
        message: `Funcionário de ID:(${id}) removido com sucesso.`,
        results: { oldId: id },
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };
}
