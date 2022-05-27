import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getUserFromCookie } from "../auth/useCookie"
import { delay } from "./util"
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + "/friend"
// const endpoint = "http://localhost:8000/api/friend/"
export const getFriendListAsync = async () => {
  try {
    const user = getUserFromCookie()

    const response = await fetch(`${endpoint}?userId=${user.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.idToken}`,
      },
      mode: "cors",
    })
    const { friends } = await response.json()
    return { friends: friends ?? [] }
  } catch (error) {
    console.log(error)
    return { error: "Something must be wrong. Please try again" }
  }
}
export const makeFriendListAsync = async (data: any) => {
  try {
    const user = getUserFromCookie()

    const response = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.idToken}`,
      },
      body: JSON.stringify({
        userId1: user.uid,
        userId2: data.friendId,
      }),
      mode: "cors",
    })
    const dataJSON = await response.json()
    return dataJSON
  } catch (error) {
    console.log(error)
    return { error: "Something must be wrong. Please try again" }
  }
}
