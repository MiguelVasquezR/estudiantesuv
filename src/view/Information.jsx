import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Cargando from '../Components/Loading/Loading';
import Header from '../Components/Header';
import { IoMdArrowBack } from "react-icons/io";
import Ubicacion from "../Components/Ubicacion";

const Información = () => {
    
    const navigate = useNavigate();
    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const [ubicacion, setUbiacion] = useState({});

    const goBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_IP}/texto/visualizar?id=${id}`)
            .then((res) => {
                setData(res.data);
                setUbiacion(JSON.parse(res.data.Ubicacion));
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            {
                isLoading ?
                    <Cargando />
                    :
                    <>
                        <Header />

                        <div onClick={goBack} className='px-4 py-8 cursor-pointer'>
                            <IoMdArrowBack size={30} />
                        </div>

                        <section className=' flex flex-col justify-center items-center gap-5 mx-auto w-[90%] lg:flex-row'>

                            <div className='shadow-md flex flex-row justify-center items-center gap-5 rounded-md text-center w-[100%] max-w-[500px] lg:w-[50%] lg:h-[500px] lg:flex-col'>
                                <picture><img src={`${data?.LinkFoto}`} className="rounded-md w-[150px] h-[180px] object-fill lg:w-[300px] lg:h-[330px]" /></picture>
                                <article className='flex flex-col gap-1 pb-1'>
                                    <h2 className='text-2xl font-bold'>{data?.Titulo}</h2>
                                    <h2 className='text-sm'>{data?.Codigo}</h2>
                                    <h2 className='text-sm'>{data?.Nombre} {data?.Paterno} {data?.Materno}</h2>
                                    <h2 className='text-sm'>{data?.Tipo}</h2>
                                </article>
                            </div>

                            <article className='text-justify py-5 lg:w-[50%]'>
                                <h2 className='text-xl font-bold'>Reseña</h2>
                                <p className='mt-5 leading-7'>{data?.Resena}</p>
                            </article>

                        </section>
                        <div className='w-[90%] xl:w-[40%] mx-auto xl:my-5 '>
                            <h2 className='text-xl font-bold'>Ubicación</h2>
                            <Ubicacion size={ubicacion?.repisa === '1' ? 4 : 6} col={ubicacion.columna} row={ubicacion.fila} />
                        </div>

                    </>
            }
        </>
    )
}



export default Información;