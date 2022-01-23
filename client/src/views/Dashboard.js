// import library
import { PlusOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Tooltip } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import ModalFormPost from '../component/post/ModalFormPost';
import SinglePost from '../component/post/SinglePost';
import { AuthContext } from '../contexts/AuthProvider';
//import something
import { PostContext } from '../contexts/PostProvider';
// initialValues data form modal
const initialValuesForm = {
  title: '',
  description: '',
  url: '',
  status: 'TO LEARN',
};
function Dashboard() {
  //state modal
  const [isVisibleModal, setIsVisibleModel] = useState(false);
  const [typeModal, setTypeModal] = useState('Add');
  const [dataFormModal, setDataFormModal] = useState(initialValuesForm);

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
  //set state show modal
  const handleModelShow = (type) => {
    setTypeModal(type);
    setIsVisibleModel(true);
  };
  //handle close modal
  const handleModalClose = () => {
    setDataFormModal(initialValuesForm);
    setIsVisibleModel(false);
  };
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
            onClick={() => {
              handleModelShow('Add');
            }}
          >
            LearnIt!
          </Button>
        </Card>
        <ModalFormPost
          isVisibleModal={isVisibleModal}
          handleModalClose={handleModalClose}
          typeModal={typeModal}
          dataFormModal={dataFormModal}
        />
      </div>
    );
  }
  return (
    <>
      <div className="p-4 ">
        <div className="flex flex-wrap m-auto gap-6 ">
          {posts.map((post) => (
            <SinglePost
              showModalEdit={() => {
                setDataFormModal(post);
                handleModelShow('Edit');
              }}
              key={post._id}
              post={post}
            />
          ))}
        </div>
      </div>
      <div className="fixed bottom-8 right-7 text-4xl  ">
        <Tooltip title="Add post">
          <Button
            className="shadow-lg border-blue-400 shadow-slate-500 bg-blue-400"
            type="primary"
            shape="circle"
            size="large"
            icon={<PlusOutlined className="text-2xl text-white " />}
            ghost
            onClick={() => {
              handleModelShow('Add');
            }}
          />
        </Tooltip>
      </div>
      <ModalFormPost
        isVisibleModal={isVisibleModal}
        handleModalClose={handleModalClose}
        typeModal={typeModal}
        dataFormModal={dataFormModal}
      />
    </>
  );
}

export default Dashboard;
