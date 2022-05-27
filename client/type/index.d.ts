export interface Friend {
  id: string
  avatarUrl: string | null | undefined
  username: string
  latestTitle: string | null | undefined
}
export interface Mail {
  arrivalTime: string
  content: string
  id: string
  images: Array<string>
  receiverId: string
  senderId: string
  title: string
  senderUsername: string
  receiverUsername: string
}
export interface UnreadMail {
  avatarUrl: string | null | undefined
  arrivalTime: string
  content: string
  id: string
  images: Array<string>
  receiverId: string
  senderId: string
  title: string
  senderUsername: string
  receiverUsername: string
}
