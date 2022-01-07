import { EventDispatcher } from "event-dispatch";
import events from "../subscribers/events";

export default class UserService {
  private _eventDispatcher: EventDispatcher;

  constructor() {
    this._eventDispatcher = new EventDispatcher();
  }

  public async SignUp() {
    this._eventDispatcher.dispatch(events.user.signUp);
  }

  public async SignIn(email = "", password = "") {
    this._eventDispatcher.dispatch(events.user.signIn);
  }

  private async hashPassword(password = "") {}

  public async resetPassword() {}

  public async changePassword() {}
}
