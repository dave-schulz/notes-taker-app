import express from 'express';
import * as NotesController from '../controllers/notes.contoler';

const router = express.Router();

router.get('/', NotesController.getNotesHandler);
router.get('/:noteId', NotesController.getNoteHandler);

router.post('/', NotesController.createNotesHandler);

export default router;
