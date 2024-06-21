import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastifyContainer = () => {
  return <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />;
};

export default ToastifyContainer;

export const notifySuccess = (message) => toast.success(message);
export const notifyError = (message) => toast.error(message);
