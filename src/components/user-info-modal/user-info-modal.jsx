import { Modal } from 'react-bootstrap';
import { UserInfo } from '../profile-view/user-info';

export const UserInfoModal = ({ show, onHide, user }) => {
  return (
    <Modal className="modal-blur" show={show} onHide={onHide} centered>
      <div className="modal-content">
        <Modal.Header closeButton>
          <Modal.Title
            style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          >
            <div className="s2s-logo">S2S</div>
            <p className="mt-4">Your Info</p>
          </Modal.Title>
        </Modal.Header>

        <hr className="my-0" />

        <Modal.Body>
          <UserInfo user={user} />
        </Modal.Body>
      </div>
    </Modal>
  );
};
