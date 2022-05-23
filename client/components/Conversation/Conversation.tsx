import { Friend, Mail } from "../../type"
import MailDetailModal from "../MailDetailModal"
import MailPost from "../MailPost"
import { useConversation } from "./useConversation"

export interface ConversationProps {
  selectedfriend: Friend | undefined
  receivedMails: Array<Mail> | undefined
  sentMails: Array<Mail> | undefined
}
export const Conversation = (props: ConversationProps) => {
  const { modal, closeDetailModal, openDetailModal, selectedMail } =
    useConversation()
  return (
    <div className="flex flex-1 flex-col max-h-screen">
      <div className="flex flex-1 p-10">
        <div className="flex-initial w-20 h-20 rounded-full overflow-hidden drop-shadow-2xl">
          {props.selectedfriend?.avatarUrl ? (
            <img src={props.selectedfriend.avatarUrl} />
          ) : null}
        </div>
        <div className="flex flex-1 relative pl-3 pt-16">
          <div className="flex w-full h-fit overflow-x-scroll scrollbar absolute">
            {props.receivedMails ? (
              props.receivedMails.map((mail, key) => (
                <MailPost
                  mail={mail}
                  key={key}
                  onClick={openDetailModal(mail)}
                />
              ))
            ) : (
              <MailPost />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-1 p-10">
        <div className="flex flex-1 relative items-end pb-24 mr-24">
          <div className="flex w-full h-fit overflow-auto scrollbar absolute">
            {props.sentMails ? (
              props.sentMails.map((mail, key) => (
                <MailPost
                  isFirst={key === 0}
                  mail={mail}
                  key={key}
                  onClick={openDetailModal(mail)}
                />
              ))
            ) : (
              <MailPost isFirst />
            )}
          </div>
        </div>
      </div>
      {selectedMail && (
        <MailDetailModal closeModal={closeDetailModal} mail={selectedMail} />
      )}
    </div>
  )
}
