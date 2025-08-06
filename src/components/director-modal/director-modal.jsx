import { Modal } from "react-bootstrap";

export const DirectorModal = ({ show, onHide, director }) => {

  return (
    <Modal
      className="modal-blur"
      show={show}
      onHide={onHide}
      centered
    >
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <p className="fs-3">{director?.Name}</p>
            <p className="fs-5">(b. {director?.Birth})</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="fs-5">
          <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
            {director?.Bio}
          </p>
        </Modal.Body>
      </div>
    </Modal>
  );
};
