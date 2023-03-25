import { NoteModel } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchNotes(): Promise<NoteModel[]> {
  const response = await fetchData("/api/notes", {
    method: "GET",
  });
  return response.json();
}

export interface NoteInput {
  title: string;
  description?: string;
}

export async function createNotes(note: NoteInput): Promise<NoteModel> {
  const response = await fetchData("/api/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  return response.json();
}

export async function deleteNote(noteId: string) {
  await fetchData("/api/notes/" + noteId, {
    method: "DELETE",
  });
}

export async function updateNote(
  noteId: string,
  noteInput: NoteInput
): Promise<NoteModel> {
  const response = await fetchData("/api/notes/" + noteId, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noteInput),
  });
  return response.json();
}
