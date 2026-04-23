"use server";

import { google } from "googleapis";

type SpreadSheetSchema = {
  fullName?: string;
  choirName?: string;
  phoneNumber: string;
  email: string;
  songSelected: string;
};

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function appendItem(data: SpreadSheetSchema) {
  try {
    const sheets = google.sheets({ version: "v4", auth: auth });

    const rowValues = [
      data.fullName! || "", 
      data.choirName! || "",
      data.phoneNumber || "",
      data.email || "", 
      data.songSelected || "",
    ];

    console.log("Attempting to append row:", rowValues);

    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowValues],
      },
    });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
