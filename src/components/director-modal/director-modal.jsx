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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', width: '75%' }}>
            {director?.Image && (
              <img
                src={director.Image}
                alt={director.Name}
                style={{
                  height: '12rem',
                  width: '12rem',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  objectPosition: 'center 7%',
                  flexShrink: 0.5
                }}
              />
            )}
            <div>
              <h2 className="fs-2 mb-1">{director?.Name}</h2>
              <p className="fs-5 text-muted mb-0">(b. {director?.Birth})</p>
            </div>
          </div>
        </Modal.Header>        <Modal.Body className="fs-5">
          <p style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
            {director?.Bio}
          </p>
        </Modal.Body>
      </div>
    </Modal>
  );
};
