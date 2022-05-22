import MailDetailModal from "../MailDetailModal"
import MailPost from "../MailPost"
import { useConversation } from "./useConversation"

export const Conversation = () => {
  const { modal, closeDetailModal, openDetailModal } = useConversation()
  return (
    <div className="flex flex-1 flex-col max-h-screen">
      <div className="flex flex-1 p-10">
        <div
          className="flex-initial w-20 h-20 rounded-full overflow-hidden drop-shadow-2xl"
          onClick={openDetailModal}
        >
          <img src="https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-1/65424285_2318650985054573_3720033838362001408_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8hQwe0--lb4AX-MPvmT&_nc_oc=AQmZCdxL6sHpLH2o7LvxsbbYzGf2bvW6KLCKzGt-lpZIQlbr8qFkLwEslQJvBUDC1FY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT9_MTY02GIYvxIZn89lp5ZMaG1WYGfVCeDz5HvuuM1G3g&oe=62AD0E28" />
        </div>
        <div className="flex flex-1 relative pl-3 pt-16">
          <div className="flex w-full h-fit overflow-x-scroll scrollbar absolute">
            <MailPost />
            <MailPost />
            <MailPost />
            <MailPost />
            <MailPost />
          </div>
        </div>
      </div>
      <div className="flex flex-1 p-10">
        <div className="flex flex-1 relative items-end pb-24 mr-24">
          <div className="flex w-full h-fit overflow-auto scrollbar absolute">
            <MailPost isFirst />
            <MailPost />
            <MailPost />
            <MailPost />
            <MailPost />
            <MailPost />
            <MailPost />
            <MailPost />
            <MailPost />
            <MailPost />
          </div>
        </div>
      </div>
      {modal && <MailDetailModal closeModal={closeDetailModal} />}
    </div>
  )
}
