import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { delay } from "./util"
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + "mail/"
// const endpoint = "http://localhost:8000/api/mail/"
export const getUnreadMailsAsync = async () => {
  await delay(3000)
  return {
    unreadMails: [
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
    ],
  }
  try {
    const idToken = await firebase.auth().currentUser?.getIdToken()

    const response = await fetch(`${endpoint}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      mode: "cors",
    })
    const dataJSON = JSON.parse(await response.json())
    return dataJSON
  } catch (error) {
    console.log(error)
    return { error: "Something must be wrong. Please try again" }
  }
}
export const getReceivedMailsAsync = async (data: any) => {
  await delay(5000)
  return {
    mails: [
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
    ],
  }
  try {
    const idToken = await firebase.auth().currentUser?.getIdToken()

    const response = await fetch(`${endpoint}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      mode: "cors",
    })
    const dataJSON = JSON.parse(await response.json())
    return dataJSON
  } catch (error) {
    console.log(error)
    return { error: "Something must be wrong. Please try again" }
  }
}
export const getSentMailsAsync = async (data: any) => {
  await delay(3000)
  return {
    mails: [
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
    ],
  }
  try {
    const idToken = await firebase.auth().currentUser?.getIdToken()

    const response = await fetch(`${endpoint}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      mode: "cors",
    })
    const dataJSON = JSON.parse(await response.json())
    return dataJSON
  } catch (error) {
    console.log(error)
    return { error: "Something must be wrong. Please try again" }
  }
}
