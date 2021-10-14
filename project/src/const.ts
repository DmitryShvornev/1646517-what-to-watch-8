export enum AppRoute {
  SignIn = '/login',
  Main = '/',
  MyList = '/mylist',
  AddReview = '/films/:id/review',
  Film = '/films/:id',
  Player = '/player/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
