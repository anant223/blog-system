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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(loginSession)}>
            <div className="form-control">
              <Input
                label="Email"
                type="email"
                placeholder="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email Address must be valid",
                  },
                })}
              />
            </div>
            <div className="form-control">
              <Input
                label="Password"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <Btn name="Sign Up" />
            </div>
            <div className="form-control mt-6">
              <span>{error}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;