import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getUserFromCookie } from "../auth/useCookie"
import { Mail } from "../type"
import { delay } from "./util"
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT
// const endpoint = "http://localhost:8000/api/mail/"

export const getFriendsMailsAsync = async () => {
  try {
    const user = getUserFromCookie()
    const fetchReceivedMails = fetch(
      `${endpoint}/received_mails?userId=${user.uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.idToken}`,
        },
        mode: "cors",
      }
    )
    const fetchSentMails = fetch(`${endpoint}/sent_mails?userId=${user.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.idToken}`,
      },
      mode: "cors",
    })
    const { receivedMails } = await (await fetchReceivedMails).json()
    const { sentMails } = await (await fetchSentMails).json()
    return {
      receivedMails: receivedMails ?? {},
      sentMails: sentMails ?? {},
    }
  } catch (error) {
    return { error: "Something must be wrong. Please try again" }
  }
}
export const validateMailAsync = async (data: {
  content: string
  title: string
}) => {
  try {
    const response = await fetch("/api/validate_mail", {
      method: "POST",
      body: JSON.stringify(data),
    })
    const dataJSON = await response.json()
    return dataJSON
  } catch (error) {
    return { message: "Something must be wrong. Please try again" }
  }
}
export const sendMailAsync: any = async (data: any, to?: string) => {
  try {
    const user = getUserFromCookie()
    console.log("to", to)
    const fetchSentMails = fetch(`${endpoint}/${to ? "" : "random_"}mail`, {
      method: "POST",
      body: JSON.stringify({
        senderId: user.uid,
        receiverId: to ?? null,
        ...data,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.idToken}`,
      },
      mode: "cors",
    })
  } catch (error) {
    return { error: "Something must be wrong. Please try again" }
  }
}
export const getUnreadMailsAsync = async () => {
  try {
    const user = getUserFromCookie()
    const response = await fetch(
      `${endpoint}/unread_mails?userId=${user.uid}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.idToken}`,
        },
        mode: "cors",
      }
    )
    const dataJSON = await response.json()
    console.log("unread", dataJSON)
    return { unreadMails: dataJSON }
  } catch (error) {
    return { error: "Something must be wrong. Please try again" }
  }
}
