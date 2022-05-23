import React, { useState } from "react"
import { UnreadMail } from "../../type"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

export const useSideBar = () => {
  const [mailDetail, setMailDetail] = useState<UnreadMail>()
  const openMailDetail = (mail: UnreadMail) => () => {
    setMailDetail(mail)
  }
  const addFriend = (mail: UnreadMail) => (e: React.MouseEvent) => {
    e.stopPropagation()
    console.log("add friend", mail.senderId, mail.receiverId)
  }
  const closeMailDetail = () => {
    setMailDetail(undefined)
  }

  return { openMailDetail, mailDetail, closeMailDetail, addFriend }
}
