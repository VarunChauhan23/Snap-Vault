import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const notify = (message, type) => {

  if (type === 'error') {
      toast.error(`${message}!`, {
          position: "top-center"
      });
  };

  if (type === 'success') {
      toast.success(`${message}!`, {
          position: "top-center"
      });
  };

}

export default notify;