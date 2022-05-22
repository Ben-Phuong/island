import { useState } from "react"

export const useConversation = () => {
  const [modal, setModal] = useState<boolean>(false)
  const closeDetailModal = (e) => {
    setModal(false)
  }
  const openDetailModal = () => {
    setModal(true)
  }
  return { modal, closeDetailModal, openDetailModal }
}
