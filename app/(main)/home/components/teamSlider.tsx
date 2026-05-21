'use client'
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { getTeams } from '@/app/lib/services/teams.service';
import SmallTeamCard from './smallTeamCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



function TeamsSlider() {

    const skeleton = Array.from({ length: 12 }, (_, i) => (
        <div
            key={i}
            className="animate-pulse h-24 w-20 rounded my-2 mx-1"
            style={{ background: 'var(--card-stripe)', border: '1px solid var(--border)' }}
        />
    ));


    const [teamsData, setTeamsData] = useState<React.ReactElement[]>([]);

    const fetchTeams = async () => {
        try {
            const teamsData = await getTeams();
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
    const charge = skeleton;

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchTeams();
    }, []);
    const settings = {
        dots: true,
        arrows: true,
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
                    arrows: false,
                    dots: false,
                },
            },
            {
                breakpoint: 575,
                settings: {
                    slidesToShow: 5,
                    arrows: false,
                    dots: false,
                },
            },
            {
                breakpoint: 470,
                settings: {
                    slidesToShow: 4,
                    arrows: false,
                    dots: false,
                },
            },
            {
                breakpoint: 410,
                settings: {
                    slidesToShow: 3,
                    arrows: false,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div
            className="rounded overflow-hidden px-2 py-4 sm:px-4"
            style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
            }}
        >
            <Slider {...settings}>
                {teamsData.length == 0 ? charge : teamsData}
            </Slider>
        </div>

    );
};

export default TeamsSlider;
