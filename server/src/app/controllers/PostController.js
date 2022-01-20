//require model
const Post = require('../models/Post');
class PostController {

    //[GET]/posts
    async getPosts(req, res) {
        try {
            const posts = await Post.find({ user: req.userId }).populate('user', ['username'])
            res.json({ success: true, posts })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'error from the server! Inernal error' });
        }
    }

    //[POST]/posts/create
    async create(req, res) {
        const { title, description, url, status } = req.body;

        //simple validation
        if (!title) {
            return res.status(400).json({ success: false, message: "title is required" });
        }
        try {
            console.log("url post", url);
            const newPost = new Post({ title, description, url: (url.startsWith("https://") ? url : `https://${url}`), status: status || "TO LEARN", user: req.userId });

            await newPost.save();

            res.json({ success: true, message: "Happy learning!", post: newPost });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'error from the server! Inernal error' });
        }
    }

    //[PUT]/posts/:id/update
    async update(req, res) {
        const { title, description, url, status } = req.body;
        //simple validation
        if (!title) {
            return res.status(400).json({ success: false, message: "title is required" });
        }
        try {
            let updatePost = {
                title,
                description,
                url: (url.startsWith("https://") ? url : `https://${url}`),
                status: status || "TO LEARN"
            }
            const postUpdateCondition = { _id: req.params.id, user: req.userId };

            updatePost = await Post.findOneAndUpdate(postUpdateCondition, updatePost, { new: true }) //new:true return updatedPost

            //user not authorised to update post or post not found
            if (!updatePost) {
                return res.status(400).json({ success: false, message: "post not found or user not authorised " })
            }

            res.json({ success: true, message: "exellent progress!", post: updatePost })

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'error from the server! Inernal error' });
        }
    }

    //[DELETE]/posts/:id/delete
    async delete(req, res) {
        try {
            const postDeleteCondition = { _id: req.params.id, user: req.userId }
            const deletePost = await Post.findOneAndDelete(postDeleteCondition, { new: true });
            //user not authorised to update post or post not found
            if (!deletePost) {
                return res.status(400).json({ success: false, message: "post not found or user not authorised " })
            }

            res.json({ success: true, message: "exellent progress!", post: deletePost })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: 'error from the server! Inernal error' });
        }
    }

}

module.exports = new PostController();