// import React from 'react'
import { useState } from 'react'
// import tailwindcss from '@tailwindcss/vite'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router';
import { useToast } from '../context/ToastContext';
import * as yup from 'yup';
// import {Formik, useFormik} from 'formik'

const loginSchema = yup.object().shape({
  email: yup
  .string()
  .email('Invalid email format')
  .required('Email is required'),
  password: yup
  .string()
  .min(6, 'Password must be at least 6 characters')
  .required('password is required'),
})

function LandngLogin() {
    const [isLogin, setIsLogin] = useState(false)
    const [formData, setFormData] = useState({email: '', password: ''})
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    // const [error, setError] = useState('')

    // const validateEmail = async(email:string)=> {
    //   try {
    //     await yup.string().email().required().validate(email)
    //     setError('')
    //     return true
    //   } catch(err) {
    //     setError(err.message)
    //     return false
    //   }
    // }


    const {showToast} = useToast()
    const navigate = useNavigate()
    
    //Validation when Submitting 'Submit' button:
    const handleSubmit = async () => {
      try {
        await loginSchema.validate(formData, { abortEarly: false });
        setErrors({});
        showToast("Login Successful", "success");
        navigate('/home');
      } catch (err: any) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
    };
    

   

    const Login=()=> {
        setIsLogin(true)
    }
  return (
    <div className='bg-gradient-to-tr from-indigo-950 to-purple-500 flex flex-col justify-center items-center h-full'>

        {/* Login Modal: */}
        {
          isLogin && (
           <>
              <div onClick={()=>setIsLogin(false)} className='fixed inset-0 bg-black/50 bg-opacity/50 z-40'>           
              </div>
  
  
              <div className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-lg w-96 p-6 relative">
              <button
                onClick={()=>setIsLogin(false)}
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-red-500 cursor-pointer"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Enter Email and Password To Login</h2>
              {/* <p className="text-gray-700">This is a simple modal component.</p> */}
              <div className='flex flex-col w-full justify-center items-center'>
                <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
                  <TextField
                    helperText={errors.email || "Please Enter Your Email"}
                    error={!!errors.email}
                    id="email"
                    label="Email"
                    value={formData.email}
                    onChange={(e)=> setFormData({...formData, email: e.target.value})}
                  />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', '& > :not(style)': { m: 1 } }}>
                  <TextField
                    helperText={errors.password||"Please Enter Your Password"}
                    error={!!errors.password}
                    id="Password"
                    label="Password"
                    type='password'
                    value={formData.password}
                    onChange={(e)=> setFormData({...formData, password: e.target.value})}
                  />
                </Box>
                  <button onClick={handleSubmit} className='rounded-lg bg-sky-500 px-2 py-1 cursor-pointer'>
                    Submit
                  </button>
              </div>
            </div>
          </div>
              
           </>
          )
        }

        <div className='w-85'>
          <h2 className='text-6xl mb-1 text-center text-zinc-400 font-mono font-bold'>Welcome To <span className='hover:text-slate-500'>QuickCart</span></h2>
            <p className='text-center font-serif p-3 text-white'>
                Discover the best deals on top-quality products – from fashion to electronics, delivered to your door with just a click. Shop smart. Shop easy.
            </p>
            <button 
                onClick={()=>Login()}
                className='bg-indigo-600 mb-2 hover:bg-indigo-700 cursor-pointer flex items-center text-center text-black hover:text-white rounded-2xl px-2 py-1 font-bold mx-auto'>
                    Get Started
            </button>
            <p className='text-center'>Don't have an account ? <span className='hover:underline hover:text-blue-500 text-sky-500 cursor-pointer'>Sign Up</span></p>
        </div>    
    </div>
  )
}

export default LandngLogin
