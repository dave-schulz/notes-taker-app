import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import NoteModel from '../models/note.model';
import { assertIsDefined } from '../util/assertIsDefined';

export const getNotesHandler: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.session;

    assertIsDefined(userId);

    const notes = await NoteModel.find({ userId }).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNoteHandler: RequestHandler = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { userId } = req.session;

    assertIsDefined(userId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    if (!note.userId.equals(userId)) {
      throw createHttpError(401, 'You do not have permission');
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title?: string;
  description?: string;
}

export const createNotesHandler: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { userId } = req.session;

    assertIsDefined(userId);

    if (!title) {
      throw createHttpError(400, 'Note must have a title');
    }

    const newNote = await NoteModel.create({
      userId,
      title,
      description,
    });
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title?: string;
  description?: string;
}

export const updateNotesHandler: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const { title: newTitle, description: newDescription } = req.body;
    const { userId } = req.session;

    assertIsDefined(userId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    if (!newTitle) {
      throw createHttpError(400, 'Note must have a title');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(400, 'Note not found');
    }

    if (!note.userId.equals(userId)) {
      throw createHttpError(401, 'You do not have permission');
    }

    note.title = newTitle;
    note.description = newDescription;

    const savedNote = await note.save();
    res.status(200).json(savedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNoteHandler: RequestHandler = async (req, res, next) => {
  try {
    const { noteId } = req.params;

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(400, 'Note not found');
    }

    await note.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
