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

export enum APIRoute {
  Films = '/films',
  Film = '/films/:id',
  Similar = '/films/:id/similar',
  Promo = '/promo',
  Favorite = '/favorite',
  ToWatch = '/favorite/:film_id/:status',
  Comments = '/comments/: film_id',
  Login = '/login',
  Logout = '/logout',
}
