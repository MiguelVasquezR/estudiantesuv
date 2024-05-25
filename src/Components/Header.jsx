import React, { useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className='bg-[rgb(9,88,160)] w-screen text-white'>
            {isMenuOpen ? (
                <div className='flex flex-col items-center justify-center h-screen gap-5'>
                    <div className='fixed right-5 top-5'>
                        <IoMdClose size={50} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                    </div>
                    <div className='flex flex-col items-center justify-center gap-5'>
                        <Link to='/' className='text-[20px] my-3'>Inicio</Link>
                        <Link to='/books' className='text-[20px] my-3'>Libros</Link>
                        <Link to='/movies' className='text-[20px] my-3'>Películas</Link>
                    </div>
                </div>
            ) : (
                <div className='h-[100px] flex flex-row justify-between items-center px-5'>
                    <div>
                        <h2 className='text-xl font-bold'>Centro Documental</h2>
                    </div>
                    
                    <div className='flex-row items-center justify-center hidden gap-5 md:flex'>
                        <Link to='/' className='text-[20px] my-3'>Inicio</Link>
                        <Link to='/books' className='text-[20px] my-3'>Libros</Link>
                        <Link to='/movies' className='text-[20px] my-3'>Películas</Link>    
                    </div>
                    
                    
                    <CiMenuBurger className='md:hidden' size={50} onClick={() => setIsMenuOpen(!isMenuOpen)} />
                </div>
            )}
        </div>
    );
}

export default Header;
