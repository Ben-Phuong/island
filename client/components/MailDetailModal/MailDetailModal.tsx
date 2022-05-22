import CloseIcon from "@mui/icons-material/Close"
import { Mail } from "../../type"

export interface MailDetailModalProps {
  mail: Mail
  closeModal: React.MouseEventHandler
}
export const MailDetailModal = (props: MailDetailModalProps) => {
  return (
    <div
      className="flex justify-center items-center absolute w-screen h-screen bg-black/30 top-0 left-0 z-10"
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
              <span className="font-medium text-blue-900 ml-1">
                {props.mail.arrivalTime}
              </span>
            </span>
            <span className="flex flex-1 h-fit self-end pointer-events-none text-gray-500 text-xl font-mono font-thin">
              <span>From</span>
              <span className="font-medium text-blue-900 ml-1 font-mono text-xl hover:font-bold">
                {props.mail.senderId}
              </span>
              <span className="ml-2">To</span>
              <span className="font-medium text-blue-900 ml-1 font-mono text-xl hover:font-bold">
                {props.mail.receiverId}
              </span>
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
