import React, { useRef, useCallback, useState, useEffect } from "react"
import TextToxicity from "@tensorflow-models/toxicity"
import { sendMailAsync, validateMailAsync } from "../../api/mail"

export const useCreateMailModal = (friendId: string | undefined) => {
  const titleInput = useRef<HTMLInputElement>(null)
  const contentInput = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState<string>("")
  const [error, setError] = useState<string>()

  const handleLongEmail = (email: string) => {
    if (email.length < 30) return email
    else return `${email.substring(0, 27)}...`
  }
  const handleSubmitAsync = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading("loading")
    setError("")
    try {
      // const validation = await validateMailAsync({
      //   content: contentInput.current?.value ?? "",
      //   title: titleInput.current?.value ?? "",
      // })
      // if (validation.status === "failed") {
      //   setLoading("")
      //   setError(validation.message)
      //   return
      // }
      const response = await sendMailAsync(
        {
          content: contentInput.current?.value ?? "",
          title: titleInput.current?.value ?? "",
        },
        friendId ? friendId : undefined
      )
      const responseError = response?.error || response?.message
      setError(responseError)
      setLoading(responseError ? "" : "done")
    } catch (error) {
      console.log(error)
      setLoading("")
    }
  }
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
  return {
    titleInput,
    contentInput,
    handleLongEmail,
    handleSubmitAsync,
    handleEnter,
    loading,
    error,
  }
}
