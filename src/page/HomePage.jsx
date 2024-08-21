import { Card } from "../components/index"
import {useEffect, useState} from "react"
import dbService from "../service/dbservice"


const HomePage = () => {
  const [posts, setPosts] = useState([])

  useEffect((()=>{
    const postPreview = async () =>{
      dbService.getPosts([]).then((post) =>{
        if(post){
          setPosts(post.documents)
        }
      })
    }
    postPreview();
  }),[])
  console.log(posts)

  // useEffect((() =>{
  //   if(slug){

  //   }
  // }), [])
  
  return (
    <div className="w-full h-[100vh] px-[80px] py-[80px]">
      {posts?.map((post, i) => (
        <Card {...post} key={i} />
      ))}
    </div>
  );
}

export default HomePage


