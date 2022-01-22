// import library
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Spin } from 'antd';
import React, { useContext, useEffect } from 'react';
import SinglePost from '../component/post/SinglePost';
import { AuthContext } from '../contexts/AuthProvider';
//import something
import { PostContext } from '../contexts/PostProvider';

function Dashboard() {
  //context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);
  const {
    postState: { posts, postsLoading },
    getPosts,
  } = useContext(PostContext);
  //start get posts
  useEffect(() => {
    getPosts();
  }, []);

  //loading content
  if (postsLoading) {
    return (
      <div className="flex justify-center w-full h-[100vh]">
        <Spin className="flex items-center" size="large" />
      </div>
    );
  }
  if (posts.length === 0) {
    return (
      <div className="p-4">
        <Card title={`Hi ${username}`} hoverable style={{ width: 300 }}>
          <h3 className="font-bold">Welcome to LearnIt</h3>
          <p className="text-gray-600">
            Click to button below to track your first skill to learn
          </p>
          <Button
            type="primary"
            ghost
            className="flex items-center mt-3"
            icon={<PlusOutlined />}
          >
            LearnIt!
          </Button>
        </Card>
      </div>
    );
  }
  return (
    <div className="p-4 ">
      <div className="flex flex-wrap m-auto gap-6 ">
        {posts.map((post) => (
          <SinglePost post={post} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
