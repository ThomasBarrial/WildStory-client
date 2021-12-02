/* eslint-disable no-shadow */
import AXIOS from './axios';

export const post = {
  getAll: (): Promise<IPost[]> => AXIOS.get(`/post`).then((res) => res.data),
  getOne: (id: string): Promise<IPost> =>
    AXIOS.get(`/post/${id}`).then((res) => res.data),
  getComments: (id: string): Promise<IComments[]> =>
    AXIOS.get(`/post/${id}/comments`).then((res) => res.data),
  getLikes: (id: string): Promise<ILikes[]> =>
    AXIOS.get(`/post/${id}/likes`).then((res) => res.data),
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
  post: ({ UserData }: { UserData: INewUser }): Promise<INewUser> =>
    AXIOS.post('/users', UserData).then((res) => res.data),

  put: ({
    UserData,
    id,
  }: {
    UserData: IUpdateAssetsUser | INewUser;
    id: string | undefined;
  }): Promise<INewUser> =>
    AXIOS.put(`/users/${id}`, UserData).then((res) => res.data),
  updatePasword: ({
    passwordsToCompare,
  }: {
    passwordsToCompare: IPasswordMutate;
  }): Promise<IUser> =>
    AXIOS.put(`/users/self/password`, passwordsToCompare).then(
      (res) => res.data
    ),
};

export const likes = {
  post: ({ likesData }: { likesData: IPostLikes }): Promise<ILikes> =>
    AXIOS.post<ILikes>(`/likes`, likesData).then((res) => res.data),
  update: ({
    id,
    likesData,
  }: {
    likesData: IPostLikes;
    id: string;
  }): Promise<ILikes> =>
    AXIOS.put<ILikes>(`/likes/${id}`, likesData).then((res) => res.data),
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
  post: ({ skillData }: { skillData: IUserSkills }): Promise<IUserSkills> =>
    AXIOS.post<IUserSkills>(`/userskills`, skillData).then((res) => res.data),
  delete: (id: string): Promise<IUserSkills> =>
    AXIOS.delete(`/userskills/${id}`).then((res) => res.data),
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
  getOne: (id: string): Promise<IMediaIcon> =>
    AXIOS.get(`/mediaicons/${id}`).then((res) => res.data),
};

export const mediaLinks = {
  getUsersMediaLink: (id: string): Promise<IMediaLink[]> =>
    AXIOS.get(`/medialinks/user/${id}`).then((res) => res.data),
  post: ({
    medialLinkData,
  }: {
    medialLinkData: IMediaLink;
  }): Promise<IMediaLink> =>
    AXIOS.post('/medialinks', medialLinkData).then((res) => res.data),

  delete: (id: string): Promise<IMediaLink> =>
    AXIOS.delete(`/medialinks/${id}`).then((res) => res.data),
};

export const auth = {
  login: (user: {
    username: string | undefined;
    password: string | undefined;
  }): Promise<{ message: string; user: IUser }> =>
    AXIOS.post(`/auth/login`, user, { withCredentials: true }).then(
      (res) => res.data
    ),
  me: (): Promise<IUser> => AXIOS.get(`/auth/me`).then((res) => res.data),
  logout: (): Promise<{ message: string }> => AXIOS.get('/auth/logout'),
};
