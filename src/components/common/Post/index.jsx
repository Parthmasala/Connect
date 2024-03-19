import React , {useState} from 'react'
import './index.scss'
import ModalComponent from '../Modal';
import { postStatus } from '../../../API/FirestoreAPI';


export default function PostStatus() {
    const [modalOpen, setModalOpen] = useState(false);
    const [status , setStatus] = useState('')
    const sendStatus = async () => {
        await postStatus(status);
        await setModalOpen(false);
        await setStatus('');
    }
  return (
    <div className='post-status-parent'>
        <div className='post-status'>
            <button className='create-post' onClick={() => setModalOpen(true)}> Create a Post</button>
        </div>
        <ModalComponent setStatus={setStatus} modalOpen={modalOpen} setModalOpen={setModalOpen} status={status} sendStatus={sendStatus}/>
    </div>
  );
}
 