import React, { useRef, useCallback, useState, useEffect } from "react"

export const useCreateMailModal = (props) => {
  const titleInput = useRef<HTMLInputElement>(null)
  const contentInput = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState<string>("")

  const handleLongEmail = (email: string) => {
    if (email.length < 30) return email
    else return `${email.substring(0, 27)}...`
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading("loading")
    console.log(contentInput.current?.value)
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
    handleSubmit,
    handleEnter,
    loading,
  }
}
