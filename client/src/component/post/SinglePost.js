import {
  DeleteOutlined,
  EditOutlined,
  PlaySquareOutlined,
} from '@ant-design/icons';
import { Card, Tag } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

function SinglePost({ post: { _id, status, title, description, url } }) {
  return (
    <>
      <Card
        title={title}
        className={`g:w-[20%] md:w-[30%] sm:w-[47%] w-[94%]  border-l-[${
          status === 'LEARNED'
            ? '#389e0d'
            : status === 'LEARNING'
            ? '#d48806'
            : '#d4380d'
        }] border-l-[3px]`}
        hoverable
        extra={
          <>
            <Link to="" className="mr-4">
              <DeleteOutlined />
            </Link>
            <Link to="">
              <EditOutlined />
            </Link>
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
          <a href={url} target="blank" className="text-[20px] text-gray-500">
            <PlaySquareOutlined />
          </a>
        </div>
      </Card>
    </>
  );
}

export default SinglePost;
