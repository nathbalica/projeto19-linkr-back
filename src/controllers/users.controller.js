import { getUserData, getUserPosts } from "../repositories/users.repository.js";
import { db } from "../database/database.connection.js";

// export async function getUserData(req, res) {
//     const { user_id } = res.locals;

//     try {
//         const {
//             rows: [user],
//         } = await userDataDB(user_id);
//         res.status(200).send(user);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// }

export async function getUserById(req, res) {
    const { user_id } = req.params;
    try {
        const user = await getUserData(user_id);
        const posts = await getUserPosts(user_id);
        const responseObj = {
            ...user,
            posts,
        };
        return res.json(responseObj);
    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        res.sendStatus(500);
    }
}

export async function getTimeline(req, res) {
    const { user_id } = res.locals;
    try {
        const query = `
            SELECT
                p.content,
                p.link,
                p.created_at,
                u.username,
                u.profile_image,
                COALESCE(SUM(CASE WHEN l.user_id = $1 THEN 1 ELSE 0 END), 0) AS like_count,
                CASE WHEN l.user_id = $1 THEN true ELSE false END AS liked
            FROM
                posts p
            JOIN
                users u ON p.user_id = u.id
            LEFT JOIN
                likes l ON p.id = l.post_id
            WHERE
                p.user_id IN (
                    SELECT following_id FROM user_following WHERE follower_id = $1
                )
            GROUP BY
                p.id, u.username, u.profile_image, l.user_id
            ORDER BY
                p.created_at DESC;
        `;
        const result = await db.query(query, [user_id]);
        const timeline = result.rows;
        return res.json(timeline);
    } catch (error) {
        console.error("Erro ao gerar timeline:", error);
        res.sendStatus(500);
    }
}
