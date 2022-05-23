import React, { useRef, useCallback, useState, useEffect } from "react"
import TextToxicity from "@tensorflow-models/toxicity"

export const useCreateMailModal = (
  toxicModel: TextToxicity.ToxicityClassifier | undefined
) => {
  const titleInput = useRef<HTMLInputElement>(null)
  const contentInput = useRef<HTMLTextAreaElement>(null)
  const [loading, setLoading] = useState<string>("")

  const handleLongEmail = (email: string) => {
    if (email.length < 30) return email
    else return `${email.substring(0, 27)}...`
  }
  const handleSubmitAsync = async (event: React.FormEvent) => {
    event.preventDefault()
    if (toxicModel === undefined) {
      console.log("model not ready")
      // showError()
      return
    }
    setLoading("loading")
    try {
      const predictions = await toxicModel.classify([
        contentInput.current?.value ?? "",
        titleInput.current?.value ?? "",
      ])
      console.log("predictions", predictions)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading("done")
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
  }
}
