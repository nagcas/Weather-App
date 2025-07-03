import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

function AddFavoriteCity({ weatherData }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log(weatherData)

  return (
    <>
      <Button 
        className='btn__add__favorite' 
        onClick={handleShow}
      >
        Add Favorite
      </Button>

      <Modal 
        size='lg'
        show={show} 
        onHide={handleClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Favorite City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='p-4'>
            <p className='fs-4 fw-bold text-light'>Id: {weatherData.id}</p>
            <p className='fs-4 fw-bold text-light'>City: {weatherData.name}</p>
            <p className='fs-4 fw-bold text-light'>Country: {weatherData.sys.country}</p>
            <p className='fs-4 fw-bold text-light'>Coord. lon.: {weatherData.coord.lon}</p>
            <p className='fs-4 fw-bold text-light'>Coord. lat.: {weatherData.coord.lat}</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn__close' onClick={handleClose}>
            Close
          </Button>
          <Button className='btn__save' onClick={handleClose}>
            Save City
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFavoriteCity;
