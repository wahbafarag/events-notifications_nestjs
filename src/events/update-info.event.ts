import { User } from '../user/schemas/user.schema';

export class UpdateInfoEvent {
  constructor(public readonly user: User) {}
}
