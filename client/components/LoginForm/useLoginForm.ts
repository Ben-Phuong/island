import React, { useCallback, useEffect, useRef, useState } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

export const useLoginForm = () => {
  const emailInput = useRef<HTMLInputElement>(null)
  const pwdInput = useRef<HTMLInputElement>(null)

  const [emailError, setEmailError] = useState<string>("")
  const [pwdError, setPwdError] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const [loginMessage, setLoginMessage] = useState<string>("")

  const handleEnter: React.KeyboardEventHandler = useCallback((event) => {
    if (event.key === "Enter") {
      // @ts-ignore
      const form = event.target.form
      const index = Array.prototype.indexOf.call(form, event.target)
      if (index === 0) {
        form.elements[index + 1].focus()
        event.preventDefault()
      }
    }
  }, [])
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (loading) return
    let passed = true
    if (!emailInput.current?.value.includes("@")) {
      passed = false
      setEmailError(`Please include an "@" in the email address.`)
    } else setEmailError("")
    if ((pwdInput.current?.value.length ?? 0) < 8) {
      passed = false
      setPwdError(`A password must be at least 8 characters`)
    } else setPwdError("")
    if (!passed) return
    login()
  }
  const login = async () => {
    const authentication = firebase.auth()
    setLoading(true)
    try {
      const response = await authentication.signInWithEmailAndPassword(
        emailInput.current?.value ?? "",
        pwdInput.current?.value ?? ""
      )
      setLoading(false)
      if (response.user) {
        if (!response.user.emailVerified) {
          setLoginMessage("Email is not verified. Please verify your email.")
          return
        }
      }
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log(pos.coords)
        }, null)
      }
    } catch (e) {
      setLoginMessage("Something must be wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return {
    loginMessage,
    handleEnter,
    emailInput,
    pwdInput,
    handleSubmit,
    emailError,
    pwdError,
    loading,
  }
}
