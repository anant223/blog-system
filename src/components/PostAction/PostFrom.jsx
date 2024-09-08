import React, { useCallback, useEffect } from 'react'
import {useForm} from "react-hook-form"
import dbService from '../../service/dbservice'
import {Input, Btn, RTE, Select} from "../index"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const PostFrom = ({post}) => {
  
  const userData = useSelector((state)=> state.auth.userData);
  const navigate = useNavigate()

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
    <div>
      <form onSubmit={handleSubmit(handlePost)} className="flex flex-wrap">
        <div className="px-5">
          <Input
            label="Title"
            placeholder="Title"
            className="w-full p-3"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug"
            placeholder="Slug"
            className="w-full p-3"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransformation(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
          <div className=" mt-4 sm:w-full">
            <RTE
              label="Content"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
        </div>

        <div className="w-1/3 px-2">
          <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("img", { required: !post })}
          />
          {post && (
            <div className="w-full mb-4">
              <img
                src={appwriteService.getFilePreview(post.featuredImage)}
                alt={post.title}
                className="rounded-lg"
              />
            </div>
          )}
          <Select
            options={["Active", "Inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
          />
          <Btn
            bgColor={post ? "bg-green-500" : undefined}
            className="w-full py-2"
            name={post ? "Update" : "Submit"}
          />
        </div>
      </form>
    </div>
  );
}

export default PostFrom;