import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { initFirebase } from "./firebaseConfig"
import { getUserFromCookie, removeUserCookie, setUserCookie } from "./useCookie"

export interface User {
  [x: string]: any
  uid: string
  email: string
}
initFirebase()

export const mapUserData = async (user: User) => {
  const { uid, email } = user
  const token = await user.getIdToken(true)
  return {
    uid,
    email,
    token,
  }
}
const useUser = () => {
  const [user, setUser] = useState<any>()
  const router = useRouter()

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/").catch((e) => {
          console.log(e)
        })
      })
  }

  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (userToken: any) => {
        if (userToken) {
          if (!userToken.emailVerified) return
          const userData = await mapUserData(userToken)
          setUserCookie(userData)
          setUser(userData)
        } else {
          removeUserCookie()
          setUser(null)
        }
      })

    const userFromCookie = getUserFromCookie()
    if (!userFromCookie) {
      router.push("/")
      return
    }
    setUser(userFromCookie)
    return () => cancelAuthListener()
  }, [])

  return { user, logout }
}

export { useUser }
