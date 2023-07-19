import './actionsIcons.css';
import { FaThumbsUp,FaThumbsDown } from "react-icons/fa";
import { Link } from "react-router-dom";


export default function Thumbs(props) {

    return (
        <div className="w-16  bg-transparent
                        flex flex-row text-white ">
          <ActionIcon component={Link} to="/coo" icon={<FaThumbsUp size="15" />} />
         <ActionIcon icon={<FaThumbsDown size="15" />} />
        
        </div>
      );
};
const ActionIcon = ({icon}) => (
    <div className="icon-action">
      {icon}
    </div>
  );