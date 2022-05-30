import Head from "next/head"
import Image from "next/image"
import AuthenticationForm from "../AuthenticationForm"
import AuthImagesSlide from "../AuthImagesSlide"
import IslandSvg from "../../public/island.svg"
export const Auth = () => {
  return (
    <div>
      <Head>
        <title>Island - Log in or Sign up</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-r from-sky-200 to-blue-700">
        <div className="hidden md:flex md:w-1/2 md:justify-center">
          <Image src={IslandSvg} width={500} height={500} />
        </div>
        <div className="flex flex-1 min-h-screen px-20 py-20 items-center justify-center md:px-0 flex-col relative ">
          <AuthenticationForm />
        </div>
      </div>
    </div>
  )
}
