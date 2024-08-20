import React, { useEffect, useState } from "react";
import { CommentForm } from "./index";
import { useSelector } from "react-redux";
import dbService from "../service/dbservice";
import img from "../assets/react.svg";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState(null);
  const articleData = useSelector((state) => state.article.data);
  const auth = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await dbService.getComments(postId);
        if (response) {
          setComments(response.documents);
        }
      } catch (error) {
        console.log("failed to fetch ", error.message);
      }
    };
    fetchComments();
  }, [postId]);

  const handleReplyClick = (id) => {
    setReply(id);
  };

  const handleCancel = () => {
    setReply(null);
  };

  const renderComments = (parentId = null) => {
    return comments
      .filter((comment) => comment.parent_id === parentId)
      .map((comment) => (
        <div
          key={comment.$id}
          className={`flex space-x-4 ${parentId ? "ml-10" : ""}`}
        >
          <img className="w-5 h-10 rounded-full" src={img} alt="avatar" />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-sm font-medium">{auth?.userData?.name}</h3>
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
                Reply {0 > 0 && `(${0})`}
              </button>
            </div>
            <div className="pl-10">
              {reply === comment.$id && (
                <CommentForm
                  parentCommentid={comment.$id}
                  onCancel={handleCancel}
                />
              )}
              {reply === comment.$id && renderComments(comment.$id)}
            </div>
          </div>
        </div>
      ));
  };

  return <div className="space-y-6">{renderComments()}</div>;
};

export default CommentList;
