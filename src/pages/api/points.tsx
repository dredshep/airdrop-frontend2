// pull from : community points: http://35.88.36.175:18123/allpoints
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function AllPoints(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { address },
  } = req
  const uri = 'http://35.88.36.175:18123/points?address=' + (address as string)
  const response = await axios.get(uri)
  res.statusCode = 200
  res.json(response.data)
}
