import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Booking } from './booking.model';

@Resolver()
export class BookingResolver {
  private bookings: Booking[] = [];

  @Mutation(() => Booking)
  bookHotel(
    @Args('start_date') start_date: Date,
    @Args('end_date') end_date: Date,
    @Args('hotel_id') hotel_id: number,
    @Args('price') price: number,
  ) {
    const booking: Booking = {
      start_date,
      end_date,
      hotel_id,
      is_checked_in: false,
      price,
    };
    this.bookings.push(booking);
    return booking;
  }

  @Mutation(() => Boolean)
  cancelBooking(@Args('hotel_id') hotel_id: number) {
    const index = this.bookings.findIndex((b) => b.hotel_id === hotel_id);
    if (index === -1) return false;
    this.bookings.splice(index, 1);
    return true;
  }

  @Mutation(() => Booking, { nullable: true })
  checkIn(@Args('hotel_id') hotel_id: number) {
    const booking = this.bookings.find((b) => b.hotel_id === hotel_id);
    if (!booking) return null;
    booking.is_checked_in = true;
    return booking;
  }

  @Query(() => [Booking])
  getBookings(@Args('start') start: Date, @Args('end') end: Date) {
    return this.bookings.filter(
      (b) =>
        new Date(b.start_date) >= new Date(start) &&
        new Date(b.end_date) <= new Date(end),
    );
  }
}
