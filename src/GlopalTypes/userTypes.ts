//  Root response
export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

//  User
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: "admin" | "moderator" | "user"; //  union type
}

//  Hair
export interface Hair {
  color: string;
  type: string;
}

//  Address
export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
}

//  Coordinates
export interface Coordinates {
  lat: number;
  lng: number;
}

//  Bank
export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

//  Company
export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

//  Crypto
export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

// state
export interface UserState {
  loading: boolean;
  error: boolean;
  userData: UsersResponse | null;
}

// Params
export interface Props {
  params: {
    id: string;
  };
}
