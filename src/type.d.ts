export interface IApiDish {
  name: string;
  id: string;
  photo: string;
  price: number;
}

export type ApiDish = Omit<IApiDish, 'id'>;

export interface IDishesMutation {
  photo: string,
  price: string,
  name: string,
}

export interface IApiDishesList {
  [key: string]: IApiDish;
}
