import React, { useContext, useState } from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import { Context } from '../../modules/Context';

function AddFavoriteCity({ weatherData }) {
  // Backend URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const { userLogin } = useContext(Context);

  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleClose = () => {
    setShow(false);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleShow = () => setShow(true);

  const favoriteCity = {
    cityId: weatherData?.id || '',
    userId: userLogin?._id || ''
  };

  const handleFavoriteCitySubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch(`${API_URL}/api/favorites/add-favorite-city`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(favoriteCity),
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const message = data?.message || data || 'Failed to add favorite city';
        throw new Error(message);
      }

      if (typeof data === 'string' && data.includes("already in the user's favorite list")) {
        setErrorMessage('City is already in your favorite list.');
        setTimeout(() => {
          handleClose()
        }, 3000)
        return;
      }

      setSuccessMessage('City successfully added to favorites!');
      setTimeout(() => {
        handleClose();
      }, 3000)
    } catch (error) {
      setErrorMessage(error.message || 'An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

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
        dialogClassName='custom-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Favorite City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Alert messages */}
          {errorMessage && (
            <Alert variant="warning" className="text-center">
              {errorMessage}
            </Alert>
          )}
          {successMessage && (
            <Alert variant="success" className="text-center">
              {successMessage}
            </Alert>
          )}

          {/* Weather city info */}
          <div className='p-4'>
            <p className='fs-4 fw-bold text-light'>Id: {weatherData.id}</p>
            <p className='fs-4 fw-bold text-light'>City: {weatherData.name}</p>
            <p className='fs-4 fw-bold text-light'>
              Country: {weatherData.sys.country}
            </p>
            <p className='fs-4 fw-bold text-light'>
              Coord. lon.: {weatherData.coord.lon}
            </p>
            <p className='fs-4 fw-bold text-light'>
              Coord. lat.: {weatherData.coord.lat}
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className='btn__close'
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className='btn__save'
            onClick={handleFavoriteCitySubmit}
            disabled={isLoading || errorMessage || successMessage}
          >
            {isLoading ? 'Adding city...' : 'Save city'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFavoriteCity;

