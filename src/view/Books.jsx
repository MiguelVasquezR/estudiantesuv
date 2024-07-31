import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading/Loading";
import Header from "../Components/Header";


import { useNavigate } from "react-router-dom";
import {getTexts} from '../Firebase/TextService';

const CardBook = (t) => {
    const navigate = useNavigate();
    return (
        <div key={t.id} className="bg-[rgb(9,88,160)] text-wrap w-[95%] mx-auto rounded-md flex flex-row justify-center items-center py-5" onClick={()=>{navigate(`/information/${t?.id}`)}}>
            <picture className="w-[100px] h-[90%] border-secondary-a border-2">
                <img src={t?.Portada} className="h-[100%] w-screen object-cover" alt={t.Titulo} />
            </picture>
            <div className="w-48 text-center text-white">
                <h2 className="text-lg">{t?.Titulo}</h2>
                <h2 className="my-1 text-sm">{`${t?.AUTOR?.NOMBRE} ${t?.AUTOR?.PATERNO} ${t?.AUTOR?.MATERNO}`}</h2>
            </div>
        </div>
    )
}

const Books = () => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        getTexts().then((res)=>{setLibros(res);setLoading(false)});
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const librosFiltrados = libros.filter(libro =>
        libro.Titulo.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <Header />
            <form className="flex items-center justify-center my-5">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    className="border-b-[1px] border-b-[#000] outline-none p-1 w-[200px] xl:w-[400px]"
                    placeholder="Buscar"
                />
            </form>
            <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                {loading ? <Loading /> : librosFiltrados.map(libro => <CardBook key={libro.ID} {...libro} />)}
            </section>
        </>
    );
};

export default Books;
