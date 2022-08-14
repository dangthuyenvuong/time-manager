import { useContext, createContext, useMemo } from "react";

const Context = createContext({})

export const Provider: Atom<{
    [k: string]: any
    action?: { [k: string]: Function }
}> = ({ children, ...props }) => {

    const context = useProvider()

    const _value = useMemo(() => {
        const res: any = {
            ...context,
            ...props,
            action: {}
        }

        if (context) {
            if (context.action) {
                res.action = context.action
            }
        }

        if (props) {
            if (props.action) {
                res.action = {
                    ...res.action,
                    ...props.action
                }
            }
        }
        return res

    }, [context, props])

    return <Context.Provider value={{ ..._value }}>{children}</Context.Provider>
}

export const useProvider = <T extends any = any>(selector?: (store: any) => T): T => { // eslint-disable-line
    const value = useContext(Context)
    if (selector) return selector(value)
    return value as T
}
