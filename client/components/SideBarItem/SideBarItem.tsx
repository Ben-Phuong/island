export const SideBarItem = (props: { isCurrentFriend?: boolean }) => {
  return (
    <button type="button">
      <div
        className={
          props.isCurrentFriend
            ? "flex flex-none w-full h-32 rounded-xl bg-blue-500/50 mb-1 items-center"
            : "flex flex-none w-full h-32 rounded-xl hover:bg-sky-300/30 mb-1 items-center"
        }
      >
        <div className="h-20 w-20 rounded-full overflow-hidden m-3">
          <img src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-1/65424285_2318650985054573_3720033838362001408_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8hQwe0--lb4AX-MPvmT&_nc_oc=AQmZCdxL6sHpLH2o7LvxsbbYzGf2bvW6KLCKzGt-lpZIQlbr8qFkLwEslQJvBUDC1FY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT9_MTY02GIYvxIZn89lp5ZMaG1WYGfVCeDz5HvuuM1G3g&oe=62AD0E28" />
        </div>
        <div className="flex flex-1 h-20 flex-col items-start justify-around pl-2">
          <span className="flex-none font-bold text-xl">quang</span>
          <div className="overflow-hidden">
            <span className="flex flex-none justify-start text-left text-gray-500">
              xin chao
            </span>
          </div>
        </div>
      </div>
    </button>
  )
}
