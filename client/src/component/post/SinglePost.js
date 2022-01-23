import {
  DeleteOutlined,
  EditOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons';
import { Button, Card, Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function SinglePost({
  post: { _id, status, title, description, url },
  showModalEdit,
}) {
  return (
    <>
      <Card
        title={title}
        className="g:w-[20%] md:w-[30%] sm:w-[47%] w-[94%]"
        hoverable
        extra={
          <>
            <Button className="border-0 mr-3" size="small">
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
          <p className="text-gray-500 w-[80%]">{description}</p>
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
