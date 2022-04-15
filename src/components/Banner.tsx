import { BannerProps } from '@/typings';

const Banner = ({ src }: BannerProps) => (
  <div className="flex justify-between items-center bg-yellow-400 border-black py-10 ">
    <div className="px-20 space-y-5">
      <h1 className="text-6xl max-w-xl font-serif">
        <span className="underline decoration-black decoration-4">Medium</span>{' '}
        is a place to write, read, and connect
      </h1>
      <h2>
        Its easy and free to post your thinking or any topic and connect with
        millions of readers
      </h2>
    </div>

    <img
      className="hidden md:inline-flex h-32 lg:h-64 px-20"
      src={src}
      alt=""
    />
  </div>
);

export default Banner;
