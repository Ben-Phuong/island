import CloseIcon from "@mui/icons-material/Close"
import { useCreateMailModal } from "./useCreateMailModal"
import CheckIcon from "@mui/icons-material/Check"
import { Friend } from "../../type"
import Message from "../Message"

export interface CreateMailModalProps {
  friend: Friend | undefined
  closeModal: React.MouseEventHandler
  to: string
}
export const CreateMailModal = (props: CreateMailModalProps) => {
  const {
    handleLongEmail,
    titleInput,
    contentInput,
    handleSubmitAsync,
    handleEnter,
    loading,
    error,
  } = useCreateMailModal(props.to === "friend" ? props.friend?.id : undefined)
  return (
    <div
      className="flex justify-center items-center absolute w-screen h-screen bg-black/30 top-0 left-0"
      onClick={props.closeModal}
    >
      <div
        className="flex flex-col rounded-xl relative h-96 sm:w-1/3 sm:h-2/3 bg-gray-700 pt-5 w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          title="Close"
          className="absolute top-3 right-3"
          type="button"
          onClick={props.closeModal}
        >
          <CloseIcon className="text-white w-7 h-7" />
        </button>
        <div className="flex flex-initial h-fit mb-1 px-2 pointer-events-none">
          {props.to === "friend" ? (
            <>
              <span className="flex-none italic text-white font-medium absolute ml-4 text-xl">
                To
              </span>
              <span className="flex flex-1 justify-center overflow-auto font-mono text-white/70 mx-12">
                {props.friend?.username}
              </span>
            </>
          ) : (
            <span className="flex flex-1 justify-center overflow-auto font-sans text-white/70 text-2xl">
              Random
            </span>
          )}
        </div>
        <div className="flex flex-initial w-10/12 h-0.5 bg-sky-600 self-center"></div>
        <div className="flex flex-1 overflow-auto scrollbar">
          <form noValidate className="flex flex-1 flex-col px-4 py-2">
            <label className="block ">
              <input
                className={
                  "block w-full border-2 px-5 py-4 shadow rounded-xl text-xl font-sans hover:border-blue-700 focus:outline-blue-500"
                }
                placeholder="Title"
                type="email"
                onKeyDown={handleEnter}
                ref={titleInput}
              />
            </label>
            <label className="flex w-full h-full">
              <textarea
                placeholder="Content"
                ref={contentInput}
                className="w-full mt-2 border-2 resize-none px-5 py-4 shadow rounded-xl text-xl font-sans hover:border-blue-700 focus:outline-blue-500"
              ></textarea>
            </label>
            <label className="block my-2">
              <button
                disabled={!!loading}
                type="button"
                onClick={handleSubmitAsync}
                className="block relative px-5 py-4 rounded-xl w-full bg-sky-600 hover:bg-sky-800 text-white text-3xl disabled:bg-blue-600"
              >
                <span className="content-center">
                  {loading
                    ? loading === "loading"
                      ? "Sending..."
                      : "Sent"
                    : "Send"}
                </span>
                {loading &&
                  (loading === "loading" ? (
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
                  ) : (
                    <CheckIcon
                      width={20}
                      height={20}
                      className="inline absolute ml-5 h-10 w-10 text-white"
                    />
                  ))}
              </button>
            </label>
          </form>
        </div>
      </div>
      {error ? <Message message={error} /> : null}
    </div>
  )
}
