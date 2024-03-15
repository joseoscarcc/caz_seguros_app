'use client'

import Image from 'next/image'
import Button from "@/components/Button";
import React, {useEffect, useState} from 'react'

const Hero = () => {
  const [marca, setMarca] = useState(""); // Initialize as an empty string
  const uri = process.env.URLSERVER;
  useEffect(()=> {
    fetch(`${uri}/marcas`).then(
      response => response.json()
    ).then(
      data => {
        // Assuming data is an object with a key "marca" containing an array of strings
        const marcasArray = data.marca;
        const randomMarca = marcasArray[Math.floor(Math.random() * marcasArray.length)];
        setMarca(randomMarca);
      }
    )
  }, [])
  
  return (
    <section className="max-container pading-container flex flex-col gap-20 py-10 pb-3 md:gap-28 lg:py-20 xl:flex-row">
      <div className='hero-map'/>

      <div className='relative z-20 flex flex-1 flex-col xl:w-1/2'>
        <Image 
          src="/umbrella.svg"
          alt="umbrella"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        />
        <h1 className='bold-52 lg:bold-88'>CAZ Seguros </h1>
        <p className='regular-16 mt-6 text-gray-30 xl:max-w-[520px]'>
          En CAZ Seguros cotizar tu seguro de auto nunca había sido tan fácil. Conoce nuestro cotizador de seguros y elige el plan con las coberturas para que protegas tu auto hoy.
        </p>

        <div className='my-11 flex flex-wrap gap-5'>
          <div className='flex items-center gap-2'>
            {Array(5).fill(1).map((_, index) => (
              <Image
                src="/star.svg"
                key={index}
                alt="star"
                width={24}
                height={24}
              />
            ))}
          </div>

          <p className='bold-16 lg:bold-20 text-blue-70'>
            48k
            <span className='regular-16 lg:regular-20 ml-1'>Excelente Servicio</span>
          </p>
        </div>

        <div className='flex flex-col w-full gap-3 sm:flex-row'>
              <Button 
                type="button" 
                title="Cotiza Aqui" 
                variant="btn_green"
                url="/cotizador"
              />
        </div>
      </div>

      <div className='relative flex flex-1 items-start'>
        <div className='relative z-20 flex w-[268px] flex-col gap-8 rounded-3xl bg-green-90 px-7 py-8'>
              <div className='flex flex-col'>
                <div className='flexBetween'>
                  <p className='regular-16 text-gray-20'>Modelo</p>
                  <Image src="/close.svg" alt="close" width={24} height={24} />
                </div>
                <p className='bold-20 text-white'>Bronco Sport Big Bend</p>
              </div>

              <div className='flexBetween'>
                <div className='flex flex-col'>
                  <p className='regular-16 text-gray-20'>Marca</p>
                  {marca ? <p className='bold-20 text-white'>{marca}</p> : <p>Loading...</p>}
                </div>
                <div className='flex flex-col'>
                  <p className='regular-16 text-gray-20'>Año</p>
                  <p className='bold-20 text-white'>2019</p>
                </div>
              </div>
              
        </div>
      </div>
    </section>
  )
}

export default Hero