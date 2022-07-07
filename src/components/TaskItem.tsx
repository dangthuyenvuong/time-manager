import { PencilIcon, XIcon } from '@heroicons/react/solid'
import { IconButton } from '@mui/material'
import { Popconfirm, Tag } from 'antd'
import { Moment } from 'moment'
import styled from 'styled-components'
const TagStart = styled(Tag).attrs(props => ({
    color: 'blue'
}))`
    margin-right: 0;
`


const TagEnd = styled(Tag).attrs(props => ({
    color: 'red'
}))`
    margin-right: 0;
`

const TaskItemRoot = styled.div`
    .title{
        cursor: pointer;
    }
    .icon {
        opacity: 0;
        width: 22px;
        height: 22px;
        padding: 2px;
    }
    &:hover{
        .icon{
            opacity: 1;
        }
    }
`

export interface TaskItemProps {
    task: {
        start?: Moment
        end?: Moment
        title: string
    }
    onEdit?: () => void
    onDelete?: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
    const { start, end, title } = task
    return (
        <TaskItemRoot className="flex gap-2 items-center">
            {
                start && <TagStart>{start.format('HH:mm A')}</TagStart>
            }
            {start && end && '-'}
            {
                end && <TagEnd>{end.format('HH:mm A')}</TagEnd>
            }

            <span onClick={() => onEdit?.()} className="title">{title}</span>
            <IconButton className='icon' onClick={() => onEdit?.()}>
                <PencilIcon className="w-5 h-5 text-gray-500" />
            </IconButton>
            <Popconfirm title="Bạn có chắc chắn muốn xóa công việc này không?" okText="Xóa" cancelText="Không xóa" onConfirm={() => onDelete?.()}>
                <IconButton className='icon'>
                    <XIcon className="w-5 h-5 text-red-500" />
                </IconButton>
            </Popconfirm>
        </TaskItemRoot>
    )
}

export default TaskItem