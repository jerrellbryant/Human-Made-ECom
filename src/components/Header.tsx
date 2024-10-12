import React from 'react'

type Props = {}

export default function Header({}: Props) {
  return (
        <header className="flex justify-center py-4 -mb-28 ">
              <div className="w-full Z-10 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] animate-logo">
           <img 
              src="./HumanMade-logo.png" 
              alt="Human-Made Logo" 
              className="w-full h-auto"
            />
            </div>

         </header>
  )
}