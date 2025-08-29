const Giraham = require('../Models/Giraham');
const { IncomingForm } = require('formidable');
const XLSX = require('xlsx');

// ➕ Create Giraham
exports.createGiraham = async (req, res) => {
  try {
    const { girahamId, description } = req.body;
    const adminId = req.admin.id;

    const giraham = await Giraham.create({
      girahamId,     // ✅ foreign key / module ID
      description,   // ✅ content
      adminId        // ✅ who created it
    });

    res.status(201).json(giraham);
  } catch (error) {
    res.status(500).json({ 
      message: "Error creating Giraham", 
      error: error.message 
    });
  }
};


// 📄 Get All Giraham
exports.getAllGirahams = async (req, res) => {
  try {
    const girahams = await Giraham.findAll();
    res.json(girahams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Girahams", error: error.message });
  }
};

// 🔍 Get Single Giraham
exports.getGirahamById = async (req, res) => {
  try {
    const giraham = await Giraham.findByPk(req.params.id);
    if (!giraham) return res.status(404).json({ message: "Giraham not found" });
    res.json(giraham);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Giraham", error: error.message });
  }
};

// ✏️ Update Giraham
exports.updateGiraham = async (req, res) => {
  try {
    const giraham = await Giraham.findByPk(req.params.id);
    if (!giraham) return res.status(404).json({ message: "Giraham not found" });

    giraham.description = req.body.description || giraham.description;
    await giraham.save();
    res.json(giraham);
  } catch (error) {
    res.status(500).json({ message: "Error updating Giraham", error: error.message });
  }
};

// 🗑 Delete Giraham
exports.deleteGiraham = async (req, res) => {
  try {
    const giraham = await Giraham.findByPk(req.params.id);
    if (!giraham) return res.status(404).json({ message: "Giraham not found" });

    await giraham.destroy();
    res.json({ message: "Giraham deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Giraham", error: error.message });
  }
};


exports.bulkUploadGiraham = async (req, res) => {
  try {
    // ✅ Extract token from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: token missing" });
    }

    // ✅ Decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const adminId = decoded.id;  // store in DB

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // ✅ Convert Excel file to JSON
    const result = excelToJson({
      sourceFile: req.file.path,
      header: { rows: 1 },
      columnToKey: { A: "girahamId", B: "description" }
    });

    const girahamData = result.Sheet1;

    // ✅ Save to DB with adminId
    const girahams = await Giraham.bulkCreate(
      girahamData.map(row => ({
        girahamId: row.girahamId,
        description: row.description,
        adminId
      }))
    );

    fs.unlinkSync(req.file.path); // cleanup
    res.status(201).json({ message: "Bulk upload successful", girahams });
  } catch (error) {
    res.status(500).json({
      message: "Error processing Excel file",
      error: error.message
    });
  }
};




