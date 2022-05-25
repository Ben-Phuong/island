import firebase from "firebase/compat/app"
import "firebase/compat/auth"
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + "user"
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
export const getUserFromServerAsync = async (data: any) => {
  try {
    const response = await fetch(`${endpoint}?userId=${data.uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.idToken}`,
      },
      mode: "cors",
    })
    const dataJSON = await response.json()
    return dataJSON
  } catch (error) {
    return { error: "Something must be wrong. Please try again" }
  }
}
