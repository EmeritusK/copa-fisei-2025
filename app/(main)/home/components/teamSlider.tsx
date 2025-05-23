/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { TeamService } from '@/app/lib/services/teams.service';
import SmallTeamCard from './smallTeamCard';



function TeamsSlider() {

    const skeleton = [
        <div key={0} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={1} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={2} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={3} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={4} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={5} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={6} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={7} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={8} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={9} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={10} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,
        <div key={11} className=" animate-pulse bg-gray-700 h-24 w-20 rounded-lg"></div>,

    ]

    const [teamsData, setTeamsData] = useState<React.ReactElement[]>([]);

    const [charge, setCharge] = useState<React.ReactElement[]>(skeleton);


    useEffect(() => {
        fetchTeams();
    }, []);
    const fetchTeams = async () => {
        try {
            const teamsData = await TeamService.getTeams();
            if (teamsData) {
                const teamsSlider = [];
                for (const team of teamsData) {
                    teamsSlider.push(
                        <div key={team.id}>
                            <SmallTeamCard team={team}/>
                        </div>
                    )
                }
                setTeamsData(teamsSlider);
            }
        } catch (error) {
            console.error('Error al obtener equipos:', error);
        }
    };
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 14, // Cantidad de elementos a mostrar en pantalla
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // Cambiar la cantidad de elementos mostrados en diferentes tamaños de pantalla
                settings: {
                    slidesToShow: 9,
                },
            },
            {
                breakpoint: 845, // Cambiar la cantidad de elementos mostrados en diferentes tamaños de pantalla
                settings: {
                    slidesToShow: 7,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 6,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 5,
                },
            },
            {
                breakpoint: 470,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 410,
                settings: {
                    slidesToShow: 3,
                },
            },
        ],
    };

    return (
        <div className='mx-4'>
            <Slider {...settings}>
                {teamsData.length == 0 ? charge : teamsData}
            </Slider>
        </div>

    );
};

export default TeamsSlider;
