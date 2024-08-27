import React, { useEffect, useState } from "react";
import { CommentForm } from "./index";
import dbService from "../service/dbservice";
import img from "../assets/react.svg";

const CommentList = ({ postId }) => {

  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState(null);
  const [expand, setExpand] = useState(null);
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        
        const response = await dbService.getComments(postId);
        if (response) {
          setComments(response.documents);
        }
        console.log(response.documents)
      } catch (error) {
        console.log("failed to fetch ", error.message);
      }
    };
    fetchComments();
  }, [postId]);


 const handleToggleRepiese = (index) =>{
  setExpand(expand === index ? null : index)
 }
 const handleAddComment = (newComment) => {
  setComments((prevComments) => [ newComment,...prevComments]);
  if(newComment){
  const commentIndex = comments.findIndex((comment) => comment.$id === newComment.parent_id);
    setExpand(commentIndex)
  }

 };

  const handleReplyClick = (id) => {
    setReply(id );
  };

  const handleCancel = () => {
    setReply(null);
  };

 

  

  const renderComments = (parentId = null) => {
    const filteredComment = comments.filter((comment) => comment.parent_id === parentId)
    return filteredComment.map((comment, index) => {
      const replyCount = comments.filter((chidComment) => chidComment.parent_id ===  comment.$id).length;
      return <div key={comment.$id} className={`flex space-x-4 ${parentId ? "ml-10" : ""}`}>
          <img className="w-5 h-10 rounded-full" src={img} alt="avatar" />
          <div>
            <div className="flex items-center space-x-2">
              <small className="">{comment.user_id}</small>
              <span className="text-xs text-gray-500">
                {new Date(comment.$createdAt).toLocaleString("en-us", {
                  hourCycle: "h24",
                })}
              </span>
            </div>
            <p className="text-sm text-gray-200">{comment.comment}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
              <button className="hover:underline">👍 {"0"} Likes</button>
              <button
                className="hover:underline"
                onClick={() => handleReplyClick(comment.$id)}
              >
                Reply
              </button>
            </div>
            <div>
              {
                parentId === null  && replyCount > 0  && (
                  <button className="hover:underline text-sm" onClick={() => handleToggleRepiese(index)}>
                  Views Replies... {`(${replyCount})`}
                </button>
                )
              }
            </div>
            <div className="pl-10">
              {reply === comment.$id && (
                <CommentForm
                  parentCommentid={comment.$id}
                  onCancel={handleCancel}
                  onAddComment={handleAddComment}
                />
              )}
              {expand === index && renderComments(comment.$id)}
            </div>
          </div>
        </div>
    });
  };

  return (
    <div className="space-y-6">
      {" "}
      <div>
        <CommentForm onAddComment={handleAddComment} />
      </div>
      {renderComments()}
    </div>
  );
};

export default CommentList;
