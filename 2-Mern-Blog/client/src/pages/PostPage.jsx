import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/v1/posts/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(true);
          setLoading(false);
          return;
        }
        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch(`/api/v1/posts/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="flex flex-col items-center max-w-7xl mx-auto min-h-screen p-6">
      {/* Hero Section */}
      <section className="w-full bg-cover bg-center h-[400px] flex items-center justify-center text-center relative"
        style={{ backgroundImage: `url(${post && post.image})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <h1 className="relative text-white text-4xl lg:text-5xl font-bold z-10">
          {post && post.title}
        </h1>
      </section>

      {/* Post Content */}
      <section className="w-full max-w-2xl mx-auto my-8">
        <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
          <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
          <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
        </div>

        <div
          className="prose lg:prose-xl mx-auto my-6"
          dangerouslySetInnerHTML={{ __html: post && post.content }}
        ></div>
      </section>

      {/* Call to Action Section */}
      <div className="w-full max-w-4xl my-10">
        <CallToAction />
      </div>

      {/* Comment Section */}
      <CommentSection postId={post._id} />

      {/* Recent Posts */}
      <section className="w-full max-w-6xl mx-auto my-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Recent Articles</h2>
        <div className="flex flex-wrap justify-center gap-8">
          {recentPosts &&
            recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>
      </section>

      <Link
        to={`/search`}
        className="text-teal-500 hover:underline text-lg font-semibold mt-6"
      >
        View all posts
      </Link>
    </main>
  );
};

export default PostPage;
