import express from 'express';
import multer from 'multer';
import { getAllImages, addComment, likeImage,  getImageById, getLikes, getComments, searchImages, downloadImage} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';




const router= express.Router();


router.get('/images/search', searchImages);
router.get('/images', getAllImages);
router.get('/images/:id',  getImageById);
router.post('/images/:id/comments', addComment);
router.get('/images/:id/comments', getComments);
router.post('/images/:id/likes',  likeImage);
router.get('/images/:id/likes', getLikes);
router.get('/images/:id/download', downloadImage);

export default router;