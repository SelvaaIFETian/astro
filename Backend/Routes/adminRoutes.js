const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const { authenticateAdmin } = require('../Middleware/adminMiddleware');
const checkModulePermission = require('../Middleware/checkModulePermission'); // new middleware

// Admin Login
router.post('/login', adminController.login);
router.post(
  '/request-access',
  authenticateAdmin,           // ✅ This ensures req.adminId is set
  adminController.requestAccess
);

// ===== Raasi =====
router.post('/raasi',
  authenticateAdmin,  // ✅ sets req.admin
  (req, res, next) => {
    req.body.moduleName = 'Raasi';
    req.body.moduleId = req.body.raasiId; // ✅ required for permission check
    next();
  },
  checkModulePermission,
  adminController.createRaasiPost
);

router.delete('/raasi/:postId', authenticateAdmin, adminController.deleteRaasiPost);
router.put('/raasi/:postId', authenticateAdmin, adminController.updateRaasiPost);
router.get('/raasi', adminController.getAllRaasiPosts);
router.get('/raasi/post/:postId', adminController.getRaasiPostByPostId);
router.get('/raasi/raasi/:raasiId', adminController.getRaasiPostsByRaasiId);

// ===== Star =====
router.post('/star',
  authenticateAdmin,
  (req, res, next) => { req.body.moduleName = 'Star'; next(); },
  checkModulePermission,
  adminController.createStarPost
);
router.delete('/star/:postId', authenticateAdmin, adminController.deleteStarPost);
router.put('/star/:postId', authenticateAdmin, adminController.updateStarPost);
router.get('/star', adminController.getAllStarPosts);
router.get('/star/post/:postId', adminController.getStarPostByPostId);
router.get('/star/star/:starId', adminController.getStarPostsByStarId);

// ===== Laknam =====
router.post('/laknam',
  authenticateAdmin,
  (req, res, next) => { req.body.moduleName = 'Laknam'; next(); },
  checkModulePermission,
  adminController.createLaknamPost
);
router.delete('/laknam/:postId', authenticateAdmin, adminController.deleteLaknamPost);
router.put('/laknam/:postId', authenticateAdmin, adminController.updateLaknamPost);
router.get('/laknam', adminController.getAllLaknamPosts);
router.get('/laknam/post/:postId', adminController.getLaknamPostByPostId);
router.get('/laknam/laknam/:laknamId', adminController.getLaknamPostsByLaknamId);

// ===== Join =====
router.post('/join',
  authenticateAdmin,
  (req, res, next) => { req.body.moduleName = 'Join'; next(); },
  checkModulePermission,
  adminController.createJoinPost
);
router.get('/join', adminController.getAllJoinPosts);
router.get('/join/post/:postId', adminController.getJoinPostByPostId);
router.get('/join/join/:JoinId', adminController.getJoinPostsByJoinId);
router.put('/join/:postId', authenticateAdmin, adminController.updateJoinPost);
router.delete('/join/:postId', authenticateAdmin, adminController.deleteJoinPost);

// ===== ThreeJoin =====
router.post('/threejoin',
  authenticateAdmin,
  (req, res, next) => { req.body.moduleName = 'ThreeJoin'; next(); },
  checkModulePermission,
  adminController.createThreeJoinPost
);
router.get('/threejoin', adminController.getAllThreeJoinPosts);
router.get('/threejoin/post/:postId', adminController.getThreeJoinPostByPostId);
router.get('/threejoin/threejoin/:threeJoinId', adminController.getThreeJoinPostsByThreeJoinId);
router.put('/threejoin/:postId', authenticateAdmin, adminController.updateThreeJoinPost);
router.delete('/threejoin/:postId', authenticateAdmin, adminController.deleteThreeJoinPost);

// ===== Sin =====
router.post('/sin',
  authenticateAdmin,
  (req, res, next) => { req.body.moduleName = 'Sin'; next(); },
  checkModulePermission,
  adminController.createSinPost
);
router.get('/sin', adminController.getAllSinPosts);
router.get('/sin/post/:postId', adminController.getSinPostByPostId);
router.get('/sin/sin/:sinId', adminController.getSinPostsBySinId);
router.put('/sin/:postId', authenticateAdmin, adminController.updateSinPost);
router.delete('/sin/:postId', authenticateAdmin, adminController.deleteSinPost);

// ===== Thosham =====
router.post('/thosham',
  authenticateAdmin,
  (req, res, next) => { req.body.moduleName = 'Thosham'; next(); },
  checkModulePermission,
  adminController.createThosham
);
router.get('/thosham', authenticateAdmin, adminController.getAllThosham);
router.get('/thosham/:id', authenticateAdmin, adminController.getThoshamById);
router.put('/thosham/:id', authenticateAdmin, adminController.updateThosham);
router.delete('/thosham/:id', authenticateAdmin, adminController.deleteThosham);

module.exports = router;
