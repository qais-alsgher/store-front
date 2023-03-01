import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import FavoriteList from "./FavoriteList";
import CreatePost from "./CreatePost";
import axios from "axios";
import "./user.css";
function User() {
  const user = useSelector((state) => state.auth);
  const [favorite, setFavorite] = useState([]);
  const [showFavorite, setShowFavorite] = useState(true);
  const [showCreatePost, setShowCreatePost] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8080/favorite/${user.userInfo.id}`)
      .then((res) => {
        setFavorite(res.data);
        console.log(res.data);
      });
  }, [user.userInfo.id]);
  const handleShowFavorite = () => {
    setShowFavorite(true);
  };
  const handleShowcreatePost = () => {
    setShowCreatePost(true);
  };
  const handleCloseFavorite = () => {
    setShowFavorite(false);
  };
  const handleCloseCreatePost = () => {
    setShowCreatePost(false);
  };

  return (
    <div>
      <Container>
        <h1 className="mt-5">Welcome To CartShop {user.userInfo.userName}</h1>
        <div className="heading-profil">
          <h3
            onClick={() => {
              handleShowFavorite();
              handleCloseCreatePost();
            }}
          >
            Favorite List
          </h3>
          <h3
            onClick={() => {
              handleShowcreatePost();
              handleCloseFavorite();
            }}
          >
            Create New Post
          </h3>
        </div>
        {showFavorite && <FavoriteList favorite={favorite} />}
        {showCreatePost && <CreatePost />}
      </Container>
    </div>
  );
}

export default User;
