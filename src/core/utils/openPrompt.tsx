import ReactDOM from 'react-dom/client'
import ReactDOM1 from 'react-dom'
import React from 'react'
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
    setTimeout(() => {
        root?.unmount()
        root = undefined
    }, 1000)
}

export const openModal: PageProviderProps['openPrompt'] = (Component: any) => {

    let element = getElement()

    return new Promise((res, rej) => {
        element?.render(
            React.Children.map(Component, child => React.cloneElement(child, {
                onCancel: (value: any) => {

                    rej(false)
                    // ReactDOM.createRoot(element).unmount()
                    child.props?.onCancel?.(value)
                    unMount()
                },
                onOk: (value: any) => {
                    res(value)
                    // ReactDOM.createRoot(element).unmount()
                    child.props?.onOk?.(value)
                    unMount()

                }
            }))
        )
    })




}