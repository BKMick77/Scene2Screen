import { Modal } from "react-bootstrap";
import { UserInfo } from "../profile-view/user-info";

export const UserInfoModal = ({ show, onHide, user }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Your Info</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserInfo user={user} />
      </Modal.Body>
    </Modal>
  );
};
