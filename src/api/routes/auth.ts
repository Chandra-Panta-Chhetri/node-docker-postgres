import { Router, Request, Response, NextFunction } from "express";
import UserService from "../../services/user";
import { celebrate, Joi, Segments } from "celebrate";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  route.post(
    "/signup",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        password: Joi.string().required().messages({
          "string.required": "Password is required"
        })
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userService = new UserService();
        await userService.SignUp();
        res.status(200).send("Sign up Successfully");
      } catch (err) {
        next(err);
      }
    }
  );

  route.post("/signin", async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const userService = new UserService();
      await userService.SignIn(email, password);
      res.status(200).send();
    } catch (err) {
      return next(err);
    }
  });
};
