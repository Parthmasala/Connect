import React , {useState} from 'react';
import {  Modal , Button} from 'antd';
import './index.scss';
const ModalComponent = ({
    modalOpen , 
    sendStatus,
    setModalOpen , 
    setStatus , 
    status
}) => {
  return (
    <>
      <Modal
        title="Create a Post"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
            //button will enable only when content is added
            <Button key="submit" onClick={sendStatus} type="primary" disabled ={status.length > 0 ? false : true}>
              Post
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