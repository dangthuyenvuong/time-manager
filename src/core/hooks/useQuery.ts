import { storage } from "core/utils/storage";
import { useEffect } from "react";
import { useAllState } from "./useAllState";


export interface UseQueryOptions {
    name?: string
    time?: number
}


type State<T> = { data?: T; isFetching: boolean; error?: any };
/**
 *
 * @param promise
 * @param dependecyList
 * @param options
 * @returns
 */
export const useQuery = <T>(
    promise: () => Promise<T> | undefined | null,
    dependecyList: any[] = [],
    options: UseQueryOptions = {}
) => {

    const [state, setState] = useAllState<State<T>>({
        isFetching: true,
    });

    useEffect(() => {
        reFetch(false);
    }, dependecyList);

    /**
     * re call api
     * @param reFresh refresh cache when true (default true)
     */
    const reFetch = async (reFresh = true) => {
        try {
            setState({
                isFetching: true,
                error: undefined,
            });
            let res: any; // eslint-disable-line
            if (options.name) {
                let data: JSONObject = {};

                if (options.time) {
                    data.timestamp = new Date().getTime() + options.time * 1000;
                }

                const value = storage.get(options.name);

                if (typeof value === "object" && !reFresh) {
                    if (value.timestamp) {
                        if (value.timestamp >= new Date().getTime()) {
                            res = value.data;
                        } else {
                            res = await promise();
                            data.data = res;
                            storage.set(
                                options.name,
                                data as unknown as string
                            );
                        }
                    } else {
                        res = value;
                    }
                } else {
                    res = await promise();
                    data.data = res;

                    storage.set(options.name, data as unknown as string);
                }
            } else {
                res = await promise();
            }
            if (res instanceof Object) {

                setState({ data: res?.data || res });
            }
        } catch (err: any) {
            // if (err.error === "DATABASE:10000") {
            //     message.error("Data not found");
            // }
            setState({ error: err });
        } finally {
            setState({ isFetching: false });
        }
    };
    return {
        ...state,
        reFetch,
    };
};
