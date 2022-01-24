import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons';
import { Button, Card, Modal, Tag } from 'antd';
import React, { useContext } from 'react';
import { PostContext } from '../../contexts/PostProvider';

const { confirm } = Modal;

function SinglePost({
  post: { _id, status, title, description, url },
  showModalEdit,
  ...rest
}) {
  //context
  const { deletePost } = useContext(PostContext);
  //confirm delete
  function showDeleteConfirm() {
    confirm({
      title: 'Are you sure delete this post?',
      icon: <ExclamationCircleOutlined />,
      content: 'Data cannot be recovered !!!',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        deletePost(_id);
      },
    });
  }
  return (
    <>
      <Card
        {...rest}
        title={title}
        className="g:w-[20%] md:w-[30%] sm:w-[47%] w-[94%] transition-all duration-300 ease-in  "
        hoverable
        extra={
          <>
            <Button
              className="border-0 mr-3"
              size="small"
              onClick={() => {
                showDeleteConfirm();
              }}
            >
              <DeleteOutlined />
            </Button>
            <Button
              className="border-0"
              size="small"
              onClick={() => {
                showModalEdit();
              }}
            >
              <EditOutlined />
            </Button>
          </>
        }
        style={{ width: 300 }}
      >
        <Tag
          color={`${
            status === 'LEARNED'
              ? 'green'
              : status === 'LEARNING'
              ? 'gold'
              : 'volcano'
          }`}
          className="mb-3"
        >
          {status}
        </Tag>
        <div className="flex justify-between">
          <p className="text-gray-500 w-[85%] inline-block whitespace-nowrap overflow-hidden truncate ...">
            {description}
          </p>
          <a
            href={url}
            target="blank"
            className="text-[20px] mr-6 sm:mr-0 text-gray-500"
          >
            <PlaySquareOutlined />
          </a>
        </div>
      </Card>
    </>
  );
}

export default SinglePost;
