import React from 'react'
import ReactDOM from 'react-dom/client'
export interface PageProviderProps {
    openPrompt: (component: JSX.Element) => Promise<any>
}


let element: any = null
let root: ReactDOM.Root | undefined

const getElement = () => {
    if (!element) {
        element = document.createElement('div')
        document.body.append(element)
    }
    root = ReactDOM.createRoot(element)
    return root
}

const unMount = () => {
    root?.unmount()
    root = undefined
}

export const openModal: PageProviderProps['openPrompt'] = (Component: any) => {

    let element = getElement()

    return new Promise((res, rej) => {
        element?.render(
            React.Children.map(Component, child => React.cloneElement(child, {
                onCancel: (cancel: any) => {
                    rej(cancel)
                    child.props?.onCancel?.(cancel)
                    unMount()
                },
                onOk: (value: any) => {
                    res(value)
                    child.props?.onOk?.(value)
                    unMount()
                }
            }))
        )
    })




}