import { User } from '../user/schemas/user.schema';

export class DeactivateAccountEvent {
  constructor(public readonly user: User) {}
}