import { Checkbox } from "@mui/material"
import React from "react"
import { useLoginForm } from "./useLoginForm"
export interface LoginFormProps {
  changeForm: React.MouseEventHandler
}
const LoginForm = (props: LoginFormProps) => {
  const {
    handleEnter,
    emailInput,
    pwdInput,
    emailError,
    pwdError,
    handleSubmit,
  } = useLoginForm()

  return (
    <>
      <h1 className="font-sans font-bold text-5xl pb-14">Login</h1>
      <form onSubmit={handleSubmit} noValidate className="block px-3">
        <label className="block">
          <span className="text-xl font-medium font-sans">Email Address</span>
          <input
            className={
              emailError
                ? "block w-full mt-5 border-2 px-5 py-4 shadow rounded-xl max-w-xl text-xl font-sans border-red-600 outline-red-600"
                : "block w-full mt-5 border-2 px-5 py-4 shadow rounded-xl max-w-xl text-xl font-sans hover:border-blue-700 focus:outline-blue-500"
            }
            placeholder="name@domain.com"
            type="email"
            onKeyDown={handleEnter}
            ref={emailInput}
          />
          <span className="block mt-2 mb-5 pl-3 text-md text-red-600">
            {emailError ? `* ${emailError}` : ""}
          </span>
        </label>
        <label className="block">
          <span className="text-xl font-medium font-sans">Password</span>
          <input
            className={
              pwdError
                ? "block w-full mt-5 border-2 px-5 py-4 shadow rounded-xl max-w-xl text-xl font-sans border-red-600 outline-red-600"
                : "block w-full mt-5 border-2 px-5 py-4 shadow rounded-xl max-w-xl text-xl font-sans hover:border-blue-700 focus:outline-blue-500"
            }
            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
            type="password"
            onKeyDown={handleEnter}
            ref={pwdInput}
          />
        </label>
        <span className="block mt-2 mb-5 pl-3 text-md text-red-600 h-fit">
          {pwdError ? `* ${pwdError}` : ""}
        </span>
        <label className="block">
          <Checkbox />
          <span className="cursor-pointer align-middle font-medium self-center">
            Remember me
          </span>
        </label>
        <label className="block max-w-xl pr-3">
          <button type="button" className="float-right">
            <span className="text-right text-blue-600 hover:font-bold font-normal">
              Forget password?
            </span>
          </button>
        </label>
        <button
          type="submit"
          className="block mt-16 px-5 py-4 rounded-xl text-center w-full max-w-xl bg-blue-600 hover:bg-blue-800 text-white text-3xl"
        >
          Log In
        </button>
      </form>
      <div className="px-3 my-5">
        {"Not register yet? "}
        <button onClick={props.changeForm}>
          <span className="text-right text-blue-600 font-bold hover:text-blue-900">
            Create an Account
          </span>
        </button>
      </div>
    </>
  )
}

export default LoginForm
