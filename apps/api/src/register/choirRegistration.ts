import { choirDb, db, } from "db";
import { Request, Response } from "express";

interface ChoirSchema {
    choirName: string;
    phoneNumber: string;
    email: string;
    songSelected: string;
    day: string;
}

const choirRegistration = async (req: Request, res: Response) => {
const body = req.body as  ChoirSchema;
const {choirName, phoneNumber, email, songSelected, day} = body;

  try {
    const transaction = await db.transaction(async (tx) => {
      await tx
        .insert(choirDb)
        .values({ choirName, phoneNumber, email, songSelected, day });
    });

    return res.json(transaction)
  } catch (error) {
    return res.json(error)
  }
};

export {choirRegistration}