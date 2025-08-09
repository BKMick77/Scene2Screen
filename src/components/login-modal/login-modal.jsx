import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';

export const LoginModal = ({ show, onHide, onLoggedIn, onSignupClick }) => {
  const navigate = useNavigate();

  const handleSignup = () => {
    onHide();
    navigate('/signup');
  };

  return (
    <Modal
      className="modal-blur"
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <div className="modal-content">
        <Modal.Header>
          <Modal.Title
            style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          >
            <div className="s2s-logo">S2S</div>
            <p className="mt-4">Login</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginView
            onLoggedIn={onLoggedIn}
            onSignupClick={onSignupClick || handleSignup}
          />
        </Modal.Body>
      </div>
    </Modal>
  );
};
