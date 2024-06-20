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
  Card,
  DarkThemeToggle,
  Flowbite,
  Button,
} from "flowbite-react";
import Image from "next/image";
import CustomCard from "./components/Card";
export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('api/items');
      const data = await response.json();
      console.log(data);
      setItems(data);
    }
    fetchData();
  }, []);

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
              <NavbarLink as={Link} href="#" className="text-white" >
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

      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel slide={false}>
          <img src="/images/banner/banner-1.jpg" alt="由 WU PEI HSUAN - 自己的作品, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=110297869" />
          <img src="/images/banner/banner-2.jpg" alt="由 abc759kimo - 自己的作品, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=94599070" />
          <img src="/images/banner/banner-3.jpg" alt="由 人人生來平等 - 自己的作品, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=73419933" />
          <img src="/images/banner/banner-4.jpg" alt="由 Guanting Chen - 自己的作品, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=64223892" />
        </Carousel>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto bg-cyan-500">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {items.slice(0, 8).map(item => (
              <CustomCard key={item.ScenicSpotID} item={item} />
            ))}
          </div>
        </div>
      </div>

      <Footer container >    
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
