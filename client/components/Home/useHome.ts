import { useEffect, useRef, useState } from "react"
import { getFriendListAsync } from "../../api/friend"
import {
  getReceivedMailsAsync,
  getSentMailsAsync,
  getUnreadMailsAsync,
} from "../../api/mail"
import { useUser } from "../../auth/useUser"
import { Friend, Mail, UnreadMail } from "../../type"

export const useHome = () => {
  const user = useUser()
  const [friends, setFriends] = useState<Array<Friend>>()
  const [selectedFriend, setSelectedFriend] = useState<Friend>()
  const [receivedMails, setReceivedMails] = useState<Array<Mail>>()
  const [sentMails, setSentMails] = useState<Array<Mail>>()
  const [unreadMails, setUnreadMails] = useState<Array<UnreadMail>>()

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

  // fetch received and sent when selected new user
  useEffect(() => {
    if (!selectedFriend) return
    setReceivedMails(undefined)
    setSentMails(undefined)
    if (fetchReceived.current) {
      clearTimeout(fetchReceived.current)
      fetchReceived.current = undefined
    }
    if (fetchSent.current) {
      clearTimeout(fetchSent.current)
      fetchSent.current = undefined
    }
    fetchReceivedMailsAsync(selectedFriend)
    fetchSentMailsAsync(selectedFriend)
  }, [selectedFriend])
  // mode: friend => fetch friend list || mode: stranger => fetch unread mails
  useEffect(() => {
    if (mode === "friend") fetchFriendListAsync()
    else fetchUnreadMailsAsync()
  }, [mode])
  // fetch data function
  const fetchReceivedMailsAsync = async (selectedFriend: Friend) => {
    const data = await getReceivedMailsAsync(selectedFriend.username)
    if (data.error) {
      showError(data.error)
      fetchReceived.current = setTimeout(
        () => fetchReceivedMailsAsync(selectedFriend),
        2000
      )
    } else setReceivedMails(data.mails)
  }
  const fetchSentMailsAsync = async (selectedFriend: Friend) => {
    const data = await getSentMailsAsync(selectedFriend.username)
    if (data.error) {
      showError(data.error)
      fetchSent.current = setTimeout(
        () => fetchSentMailsAsync(selectedFriend),
        2000
      )
    } else setSentMails(data.mails)
  }
  const fetchFriendListAsync = async () => {
    const data = await getFriendListAsync()
    if (data.error) {
      showError(data.error)
      setTimeout(fetchFriendListAsync, 2000)
    } else setFriends(data.friends)
  }
  const fetchUnreadMailsAsync = async () => {
    const data = await getUnreadMailsAsync()
    if (data.error) {
      showError(data.error)
      setTimeout(fetchUnreadMailsAsync, 2000)
    } else setUnreadMails(data.unreadMails)
  }
  const showError = (error: string) => {}
  return {
    modal,
    openCreateFriendModal,
    closeCreateModal,
    openCreateRandomModal,
    user,
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
