import { useState, useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
// import { RootState } from '../redux/store'
import { CartItem } from '../redux/cartSlice'
import CircleCheckbox from '../components/CircleCheckbox'
import { Tooltip } from '@mui/material'
import { removefromCart } from '../redux/cartSlice'
import { updateQuantity } from '../redux/cartSlice'
import { useToast } from '../context/ToastContext'
import Dropdown from '../components/Dropdown'
// import Slider from 'react-slick'
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from 'react-router'
// import { FaHeart } from 'react-icons/fa'
import { RiEmotionSadLine } from "react-icons/ri";


//Before:

function Cart() {
    
    // const [value, setValue] = useState<number>(1)
    const [scale, setScale] = useState(1)

    useEffect(()=> {
      const interval = setInterval(()=> {
        setScale((prevScale) => (prevScale === 1 ? 1.5 : 1))
      }, 1000)

      return () => clearInterval(interval)
    },[])

    const cartItems = useAppSelector((state) => state.cartSlice.cartlist)
    console.log(cartItems);

    const navigate = useNavigate()

    const dispatch = useAppDispatch()
    const {showToast} = useToast()

    const handleRemoveFrmCart=(item: CartItem)=>{
        dispatch(removefromCart(item.id))
        showToast("Removed from Cart !","warning")
    }
    
    const handleQtyChange=(itemId: number, value: number)=>{
        dispatch(updateQuantity({id:itemId, quantity: value}))
    }

    // const handleCheckboxChange = (id: string, checked: boolean) => {
    //     console.log(`Item ${id} is ${checked ? "selected" : "deselected"}`);
    //     // You can dispatch an action here to update Redux if needed
    //   };

  return (
    <div className='flex flex-col bg-slate-100 md:flex-row  mx-auto  min-h-screen'>
      {/* Left Div: Scrollable Cart Items */}
      {
        cartItems.length === 0 ? (
            <div className='flex flex-col mb-5 p-7'>
                <p className='font-bold text-2xl'>
                    Your Cart is empty
                </p>
                <div onClick={()=>navigate('/home')} className='flex items-center text-blue-700 ms-3 cursor-pointer font-semibold'>
                <span className='mt-2'><IoArrowBackOutline /></span> <span className='mt-2 ps-1 w-37'>Back To Shopping </span>
                </div>
                <p className='pt-7 ps-3'>
                Have an account?
                <span className='text-sm hover:underline text-blue-700 cursor-pointer hover:text-blue-900'> Sign in to see your cart</span>
                </p>
            </div>
        )
        : 
       ( 
        // Non Scrollable
       <div className="w-full m-4 md:w-2/3 pr-0 md:pr-4 mb-4 md:mb-0">
        <div className="h-[1500px] overflow-y-auto">
          {/* Simulate cart items */}
          <div className="space-y-4">
            {cartItems.map((item: CartItem, index) => (
              <div
                key={item.id}
                className="p-4 bg-white rounded-lg shadow bg-red-300 flex flex-col "
              >
                <div className='flex'>
                    <div className="w-24 h-24 bg-gray-200 rounded-md mr-4">
                        <img src={item.thumbnail} alt="" />
                    </div>

         
                        <div className=''>
                            <h3 className="text-[12px] font-semibold mb-1">Product {index + 1}</h3>
                            <p className='text-sky-700 text-[11px] cursor-pointer w-24'>
                            {item.title}
                            </p> 
                        </div>
    
                        <div className='flex-col'>
                            <div className='flex'>
                                <span className='pt-1'>
                                    <CircleCheckbox
                                    id={`item-${item.id}`}
                                    />
                                </span> 
                                <p className='text-[11px]'>Pickup at <span className='cursor-pointer text-sky-800 hover:underline'>QuickCart</span> support stores</p>
                            </div>
    
                            <div className='flex pt-3'>
                                <span className='pt-1'>
                                    <CircleCheckbox
                                    id={`item-${item.id}`}
                                    />
                                </span> 
                                <Tooltip title="not complete !!!, Working on..."><p className='text-[11px]'>Shipping to <span className='text-sky-800 font-bold cursor-pointer'>8943065398</span></p></Tooltip>
                            </div>
                        </div>

                        <div className=' ms-3 w-19 flex flex-col'>
                                <Dropdown
                                    min={1}
                                    max={5}
                                    value={item.quantity}
                                    onChange={(value)=> handleQtyChange(item.id, value)}
                                    className='w-12'
                                />
                                {/* <p>Qty: {value}</p> */}
                            <span className='text-left font-bold cursor-pointer hover:underline text-[10px] text-blue-600'>Save for later</span>
                            <span onClick={()=>handleRemoveFrmCart(item)} className='text-left font-bold cursor-pointer hover:underline text-[10px] text-blue-600 mt-1 mb-3'>Remove</span>
                        </div>
    
                        <div className='w-[26%] flex justify-end'>
                            <div className='p-1 w-27 '>
                                <p className="text-black font-bold">$ <span className='text-gray-950 font-extrabold'>99.99</span></p>
                                <p className="text-sm font-bold text-white  px-2 py-1 round-sm bg-rose-700">{item.discountPercentage} % Disc</p> 
                            </div>
                        </div>
         </div>

                <div className='w-full flex justify-end'>
                  <div className='flex flex-col'>
                        <div className=' w-130'>
                                <Tooltip title="Working on..." placement='top-end'>
                                <div className='flex'>
                                    <p className='text-[11px] font-bold'>Inclueded</p>
                                    <p className='w-full pt-2 px-1'><hr /></p>
                                </div>
                                </Tooltip>     
                        </div>
                        <div className=' w-130 flex justify-between text-[11px] '>
                                <span className=''>2 Item</span><span className='text-sky-700 cursor-pointer hover:underline'>Show Item</span>
                        </div>  
                        <div className='w-130 '>
                            <Tooltip title="Working on..." placement='top-end'>
                                <div className='flex'>
                                    <p className='text-[11px] font-bold w-[20%]'>Protection Plans</p>
                                    <p className='w-full pt-2 px-1'><hr /></p>
                                </div>
                                </Tooltip> 
                        </div>
                        <div className='w-130 flex justify-end'>
                        <button className="px-9 py-2 text-[13px] font-bold text-blue-600 hover:text-white border border-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
                            See All Plans
                        </button>
                        </div>  
                        {/* <div className='bg-rose-400 w-130 '>
                                dd
                        </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      )
      }

            {/* Right Div: Sticky Order Summary */}
    {
    cartItems.length > 0 ?
    (
      <div className='w-full md:w-1/3  flex'>
          <div className="md:justify-end">
            <div className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-y-hidden">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${Math.round(cartItems.reduce((prev, item)=> prev + item.quantity * item.price, 0))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$79.99</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${Math.round(cartItems.reduce((prev, item)=> prev + item.quantity * item.price, 0))+ 79.99}</span>
                  </div>
                </div>
                <button className="w-full cursor-pointer font-bold mt-4 bg-amber-400 text-lg text-black py-3 rounded-md hover:bg-yellow-400 transition">
                   Checkout
                </button>
    
                <button className='italic w-full cursor-pointer font-bold text-2xl bg-gray-800 rounded-md text-white py-3 mt-2'>
                    PayPal <span className='text-sm not-italic'>Checkout</span>
                </button>
                {/* Simulate extra content to make it scrollable */}
                <div className="mt-4 h-[600px]">
                  <p className="text-gray-600">
                    Additional order details or promotions can go here to make the
                    right div scrollable when needed.
                  </p>
                </div>
              </div>
            </div>
          </div>
     </div>
    )
    :
    (
      <div className='w-full flex mt-9 justify-center'>
          <RiEmotionSadLine  className='text-7xl'
            style={{
              color: 'gray',
              transform: `scale(${scale})`,
              transition: 'transform 0.5s ease-in-out',
            }}
          />
      </div>
    )
    
     }

    </div>
  )
}

export default Cart
