import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Book } from './book.model';

@Resolver(() => Book)
export class BookResolver {
  private books: Book[] = [
    { id: 1, title: 'Mathematic', author: 'Dara', price: 10 },
    { id: 2, title: 'Physic', author: 'Sok', price: 20 },
    { id: 3, title: 'Chemistry', author: 'Ratha', price: 15 },
  ];
  @Query('books')
  getAllBooks() {
    return this.books;
  }

  @Query('book')
  getBookById(@Args('id') id: number) {
    return this.books.find((book) => book.id == id);
  }

  @Mutation('addBook')
  addBook(@Args('title') title: string, @Args('price') price: number) {
    const sortedBooks = this.books.sort((a, b) => a.id - b.id);
    const lastId =
      sortedBooks.length > 0 ? sortedBooks[sortedBooks.length - 1].id : 0;
    const newBook = {
      id: lastId + 1,
      title,
      price,
      author: 'Unknown',
    };
    this.books.push(newBook);
    return newBook;
  }
  @Mutation('updateBook')
  updateBook(
    @Args('id') id: number,
    @Args('title') title: string,
    @Args('price') price: number,
  ) {
    const bookIndex = this.books.findIndex((book) => book.id == id);
    if (bookIndex === -1) {
      throw new Error('Book not found');
    }
    const updatedBook = {
      ...this.books[bookIndex],
      title,
      price,
    };
    this.books[bookIndex] = updatedBook;
    return updatedBook;
  }
  @Mutation('deleteBook')
  deleteBook(@Args('id') id: number) {
    try {
      const bookIndex = this.books.findIndex((book) => book.id == id);
      if (bookIndex === -1) {
        return false;
      }
      this.books.splice(bookIndex, 1);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
