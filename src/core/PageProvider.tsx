import { uniqueId } from "@antv/util"
import omit from "lodash/omit"
import map from "lodash/map"
import React, { createContext, useContext, useState } from "react"

export interface PageProviderProps {
    openPrompt: (component: React.FC<{
        onCancel?(): void
        onOk?<T>(value: T): void
    }>, value?: any) => Promise<any>
}

const Context = createContext({} as PageProviderProps)

export const PageProvider: React.FC<{ children: any }> = ({ children }) => {
    const [com, setCom] = useState<any>({})

    const openPrompt: PageProviderProps['openPrompt'] = (Component, value) => {
        return new Promise<any>((res, rej) => {
            const name = uniqueId()
            setCom({
                ...com, [name]: <Component
                    onCancel={() => {
                        rej(false)
                        setTimeout(() => setCom(omit(com, name)), 500)
                    }}
                    onOk={(value) => {
                        res(value)
                        omit(com, name)
                        setTimeout(() => setCom(omit(com, name)), 500)
                    }}
                    {...value}
                />
            })
        })
    }
    return <Context.Provider value={{ openPrompt }}>{children} {map(com, (e, i) => <React.Fragment key={i}>{e}</React.Fragment>)}</Context.Provider>
}

export const usePage = () => useContext(Context)