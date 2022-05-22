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
            ? "flex flex-none h-64 w-64 bg-blue-500/50 rounded-xl mr-3 border-blue-500/50 border-2 hover:border-blue-700 "
            : "flex flex-none h-64 w-64 bg-blue-500/50 rounded-xl mr-3 border-blue-500/50 border-2 hover:border-blue-700  animate-pulse"
        }
      >
        <div className="flex relative flex-1 flex-col py-3 items-center">
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
