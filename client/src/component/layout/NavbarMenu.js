import React, { useContext, useState } from 'react';
import learnItLogo from '../../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import { LoginOutlined, MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthProvider';

function NavbarMenu() {
  //context
  const {
    authState: {
      user: { username },
    },
    logoutUser,
  } = useContext(AuthContext);
  //handleLogout
  const handleLogout = () => {
    logoutUser();
  };
  const Links = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'About', path: '/about' },
  ];
  const location = useLocation();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10">
          <div className="font-bold text-2xl cursor-pointer flex items-center pl-6 md:pl-0">
            <img
              src={learnItLogo}
              alt="learnItLogo"
              width="32"
              height="32"
              className="mr-2 "
            />
            LearnIt
          </div>
          <div
            onClick={() => {
              setOpen(!open);
            }}
            className="text-3xl absolute right-8 top-3 cursor-pointer md:hidden top"
          >
            {open ? <CloseOutlined /> : <MenuOutlined />}
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static 
                    bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 
                    pl-9 transition-all duration-500 ease-in ${
                      open
                        ? 'top-16 opacity-100'
                        : 'top-[-490px] md:opacity-100 opacity-100'
                    }`}
          >
            {Links.map((link, idx) => (
              <li key={idx} className="md:ml-8 text-[17px] md:my-0 my-7">
                <Link
                  to={link.path}
                  className={`text-gray-800 hover:text-gray-400 duration-500 ${
                    location.pathname === link.path ? 'text-gray-400' : ''
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="md:ml-8 text-[17px] md:flex md:my-0 ">
              <p className="mb-3 md:mb-0 md:ml-4">welcom {username}</p>
              <Button
                className="flex items-center px-6 rounded md:ml-8"
                icon={<LoginOutlined />}
                type="primary"
                ghost
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NavbarMenu;
