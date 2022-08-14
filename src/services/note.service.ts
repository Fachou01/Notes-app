import { Injectable } from '@nestjs/common';

@Injectable()
export class NoteService {
  findAll(): string {
    return 'note find all';
  }

  findById(id: number): string {
    return 'note find by id';
  }

  update(id: number): string {
    return 'note update';
  }

  deleteById(id: number): string {
    return 'note delete by id';
  }
}
