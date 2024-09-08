import React, { useState } from 'react'
import {Input, Btn} from "./index"
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authService from '../service/authservice';
import { login } from '../slice/authSlice';

const Login = () => {
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSession = async (data) =>{
    setError("")
    try {
        const session = await authService.login(data);
        if(session){
            const user = await authService.getCurrentUser();
            if(user){
                dispatch(login(user))
                navigate("/")
            }
        }
    } catch (error) {
        setError(error.message)
    }
  }

  return (
      <div className="sm:bg-gray-800 p-8 rounded-lg sm:shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-gray-100">Login</h2>
        <form className="mt-6" onSubmit={handleSubmit(loginSession)}>
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
            <label className="label">
              <a to="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <Btn
            className="w-full mt-6 bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
            name="Log In"
          />
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    
  );
}

export default Login;