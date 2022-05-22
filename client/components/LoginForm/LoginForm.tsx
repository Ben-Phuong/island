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
    loading,
    loginMessage,
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
          <span className="block mt-2 mb-5 pl-3 text-md text-red-600 h-fit">
            {pwdError ? `* ${pwdError}` : ""}
          </span>
        </label>
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
        <label className="block">
          <button
            disabled={loading}
            type="submit"
            className="block relative mt-16 px-5 py-4 rounded-xl w-full max-w-xl bg-blue-600 hover:bg-blue-800 text-white text-3xl disabled:bg-blue-600"
          >
            <span className="content-center">Log In</span>
            {loading && (
              <svg
                className="inline absolute animate-spin ml-5 h-10 w-10 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>
          <span className="block mt-2 mb-5 pl-3 text-md text-red-600">
            {loginMessage ? `* ${loginMessage}` : ""}
          </span>
        </label>
      </form>
      <div className="px-3 my-5">
        {"Not register yet? "}
        <button onClick={props.changeForm} type="button">
          <span className="text-right text-blue-600 font-bold hover:text-blue-900">
            Create an Account
          </span>
        </button>
      </div>
    </>
  )
}

export default LoginForm
