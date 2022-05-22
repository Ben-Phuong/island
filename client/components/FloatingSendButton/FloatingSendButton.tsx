import React from "react"
import SendIcon from "@mui/icons-material/Send"

export const FloatingSendButton = () => {
  return (
    <div className="absolute right-10 bottom-10">
      <button className="bg-slate-400/50 rounded-full drop-shadow-2xl">
        <SendIcon className="text-4xl m-2 text-blue-900 animate-pulse" />
      </button>
    </div>
  )
}
