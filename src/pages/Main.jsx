import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Divider from '../components/Divider';
import Card from '../components/Card';

const Main = () => {
  const [checked, setChecked] = useState(false);  // Untuk filter "Open Now"
  const [selectedPrice, setSelectedPrice] = useState('');  // Untuk filter harga
  const [searchCategory, setSearchCategory] = useState('');  // Untuk search kategori
  const [data, setData] = useState([]);

  // Ambil data dari API
  const getData = async () => {
    try {
      // Tentukan URL dengan atau tanpa query parameter kategori
      const url = searchCategory
        ? `https://66d8f5674ad2f6b8ed531569.mockapi.io/restorans?kategoriRestoran=${searchCategory}`
        : 'https://66d8f5674ad2f6b8ed531569.mockapi.io/restorans';

      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Toggle checkbox untuk filter "Open Now"
  const toggleCheckbox = () => {
    setChecked(prevChecked => !prevChecked);
  };

  useEffect(() => {
    getData();  // Fetch data saat halaman pertama kali di-load
  }, []);

  useEffect(() => {
    getData();  // Fetch ulang data ketika searchCategory berubah
  }, [searchCategory]);

  // Fungsi untuk memfilter data berdasarkan harga
  const filterByPrice = (event) => {
    setSelectedPrice(event.target.value);  // Mengatur state harga terpilih dari dropdown
  };

  // Fungsi untuk menangani perubahan input search
  const handleSearchCategory = (event) => {
    setSearchCategory(event.target.value);  // Mengatur state untuk kategori search
  };

  // Fungsi untuk memfilter berdasarkan rentang harga
  const isWithinPriceRange = (hargaBarang) => {
    if (!selectedPrice) return true; // Jika tidak ada harga yang dipilih, tampilkan semua
    switch (selectedPrice) {
      case "$10 - $50":
        return hargaBarang >= 10 && hargaBarang <= 50;
      case "$50 - $100":
        return hargaBarang > 50 && hargaBarang <= 100;
      case "$100 - $500":
        return hargaBarang > 100 && hargaBarang <= 500;
      case "$500 - $9999":
        return hargaBarang > 500 && hargaBarang <= 9999;
      default:
        return true;
    }
  };

  // Filter data berdasarkan checkbox "Open Now" dan harga
  const filteredData = data
    .filter(item => (checked ? item.bukaRestoran === true : true))  // Filter buka
    .filter(item => isWithinPriceRange(item.hargaRestoran));  // Filter berdasarkan harga

  return (
    <div className="px-[5vw] py-[2vw]">
      <h1>Restaurant</h1>
      <p className='w-[40%]'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi rerum dolore illum! Facere laboriosam itaque aut sapiente quod, nam consequatur!
      </p>
      <Divider />
      <div className="flex gap-5 items-center">
        <h1>Filter By:</h1>

        {/* Checkbox untuk filter "Open Now" */}
        <div className="flex gap-2 items-center cursor-pointer" onClick={toggleCheckbox}>
          <input
            type="checkbox"
            checked={checked}
            onChange={toggleCheckbox}
            className="cursor-pointer rounded-full"
          />
          <label htmlFor="" className="cursor-pointer">Open Now</label>
        </div>

        {/* Dropdown untuk filter Price */}
        <select className="form-control" name="type" onChange={filterByPrice}>
          <option value="">All Prices</option>
          <option value="$10 - $50">$10 - $50</option>
          <option value="$50 - $100">$50 - $100</option>
          <option value="$100 - $500">$100 - $500</option>
          <option value="$500 - $9999">$500 - $9999</option>
        </select>

        {/* Input search untuk kategori */}
        <div className="form-control flex items-center gap-5">
          <input
            className='border p-1'
            type="text"
            onChange={handleSearchCategory}
            value={searchCategory}
            placeholder="Search for category.."
          />
        </div>
      </div>

      <Divider />

      <section className="">
        <h1 className="text-2xl font-bold mb-4">All Restaurants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {
            filteredData.map((item) => (
              <Card
                key={item.id}
                rating={item.ratingRestoran}
                kategori={item.kategoriRestoran}
                pricing={item.hargaRestoran}
                gambar={item.image}
                judul={item.namaRestoran}
                paragraf={item.deskripsiRestoran}
                link={item.id}
                buka={item.bukaRestoran}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default Main;
