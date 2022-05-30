import { useState, useEffect } from "react"

const ZOOM_IN = "transition-all transform scale-0 duration-400"
const ZOOM_OUT = "transition-all transform scale-100 duration-400"
export const useAuthenticationForm = () => {
  const [authentication, setAuthentication] = useState<string>("login")
  const [transition, setTransition] = useState<string>("")
  const [error, setError] = useState<string>()
  // hide error after display
  useEffect(() => {
    if (!error) return
    const timeout = setTimeout(() => {
      setError(undefined)
    }, 3000)
    return () => clearTimeout(timeout)
  }, [error])
  // set transition
  useEffect(() => {
    if (transition === ZOOM_IN)
      setTimeout(() => {
        setAuthentication((auth) => (auth === "signup" ? "login" : "signup"))
        setTransition(ZOOM_OUT)
      }, 300)
  }, [transition])
  const closeSignupForm = () => {
    setAuthentication("login")
  }
  const changeForm = () => {
    setTransition(ZOOM_IN)
  }
  const showError = (error: string) => {
    setError(error)
  }

  return {
    authentication,
    closeSignupForm,
    transition,
    changeForm,
    error,
    showError,
  }
}
