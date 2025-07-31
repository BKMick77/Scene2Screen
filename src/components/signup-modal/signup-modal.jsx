import { Modal } from "react-bootstrap";
import { SignupView } from "../signup-view/signup-view";

export const SignupModal = ({ show, onHide, onLoginClick }) => (
  <Modal
    show={show}
    onHide={onHide}
    backdrop="static"
    keyboard={false}
    centered
  >
    <Modal.Header>
      <Modal.Title>Sign Up</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <SignupView onLoginClick={onLoginClick} />
    </Modal.Body>
  </Modal>
);
