import React from "react"
import NotificationsIcon from "@mui/icons-material/Notifications"
import Avatar from "../Avatar"

export const SideBar = () => {
  return (
    <div className="flex flex-1 border-r border-gray-500 flex-col">
      <div className="flex-1 max-h-20 flex justify-between items-center px-7">
        <Avatar />
        <button className="w-10 h-10 relative">
          <NotificationsIcon className="text-5xl text-blue-300" />
          {/* <div className="relative inline-flex"> */}
          <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>{" "}
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
          </span>
        </button>
        {/* </div> */}
      </div>
      <div className="flex relative flex-col flex-1 h-screen overflow-y-scroll overscroll-none scrollbar p-2 overflow-x-visible pr-1">
        <div className="flex-none w-full h-32 rounded-md bg-slate-600 my-1"></div>
        <div className="flex-none w-full h-32 rounded-md bg-slate-600 my-1"></div>
        <div className="flex-none w-full h-32 rounded-md bg-slate-600 my-1"></div>
        <div className="flex-none w-full h-32 rounded-md bg-slate-600 my-1"></div>
        <div className="flex-none w-full h-32 rounded-md bg-slate-600 my-1"></div>
        <div className="flex-none w-full h-32 rounded-md bg-slate-600 my-1"></div>
        <div className="flex-none w-full h-32 rounded-md bg-slate-600 my-1"></div>
      </div>
    </div>
  )
}
