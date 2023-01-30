import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  // Then save the post data to a database
  res
    .status(200)
    .json({
      "user_email": email,
      "user_password": password,
      "req_method": req.method,
    });
}
