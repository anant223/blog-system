import React, { useEffect, useState } from 'react'
import {PostFrom} from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import dbService from '../service/dbservice'

const EditPost = () => {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPostData = async () => {
      if (slug) {
        const postData = await dbService.getPost(slug);
        if (postData) {
          setPost(postData);
        }
      } else {
        navigate("/");
      }
    };

    fetchPostData();
  }, [navigate, slug]);


  
  return (
    <div>
      <PostFrom post={post}/>
    </div>
  )
}

export default EditPost