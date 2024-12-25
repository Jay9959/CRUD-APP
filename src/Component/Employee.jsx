import './Employee.css'
import { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const getLocalData = () => {
    return JSON.parse(localStorage.getItem("Hospiter")) || []
}

const Emplyoee = () => {
    const intial = {
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
    }

    const [inputForm, setInputForm] = useState(intial);
    const [isEdit, setIsEdit] = useState(false);
    const [storage, setStorage] = useState(getLocalData());
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = () => setShow(true);

    const handelChanged = (e) => {
        const { name, value } = e.target;
        setInputForm({
            ...inputForm,
            [name]: value
        })
    }

    const validateForm = () => {
        const newErrors = {};
        if (!inputForm.fname.trim()) newErrors.fname = "First name is required.";
        if (!inputForm.lname.trim()) newErrors.lname = "Last name is required.";
        if (!inputForm.age || isNaN(inputForm.age) || inputForm.age <= 0)
            newErrors.age = "Please enter a valid age.";
        if (!inputForm.DOB) newErrors.DOB = "Date of birth is required.";
        if (!inputForm.gender) newErrors.gender = "Gender selection is required.";
        if (!inputForm.height || isNaN(inputForm.height) || inputForm.height <= 0)
            newErrors.height = "Please enter a valid height.";
        if (!inputForm.weight || isNaN(inputForm.weight) || inputForm.weight <= 0)
            newErrors.weight = "Please enter a valid weight.";
        if (
            !inputForm.contact ||
            isNaN(inputForm.contact) ||
            inputForm.contact.length < 10
        )
            newErrors.contact = "Please enter a valid 10-digit contact number.";
        if (!inputForm.email || !/\S+@\S+\.\S+/.test(inputForm.email))
            newErrors.email = "Please enter a valid email.";
        if (!inputForm.password || inputForm.password.length < 6)
            newErrors.password = "Password must be at least 6 characters.";
        if (!inputForm.address.trim())
            newErrors.address = "Address is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handelSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (isEdit) {
            let updateData = storage.map((hop) => {
                if (hop.id == inputForm.id) {
                    return inputForm
                } else {
                    return hop;
                }
            });
            setStorage(updateData);
            setIsEdit(false);
        } else {
            let id = Math.floor(Math.random() * 10000)
            setStorage([...storage, { ...inputForm, id }])
        }
        setInputForm(intial)
    }

    const handelDelete = (id) => {
        let updateData = storage.filter((hop) => hop.id != id)
        setStorage(updateData)
    }

    const handelEdit = (id) => {
        let hospiter = storage.find((hop) => hop.id == id)
        setInputForm(hospiter)
        setIsEdit(true);
    }

    useEffect(() => {
        localStorage.setItem("Hospiter", JSON.stringify(storage));
    }, [storage]);

    return (
        <>
            <Container>

                <h2 className="text-center fw-bold mt-4">{isEdit ? "Edit" : "Add "} Patient Enrollment Form </h2>


                <Button variant="primary" className="button-63" onClick={handleShow}>
                    Add Items
                </Button>

                <Modal show={show} onHide={handleClose} className='bg-light'>
                    <Modal.Header closeButton>{isEdit ? "Edit" : "Add Patient"}</Modal.Header>
                    <Modal.Body>

                        <Form onSubmit={handelSubmit}>

                            <Form.Group className="mb-3">
                                <Form.Label>Fast Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="fname"
                                    value={inputForm.fname}
                                    onChange={handelChanged}
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
                                    value={inputForm.lname}
                                    onChange={handelChanged}
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
                                    value={inputForm.age}
                                    onChange={handelChanged}
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
                                    value={inputForm.DOB}
                                    onChange={handelChanged}
                                    isInvalid={!!errors.DOB}
                                    placeholder="Enter The Bridh Date"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.DOB}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Check
                                    type="radio"
                                    label="Male"
                                    name="gender"
                                    value="Male"
                                    checked={inputForm.gender === "Male"}
                                    onChange={handelChanged}
                                />
                                <Form.Check
                                    type="radio"
                                    label="Female"
                                    name="gender"
                                    value="Female"
                                    checked={inputForm.gender === "Female"}
                                    onChange={handelChanged}
                                />
                                {errors.gender && (
                                    <Alert variant="danger" className="mt-2">
                                        {errors.gender}
                                    </Alert>
                                )}
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label column sm="2">Blood :</Form.Label>
                                <Form.Select aria-label="Default select example" isInvalid={!!errors.Blood} value={inputForm.blood} name="blood" onChange={handelChanged}>
                                    <option>Select Department</option>
                                    <option value="Admin">A+</option>
                                    <option value="HR">B+</option>
                                    <option value="Tester">O+</option>
                                    <option value="Developer">AB+</option>
                                    <option value="Designer">A-</option>
                                    <option value="Designer">B-</option>
                                    <option value="Designer">O-</option>
                                    <option value="Designer">Ab-</option>
                                </Form.Select>

                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Height</Form.Label>
                                <Form.Control
                                    type="numder"
                                    name="height"
                                    value={inputForm.height}
                                    onChange={handelChanged}
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
                                    value={inputForm.weight}
                                    onChange={handelChanged}
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
                                    value={inputForm.contact}
                                    onChange={handelChanged}
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
                                    value={inputForm.email}
                                    onChange={handelChanged}
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
                                    value={inputForm.password}
                                    onChange={handelChanged}
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
                                    value={inputForm.address}
                                    onChange={handelChanged}
                                    isInvalid={!!errors.address}
                                    placeholder="Enter Address"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.address}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button type="submit" onClick={handleClose} className='button-89'>{isEdit ? "Update" : "Add"} Employee</Button>

                        </Form>

                    </Modal.Body>
                </Modal>

                <Table bordered>
                    <thead>
                        <tr>
                            <th className='rounded-start-3'>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>DOB</th>
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
                        {
                            storage.map((hop) => (
                                <tr>
                                    <td>{hop.id}</td>
                                    <td>{hop.fname}</td>
                                    <td>{hop.lname}</td>
                                    <td>{hop.age}</td>
                                    <td>{hop.DOB}</td>
                                    <td>{hop.gender}</td>
                                    <td>{hop.height}</td>
                                    <td>{hop.weight}</td>
                                    <td>{hop.contact}</td>
                                    <td>{hop.email}</td>
                                    <td>{hop.password}</td>
                                    <td>{hop.address}</td>
                                    <td>
                                        <Button onClick={() => handelEdit(hop.id)}>
                                            <FaEdit />
                                        </Button> ||
                                        <Button onClick={() => handelDelete(hop.id)} variant="danger">
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>

            </Container >
        </>
    )
};
export default Emplyoee;