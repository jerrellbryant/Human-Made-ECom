"use client";
import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';

export type DroidProps = {
  scale?: number;
};

export function Droid({
  scale = 0.8,
  ...props
}: DroidProps) {
 const {nodes, materials, animations, scene} = useGLTF("/droid_06_-_rigged.glb")
 const {actions, clips} = useAnimations(animations, scene)
    
    useEffect(()=> {
        console.log(actions)
        //@ts-ignore
        actions["Droid_06_RigAction"].play()
    }, [])
     return(
        <group {...props} dispose={null} scale={scale}>
            <primitive object={scene}/>
        </group>
  );
}



// "use client"
// import { useAnimations, useGLTF } from "@react-three/drei"
// import { useEffect, useRef } from "react";
// import { Group } from "three";

// useGLTF.preload("/droid_06_-_rigged.glb");

// export default function Droid() {
//     const group = useRef<Group>(null);
//     const {nodes, materials, animations, scene} = useGLTF("/droid_06_-_rigged.glb")
//     const {actions, clips} = useAnimations(animations, scene)

//     useEffect(()=> {
//         console.log(actions)
//         //@ts-ignore
//         actions["Droid_06_RigAction"].play()
//     }, [])

//     return(
//         <group>
//             <primitive object={scene}/>
//         </group>
//     )
// }