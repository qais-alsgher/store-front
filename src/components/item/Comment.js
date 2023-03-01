import React from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
function Comment(props) {
  const user = useSelector((state) => state.auth);
  const handelComment = (e) => {
    console.log(props.itemId);
    e.preventDefault();
    const data = {
      userId: user.userInfo.id,
      itemId: props.itemId,
      comment: e.target[0].value,
    };
    axios
      .post(`http://localhost:8080/comment`, data)
      .then((res) => {
        toast.success("Comment added");
        console.log(res.data);
      })
      .catch((err) => {
        toast.error(err.mes);
      });
  };

  return (
    <div className="comment-container">
      {props.itemComments &&
        props.itemComments.map((comment) => {
          return (
            <div className="comment">
              <h4>{comment.user.userName}</h4>
              <div className="content">
                <BsArrowReturnRight />
                <p>{comment.comment}</p>
              </div>
            </div>
          );
        })}
      <form
        className="comment-form"
        onSubmit={(e) => {
          handelComment(e);
        }}
      >
        <input type="text" placeholder="Comment" />
        <button type="submit">
          <AiOutlineSend />
        </button>
      </form>
    </div>
  );
}

export default Comment;
