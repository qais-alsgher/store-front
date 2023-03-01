import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { Link } from "react-router-dom";
import "./items.css";

function CardItems() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/items").then((res) => {
      setItems(res.data);
    });
  }, []);

  return (
    <Container>
      <div className="items-card">
        {items.map((item, index) => (
          <Card style={{ width: "18rem" }} key={index}>
            {item.itemImage[0] && item.itemImage[0].startsWith("http") && (
              <Card.Img src={item.itemImage[0]} />
            )}

            {item.itemImage[0] && !item.itemImage[0].startsWith("http") && (
              <Card.Img
                src={`http://localhost:8080/${item.itemImage[0]
                  .split("/")
                  .pop()}`}
              />
            )}
            <Card.Body>
              <Card.Title className="text-start">{item.itemTitle}</Card.Title>
              <Card.Text className="text-start">
                {item.itemDescription}
              </Card.Text>
              <div className="d-flex justify-content-between align-self-center">
                <Card.Text className="text-start fw-bold align-self-center">
                  ${item.price}
                </Card.Text>
                <Button className="button-glo">
                  <Link
                    className="text-decoration-none text-white"
                    to={`/item/${item.id}`}
                  >
                    Bay Now
                  </Link>
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  );
}

export default CardItems;
