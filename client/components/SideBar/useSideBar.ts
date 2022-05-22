import { useState } from "react"

export const useSideBar = () => {
  const [mode, setMode] = useState("friend")
  const switchMode = () => {
    console.log("switch mode")
    if (mode === "friend") setMode("stranger")
    else setMode("friend")
  }
  return { mode, switchMode }
}
