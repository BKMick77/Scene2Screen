import { Modal } from "react-bootstrap";
import { UpdateUser } from "../profile-view/update-user";

export const UpdateUserModal = ({ show, onHide, user, token, setUser }) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdateUser user={user} token={token} setUser={setUser} />
      </Modal.Body>
    </Modal>
  );
};
