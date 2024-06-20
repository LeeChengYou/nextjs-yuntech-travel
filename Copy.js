/** 
 * @author Cheng You Lee <901126jeff901126@gmail.com>
 */

'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Footer,
  FooterCopyright,
  FooterLink,
  FooterLinkGroup,
  Carousel,
  DarkThemeToggle,
} from "flowbite-react";
import Image from "next/image";
import CustomCard from "./components/Card";

export default function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await fetch('api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        setError(error.message || 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // 根據搜尋條件和篩選選項進行過濾
  const filteredItems = items.filter(item => {
    return (
      (item.ScenicSpotName.toLowerCase().includes(searchTerm.toLowerCase()) || searchTerm === '') &&
      (item.Class1 === filterCategory || filterCategory === '')
    );
  });

  return (
    <>
      <div className="bg-cyan-500">
        <div className="container mx-auto">
          <Navbar fluid className="bg-cyan-500">
            <NavbarBrand as={Link} href="/">
              <img src="https://www.yuntech.edu.tw/images/website_png/Group_640.png" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
              <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Yuntech-Travel</span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
              <NavbarLink href="#" className="text-white hover:text-yellow-500 hover:border-b-2">
                <span className="px-4 py-4 hover:text-yellow-500 hover:border-yellow-500">交通</span>
              </NavbarLink>
              <NavbarLink as={Link} href="#" className="text-white">
                <span className="px-4 py-4 hover:text-yellow-500 hover:border-yellow-500">景點</span>
              </NavbarLink>
              <NavbarLink href="#" className="text-white">
                <span className="px-4 py-4 hover:text-yellow-500 hover:border-yellow-500">關於我們</span>
              </NavbarLink>
            </NavbarCollapse>
            <DarkThemeToggle />
          </Navbar>
        </div>
      </div>

      <div className="flex justify-end items-center bg-white py-4 px-4 mb-8 text-black">
        <input
          type="text"
          placeholder="搜尋景點..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border border-gray-300 rounded-md py-2 px-4 mr-4"
        />
        <select
          value={filterCategory}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded-md py-2 px-4"
        >
          <option value="">所有類別</option>
          <option value="文化類">文化類</option>
          <option value="自然風景類">自然風景類</option>
          <option value="觀光工廠類">觀光工廠類</option>
        </select>
      </div>

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slide={false}>
          <img src="/images/banner/banner-1.jpg" alt="Banner 1" />
          <img src="/images/banner/banner-2.jpg" alt="Banner 2" />
          <img src="/images/banner/banner-3.jpg" alt="Banner 3" />
          <img src="/images/banner/banner-4.jpg" alt="Banner 4" />
        </Carousel>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto bg-cyan-500">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {searchTerm ? (
              filteredItems.slice(0, 8).map(item => (
                <CustomCard key={item.ScenicSpotID} item={item} />
              ))
            ) : (
              items.slice(0, 8).map(item => (
                <CustomCard key={item.ScenicSpotID} item={item} />
              ))
            )}
          </div>
        </div>
      </div>

      <Footer container>
        <FooterCopyright href="#" by="Flowbite™" year={2022} />
        <FooterLinkGroup>
          <FooterLink href="#">About</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Licensing</FooterLink>
          <FooterLink href="#">Contact</FooterLink>
        </FooterLinkGroup>
      </Footer>
    </>
  );
}
