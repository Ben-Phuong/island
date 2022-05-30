import Image from "next/image"
import { useState } from "react"
import IslandSvg from "../../public/island.svg"

const ZOOM_IN = "transition-all transform scale-0 duration-400"
const ZOOM_OUT = "transition-all transform scale-100 duration-400"
export const AuthImagesSlide = () => {
  const [imageIndex, setImageIndex] = useState<number>(0)
  const [transition, setTrasition] = useState<string>()

  return (
    <div className="flex flex-1 justify-center relative flex-rol overflow-hidden">
      {/* <div className="overflow-hidden relative"> */}
      <div className="duration-700 ease-in-out">
        <Image src={IslandSvg} width={500} height={500} />
      </div>
      <div className="duration-700 ease-in-out">
        <Image src={IslandSvg} width={500} height={500} />
      </div>
      <div className="duration-700 ease-in-out">
        <Image src={IslandSvg} width={500} height={500} />
      </div>
      <div className="duration-700 ease-in-out">
        <Image src={IslandSvg} width={500} height={500} />
      </div>
      {/* </div> */}
    </div>
  )
}
