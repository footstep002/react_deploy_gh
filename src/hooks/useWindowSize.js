import { useState, useEffect } from "react";

const useWindowSize = () => { // define the hook
    // set the state
    const [windowSize, setWindowSize] = useState({
        width: undefined, // width of browser
        height: undefined // height of browser
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ // track the value of
                // window size if this function is
                // called into action
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize();// called into action once at load time

        // above function should be called only once at load time,
        // but we add event listener so anytime resize event
        // fires we continue to this handleResize function
        window.addEventListener("resize", handleResize);

        // clean up function to prevent memory leak.
        const cleanUp = () => {
            window.removeEventListener("resize", handleResize);
        }

        return cleanUp;
        // 혹은 위와 같은 클린업 함수를 별도로 두지 않고 다음과
        // 같이 반환문에서 바로 처리할 수도 있다.
        // return () => window.removeEventListener("resize", handleResize);
        // 참고로 이는 useEffect의 반환문임을 잊지 말자.
        // 커스텀 훅 전체의 반환문은 아래에 따로 있다.
    }, []);

    return windowSize;
}

export default useWindowSize;