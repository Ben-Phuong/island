import { NextPage } from "next"
import React from "react"
import { useUser } from "../../auth/useUser"
import Conversation from "../../components/Conversation"
import CreateMailModal from "../../components/CreateMailModal"
import FloatingSendButton from "../../components/FloatingSendButton"
import MailDetailModal from "../../components/MailDetailModal"
import SideBar from "../../components/SideBar"
import { useHome } from "./useHome"

const Home: NextPage = () => {
  const {
    modal,
    openCreateFriendModal,
    closeCreateModal,
    openCreateRandomModal,
    logout,
    user,
    selectedFriend,
    openFriendChat,
    friends,
  } = useHome()
  return (
    <div className="flex h-screen w-screen">
      <div className="md:flex flex-1 md:max-w-sm">
        <SideBar
          openCreateModal={openCreateRandomModal}
          logout={logout}
          selectedFriend={selectedFriend}
          openFriendChat={openFriendChat}
          friends={friends}
        />
      </div>
      <div className="flex flex-1 bg-blue-100/75">
        <Conversation />
      </div>
      <FloatingSendButton openCreateModal={openCreateFriendModal} />
      {modal && <CreateMailModal closeModal={closeCreateModal} to={modal} />}
    </div>
  )
}
export default Home
