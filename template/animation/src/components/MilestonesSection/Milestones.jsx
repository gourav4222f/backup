import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { MilestonesData } from '../../store/MilestonesData';
import { ScrollTrigger } from 'gsap/all';

function Milestones() {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
    const [milestonesactive, setMilestonesactive] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const radius = 125;
    const circumference = 2 * Math.PI * radius;
    const dashLength = (percentage / 100) * circumference;

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.Milestones-wrapper',
                start: 'top top',
                end: '+=4000',
                scrub: 1,
                pin: true,
                markers: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const scrollPercentage = progress * 100;
                    setPercentage(scrollPercentage);

                    // Calculate the active index based on scroll progress
                    const activeIndex = Math.min(
                        Math.floor(progress * MilestonesData.length),
                        MilestonesData.length - 1
                    );
                    setMilestonesactive(activeIndex);
                },
            },
        });

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
        };
    }, []);
    const topRef = useRef(null);
    const centerRef = useRef(null);
    const bottomRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Animate top (fade out and color to gray)
        tl.to(topRef.current, {
            y: -100,
            opacity: 0,
            color: '#d4d4d8',
            duration: 0.5,
            ease: 'power2.out'
        }, 0);

        // Center moves to top and turns gray
        tl.to(centerRef.current, {
            y: -100,
            color: '#d4d4d8',
            duration: 0.5,
            ease: 'power2.out'
        }, 0);

        // Bottom comes to center and turns red
        tl.fromTo(bottomRef.current,
            {
                y: 100,
                opacity: 0,
                color: '#d4d4d8',
            },
            {
                y: 0,
                opacity: 1,
                color: '#ff0000',
                duration: 0.6,
                ease: 'power2.out'
            },
            0.1
        );

    }, [milestonesactive]);
    return (
        <section id="Milestones-id" className="Milestones-class container mx-auto">

            <div className="p-1 grid grid-cols-12 gap-1 ">

                <div className="Milestones-wrapper w-full col-span-8 min-h-screen flex">

                    <div
                        id="Milestones-left"
                        className="w-2/6 p-2 overflow-hidden h-screen flex justify-center items-center flex-col gap-4"
                    >
                        <div className="flex items-center flex-col gap-2 max-h-56 overflow-hidden">
                            {MilestonesData.map((item, index) => (
                                <span
                                    key={index}
                                    className={clsx(
                                        'w-8 transition-all p-[1px] bg-black',
                                        milestonesactive === index ? 'Milestones-active' : ''
                                    )}
                                ></span>
                            ))}
                        </div>
                    </div>

                    <div id="Milestones-mid" className="w-4/6 flex justify-center items-center h-screen relative">
                        <div className="relative h-screen flex justify-center items-center">
                            <div className="w-[502px] h-[502px] border-2 border-gray-500 rounded-full z-20">
                                <div id="MilestonesYear" className="flex flex-col text-[200px] -translate-y-64 font-normal text-gray-400/35 -ml-36 ">
                                    {MilestonesData.map((item, index) => {
                                        const isTop = index === milestonesactive - 2;
                                        const isCenter = index === milestonesactive - 1;
                                        const isBottom = index === milestonesactive;

                                        if (isTop || isCenter || isBottom) {
                                            return (
                                                <span
                                                    key={index}
                                                    ref={
                                                        isTop
                                                            ? topRef
                                                            : isCenter
                                                                ? centerRef
                                                                : bottomRef
                                                    }
                                                    style={{
                                                        color: isCenter ? '#ff0000' : '#d4d4d8',
                                                        opacity: 1,
                                                    }}
                                                    className={clsx('', isCenter ? 'leading-none' : '')}
                                                >
                                                    {item.date.year}
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </div>
                            <svg
                                className="absolute w-[520px] h-[520px] z-30"
                                viewBox="0 0 260 260"
                            >
                                <circle
                                    cx="130"
                                    cy="130"
                                    r={radius}
                                    stroke="red"
                                    strokeWidth="2px"
                                    fill="none"
                                    strokeDasharray={`${dashLength} ${circumference}`}
                                    transform="rotate(-90 130 130)"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                <div id="Milestones-right" className="col-span-4 p-2 ml-auto w-full">
                    <div className="flex justify-evenly flex-col">
                        {MilestonesData.map((item, index) => (
                            <div
                                key={index}
                                className={clsx(
                                    'border-b-1 border-black/35 py-6 flex flex-col gap-6 max-w-10/12',
                                    milestonesactive === index ? ' bg-red-400/15' : ''
                                )}
                            >
                                <span className="text-xs font-black text-gray-600">
                                    {item.date.month} {item.date.year}
                                </span>
                                <h2 className="text-lg font-semibold">{item.title}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Milestones;