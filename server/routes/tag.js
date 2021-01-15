import express from 'express';
import { getTags,createTag, updateTag} from '../controllers/tag.js'

const router = express.Router();


router.get('/',getTags);
router.post('/',createTag);
router.patch('/:id',updateTag);

export default router;