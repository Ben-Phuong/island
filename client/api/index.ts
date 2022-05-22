import firebase from "firebase/compat/app"
import "firebase/compat/auth"
// const endpoint = process.env.API_ENDPOINT
const endpoint = "http://localhost:8000/api"

export const signupAsync = async (data: any) => {
  try {
    const idToken = await firebase.auth().currentUser?.getIdToken()
    console.log("ENDPOINT: ", endpoint)
    const response = await fetch(`${endpoint}/user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      mode: "cors",
    })
    const dataJson = JSON.parse(await response.json())
    console.log(dataJson)
  } catch (error) {
    console.log(error)
  }
}
export const getFriendAsync = async () => {}
