import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import authService from '../service/authservice';
import { useDispatch } from 'react-redux';
import { login } from '../slice/authSlice';
import { useNavigate } from 'react-router-dom';
import {Input, Btn} from './index';

const Register = () => {
  const {register, handleSubmit} = useForm('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const registerAccount = async(data)=>{
    setError("")
    try {
        const newUserAccount = await authService.createAccount(data);
        if(newUserAccount){
            const user = await authService.getCurrentUser();
            if(user){
                 dispatch(login(user));
                 navigate("/");
            }
           
        }
    } catch (error) {
        setError(error.message)
    }
  }
  return (
      <div className="sm:bg-gray-800 bg-transparent p-8 rounded-lg sm:shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-100">Sign Up</h2>
        <form className="mt-6" onSubmit={handleSubmit(registerAccount)}>
          <div>
            <Input
              label="Name"
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="w-full mt-2 mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-white bg-transparent"
            />
          </div>
          <div>
            <Input
              label="Email"
              type="email"
              id="email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-white bg-transparent"
              placeholder="Enter your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email Address must be valid",
                },
              })}
            />
          </div>
          <div className="mt-4">
            <Input
              label="Password"
              type="password"
              {...register("password", { required: true })}
              className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-white bg-transparent"
              placeholder="Enter your password"
            />
            
          </div>
          <Btn
            className="w-full mt-6 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
            name="Sign Up"
          />
          <div className="form-control mt-6">
            <span>{error}</span>
            {" "}
          </div>
        </form>
      </div>
    // </div>
  );
}

export default Register