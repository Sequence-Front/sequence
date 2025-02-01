import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
    const navigate = useNavigate();
    return (
        <FaArrowLeft onClick={() => navigate(-1)} style={{position: 'absolute', left: '100', cursor: 'pointer', color: '#E32929'}} />
    );
};
export default BackButton;