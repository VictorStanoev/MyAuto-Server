const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { adController, postController } = require('../controllers');

// middleware that is specific to this router

router.get('/', adController.getAds);
router.get('/search', adController.searchAd);
router.get('/myads', auth(), adController.getAdsByUserId);

router.post('/', auth(), adController.createAd);
router.post('/update/:adId',auth(),adController.updateAd);

router.get('/:adId', adController.getAd);
router.put('/:adId', auth(), adController.subscribe);
router.delete('/:adId',auth(),adController.deleteAd);

module.exports = router