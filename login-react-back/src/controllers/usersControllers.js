import { UserModel } from "../models/user";
import { createPasswordHash } from "../services/auth";
class UsersControllers {
  async index(req, res) {
    try {
      const users = await UserModel.findAll();
      return res.json(users);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async show(req, res) {
    try{
        const { id } = req.params;
        const user = await UserModel.findOne({where: {
            id: id,
        }})
        if (!user) {
            return res.status(404).json();
        }

        return res.status(201).json(user);
    } catch(err) {
        console.error(err)
        return res.status(500).json({ error: "internal server error."});
    }
  }
  async create(req, res) {
    try {
      const { nome, email, senha } = req.body;
      const user = await UserModel.findOne({ where: { email: email } });
      if (user) {
        return res
          .status(422)
          .json({ message: `User ${email} already exists.` });
      }
      // criptografia de password
      const encryptedPassord = await createPasswordHash(senha);

      const newUser = await UserModel.create({
        nome,
        email,
        senha: encryptedPassord,
      });
      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error." });
    }
  }
  async update(req, res) {
    try{
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const user = await UserModel.findOne({where: {
            id: id,
        }})
        if (!user) {
            return res.status(404).json();
        }
        const encryptedPassord = await createPasswordHash(senha);
        await user.update({nome, email, encryptedPassord});
        return res.status(200).json();

    } catch(err) {
        console.error(err)
        return res.status(500).json({ error: "internal server error."});
    }
  }

  async destroy(req, res) {
    try{
        const { id } = req.params;
        const { nome, email, senha } = req.body;
        const user = await UserModel.findOne({where: {
            id: id,
        }})
        if (!user) {
            return res.status(404).json();
        }
        await user.destroy();
        return res.status(200).json();

    } catch(err) {
        console.error(err)
        return res.status(500).json({ error: "internal server error."});
    }
  }

}

export default new UsersControllers();
