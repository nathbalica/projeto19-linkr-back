import {
    createUserDB,
    getEmailUserDB,
} from "../repositories/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export async function signUp(req, res) {
    const { username, email, password, profile_image } = req.body;

    try {
        const user = await getEmailUserDB(email);
        if (user.rowCount !== 0)
            return res.status(409).send({ message: "Email já existe" });

        const hash = bcrypt.hashSync(password, 10);
        await createUserDB(username, email, hash, profile_image);

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        const user = await getEmailUserDB(email);
        if (user.rowCount === 0)
            return res.status(401).send({ message: "Email não existe!" });

        const verifyPassword = bcrypt.compareSync(
            password,
            user.rows[0].password
        );
        if (!verifyPassword)
            return res.status(401).send({ message: "Senha inválida!" });

        const token = jwt.sign({ user_id: user.rows[0].id }, JWT_SECRET);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        console.log(user.rows[0].profile_image);
        res.status(200).send({
            token: token,
            profile_image: user.rows[0].profile_image,
        });
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function logout(req, res) {
    res.clearCookie("token");
    res.sendStatus(200);
}
