interface IPost {
  id: string;
  title: string;
  text: string;
  likes: number;
  imageUrl: string[];
  createdAt: Date;
  updatedAt: Date;
  user: IUserPost;
  userId: string;
  comments: IComments[];
}
interface IPostData {
  title: string;
  text: string;
  imageUrl: string[];
  userId: string;
}

interface IUserPost {
  username: string;
  avatarUrl: string;
}

interface IComments {
  id: string;
  text: string;
  user: IUserPost;
  userId: string;
  postId: string;
}

interface PostComment {
  text: string;
  userId: string;
  postId: string;
}

interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  city: string;
  birthDate: string;
  avatarUrl: string;
  landingImageUrl: string;
  idFormation: string;
  post: IPost[];
  createdAt: Date;
  updatedAt: Date;
  userSkills: IUserSkills[];
  comments: IComments[];
}

interface IUserSkills {
  id: string;
  userId: string;
  skillId: string;
  note: number;
  createdAt: Date;
  updatedAt: Date;
}
