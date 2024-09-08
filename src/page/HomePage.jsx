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
    <div className="w-full min-h-screen sm:px-[80px] py-[80px]">
      <div className="grid p-4 sm:grid-cols-2 sm: lg:grid-cols-3 grid-cols-1 gap-5">
        {posts?.map((post, i) => (
          <Card {...post} key={i} />
        ))}
      </div>
    </div>
  );
}

export default HomePage


