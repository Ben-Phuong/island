import React from "react"
import SendIcon from "@mui/icons-material/Send"

export interface FloatingSendButtonProps {
  openCreateModal: React.MouseEventHandler
}
export const FloatingSendButton = (props: FloatingSendButtonProps) => {
  return (
    <div className="absolute right-10 bottom-10 z-0">
      <button
        title="Send new mail to friend"
        type="button"
        onClick={props.openCreateModal}
        className="bg-slate-400/50 rounded-full drop-shadow-2xl p-1.5"
      >
        <SendIcon className="text-4xl m-2 text-blue-900 animate-pulse w-14 h-14 hover:scale-110" />
      </button>
    </div>
  )
}
