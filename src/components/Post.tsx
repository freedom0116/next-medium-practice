import React from 'react';
import Link from 'next/link';
import { PostProps } from '@/typings';
import Avatar from './Avatar';

function Post({ post, coverImage, avatar }: PostProps) {
  return (
    <Link href={`/post/${post.slug.current}`} passHref>
      <div className="group cursor-pointer border rounded-lg overflow-hidden">
        <img
          className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
          src={coverImage}
          alt=""
        />
        <div className="flex justify-between p-5 bg-white">
          <div>
            <p className="text-lg font-bold">{post.title}</p>
            <p className="text-sm">
              {post.description} by {post.author.name}
            </p>
          </div>
          <Avatar src={avatar} />
        </div>
      </div>
    </Link>
  );
}

export default Post;
