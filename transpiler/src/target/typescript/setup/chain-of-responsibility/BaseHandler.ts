export abstract class BaseHandler<T> {
  next: BaseHandler<T>;

  setNext(handler: BaseHandler<T>): BaseHandler<T> {
    this.next = handler;

    // Returning a handler from here will let us link handlers in a
    // convenient way like this:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }

  handle(request: T): T {
    if (this.next) {
      return this.next.handle(request);
    }

    return request;
  }
}
