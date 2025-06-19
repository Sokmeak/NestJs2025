import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { BookResolver } from './modules/book/book.resolver';
import { BookingResolver } from './modules/booking/booking.resolver';
import { HotelResolver } from './modules/hotel/hotel.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['./**/*.graphql'],
    }),
    BookResolver,
    BookingResolver,
    HotelResolver,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
