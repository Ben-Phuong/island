import Head from "next/head"
import AuthenticationForm from "../AuthenticationForm"

export const Auth = () => {
  return (
    <div>
      <Head>
        <title>Island - Log in or Sign up</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      <div className="flex flex-col md:flex-row min-h-screen">
        <div className="hidden md:flex md:w-1/2 bg-black"></div>
        <div className="flex flex-1 min-h-screen px-20 py-20 items-center justify-center md:px-0">
          <AuthenticationForm />
        </div>
      </div>
    </div>
  )
}
