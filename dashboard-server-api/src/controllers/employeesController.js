import { Employees } from "../models/index.js";
import { GetCurrentTimeObject } from "../services/index.js";

export default class EmployeeController {
  // GET -> ./employees
  static GetAllEmployees = async (req, res) => {
    try {
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
    const urlParams = req.query;
    console.log(urlParams);

    if (!urlParams.senha) {
      try {
        const employees = await Employees.find({ ...urlParams }, {}).select(
          "-senha"
        );

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
    } else {
      res.status(403).send({
        message: `Filtrar consultas por senha não é permitido.`,
      });
    }
  };

  // GET -> ./employees/:id
  static GetEmployeeById = async (req, res) => {
    const id = req.params.id;

    try {
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

  // POST -> ./employees
  static AddNewEmployee = async (req, res) => {
    const newEmployee = new Employees(req.body);

    try {
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
      const updateEmployee = await Employees.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body, lastUpdate } },
        { new: true }
      );

      // Alternativa
      // const updateEmployee = await Employees.findByIdAndUpdate(id, {
      //   $set: { ...req.body, lastUpdate },
      // });

      res.status(200).send({
        message: `Funcionário de ID:(${id}) atualizado com sucesso.`,
        results: updateEmployee,
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
