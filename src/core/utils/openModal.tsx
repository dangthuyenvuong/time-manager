import React from 'react'
import ReactDOM from 'react-dom/client'
export interface OpenModal {
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
    setTimeout(() => {
        root?.unmount()
        root = undefined
    }, 1000)
}

export const openModal: OpenModal['openPrompt'] = (Component: any) => {

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