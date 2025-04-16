import React,{useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
// import Button from '@mui/material/Button';
import Slider from "react-slick";
import { fetchProduct, Product } from '../redux/productSlice';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { MdShoppingCart } from "react-icons/md";
import { useNavigate } from 'react-router';
// addToCart:
import { CartItem } from '../redux/cartSlice';
import { addToCart } from '../redux/cartSlice';
import { useToast } from '../context/ToastContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TiTick } from "react-icons/ti";


// Define types for arrow props
interface ArrowProps {
  onClick?: () => void;
}

// Custom Previous Arrow Component
const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

// Custom Next Arrow Component
const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

function Home() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3300,
    prevArrow: <PrevArrow />, // Custom previous arrow
    nextArrow: <NextArrow />,
  };

  // useEffect(()=>{
    
  // })
  // const [qty, setQty] = useState(0)
  const cartItems = useAppSelector(state => state.cartSlice.cartlist);


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


  const navigate = useNavigate()

  // if item added in CartList, it has to Show Marked:
  const CartItem = useAppSelector((state)=> state.cartSlice.cartlist)
  console.log(CartItem,"Cart list in Home");
  
  
  // const goToPrdctDtls=()=>{
  //   navigate('/product/:id')
  // }

  const { showToast } = useToast()
  const dispatch = useAppDispatch()
  const {loading, product} = useAppSelector(state=>state.productSlice)
  // const product = useSelector((state: RootState) => state.productSlice.product)

  // Cart Adding Mechanism:
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
  

useEffect(()=>{
    dispatch(fetchProduct())
},[])
console.log(product,"csas");

  return (
<div className="p-5 min-h-screen">
  {/* <h1 className="text-center text-2xl font-bold mb-4"></h1> */}
  <div className="flex flex-col lg:flex-row gap-6 p-3 justify-center items-center max-w-6xl mx-auto">
    {/* Card Section */}
    <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
      <Card sx={{ maxWidth: 395, width: '100%' }}>
        <CardActionArea>
          <CardMedia
            style={{ height: '300px' }}
            component="img"
            height="140"
            image="https://files.oaiusercontent.com/file-NEJooCgjqSkzhtzj7nBQ2D?se=2025-04-09T06%3A05%3A29Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D13428f55-18e5-4590-8f29-d38a3b522db8.webp&sig=TP1gvDsPPW0OFVlElsU5idVnBfKUR/ji4simHL93uis%3D"
            alt="green iguana"
            className="object-cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <span className='text-amber-600'>Your Style, Delivered Fast! </span>
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            We promise our deals are almost as addictive as our puns. Almost.
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>

    {/* Slider Section */}
    <div className="w-full md:w-2/3 max-w-2xl">
      <Slider {...settings}>
        <div className="p-2">
          <img
            style={{ width: '100%', maxWidth: '400px' }}
            src="https://plus.unsplash.com/premium_vector-1718370392212-cc9815e7e2c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
            alt="Slide 1"
            className="h-64 object-cover mx-auto"
          />
        </div>
        <div className="p-2">
          <img
            style={{ width: '100%', maxWidth: '400px' }}
            src="https://plus.unsplash.com/premium_vector-1725973825187-d80d12a03bdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob3BwaW5nfGVufDB8fDB8fHww"
            alt="Slide 2"
            className="h-64 object-cover mx-auto"
          />
        </div>
        <div className="p-2">
          <img
            style={{ width: '100%', maxWidth: '400px' }}
            src="https://images.unsplash.com/vector-1739672892643-6540cd0db053?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
            alt="Slide 3"
            className="h-64 object-cover mx-auto"
          />
        </div>
      </Slider>
    </div>
  </div>
  <div className='p-3 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
    {
      !loading ? 
      product.map((item: Product)=>
      {
        const isInCart = cartItems.some((cartItem : CartItem) => cartItem.id === item.id)
        return (
          <div>
          <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia onClick={()=>navigate(`/product/${item.id}`)} style={{height:'250px'}}
                  component="img"
                  height="120"
                  image={item.thumbnail}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <Tooltip title={item.title} placement='top-end'>
                      <p className='truncate max-w-[280px]'>{item.title}</p>
                    </Tooltip>
                  </Typography>
                  <Typography>
                    <p className='font-semibold'>
                      ${item.price}
                    </p>
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <Tooltip title={item.description} placement='bottom-end'>
                      <p className='line-clamp-2'>{item.description}</p>
                    </Tooltip>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
    {  
      isInCart ?
      (
     <div className='w-full items-center'>
      <div className=' text-green-700 flex items-center justify-center text-sm font-bold pt-2 pb-1'>
        <span><TiTick /></span> <p>Added</p>
      </div>
    </div>
      ) 
      :    
       (
       <div className='flex justify-between items-center w-full'>
      <button 
        onClick={(e) => handleAddToCart(e, item)} 
        className='text-blue-800 font-bold text-sm flex gap-1 cursor-pointer' 
        role='button'
      >
        <span className='pt-1'><MdShoppingCart /></span> 
        <span>Add to Cart</span>
      </button>
    
      {/* Improved Quantity Selector */}
      <div className='flex items-center gap-1 border border-gray-300 rounded-md overflow-hidden'>
        <button  onClick={()=>updateQty(item.id,-1)}
          className='px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer'
        >
          -
        </button>
        <div className='w-8'>
          <input 
            className='w-15 pe-4 text-center bg-white focus:outline-none' 
            type="number" 
            value={qties[item.id] || 1} 
            readOnly 
          />
        </div>
        <button  onClick={()=>handleIncreaseQty(item.id)}
          className='px-2 py-1 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer'
        >
          +
        </button>
      </div>
    </div>
    )
    }
              </CardActions>
            </Card>
        </div>
        )
      }
       
      )  
      :
      <div>
        <p className='text-center text-red-700'>
          Something Went Wrong... Please Try Again
        </p>
      </div>  
    }
  </div>
</div>
  );
}

export default Home;