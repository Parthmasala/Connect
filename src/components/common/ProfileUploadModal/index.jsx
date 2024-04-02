import React from "react";
import { Button, Modal, Progress} from "antd";
import "./index.scss";

export default function ProfileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  return (
    <Modal
      title="Add a Profile Image"
      centered
      visible={modalOpen}
      onOk={() => setModalOpen(false)}
      onCancel={() => setModalOpen(false)}
      footer={[
        <Button
          disabled={!currentImage.name}
          key="submit"
          type="primary"
          onClick={uploadImage}
        >
          Upload Profile Picture
        </Button>,
      ]}
    >
      <div className="image-upload-main">
        <p>{currentImage.name}</p>
        <label className="upload-btn" htmlFor="image-upload">
          Add an Image
        </label>
        {(progress != 0) && (
          <div className="progress-bar">
            <Progress type="circle" percent={progress} />
          </div>
        )}
        <input hidden id="image-upload" type="file" onChange={getImage} />
      </div>
    </Modal>
  );
}
