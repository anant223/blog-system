import React from 'react'
import dbService from '../service/dbservice';
import { Link } from 'react-router-dom';
import Parse from "html-react-parser";


const Card = ({$id, featuredImage, title, content}) => {
  return (
    <div className="w-full shadow-lg bg-gray-900 rounded-lg p-[20px] ">
      <img
        src={dbService.getFilePreview(featuredImage)}
        alt="Laptop"
        className="h-[250px] sm:h-[210px] object-cover rounded-sm"
      />
      <div className="">
        <h1 className="text-[21px] py-2 line-clamp-1">{title}</h1>
        <p className="py-2 line-clamp-4  overflow-hidden">{Parse(content)}</p>
        <div className="flex gap-5 justify-between p-2">
          <button className="">👍🏻{"10"}</button>
          <button
            type="button"
            className=" bg-slate-600 text-white p-1 rounded-lg"
          >
            <Link to={`/post/${$id}`}>Read More...</Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card