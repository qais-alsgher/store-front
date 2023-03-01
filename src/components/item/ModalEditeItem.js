import { React, useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import Form from "react-bootstrap/Form";
// import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import FormData from "form-data";
import { useSelector } from "react-redux";

function ModalEditeItem(props) {
  const user = useSelector((state) => state.auth);
  const [itemTitle, setItemTitle] = useState(props.item.itemTitle);
  const [itemDescription, setItemDescription] = useState(
    props.item.itemDescription
  );
  const [itemImage, setItemImage] = useState(props.item.itemImage);
  const [category, setCategory] = useState(props.item.category);
  const [price, setPrice] = useState(props.item.price);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemTitle", itemTitle);
    formData.append("itemDescription", itemDescription);
    formData.append("category", category);
    formData.append("price", price);
    for (let i = 0; i < itemImage.length; i++) {
      formData.append("itemImage", itemImage[i]);
    }
    formData.append("userId", user.userInfo.id);
    formData.append("quantity", 1);
    props.handleClose();
    axios
      .put(`http://localhost:8080/items/${props.item.id}`, formData, {
        headers: {
          Authorization: `Bearer ${user.userInfo.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Item added successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.mes);
      });
  };

  // e.preventDefault();
  // const formData = new FormData();
  // formData.append("itemTitle", itemTitle);
  // formData.append("itemDescription", itemDescription);
  // formData.append("category", category);
  // formData.append("price", price);
  // for (let i = 0; i < itemImage.length; i++) {
  //   formData.append("itemImage", itemImage[i]);
  // }
  // formData.append("userId", user.userInfo.id);
  // formData.append("quantity", 1);
  // props.handleClose();
  // axios
  //   .put(`http://localhost:8080/items/${props.item.id}`, formData, {
  //     headers: {
  //       Authorization: `Bearer ${user.userInfo.token}`,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res.data);
  //     toast.success("Item added successfully");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     toast.error(err.mes);
  //   });

  return (
    <div>
      <Modal
        show={props.show}
        onHide={() => props.handleClose()}
        className="all-modal"
      >
        <Modal.Header className="formAddPost" closeButton>
          <Modal.Title>Add New Items</Modal.Title>
        </Modal.Header>
        <Modal.Body className="formAddPost">
          <h1>This service is not currently available 😢</h1>
          <form
            className="form-item-post"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <input
              type="text"
              placeholder="title"
              onChange={(e) => {
                setItemTitle(e.target.value);
              }}
            />

            <input
              type="text"
              placeholder="price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <div>
              <select
                name="category"
                id="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                <option value="0" disabled selected>
                  Select category
                </option>
                <option value="electronics">Electronics</option>
                <option value="realestate">Realestate</option>
                <option value="clothes">Clothes</option>
                <option value="vehicles">Vehicles</option>
                <option value="others">Others</option>
              </select>
              <input
                type="file"
                placeholder="images"
                multiple="multiple"
                onChange={(e) => {
                  setItemImage(e.target.files);
                }}
              />
            </div>
            <textarea
              placeholder="description"
              id="description"
              onChange={(e) => {
                setItemDescription(e.target.value);
              }}
            />
            <button
              type="submit"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default ModalEditeItem;
