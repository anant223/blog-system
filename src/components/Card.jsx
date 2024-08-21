import React from 'react'
import dbService from '../service/dbservice';
import { Link } from 'react-router-dom';

const Card = ({$id, featuredImage, title}) => {
  return (
    <div className="card card-compact bg-base-100 w-80 shadow-xl">
      <Link to={`/post/${$id}`}>
        <figure>
          <img src={dbService.getFilePreview(featuredImage)} alt="img" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">Read More</button>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Card