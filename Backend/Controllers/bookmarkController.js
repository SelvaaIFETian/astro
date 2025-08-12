// const Bookmark = require('../Models/Bookmark');
const Raasi = require('../Models/Raasi');
const Star = require('../Models/Star');
const Laknam =require('../Models/Laknam');
const Join = require('../Models/Join'); // Adjust the path as needed
const ThreeJoin = require('../Models/ThreeJoin');
const Sin = require('../Models/Sin');
const Thosham = require('../Models/Thosham');
const Bookmark = require('../Models/Bookmark');
const BookmarkSlot = require('../Models/BookmarkSlot');
const BookmarkPost = require('../Models/BookmarkPost');



const modelMap = {
  laknam: Laknam,
  raasi: Raasi,
  star: Star,
  join: Join,
  sin: Sin,
  thosham: Thosham
  
};
// Create Bookmark with 12 slots
exports.createBookmark = async (req, res) => {
  try {
    const { name } = req.body;
    const bookmark = await Bookmark.create({ name });

    // Auto-create 12 slots
    const slots = [];
    for (let i = 1; i <= 12; i++) {
      slots.push({ slotNumber: i, bookmarkId: bookmark.id });
    }
    await BookmarkSlot.bulkCreate(slots);

    res.status(201).json({ message: "Bookmark created with 12 slots", bookmark });
  } catch (error) {
    res.status(500).json({ message: "Error creating bookmark", error: error.message });
  }
};

// Add post to a slot (max 6)
exports.addPostToSlot = async (req, res) => {
  try {
    const { slotId, tableName, tableRecordId } = req.body;

    const count = await BookmarkPost.count({ where: { bookmarkSlotId: slotId } });
    if (count >= 6) {
      return res.status(400).json({ message: "This slot already has 6 posts" });
    }

    const post = await BookmarkPost.create({ bookmarkSlotId: slotId, tableName, tableRecordId });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error adding post to slot", error: error.message });
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

exports.getPostFromBookmark = async (req, res) => {
  try {
    const bookmark = await BookmarkPost.findByPk(req.params.id);

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    const model = modelMap[bookmark.tableName.toLowerCase()];
    if (!model) {
      return res.status(400).json({ message: `Unknown table: ${bookmark.tableName}` });
    }

    const post = await model.findByPk(bookmark.tableRecordId);
    if (!post) {
      return res.status(404).json({ message: "Post not found in linked table" });
    }

    res.json({
      bookmarkId: bookmark.id,
      bookmarkName: bookmark.name,
      post
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving post", error: error.message });
  }
};

exports.getAllBookmarks = async (req, res) => {
  try {
    const bookmarks = await BookmarkPost.findAll();
    res.json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookmarks", error: error.message });
  }
};


exports.getSlotsByBookmarkId = async (req, res) => {
  try {
    const { bookmarkId } = req.params;

    const bookmark = await BookmarkPost.findByPk(bookmarkId);
    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    const slots = await BookmarkSlot.findAll({ where: { bookmarkId } });

    // Fetch related posts for each slot
    const slotData = await Promise.all(slots.map(async (slot) => {
      const model = modelMap[slot.tableName.toLowerCase()];
      const post = model ? await model.findByPk(slot.tableRecordId) : null;
      return {
        slotId: slot.id,
        tableName: slot.tableName,
        tableRecordId: slot.tableRecordId,
        post
      };
    }));

    res.json({
      bookmarkId,
      bookmarkName: bookmark.name,
      slots: slotData
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching slots", error: error.message });
  }
};
