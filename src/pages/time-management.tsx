import { ArrowNarrowRightIcon, ViewGridIcon, ViewListIcon, XIcon, ChartBarIcon } from "@heroicons/react/solid";
import { IconButton } from "@mui/material";
import { Button, Calendar, Form, Input, Modal, Popconfirm, Tag, TimePicker } from "antd";
import moment, { Moment } from "moment";
import { useState } from "react";
import DropdownAction from "src/components/DropdownAction";
import { ButtonIcon } from "src/components/style";
import TaskItem from "src/components/TaskItem";
import styled from "styled-components";


const TagStart = styled(Tag).attrs(props => ({
    color: 'blue'
}))`
    margin-right: 0;
`


const PopupConfirmCancelAddTask = styled(Popconfirm).attrs(props => ({
    title: "Bạn có chắc chắn muốn rời khỏi trước khi trước khi lưu hay không?",
    okText: 'Đồng ý hủy',
    showCancel: false
}))``


const getListData = (value: Moment) => {
    let listData;
    switch (value.date()) {
        case 8:
            listData = [
                { type: 'green', content: 'Ăn cơm' },
                { type: 'blue', content: 'Lên kế hoạch cho Reactjs' },
            ];
            break;
        case 10:
            listData = [
                { type: 'red', content: 'Lên kế hoạch cho Nodejs' },
                { type: 'blue', content: 'This is usual event.' },
                { type: 'red', content: 'This is error event.' },
            ];
            break;
        case 15:
            listData = [
                { type: 'green', content: 'This is warning event' },
                { type: 'blue', content: 'This is very long usual event。。....' },
                { type: 'red', content: 'This is error event 1.' },
                { type: 'red', content: 'This is error event 2.' },
                { type: 'red', content: 'This is error event 3.' },
                { type: 'red', content: 'This is error event 4.' },
            ];
            break;
        default:
    }
    return listData || [];
};

const getMonthData = (value: Moment) => {
    if (value.month() === 8) {
        return 1394;
    }
};

export default function TimeManagement() {
    const [dateSelect, setDateSelect] = useState<Moment>()
    const [isOpenAddTask, setIsOpenAddTask] = useState(false)
    const monthCellRender = (value: Moment) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Moment) => {
        const listData = getListData(value);
        return (
            <div className="flex gap-2 flex-col">
                {listData.map(item => (<Tag key={item.content} color={item.type}>{item.content}</Tag>))}
            </div>
        );
    };

    const _task = [
        {
            id: 1,
            start: moment(),
            end: moment(),
            title: 'Tập gym'
        },
        {
            id: 2,
            start: moment(),
            title: 'Di chuyển đến công ty'
        },
        {
            id: 3,
            title: 'Làm việc công ty'
        },
        {
            id: 4,
            end: moment(),
            title: 'Ăn ức gà'
        }
    ]

    return <>
        <div className="flex justify-end gap-2">
            <ButtonIcon type="text" size="large" icon={<ChartBarIcon className="w-5 h-5 text-gray-500" />}>
                Xem báo cáo
            </ButtonIcon>
            <ButtonIcon type="text" size="large" icon={<ViewListIcon className="w-5 h-5 text-gray-500" />}>
                Lịch theo ngày
            </ButtonIcon>
            <ButtonIcon type="text" size="large" icon={<ViewGridIcon className="w-5 h-5 text-gray-500" />}>
                Calendar
            </ButtonIcon>
        </div>

        <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            fullscreen
            onSelect={(moment) => setDateSelect(moment)}
        />

        <Modal
            title={<span>Danh sách công việc {dateSelect && <TagStart>{dateSelect.format('[Ngày] DD, [Tháng] MM, YYYY')}</TagStart>}</span>}
            visible={!!dateSelect}
            onCancel={() => setDateSelect(undefined)}
            width={768}
            footer={[
                <Button key="1" type="text" onClick={() => setDateSelect(undefined)}>Thoát ra</Button>,
                <Button key="2" type="primary" onClick={() => setIsOpenAddTask(true)}>Thêm công việc</Button>
            ]}
        >
            <div className="list-job flex flex-col gap-2">
                {
                    _task.map(e => <TaskItem key={e.id} task={e} onEdit={() => setIsOpenAddTask(true)} />)
                }
            </div>
        </Modal>
        <Modal
            visible={isOpenAddTask}
            title={<span>Thêm công việc cần làm {dateSelect && <TagStart>{dateSelect.format('[Ngày] DD, [Tháng] MM, YYYY')}</TagStart>}</span>}
            footer={[
                <PopupConfirmCancelAddTask key="1" placement="top" onConfirm={() => setIsOpenAddTask(false)}>
                    <Button type="text">Hủy</Button>
                </PopupConfirmCancelAddTask>,
                <Button key="2" type="primary" style={{ minWidth: 200 }}>Thêm</Button>
            ]}
            closeIcon={<PopupConfirmCancelAddTask placement="bottom" onConfirm={() => setIsOpenAddTask(false)}>
                <IconButton>
                    <XIcon className="w-5 h-5 text-gray-500" />
                </IconButton>
            </PopupConfirmCancelAddTask>}
        >
            <Form
                layout="vertical"
                onChange={() => console.log('aaaaaaaaaaa')}
            >
                <Form.Item label="Tên công việc">
                    <Input placeholder="Tên công việc" className="flex-1" />
                </Form.Item>
                <Form.Item label="Ghi chú">
                    <Input.TextArea rows={4} placeholder="Ghi chú cho công việc" />
                </Form.Item>
                <Form.Item label="Thời gian thực hiện">
                    <TimePicker.RangePicker
                        style={{ width: '100%' }}
                        placeholder={['Bắt đầu', 'Kết thúc']}
                        nextIcon={<ArrowNarrowRightIcon className="w-5 h-5 text-white" />}
                    />
                </Form.Item>

            </Form>
        </Modal>
    </>
}   