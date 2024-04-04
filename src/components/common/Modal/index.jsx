import React , {useState} from 'react';
import {  Modal , Button} from 'antd';
import './index.scss';
const ModalComponent = ({
    modalOpen , 
    sendStatus,
    setModalOpen , 
    setStatus , 
    status,
    isEdit,
    updateStatus
}) => {
  return (
    <>
      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
        }}
        onCancel={() => {
            setStatus("");
            setModalOpen(false);
          }}
        footer={[
            //button will enable only when content is added
            <Button key="submit" onClick={isEdit ? updateStatus : sendStatus} type="primary" disabled ={status.length > 0 ? false : true}>
              {isEdit ? 'Update' : "Post"}
            </Button>,
          ]}
      >
        <input placeholder='What is in your mind?' className='modal-input'
        onChange={(e) => setStatus(e.target.value)}
        value={status}
        ></input>
      </Modal>
    </>
  );
};
export default ModalComponent;