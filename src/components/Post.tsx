export const PostBanner = ({ src }: any) => (
  <img className="w-full h-40 object-cover" src={src} alt="" />
);

export const ArticleArea = ({ children }: any) => (
  <article className="max-w-3xl mx-auto p-5">{children}</article>
);

export const ArticleTitle = ({ children }: any) => (
  <h1 className="text-3xl mt-10 mb-3">{children}</h1>
);

export const ArticleDiscription = ({ children }: any) => (
  <h2 className="text-xl font-light text-gray-500 mb-2">{children}</h2>
);

export const ArticleAuthor = ({ children }: any) => (
  <div className="flex items-center space-x-2">{children}</div>
);

export const AuthorDetail = ({ children }: any) => (
  <p className="font-extralight text-sm">{children}</p>
);

export const AuthorName = ({ children }: any) => (
  <span className="text-green-600">{children}</span>
);

export const Divider = () => (
  <hr className="max-w-lg my-5 mx-auto border-t-2 border-yellow-500" />
);

export const SubmitReminder = ({ children }: any) => (
  <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
    {children}
  </div>
);

export const ReminderTitle = ({ children }: any) => (
  <h3 className="text-3xl font-bold">{children}</h3>
);
