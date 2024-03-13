'use client'
 
import { useRouter } from 'next/navigation'

import Image from "next/image";

type ButtonProps = {
    type: 'button' | 'submit';
    title: string;
    icon?: string;
    variant: string;
    full?: boolean;
    // Add a prop for the internal URL
    url?: string;
}

const Button = ({type, title, icon, variant, full, url}: ButtonProps) => {
    const router = useRouter() // Use useClient instead of useRouter

    const handleClick = () => {
        // Check if a URL is provided
        if (url) {
            // Navigate to the specified URL
            router.push(url); // Use client.router.push instead of router.push
        }
    };

    return (
        <button
            className={`flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'}`}
            type={type}
            onClick={handleClick} // Call the handleClick function on button click
        >
            {icon && <Image src={icon} alt={title} width={24} height={24}/>}
            <label className="bold-16 whitespace-nowrap cursor-pointer">{title}</label>
        </button>
    );
};

export default Button;