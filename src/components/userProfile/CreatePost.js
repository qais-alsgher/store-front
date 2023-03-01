import { React, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import Container from "react-bootstrap/Container";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
function CreatePost() {
  const user = useSelector((state) => state.auth);
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
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
    axios
      .post(`http://localhost:8080/items`, formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Item added successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.mes);
      });
  };
  return (
    <div>
      <Container>
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
      </Container>
      <ToastContainer />
    </div>
  );
}

export default CreatePost;
