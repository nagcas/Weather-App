import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function DeleteFavorites({ city }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant='primary'
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Favorites</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleClose}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteFavorites;
