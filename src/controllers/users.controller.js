import { userDataDB } from "../repositories/users.repository.js";

export async function getUserData(req, res) {
    const { user_id } = res.locals;

    try {
        const {
            rows: [user],
        } = await userDataDB(user_id);
        res.status(200).send(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
