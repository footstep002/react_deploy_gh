import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        // try-catch-finally블록은 계속해서 컴포넌트가 실제로
        // 마운트 됐는지 체크하고, 만약에 그렇다면, 데이터를 요청한 후
        // 데이터 상태를 세팅하고, 에러를 null로 세팅한다.
        // 만약에 에러가 발생하면, 에러메시지 세팅하고, 데이터는
        // 빈 배열로 세팅한다.
        // 마지막으로 어느 경우든 아직 마운트 되어 있는지 확인하고
        // 그렇다면 isLoading를 false로 설정한다.
        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (error) {
                if (isMounted) {
                    setFetchError(error.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false);
            }
        };
        
        // 이제 실제로 그 액션을 훅을 통해 받을 주소와 함께 취한다.
        fetchData(dataUrl);

        // 결국엔 클린업 함수를 부른다.
        // 그리고 컴포넌트가 요청 도중에 언로드 된다면 요청을 
        // 취소한다.
        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl]);

    // 최종적으로는 데이터, (어쩌면 발생한) 에러, 로딩 상태를 반환한다.
    return { data, fetchError, isLoading };
}

export default useAxiosFetch;