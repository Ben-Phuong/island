import { Friend } from "../../type"
import CheckIcon from "@mui/icons-material/Check"
export interface SideBarItemProps {
  isSelectedFriend?: boolean
  onClick?: React.MouseEventHandler
  friend?: Friend
  addFriend?: React.MouseEventHandler
}
export const SideBarItem = (props: SideBarItemProps) => {
  return (
    <button
      type="button"
      onClick={props.onClick}
      className={
        props.friend
          ? "flex relative group items-center justify-end"
          : "flex relative group items-center justify-end animate-pulse pointer-events-none"
      }
    >
      <div
        className={
          props.isSelectedFriend
            ? "flex flex-none w-full h-32 rounded-xl bg-blue-500/50 mb-1 items-center"
            : "flex flex-none w-full h-32 rounded-xl group-hover:bg-sky-300/30 mb-1 items-center"
        }
      >
        <div className={"h-20 w-20 rounded-full overflow-hidden m-3"}>
          {props.friend?.avatarUrl ? (
            <img src={props.friend.avatarUrl} />
          ) : (
            <div className="bg-blue-300 h-full w-full"></div>
          )}
        </div>
        <div className="flex flex-1 h-20 flex-col items-start justify-around pl-2">
          <span className="flex-none font-bold text-xl">
            {props.friend?.username ?? ""}
          </span>
          <div className="overflow-hidden">
            <span className="flex flex-none justify-start text-left text-gray-500">
              {props.friend?.latestTitle || "."}
            </span>
          </div>
        </div>
      </div>
      {props.addFriend && (
        <div
          title="Add to friend list"
          onClick={props.addFriend}
          className="absolute hidden group-hover:flex mr-10 rounded-full overflow-hidden"
        >
          <CheckIcon className="w-10 h-10 text-blue-700 hover:bg-white group hover:drop-shadow-lg" />
        </div>
      )}
    </button>
  )
}
