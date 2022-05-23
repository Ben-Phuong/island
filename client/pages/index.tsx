import type { NextPage } from "next"
import Head from "next/head"
import React, { useEffect, useState } from "react"
import { initFirebase } from "../auth/firebaseConfig"
import { useUser } from "../auth/useUser"
import Auth from "../components/Auth"
import Home from "../components/Home"
import LoadingUser from "../components/LoadingUser"
// import TextToxicity from "@tensorflow-models/toxicity"

initFirebase()
const THRESHOLD = 0.9
const TextToxicity = require("@tensorflow-models/toxicity")

const Island: NextPage = () => {
  const user = useUser()
  const [toxicModel, setToxicModel] = useState<any>()
  // load text toxicity model
  useEffect(() => {
    if (TextToxicity)
      TextToxicity.load(THRESHOLD, []).then((model) => {
        setToxicModel(model)
      })
  }, [])

  return (
    <div>
      <Head>
        <title>Island</title>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      {user === undefined ? (
        <LoadingUser />
      ) : user ? (
        <Home toxicModel={toxicModel} />
      ) : (
        <Auth />
      )}
    </div>
  )
}

export default Island
