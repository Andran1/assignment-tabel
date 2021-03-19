import React, { useState } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Register() {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: null,
    surname: null,
    email: null,
    password: null,
    confirmPassword: null,
  });

  const handleSubmit = (props) => {
    const { name, surname, email, password, confirmPassword } = values;
    let valid = true;
    let passwordMessage = null;


    if (!confirmPassword) {
      passwordMessage = "Password  is required";
      valid = false;
    } else if (password !== confirmPassword) {
      passwordMessage = "Password  didn't match";
      valid = false;
    }

    setErrors({
      name: name ? null : "name is required ",
      surname:surname? null :"surname is required",
      email: email ? null : "email is required",
      password: password ? null : "password is required",
      confirmPassword: passwordMessage
    });

    if(valid){
       props.register(values)
    }
  };

  const handleChange = ({ target: { name, value } }) => {
   setValues({
       ...values,
       [name]:value
   })
   setErrors({
       ...errors,
       [name]:null
   })
  
  };

  return (
    <div style={{ width: "400px", margin: " 0 auto" }}>
      <Container>
        <Row>
          <Col>
            <Form style={{ marginTop: "250px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "30px",
                }}
              >
                <span style={{ fontSize: "24px", fontWeight: "700" }}>
                  Register
                </span>
              </div>
              <Form.Group controlId="formBasicEmail">
                <Form.Control 
                type="text" 
                placeholder="Enter your name" 
                name="name"
                value={values.name}
                onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="text"
                  placeholder="Enter your Password"
                  name="surname"
                  value={values.surname}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control 
                type="email"
                 placeholder="Enter email" 
                 name="email"
                 value={values.email}
                 onChange={handleChange}

                 />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                 type="text"
                 placeholder="Password" 
                 name="password"
                 value={values.password}
                 onChange={handleChange}
                 
                 />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <Form.Control 
                type="email" 
                placeholder=" confirm password" 
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}

                />
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button 
                variant="primary"
                 type="submit"
                 onClick={handleSubmit}
                 >
                  Register
                </Button>
              </div>
              <Link to="/login">
                <Card.Text>Don't have account yet? Register now </Card.Text>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
