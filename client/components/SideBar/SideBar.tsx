import React from "react"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Avatar from "../Avatar"
import SideBarItem from "../SideBarItem"
import { useSideBar } from "./useSideBar"
import { Friend, Mail, UnreadMail } from "../../type"
import MailDetailModal from "../MailDetailModal"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
export interface SideBarProps {
  openFriendChat(friend: Friend): void
  openCreateModal: React.MouseEventHandler<HTMLButtonElement> | undefined
  friends: Array<Friend> | undefined
  selectedFriend: Friend | undefined
  mode: string
  switchMode: React.MouseEventHandler
  unreadMails: Array<UnreadMail> | undefined
}
export const SideBar = (props: SideBarProps) => {
  const { openMailDetail, mailDetail, closeMailDetail, addFriend } =
    useSideBar()
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 max-h-20 flex justify-between items-center px-7">
        <Avatar />
        <h1 className="font-mono text-3xl pointer-events-none">island</h1>
        <button
          title={
            props.mode !== "friend"
              ? "Mails from friends"
              : "Mails from strangers"
          }
          className="w-10 h-10 relative group"
          type="button"
          onClick={props.switchMode}
        >
          <NotificationsIcon className="text-sky-300 group-hover:text-sky-700 text-5xl" />
          <span className="flex absolute h-3 w-3 top-2 right-1.5 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>{" "}
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
      </div>
      <div className="flex flex-1 max-h-24 py-4 px-6">
        {props.mode === "stranger" && (
          <button
            onClick={props.switchMode}
            type="button"
            className="flex justify-center items-center self-center mr-3 rounded-full p-1 hover:bg-sky-400/30 "
          >
            <ArrowBackIcon className="text-blue-700 text-2xl" />
          </button>
        )}
        <button
          type="button"
          onClick={props.openCreateModal}
          className="flex-1 bg-blue-800/80 rounded-3xl font-mono text-white text-3xl hover:bg-blue-800"
        >
          Send Random
        </button>
      </div>
      <div className="flex relative flex-col flex-1 h-screen overflow-y-auto overscroll-none scrollbar overflow-x-visible pr-1 pl-2">
        {props.friends && props.mode === "friend" ? (
          props.friends.map((friend) => (
            <SideBarItem
              key={friend.username}
              friend={friend}
              onClick={() => props.openFriendChat(friend)}
              isSelectedFriend={
                friend.username === props.selectedFriend?.username
              }
            />
          ))
        ) : props.unreadMails && props.mode === "stranger" ? (
          props.unreadMails.map((mail, key) => (
            <SideBarItem
              key={key}
              friend={{
                username: mail.senderId,
                avatarUrl: mail.avatarUrl,
                latestTitle: mail.title,
              }}
              onClick={openMailDetail(mail)}
              addFriend={addFriend(mail)}
            />
          ))
        ) : (
          <>
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
            <SideBarItem />
          </>
        )}
      </div>
      {mailDetail ? (
        <MailDetailModal closeModal={closeMailDetail} mail={mailDetail} />
      ) : null}
    </div>
  )
}
