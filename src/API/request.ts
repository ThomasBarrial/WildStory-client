import AXIOS from './axios';

export const post = {
  getAll: (): Promise<IPost[]> => AXIOS.get(`/post`).then((res) => res.data),
  getOne: (id: string): Promise<IPost> =>
    AXIOS.get(`/post/${id}`).then((res) => res.data),
};

export const user = {
  getOne: (id: string): Promise<IUser> =>
    AXIOS.get(`/users/${id}`).then((res) => res.data),
};

export const comment = {
  getAll: (): Promise<IComments[]> =>
    AXIOS.get(`/comments`).then((res) => res.data),
  post: ({ commentData }: { commentData: IComments }): Promise<IComments> =>
    AXIOS.post<IComments>(`/comments`, commentData).then((res) => res.data),
};
