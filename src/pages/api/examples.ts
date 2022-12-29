import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await prisma.example.findMany();
  res.status(200).json(examples);
};

export default examples;
