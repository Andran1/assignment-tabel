import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import styles from "./navMenu.module.css";

export default function NavMenu() {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark" style={{display:"flex", justifyContent:"space-between",alignItems:"center"}}>
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
              <NavLink  to="/conta">
                hello
              </NavLink>
            </Nav>
            <div style={{width:"100px", display:"flex", justifyContent:"space-between",alignItems:"center"}}>
              <NavLink  to="/login">
                Log In
              </NavLink>
              <NavLink  to="/register">
                Sin In
              </NavLink>
            </div>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}
