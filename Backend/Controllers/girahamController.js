const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const Giraham = require('../Models/Giraham');

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

// 📥 Bulk Upload
exports.bulkUploadGiraham = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const adminId = req.admin.id; // from middleware auth

    // Parse Excel
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (!sheetData || sheetData.length === 0) {
      return res.status(400).json({ message: "Excel file is empty" });
    }

    // Validate & prepare records
    const records = sheetData.map(row => ({
      girahamId: row.girahamId,
      description: row.description,
      adminId: adminId
    }));

    // Insert into DB
    const girahams = await Giraham.bulkCreate(records);

    res.status(201).json({
      message: "Giraham bulk upload successful",
      count: girahams.length,
      girahams
    });

  } catch (error) {
    res.status(500).json({
      message: "Error processing Excel file",
      error: error.message
    });
  }
};
