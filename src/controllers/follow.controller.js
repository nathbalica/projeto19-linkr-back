// user.controller.js (ou onde você define os controladores dos usuários)
import { followUserDB, unfollowUserDB, isUserFollowingDB } from "../repositories/follow.repository.js";

export async function followUser(req, res) {
    const follower_id = res.locals.user_id;
    const following_id = parseInt(req.params.user_id);

    try {
        const alreadyFollowing = await isUserFollowingDB(follower_id, following_id);
        if (alreadyFollowing) {
            return res.status(400).json({ error: "You are already following this user" });
        }

        await followUserDB(follower_id, following_id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error following user:", error);
        res.sendStatus(500);
    }
}

export async function unfollowUser(req, res) {
    const follower_id = res.locals.user_id;
    const following_id = parseInt(req.params.user_id);

    try {
        await unfollowUserDB(follower_id, following_id);
        res.sendStatus(200);
    } catch (error) {
        console.error("Error unfollowing user:", error);
        res.sendStatus(500);
    }
}

export async function isFollowing(req, res) {
    const follower_id = res.locals.user_id;
    const following_id = parseInt(req.params.user_id);

    try {
        const result = await isUserFollowingDB(follower_id, following_id);
        if (result) {
            res.status(200).json({ isFollowing: true });
        } else {
            res.status(200).json({ isFollowing: false });
        }
    } catch (error) {
        console.error("Error checking following status:", error);
        res.sendStatus(500);
    }
}

