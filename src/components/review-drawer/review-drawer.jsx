import { Offcanvas } from "react-bootstrap";

const ReviewDrawer = ({ show, handleClose, movie }) => {

  return (

    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="bottom"
      className="custom-height custom-offcanvas"
    >

      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Reviews of {movie?.Title}</Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="fs-4" style={{ textAlign: "center" }}><p>User review section under development.</p><p>Shipping soon!</p></Offcanvas.Body>
    </Offcanvas>
  );
};

export default ReviewDrawer;
