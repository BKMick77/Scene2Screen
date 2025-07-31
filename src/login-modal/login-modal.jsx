import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LoginView } from "../components/login-view/login-view";

export const LoginModal = ({ show, onHide, onLoggedIn, onSignupClick }) => {
  const navigate = useNavigate();

  const handleSignup = () => {
    onHide();
    navigate("/signup");
  };

  return (

    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Log In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LoginView
          onLoggedIn={onLoggedIn}
          onSignupClick={onSignupClick || handleSignup} />
      </Modal.Body>
    </Modal>
  );
};
