import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading/Loading";
import Header from "../Components/Header";


import { useNavigate } from "react-router-dom";

const CardBook = ({ID, LinkFoto, Nombre, Paterno, Materno, Titulo }) => {
    const navigate = useNavigate();
    return (
        <div className="bg-[rgb(9,88,160)] text-wrap w-[95%] mx-auto rounded-md flex flex-row justify-center items-center py-5" onClick={()=>{navigate(`/information/${ID}`)}}>
            <picture className="w-[100px] h-[90%] border-secondary-a border-2">
                <img src={LinkFoto} className="h-[100%] w-screen object-cover" alt={Titulo} />
            </picture>
            <div className="w-48 text-center text-white">
                <h2 className="text-lg">{Titulo}</h2>
                <h2 className="my-1 text-sm">{`${Nombre} ${Paterno} ${Materno}`}</h2>
            </div>
        </div>
    )
}

const Books = () => {
    const [libros, setLibros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_IP}/texto/biblioteca`);
                if (res.data) {
                    setLibros(res.data);
                    setLoading(false);
                }
            } catch (err) {
                console.log("Error en la petición: " + err);
                setLoading(false);
            }
        };
        fetchData();
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
