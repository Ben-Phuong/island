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

const settings = [
  { name: "Profile", icon: PersonIcon },
  { name: "Change avatar", icon: PhotoCameraIcon },
  { name: "Log out", icon: LogoutIcon },
]

export const Avatar = (props: { avatarUrl?: string }) => {
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
        className="rounded-full overflow-hidden hover:drop-shadow-xl hover:scale-125"
        onClick={handleOpenUserMenu}
      >
        {props.avatarUrl !== undefined ? (
          props.avatarUrl ? (
            <img src={props.avatarUrl} />
          ) : (
            <div className="bg-white p-2 w-12 h-12">
              <Image src={DefaultAvatar} />
            </div>
          )
        ) : (
          <div className="bg-slate-500/30 w-12 h-12 animate-pulse"></div>
        )}
      </button>
      <Menu
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
