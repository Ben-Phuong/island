import React from "react"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Avatar from "../Avatar"
import SideBarItem from "../SideBarItem"
import { useSideBar } from "./useSideBar"

export const SideBar = (props: any) => {
  const { mode, switchMode } = useSideBar()
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex-1 max-h-20 flex justify-between items-center px-7">
        <Avatar logout={props.logout} />
        <h1 className="font-mono text-3xl pointer-events-none">island</h1>
        <button
          className="w-10 h-10 relative"
          type="button"
          onClick={switchMode}
        >
          <NotificationsIcon className="text-5xl text-sky-300 hover:text-sky-700" />
          <span className="flex absolute h-3 w-3 top-2 right-1.5 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>{" "}
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </button>
      </div>
      <div className="flex flex-1 max-h-24 py-4 px-6">
        <button
          type="button"
          onClick={props.openCreateModal}
          className="flex-1 bg-blue-800/80 rounded-3xl font-mono text-white text-3xl hover:bg-blue-800"
        >
          Send Random
        </button>
      </div>
      <div className="flex relative flex-col flex-1 h-screen overflow-y-auto overscroll-none scrollbar overflow-x-visible pr-1 pl-2">
        <SideBarItem isCurrentFriend />
        <SideBarItem />
        <SideBarItem isCurrentFriend />
        <SideBarItem />
        <SideBarItem />
        <SideBarItem />
        <SideBarItem />
      </div>
    </div>
  )
}
