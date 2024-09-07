import React from 'react'
import dbService from '../service/dbservice';
import { Link } from 'react-router-dom';

const Card = ({$id, featuredImage, title}) => {
  return (
    <div className="h-auto rounded-md border flex">
      <img
        src={dbService.getFilePreview(featuredImage)}
        alt="Laptop"
        className="w-40 p-2 rounded-md object-cover"
      />
      <div className="p-4">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="mt-3 text-sm text-gray-600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          debitis?
        </p>
        <button
          type="button"
          className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[14px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black mr-4"
        >
          <Link to={`/post/${$id}`}>Read</Link>
        </button>
        <button className="mt-4 rounded-sm bg-black px-2.5 py-1 text-[14px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">Liked {" 0"}</button>
      </div>
    </div>
  );
}

export default Card