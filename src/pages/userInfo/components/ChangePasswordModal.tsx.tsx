import { Menu, Modal, Button, Input } from "antd";
import { useState } from "react";

const ChangePasswordModal = (isModalOpen: boolean, handleCancel: any) => {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const handleOk = () => {
    // setIsModalOpen(false);
  };


    return (
        <Modal
          title="Change your password"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <button key="back" onClick={handleCancel} className="secondary-btn mr-2 py-1">
              Cancel
            </button>,
            <button key="submit" onClick={handleOk} className="primary-btn px-4 py-2">
              Change your password
            </button>
          ]}
        >
        <Input.Password
          placeholder="Your old password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          autoComplete="off"
        />
        <Input.Password
          placeholder="Your new password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          autoComplete="off"
          className="mt-4"
        />
        <Input.Password
          placeholder="Confirm your new password"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          autoComplete="off"
          className="mt-4"
        />
        </Modal>
    );
}


export default ChangePasswordModal;