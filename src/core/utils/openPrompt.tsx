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
    root?.unmount()
    root = undefined
}

export const openModal: PageProviderProps['openPrompt'] = (Component: any) => {

    let element = getElement()

    return new Promise((res, rej) => {
        element?.render(
            React.Children.map(Component, child => React.cloneElement(child, {
                onCancel: (value: any) => {
                    console.log('cancel');

                    rej(false)
                    // ReactDOM.createRoot(element).unmount()
                    child.props?.onCancel?.(value)
                    unMount()
                },
                onOk: (value: any) => {
                    console.log('ok');

                    res(value)
                    // ReactDOM.createRoot(element).unmount()
                    child.props?.onOk?.(value)
                    unMount()

                }
            }))
        )
    })




}