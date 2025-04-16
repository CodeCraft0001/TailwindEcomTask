
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Slider from 'react-slick';
import { fetchProduct, Product } from '../redux/productSlice';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Tooltip } from '@mui/material';
import { MdShoppingCart } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { CartItem, addToCart } from '../redux/cartSlice';
import { useToast } from '../context/ToastContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { TiTick } from 'react-icons/ti';

// Define types for arrow props
interface ArrowProps {
  onClick?: () => void;
}

// Custom Previous Arrow Component
const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-1.5 rounded-full hover:bg-gray-600"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-2.5 w-2.5"
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
    className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-1.5 rounded-full hover:bg-gray-600"
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-2.5 w-2.5"
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
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  const cartItems = useAppSelector((state) => state.cartSlice.cartlist);
  const [qties, setQties] = useState<{ [key: number]: number }>({});
  const navigate = useNavigate();
  const { showToast } = useToast();
  const dispatch = useAppDispatch();
  const { loading, product } = useAppSelector((state) => state.productSlice);

  const handleIncreaseQty = (id: number) => {
    setQties((prevQties) => ({
      ...prevQties,
      [id]: (prevQties[id] || 1) + 1,
    }));
  };

  const updateQty = (id: number, value: number) => {
    setQties((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + value),
    }));
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement>,
    product: Product
  ) => {
    e.preventDefault();
    const quantity = qties[product.id] || 1;
    dispatch(
      addToCart({
        ...product,
        quantity,
        stock: product.stock,
        returnPolicy: product.returnPolicy,
        discountPercentage: product.discountPercentage,
        brand: product.brand,
      })
    );
    showToast('✅ Added to cart!', 'success');
    setQties((prev) => ({
      ...prev,
      [product.id]: 1,
    }));
  };

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  return (
    <div className="p-2 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-3 p-2 justify-center items-center max-w-6xl mx-auto">
        <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
          <Card sx={{ maxWidth: { xs: 260, sm: 360, md: 395 }, width: '100%' }}>
            <CardActionArea>
              <CardMedia
                sx={{ height: { xs: 180, sm: 260, md: 300 } }}
                component="img"
                image="https://files.oaiusercontent.com/file-NEJooCgjqSkzhtzj7nBQ2D?se=2025-04-09T06%3A05%3A29Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D13428f55-18e5-4590-8f29-d38a3b522db8.webp&sig=TP1gvDsPPW0OFVlElsU5idVnBfKUR/ji4simHL93uis%3D"
                alt="green iguana"
                className="object-cover"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  <span className="text-amber-600">Your Style, Delivered Fast!</span>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  We promise our deals are almost as addictive as our puns. Almost.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
        <div className="w-full md:w-2/3 max-w-xl">
          <Slider {...settings}>
            <div className="p-1">
              <img
                style={{ width: '100%', maxWidth: '360px' }}
                src="https://plus.unsplash.com/premium_vector-1718370392212-cc9815e7e2c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Slide 1"
                className="h-56 object-cover mx-auto"
              />
            </div>
            <div className="p-1">
              <img
                style={{ width: '100%', maxWidth: '360px' }}
                src="https://plus.unsplash.com/premium_vector-1725973825187-d80d12a03bdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob3BwaW5nfGVufDB8fDB8fHww"
                alt="Slide 2"
                className="h-56 object-cover mx-auto"
              />
            </div>
            <div className="p-1">
              <img
                style={{ width: '100%', maxWidth: '360px' }}
                src="https://images.unsplash.com/vector-1739672892643-6540cd0db053?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D"
                alt="Slide 3"
                className="h-56 object-cover mx-auto"
              />
            </div>
          </Slider>
        </div>
      </div>
      <div className="p-2 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mx-auto max-w-7xl">
        {!loading ? (
          product.map((item: Product) => {
            const isInCart = cartItems.some((cartItem: CartItem) => cartItem.id === item.id);
            return (
              <Card
                key={item.id}
                sx={{
                  maxWidth: { xs: 240, sm: 280, md: 320, lg: 345 },
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
                className="flex flex-col"
              >
                <CardActionArea>
                  <CardMedia
                    onClick={() => navigate(`/product/${item.id}`)}
                    sx={{ height: { xs: 160, sm: 200, md: 250 } }}
                    component="img"
                    image={item.thumbnail}
                    alt={item.title}
                    className="object-cover"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      <Tooltip title={item.title} placement="top-end">
                        <p className="truncate max-w-[220px] text-sm">{item.title}</p>
                      </Tooltip>
                    </Typography>
                    <Typography variant="body1">
                      <p className="font-semibold text-sm">${item.price}</p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className="h-12 flex items-center justify-center px-2 mt-auto">
                  {isInCart ? (
                    <div className="w-full flex items-center justify-center h-full">
                      <div className="text-green-700 flex items-center gap-1 text-xs font-bold">
                        <TiTick />
                        <p>Added</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:justify-between justify-center items-center w-full gap-1.5">
                      <button
                        onClick={(e) => handleAddToCart(e, item)}
                        className="text-blue-800 font-bold text-xs flex gap-1 cursor-pointer whitespace-nowrap"
                        role="button"
                      >
                        <MdShoppingCart className="mt-0.5" />
                        <span>Add to Cart</span>
                      </button>
                      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden h-7">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <input
                          className="w-8 text-center bg-white focus:outline-none text-xs"
                          type="number"
                          value={qties[item.id] || 1}
                          readOnly
                        />
                        <button
                          onClick={() => handleIncreaseQty(item.id)}
                          className="px-1.5 py-0.5 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}
                </CardActions>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center">
            <p className="text-red-700 text-sm">Something Went Wrong... Please Try Again</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
