import { Button, Form, InputGroup } from "react-bootstrap";

function InputSearch({ handleSubmitSearch, search, handleSearch }) {
  return (
    <Form onSubmit={handleSubmitSearch}>
      <InputGroup className="input__search mb-3">
        <Form.Control
          type="search"
          placeholder="example: Rome, it"
          aria-label="City Search"
          aria-describedby="search"
          value={search}
          onChange={handleSearch}
        />
        <InputGroup.Text id="search">
          <Button className="btn__search" type="submit">
            <i className="bi bi-search"></i>
          </Button>
        </InputGroup.Text>
      </InputGroup>
      <p className="fw-bold text-white">Please enter the city name and country code, separated by a comma.</p>
    </Form>
  );
};

export default InputSearch;