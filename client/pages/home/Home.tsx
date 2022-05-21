import { NextPage } from "next"
import React from "react"
import { useUser } from "../../auth/useUser"

const Home: NextPage = () => {
  const { user, logout } = useUser()
  return <div onClick={logout}>Home</div>
}
export default Home
