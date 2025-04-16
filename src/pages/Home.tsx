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
          <Card
            sx={{
              width: { xs: '90%', sm: '100%' },
              maxWidth: { xs: 360, sm: 360, md: 395 },
              mx: { xs: 'auto', sm: 0 },
              display: 'flex',
              flexDirection: { xs: 'row', sm: 'column' },
              overflow: 'hidden',
              alignItems: { xs: 'center', sm: 'stretch' },
            }}
          >
            <div className="relative sm:mb-[-20px]">
              <CardMedia
                sx={{
                  width: { xs: 140, sm: '100%' },
                  height: { xs: 140, sm: 260, md: 300 },
                  flexShrink: 0,
                }}
                component="img"
                image="https://files.oaiusercontent.com/file-R5pdQoaDD4zXwDmDke3Rfs?se=2025-04-16T06%3A57%3A25Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4fbf5fe6-55e6-40b8-a04c-ac33e113306b.webp&sig=EMD9t1ZqlFM/dBQgUfCY/zvNRmrDNMMNBsubB9M6PLw%3D"
                alt="green iguana"
                className="object-cover"
              />
              <div
                className="hidden sm:block absolute bottom-0 left-0 right-0 h-[59px]"
                style={{
                  background: 'linear-gradient(to bottom, transparent, rgb(255, 255, 255))',
                }}
              />
            </div>
            <CardContent
              sx={{
                flex: 1,
                p: { xs: 1, sm: 2 },
                background: {
                  sm: 'linear-gradient(to top, rgba(255,255,255,0.5), #ffffff)',
                },
                position: { sm: 'relative' },
                zIndex: { sm: 1 },
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}
              >
                <span className="text-amber-600">Your Style, Delivered Fast!</span>
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
              >
                We promise our deals are almost as addictive as our puns. Almost.
              </Typography>
            </CardContent>
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
                src="https://plus.unsplash.com/premium_vector-1725973825187-d80d12a03bdc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNob3BpaW5nfGVufDB8fDB8fHww"
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
                  width: { xs: '90%', sm: '100%' },
                  maxWidth: { xs: 360, sm: 280, md: 320, lg: 345 },
                  mx: { xs: 'auto', sm: 0 },
                  display: 'flex',
                  flexDirection: { xs: 'row', sm: 'column' },
                  alignItems: { xs: 'center', sm: 'stretch' },
                }}
                className="flex"
              >
                <CardActionArea
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', sm: 'column' },
                    alignItems: { xs: 'center', sm: 'stretch' },
                    width: { xs: '40%', sm: '100%' },
                  }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <CardMedia
                    sx={{
                      width: { xs: 120, sm: '100%' },
                      height: { xs: 120, sm: 200, md: 250 },
                      flexShrink: 0,
                    }}
                    component="img"
                    image={item.thumbnail}
                    alt={item.title}
                    className="object-cover"
                  />
                </CardActionArea>
                <div className="flex flex-col flex-1 p-2 sm:p-0">
                  <CardContent sx={{ p: { xs: 1, sm: 2 }, flex: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ fontSize: { xs: '0.9rem', sm: '1.1rem' } }}
                    >
                      <Tooltip title={item.title} placement="top-end">
                        <p className="truncate max-w-[220px]">{item.title}</p>
                      </Tooltip>
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
                    >
                      <p className="font-semibold">${item.price}</p>
                    </Typography>
                  </CardContent>
                  <CardActions
                    className="flex items-center justify-between px-2 py-1 sm:h-12 sm:justify-center sm:mt-auto"
                    sx={{ flexDirection: { xs: 'row', sm: 'column' } }}
                  >
                    {isInCart ? (
                      <div className="w-full flex items-center justify-center">
                        <div className="text-green-700 flex items-center gap-1 text-xs font-bold">
                          <TiTick />
                          <p>Added</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between w-full gap-1.5 sm:flex-col sm:gap-2">
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
                </div>
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