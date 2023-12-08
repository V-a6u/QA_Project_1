import './Error.css';
import {Link} from "react-router-dom";

export default function Error(){
    return(
        <Link to={"/"}>
            <div class={"error-image"}></div>
        </Link>
    )
}