import { usePromiseTracker } from 'react-promise-tracker';
import * as Loader from "react-loader-spinner";

function LoadingIndicator() {
    const { promiseInProgress } = usePromiseTracker();
    
    if (promiseInProgress) {
        return (
            <div
                style={{
                    width: "100%",
                    height: "100",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Loader.ThreeDots color="teal" height="100" width="100" />
            </div>
        );
    }
    return null;
}

export default LoadingIndicator;