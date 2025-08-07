import { Modal, Button } from "react-bootstrap";

export const DeleteAccountModal = ({ show, onHide, onConfirm }) => (

  <Modal
    className="modal-blur"
    show={show}
    onHide={onHide}
    centered>


    <div className="modal-content">
      <Modal.Header closeButton>
        <Modal.Title style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <div className="s2s-logo">S2S</div>
          <p className="mt-4">Delete Account</p>
        </Modal.Title>

      </Modal.Header>

      <hr className="my-0" />

      <Modal.Body>
        <p>Are you sure you want to delete your account?</p>
        <p>This action <strong style={{ textDecoration: 'underline' }}>cannot be undone!</strong></p>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between mt-4">
        <Button variant="outline-primary" onClick={onHide}>Cancel</Button>
        <Button variant="outline-danger" onClick={onConfirm}>Delete Account</Button>
      </Modal.Footer>
    </div>

  </Modal>
);
