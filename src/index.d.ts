interface IPost {
  id: string;
  title: string;
  text: string;
  likes: ILikes[];
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
  userId: string | undefined;
}

interface IComments {
  id: string;
  text: string;
  userId: string;
  postId: string;
}

type IPostLikes = Omit<ILikes, 'id'>;

interface ILikes {
  id: string;
  userId: string;
  postId: string;
  isLike: boolean;
}

interface PostComment {
  text: string;
  userId: string | undefined;
  postId: string;
}

interface IUser {
  id: string;
  profilTitle: string;
  username: string;
  email: string;
  password: string;
  city: string;
  birthDate: string | undefined;
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
  profilTitle?: string;
  username?: string;
  email?: string;
  oldPassword?: string;
  password?: string;
  confirmPassword?: string;
  city?: string;
  birthDate?: string;
  avatarUrl?: string;
  landimageUrl?: string;
  idFormation?: string;
}

interface IUpdateAssetsUser {
  avatarUrl?: string;
  landimageUrl?: string;
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
  id?: string;
  link: string;
  iconId: string;
  userId: string;
}

interface IMediaIcon {
  id?: string;
  name: string;
  iconUrl: string;
  mediaLink: IMediaLink[];
}

interface IPasswordMutate {
  password: string | undefined;
  oldPassword: string | undefined;
}
