import React, { useState } from "react";
import {Btn, Input} from "./index";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import dbService from "../service/dbservice";
import img from "../assets/react.svg";


const CommentForm = ({parentCommentid = null, onCancel}) => {
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm()
  const [isExpand, setIsExpand] = useState(false)
  const user = useSelector((state)=> state.auth.userData);
  const post = useSelector((state) => state.article.data);


  const postComment = async (data) =>{
    try {
      const comments = await dbService.createComments(post.$id,{
        ...data,
        user_id: user.userData.$id,
        parent_id: parentCommentid,
      });
      return comments  
    } catch (error) {
      console.error("Error posting comment:", error.message);

    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form className="mt-2" onSubmit={handleSubmit(postComment)}>
        <Input
          className="w-full p-[10px] border border-gray-300 focus:outline-none outline-0 focus:bg-none border-t-0 border-l-0 border-r-0 bg-transparent"
          rows="3"
          type="text"
          placeholder="Add a public comment..."
          {...register("comment", { required: true })}
        />
        <div className="flex justify-end mt-2">
          <Btn
            onClick={onCancel}
            className="px-2 py-[2px] text-xs text-gray-200 hover:bg-gray-500 rounded-xl "
            name={"Cancel"}
            bgColor="bg-transparent"
          />
          <Btn
            className="p-[4.8px] ml-2 text-xs text-white  rounded-md hover:bg-blue-600"
            name={"Comment"}
            bgColor="bg-gray-500"
          />
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
