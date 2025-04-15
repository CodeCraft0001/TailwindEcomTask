import React from 'react'
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardActions from '@mui/material/CardActions';
// import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { useDispatch, } from 'react-redux';
import { useParams } from 'react-router';
import type { Product } from '../redux/productSlice';
import { FaCaretRight } from "react-icons/fa";
// import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { CiHeart } from "react-icons/ci";
import { MdShoppingCart } from "react-icons/md";
import { increaseQty, decreaseQty, addToCart } from '../redux/cartSlice';
import { useToast } from '../context/ToastContext';


function ProductDetails() {

    const navigate=useNavigate()

    const dispatch = useDispatch()

    const {showToast} = useToast()

    const [qties, setQties] = useState<{ [key: number]: number }>({});
    
    
      const handleIncreaseQty = (id: number) => {
        setQties((prevQties) => ({
          ...prevQties,
          [id]: (prevQties[id] || 1) + 1
        }));
      };

      const updateQty =(id: number, value: number) => {
        setQties((prev)=>({
          ...prev,[id]:Math.max(1,(prev[id] || 1)+value) //
        }))
      }

      const handleAddToCart = (
          e: React.MouseEvent<HTMLButtonElement>,
          product: Product
        ) => {
          e.preventDefault();
        
          const quantity = qties[product.id] || 1;  // Use your selected quantity
        
          dispatch(addToCart({ 
            ...product, 
            quantity,
            stock: product.stock, 
            returnPolicy: product.returnPolicy,
            discountPercentage: product.discountPercentage,
            brand: product.brand
          }));
        
          showToast("✅ Added to cart!", "success");
        
          // Reset the local quantity for this product
          setQties(prev => ({
            ...prev,
            [product.id]: 1
          }));
        };
    // const [pro, setPro] = useState({})

    const {id}= useParams<{id: string}>()
    const stored = localStorage.getItem('products')
    const products: Product[] = stored ? JSON.parse(stored) : []

    const product = products.find(p => p.id === Number(id)   )
    console.log(product,"clicked Product data");
    console.log('Raw Stored:', stored);
    console.log("type of id param:", typeof id);
    // console.log("type od each product id", typeof p.id);
    
    
    

  return (
    <div className="m-3 p-3 flex flex-col justify-center items-center">
    <div className="max-w-7xl w-full px-4"> {/* Added px-4 for inner padding control */}
      <div className="w-full flex flex-wrap items-center p-2 overflow-hidden">
        <span
          onClick={() => navigate('/')}
          className="font-semibold text-[12px] text-sky-700 hover:text-sky-900 hover:underline cursor-pointer whitespace-nowrap"
        >
          QuickCart
        </span>
        <span className="text-indigo-800 text-[14px] pt-1">
          <FaCaretRight />
        </span>
        <span
          onClick={() => navigate('/home')}
          className="font-semibold text-[12px] text-sky-700 hover:text-sky-900 hover:underline cursor-pointer whitespace-nowrap"
        >
          Home
        </span>
        <span className="text-indigo-800 text-[14px] pt-1">
          <FaCaretRight />
        </span>
        <span className="font-semibold text-[12px] text-purple-900 hover:text-indigo-950 whitespace-nowrap">
          {product?.title}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 w-full mt-4">
        <div className="col-span-2  overflow-hidden">
          <div className='grid grid-cols-1 sm:grid-cols-4'>
            <div className="flex sm:flex-col gap-2 ">
              {
                product?.images?.map((img)=>
                  <p className='border rounded-lg'><img className='w-27' src={img} alt="" /></p>
                ) 
              }
            </div>
            <div className="sm:col-span-3 flex justify-center text-center">
               <img src={product?.thumbnail} alt="" />
            </div>
          </div>
        </div>
              {/* Right most div for Info   */}
        <div className="p-2 bg-neutral-50 flex flex-col overflow-hidden">
          <p className='text-sm font-bold text-indigo-800 cursor-pointer'>{product?.brand}</p>
          <p className='font-extrabold text-2xl'>{product?.title}</p>
          <p className='font-bold text-lg text-blue-800 pt-2'>{product?.description}</p>

         <div className='flex justify-between'>
            <Stack spacing={1} className='py-3'>
              {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
              <Rating name="half-rating-read" defaultValue={product?.rating} precision={0.5} readOnly />
            </Stack>

            <div className="flex flex-col me-4">
                <button onClick={()=>handleIncreaseQty(product!.id)} className='cursor-pointer'>+</button>
                <input readOnly className='w-12 text-center form-control ps-3' type="number" value={qties[product!.id] || 1} />
                <button onClick={()=>updateQty(product!?.id,-1)} className='cursor-pointer'>-</button>
              </div>
         </div>

          <p className='font-extrabold px-2'>$<span className='text-amber-900'>{product?.price}</span></p>

            <div className='flex justify-around'>
              <button onClick={(e)=> handleAddToCart(e, product! )} className='bg-amber-400 flex justify-center gap-2 cursor-pointer hover:bg-yellow-400 py-3 mt-2 text-center w-73 rounded-md font-bold'><span className='pt-1'><MdShoppingCart /></span><p> Add to Cart</p></button>
              
              <button className='border flex gap-3 px-1 justify-center cursor-pointer w-20 bg-transparent py-3 mt-3 rounded-md text-sm font-semibold'> <span className='pt-1'><CiHeart /></span> <p>Save</p></button>
            </div>
        </div>
      </div>
    </div>
  </div>

  )
}

export default ProductDetails
