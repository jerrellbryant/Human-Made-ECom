"use client"

import { Content } from "@prismicio/client"
import { Environment, Cloud, Clouds, Text } from "@react-three/drei"
import { useRef } from "react"
import * as THREE from "three"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import FlyingDroid from "@/components/FlyingDroid"
import { useMediaQuery } from "@/hooks/useMediaQuery"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type SkyDiveProps = {
sentence: string | null;
texture: Content.SkyDiveSliceDefaultPrimary["texture"];
}

export default function Scene({sentence, texture}: SkyDiveProps) {
    const groupRef = useRef<THREE.Group>(null)
    const droidRef = useRef<THREE.Group>(null)
    const cloud1Ref = useRef<THREE.Group>(null)
    const cloud2Ref = useRef<THREE.Group>(null)
    const cloudsRef = useRef<THREE.Group>(null)
    const wordsRef = useRef<THREE.Group>(null)

    const ANGLE = 75 * (Math.PI / 180)

    const getXPosition = (distance: number) => distance * Math.cos (ANGLE)
    const getYPosition = (distance: number) => distance * Math.sin (ANGLE)

    const getXYPositions = (distance: number) => ({
        x: getXPosition(distance),
        y: getYPosition(-1 * distance)
    })

    useGSAP(()=>{
        if(!cloudsRef.current ||
            !droidRef.current ||
            !cloud1Ref.current ||
            !cloud2Ref.current ||
            !wordsRef.current
         )
         return;

         // Set intial positions

         gsap.set(cloudsRef.current.position, {z:10});
         gsap.set(droidRef.current.position, {...getXYPositions(-4),});

         gsap.set(wordsRef.current.children.map((word)=> word.position), 
            {...getXYPositions(7), z:2 }, 
        );

        // Spinning Can

        // gsap.to(droidRef.current.rotation, {
        //     y: Math.PI * 2,
        //     duration: 1.7,
        //     repeat: -1,
        //     ease: "none"
        // })

        // Infinite Cloud Movement
        const DISTANCE = 15;
        const DURATION = 6

        gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
            ...getXYPositions(DISTANCE)
        })

        gsap.to(cloud1Ref.current.position, {
            y: `+=${getYPosition(DISTANCE * 2)}`,
            x: `+=${getXPosition(DISTANCE * -2)}`,
            ease: "none",
            repeat: -1,
            duration: DURATION
        })

        gsap.to(cloud2Ref.current.position, {
            y: `+=${getYPosition(DISTANCE * 2)}`,
            x: `+=${getXPosition(DISTANCE * -2)}`,
            ease: "none",
            repeat: -1,
            delay: DURATION /2,
            duration: DURATION
        })


        const scrollTL = gsap.timeline({
            scrollTrigger: {
                trigger: ".skydive",
                pin: true,
                start: "top top",
                end: "+=2000",
                scrub: 1.5
            }
        })

        scrollTL
            .to("body",{
                backgroundColor: "#C0F0F5",
                overwrite: "auto",
                duration: 0.1,
            })
            .to(cloudsRef.current.position, {z:0, duration:.3}, 0)
            .to(droidRef.current.position, {x:0, y:0, duration: 0.3, ease: "back.out(1.7)" })
            .to(wordsRef.current.children.map((word)=> word.position),
            {
                keyframes: [
                    {x:0, y:0, z:-1},
                    {...getXYPositions(-7), z:-7}
                ],
                stagger: .3
            }, 0
        ) 
        .to(droidRef.current.position, {
            ...getXYPositions(4),
            duration: .5,
            ease: "back.in(1.7)"
        })
        .to(cloudsRef.current.position, {z:7, duration: .5})
    })


  return (
    <group ref={groupRef}>
        {/* Droid */}
        <group>
            <FlyingDroid 
                ref={droidRef} 
            >
                <pointLight intensity={30} color="#8C0413" decay={0.6}/>
            </FlyingDroid>
        </group>

         {/* Clouds */}
        <Clouds ref={cloudsRef}>
            <Cloud ref={cloud1Ref} bounds={[10, 10, 2]}/>
            <Cloud ref={cloud2Ref} bounds={[10, 10, 2]}/>
        </Clouds>

         {/* Text */}
         <group ref={wordsRef}>
            {sentence && <ThreeText sentence={sentence} color="#F97315"/>}
         </group>

        {/* <OrbitControls/> */}

         {/* Lights */}
        <ambientLight intensity={2} color="#9DDEFA" />
        <Environment files="/hdr/field.hdr" environmentIntensity={1.5}/>
        
    </group>
  )
}

function ThreeText ({sentence, color="white"}: {
    sentence: string;
    color?: string;
}) {
    const words = sentence.toUpperCase().split(" ");
    const material = new THREE.MeshLambertMaterial();

    const isDesktop = useMediaQuery("(min-width: 950px)", true);

    return words.map((word: string, wordIndex:number) => (
        <Text key={`${wordIndex}-${word}`}
        scale={isDesktop ? 1 : .5}
        color={color}
        material={material}
        font="/fonts/Alpino-Variable.woff"
        fontWeight={900}
        anchorX={"center"}
        anchorY={"middle"}
        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?"
        >{word}
        </Text>
    ))

}