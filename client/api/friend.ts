import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import { delay } from "./util"
const endpoint = process.env.NEXT_PUBLIC_API_ENDPOINT + "friend/"
// const endpoint = "http://localhost:8000/api/friend/"
export const getFriendListAsync = async () => {
  await delay(5000)
  return {
    friends: [
      {
        username: "quang1",
        avatarUrl:
          "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-1/65424285_2318650985054573_3720033838362001408_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8hQwe0--lb4AX-MPvmT&_nc_oc=AQmZCdxL6sHpLH2o7LvxsbbYzGf2bvW6KLCKzGt-lpZIQlbr8qFkLwEslQJvBUDC1FY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT9_MTY02GIYvxIZn89lp5ZMaG1WYGfVCeDz5HvuuM1G3g&oe=62AD0E28",
        latestTitle: "xin",
      },
      {
        username: "quang2",
        avatarUrl:
          "https://scontent.fsgn5-15.fna.fbcdn.net/v/t1.6435-1/65424285_2318650985054573_3720033838362001408_n.jpg?stp=dst-jpg_p100x100&_nc_cat=111&ccb=1-7&_nc_sid=7206a8&_nc_ohc=8hQwe0--lb4AX-MPvmT&_nc_oc=AQmZCdxL6sHpLH2o7LvxsbbYzGf2bvW6KLCKzGt-lpZIQlbr8qFkLwEslQJvBUDC1FY&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-15.fna&oh=00_AT9_MTY02GIYvxIZn89lp5ZMaG1WYGfVCeDz5HvuuM1G3g&oe=62AD0E28",
        latestTitle: "chao",
      },
      {
        username: "phuong1",
        avatarUrl:
          "https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-1/270014568_252863200267336_6404182175193653114_n.jpg?stp=dst-jpg_p100x100&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=nOVUVcALuKEAX8aZvCO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT86JbQf6lkgtZyeY6jLa5SCR-6l-xNmyJXSigd1I261Jw&oe=628EF71B",
        latestTitle: null,
      },
      {
        username: "phuong0",
        avatarUrl:
          "https://scontent.fsgn5-1.fna.fbcdn.net/v/t39.30808-1/270014568_252863200267336_6404182175193653114_n.jpg?stp=dst-jpg_p100x100&_nc_cat=101&ccb=1-7&_nc_sid=7206a8&_nc_ohc=nOVUVcALuKEAX8aZvCO&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.fsgn5-1.fna&oh=00_AT86JbQf6lkgtZyeY6jLa5SCR-6l-xNmyJXSigd1I261Jw&oe=628EF71B",
        latestTitle: "nguoi",
      },
    ],
  }
  try {
    const idToken = await firebase.auth().currentUser?.getIdToken()

    const response = await fetch(`${endpoint}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      mode: "cors",
    })
    const dataJSON = JSON.parse(await response.json())
    return dataJSON
  } catch (error) {
    console.log(error)
    return { error: "Something must be wrong. Please try again" }
  }
}
