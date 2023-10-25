import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './notifications/notifications.module';
import * as process from 'process';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGOOSE_URI), UserModule, NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
