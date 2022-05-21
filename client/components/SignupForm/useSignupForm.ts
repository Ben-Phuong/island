import React, { useCallback, useRef, useState } from "react"
import { SignupFormProps } from "./SignupForm"

export const useSignupForm = (props: SignupFormProps) => {
  const nameInput = useRef<HTMLInputElement>(null)
  const emailInput = useRef<HTMLInputElement>(null)
  const pwdInput = useRef<HTMLInputElement>(null)

  const [emailError, setEmailError] = useState<string>("")
  const [pwdError, setPwdError] = useState<string>("")
  const [nameError, setNameError] = useState<string>("")

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
    let passed = true
    if ((nameInput.current?.value.length ?? 0) < 3) {
      console.log(nameInput.current)
      passed = false
      setNameError(`Please include an "@" in the email address.`)
    } else setNameError("")
    if (!emailInput.current?.value.includes("@")) {
      console.log(emailInput.current?.value)
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
  const signup = () => {
    alert(
      `${nameInput.current?.value} ${emailInput.current?.value} ${pwdInput.current?.value}`
    )
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
  }
}
