import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import Cargando from '../Components/Loading/Loading';
import Header from '../Components/Header';

const Videoteca = () => {
    const [peliculas, setPeliculas] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [peliculasResponse, generosResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_IP}/pelicula/listar`),
                    axios.get(`${import.meta.env.VITE_IP}/genero/listar-generos`)
                ]);

                setPeliculas(peliculasResponse.data || []);
                setGeneros(generosResponse.data || []);
            } catch (error) {
                console.error("Error en la petición:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredMovies = useMemo(() => {
        return peliculas.filter(pelicula =>
            pelicula.Titulo.toLowerCase().includes(search.toLowerCase())
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
            <section className='grid grid-cols-1 gap-5 px-5 mb-5 md:grid-cols-2 xl:grid-cols-3'>
                {!loading && filteredMovies.length > 0 ? (
                    filteredMovies.map((pelicula) => (
                        <div key={pelicula.ID} className='w-[360px] h-[220px] shadow-md rounded-md grid grid-cols-2 gap-3 mx-auto'>
                            <img src={pelicula.LinkFoto} alt={pelicula.Titulo} className='h-[220px] w-[200px] object-fill rounded-md' />
                            <article className='flex flex-col justify-center gap-1'>
                                <p className='text-[12px] font-bold'>{pelicula.Titulo}</p>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Código:</p>
                                    <p className='text-[10px]'>{pelicula.Codigo}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Autor:</p>
                                    <p className='text-[10px]'>{`${pelicula.Nombre} ${pelicula.Paterno} ${pelicula.Materno || ''}`}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Formato:</p>
                                    <p className='text-[10px]'>{pelicula.Tipo}</p>
                                </div>
                                <div>
                                    <p className='text-[8px] text-[#000]/50'>Tipo:</p>
                                    <p className='text-[10px]'>{pelicula.Proviene}</p>
                                </div>
                                <section>
                                    <h4 className='text-[12px] font-bold'>Género</h4>
                                    <div className='flex flex-row items-center justify-center gap-1'>
                                        {generos
                                            .filter(genero => genero.IDPelicula === pelicula.ID && genero.Nombre)
                                            .map(genero => (
                                                <p key={genero.ID} className='text-[8px] bg-primary p-1 rounded-md text-secondary-a mt-1'>
                                                    {genero.Nombre}
                                                </p>
                                            ))}
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
