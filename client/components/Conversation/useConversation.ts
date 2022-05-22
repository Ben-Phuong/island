import { useState } from "react"
import { Mail } from "../../type"

export const useConversation = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [selectedMail, setSelectedMail] = useState<Mail | null>()
  const closeDetailModal = () => {
    setModal(false)
    setSelectedMail(null)
  }
  const openDetailModal = (mail: Mail) => () => {
    setModal(true)
    setSelectedMail(mail)
  }
  return { modal, closeDetailModal, openDetailModal, selectedMail }
}
