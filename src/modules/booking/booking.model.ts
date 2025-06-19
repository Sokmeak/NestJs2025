import { ObjectType, Field, Int,Float } from '@nestjs/graphql';

@ObjectType()
export class Booking {
  @Field()
  start_date: Date;

  @Field()
  end_date: Date;

  @Field(() => Int)
  hotel_id: number;

  @Field()
  is_checked_in: boolean;

  @Field(() => Float)
  price: number;
}