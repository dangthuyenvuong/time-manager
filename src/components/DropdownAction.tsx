import { DotsVerticalIcon } from "@heroicons/react/solid"
import { IconButton } from "@mui/material"
import { Dropdown } from "antd"
import { useState } from "react"
import { fadeIn } from "react-animations"
import styled, { keyframes } from "styled-components"

export interface DropdownActionProps {
    children: JSX.Element | JSX.Element[]
    trigger?: ('click' | 'hover' | 'contextMenu')[]
}



const fadeInAnimation = keyframes`${fadeIn}`


const Overlay = styled.div`
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%), 0 9px 28px 8px rgb(0 0 0 / 5%);
    animation: .3s ${fadeInAnimation}
}
`

const DropdownAction: React.FC<DropdownActionProps> = ({ trigger = ['click'], children }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dropdown
            overlay={<Overlay className="flex flex-col bg-white">
                {children}
            </Overlay>}
            visible={isOpen}
            trigger={trigger}
            onVisibleChange={open => setIsOpen(open)}
        >
            <IconButton onClick={() => setIsOpen(true)}>
                <DotsVerticalIcon className="w-5 h-5 text-gray-500" />
            </IconButton>
        </Dropdown>
    )
}

export default DropdownAction