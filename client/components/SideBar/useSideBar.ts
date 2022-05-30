import React, { useEffect, useState } from "react"
import { UnreadMail } from "../../type"
import "firebase/compat/auth"
import { getUserFromServerAsync } from "../../api/user"
import { makeFriendAsync } from "../../api/friend"

export const useSideBar = () => {
  const [mailDetail, setMailDetail] = useState<UnreadMail>()
  const [user, setUser] = useState<any>()
  const openMailDetail = (mail: UnreadMail) => () => {
    setMailDetail(mail)
  }
  const addFriend = (mail: UnreadMail) => async (e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const data = await makeFriendAsync({ friendId: mail.senderId })
    } catch (error) {
      console.log(error)
    }
  }
  const closeMailDetail = () => {
    setMailDetail(undefined)
  }
  useEffect(() => {
    fetchUserAsync()
  }, [])
  const fetchUserAsync = async () => {
    try {
      const data = await getUserFromServerAsync()
      setUser(data)
    } catch (error) {
      console.log(error)
    }
  }
  return { openMailDetail, mailDetail, closeMailDetail, addFriend, user }
}
