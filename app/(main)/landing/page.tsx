'use client'
import React, { useEffect } from "react";


export default function Home() {

    useEffect(() => {
        // const fetchEquipos = async () => {
        //     try {
        //         const teamsData = await ConexionSB.getEquipos();
        //         if (teamsData) {
        //             setTeamsData(teamsData);
        //         }
        //     } catch (error) {
        //         console.error('Error al obtener equipos:', error);
        //     }
        // };
        // fetchEquipos();
    }, []);

    return (
        <>
            {/* Seccion equipos */}
            <div className='mx-6 my-12'>
                <h4 className='text-whiteColor font-roboto font-semibold text-2xl mb-6'>EQUIPOS</h4>
                {/* <TeamsSlider ></TeamsSlider> */}

            </div>
            {/* Seccion Partidos */}
            <div className='mx-6 my-12'>
                <h4 className='text-whiteColor font-roboto font-semibold text-2xl mb-6'>PARTIDOS HOY</h4>
                <div className='px-0  sm:px-32 w-full'>
                    {/* <PartidosToday></PartidosToday> */}
                </div>

            </div>

            <div>


            </div>

        </>

    )
}