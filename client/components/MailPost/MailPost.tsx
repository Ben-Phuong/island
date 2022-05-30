import { Mail } from "../../type"

export interface MailPostProps {
  mail?: Mail
  isFirst?: boolean
  onClick?: React.MouseEventHandler
}
export const MailPost = (props: MailPostProps) => {
  return (
    <button
      title="Open mail"
      type="button"
      onClick={props.onClick}
      className={props.isFirst ? "ml-auto" : ""}
    >
      <div
        className={
          props.mail
            ? "flex flex-none h-64 w-64 rounded-xl mr-3 border-2 border-transparent hover:border-blue-700/50 overflow-hidden"
            : "flex flex-none h-64 w-64 bg-blue-500/50 rounded-xl mr-3 animate-pulse"
        }
      >
        <div className="flex relative flex-1 flex-col py-3 items-center bg-gradient-to-r from-sky-300/80 to-blue-700/50 backdrop-blur-xl">
          <span className="flex-none h-8 w-60 px-1 font-sans font-medium overflow-hidden text-ellipsis align-middle text-2xl text-black/60 text-left whitespace-nowrap">
            {props.mail?.title}
          </span>
          <div className="w-5/6 h-px bg-blue-500 mt-2"></div>
          <p className="px-4 text-left h-44 w-60 text-ellipsis whitespace-pre-wrap overflow-hidden">
            {props.mail?.content}
          </p>
        </div>
      </div>
    </button>
  )
}
