import React from 'react'
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

const Review = ({ children, bintang, nama, judul }) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let currentDate = `${monthNames[date.getMonth()]} ${year}`;

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

    return (
        <div className=" h-fit w-auto"> {/*Review Section */}
            <div className="flex text-yellow-500">{renderStars(bintang)}</div>
            <div className="flex"> {/*Section user */}
                <div className="w-[3rem] h-[3rem] bg-cover rounded-full" style={{ backgroundImage: `url(https://www.nicepng.com/png/detail/635-6350140_female-computer-user-user-computer.png)` }}></div> {/*Avatar */}
                <div className="">
                    <h1>{nama}</h1>
                    <p>{currentDate}</p>
                </div>
            </div>
            <h1 className='font-bold text-[18px]'>{judul}</h1>{/*Judul Review */}
            <p className='text-[16px]'>{children}</p>
        </div>

    )
}

export default Review