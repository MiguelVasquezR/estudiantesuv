import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Cargando from '../Components/Loading/Loading';
import Header from '../Components/Header';

import { getMovies } from '../Firebase/MovieService';

const Videoteca = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMovies().then((res) => { setPeliculas(res); setLoading(false) });
    }, []);

    const filteredMovies = useMemo(() => {
        return peliculas.filter(pelicula =>
            pelicula.titulo.toLowerCase().includes(search.toLowerCase())
        );
    }, [peliculas, search]);

    return (
        <>
            <Header />
            <form className="flex items-center justify-center my-5">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="border-b-[1px] border-b-[#000] outline-none p-1 w-[200px] xl:w-[400px]"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <section className='grid grid-cols-1 gap-5 mb-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-flow-col-5'>
                {!loading && filteredMovies.length > 0 ? (
                    filteredMovies.map((pelicula) => (
                        <div key={pelicula.id} className='w-[360px] h-[220px] shadow-md rounded-md grid grid-cols-2 gap-3 mx-auto my-5'>
                            <img src={pelicula.portada} alt={pelicula.titulo} className='h-[220px] w-[200px] object-contain rounded-md' />
                            <article className='flex flex-col justify-center gap-1'>
                                <p className='text-[12px] font-bold'>{pelicula.titulo}</p>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Código:</p>
                                    <p className='text-[10px]'>{pelicula.codigo}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Autor:</p>
                                    <p className='text-[10px]'>{`${pelicula.AUTOR.Nombre} ${pelicula.AUTOR.Paterno} ${pelicula.AUTOR.Materno || ''}`}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Formato:</p>
                                    <p className='text-[10px]'>{pelicula.tipo.toUpperCase()}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Tipo:</p>
                                    <p className='text-[10px]'>{pelicula.origen.toUpperCase()}</p>
                                </div>
                                <section>
                                    <h4 className='text-[12px] font-bold'>Género</h4>
                                    <div className='flex flex-row items-center justify-center gap-1'>
                                        {
                                            pelicula.GENEROS.map((genero, index) => { return <p key={index} className='text-[8px] bg-blue-500 text-white p-1 rounded-md text-secondary-a mt-1'>{genero}</p> })
                                        }
                                    </div>
                                </section>
                            </article>
                        </div>
                    ))
                ) : (
                    <div className='text-2xl font-bold text-center'>

                    </div>
                )}
            </section>
            {loading && <Cargando />}
        </>
    );
};

export default Videoteca;
