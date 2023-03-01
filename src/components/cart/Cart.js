import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import "./cart.css";
function Cart() {
  const user = useSelector((state) => state.auth);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cart/${user.userInfo.id}`)
      .then((res) => {
        setCart(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.userInfo.id]);

  const handelRemoveItem = (id) => {
    axios
      .delete(`http://localhost:8080/cart/${id}`)
      .then((res) => {
        toast.success("Item removed from cart");
      })
      .catch((err) => {
        toast.error(err.mes);
      });
  };

  return (
    <Container>
      {/* table to display cart items and count totle */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Total</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr
              key={index}
              className="align-items-center  justify-content-center"
            >
              <td>
                {item.Item && item.Item.itemTitle}

                {item.Item && item.Item.itemImage[0].startsWith("http") && (
                  <img className="image-cart" src={item.Item.itemImage[0]} />
                )}

                {item.Item && !item.Item.itemImage[0].startsWith("http") && (
                  <img
                    className="image-cart"
                    src={`http://localhost:8080/${item.Item.itemImage[0]
                      .split("/")
                      .pop()}`}
                  />
                )}
              </td>
              <td>${item.Item && item.Item.price}</td>
              <td>{item.quantity}</td>
              {/* count the totle of all item price  */}
              <td>${item.Item && item.Item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handelRemoveItem(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </Container>
  );
}

export default Cart;
