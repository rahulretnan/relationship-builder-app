import express from 'express';
import { getPersons,createPerson} from '../controllers/person.js'

const router = express.Router();


router.get('/',getPersons);
router.post('/',createPerson);

export default router;