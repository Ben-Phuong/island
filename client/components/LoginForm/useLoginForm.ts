import React, { useCallback, useEffect, useRef, useState } from "react"
export const useLoginForm = () => {
  const emailInput = useRef<HTMLInputElement>(null)
  const pwdInput = useRef<HTMLInputElement>(null)

  const [emailError, setEmailError] = useState<string>("")
  const [pwdError, setPwdError] = useState<string>("")

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
    } else setEmailError("")
    if ((pwdInput.current?.value.length ?? 0) < 8) {
      passed = false
      setPwdError(`A password must be at least 8 characters`)
    } else setPwdError("")
    if (!passed) return
    login()
  }
  const login = () => {
    alert(emailInput.current?.value + " " + pwdInput.current?.value)
  }

  return {
    handleEnter,
    emailInput,
    pwdInput,
    handleSubmit,
    emailError,
    pwdError,
  }
}
