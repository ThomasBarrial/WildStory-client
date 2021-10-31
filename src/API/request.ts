import AXIOS from './axios';

export const post = {
  getAll: (): Promise<IPost[]> => AXIOS.get(`/post`).then((res) => res.data),
};

export const user = {
  getOne: (id: string): Promise<IUser> =>
    AXIOS.get(`/users/${id}`).then((res) => res.data),
};
