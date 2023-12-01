import { Clinics } from "../models/index.js";

export default class ClinicController {
  // GET -> ./clinics
  static GetAllClinics = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      // Calcula o número de documentos para pular
      const skip = (pageNumber - 1) * limitNumber;

      const clinics = await Clinics.find().skip(skip).limit(limitNumber);

      if (clinics.length > 0) {
        res.status(200).send({
          message: "Especialidades encontradas com sucesso.",
          results: clinics,
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

  // GET -> ./clinics/search (Busca com filtro)
  static GetClinicsByQuerySearch = async (req, res) => {
    const urlParams = req.query;
    console.log(urlParams);

    if (!urlParams.senha) {
      try {
        const clinics = await Clinics.find({ ...urlParams }, {});

        res.status(200).send({
          message: "Especialidades encontradas com sucesso.",
          results: clinics,
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

  // GET -> ./clinics/:id
  static GetClinicById = async (req, res) => {
    const id = req.params.id;

    try {
      const clinics = await Clinics.findById(id);

      res.status(200).send({
        message: "Especialidade encontrada com sucesso.",
        results: clinics,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno do servidor.`,
        err: err,
      });
    }
  };

  // POST -> ./clinics
  static AddNewClinic = async (req, res) => {
    const newclinic = new Clinics(req.body);

    try {
      await newclinic.save();
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

  // PUT -> ./clinics/:id
  static UpdateClinic = async (req, res) => {
    const id = req.params.id;
    const lastUpdate = GetCurrentTimeObject();

    try {
      const updateClinic = await Clinics.findOneAndUpdate(
        { _id: id },
        { $set: { ...req.body, lastUpdate } },
        { new: true }
      );

      res.send({
        message: "Cliente cadastrado com successfully.",
        results: updateClinic.toJSON(),
      });
    } catch (err) {
      res.send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // DELETE -> ./clinics/:id
  static DeleteClinic = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
      await Clinics.findByIdAndDelete(id);

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
