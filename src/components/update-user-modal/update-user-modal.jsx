import { Modal } from "react-bootstrap";
import { UpdateUser } from "../profile-view/update-user";

export const UpdateUserModal = ({ show, onHide, user, token, setUser }) => {

  return (
    <Modal
      className="modal-blur"
      show={show}
      onHide={onHide}
      centered
    >
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <div className="s2s-logo">S2S</div>
            <p className="mt-4">Update Info</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateUser user={user} token={token} setUser={setUser} />
        </Modal.Body>
      </div>
    </Modal>
  );
};
