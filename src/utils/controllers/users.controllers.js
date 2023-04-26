import bcrypt from "bcrypt";
import db from "../../firebase.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export const userRegister = async (req, res) => {
  const { nombre, apellido, email, telefono, contraseña } = req.body;
  const user = db.collection("usuarios");
  const doc = await user.where("email", "==", email).get();
  if (!nombre || !apellido || !email || !contraseña) {
    res.status(400).send("Missing data");
  }
  if (!doc.empty) {
    res.status(400).send("Email registered");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(contraseña, 10);
      await db.collection("usuarios").add({
        nombre,
        apellido,
        email,
        telefono,
        contraseña: hashedPassword,
      });
      res.status(200).send("User created successfully");
    } catch (error) {
      res.send(error);
    }
  }
};

export const userLogin = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    const user = db.collection("usuarios");
    const doc = await user.where("email", "==", email).get();
    if (doc.empty) {
      res.status(400).send("User doesn't exist");
    } else {
      const firstDoc = doc.docs[0];
      const match = await bcrypt.compare(
        contraseña,
        doc.docs[0].data().contraseña
      );
      if (match) {
        const userId = firstDoc.id;
        const token = jwt.sign({ id: userId }, process.env.JWT_KEY);
        res.json({ auth: true, token, id: userId });
      } else {
        res.status(400).send("Incorrect password");
      }
    }
  } catch (error) {
    res.send(error);
  }
};

export const getUser = async (req, res) => {
  const id = req.params;
  try {
    const user = db.collection("usuarios").doc(id);
    const doc = await user.get();
    console.log(doc.docs[0])
  } catch (error) {
    res.send(error);
  }
};
