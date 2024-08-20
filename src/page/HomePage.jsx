import { Btn, Card, Input } from "../components/index"
import {useEffect, useRef, useState} from "react"
import dbService from "../service/dbservice"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

const HomePage = () => {
  const [posts, setPosts] = useState([])
  
  dbService.getPosts([]).then(post=>{
    if(post){
      setPosts(post.documents);
    }
  })
  // useEffect((() =>{
  //   if(slug){

  //   }
  // }), [])
  
  return (
    <div>
      {posts.map((post, i) => (
        <Card {...post} key={i} />
      ))}
    </div>
  );
}

export default HomePage


