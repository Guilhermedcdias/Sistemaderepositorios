import { RepositorioModel } from "../models/repositorios";
import { UserModel } from "../models/user";
import { createPasswordHash } from "../services/auth";
import { Op } from "sequelize";
class RepositoriosControllers {
  async index(req, res) {
    try {
      const { user_id } = req.params;
      const { q } = req.query;
      const user = await UserModel.findOne({
        where: {
          id: user_id,
        },
      });
      if (!user) {
        return res.status(404).json();
      }
      if (q) {
        const quer = `%${q}%`;
        const repos = await RepositorioModel.findAll({
          where: {
            user_id: user_id,
            nome: {
              [Op.like]: quer,
            },
          },
        });
        if (!repos) {
          return res
            .status(404)
            .json({ message: "Não foram encontrados repositórios!" });
        }
        return res.json(repos);
      } else {
        const repos = await RepositorioModel.findAll({
          where: {
            user_id: user_id,
          },
        });
        if (!repos) {
          return res
            .status(404)
            .json({ message: "Não foram encontrados repositórios!" });
        }
        return res.json(repos);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async create(req, res) {
    try {
      const { user_id } = req.params;
      const user = await UserModel.findOne({
        where: {
          id: user_id,
        },
      });
      if (!user) {
        return res.status(404).json();
      }
      const { nome, url } = req.body;
      const repo = await RepositorioModel.findOne({
        where: { url: url, user_id: user_id },
      });
      if (repo) {
        return res
          .status(422)
          .json({ message: `Repository ${nome} already exists.` });
      }

      const newrepo = await RepositorioModel.create({
        nome,
        url,
        user_id,
      });
      return res.status(201).json(newrepo);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  async destroy(req, res) {
    try {
      const { user_id, id } = req.params;
      const user = await UserModel.findOne({
        where: {
          id: user_id,
        },
      });
      if (!user) {
        return res.status(404).json();
      }
      const repo = await RepositorioModel.findOne({
        where: { id: id, user_id: user_id },
      });
      if (!repo) {
        return res.status(404).json();
      }

      await repo.destroy();
      return res.status(200).json();
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
}

export default new RepositoriosControllers();
