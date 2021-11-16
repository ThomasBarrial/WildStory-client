import AXIOS from './axios';

export const post = {
  getAll: (): Promise<IPost[]> => AXIOS.get(`/post`).then((res) => res.data),
  getOne: (id: string): Promise<IPost> =>
    AXIOS.get(`/post/${id}`).then((res) => res.data),
  getComments: (id: string): Promise<IComments[]> =>
    AXIOS.get(`/post/${id}/comments`).then((res) => res.data),
  getUserPost: (id: string): Promise<IPost[]> =>
    AXIOS.get(`/post/user/${id}`).then((res) => res.data),
  post: ({ postData }: { postData: IPostData }): Promise<IPostData> =>
    AXIOS.post('/post', postData).then((res) => res.data),
  put: ({
    id,
    postData,
  }: {
    id: string;
    postData: IPostData;
  }): Promise<IPost> =>
    AXIOS.put(`/post/${id}`, postData).then((res) => res.data),
  delete: (id: string): Promise<IPost> =>
    AXIOS.delete(`/post/${id}`).then((res) => res.data),
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

export const formation = {
  getAll: (): Promise<IFormation[]> =>
    AXIOS.get('/formations').then((res) => res.data),
  getOne: (id: string): Promise<IFormation> =>
    AXIOS.get(`/formations/${id}`).then((res) => res.data),
};

export const userSkills = {
  getAll: (id: string): Promise<IUserSkills[]> =>
    AXIOS.get(`/userskills/${id}`).then((res) => res.data),
};

export const skills = {
  getAll: (): Promise<ISkills[]> =>
    AXIOS.get(`/skills`).then((res) => res.data),
  getOne: (id: string): Promise<ISkills> =>
    AXIOS.get(`/skills/${id}`).then((res) => res.data),
};

export const mediaIcons = {
  getAll: (): Promise<IMediaIcon[]> =>
    AXIOS.get('/mediaicons').then((res) => res.data),
};
