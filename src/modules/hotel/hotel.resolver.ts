import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Hotel } from '../hotel/hotel.model';

export class HotelResolver {
  public  hotels: Hotel[] = [
    { id: 1, name: 'Sofitel', address: 'Phnom Penh', phone: '012345678' },
    { id: 2, name: 'Raffles', address: 'Siem Reap', phone: '087654321' },
  ];

  @Query(() => [Hotel])
  getAllHotels() {
    return this.hotels;
  }

  @Query(() => Hotel, { nullable: true })
  getHotel(@Args('id') id: number) {
    return this.hotels.find((h) => h.id === id);
  }

  @Mutation(() => Hotel)
  createHotel(
    @Args('name') name: string,
    @Args('address') address: string,
    @Args('phone') phone: string,
  ) {
    const newId = this.hotels.length
      ? this.hotels[this.hotels.length - 1].id + 1
      : 1;
    const hotel = { id: newId, name, address, phone };
    this.hotels.push(hotel);
    return hotel;
  }

  @Mutation(() => Hotel)
  updateHotel(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('address') address: string,
    @Args('phone') phone: string,
  ) {
    const index = this.hotels.findIndex((h) => h.id === id);
    if (index === -1) throw new Error('Hotel not found');
    const updated = { ...this.hotels[index], name, address, phone };
    this.hotels[index] = updated;
    return updated;
  }

  @Mutation(() => Boolean)
  deleteHotel(@Args('id') id: number) {
    const index = this.hotels.findIndex((h) => h.id === id);
    if (index === -1) return false;
    this.hotels.splice(index, 1);
    return true;
  }
}
