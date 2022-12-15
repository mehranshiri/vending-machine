import React, { useEffect} from "react";
import {connect, useSelector} from 'react-redux'
import { actions } from "../../redux/actions/errorActions";

function ErrorModal(props) {

    const error = useSelector((state) => state.error);

    useEffect(() => {
        const interval = setInterval(() => {
          props.clear();
        }, 5000);
      
        return () => clearInterval(interval);
      }, [props])
    
    if(!error.show){
        return null;
    }
    return (
        <div className="error-dialogue">
            <div className="alert alert-danger" role="alert">
                {error.message}
            </div>
        </div>
    )
}

export default connect(null, actions)(ErrorModal)