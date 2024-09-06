import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Review from './Review';

const Rating = ({ ids, bintang, nama, judul, review }) => {
    const [food, setFood] = useState([]);

    const getFoodData = async () => {
        try {
            const response = await axios.get(`https://66d8f5674ad2f6b8ed531569.mockapi.io/restorans/${ids}/makanan`);
            setFood(response.data);
        } catch (error) {
            console.error('Error fetching makanan detail:', error);
        }
    };

    useEffect(() => {
        if (ids) {
            getFoodData(); // Panggil fungsi ketika komponen di-mount
        }
    }, [ids]); // Tambahkan dependency array dengan ids

    return (
        <>
            <div className="flex h-auto w-auto gap-4">

                {/* Section untuk menampilkan makanan yang direview */}
                <div className="flex flex-col w-[100%] gap-4">
                    <Review bintang={bintang} judul={judul} nama={nama}>
                        {review}
                    </Review>
                    {food.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {food.map((item) => (
                                <div key={item.id} className="flex items-center flex-col gap-1">
                                    {/* Avatar Makanan */}
                                    <div className="w-[4rem] h-[4rem] bg-cover rounded-sm border-black" style={{ backgroundImage: `url(${item.image})` }}></div>
                                    <h3 className='text-[12px]  text-center font-semibold'>{item.namaMakanan}</h3>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No food data available.</p>
                    )}
                </div>
            </div>

            {/* Contoh review, ini bisa diperluas dengan menggunakan data yang lebih dinamis */}
        </>
    );
};

export default Rating;
