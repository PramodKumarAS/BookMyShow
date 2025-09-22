import { Modal, Button, message } from 'antd';
import { showLoading, hideLoading } from '../Redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { deleteMovie} from '../API/movies';

const DeleteMovieModal = ({ isDeleteModalOpen, selectedMovie, setIsDeleteModalOpen, setSelectedMovie, getData }) => {
  
  const dispatch = useDispatch();

  if (selectedMovie) {
    selectedMovie.releaseDate = new Date(selectedMovie.releaseDate).toISOString().split('T')[0]
  }

  const onFinish = async () => {
    try {
      dispatch(showLoading());
      let response = null;
      response = await deleteMovie(selectedMovie);
      getData();
      if (response.success) {
        message.success(response.message);
        setIsDeleteModalOpen(false);

      } 
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      message.error(err.message);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    
    <Modal
      centered
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      width={800}
      footer={null}
    >
        <p>Are you sure you want to delete this movie?</p>
        <Button block type="primary" onClick={onFinish} style={{ fontSize: '1rem', fontWeight: '600' }}>Yes</Button>        
        <Button className="mt-3" block onClick={handleCancel}>No</Button>
    </Modal>

  );

};

export default DeleteMovieModal;