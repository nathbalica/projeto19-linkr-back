import { userDataDB } from "../repositories/users.repository.js";


export async function getUserData(req, res) {
    const { userId } = res.locals;

    try {
        const { rows: [user] } = await userDataDB(userId)
        res.status(200).send(user)
    } catch (err) {
        res.status(500).send(err.message);
    }

}

