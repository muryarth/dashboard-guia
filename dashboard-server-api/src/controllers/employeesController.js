import { Employees } from "../models/index.js";
import { GetCurrentTimeObject } from "../services/index.js";

export default class EmployeeController {
  // GET -> ./employees
  static GetAllEmployees = async (req, res) => {
    console.log("teste!");

    try {
      let employees;

      const { page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      // Calcula o número de documentos para pular
      const skip = (pageNumber - 1) * limitNumber;

      employees = await Employees.find().skip(skip).limit(limitNumber);

      if (employees.length > 0) {
        res.status(200).send({
          message: "Funcionários encontrados com sucesso.",
          results: employees,
        });
      } else {
        res.status(204).send({
          message:
            "Nenhum usuário foi adicionado a esta coleção até o momento.",
          results: employees,
        });
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
    const urlParams = req.query;
    console.log(urlParams);

    try {
      const employees = await Employees.find({ ...urlParams }, {});

      res.status(200).send({
        message: "Funcionários encontrados com sucesso.",
        results: employees,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // GET -> ./employees/:id
  static GetEmployeeById = async (req, res) => {
    const id = req.params.id;

    try {
      const employees = await Employees.findById(id);

      res.status(200).send({
        message: "Funcionário encontrado com sucesso.",
        results: employees,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // POST -> ./employees
  static AddNewEmployee = async (req, res) => {
    const newEmployee = new Employees(req.body);

    try {
      await newEmployee.save();
      res.status(201).send({
        message: "Funcionário adicionado com sucesso.",
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
      const updateEmplyee = await Employees.findByIdAndUpdate(id, {
        $set: { ...req.body, lastUpdate },
      });

      res.status(200).send({
        message: `Funcionário de ID:(${id}) atualizado com sucesso.`,
        results: updateEmplyee,
      });
    } catch (err) {
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
