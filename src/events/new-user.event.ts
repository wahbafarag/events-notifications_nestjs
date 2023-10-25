import { User } from '../user/schemas/user.schema';

export class NewUserEvent {
  constructor(public readonly user: User) {}
}
