const Bookmark = require('../Models/Bookmark');

// ➕ Create Bookmark
exports.createBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.create({
      bookmarkType: req.body.bookmarkType,
      name: req.body.name
    });
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ message: "Error creating bookmark", error: error.message });
  }
};

// 📄 Get All Bookmarks
exports.getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookmarks", error: error.message });
  }
};

// 🔍 Get Bookmarks by Type
exports.getBookmarksByType = async (req, res) => {
  try {
    const bookmarks = await Bookmark.findAll({ where: { bookmarkType: req.params.type } });
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookmarks", error: error.message });
  }
};

// 🗑 Delete Bookmark
exports.deleteBookmark = async (req, res) => {
  try {
    const bookmark = await Bookmark.findByPk(req.params.id);
    if (!bookmark) return res.status(404).json({ message: "Bookmark not found" });

    await bookmark.destroy();
    res.json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bookmark", error: error.message });
  }
};
