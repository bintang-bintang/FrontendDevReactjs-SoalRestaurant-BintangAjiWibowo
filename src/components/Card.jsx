import React from 'react'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";
import { FaCircle } from "react-icons/fa";


const Card = ({ gambar, judul, rating, kategori, pricing, link, buka }) => {

    // Fungsi untuk menghasilkan bintang sesuai rating
    const renderStars = (a) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= a) {
                stars.push(<IoMdStar />);  // Full star
            } else {
                stars.push(<IoMdStarOutline />);  // Outline star
            }
        }

        return stars;
    };
    const priceRange = (pricing) => {
        const prices = [];

        if (pricing < 50) {
            prices.push("$10 - $50")
        }
        else if (pricing < 100) {
            prices.push("$50 - $100")
        }
        else if (pricing < 500) {
            prices.push("$50 - $500")
        } else {
            prices.push("$500 - $9999");
        }

        return prices;
    };

    return (
        <div className="flex flex-col bg-main w-[14em] h-fit rounded-[2px] transition-transform ease-in-out duration-[245ms] group">

            {gambar ? (
                <a href={`/detail/${link}`} target='_blank'>
                    <div className="w-auto h-[12em] bg-cover bg-no-repeat bg-center rounded-t-[2px] group duration-300 flex justify-center" style={{ backgroundImage: `url(${gambar})` }} >
                        <div className='bg-black h-[100%] w-[100%] absolute opacity-0 group-hover:opacity-60 ease-in-out duration-200'></div>
                        <span className='self-center text-white opacity-0 group-hover:opacity-100'>Preview</span>
                    </div>
                </a>
            ) : (
                <div className="w-auto h-[12em] bg-cover bg-no-repeat bg-center rounded-t-[2px]">Tidak ada gambar</div>
            )}

            <div className="bg-second w-auto h-min py-3 rounded-b-[2px] flex flex-col gap-1">
                <h1 className='text-[16px] font-medium'>{judul}</h1>

                {/* Bagian rating */}
                <div className='flex text-yellow-500'>
                    {renderStars(rating)}
                </div>

                <p className='text-[14px] font-normal'></p>
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <p className='text-[14px] font-normal flex items-center gap-1'>{kategori} <span className='text-[5px] mr-1'>{'\u2B24'}</span></p>
                        <p className='text-[14px] font-normal'>{priceRange(pricing)}</p>
                    </div>
                    <p>
                        {
                            buka ?
                                (<div className='flex items-center gap-1'> <span className='text-[8px] text-green-500'><FaCircle /></span>OPEN</div>)
                                : (<div className='flex items-center gap-1'> <span className='text-[8px] text-red-500'><FaCircle /></span>CLOSED</div>)
                        }
                    </p>
                </div>
            </div>

            <a href={`/detail/${link}`} target='_blank' className='bg-red-500 mt-2 text-center'>Learn More</a>
        </div>
    );
}

export default Card;
