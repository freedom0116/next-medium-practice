import { Post, PostProps, FormInputType } from '@/typings';
import { PortableText } from '@portabletext/react';
import { GetStaticProps } from 'next';
import { sanityClient, urlFor } from 'sanity';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import {
  ArticleArea,
  ArticleAuthor,
  ArticleDiscription,
  ArticleTitle,
  AuthorDetail,
  AuthorName,
  Divider,
  PostBanner,
  ReminderTitle,
  SubmitReminder,
} from '@/components/ThePost';
import Avatar from '@/components/Avatar';
import {
  FormArea,
  FormSubtitle,
  FormTitle,
  FormDivider,
  FormInput,
  FormTextarea,
  FormError,
  FormSubmit,
} from '@/components/Form';

import {
  Comment,
  CommentArea,
  CommentDivider,
  CommentTitle,
} from '@/components/Comment';

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
          <FormSubtitle>Enjoyed this article?</FormSubtitle>
          <FormTitle>Leave a comment below!</FormTitle>
          <FormDivider />

          <input
            {...register('_id')}
            type="hidden"
            name="_id"
            value={post._id}
          />

          <FormInput
            value="Name"
            placeholder="Input your name"
            type="text"
            register={register('name', { required: true })}
          />
          <FormInput
            value="Email"
            placeholder="Input your email"
            type="email"
            register={register('email', { required: true })}
          />
          <FormTextarea
            value="Comment"
            placeholder="Input your comment"
            rows={8}
            register={register('comment', { required: true })}
          />

          <FormError isError={errors.name}>
            - The name Field is required
          </FormError>
          <FormError isError={errors.email}>
            - The email Field is required
          </FormError>
          <FormError isError={errors.comment}>
            - The comment Field is required
          </FormError>

          <FormSubmit />
        </FormArea>
      )}

      <CommentArea>
        <CommentTitle>Comments</CommentTitle>
        <CommentDivider />
        {post.comments.map((comment) => (
          <Comment key={comment._id} comment={comment}></Comment>
        ))}
      </CommentArea>
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
