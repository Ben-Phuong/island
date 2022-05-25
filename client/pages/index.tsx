import type { GetServerSidePropsContext, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { initFirebase } from "../auth/firebaseConfig"
import { useUser } from "../auth/useUser"
import Auth from "../components/Auth"
import Home from "../components/Home"
import LoadingUser from "../components/LoadingUser"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { removeUserCookie, setUserCookie } from "../auth/useCookie"

initFirebase()
const THRESHOLD = 0.9
const TextToxicity = require("@tensorflow-models/toxicity")

const Island: NextPage = (props) => {
  //@ts-ignore
  const [user, setUser] = useState(props.user)
  const [toxicModel, setToxicModel] = useState<any>()
  // load text toxicity model
  useEffect(() => {
    if (TextToxicity)
      // @ts-ignore
      TextToxicity.load(THRESHOLD, []).then((model) => {
        setToxicModel(model)
      })
    firebase.auth().onIdTokenChanged(async (user: any) => {
      if (user) {
        // verify email
        // if (!user.emailVerified) return
        const idToken = await user.getIdToken(true)
        const userData = {
          uid: user.uid,
          email: user.email,
          idToken,
        }
        setUserCookie(userData)
        setUser(userData)
      } else {
        removeUserCookie()
        setUser(null)
      }
    })
  }, [])

  return (
    <div className="relative">
      <Head>
        <title>Island</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      {
        // @ts-ignore
        // user === undefined ? (
        //   props.user ? (
        //     <Home toxicModel={toxicModel} />
        //   ) : (
        //     <Auth />
        //   )
        // ) : user ? (
        //   <Home toxicModel={toxicModel} />
        // ) : (
        //   <Auth />
        // )
        user ? <Home toxicModel={toxicModel} /> : <Auth />
      }
    </div>
  )
}
export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = ctx.req.cookies
  if (!cookies.auth) return { props: {} }
  try {
    const user = JSON.parse(cookies.auth)
    return { props: { user } }
  } catch (error) {
    return { props: {} }
  }
}
export default Island
