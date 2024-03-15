'use client'
import React, { useState, useEffect, FormEvent } from 'react';

const Cotizador = () => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [tipoVehiculo, setTipoVehiculo] = useState('');
    const [marca, setMarca] = useState('');
    const [year, setYear] = useState('');
    const [modelo, setModelo] = useState('');
    const [error, setError] = useState(null);
    const [marcas, setMarcas] = useState([]);
    const [modelos, setModelos] = useState([]);
    const [modeloDisabled, setModeloDisabled] = useState(true); // Disable Modelo select input initially

    const uri = process.env.NEXT_PUBLIC_URLSERVER;
    console.log(uri)
    useEffect(() => {
        // Fetch marcas from the server
        fetch(`${uri}/marcas`)
            .then(response => response.json())
            .then(data => setMarcas(data.marca))
            .catch(error => console.error('Error fetching marcas:', error));
    }, []);

    const handleMarcaChange = async (selectedMarca: string) => {
        setMarca(selectedMarca); // Update Marca
        setModelos([]); // Reset Modelo
        setModeloDisabled(true); // Disable Modelo select input
        if (selectedMarca && year) {
            // Fetch descripcion_2 based on selected marca and year
            try {
                const response = await fetch(`${uri}/model?marca=${selectedMarca}&year=${year}`);
                const data = await response.json();
                setModelos(data.Modelos);
                setModeloDisabled(false); // Enable Modelo select input
            } catch (error) {
                console.error('Error fetching descripcion_2:', error);
            }
        }
    };

    const handleYearChange = async (selectedYear: string) => {
        setYear(selectedYear); // Update Year
        setModelos([]); // Reset Modelo
        setModeloDisabled(true); // Disable Modelo select input
        if (selectedYear && marca) {
            // Fetch descripcion_2 based on selected marca and year
            try {
                const response = await fetch(`${uri}/model?marca=${marca}&year=${selectedYear}`);
                const data = await response.json();
                console.log(data);
                setModelos(data.Modelos);
                setModeloDisabled(false); // Enable Modelo select input
            } catch (error) {
                console.error('Error fetching descripcion_2:', error);
            }
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const cotizacion = { nombre, correo, codigoPostal, tipoVehiculo, marca, year, modelo };
    
        const response = await fetch(`${uri}/submit`, {
            method: 'POST',
            body: JSON.stringify(cotizacion),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
    
        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setNombre('');
            setCorreo('');
            setCodigoPostal('');
            setTipoVehiculo('');
            setMarca('');
            setYear('');
            setModelo('');
            setError(null);
            console.log('Nueva Cotización Enviada');
            sendWhatsAppMessage(nombre, correo, codigoPostal, tipoVehiculo, marca, year, modelo);
        }
    };
    
    function sendWhatsAppMessage(
        nombre: string,
        correo: string,
        codigoPostal: string,
        tipoVehiculo: string,
        marca: string,
        year: string,
        modelo: string
      ) {
        const phonenumber = process.env.PHONENUMBER;
        
        const encodedName = encodeURIComponent(nombre);
        const encodedEmail = encodeURIComponent(correo);
        const encodedCP = encodeURIComponent(codigoPostal);
        const encodedTV = encodeURIComponent(tipoVehiculo);
        const encodedMarca = encodeURIComponent(marca);
        const encodedYear = encodeURIComponent(year);
        const encodedModelo = encodeURIComponent(modelo);

        const url = `https://wa.me/${phonenumber}?text=*Nombre:* ${encodedName}%0a*Email:* ${encodedEmail}%0a*Código Postal:* ${encodedCP}%0a*Tipo de Vehículo:* ${encodedTV}%0a*Marca:* ${encodedMarca}%0a*Año:* ${encodedYear}%0a*Modelo:* ${encodedModelo}%0a%0aSolicitud de Cotización`;
       
    
        console.log("Opening WhatsApp link:", url);
        // Check if 'window' object is available
        if (typeof window !== 'undefined') {
            // Open the WhatsApp message URL in a new tab
            window.open(url, '_blank')?.focus(); // Use optional chaining to safely access focus()
        } else {
            // Handle the case when 'window' is not available (e.g., running in a non-browser environment)
            console.error('Window object is not available.');
        }
    }

    return (
        <section className='flexBetween max-container padding-container relative z-30 py-5'>
            <div className='w-60% bg-white p-8 rounded shadow-lg'>
                <h2 className='text-center mb-4'>Cotizador Autos CAZ Seguros</h2>
                <form className="w-60%" onSubmit={handleSubmit}>
                <input
                        className='mb-4 w-full px-3 py-2 border rounded'
                        type="text"
                        placeholder="Nombre"
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                    />
                      <input
                        className='mb-4 w-full px-3 py-2 border rounded'
                        type="email"
                        placeholder="Correo"
                        onChange={(e) => setCorreo(e.target.value)}
                        value={correo}
                    />
                    <input
                        className='mb-4 w-full px-3 py-2 border rounded'
                        type="number"
                        placeholder="Código Postal"
                        onChange={(e) => setCodigoPostal(e.target.value)}
                        value={codigoPostal}
                    />
                    <select
                        className='mb-4 w-full px-3 py-2 border rounded'
                        value={tipoVehiculo}
                        onChange={(e) => setTipoVehiculo(e.target.value)}
                    >
                        <option value="">Seleccione tipo de vehículo</option>
                        <option value="Auto">Auto</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Chofer App">Chofer App</option>
                        <option value="Pickup Personal">Pickup Personal</option>
                        <option value="Pickup Carga">Pickup Carga</option>
                    </select>
                    <select
                        className='mb-4 w-full px-3 py-2 border rounded'
                        value={marca}
                        onChange={(e) => handleMarcaChange(e.target.value)}
                    >
                        <option value="">Seleccione marca de vehículo</option>
                        {marcas.map((marca, index) => (
                            <option key={index} value={marca}>{marca}</option>
                        ))}
                    </select>
                    <input
                        className='mb-4 w-full px-3 py-2 border rounded'
                        type="number"
                        placeholder="Año de vehículo"
                        onChange={(e) => handleYearChange(e.target.value)}
                        value={year}
                    />
                    <select
                        className='mb-4 w-full px-3 py-2 border rounded'
                        value={modelo}
                        onChange={(e) => setModelo(e.target.value)}
                        disabled={modeloDisabled} // Disable Modelo select input if modeloDisabled is true
                    >
                        <option value="">Seleccione modelo de vehículo</option>
                        {modelos.map((modelo, index) => (
                            <option key={index} value={modelo}>{modelo}</option>
                        ))}
                    </select>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Cotizar
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Política de privacidad
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs mt-4">
                    &copy;2023 Cota Parada LLC. All rights reserved.
                </p>
            </div>
        </section>
    );
};

export default Cotizador;