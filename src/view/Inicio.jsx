import React, { useState } from 'react';
import Fonto from '../images/libro.png'
import Logo from '../images/Logo.png'
import { Link } from 'react-router-dom';

const Inicio = () => {
    const [viewOption, setViewOption] = useState(false);

    return (
        <>
            <section className='flex items-center justify-center w-screen h-screen text-center text-white bg-cover' style={{ backgroundImage: `url(${Fonto})` }}>

                <div className="flex flex-col items-center justify-center gap-5 px-5 xl:flex-row">

                    <div className='flex flex-col items-center justify-center xl:w-[50%]'>
                        <img src={Logo} className='' />
                        <h2 className='text-2xl font-bold'>Bienvenido al centro documental</h2>
                    </div>

                    <div className='flex flex-col items-center justify-center gap-5 xl:w-[50%]'>
                        <p className='text-sm xl:text-xl'>
                            Aquí encontrarás una amplia variedad de obras literarias que alimentarán tu imaginación y ayudarán en tu recorrido acádemico dentro de la facultad. Además, podrán sumergirse en emocionantes juegos que desafiarán su mente y estimularán su creatividad. Este espacio no es solo físico, es un refugio para corazones curiosos y mentes inquietas. ¡Disfruten cada momento en este lugar diseñado especialmente para ustedes, donde la magia de las palabras cobra vida!
                        </p>
                        {viewOption ?
                            <ul className='flex flex-col items-center justify-center gap-5'>
                                <li className='border-[1px] border-solid border-[#fff] rounded-md w-[150px] h-[40px] flex justify-center items-center'><Link to="/books">Libros</Link></li>
                                <li className='border-[1px] border-solid border-[#fff] rounded-md w-[150px] h-[40px] flex justify-center items-center'><Link to="/movies">Películas</Link></li>
                            </ul>
                            :
                            <button onClick={() => setViewOption(!viewOption)} className='border-[1px] border-solid border-[#fff] rounded-md p-3'>
                                Descubre nuestro material
                            </button>
                        }
                    </div>

                </div>
            </section>

        </>
    )
}

export default Inicio;