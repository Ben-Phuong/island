import React, { useCallback, useRef, useState } from "react"
import { SignupFormProps } from "./SignupForm"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { signupAsync } from "../../api/user"

export const useSignupForm = (props: SignupFormProps) => {
  const nameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const pwdInput = useRef<HTMLInputElement>(null)

  const [emailError, setEmailError] = useState<string>("")
  const [pwdError, setPwdError] = useState<string>("")
  const [nameError, setNameError] = useState<string>("")
  const [signupMessage, setSignupMessage] = useState<string>("")

  const [loading, setLoading] = useState<boolean>(false)
  const handleEnter: React.KeyboardEventHandler = useCallback((event) => {
    if (event.key === "Enter") {
      // @ts-ignore
      const form = event.target.form
      const index = Array.prototype.indexOf.call(form, event.target)
      if (index < 2) {
        form.elements[index + 1].focus()
        event.preventDefault()
      }
    }
  }, [])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    if (loading) return
    let passed = true
    if ((nameInput.current?.value.length ?? 0) < 3) {
      passed = false
      setNameError(`Please include an "@" in the email address.`)
    } else setNameError("")
    if (!emailInput.current?.value.includes("@")) {
      passed = false
      setEmailError(`Please include an "@" in the email address.`)
    } else setEmailError("")
    if ((pwdInput.current?.value.length ?? 0) < 8) {
      passed = false
      setPwdError(`A password must be at least 8 characters`)
    } else setPwdError("")
    if (!passed) return
    signup()
  }
  const signup = async () => {
    const authentication = firebase.auth()
    setLoading(true)
    try {
      const response = await authentication.createUserWithEmailAndPassword(
        emailInput.current?.value ?? "",
        pwdInput.current?.value ?? ""
      )
      setLoading(false)
      if (response.user) {
        signupAsync({
          email: emailInput.current?.value,
          id: response.user.uid,
          username: nameInput.current?.value,
        })
        // verify email
        // response.user.sendEmailVerification()
        // props.showError("Sign Up success! Please verify your email.")
      }
    } catch (e: any) {
      props.showError("Something must be wrong. Please try again.")
      if (e.code === "auth/invalid-email") props.showError("Invalid email.")
      if (e.code === "auth/email-already-in-use")
        props.showError("Email already in use.")
    } finally {
      setLoading(false)
    }
  }

  return {
    handleEnter,
    emailInput,
    pwdInput,
    handleSubmit,
    emailError,
    pwdError,
    nameInput,
    nameError,
    loading,
    signupMessage,
  }
}
