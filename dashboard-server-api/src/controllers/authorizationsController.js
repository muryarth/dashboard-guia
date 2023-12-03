import Authorizations from "../models/Authorization.js";
import { GetCurrentTimeObject, HandleQuerySearch } from "../services/index.js";

export default class AuthorizationController {
  // GET -> ./authorizations
  static GetAllAuthorizations = async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;

      const pageNumber = parseInt(page);
      const limitNumber = parseInt(limit);

      // Calcula o número de documentos para pular
      const skip = (pageNumber - 1) * limitNumber;

      const authorizations = await Authorizations.find()
        .skip(skip)
        .limit(limitNumber)
        .populate({
          path: "cliente",
          select: ["_id", "nome", "sobrenome"],
        })
        .populate("local")
        .populate({
          path: "especialidade",
          select: ["_id", "especialidade"],
        });

      if (authorizations.length > 0) {
        res.status(200).send({
          message: "Guias encontradas com sucesso.",
          results: authorizations,
        });
      } else {
        res.status(204).send(); // A requisição foi bem sucedida mas nenhum registro foi encontrado
      }
    } catch (err) {
      res.status(500).send({ message: "Erro interno no servidor", err: err });
    }
  };

  // GET -> ./authorizations/search (Busca com filtro)
  static GetAuthorizationsByQuerySearch = async (req, res) => {
    const urlParams = req.query;
    console.log(urlParams);

    try {
      const search = await HandleQuerySearch(req);
      const authorizations = await Authorizations.find(search, {})
        .populate({
          path: "cliente",
          select: ["_id", "nome"],
        })
        .populate("local")
        .populate({
          path: "especialidade",
          select: ["_id", "especialidade"],
        });

      res.status(200).send({
        message: "Clientes encontrados com sucesso.",
        results: authorizations,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // GET -> ./authorizations/:id
  static GetAuthorizationById = async (req, res) => {
    const id = req.params.id;

    try {
      const authorizations = await Authorizations.findById(id)
        .populate({
          path: "cliente",
          select: ["_id", "nome"],
        })
        .populate("local")
        .populate({
          path: "especialidade",
          select: ["_id", "especialidade"],
        });

      res.status(200).send({
        message: `Cliente de ID:(${id}) encontrado com sucesso.`,
        results: authorizations,
      });
    } catch (err) {
      res.status(500).send({
        message: `Erro interno no servidor.`,
        err: err,
      });
    }
  };

  // POST -> ./authorizations
  static AddNewAuthorization = async (req, res) => {
    const newAuthorization = new Authorizations(req.body);

    try {
      const authorization = await newAuthorization.save();
      res.status(200).send({
        message: "Guia gerada com sucesso",
        results: authorization,
      });
    } catch (err) {
      res.status(500).send({ message: "Erro interno no servidor", err: err });
    }
  };

  // PUT -> ./authorizations/:id
  // static UpdateAuthorization = async (req, res) => {
  //   const id = req.params.id;
  //   const lastUpdate = GetCurrentTimeObject();

  //   try {
  //     const updatedAuthorization = await Authorizations.findOneAndUpdate(
  //       { _id: id },
  //       { $set: { ...req.body, lastUpdate } },
  //       { new: true } // Puxa o novo item criado para este contexto
  //     );

  //     res.status(200).send({
  //       message: "Cliente cadastrado com successfully.",
  //       results: updatedAuthorization.toJSON(),
  //     });
  //   } catch (err) {
  //     res.status(500).send({
  //       message: `Erro interno no servidor.`,
  //       err: err,
  //     });
  //   }
  // };

  //DELETE -> ./authorizations
  static DeleteAuthorization = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
      await Authorizations.findByIdAndDelete(id);

      res.status(200).send({
        message: `Cliente de id:(${id}) removido com sucesso.`,
        results: { oldId: id },
      });
    } catch (err) {
      res.status(500).send({ message: "Erro interno no servidor", err: err });
    }
  };
}
