import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { getUserFromCookie } from "../auth/useCookie"
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + "/user"
// const endpoint = "http://localhost:8000/api/user"

export const signupAsync = async (data: any) => {
  try {
    const idToken = await firebase.auth().currentUser?.getIdToken()

    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      mode: "cors",
    })
    const dataJSON = await response.json()
    return dataJSON
  } catch (error) {
    return { error: "Something must be wrong. Please try again" }
  }
}
export const getUserFromServerAsync = async () => {
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
    const dataJSON = await response.json()
    return dataJSON
  } catch (error) {
    return { error: "Something must be wrong. Please try again" }
  }
}
