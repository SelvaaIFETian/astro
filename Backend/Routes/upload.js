const express = require('express');
const router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const XLSX = require('xlsx');
const Post = require('../Models/Post'); // Replace with your Post model

// POST /upload
router.post('/upload', async (req, res) => {
  const form = new formidable.IncomingForm({ multiples: false });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing file' });
    }

    const file = files.excel;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    try {
      const workbook = XLSX.readFile(file.filepath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      // Loop and insert each post
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (row.title && row.content) {
          await Post.create({
            title: row.title,
            content: row.content,
            category: row.category || 'General'
          });
        }
      }

      return res.status(200).json({ message: 'Posts created successfully' });
    } catch (error) {
      console.error('Upload error:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
});

module.exports = router;
