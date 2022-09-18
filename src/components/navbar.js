/*eslint-disable react-hooks/exhaustive-deps*/
import { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../App.css";
import { showNotification } from "../utils/showNotification";

function Navbartop(props) {
  const [flag, setFlag] = useState(false);
  const [loginText, setLoginText] = useState("");

  useEffect(() => {
    setLoginText(
      localStorage.getItem("meruwell_token") ? "Sign Out" : "Sign In"
    );
  }, [flag, props]);

  const logout = () => {
    localStorage.removeItem("meruwell_token");
    setFlag(!flag);
    showNotification("Signed Out Successfully", "success");
  };

  const login = () => {
    setFlag(!flag);
    props.setLoginShow(true);
    // history("/login");
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark" className="py-3">
        <Container>
          <Navbar.Brand href="/products">MeruWell</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="text-end">
              <Nav.Link href="/">
                <i className="fas fa-home me-2"></i>Home
              </Nav.Link>
              <Nav.Link href="/cart">
                <i className="fas fa-cart-plus me-2"></i>Cart
              </Nav.Link>
              <Navbar.Text
                className="ps-2"
                style={{ cursor: "pointer" }}
                onClick={loginText === "Sign In" ? login : logout}
              >
                <i
                  className="fas fa-power-off me-2"
                  style={loginText === "Sign In" ? {} : { color: "red" }}
                ></i>
                {loginText}
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navbartop;
