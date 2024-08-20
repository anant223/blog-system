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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit(registerAccount)}>
            <div className="form-control">
              <Input
                label="Name"
                type="text"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </div>
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

export default Register