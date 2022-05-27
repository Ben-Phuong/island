// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

// require("")
const TextToxicity = require("@tensorflow-models/toxicity")
const threshold = 0.9
let model: any
const loadModel = TextToxicity.load(threshold)
type Data = {
  status: string
  message: string
  type?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (!model) model = await loadModel
    const { content, title } = JSON.parse(req.body)
    // console.log("req.body", req.body)
    content.replace("\n", " ")

    const predictions = await model.classify([content, title])

    // for (let p of predictions) console.log("p", p.results[0], p.results[1])
    for (let p of predictions)
      if (p.results[0].match || p.results[1].match) {
        res.status(200).json({
          status: "failed",
          message: "Toxicity detected",
          type: p.label,
        })
        return
      }

    res.status(200).json({ status: "pass", message: "Good" })
  } catch (error) {
    console.log("error", error)
    res.status(200).json({
      message: "Unknown error. Please try again.",
      status: "failed",
    })
  }
}
