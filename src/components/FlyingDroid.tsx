"use client"

import  {Droid}  from "@/components/Droid";
import { useProgress, Html } from "@react-three/drei";
import { forwardRef, ReactNode, Suspense } from "react";
import { Group } from 'three'

function Loader() {
    const{progress, active} = useProgress()

    return <Html center>{progress.toFixed(1)}% loaded</Html>
}

type FlyingDroidProps = {
    floatSpeed?: number;
    floatIntensity?: number;
    floatRanges?: [number, number];
    children?: ReactNode;
}

const FlyingDroid = forwardRef<Group, FlyingDroidProps>(({
    floatSpeed = 1.5,
    floatIntensity = 1,
    floatRanges = [-0.1, 0.1],
    children,
    ...props
}, ref) => {
    return (
        <group ref={ref}{...props}>
                {children}
                <Suspense fallback={<Loader />}>
                    <Droid/>
                </Suspense>
        </group>
    )
})

FlyingDroid.displayName = "FlyingDroid"

export default FlyingDroid