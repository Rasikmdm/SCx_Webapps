import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import handleSaveData from '../pages/CopySubsTax'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "./Api"

const AddDataFormTax = ({ show, handleSaveData, handleClose, editData, fetchDataAndSetState }) => {
  // const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(editData || {
    "data_source":"",
    "subscription_id":"",
    "sc_id":"",
    "address_scid":"",
    "Tax_id":"",
    "tax_classification":"",
    "missing_values":"",
    "processing_status":"",
	  "updated_by": ""
  }); //initialize formData with editData if provided

  useEffect(() => {
    // If we are editing existing data, populate the form with that data
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Check if any field is empty
    let isEmpty = false;
    for (const key in formData) {
      if (formData[key] === '') {
        isEmpty = true;
        break;
      }
    }

    if (isEmpty) {
      toast.info('Please fill all the fields', { position: toast.POSITION.TOP_CENTER })
    } else {
      if (editData) {
        // If editing existing data
        handleEditData(formData);
        setFormData({});
      } else {
        // If adding new data
        handleSaveData(formData);
        setFormData({});
      }
      handleClose();
      toast.success('Data saved successfully !', { position: toast.POSITION.TOP_CENTER });
    }
  };

  const handleEditData = async (data) => {
    try {
      // Make the PUT request to update existing data
      const response = await fetch(`https://t2635htwi8.execute-api.us-east-1.amazonaws.com/scx-dq-rem/dspdqremedition/${editData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Data updated successfully!');
      } else {
        // Handle error response
        console.error('Failed to update data:', response.status);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{formData.id ? 'Edit Data' : 'Add Data'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="DATA_SOURCE">
            <Form.Label>DATA_SOURCE:</Form.Label>
            <Form.Control type="text" name="DATA_SOURCE" value={formData.DATA_SOURCE || ''} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="subscription_id">
            <Form.Label>SUBSCRIPTION_ID:</Form.Label>
            <Form.Control type="number" name="subscription_id" value={formData.subscription_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="sc_id">
            <Form.Label>SCID:</Form.Label>
            <Form.Control type="text" name="sc_id" value={formData.sc_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="scx_id">
            <Form.Label>SCX ID:</Form.Label>
            <Form.Control type="text" name="scx_id" value={formData.scx_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tax_id">
            <Form.Label>TAX_ID:</Form.Label>
            <Form.Control type="text" name="tax_id" value={formData.tax_id} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="tax_classifications">
            <Form.Label>TAX_CLASSIFICATIONS:</Form.Label>
            <Form.Control type="text" name="tax_classifications" value={formData.tax_classifications} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="missing_values">
            <Form.Label>MISSING_VALUES:</Form.Label>
            <Form.Control type="text" name="missing_values" value={formData.missing_values} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="processing_status">
            <Form.Label>PROCESSING_STATUS:</Form.Label>
            <Form.Control type="text" name="processing_status" value={formData.processing_status} onChange={handleChange} />
          </Form.Group>
          <Form.Group controlId="updated_by">
            <Form.Label>AUTHOR:</Form.Label>
            <Form.Control type="text" name="updated_by" value={formData.updated_by} onChange={handleChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} >
          {formData.id ? 'Save Changes' : 'Save Data'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDataFormTax;