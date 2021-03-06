import React from "react"
import { MenuItem, Menu } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import DefaultAvatar from "../../public/defaultAvatar.svg"
import Image from "next/image"
import { PrintRounded } from "@mui/icons-material"
import { getUserFromCookie } from "../../auth/useCookie"

const settings = [
  { name: "Profile", icon: PersonIcon },
  { name: "Change avatar", icon: PhotoCameraIcon },
  { name: "Log out", icon: LogoutIcon },
]

export const Avatar = (props: { avatarUrl?: string; username: string }) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null)
    if (!setting) return
    if (setting === "Log out") {
      firebase.auth().signOut()
    } else alert("In progress")
  }
  return (
    <div className="w-12 h-12">
      <button
        title="Open settings"
        type="button"
        className={
          props.avatarUrl !== undefined
            ? "rounded-full overflow-hidden hover:drop-shadow-xl hover:scale-125"
            : "rounded-full overflow-hidden hover:drop-shadow-xl hover:scale-125 animate-pulse pointer-events-none bg-slate-500/30 w-full h-full"
        }
        onClick={handleOpenUserMenu}
      >
        {props.avatarUrl ? (
          <img src={props.avatarUrl} />
        ) : (
          <div className="bg-white/90 backdrop-blur-xl p-2 w-12 h-12">
            <Image src={DefaultAvatar} />
          </div>
        )}
      </button>
      <Menu
        classes={{ paper: "bg-white/50 backdrop-blur-3xl" }}
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElUser)}
        onClose={() => handleCloseUserMenu("")}
      >
        <MenuItem className="pointer-events-none">
          <span className="text-sm pointer-events-none w-36 text-ellipsis overflow-hidden whitespace-nowrap text-center font-semibold">
            {props.username}
          </span>
        </MenuItem>
        {settings.map((setting) => (
          <MenuItem
            key={setting.name}
            onClick={(event) => handleCloseUserMenu(setting.name)}
          >
            <setting.icon className="self-center mr-3" />
            <div className="text-center">{setting.name}</div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
