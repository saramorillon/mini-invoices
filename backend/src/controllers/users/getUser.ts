import { Request, Response } from 'express'
import { User } from '../../models/User'

export async function getUser(req: Request, res: Response) {
  const { id } = req.params
  try {
    const user = await User.getRepository().findOne(id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
