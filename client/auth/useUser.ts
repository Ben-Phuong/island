import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { initFirebase } from "./firebaseConfig"
import { getUserFromCookie, removeUserCookie, setUserCookie } from "./useCookie"

initFirebase()

export const mapUserData = async (user: firebase.User) => {
  const { uid, email } = user
  const idToken = await user.getIdToken(true)
  return {
    uid,
    email,
    idToken,
  }
}
let count = 0
const useUser = () => {
  const [user, setUser] = useState<any>()

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (userToken: any) => {
        if (userToken) {
          // verify email
          // if (!userToken.emailVerified) return
          const userData = await mapUserData(userToken)
          setUserCookie(userData)
          setUser(userData)
        } else {
          removeUserCookie()
          setUser(null)
        }
      })

    const userFromCookie = getUserFromCookie()
    setUser(userFromCookie ?? null)
    if (!userFromCookie) return
    return () => {
      cancelAuthListener()
    }
  }, [])

  return user
}

export { useUser }
