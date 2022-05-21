import { Checkbox } from "@mui/material"
import React from "react"
import LoginForm from "../LoginForm"
import SignupForm from "../SignupForm"
import { useAuthenticationForm } from "./useAuthentication"

const AuthenticationForm = () => {
  const { authentication, transition, changeForm } = useAuthenticationForm()

  return (
    <div className="flex flex-1 justify-center flex-col md:flex-none md:w-4/5 md:max-w-xl">
      <div className={transition}>
        {authentication === "login" ? (
          <LoginForm changeForm={changeForm} />
        ) : (
          <SignupForm changeForm={changeForm} />
        )}
      </div>
    </div>
  )
}

export default AuthenticationForm
