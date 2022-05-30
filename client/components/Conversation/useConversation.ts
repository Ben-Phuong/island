import { useState } from "react"
import { Mail } from "../../type"

export const useConversation = () => {
  const [modal, setModal] = useState<boolean>(false)
  const [selectedMail, setSelectedMail] = useState<{
    mail: Mail
    type: string
  } | null>()
  const closeDetailModal = () => {
    setModal(false)
    setSelectedMail(null)
  }
  const openDetailModal = (mail: Mail, type: string) => () => {
    setModal(true)
    setSelectedMail({ mail, type })
  }
  return { modal, closeDetailModal, openDetailModal, selectedMail }
}
