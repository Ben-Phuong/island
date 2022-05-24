import ErrorIcon from "@mui/icons-material/Error"
export interface MessageProps {
  message: string | undefined
}
export const Message = (props: MessageProps) => {
  return (
    <div className="flex absolute z-30 rounded-3xl bg-white right-0 bottom-0 m-10 w-96 h-24 justify-start items-center p-5 drop-shadow-xl hover:drop-shadow-2xl">
      <ErrorIcon className="text-red-700 mr-3" />
      <span className="text-ellipsis overflow-hidden max-w-full text-xl text-red-500/90 pointer-events-none">
        {props.message}
      </span>
    </div>
  )
}
