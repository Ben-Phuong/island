import { useEffect, useState } from "react"
import { Friend, Mail, UnreadMail } from "../../type"

export const useHome = () => {
  // const { user, logout } = useUser()
  const user = {}
  const friends: Array<Friend> = [
    {
      username: "quang1",
      avatarUrl:
        "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-1/65424285_2318650985054573_3720033838362001408_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8hQwe0--lb4AX-MPvmT&_nc_oc=AQmZCdxL6sHpLH2o7LvxsbbYzGf2bvW6KLCKzGt-lpZIQlbr8qFkLwEslQJvBUDC1FY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT9_MTY02GIYvxIZn89lp5ZMaG1WYGfVCeDz5HvuuM1G3g&oe=62AD0E28",
      latestTitle: "xin",
    },
    {
      username: "quang2",
      avatarUrl:
        "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-1/65424285_2318650985054573_3720033838362001408_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8hQwe0--lb4AX-MPvmT&_nc_oc=AQmZCdxL6sHpLH2o7LvxsbbYzGf2bvW6KLCKzGt-lpZIQlbr8qFkLwEslQJvBUDC1FY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT9_MTY02GIYvxIZn89lp5ZMaG1WYGfVCeDz5HvuuM1G3g&oe=62AD0E28",
      latestTitle: "chao",
    },
    {
      username: "phuong1",
      avatarUrl:
        "https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-1/270014568_252863200267336_6404182175193653114_n.jpg?stp=dst-jpg_p100x100&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=nOVUVcALuKEAX8aZvCO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT86JbQf6lkgtZyeY6jLa5SCR-6l-xNmyJXSigd1I261Jw&oe=628EF71B",
      latestTitle: null,
    },
    {
      username: "phuong0",
      avatarUrl:
        "https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-1/270014568_252863200267336_6404182175193653114_n.jpg?stp=dst-jpg_p100x100&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=nOVUVcALuKEAX8aZvCO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT86JbQf6lkgtZyeY6jLa5SCR-6l-xNmyJXSigd1I261Jw&oe=628EF71B",
      latestTitle: "nguoi",
    },
  ]
  const [receivedMails, setReceivedMails] = useState<Array<Mail>>([
    {
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone else",
      senderId: "someone",
      title: "First title received",
    },
    {
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone else",
      senderId: "someone",
      title: "Second title received",
    },
    {
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone else",
      senderId: "someone",
      title: "Third title received",
    },
  ])
  const [sentMails, setSentMails] = useState<Array<Mail>>([
    {
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone else",
      senderId: "someone else",
      title: "First title sent",
    },
    {
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone else",
      senderId: "someone else",
      title: "Second title sent",
    },
    {
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone else",
      senderId: "someone else",
      title: "Third title sent",
    },
  ])
  const [unreadMails, setUnreadMails] = useState<Array<UnreadMail>>([
    {
      avatarUrl: null,
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone 1",
      senderId: "someone else 1",
      title: "First title unread",
    },
    {
      avatarUrl: null,
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone 2",
      senderId: "someone else 2",
      title: "Second title unread",
    },
    {
      avatarUrl: null,
      arrivalTime: "08:38 PM 22/05/2022",
      content: "This is the content1",
      id: "string",
      images: [],
      receiverId: "someone 3",
      senderId: "someone else 3",
      title: "Third title unread",
    },
  ])
  const logout = () => {
    console.log("logout")
  }
  const [modal, setModal] = useState<string>("")
  const [selectedFriend, setSelectedFriend] = useState<Friend>()

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
    console.log("switch mode")
    if (mode === "friend") setMode("stranger")
    else setMode("friend")
  }
  useEffect(() => {}, [selectedFriend])
  useEffect(() => {}, [mode])
  return {
    modal,
    openCreateFriendModal,
    closeCreateModal,
    openCreateRandomModal,
    logout,
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
