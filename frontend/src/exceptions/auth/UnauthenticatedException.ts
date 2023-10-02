export class UnauthenticatedException extends Error {
  constructor() {
    super("unauthenticated");

    this.message = "unauthenticated";
  }
}
