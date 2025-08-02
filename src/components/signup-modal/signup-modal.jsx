import { Modal } from "react-bootstrap";
import { SignupView } from "../signup-view/signup-view";

export const SignupModal = ({ show, onHide, onLoginClick }) => (
  <Modal
    className="modal-blur"
    show={show}
    onHide={onHide}
    backdrop="static"
    keyboard={false}
    centered
  >

    <div className="modal-content">
      <Modal.Header>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignupView onLoginClick={onLoginClick} />
      </Modal.Body>
    </div>
  </Modal>
);
