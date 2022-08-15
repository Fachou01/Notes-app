import { SetMetadata } from '@nestjs/common';

export const Privilege = (...privilege: string[]) =>
  SetMetadata('privilege', privilege);
