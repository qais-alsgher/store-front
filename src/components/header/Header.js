import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/actions/authAction";
import { Link } from "react-router-dom";
function Header() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">CartStore</Navbar.Brand>
          <Nav className="d-flex justify-content-end">
            <Nav.Link href={user.isAuth ? "/cart" : "/login"}>
              <AiOutlineShoppingCart className="fs-4" />
            </Nav.Link>
            <Nav.Link href={user.isAuth ? "/user" : "/login"}>
              <AiOutlineUser className="fs-4" />
            </Nav.Link>
            {user.isAuth && (
              <button className="btn-auth" onClick={() => logout(dispatch)}>
                Logout
              </button>
            )}
            {!user.isAuth && (
              <Link to={"/login"} className="text-decoration-none text-dark ">
                <button className="btn-auth">Login</button>
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
