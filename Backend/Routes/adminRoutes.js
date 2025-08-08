const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const {authenticateAdmin} =require('../Middleware/adminMiddleware');


router.post('/login', adminController.login);

// Routes for Raasi Posts
router.post('/raasi', authenticateAdmin, adminController.createRaasiPost);
router.delete('/raasi/:postId', authenticateAdmin, adminController.deleteRaasiPost);
router.put('/raasi/:postId', authenticateAdmin, adminController.updateRaasiPost);
router.get('/raasi', adminController.getAllRaasiPosts);
router.get('/raasi/post/:postId', adminController.getRaasiPostByPostId);
router.get('/raasi/raasi/:raasiId', adminController.getRaasiPostsByRaasiId);


router.post('/star', authenticateAdmin, adminController.createStarPost);
router.delete('/star/:postId', authenticateAdmin, adminController.deleteStarPost);
router.put('/star/:postId', authenticateAdmin, adminController.updateStarPost);
router.get('/star', adminController.getAllStarPosts);
router.get('/star/post/:postId', adminController.getStarPostByPostId);
router.get('/star/star/:starId', adminController.getStarPostsByStarId);

router.post('/laknam', authenticateAdmin, adminController.createLaknamPost);
router.delete('/laknam/:postId', authenticateAdmin, adminController.deleteLaknamPost);
router.put('/laknam/:postId', authenticateAdmin, adminController.updateLaknamPost);
router.get('/laknam', adminController.getAllLaknamPosts);
router.get('/laknam/post/:postId', adminController.getLaknamPostByPostId);
router.get('/laknam/laknam/:laknamId', adminController.getLaknamPostsByLaknamId);


router.post('/join', authenticateAdmin, adminController.createJoinPost);
router.get('/join', adminController.getAllJoinPosts);
router.get('/join/post/:postId', adminController.getJoinPostByPostId);
router.get('/join/join/:JoinId', adminController.getJoinPostsByJoinId);
router.put('/join/:postId', authenticateAdmin, adminController.updateJoinPost);
router.delete('/join/:postId', authenticateAdmin, adminController.deleteJoinPost);

// Routes for threeJoin
router.post('/threejoin', authenticateAdmin, adminController.createThreeJoinPost);
router.get('/threejoin', adminController.getAllThreeJoinPosts);
router.get('/threejoin/post/:postId', adminController.getThreeJoinPostByPostId);
router.get('/threejoin/threejoin/:threeJoinId', adminController.getThreeJoinPostsByThreeJoinId);
router.put('/threejoin/:postId', authenticateAdmin, adminController.updateThreeJoinPost);
router.delete('/threejoin/:postId', authenticateAdmin, adminController.deleteThreeJoinPost);

// routes/adminRoutes.js
router.post('/sin', authenticateAdmin, adminController.createSinPost);
router.get('/sin', adminController.getAllSinPosts);
router.get('/sin/post/:postId', adminController.getSinPostByPostId);
router.get('/sin/sin/:sinId', adminController.getSinPostsBySinId);
router.put('/sin/:postId', authenticateAdmin, adminController.updateSinPost);
router.delete('/sin/:postId', authenticateAdmin, adminController.deleteSinPost);


router.post('/thosham',authenticateAdmin,  adminController.createThosham);
router.get('/thosham',authenticateAdmin,  adminController.getAllThosham);
router.get('/thosham/:id',authenticateAdmin,  adminController.getThoshamById);
router.put('/thosham/:id',authenticateAdmin,  adminController.updateThosham);
router.delete('/thosham/:id',authenticateAdmin,  adminController.deleteThosham);

module.exports = router;
