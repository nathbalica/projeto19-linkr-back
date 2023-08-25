import { db } from "../database/database.connection.js";

export async function createUserDB(username, email, password, profile_image) {
    const result = await db.query(
        `INSERT INTO users (username, email, password, profile_image) VALUES ($1, $2, $3, $4) RETURNING *`,
        [username, email, password, profile_image]
    );
    return result.rows[0];
}

export async function getEmailUserDB(email) {
    const result = await db.query(`SELECT * FROM users WHERE email = $1`, [
        email,
    ]);
    return result;
}

export async function getUserData(user_id) {
    const query = `
    SELECT
        username,
        profile_image
    FROM
        users
    WHERE
        id=$1
    `;
    const result = await db.query(query, [user_id]);
    return result.rows[0];
}

export async function getUserPosts(user_id, user_requesting) {
    const postsQuery = `
    SELECT
        p.id,
        p.content,
        p.link,
        p.created_at,
        u.id AS user_id,
        u.username,
        u.profile_image,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count,
        EXISTS (SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS liked,
        p.user_id = $1 AS owned,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count,
        (SELECT COUNT(*) FROM reposts r WHERE r.post_id = p.id) AS repost_count,
        FALSE AS repost,
        NULL AS repost_by_me,
        NULL AS reposter_username
        FROM
            posts p
        JOIN
            users u ON p.user_id = u.id
        LEFT JOIN
            likes l ON p.id = l.post_id
        LEFT JOIN
            comments c ON p.id = c.post_id
        LEFT JOIN
            reposts r ON p.id = r.post_id
    GROUP BY
        p.id, u.id
    ORDER BY
        p.created_at DESC
    `;
    const posts = await db.query(postsQuery, [user_requesting, user_id]);

    const repostsQuery = `
    SELECT
        p.id,
        p.content,
        p.link,
        COALESCE(r.created_at, p.created_at) AS created_at,
        u.id AS user_id,
        u.username,
        u.profile_image,
        (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count,
        EXISTS (SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS liked,
        p.user_id = $1 AS owned,
        (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count,
        (SELECT COUNT(*) FROM reposts r WHERE r.post_id = p.id) AS repost_count,
        TRUE AS repost,
        CASE WHEN r.user_id = $1 THEN true ELSE false END AS repost_by_me,
        rp.username AS reposter_username
    FROM
        posts p
    JOIN
        reposts r ON p.id = r.post_id
    JOIN
        users u ON p.user_id = u.id
    LEFT JOIN
        likes l ON p.id = l.post_id
    LEFT JOIN
        comments c ON p.id = c.post_id
    LEFT JOIN
        users rp ON r.user_id = rp.id
    GROUP BY
        p.id, u.id, rp.username, r.created_at
    ORDER BY
        created_at DESC
    `;
    const reposts = await db.query(repostsQuery, [user_requesting, user_id]);
    const result = [...posts.rows, ...reposts.rows];
    result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return result;
}

export async function getTimelineDB(user_id, limit) {
    try {
        const postsQuery = `
        SELECT
            p.id,
            p.content,
            p.link,
            p.created_at,
            u.id AS user_id,
            u.username,
            u.profile_image,
            (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count,
            EXISTS (SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS liked,
            p.user_id = $1 AS owned,
            (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count,
            (SELECT COUNT(*) FROM reposts r WHERE r.post_id = p.id) AS repost_count,
            FALSE AS repost,
            NULL AS repost_by_me,
            NULL AS reposter_username
            FROM
                posts p
            JOIN
                users u ON p.user_id = u.id
            LEFT JOIN
                likes l ON p.id = l.post_id
            LEFT JOIN
                comments c ON p.id = c.post_id
            LEFT JOIN
                reposts r ON p.id = r.post_id
        GROUP BY
            p.id, u.id
        ORDER BY
            p.created_at DESC
        `;
        const posts = await db.query(postsQuery, [user_id]);

        const repostsQuery = `
        SELECT
            p.id,
            p.content,
            p.link,
            COALESCE(r.created_at, p.created_at) AS created_at,
            u.id AS user_id,
            u.username,
            u.profile_image,
            (SELECT COUNT(*) FROM likes l WHERE l.post_id = p.id) AS like_count,
            EXISTS (SELECT 1 FROM likes WHERE post_id = p.id AND user_id = $1) AS liked,
            p.user_id = $1 AS owned,
            (SELECT COUNT(*) FROM comments c WHERE c.post_id = p.id) AS comments_count,
            (SELECT COUNT(*) FROM reposts r WHERE r.post_id = p.id) AS repost_count,
            TRUE AS repost,
            CASE WHEN r.user_id = $1 THEN true ELSE false END AS repost_by_me,
            rp.username AS reposter_username
        FROM
            posts p
        JOIN
            reposts r ON p.id = r.post_id
        JOIN
            users u ON p.user_id = u.id
        LEFT JOIN
            likes l ON p.id = l.post_id
        LEFT JOIN
            comments c ON p.id = c.post_id
        LEFT JOIN
            users rp ON r.user_id = rp.id
        GROUP BY
            p.id, u.id, rp.username, r.created_at, r.user_id
        ORDER BY
            created_at DESC
        `;
        const reposts = await db.query(repostsQuery, [user_id]);
        const result = [...posts.rows, ...reposts.rows];
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        return result;
    } catch (error) {
        console.error("Error fetching timeline:", error);
        throw error;
    }
}

export async function getPost(user_id, post_id) {
    try {
        const query = `
        SELECT
            p.id,
            p.content,
            p.link,
            COALESCE(r.created_at, p.created_at) AS created_at,
            u.id AS user_id,
            u.username,
            u.profile_image,
            CASE WHEN r.user_id IS NOT NULL THEN rp.username ELSE u.username END AS reposter_username,
            COUNT(l.post_id) AS like_count,
            CASE WHEN l.user_id = $1 THEN true ELSE false END AS liked,
            CASE WHEN p.user_id = $1 THEN true ELSE false END AS owned,
            COALESCE(c.comments_count, 0) as comments_count,
            COUNT(r.post_id) AS repost_count
        FROM
            posts p
        JOIN
            users u ON p.user_id = u.id
        LEFT JOIN
            likes l ON p.id = l.post_id
        LEFT JOIN (
            SELECT post_id, COUNT(*) AS comments_count
            FROM comments
            GROUP BY post_id
        ) c ON p.id = c.post_id
        LEFT JOIN reposts r ON p.id = r.post_id
        LEFT JOIN users rp ON r.user_id = rp.id
        WHERE
            p.id = $2
        GROUP BY
            p.id, p.user_id, u.id, u.username, rp.username, rp.id, l.user_id, c.comments_count, r.created_at, r.user_id
        `;
        const result = await db.query(query, [user_id, post_id]);
        return result.rows[0];
    } catch (error) {
        console.error("Error fetching post:", error);
        throw error;
    }
}

export async function searchUsers(query) {
    try {
        const result = await db.query(
            "SELECT id, username, profile_image FROM users WHERE username ILIKE $1",
            [`%${query}%`]
        );
        return result.rows;
    } catch (error) {
        console.error("Error searching users:", error);
        throw error;
    }
}
