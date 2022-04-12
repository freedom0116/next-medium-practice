import { CommentProps } from '@/typings';

export const CommentArea = ({ children }: any) => (
  <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
    {children}
  </div>
);

export const CommentTitle = ({ children }: any) => (
  <h3 className="text-4xl">{children}</h3>
);

export const CommentDivider = () => <hr className="pb-2" />;

export const Comment = ({ comment }: CommentProps) => (
  <div>
    <p>
      <span className="text-yellow-500">{comment.name}</span>: {comment.comment}
    </p>
  </div>
);
