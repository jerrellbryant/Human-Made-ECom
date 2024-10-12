"use client"
import CircleText from "@/components/CircleText"

type Props = {}

export default function Footer({}: Props) {
  return (
    <footer className="bg-[#FEE832] text-[#FE6334]">
        <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4 py-10">
              <div className="w-full Z-10 max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] animate-logo">
                <img 
                    src="./HumanMade-logo.png" 
                    alt="Human-Made Logo" 
                    className="w-full h-auto"
                  />
              </div>
            <div className="absolute right-24 top-0 size-28 origin-center -translate-y-1/4 
            md:size-48 md:-translate-y-28">
                <CircleText />
            </div>
        </div>
    </footer>
  )
}