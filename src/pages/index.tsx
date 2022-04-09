import Head from 'next/head';
import { sanityClient, urlFor } from 'sanity';
import { HomeProps } from '@/typings.d';
import Link from 'next/link';

const Home = ({ posts }: HomeProps) => {
  return (
    <div>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex justify-between items-center bg-yellow-400 border-black py-10 ">
        <div className="px-20 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{' '}
            is a place to write, read, and connect
          </h1>
          <h2>
            Its easy and free to post your thinking or any topic and connect
            with millions of readers
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-32 lg:h-64 px-20"
          src="https://cdn1.iconfinder.com/data/icons/social-media-circle-7/512/Circled_Medium_svg5-512.png"
          alt=""
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:m-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`} passHref>
            <div className="group cursor-pointer border rounded-lg overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-sm">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt=""
                />
              </div>
            </div>
          </Link>
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
