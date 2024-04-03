import React , {useState, useMemo} from 'react'
import './index.scss'
import ModalComponent from '../Modal';
import PostsCard from '../PostsCard';
import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import { postStatus, getStatus, updatePost } from '../../../API/FirestoreAPI';
import { getUniqueID } from '../../../helpers/getUniqueID';

export default function PostStatus({currentUser}) {
    let userEmail = localStorage.getItem("userEmail");
    const [modalOpen, setModalOpen] = useState(false);
    const [status , setStatus] = useState('')
    const [allStatuses , setAllStatus] = useState([]);
    const [currentPost, setCurrentPost] = useState({});
    const [isEdit, setIsEdit] = useState(false);
    const sendStatus = async () => {
        let object = {
            status: status,
            timeStamp: getCurrentTimeStamp('LLL'),
            userEmail: currentUser.email,
            userName : currentUser.name,
            userID : currentUser.userid,
            postID : getUniqueID(), 

        }
        await postStatus(object);
        await setModalOpen(false);
        setIsEdit(false);
        await setStatus('');
    }

    const getEditData = (posts) =>{
      setModalOpen(true);
      setStatus(posts?.status);
      setCurrentPost(posts)
      setIsEdit(true);
    }

    const updateStatus = () =>{
      // console.log(status);
      updatePost(currentPost.id, status);
      setModalOpen(false);
    }

    useMemo(() => {
        getStatus(setAllStatus);
    } , []);


  return (
    <div className='post-status-parent'>
        <div className='post-status'>
            <button className='create-post' onClick={() => {
              setModalOpen(true);
              setIsEdit(false);
            }}> Create a Post</button>
        </div>
        <ModalComponent 
          setStatus={setStatus} 
          modalOpen={modalOpen} 
          setModalOpen={setModalOpen} 
          status={status} 
          sendStatus={sendStatus}
          isEdit={isEdit}
          updateStatus={updateStatus}
        />
    
    <div>
      {allStatuses.map((posts) =>{
          return (
            <div key = {posts.id}>
                <PostsCard posts = {posts} getEditData = {getEditData}/>
            </div>
          );
        })
        }
    </div>
      
    </div>
  );
}
 