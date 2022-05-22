import { NextPage } from "next"
import React from "react"
import { useUser } from "../../auth/useUser"
import Conversation from "../../components/Conversation"
import CreateMailModal from "../../components/CreateMailModal"
import FloatingSendButton from "../../components/FloatingSendButton"
import MailDetailModal from "../../components/MailDetailModal"
import SideBar from "../../components/SideBar"
import useHome from "../../components/useHome"

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
    receivedMails,
    sentMails,
    mode,
    switchMode,
    unreadMails,
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
          mode={mode}
          switchMode={switchMode}
          unreadMails={unreadMails}
        />
      </div>
      <div className="flex flex-1 bg-blue-100/75">
        <Conversation
          sentMails={sentMails}
          receivedMails={receivedMails}
          selectedfriend={selectedFriend}
        />
      </div>
      {selectedFriend ? (
        <FloatingSendButton openCreateModal={openCreateFriendModal} />
      ) : null}
      {modal && (
        <CreateMailModal
          closeModal={closeCreateModal}
          to={modal}
          friend={selectedFriend}
        />
      )}
    </div>
  )
}
export default Home
