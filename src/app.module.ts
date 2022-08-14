import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user.module';
import { NoteModule } from './modules/note.module';
import { AuthModule } from './modules/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    NoteModule,
    AuthModule,
    MongooseModule.forRoot(
      'mongodb+srv://mohamed:mohamed@cluster0.fgpcd0h.mongodb.net/notes_db?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
