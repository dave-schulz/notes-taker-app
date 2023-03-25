import { Card } from "react-bootstrap";
import { NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";
import { MdDelete } from "react-icons/md";

interface NoteProps {
  note: NoteModel;
  onNoteClicked: (note: NoteModel) => void;
  onDeleteNoteClicked: (note: NoteModel) => void;
}

const Note = ({ note, onDeleteNoteClicked, onNoteClicked }: NoteProps) => {
  const { title, description, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created " + formatDate(createdAt);
  }

  return (
    <Card onClick={() => onNoteClicked(note)}>
      <Card.Body>
        <Card.Title>
          {title}
          <MdDelete
            onClick={(e) => {
              onDeleteNoteClicked(note);
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Footer>{createdUpdatedText}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Note;
