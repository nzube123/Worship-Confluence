import { db, individualDb } from "db";
import { Request, Response } from "express";

interface IndividualSchema {
  fullName: string;
  phoneNumber: string;
  email: string;
  songSelected: string;
  day: string;
}

const indivualRegistration = async (req: Request, res: Response) => {
  const body = req.body as IndividualSchema;
  const { fullName, phoneNumber, email, songSelected, day } = body;

  try {
    const result = await db.transaction(async (tx) => {
      // Return the inserted row so it can be sent back to the client
      return await tx
        .insert(individualDb)
        .values({ fullName, phoneNumber, email, songSelected, day })
        .returning(); // Use .returning() to get the generated ID/data
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: result[0], // result is usually an array
    });

  } catch (error) {
    console.error("❌ Registration Error:", error); // Log first!
    
    return res.status(500).json({
      success: false,
      message: "An error occurred during registration",
      error: error instanceof Error ? error.message : error,
    });
  }
};

export { indivualRegistration };