import React from "react"
import ReactDOM from "react-dom"
import { useSignupForm } from "./useSignupForm"

export interface SignupFormProps {
  changeForm: React.MouseEventHandler
}

const SignupForm = (props: SignupFormProps) => {
  const {
    handleEnter,
    emailInput,
    pwdInput,
    handleSubmit,
    emailError,
    pwdError,
    nameInput,
    nameError,
  } = useSignupForm(props)
  return (
    <>
      <h1 className="font-sans font-bold text-3xl pb-14">
        Create your Account
      </h1>
      <form onSubmit={handleSubmit} noValidate className="block px-3">
        <label className="block">
          <span className="text-xl font-medium font-sans">Display Name</span>
          <input
            className={
              nameError
                ? "block w-full mt-5 border-2 px-5 py-4 shadow rounded-xl max-w-xl text-xl font-sans border-red-600 outline-red-600"
                : "block w-full mt-5 border-2 px-5 py-4 shadow rounded-xl max-w-xl text-xl font-sans hover:border-blue-700 focus:outline-blue-500"
            }
            placeholder="Display name"
            type="email"
            onKeyDown={handleEnter}
            ref={nameInput}
          />
          <span className="block mt-2 mb-5 pl-3 text-md text-red-600">
            {nameError ? `* ${nameError}` : ""}
          </span>
        </label>
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
        <button
          type="submit"
          className="block mt-16 px-5 py-4 rounded-xl text-center w-full max-w-xl bg-blue-600 hover:bg-blue-800 text-white text-3xl"
        >
          Sign Up
        </button>
      </form>
      <div className="px-3 my-5">
        {"Have an account? "}
        <button onClick={props.changeForm}>
          <span className="text-right text-blue-600 font-bold hover:text-blue-900">
            Log in
          </span>
        </button>
      </div>
    </>
  )
}
export default SignupForm
