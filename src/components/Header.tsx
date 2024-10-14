"use client"

import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP);

type Props = {}

export default function Header({}: Props) {
  useGSAP(() => {
    const animateIntro = gsap.timeline();

    animateIntro.fromTo(".logo-animate", 
      { 
        opacity: 0,
        y: -200,
        scale: 0.8,
      },
      { 
        opacity: 1,
        duration: 1.5,
        y: 0,
        scale: 1,
        ease: "elastic.out(1, 0.3)",
        transformOrigin: "center bottom"
      }
    );
  });

  return (
    <header className="header flex justify-center py-4 -mb-28">
      <div className="logo-animate opacity-0 w-full z-10 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px]">
        <img 
          src="./HumanMade-logo.png" 
          alt="Human-Made Logo" 
          className="w-full h-auto"
        />
      </div>
    </header>
  )
}