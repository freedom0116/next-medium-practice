import Head from 'next/head';
import { sanityClient, urlFor } from 'sanity';
import { HomeProps } from '@/typings.d';
import Banner from '@/components/Banner';
import { PostsArea } from '@/containers/Posts';
import Post from '@/components/Post';

const Home = ({ posts }: HomeProps) => {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Banner src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Medium_svg5-512.png" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:m-6">
        {posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            coverImage={urlFor(post.mainImage).url()!}
            avatar={urlFor(post.author.image).url()!}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    author-> {
      name,
      image
    },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);

  return { props: { posts } };
};
