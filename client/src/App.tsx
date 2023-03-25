import { useEffect, useState } from "react";
import { Col, Container, Button } from "react-bootstrap";
import AddNoteModal from "./components/AddNoteModal";
import Note from "./components/Note";
import { NoteModel } from "./models/note";
import * as NodesApi from "./network/notes_api";

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const notes = await NodesApi.fetchNotes();
        setNotes(notes);
      } catch (error) {
        console.log(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <Container>
      <Button onClick={() => setShowAddNoteModal(true)}>Add new note</Button>

      {notes.map((note) => (
        <Col key={note._id}>
          <Note note={note} />
        </Col>
      ))}

      {showAddNoteModal && (
        <AddNoteModal
          onDismiss={() => setShowAddNoteModal(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteModal(false);
          }}
        />
      )}
    </Container>
  );
}

export default App;
