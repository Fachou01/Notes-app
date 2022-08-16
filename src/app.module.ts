import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { NoteListModule } from './modules/note-list.module';
import { AuthModule } from './modules/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    NoteListModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGO_DB),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
