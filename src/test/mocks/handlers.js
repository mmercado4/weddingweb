import { rest } from "msw";
import { HOST, APIPORT } from "../../tools/consts";

const userUrl = "/api/login";

export const handlers = [
  rest.post(`${HOST}${APIPORT}${userUrl}`, (req, res, ctx) => {
    return res(
      ctx.json([{ success: true, message: "User logged in successfully" }])
    );
  }),
];
