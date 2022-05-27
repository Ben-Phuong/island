import { useEffect, useRef, useState } from "react"
import { getFriendListAsync } from "../../api/friend"
import { getFriendsMailsAsync, getUnreadMailsAsync } from "../../api/mail"
import { Friend, Mail, UnreadMail } from "../../type"

export const useHome = () => {
  const [friends, setFriends] = useState<Array<Friend>>()
  const [selectedFriend, setSelectedFriend] = useState<Friend>()
  const [receivedMails, setReceivedMails] = useState<Array<Mail>>()
  const [sentMails, setSentMails] = useState<Array<Mail>>()
  const [unreadMails, setUnreadMails] = useState<Array<UnreadMail>>()
  const [friendsMails, setFriendsMails] = useState<any>()
  const [modal, setModal] = useState<string>("")

  const fetchReceived = useRef<NodeJS.Timeout>()
  const fetchSent = useRef<NodeJS.Timeout>()

  const openCreateFriendModal = () => {
    setModal("friend")
  }
  const openCreateRandomModal = () => {
    setModal("random")
  }
  const closeCreateModal = () => {
    setModal("")
  }
  const openFriendChat = (friend: Friend) => {
    setSelectedFriend(friend)
  }
  const [mode, setMode] = useState<string>("friend")
  const switchMode = () => {
    if (mode === "friend") setMode("stranger")
    else setMode("friend")
  }

  // update received and sent when selected new user
  useEffect(() => {
    if (!selectedFriend) return
    setReceivedMails(friendsMails?.received[selectedFriend.id] ?? [])
    setSentMails(friendsMails?.sent[selectedFriend.id] ?? [])
  }, [selectedFriend])

  // mode: friend => fetch friend list || mode: stranger => fetch unread mails
  useEffect(() => {
    if (mode === "friend") {
      fetchFriendListAsync()
      fetchFriendsMailsAsync()
    } else fetchUnreadMailsAsync()
  }, [mode])
  const fetchFriendListAsync = async () => {
    try {
      const data = await getFriendListAsync()
      if (data.error) {
        showError(data.error)
        // setTimeout(fetchFriendListAsync, 2000)
        return
      }
      setFriends(data.friends)
    } catch (error) {
      console.log(error)
    }
  }
  const fetchFriendsMailsAsync = async () => {
    try {
      const data = await getFriendsMailsAsync()
      if (data.error) {
        showError(data.error)
        return
      }
      setFriendsMails({ received: data.receivedMails, sent: data.sentMails })
    } catch (error) {
      console.log(error)
    }
  }
  const fetchUnreadMailsAsync = async () => {
    const data = await getUnreadMailsAsync()
    if (data.error) {
      showError(data.error)
      return
    }

    setUnreadMails(data.unreadMails)
  }
  const handleUnreadMails = (mails: any) => {
    // const
  }
  const showError = (error: string) => {}
  return {
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
  }
}
