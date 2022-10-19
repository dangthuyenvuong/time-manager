import { StarIcon, TagIcon } from "@heroicons/react/solid"
import { Link, ThreeDotAction } from "atoms"
import { BOOK_DETAIL_PATH } from "config/path"
import { generatePath } from "react-router-dom"
import styled from "styled-components"

export const CardCover = styled.div`
    margin: 20px;
    position: relative;
    img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
    }
    &:after{
    content: '';
    display: block;
    padding-bottom: 100%;
    width: 100%;
    }

    .star{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    color: red;
    }
    `

export const CardTitle = styled.div`
    padding: 0 20px 20px 20px;
    font-size: 20px;
    text-align: center;
    font-weight: 500;
    `

export const CardAction = styled.div`
    position: absolute;
    right: 0;
    z-index: 1;
    display: none;
    `


export const CardRoot = styled.div`
    border: 1px solid #ccc;
    border-radius: 3px;
    cursor: pointer;
    user-select: none;
    position: relative;

    &:hover {
    ${CardAction} {
        display: block;
    }
    }
    `

export const CardFooter = styled.div`

    `


export const Bookmark = styled.div<{ background?: string, position?: { left: string, top: string } }>`
    display: flex;
    align-items: center;
    border-radius: 100px;
    position: absolute;
    left: ${(props) => props?.position?.left || '0px'};
    top: ${(props) => props?.position?.top || '0px'};
    z-index: 1;
    font-weight: bold;

    width: fit-content;
    background: ${({ background }: any) => background || '#383d97de'};
    color: white;
    font-size: 13px;
    gap: 6px;
    padding: 3px 15px;
`

export const BookCard: Atom<{
    action?: JSX.Element
    book: any
    bookmark?: boolean
    star?: boolean
    path?: string
    vote?: number
}> = ({ action, book, vote, path = '' }) => {



    return (
        <CardRoot>
            {action && (
                <CardAction>
                    {action}
                </CardAction>
            )}
            <CardCover>
                {
                    book.bookmark && <Bookmark position={{ left: 'calc(100% - 66px)', top: '0' }}><TagIcon className='w-4 text-blue' /> {book.bookmark}</Bookmark>
                }
                {
                    book.star && <StarIcon className='w-4 text-yellow star' />
                }
                {
                    vote && <Bookmark className="flex items-center" position={{ left: 'calc(100% - 66px)', top: '0' }}><StarIcon className='w-4 text-yellow' /> {vote}</Bookmark>
                }
                <Link to={path}>
                    <img src={book.cover} />
                </Link>
            </CardCover>
            <Link to={path}>
                <CardTitle>{book.name}</CardTitle>
            </Link>
            <CardFooter></CardFooter>
        </CardRoot>
    )
}