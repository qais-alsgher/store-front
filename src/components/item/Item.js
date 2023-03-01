import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import { AiFillHeart } from "react-icons/ai";
import "./item.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Comment from "./Comment";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ModalEditeItem from "./ModalEditeItem";

function Item() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    axios.get(`http://localhost:8080/items/${id}`).then((res) => {
      setItem(res.data);
    });
  }, [id]);

  const handlAddToWishList = (id) => {
    const data = {
      userId: user.userInfo.id,
      itemId: id,
    };
    axios
      .post(`http://localhost:8080/favorite`, data)
      .then((res) => {
        toast.success("Item added to favorite list");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.mes);
      });
  };

  const handlAddToCart = (id) => {
    const data = {
      userId: user.userInfo.id,
      itemId: id,
      quantity: "1",
    };
    axios
      .post(`http://localhost:8080/cart`, data)
      .then((res) => {
        toast.success("Item added to cart");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.mes);
      });
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`http://localhost:8080/items/${id}`, {
        headers: {
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Item deleted successfully");
      })
      .catch((err) => {
        toast.error(err.mes);
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <div className="item-container">
        <Carousel className="item-image-carousel">
          {item.itemImage &&
            item.itemImage.map((item, index) => (
              <Carousel.Item key={index}>
                {item.startsWith("http") && (
                  <img className="d-block w-100" src={item} alt="First slide" />
                )}
                {!item.startsWith("http") && (
                  <img
                    className="d-block w-100 image-item"
                    src={`http://localhost:8080/${item.split("/").pop()}`}
                    alt="First slide"
                  />
                )}
              </Carousel.Item>
            ))}
        </Carousel>
        <div className="item-info">
          <div className="userNam-edite">
            <h2>{item.user && item.user.userName}</h2>
            {item.user && item.user.id === user.userInfo.id && (
              <div>
                <AiFillEdit
                  className="edite-item"
                  onClick={() => {
                    handleShow();
                  }}
                />
                <AiFillDelete
                  className="delete-item"
                  onClick={() => {
                    handleDeleteItem(item.id);
                  }}
                />
              </div>
            )}
          </div>
          <h3>{item.itemTitle}</h3>
          <p>{item.itemDescription}</p>
          <div className="item-pricing">
            <h5>${item.price}</h5>
            <div>
              <AiFillHeart
                className="heart"
                onClick={() => {
                  handlAddToWishList(item.id);
                }}
              />
              <button
                className="button-glo"
                onClick={() => {
                  handlAddToCart(item.id);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Comment itemComments={item.Comments} itemId={item.id} />
      <ToastContainer />
      <ModalEditeItem show={show} handleClose={handleClose} item={item} />
    </Container>
  );
}

export default Item;
