import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

const ModalForm = ({ show, handleClose, handleSubmit, values, handleChange, mode }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
      <Modal.Title>{mode === "edit" ? "Edit Transaction" : "Add Transaction"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Enter Transaction Name"
              value={values.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formAmount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              name="amount"
              type="number"
              placeholder="Enter your Amount"
              value={values.amount}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSelect">
            <Form.Label>Category</Form.Label>
            <Form.Select
              name="category"
              value={values.category}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Groceries">Groceries</option>
              <option value="Rent">Rent</option>
              <option value="Salary">Salary</option>
              <option value="Tip">Tip</option>
              <option value="Food">Food</option>
              <option value="Medical">Medical</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              placeholder="Enter Description"
              value={values.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSelect1">
            <Form.Label>Transaction Type</Form.Label>
            <Form.Select
              name="transactionType"
              value={values.transactionType}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="credit">Credit</option>
              <option value="expense">Expense</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalForm;
