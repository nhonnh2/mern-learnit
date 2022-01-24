import { GithubOutlined } from '@ant-design/icons';
import React from 'react';

function About() {
  return (
    <div>
      <a
        href="https://github.com/nhonnh2/mern-learnit"
        target="blank"
        className="flex justify-center items-center text-white bg-indigo-500 py-2 mt-8 text-base rounded-md w-[80%] md:w-[60%] lg:w-[45%] m-auto"
      >
        Visit my github source code <GithubOutlined className="ml-2" />
      </a>
    </div>
  );
}

export default About;
