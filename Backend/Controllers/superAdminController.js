// controllers/superAdminController.js
const SuperAdmin = require('../Models/SuperAdmin');
const Admin =require('../Models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AdminPermission = require('../Models/AdminPermission');
const PermissionRequest = require('../Models/PermissionRequest');

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await SuperAdmin.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Super Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await SuperAdmin.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Super Admin created', newAdmin });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await SuperAdmin.findOne({ where: { email } });
    if (!admin) return res.status(404).json({ message: 'Super Admin not found' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin.id, role: 'superadmin' }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ message: 'Login successful', token, admin });
  } catch (err) {
    res.status(500).json({ message: 'Login error', error: err.message });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({ name, email, password: hashed });
    res.json({ message: 'Admin created successfully', data: newAdmin });
  } catch (err) {
    res.status(500).json({ error: 'Admin creation failed', details: err.message });
  }
};

exports.grantAccess = async (req, res) => {
  try {
    const { adminId, moduleName } = req.body;

    // Insert into permissions
    await AdminPermission.create({ adminId, moduleName });

    // Update request status
    await PermissionRequest.update(
      { status: 'approved' },
      { where: { adminId, moduleName, status: 'pending' } }
    );

    res.json({ message: `Access granted for module ${moduleName}` });
  } catch (err) {
    res.status(500).json({ message: 'Grant access failed', error: err.message });
  }
};