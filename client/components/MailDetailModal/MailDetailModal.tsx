import CloseIcon from "@mui/icons-material/Close"
import { getUserFromCookie } from "../../auth/useCookie"
import { Friend, Mail } from "../../type"

export interface MailDetailModalProps {
  mail: Mail
  type: string
  closeModal: React.MouseEventHandler
  friend?: Friend
}
export const MailDetailModal = (props: MailDetailModalProps) => {
  return (
    <div
      className="flex justify-center items-center absolute w-screen h-screen bg-black/10 backdrop-blur-sm top-0 left-0 z-10"
      onClick={props.closeModal}
    >
      <div
        className="flex flex-col relative rounded-xl w-96 h-96 sm:w-1/3 sm:h-2/3 bg-white pl-3 pb-3 pr-1"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-initial w-full h-fit justify-between p-3">
          <div>
            <span className="flex flex-1 h-fit self-end pointer-events-none text-gray-500 text-sm">
              At
              <span className="font-medium text-blue-900 ml-2">
                {props.mail.arrivalTime}
              </span>
            </span>
            <span className="flex flex-1 h-fit self-end pointer-events-none text-gray-500 text-xl font-mono font-thin">
              <span>{props.type}</span>
              <span className="font-medium text-blue-900 ml-2 font-mono text-xl hover:font-bold">
                {props.friend?.username}
              </span>
              {/* <span className="ml-2">To</span>
              <span className="font-medium text-blue-900 ml-1 font-mono text-xl hover:font-bold">
                {getUserFromCookie().username}
              </span> */}
            </span>
          </div>
          <button
            title="Close"
            className="h-fit"
            type="button"
            onClick={props.closeModal}
          >
            <CloseIcon className="w-7 h-7" />
          </button>
        </div>
        <div className="flex flex-1 overflow-auto scrollbar flex-col">
          <span className="px-2 font-sans font-medium break-words text-xl">
            {props.mail.title}
          </span>
          <p className="mt-2 whitespace-pre-wrap">{props.mail.content}</p>
        </div>
      </div>
    </div>
  )
}
