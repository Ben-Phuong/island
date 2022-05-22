import { useState } from "react"

export const useHome = () => {
  // const { user, logout } = useUser()
  const user = {}
  const friends = {}
  const logout = () => {
    console.log("logout")
  }
  const [modal, setModal] = useState<string>("")
  const [selectedFriend, setSelectedFriend] = useState<any>()

  const openCreateFriendModal = () => {
    setModal("friend")
  }
  const openCreateRandomModal = () => {
    setModal("random")
  }
  const closeCreateModal = () => {
    setModal("")
  }
  const openFriendChat = (friend: any) => {
    console.log("open friend chat")
  }
  return {
    modal,
    openCreateFriendModal,
    closeCreateModal,
    openCreateRandomModal,
    logout,
    user,
    selectedFriend,
    openFriendChat,
    friends,
  }
}
