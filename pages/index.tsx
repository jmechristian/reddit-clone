import { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { useUser } from '../src/context/authContext';
import { listPosts } from '../src/graphql/queries';
import { ListPostsQuery, Post } from '../src/API';
import { Container } from '@material-ui/core';
import PostPreview from '../src/components/PostPreview';

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchPostsFromAPI = async () => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        errors: any[];
      };
      if (allPosts.data) {
        setPosts(allPosts.data.listPosts.items as Post[]);
        return allPosts.data.listPosts.items as Post[];
      } else {
        throw new Error('Could not fetch posts');
      }
    };

    fetchPostsFromAPI();
  }, []);

  return (
    <Container maxWidth='md'>
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  );
}
