import { Post, PostProps, FormInputType } from '@/typings';
import { PortableText } from '@portabletext/react';
import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from 'sanity';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import Avatar from '@/components/Avatar';
import {
  FormInput,
  FormTextarea,
  FormError,
  FormSubmit,
} from '@/components/Form';

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
  } = useForm<FormInputType>();

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {
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
      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />
      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <Avatar src={urlFor(post.author.image).url()!} />
          <p className="font-extralight text-sm">
            <span className="text-green-600">
              Blog post by {post.author.name}
            </span>{' '}
            - Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div>
          <PortableText value={post.body as any} components={components} />
        </div>
      </article>

      <hr className="max-w-lg my-5 mx-auto border-t-2 border-yellow-500" />

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">
            Thanks you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below</p>
        </div>
      ) : (
        <form
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <FormInput
            title="Name"
            placeholder="Input your name"
            type="text"
            register={register('name', { required: true })}
          />
          <FormInput
            title="Email"
            placeholder="Input your email"
            type="email"
            register={register('email', { required: true })}
          />
          <FormTextarea
            title="Comment"
            placeholder="Input your comment"
            rows={8}
            register={register('comment', { required: true })}
          />

          <FormError
            isError={errors.name}
            content="- The name Field is required"
          />
          <FormError
            isError={errors.email}
            content="- The email Field is required"
          />
          <FormError
            isError={errors.comment}
            content="- The comment Field is required"
          />

          <FormSubmit />
        </form>
      )}

      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />
        {post.comments.map((comment) => (
          <p key={comment._id}>
            <span className="text-yellow-500">{comment.name}</span>:{' '}
            {comment.comment}
          </p>
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
