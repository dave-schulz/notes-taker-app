import { RequestHandler } from 'express';
import NoteModel from '../models/note.model';

export const getNotesHandler: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteHandler: RequestHandler = async (req, res, next) => {
  try {
    const noteId = req.params.noteId;
    const note = await NoteModel.findById(noteId).exec();
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

export const createNotesHandler: RequestHandler = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const newNote = await NoteModel.create({
      title,
      description,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
