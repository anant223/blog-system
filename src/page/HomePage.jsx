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


  
  return (
    <div className="w-full h-[100vh] sm:px-[80px] py-[80px] px-5">
      <div className="grid sm:grid-cols-3 grid-cols-1">
        {posts?.map((post, i) => (
          <Card {...post} key={i} />
        ))}
      </div>
    </div>
  );
}

export default HomePage


