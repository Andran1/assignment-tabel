import { Navbar, Nav, Container, Row,Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./navMenu.module.css";

export default function NavMenu() {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark">
            <Nav className={styles.navBar}>
              <NavLink activeClassName={styles.active} exact to="/">
                Home
              </NavLink>
              <NavLink activeClassName={styles.active} exact to="/about">
                About
              </NavLink>
              <NavLink activeClassName={styles.active} exact to="/contact">
                Contact
              </NavLink>
            </Nav>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}
