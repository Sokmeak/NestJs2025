import { Module, MiddlewareConsumer } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { LoggerMiddleware } from './common/miiddleware/logger.middle';

@Module({
  imports: [
    UserModule,
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'todo.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: 'localhost',
    //   port: 3306,
    //   username: 'sokmeak',
    //   password: 'sokmeak1376',
    //   database: 'nestjs',
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true, // only for development!
    // }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
