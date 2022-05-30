import Head from "next/head"
import Conversation from "../Conversation"
import CreateMailModal from "../CreateMailModal"
import FloatingSendButton from "../FloatingSendButton"
import SideBar from "../SideBar"
import { useHome } from "./useHome"
import BgIsland from "../../public/bg_island.png"
import Image from "next/image"
export const Home = () => {
  const {
    modal,
    openCreateFriendModal,
    closeCreateModal,
    openCreateRandomModal,
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
    <div>
      <Head>
        <title>{`Island - ${
          selectedFriend ? selectedFriend.username : "Home"
        }`}</title>
      </Head>
      <div className="absolute w-screen h-screen z-0">
        <Image src={BgIsland} layout="fill" />
      </div>
      <div className="flex h-screen w-screen">
        <div className="md:flex flex-1 md:max-w-sm">
          <SideBar
            openCreateModal={openCreateRandomModal}
            selectedFriend={selectedFriend}
            openFriendChat={openFriendChat}
            friends={friends}
            mode={mode}
            switchMode={switchMode}
            unreadMails={unreadMails}
          />
        </div>
        <div className="flex flex-1 bg-blue-100/75">
          {selectedFriend ? (
            <Conversation
              sentMails={sentMails}
              receivedMails={receivedMails}
              selectedfriend={selectedFriend}
            />
          ) : null}
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
    </div>
  )
}
