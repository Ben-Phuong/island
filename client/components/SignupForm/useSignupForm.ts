import React, { useCallback, useRef, useState } from "react"
import { SignupFormProps } from "./SignupForm"

export const useSignupForm = (props: SignupFormProps) => {
  const handleClose: React.MouseEventHandler = (event) => {
    props.callback()
  }
  const emailInput = useRef<HTMLInputElement>(null)
  const pwdInput = useRef<HTMLInputElement>(null)

  const [emailError, setEmailError] = useState<string>("")
  const [pwdError, setPwdError] = useState<string>("")
  const [isSignup, setIsSignup] = useState<boolean>(false)
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
    let passed = true
    if (!emailInput.current?.value.includes("@")) {
      passed = false
      setEmailError(`Please include an "@" in the email address.`)
    }
    if ((pwdInput.current?.value.length ?? 0) < 8) {
      passed = false
      setPwdError(`A password must be at least 8 characters`)
    }
    if (!passed) return
    setEmailError("")
    setPwdError("")
    login()
  }
  const login = () => {
    alert(emailInput.current?.value + " " + pwdInput.current?.value)
  }
  const openSignupForm = () => {
    setIsSignup(true)
  }
  const closeSignupForm = () => {
    setIsSignup(false)
  }
  return {
    openSignupForm,
    isSignup,
    handleEnter,
    emailInput,
    pwdInput,
    handleSubmit,
    emailError,
    pwdError,
    closeSignupForm,
    handleClose,
  }
}
