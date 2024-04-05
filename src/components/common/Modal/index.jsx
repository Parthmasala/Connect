import React, { useState } from "react";
import { Modal, Button, Progress } from "antd";
import { GrGallery } from "react-icons/gr";
import "./index.scss";

const ModalComponent = ({
  modalOpen,
  sendStatus,
  setModalOpen,
  setStatus,
  status,
  isEdit,
  updateStatus,
  uploadPostImage,
  postImage,
  setPostImage,
  currentPost,
  setCurrentPost,
}) => {
  const [progress, setProgress] = useState(0);

  return (
    <Modal
      title='Create a Post'
      centered
      visible={modalOpen}
      onOk={() => {
        setStatus("");
        setModalOpen(false);
        setPostImage("");
        setCurrentPost({});
      }}
      onCancel={() => {
        setStatus("");
        setModalOpen(false);
        setPostImage("");
        setCurrentPost({});
      }}
      footer={[
        <Button
          key='submit'
          onClick={isEdit ? updateStatus : sendStatus}
          type='primary'
          disabled={status.length === 0}
        >
          {isEdit ? "Update" : "Post"}
        </Button>,
      ]}
    >
      <div className='post-container'>
        <div className='textarea-container'>
          <textarea
            placeholder='What is on your mind?'
            className='modal-input'
            rows={4}
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          ></textarea>
          {(postImage || currentPost.postImage) && (
            <img
              src={postImage || currentPost.postImage}
              alt='postImage'
              className='preview-post-image'
            />
          )}
          {progress > 0 && progress < 100 && (
            <div className='progress-bar'>
              <Progress type='circle' percent={progress} />
            </div>
          )}
          <label htmlFor='upload-pic' className='upload-label'>
            <GrGallery size={30} className='upload-pic' />
          </label>
          <input
            id='upload-pic'
            type='file'
            hidden
            onChange={(event) =>
              uploadPostImage(event.target.files[0], setPostImage, setProgress)
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
