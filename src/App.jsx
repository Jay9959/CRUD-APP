import './App.css'
import React, { useState } from "react";
import { Container, Table, Button, Modal, Form, Alert } from "react-bootstrap";

const App = () => {
  const [storage, setPatient] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    fname: "",
    lname: "",
    age: "",
    DOB: "",
    gender: "",
    height: "",
    weight: "",
    contact: "",
    email: "",
    password: "",
    address: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPatient = () => {
    if (!validateForm()) return;

    if (editingPatient) {

      setPatient((prev) =>
        prev.map((emp) => (emp.id === formData.id ? formData : emp))
      );
    } else {
      setPatient((prev) => [
        ...prev,
        { ...formData, id: Date.now().toString() },
      ]);
    }
    setShowModal(false);
    setFormData({ id: "", fname: "", lname: "", age: "", DOB: "", gender: "", height: "", weight: "", contact: "", email: "", password: "", address: "" });
    setEditingPatient(null);
    resetForm();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fname.trim()) newErrors.fname = "First name is required.";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required.";
    if (!formData.age || isNaN(formData.age) || formData.age <= 0)
      newErrors.age = "Please enter a valid age.";
    if (!formData.DOB) newErrors.DOB = "Date of birth is required.";
    if (!formData.gender) newErrors.gender = "Gender selection is required.";
    if (!formData.blood) newErrors.blood = "Blood Group selection is required.";
    if (!formData.height || isNaN(formData.height) || formData.height <= 0)
      newErrors.height = "Please enter a valid height.";
    if (!formData.weight || isNaN(formData.weight) || formData.weight <= 0)
      newErrors.weight = "Please enter a valid weight.";
    if (
      !formData.contact ||
      isNaN(formData.contact) ||
      formData.contact.length < 10
    )
      newErrors.contact = "Please enter a valid 10-digit contact number.";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email.";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters.";
    if (!formData.address.trim())
      newErrors.address = "Address is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleEdit = (Patient) => {
    setFormData(Patient);
    setEditingPatient(Patient);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setPatient((prev) => prev.filter((emp) => emp.id !== id));
  };

  const resetForm = () => {
    setFormData({
      id: "",
      fname: "",
      lname: "",
      age: "",
      DOB: "",
      blood: "",
      gender: "",
      height: "",
      weight: "",
      contact: "",
      email: "",
      password: "",
      address: "",
    });
    setEditingPatient(null);
    setErrors({});
    setShowModal(false);
  };


  return (
    <>
      <h2 className="text-center py-5">Patient Patient Enrollment Form</h2>
      <Container className="mt-4">
        <Button onClick={() => setShowModal(true)} className="mb-3 button-30">
          Add Patient
        </Button>


        <Table>
          <thead className='text-center'>
            <tr>
              <th className='rounded-start-3'>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Age</th>
              <th>DOB</th>
              <th>Blood</th>
              <th>Gender</th>
              <th>Height</th>
              <th>Weight</th>
              <th>Contact No</th>
              <th>E-mail</th>
              <th>Password</th>
              <th>Address</th>
              <th className='rounded-end-3'>#</th>
            </tr>
          </thead>
          <tbody>
            {storage.map((Patient, index) => (
              <tr key={Patient.id}>
                <td>{index + 1}</td>
                <td>{Patient.fname}</td>
                <td>{Patient.lname}</td>
                <td>{Patient.age}</td>
                <td>{Patient.DOB}</td>
                <td>{Patient.Blood}</td>
                <td>{Patient.gender}</td>
                <td>{Patient.height}</td>
                <td>{Patient.weight}</td>
                <td>{Patient.contact}</td>
                <td>{Patient.email}</td>
                <td>{Patient.password}</td>
                <td>{Patient.address}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(Patient)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(Patient.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal className='bg-light' show={showModal} onHide={() => setShowModal(false)}>

          <Modal.Header closeButton>
            <Modal.Title>
              {editingPatient ? "Edit Patient" : "Add Patient"}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>

            <Form>

              <Form.Group className="mb-3">
                <Form.Label>Fast Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                  isInvalid={!!errors.fname}
                  placeholder="Enter Frist Name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.fname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={formData.lname}
                  onChange={handleInputChange}
                  isInvalid={!!errors.lname}
                  placeholder="Enter Last Name"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.lname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="numder"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  isInvalid={!!errors.age}
                  placeholder="Enter The age"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.age}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  name="DOB"
                  value={formData.DOB}
                  onChange={handleInputChange}
                  isInvalid={!!errors.DOB}
                  placeholder="Enter The Bridh Date"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.DOB}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label column sm="2">Blood :</Form.Label>
                <Form.Select aria-label="Default select example" isInvalid={!!errors.Blood} value={formData.blood} name="blood" onChange={handleInputChange}>
                  <option>Select Department</option>
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="O-">O-</option>
                  <option value="AB-">AB-</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Gender</Form.Label>
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleInputChange}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleInputChange}
                />
                {errors.gender && (
                  <Alert variant="danger" className="mt-2">
                    {errors.gender}
                  </Alert>
                )}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Height</Form.Label>
                <Form.Control
                  type="numder"
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  isInvalid={!!errors.height}
                  placeholder="Enter The Height"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.height}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Weight</Form.Label>
                <Form.Control
                  type="numder"
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  isInvalid={!!errors.weight}
                  placeholder="Enter The Weight"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.weight}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contact No</Form.Label>
                <Form.Control
                  type="numder"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  isInvalid={!!errors.contact}
                  placeholder="Enter Contact"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.contact}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  isInvalid={!!errors.email}
                  placeholder="Enter The Emial"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  isInvalid={!!errors.password}
                  placeholder="Enter The Password"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  isInvalid={!!errors.address}
                  placeholder="Enter Address"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.address}
                </Form.Control.Feedback>
              </Form.Group>

            </Form>

          </Modal.Body>

          <Modal.Footer>
            <Button className='button-89' onClick={handleAddPatient}>
              {editingPatient ? "Update Patient" : "Add Patient"}
            </Button>
            <Button className='button-19' onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>

        </Modal>

      </Container>
    </>
  );
};

export default App;