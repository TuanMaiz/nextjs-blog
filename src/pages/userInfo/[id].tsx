import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Menu, Modal, Button, Input } from "antd";
import { EditOutlined, PlusCircleOutlined, EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { GetServerSideProps } from "next";
import { getDetailUser } from "../api/getDetailUser";
import { User } from "@/interfaces/user";
import ChangePasswordModal from "./components/ChangePasswordModal.tsx";
import ChangeUserInfo from "./components/ChangeUserInfo";

interface UserProps {
  userInfo: User;
}
type MenuItem = Required<MenuProps>["items"][number]; //"an array of required MenuItem objects"
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: React.ReactNode,
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}
export function Test(){
  return (
    <input type="text" />
  )
}
const items: MenuProps["items"] = [
  getItem("Edit your information", "edit-your-infomation", <EditOutlined />),
];
const UserInfo = ({userInfo}: UserProps) => {
  //from token -> decode -> get id of user (jwtdecode)
  //fetch user info
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onClick: MenuProps["onClick"] = (event) => {

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  return (
    <section className="mt-24 flex-container">
      <div className="w-1/3 flex flex-col justify-center items-center">
        <div className="flex flex-row items-end">
          <img className="w-32 h-32 rounded-[32rem]" src="" alt="" />
        </div>
        <p className="">{`${userInfo.firstName} ${userInfo.lastName}`}</p>
        <Menu
          onClick={onClick}
          style={{ width: 256 }}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          items={items}
          className="mt-4"
        />
      </div>
      <div className="User INfo w-2/3">
          <ChangeUserInfo userInfo={userInfo}/>
      </div>
      <div>
      </div>
    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await getDetailUser(params);
  console.log(response);
  return {
    props: { userInfo: response },
  };
};
export default UserInfo;
