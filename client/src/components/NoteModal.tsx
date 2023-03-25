import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { NoteModel } from '../models/note';
import { NoteInput } from '../network/notes_api';
import * as NotesApi from '../network/notes_api';
import TextInputField from './form/TextInputField';

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
      title: noteToEdit?.title || '',
      description: noteToEdit?.description || '',
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
        <Modal.Title>{noteToEdit ? 'Edit Note' : 'Add Note'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="title"
            label="Title"
            type="text"
            placeholder="Title"
            register={register}
            registerOptions={{ required: 'Required' }}
            error={errors.title}
          />
          <TextInputField
            name="description"
            label="Description"
            as="textarea"
            rows={5}
            placeholder="Description"
            register={register}
          />
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
