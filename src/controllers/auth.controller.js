import { createUserDB, getEmailUserDB } from "../repositories/users.repository.js";
import { createSessionDB } from "../repositories/sessions.repository.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signUp(req, res) {
    const { name, email, password} = req.body;

    try{
        const user = await getEmailUserDB(email)
        if(user.rowCount !== 0) return res.status(409).send({message: "Email já existe"})

        const hash = bcrypt.hashSync(password, 10)
        await createUserDB(name, email, hash)

        res.sendStatus(201)
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try{
        const user = await getEmailUserDB(email)
        if(user.rowCount === 0) return res.status(401).send({message: "Email não existe!"})

        const verifyPassword = bcrypt.compareSync(password, user.rows[0].password)
        if (!verifyPassword) return res.status(401).send({ message: "Senha inválida!" })

        const token = uuid()
        await createSessionDB(user.rows[0].id, token)

        res.status(200).send({ token: token })
    }catch(err){
        res.status(500).send(err.message);
    }
}










