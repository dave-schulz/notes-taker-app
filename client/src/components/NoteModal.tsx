import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { NoteModel } from "../models/note";
import { NoteInput } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";

interface NoteModalProps {
  noteToEdit?: NoteModel;
  onDismiss: () => void;
  onNoteSaved: (note: NoteModel) => void;
}

const AddNoteModal = ({
  noteToEdit,
  onDismiss,
  onNoteSaved,
}: NoteModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      description: noteToEdit?.description || "",
    },
  });

  async function onSubmit(input: NoteInput) {
    try {
      let noteResponse: NoteModel;

      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNotes(input);
      }
      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit Note" : "Add Note"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              isInvalid={!!errors.title}
              {...register("title", { required: "Required" })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Description"
              {...register("description")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button disabled={isSubmitting} type="submit" form="addNoteForm">
          Save Note
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNoteModal;
