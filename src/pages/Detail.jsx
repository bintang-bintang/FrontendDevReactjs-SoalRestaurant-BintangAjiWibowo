import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { IoMdStar, IoMdStarOutline } from "react-icons/io";
import { RxDividerVertical as Garis } from "react-icons/rx";
import { FaCircle } from "react-icons/fa";

import Divider from '../components/Divider';
import Rating from '../components/Rating';

const Detail = () => {
  const { id } = useParams(); // Ambil parameter ID dari URL
  const [restaurant, setRestaurant] = useState({});
  const [food, setFood] = useState([]);

  // Fungsi untuk mengambil detail restoran berdasarkan ID
  const getRestaurantDetail = async () => {
    try {
      const response = await axios.get(`https://66d8f5674ad2f6b8ed531569.mockapi.io/restorans/${id}`);
      setRestaurant(response.data);
    } catch (error) {
      console.error('Error fetching restaurant detail:', error);
    }
  };

  const getFoodData = async () => {
    try {
      const response = await axios.get(`https://66d8f5674ad2f6b8ed531569.mockapi.io/restorans/${restaurant.id}/makanan`);
      setFood(response.data);
    } catch (error) {
      console.error('Error fetching makanan detail:', error);
    }
  };

  // Fungsi untuk toggle status bukaRestoran
  const toggleOpenStatus = async () => {
    try {
      const updatedStatus = !restaurant.bukaRestoran;
      await axios.put(`https://66d8f5674ad2f6b8ed531569.mockapi.io/restorans/${id}`, {
        ...restaurant,
        bukaRestoran: updatedStatus
      });
      setRestaurant({ ...restaurant, bukaRestoran: updatedStatus });
    } catch (error) {
      console.error('Error updating restaurant status:', error);
    }
  };

  const renderStars = (a) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= a) {
        stars.push(<IoMdStar key={i} />);  // Full star
      } else {
        stars.push(<IoMdStarOutline key={i} />);  // Outline star
      }
    }
    return stars;
  };

  const priceRange = (pricing) => {
    const prices = [];
    if (pricing < 50) {
      prices.push("$10 - $50");
    } else if (pricing < 100) {
      prices.push("$50 - $100");
    } else if (pricing < 500) {
      prices.push("$100 - $500");
    } else {
      prices.push("$500 - $9999");
    }
    return prices;
  };

  useEffect(() => {
    getRestaurantDetail(); // Panggil fungsi ketika komponen di-mount
    getFoodData(); // Panggil fungsi ketika komponen di-mount
  }, [id]);

  return (
    <>
      {restaurant ? (
        <div className='px-[6%] py-[2%] flex flex-col gap-2'>
          <a href="/" className='px-4 py-2 text-white bg-black rounded-md w-min'>Back</a>
          <h1>{restaurant.namaRestoran}</h1>
          <ul className='flex items-center gap-1'>
            <li className='font-bold'>{restaurant.kategoriRestoran}</li>
            <li><Garis /></li>
            <li>{priceRange(restaurant.hargaRestoran)}</li>
            <li><Garis /></li>
            <li className='flex self-center text-yellow-500'>{renderStars(restaurant.ratingRestoran)}</li>
            <li><Garis /></li>
            <li>
              {
                restaurant.bukaRestoran ? (
                  <div className='flex items-center gap-1'>
                    <span className='text-[8px] text-green-500'><FaCircle /></span>OPEN
                  </div>
                ) : (
                  <div className='flex items-center gap-1'>
                    <span className='text-[8px] text-red-500'><FaCircle /></span>CLOSED
                  </div>
                )
              }
            </li>
            <li>
              <button onClick={toggleOpenStatus} className='bg-blue-500 text-white px-3 py-1 rounded'>
                {restaurant.bukaRestoran ? 'Close Restaurant' : 'Open Restaurant'}
              </button>
            </li>
          </ul>
          <div className="w-auto h-[24em] bg-cover bg-no-repeat bg-center group duration-300 flex justify-center rounded-lg"
               style={{ backgroundImage: `url(${restaurant.image})` }}></div>
          <h1>Description</h1>
          <p>{restaurant.deskripsiRestoran}</p>
          <Divider />
          <h1>Rating and Reviews</h1>
          <p>Overview of overall satisfaction from our customers</p>
          <div className="flex">
            <div className="w-[35%]">
              <h1 className='font-bold text-[4rem] text-yellow-500'>4.0</h1>
              <p className='top-[-12px] font-thin'>3 ratings</p>
            </div>
            <div className="w-[65%] flex flex-col gap-10">
              <Rating ids={restaurant.id} bintang={4} nama={"User 1"} judul={"Review Makanan"} review={"Makanan sangat mengeyangkan dan murah"} />
              <Rating ids={restaurant.id} bintang={3} nama={"User 2"} judul={"Review Restoran"} review={"Tempat bersih dan nyaman tetapi pelayanan tidak memuaskan"} />
              <Rating ids={restaurant.id} bintang={5} nama={"User 3"} judul={"Review Pelayanan"} review={"Pelayanan yang sangat ramah"} />
            </div>
          </div>
        </div>
      ) : (
        <p className='h-screen bg-red-500 text-white justify-center items-center'>Loading...</p>
      )}
    </>
  );
};

export default Detail;
