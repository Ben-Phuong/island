import { NextPage } from "next"
import React from "react"
import { useUser } from "../../auth/useUser"
import FloatingSendButton from "../../components/FloatingSendButton"
import SideBar from "../../components/SideBar"

const Home: NextPage = () => {
  // const { user, logout } = useUser()
  return (
    <div className="flex h-screen">
      <div className="md:flex flex-1 md:max-w-sm hidden">
        <SideBar />
      </div>
      <FloatingSendButton />
    </div>
  )
}
export default Home
