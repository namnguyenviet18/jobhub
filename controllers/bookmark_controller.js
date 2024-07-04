const Bookmark = require('../models/Bookmark');

module.exports = {
    createBookmark: async (req, res) => {
        const newBookmark = new Bookmark(req.body);

        try {

            const savedBookmark = await newBookmark.save();
            res.status(201).json("Bookmark successfully created");

        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    deleteBookmark: async (req, res) => {
        try {
            await Bookmark.findByIdAndDelete(req.params.id);
            res.status(200).json("Bookmark successfully deleted");
        } catch (err) {
            res.status(500).json(err.message);
        }
    },

    getBookmark: async (req, res) => {
        try {
            const bookmarks = await Bookmark.find({ userId: req.params.userId })
            res.status(200).json(bookmarks);
        } catch (err) {
            res.status(500).json(err.message);
        }
    }
}