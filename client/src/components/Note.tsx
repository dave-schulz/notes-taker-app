import { Card } from "react-bootstrap";
import { NoteModel } from "../models/note";
import { formatDate } from "../utils/formatDate";

interface NoteProps {
  note: NoteModel;
}

const Note = ({ note }: NoteProps) => {
  const { title, description, createdAt, updatedAt } = note;

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = "Updated " + formatDate(updatedAt);
  } else {
    createdUpdatedText = "Created " + formatDate(createdAt);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Footer>{createdUpdatedText}</Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default Note;
