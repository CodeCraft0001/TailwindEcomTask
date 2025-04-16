// import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router';

function Footer() {
    const navigate = useNavigate()
    const goToLanding=()=>{
        navigate('/')
    }
    
  return (
    <footer className="bg-gray-800 text-white py-4">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
      <p className="text-sm mb-2 md:mb-0">
        © {new Date().getFullYear()} <span className='text-indigo-500 hover:text-indigo-700 font-bold'>QuickCart</span>. All rights reserved.
      </p>

        <div className='flex-col my-3'>
            <h3 className='text-2xl font-semibold text-amber-600'>Quick Links</h3>
             <ul className='list-none text-center'>
                 <li onClick={()=>navigate('/home')} className='cursor-pointer hover:underline'>Home</li>
                 <li onClick={goToLanding} className='cursor-pointer hover:underline'>Landing</li>
                 <li onClick={()=>navigate('/cart')} className='cursor-pointer hover:underline'>Cart Page</li>
             </ul>
        </div>

      <div className="flex space-x-4">
        <a href="#" className="hover:text-gray-300">
          <FacebookIcon fontSize="small" />
        </a>
        <a href="#" className="hover:text-gray-300">
          <TwitterIcon fontSize="small" />
        </a>
        <a href="#" className="hover:text-gray-300">
          <InstagramIcon fontSize="small" />
        </a>
      </div>
    </div>
  </footer>
  )
}

export default Footer
