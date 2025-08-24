import { Spinner } from 'react-bootstrap';

export default function Loading({ dimension }) {
  return (
    <Spinner
      animation='border'
      role='status'
      size={dimension}
    >
      <span className='visually-hidden'>Loading...</span>
    </Spinner>
  );
}
