import { seal } from "@hapi/iron";
import { Magic } from "@magic-sdk/admin";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { sealOptions, setTokenCookie } from "utils/auth";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async function login(req, res) {
  const prefix = `🚀 ~ ${new Date().toLocaleString()} ~ GET /login `;
  console.log(prefix);

  if (!req.headers.authorization) {
    return res.status(200).json({});
  }

  const didToken = req.headers.authorization.substr(7);
  magic.token.validate(didToken);

  const data = await magic.users.getMetadataByToken(didToken);

  const userToken = {
    email: data.email
  };
  const token = await seal(userToken, process.env.SECRET, sealOptions);
  setTokenCookie(res, token);

  res.status(200).json({ authenticated: true });
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  }
});
