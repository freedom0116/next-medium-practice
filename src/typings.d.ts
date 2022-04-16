import { UseFormRegister } from 'react-hook-form';

export interface Post {
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  comments: [Comment];
  description: string;
  mainImage: {
    asset: {
      url: string;
    };
  };
  slug: {
    current: string;
  };
  body: [object];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  updatedAt: string;
}

export interface HomeProps {
  posts: [Post];
}

export interface PostProps {
  post: Post;
  coverImage: string | ImageUrlBuilder;
  avatar: string | ImageUrlBuilder;
}

export interface FormInputType {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

export interface FormInputProps {
  register: any;
  title: string;
  placeholder?: string;
  type?: string;
}

export interface FormTextareaProps {
  register: any;
  title: string;
  placeholder?: string;
  rows?: number;
}

export interface FormError {
  isError: FieldError;
  content: string;
}

export interface CommentProps {
  comment: Comment;
}

export interface BannerProps {
  src: string;
}
