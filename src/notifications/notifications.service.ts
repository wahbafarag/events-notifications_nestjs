import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { NewUserEvent } from '../events/new-user.event';
import { UpdateInfoEvent } from '../events/update-info.event';
import { DeactivateAccountEvent } from '../events/deactivate-account.event';

@Injectable()
export class NotificationsService {
  @OnEvent('user.created')
  handleUserCreatedEvent(payload: NewUserEvent) {
    console.log(`Welcome ${payload['name']} , Happy to see you on board`); // temporary until i implement emails , notifications
  }

  @OnEvent('user.info.updated')
  handleUserInfoUpdatedEvent(payload: UpdateInfoEvent) {
    console.log(`${payload['name']} : Your info has been updated successfully`); // temporary until i implement emails , notifications
  }

  @OnEvent('user.status.deactivated')
  handleUserStatusDeactivatedEvent(payload: DeactivateAccountEvent) {
    console.log(
      `Hey ${payload['name']} : You de-activated you account, sorry to see you go`,
    ); // temporary until i implement emails , notifications
  }
}
