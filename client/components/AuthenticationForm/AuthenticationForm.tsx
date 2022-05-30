import React from "react"
import LoginForm from "../LoginForm"
import Message from "../Message"
import SignupForm from "../SignupForm"
import { useAuthenticationForm } from "./useAuthentication"

const AuthenticationForm = () => {
  const { authentication, transition, changeForm, error, showError } =
    useAuthenticationForm()

  return (
    <div className="flex flex-1 justify-center flex-col md:flex-none md:w-4/5 md:max-w-xl">
      <div className={transition}>
        <div className="p-2 rounded-3xl backdrop-blur-md bg-white/40 drop-shadow-xl">
          {authentication === "login" ? (
            <LoginForm changeForm={changeForm} showError={showError} />
          ) : (
            <SignupForm changeForm={changeForm} showError={showError} />
          )}
        </div>
      </div>
      {error ? <Message message={error} /> : null}
    </div>
  )
}

export default AuthenticationForm
