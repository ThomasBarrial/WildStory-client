interface IPost {
  id: string;
  title: string;
  text: string;
  likes: number;
  imageUrl: string[];
  createdAt: Date;
  updatedAt: Date;

  userId: string;
  comments: IComments[];
}
interface IPostData {
  title: string;
  text: string;
  imageUrl: string[];
  userId: string;
}

interface IComments {
  id: string;
  text: string;
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
  profilTitle: string;
  username: string;
  email: string;
  password: string;
  city: string;
  birthDate: Date;
  avatarUrl: string;
  landimageUrl: string;
  idFormation: string;
  post: IPost[];
  createdAt: Date;
  updatedAt: Date;
  userSkills: IUserSkills[];
  comments: IComments[];
  mediaLink: IMediaLink[];
}

interface INewUser {
  id?: string;
  profilTitle: string;
  username: string;
  email: string;
  password: string;
  city: string;
  birthDate: Date;
  avatarUrl: string;
  landimageUrl: string;
  idFormation: string;
}

interface IUserSkills {
  id?: string;
  userId: string;
  skillId: string;
  note: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IFormation {
  id: string;
  formationName: string;
}

interface ISkills {
  id: string;
  name: string;
}

interface IMediaLink {
  id: string;
  name: string;
  link: string;
  idIcon: string;
  users: IUser[];
}

interface IMediaIcon {
  id: string;
  name: string;
  iconUrl: string;
  mediaLink: IMediaLink[];
}
