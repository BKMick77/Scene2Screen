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
        <Modal.Title style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="s2s-logo">S2S</div>
          <p className="mt-4">Sign Up</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SignupView onLoginClick={onLoginClick} />
      </Modal.Body>
    </div>
  </Modal>
);
