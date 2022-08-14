declare type User = {
    name: string
    avatar: string
}

declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U
declare type PrimitiveType = boolean | string | number | undefined | null
declare type JSONObject = Record<string | number, string | boolean | number | undefined | null | JSONObject>
type DefaultAtomArg = {
    className?: string
    id?: string
    style?: React.CSSProperties
    children?: any
}
declare type Atom<T1 = {}, T2 = DefaultAtomArg, T3 = {}> = React.FC<Overwrite3<T1, T2 extends HTMLElement ? React.HTMLAttributes<T2> : T2, T3 extends HTMLElement ? React.HTMLAttributes<T3> : T3>>

declare type AtomArg<T1 = {}, T2 = DefaultAtomArg, T3 = {}> = Overwrite3<T1, T2 extends HTMLElement ? React.HTMLAttributes<T2> : T2, T3 extends HTMLElement ? React.HTMLAttributes<T3> : T3>


declare type HttpResponse<T = undefined> = {
    data?: T
    message?: string
    error?: string
    statusCode?: number
    detail?: {
        property: string
        message: [string]
    }[]
}
