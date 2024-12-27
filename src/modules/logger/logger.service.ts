import { ConsoleLogger } from '@nestjs/common';

export class LoggerService extends ConsoleLogger {
  override log(context: string, ...args: unknown[]) {
    this.context = context;
    super.log(args.join());
  }
}
