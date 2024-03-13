'use client'
 
import { useState } from 'react'
import { NAV_LINKS } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import Button from "./Button"

const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false); // State to track whether links are shown or hidden

  // Function to toggle the visibility of links
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
        <Link href="/">
          <Image src="/caz_logo.svg" alt="logo" width={250} height={75}/>
        </Link>
        
        {/* Conditionally render the links based on showLinks state */}
        <ul className={`h-full gap-12 lg:flex ${showLinks ? 'block' : 'hidden'}`}>
          {NAV_LINKS.map((link)=>(
            <Link href={link.href} key={link.key} className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
              {link.label}
            </Link>
          ))}
        </ul>
        
        {/* Toggle button for mobile view */}
        <div className="lg:flexCenter hidden">
            <Button 
              type="button"
              title="Login"
              icon="/user.svg"
              variant="btn_dark_green"
            />
        </div>
        
        {/* Add onClick event to toggleLinks when menu image is clicked */}
        <Image 
          src="menu.svg"
          alt="menu"
          width={32}
          height={32}
          className="inline-block cursor-pointer lg:hidden"
          onClick={toggleLinks}
        />
    </nav>
  )
}

export default Navbar;
