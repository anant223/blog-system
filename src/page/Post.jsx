import React, { useEffect, useState} from 'react'
import {Btn, CommentForm, CommentList} from "../components/index"
import { useDispatch, useSelector } from 'react-redux'
import dbService from '../service/dbservice'
import { useNavigate, useParams } from 'react-router-dom'
import Parse from 'html-react-parser'
import { getData } from '../slice/dbSlice'


const Post = () => {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.article.data);
  const {slug} = useParams()
  const navigate = useNavigate()
  const userData = useSelector((status)=> status.auth.userData)
  const isAuther = post && userData ? userData.$id === post.userid : false
  
  useEffect((()=>{
    dbService.getPost(slug).then((post) =>{
      console.log(post)
      if(post){
        dispatch(getData(post))
        navigate(`/post/${post.$id}`)
      }else{
        navigate("/")
      }
    })
  }),[slug, navigate])

  const deletePost = ()=>{
     dbService.deletePost(post.$id).then((status)=>{
      if(status){
        dbService.deleteFile(post.featuredImg);
        navigate("/")
      }
     })
  }

  
  return post ? (
    <div className="max-w-3xl mx-auto p-4">
      <article className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-gray-500 mb-4">
          {new Date(post.$createdAt).toLocaleString({ hourCycle: "h24" })}
        </p>
        <img
          src={dbService.getFilePreview(post.featuredImage)}
          alt={"featuredImage"}
          className="w-full h-auto rounded-lg mb-4"
        />
        <div className="text-lg leading-relaxed text-white mb-8">
          {Parse(post.content)}
        </div>
      </article>
      <div>
        <h2 className="text-xl font-semibold mb-4">Comments</h2>
      </div>

      <section className="mb-8">
        <CommentList postId={post.$id} />
      </section>
    </div>
  ) : null;
}

export default Post;