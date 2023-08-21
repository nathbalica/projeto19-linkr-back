import {
    createHashtag,
    getHashtagIdByName,
    getTrendingHashtags,
    addPostHashtags,
    getPostsByHashtag,
} from "../repositories/hashtags.repository.js";

export async function createPostHashtags(post_id, hashtags) {
    try {
        const hashtagIds = [];
        for (const hashtag of hashtags) {
            const normalizedHashtag = hashtag.toLowerCase();
            let hashtagId = await getHashtagIdByName(normalizedHashtag);
            if (!hashtagId) {
                hashtagId = await createHashtag(normalizedHashtag);
            }
            hashtagIds.push(hashtagId);
        }
        await addPostHashtags(post_id, hashtagIds);
    } catch (error) {
        console.error("Error creating post hashtags:", error);
        throw error;
    }
}

export async function getTrendingHashtagsController(req, res) {
    try {
        const hashtags = await getTrendingHashtags();
        res.json(hashtags);
    } catch (error) {
        console.error("Error fetching trending hashtags:", error);
        res.status(500).json({ error: "An error occurred" });
    }
}

export async function getPostsByHashtagController(req, res) {
    const hashtag = req.params.hashtag;
    try {
        const posts = await getPostsByHashtag(hashtag);
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error in getPostsByHashtagController:", error);
        res.sendStatus(500);
    }
}
