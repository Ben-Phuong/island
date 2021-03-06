import React, { useEffect } from "react"
import router from "next/router"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { initFirebase } from "./firebaseConfig"

initFirebase()
const auth = firebase.auth()

const withAuth = (Component: any) => (props: any) => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) {
        router.push("/")
      }
    })
  }, [])

  return (
    <div>
      <Component {...props} />
    </div>
  )
}

export default withAuth
