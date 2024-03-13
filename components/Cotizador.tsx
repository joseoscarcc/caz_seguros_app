'use client'

import { useState, FormEvent } from 'react'

const Cotizador = () => {
    const [nombre, setNombre] = useState('')
    const [correo, setCorreo] = useState('')
    const [codigoPostal, setCodigoPostal] = useState('')
    const [tipoVehiculo, setTipoVehiculo] = useState('')
    const [marca, setMarca] = useState('')
    const [year, setYear] = useState('')
    const [modelo, setModelo] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const cotizacion = {nombre, correo, codigoPostal, tipoVehiculo, marca, year, modelo}
    
        const response = await fetch('/api/workouts', {
            method: 'POST',
            body: JSON.stringify(cotizacion),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setNombre('')
            setCorreo('')
            setCodigoPostal('')
            setTipoVehiculo('')
            setMarca('')
            setYear('')
            setModelo('')
            setError(null)
            console.log('Nueva Cotización Enviada')
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
                        <option value="Pickup Personal">Pick up Personal</option>
                        <option value="Carga">Carga</option>
                    </select>
                    <input
                        className='mb-4 w-full px-3 py-2 border rounded'
                        type="text"
                        placeholder="Marca de vehículo"
                        onChange={(e) => setMarca(e.target.value)}
                        value={marca}
                    />
                    <input
                        className='mb-4 w-full px-3 py-2 border rounded'
                        type="number"
                        placeholder="Año de vehículo"
                        onChange={(e) => setYear(e.target.value)}
                        value={year}
                    />
                    <input
                        className='mb-4 w-full px-3 py-2 border rounded'
                        type="text"
                        placeholder="Modelo de vehículo"
                        onChange={(e) => setModelo(e.target.value)}
                        value={modelo}
                    />
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Cotizar
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Política de privacidad
                        </a>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs mt-4">
                    &copy;2023 COPA LLC. All rights reserved.
                </p>
            </div>
        </section>
    );
};

export default Cotizador;