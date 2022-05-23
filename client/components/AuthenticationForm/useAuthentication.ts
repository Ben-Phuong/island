import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import { useUser } from "../../auth/useUser"

const ZOOM_IN = "transition-all transform scale-0 duration-400"
const ZOOM_OUT = "transition-all transform scale-100 duration-400"
export const useAuthenticationForm = () => {
  const router = useRouter()
  const [authentication, setAuthentication] = useState<string>("login")
  const [transition, setTransition] = useState<string>("")
  useEffect(() => {
    if (transition === ZOOM_IN)
      setTimeout(() => {
        setAuthentication((auth) => (auth === "signup" ? "login" : "signup"))
        setTransition(ZOOM_OUT)
      }, 600)
  }, [transition])
  const closeSignupForm = () => {
    setAuthentication("login")
  }
  const changeForm = () => {
    setTransition(ZOOM_IN)
  }
  return {
    authentication,
    closeSignupForm,
    transition,
    changeForm,
  }
}
