import { Modal } from "react-bootstrap";
import { UserInfo } from "../profile-view/user-info";

export const UserInfoModal = ({ show, onHide, user }) => {
  return (
    <Modal
      className="modal-blur"
      show={show}
      onHide={onHide}
      centered
    >
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title>Your Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserInfo user={user} />
        </Modal.Body>
      </div>
    </Modal>
  );
};
