import React, { useEffect, useState } from "react"
import { UnreadMail } from "../../type"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getUserFromServerAsync } from "../../api/user"
import { getUserFromCookie } from "../../auth/useCookie"

export const useSideBar = () => {
  const [mailDetail, setMailDetail] = useState<UnreadMail>()
  const [user, setUser] = useState<any>()
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
  useEffect(() => {
    const userFromCookie = getUserFromCookie()
    fetchUserAsync(userFromCookie)
  }, [])
  const fetchUserAsync = async (userFromCookie: any) => {
    try {
      const data = await getUserFromServerAsync(userFromCookie)
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }
  return { openMailDetail, mailDetail, closeMailDetail, addFriend, user }
}
