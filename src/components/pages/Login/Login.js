import React from "react";
import { Row, Col, Form, Button, Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login() {
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
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="primary" type="submit">
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
