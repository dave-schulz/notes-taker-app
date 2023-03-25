import { Container } from 'react-bootstrap';
import NotesPageLoggedInView from '../components/NotesPageLoggedInView';
import NotesPageLoggedOutView from '../components/NotesPageLoggedOutView';
import { UserModel } from '../models/user';

interface NotesPageProps {
  loggedInUser: UserModel | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <Container>
      <>
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </>
    </Container>
  );
};

export default NotesPage;
