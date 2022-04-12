import { Post, PostProps, FormInput } from '@/typings';
import { PortableText } from '@portabletext/react';
import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from 'sanity';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import {
  ArticleArea,
  ArticleDiscription,
  ArticleTitle,
  ArticleAuthor,
  PostBanner,
  AuthorDetail,
  AuthorName,
  Divider,
  SubmitReminder,
  ReminderTitle,
} from '@/components/Post';
import Avatar from '@/components/Avatar';
import { FormArea } from '@/components/Form';

const components: any = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold my-5">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold my-5">{children}</h2>
    ),
    li: ({ children }: any) => <li className="ml-4 list-disc">{children}</li>,
    link: ({ href, children }: any) => (
      <a href={href} className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <img className="" src={urlFor(value).url()!} alt="" />
    ),
  },
};

function Post({ post }: PostProps) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  return (
    <main>
      <PostBanner src={urlFor(post.mainImage).url()!} />

      <ArticleArea>
        <ArticleTitle>{post.title}</ArticleTitle>
        <ArticleDiscription>{post.description}</ArticleDiscription>

        <ArticleAuthor>
          <Avatar src={urlFor(post.author.image).url()!} />
          <AuthorDetail>
            <AuthorName>Blog post by {post.author.name}</AuthorName> - Published
            at {new Date(post._createdAt).toLocaleString()}
          </AuthorDetail>
        </ArticleAuthor>

        <div>
          <PortableText value={post.body as any} components={components} />
        </div>
      </ArticleArea>

      <Divider />

      {submitted ? (
        <SubmitReminder>
          <ReminderTitle>Thanks you for submitting your comment!</ReminderTitle>
          <p>Once it has been approved, it will appear below</p>
        </SubmitReminder>
      ) : (
        <FormArea onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2"></hr>

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register('name', { required: true })}
              className="shadow border rounded py-2 px-3 form-input my-1 block w-full ring-yellow-500 outline-none focus:ring"
              placeholder="Jimmy Lin"
              type="text"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register('email', { required: true })}
              className="shadow border rounded py-2 px-3 form-input my-1 block w-full ring-yellow-500 outline-none focus:ring"
              placeholder="Jimmy Lin"
              type="email"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register('comment', { required: true })}
              className="shadow border rounded py-2 px-3 mt-1 block w-full ring-yellow-500 outline-none focus:ring"
              placeholder="Jimmy Lin"
              rows={8}
            />
          </label>

          <div>
            {errors.name && (
              <span className="text-red-500">- The Name Field is required</span>
            )}
          </div>
          <div>
            {errors.name && (
              <span className="text-red-500">
                - The Email Field is required
              </span>
            )}
          </div>
          <div>
            {errors.comment && (
              <span className="text-red-500">
                - The Comment Field is required
              </span>
            )}
          </div>

          <input
            value="submit"
            type="submit"
            className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 mt-5 rounded cursor-pointer"
          />
        </FormArea>
      )}

      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name}</span>:
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[_type == "post"] {
    _id,
    slug {
      current
    }
  }`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    author-> {
      name,
      image
    },
    'comments': *[
      _type == "comment" && 
      post._ref == ^._id &&
      approved == true
    ],
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seeconds, it'll update the old cached version
  };
};