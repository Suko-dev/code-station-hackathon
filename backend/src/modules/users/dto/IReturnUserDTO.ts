interface IReturnUserDTO {
  user: {
    email: string;
    image: string;
    profit: number;
    name: string;
    id: string;
  };
  token: string;
}

export { IReturnUserDTO };
