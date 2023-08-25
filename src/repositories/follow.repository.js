// users.repository.js (ou onde você define as funções de acesso ao banco de dados dos usuários)
import { db } from "../database/database.connection.js";

export async function followUserDB(follower_id, following_id) {
    try {
        await db.query(
            `INSERT INTO user_following (follower_id, following_id) VALUES ($1, $2)`,
            [follower_id, following_id]
        );
    } catch (error) {
        console.error("Error following user in DB:", error);
        throw error;
    }
}

export async function unfollowUserDB(follower_id, following_id) {
    try {
        await db.query(
            `DELETE FROM user_following WHERE follower_id = $1 AND following_id = $2`,
            [follower_id, following_id]
        );
    } catch (error) {
        console.error("Error unfollowing user in DB:", error);
        throw error;
    }
}

export async function isUserFollowingDB(follower_id, following_id) {
    try {
        const result = await db.query(
            `SELECT * FROM user_following WHERE follower_id = $1 AND following_id = $2`,
            [follower_id, following_id]
        );
        return result.rowCount > 0; // Retorna true se existem registros, false caso contrário
    } catch (error) {
        console.error("Error checking following status in DB:", error);
        throw error;
    }
}
