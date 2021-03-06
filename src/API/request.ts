/* eslint-disable no-shadow */
import AXIOS from './axios';

export const post = {
  getAll: (offset?: number): Promise<IPost[]> =>
    AXIOS.get(`/post/?limit=5&offset=${offset}`).then((res) => res.data),
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
  getAll: (): Promise<IUser[]> => AXIOS.get('/users').then((res) => res.data),
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
  updatePassword: ({
    updatePassword,
  }: {
    updatePassword: IPasswordMutate;
  }): Promise<IUser> =>
    AXIOS.put(`/users/self/password`, updatePassword).then((res) => res.data),
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
  getUsers: (id?: string): Promise<IUserFormation[]> =>
    AXIOS.get(`/formations/users/${id}`).then((res) => res.data),
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

export const topics = {
  getAll: (): Promise<ITopics[]> =>
    AXIOS.get(`/topics`).then((res) => res.data),
  getOne: (id: string): Promise<ITopics> =>
    AXIOS.get(`/topics/${id}`).then((res) => res.data),
  getPost: (id: string): Promise<IPost[]> =>
    AXIOS.get(`/topics/posts/${id}`).then((res) => res.data),
};

export const savePost = {
  post: ({ savePostData }: { savePostData: ISavePost }): Promise<ISavePost> =>
    AXIOS.post(`/savepost`, savePostData).then((res) => res.data),
  getUserSavedPost: (id: string): Promise<ISavePost[]> =>
    AXIOS.get(`/savepost/user/${id}`).then((res) => res.data),
  delete: (id: string): Promise<ISavePost> =>
    AXIOS.delete(`/savepost/${id}`).then((res) => res.data),
};

export const follows = {
  post: ({ followsData }: { followsData: IFollow }): Promise<IFollow> =>
    AXIOS.post(`/follows`, followsData).then((res) => res.data),
  getUserFollowers: (id: string): Promise<IFollow[]> =>
    AXIOS.get(`/follows/followers/${id}`).then((res) => res.data),
  getUserFollowings: (id: string): Promise<IFollow[]> =>
    AXIOS.get(`/follows/followings/${id}`).then((res) => res.data),
  delete: (id: string): Promise<IFollow> =>
    AXIOS.delete(`/follows/${id}`).then((res) => res.data),
};

export const conversations = {
  getUserConversations: (id: string): Promise<IConversation[]> =>
    AXIOS.get(`/conversation/${id}`).then((res) => res.data),
  post: ({
    conversationData,
  }: {
    conversationData: IConversation;
  }): Promise<IConversation> =>
    AXIOS.post(`/conversation`, conversationData).then((res) => res.data),
  delete: (id: string): Promise<IConversation> =>
    AXIOS.delete(`/conversation/${id}`).then((res) => res.data),
  update: ({
    id,
    body,
  }: {
    id: string | undefined;
    body: IConversation;
  }): Promise<IConversation> =>
    AXIOS.put(`/conversation/${id}`, body).then((res) => res.data),
};

export const messages = {
  getConversationMessages: (id: string): Promise<IMessage[]> =>
    AXIOS.get(`/message/conversation/${id}`).then((ress) => ress.data),
  post: ({ message }: { message: IMessage }): Promise<IMessage> =>
    AXIOS.post('/message', message).then((res) => res.data),
};
