import { BannerProps } from '@/typings';

export const BannerArea = ({ children }: any) => (
  <div className="flex justify-between items-center bg-yellow-400 border-black py-10 ">
    {children}
  </div>
);

export const BannerLeft = ({ children }: any) => (
  <div className="px-20 space-y-5">{children}</div>
);

export const BannerTitle = ({ children }: any) => (
  <h1 className="text-6xl max-w-xl font-serif">{children}</h1>
);

export const TitleSpan = ({ children }: any) => (
  <span className="underline decoration-black decoration-4">{children}</span>
);

export const BannerImage = ({ src }: any) => (
  <img className="hidden md:inline-flex h-32 lg:h-64 px-20" src={src} alt="" />
);

const Banner = ({ src }: BannerProps) => (
  <BannerArea>
    <BannerLeft>
      <BannerTitle>
        <TitleSpan>Medium</TitleSpan> is a place to write, read, and connect
      </BannerTitle>
      <h2>
        Its easy and free to post your thinking or any topic and connect with
        millions of readers
      </h2>
    </BannerLeft>

    <BannerImage src={src} />
  </BannerArea>
);

export default Banner;
