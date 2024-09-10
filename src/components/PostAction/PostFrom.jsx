import React, { useCallback, useEffect, useId } from 'react'
import {useForm} from "react-hook-form"
import dbService from '../../service/dbservice'
import {Input, Btn, RTE, Select} from "../index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PostFrom = ({post}) => {
  
  const userData = useSelector((state)=> state.auth.userData);
  const navigate = useNavigate();
  const id = useId();


  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
      defaultValues: {
        title:  post?.title || "",
        content: post?.content || "",
        slug: post?.$id || "",
        status: post?.status || ''
      },
    });


  const handlePost = async (data) =>{
    if(post){
      const file = data.img[0]? await dbService.uploadFile(data.img[0]) : null;

      if(file){
        await dbService.deleteFile(post.featuredImage)
      }
      
      const dbPost = await dbService.updatePost(data.$id, {...data, featuredImage: file? file.$id : undefined});

      if(dbPost){
        navigate(`/post/${dbPost.$id}`)
      }

    }else{
      const file = await dbService.uploadFile(data.img[0]);
      if(file){
        // console.log(userData.userData)
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log(data)
        console.log(userData);
        const dbPost = await dbService.createPost({...data, userid: userData.userData.$id})
        // console.log(dbPost)
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
        
      }
    }
  }
  const slugTransformation = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  // useEffect(() => {
  //   const subscribe = watch((value, { name, type }) => {
  //     console.log(value, name, type)
  //     if (name === "title") {
  //       console.log(value)
  //       setValue(slugTransformation(value));
  //     }
  //   });

  //   return subscribe.unsubscribe();
  // }, [watch, slugTransformation, setValue]);


  return (
    <div className="max-w-3xl mx-auto bg-gray-900 p-8 shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        {post ? "Update Article" : "Add New Article"}
      </h2>
      <form onSubmit={handleSubmit(handlePost)}>
        <div className="mb-4">
          <Input
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Title"
            {...register("title", { required: true })}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Slug"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransformation(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
        </div>
        <div className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300">
          <RTE
            label="Content"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div>
          <Input
            label="Featured Image"
            type="file"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("img", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          )}
          <Select
            options={["Active", "Inactive"]}
            label="Status"
            className="w-full p-3 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("status", { required: true })}
          />
          <Btn
            bgColor={
              post
                ? "bg-green-500 hover:bg-green-600"
                : "bg-blue-500 hover:bg-blue-600"
            }
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            name={post ? "Update" : "Submit"}
          />
        </div>
      </form>
    </div>
  );
}

export default PostFrom;