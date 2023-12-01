import { Expertises } from "../models/index.js";
import { HandleQuerySearch } from "../services/index.js";

export default class ExpertiseController {
  // GET -> ./expertises
  static GetAllExpertises = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      // Calcula o número de documentos para pular
      const skip = (pageNumber - 1) * limitNumber;

      const expertises = await Expertises.find().skip(skip).limit(limitNumber);

      if (expertises.length > 0) {
        res.status(200).send({
          message: "Especialidades encontradas com sucesso.",
          results: expertises,
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

  // GET -> ./expertises/search (Busca com filtro)
  static GetExpertisesByQuerySearch = async (req, res) => {
    const urlParams = req.query;
    console.log(urlParams);

    if (!urlParams.senha) {
      try {
        const search = await HandleQuerySearch();
        const expertises = await Expertises.find(search, {});

        res.status(200).send({
          message: "Especialidades encontradas com sucesso.",
          results: expertises,
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

  // GET -> ./expertises/:id
  static GetExpertiseById = async (req, res) => {
    const id = req.params.id;

    try {
      const expertises = await Expertises.findById(id);

      res.status(200).send({
        message: "Especialidade encontrada com sucesso.",
        results: expertises,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // POST -> ./expertises
  static AddNewExpertise = async (req, res) => {
    const newExpertise = new Expertises(req.body);

    try {
      await newExpertise.save();
      res.status(201).send({
        message: "Especialidade adicionada com sucesso.",
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // DELETE -> ./expertises/:id
  static DeleteExpertise = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
      await Expertises.findByIdAndDelete(id);

      res.status(200).send({
        message: `Especialidade de ID:(${id}) removida com sucesso.`,
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
