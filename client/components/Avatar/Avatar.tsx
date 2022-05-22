import React from "react"
import { MenuItem, Menu } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import PersonIcon from "@mui/icons-material/Person"
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera"
import { useUser } from "../../auth/useUser"

const settings = [
  { name: "Profile", icon: PersonIcon },
  { name: "Change avatar", icon: PhotoCameraIcon },
  { name: "Log out", icon: LogoutIcon },
]

export const Avatar = (props: any) => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  )

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (setting: string) => {
    setAnchorElUser(null)
    if (setting === "Log out" && props.logout) props.logout()
  }
  return (
    <div className="w-12 h-12">
      <button
        className="rounded-full overflow-hidden hover:drop-shadow-xl hover:scale-125"
        onClick={handleOpenUserMenu}
      >
        <img src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-1/65424285_2318650985054573_3720033838362001408_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8hQwe0--lb4AX-MPvmT&_nc_oc=AQmZCdxL6sHpLH2o7LvxsbbYzGf2bvW6KLCKzGt-lpZIQlbr8qFkLwEslQJvBUDC1FY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT9_MTY02GIYvxIZn89lp5ZMaG1WYGfVCeDz5HvuuM1G3g&oe=62AD0E28" />
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
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          <MenuItem
            key={setting.name}
            onClick={() => handleCloseUserMenu(setting.name)}
          >
            <setting.icon className="self-center mr-3" />
            <div className="text-center">{setting.name}</div>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
