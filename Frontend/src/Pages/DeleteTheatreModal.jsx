import { Modal, Button, message } from 'antd';
import { showLoading, hideLoading } from '../Redux/loaderSlice';
import { useDispatch } from 'react-redux';
import { deleteTheatre } from '../API/theatre';

const DeleteTheatreModal = ({ isDeleteModalOpen, selectedTheatre, setIsDeleteModalOpen, setSelectedTheatre, getData }) => {
 
  const dispatch = useDispatch();

  const onFinish = async () => {
    try {
      dispatch(showLoading());
      const response = await deleteTheatre(selectedTheatre);
      getData();
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message || "Failed to delete theatre.");
      }
      setIsDeleteModalOpen(false);
      setSelectedTheatre(null);
    } catch (err) {
      message.error(err.message);
    } finally {
      dispatch(hideLoading());
    }
  };
  
  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };

  return (
    
    <Modal
    centered
    open={isDeleteModalOpen}
    onCancel={handleCancel}
    width={800}
    footer={null}
    >
        <p>Are you sure you want to delete this Theatre?</p>
        <Button block type="primary" onClick={onFinish} style={{ fontSize: '1rem', fontWeight: '600' }}>
            Yes
        </Button>
        <Button className="mt-3" block onClick={handleCancel}>
            No
        </Button>
    </Modal>

  );
  
};

export default DeleteTheatreModal;