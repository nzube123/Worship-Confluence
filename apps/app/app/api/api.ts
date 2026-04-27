const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

interface IndividualSchema {
  fullName: string;
  phoneNumber: string;
  email: string;
  songSelected: string;
  day: string;
}

interface ChoirSchema {
  choirName: string;
  phoneNumber: string;
  email: string;
  songSelected: string;
  day: string;
}

export const registerIndividual = async (
  body: IndividualSchema
): Promise<IndividualSchema> => {
  try {
    const res = await fetch(`${BASE_URL}/register/individual`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = res.json();
    return data;
  } catch (error) {
  }
};



export const registerChoir = async (
  body: ChoirSchema
): Promise<ChoirSchema> => {
  const res = await fetch(`${BASE_URL}/register/choir`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};