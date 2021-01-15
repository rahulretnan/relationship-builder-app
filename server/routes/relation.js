import express from 'express';
import { getRelations,createRelation,checkRelations} from '../controllers/relation.js'

const router = express.Router();



router.get('/',getRelations);
router.post('/',createRelation);
router.post('/check',checkRelations);

export default router;