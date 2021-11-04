import AXIOS from './axios';

export const post = {
  getAll: (): Promise<IPost[]> => AXIOS.get(`/post`).then((res) => res.data),
  getOne: (id: string): Promise<IPost> =>
    AXIOS.get(`/post/${id}`).then((res) => res.data),
  getComments: (id: string): Promise<IComments[]> =>
    AXIOS.get(`/post/${id}/comments`).then((res) => res.data),
  post: ({ createData }: { createData: IPostData }): Promise<IPost> =>
    AXIOS.post('/post', createData).then((res) => res.data),
};

export const user = {
  getOne: (id?: string): Promise<IUser> =>
    AXIOS.get(`/users/${id}`).then((res) => res.data),
};

export const comment = {
  getAll: (): Promise<IComments[]> =>
    AXIOS.get(`/comments`).then((res) => res.data),
  post: ({ commentData }: { commentData: PostComment }): Promise<PostComment> =>
    AXIOS.post<PostComment>(`/comments`, commentData).then((res) => res.data),
  delete: (id: string): Promise<IComments> =>
    AXIOS.delete(`/comments/${id}`).then((res) => res.data),
};
