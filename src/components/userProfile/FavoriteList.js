import React from "react";
import Card from "react-bootstrap/Card";
import { AiFillHeart } from "react-icons/ai";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import axios from "axios";
function FavoriteList(props) {
  const handelRemoveFav = (id) => {
    axios
      .delete(`http://localhost:8080/favorite/${id}`)
      .then((res) => {
        toast.success("Item removed from favorite list");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.mes);
      });
  };

  return (
    <Container>
      <div className="items-card">
        {props.favorite.map((item, index) => (
          <Card style={{ width: "18rem" }} key={index}>
            {item.Item.itemImage[0].startsWith("http") && (
              <Card.Img src={item.Item.itemImage[0]} />
            )}

            {!item.Item.itemImage[0].startsWith("http") && (
              <Card.Img
                src={`http://localhost:8080/${item.Item.itemImage[0]
                  .split("/")
                  .pop()}`}
              />
            )}
            <Card.Body>
              <Card.Title className="text-start">
                {item.Item.itemTitle}
              </Card.Title>
              <Card.Text className="text-start">
                {item.Item.itemDescription}
              </Card.Text>
              <div className="d-flex justify-content-between align-self-center">
                <Card.Text className="text-start fw-bold align-self-center">
                  ${item.Item.price}
                </Card.Text>
                <AiFillHeart
                  className="heart-fav"
                  onClick={() => handelRemoveFav(item.id)}
                />
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <ToastContainer />
    </Container>
  );
}

export default FavoriteList;
