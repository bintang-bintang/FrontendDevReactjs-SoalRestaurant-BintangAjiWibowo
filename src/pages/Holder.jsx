import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import axios from 'axios'

const Holder = () => {
    const [data, setData] = useState(null)

    const getData = async () => {
        try {
            const response = await axios.get('https://66d8f5674ad2f6b8ed531569.mockapi.io/restorans')
            setData(response.data[0])  // Mengambil item pertama dari array
            console.log(data);
            

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    useEffect(() => {
        getData()
        console.log(data)   
    }, [])

    return (
        <div className='h-screen bg-blue-400 justify-center items-center flex'>
            {data ? (
                <Card key={data.id} gambar={data.image} judul={data.namaRestoran} paragraf={data.deskripsiRestoran} link="/" />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}

export default Holder
