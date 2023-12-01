import Agreements from "../models/Agreement.js";
import { GetCurrentTimeObject, HandleQuerySearch } from "../services/index.js";

export default class AgreementController {
  // GET -> ./agreements
  static GetAllAgreements = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      // Calcula o número de documentos para pular
      const skip = (pageNumber - 1) * limitNumber;

      const agreements = await Agreements.find()
        .skip(skip)
        .limit(limitNumber)
        .populate("locais")
        .populate("especialidades")
        .populate({
          path: "criadoPor",
          select: ["_id", "nome"],
        });

      if (agreements.length > 0) {
        res.status(200).send({
          message: "Convênios encontrados com sucesso.",
          results: agreements,
        });
      } else {
        res.status(204).send(); // A requisição foi bem sucedida mas nenhum registro foi encontrado
      }
    } catch (err) {
      res.status(500).send({ message: "Erro interno no servidor", err: err });
    }
  };

  // GET -> ./agreements/search (Busca com filtro)
  static GetAgreementByQuerySearch = async (req, res) => {
    try {
      const search = await HandleQuerySearch(req);
      const agreements = await Agreements.find(search, {})
        .populate("locais")
        .populate("especialidades")
        .populate({
          path: "criadoPor",
          select: ["_id", "nome"],
        });

      res.status(200).send({
        message: "Clientes encontrados com sucesso.",
        results: agreements,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // GET -> ./agreements/:id
  static GetAgreementById = async (req, res) => {
    const id = req.params.id;

    try {
      const agreements = await Agreements.findById(id)
        .populate("locais")
        .populate("especialidades")
        .populate({
          path: "criadoPor",
          select: ["_id", "nome"],
        });

      res.status(200).send({
        message: `Cliente de ID:(${id}) encontrado com sucesso.`,
        results: agreements,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // POST -> ./agreements
  static AddNewAgreement = async (req, res) => {
    const newAgreement = new Agreements(req.body);

    try {
      const agreement = await newAgreement.save();
      res
        .status(200)
        .send({ message: "Convênio criado com sucesso", results: agreement });
    } catch (err) {
      res.status(500).send({ message: "Erro interno no servidor", err: err });
    }
  };

  // PUT -> ./agreements/:id
  static UpdateAgreement = async (req, res) => {
    const id = req.params.id;
    const lastUpdate = GetCurrentTimeObject();

    try {
      const updateAgreement = await Agreements.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body, lastUpdate } },
        { new: true } // Puxa o novo item criado para este contexto
      );

      res.status(200).send({
        message: "Cliente cadastrado com successfully.",
        results: updateAgreement.toJSON(),
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  //DELETE -> ./agreements
  static DeleteAgreement = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
      await Agreements.findByIdAndDelete(id);

      res.status(200).send({
        message: `Cliente de id:(${id}) removido com sucesso.`,
        results: { oldId: id },
      });
    } catch (err) {
      res.status(500).send({ message: "Erro interno no servidor", err: err });
    }
  };
}
