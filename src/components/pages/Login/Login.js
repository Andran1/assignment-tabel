import React, { useState } from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./login.module.css";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  const handleSubmit = () => {
    const { email, password } = values;

    setErrors({
      email: email ? null : "email is required",
      password: password ? null : "password is required",
    });

    if (email && password) {
      console.log(values);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: null,
    });
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
                  Login
                </span>
              </div>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className={errors.email ? styles.invalid : ""}
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">{errors.email || ""}</Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className={errors.passwordS ? styles.invalid : ""}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                />
                 <Form.Text className="text-danger">{errors.password ?errors.password : ""}</Form.Text>
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Login
                </Button>
              </div>
              <Link to="/register">
                <Card.Text>Don't have account yet? Register now </Card.Text>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
