import { ViewGridIcon, ViewListIcon } from "@heroicons/react/solid";
import { Badge, BadgeProps, Calendar, Modal, Tag } from "antd";
import { Moment } from "moment";
import { useState } from "react";
import DropdownAction from "src/components/DropdownAction";
import { ButtonIcon } from "src/components/style";

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

    return <>
        <div className="flex justify-end">
            <DropdownAction>
                <div className="flex gap-2 items-center hover:bg-gray-50 p-2 cursor-pointer">
                    <ViewListIcon className="w-5 h-5 text-gray-500" />
                    Lịch theo ngày
                </div>
                <div className="flex gap-2 items-center hover:bg-gray-50 p-2 cursor-pointer">
                    <ViewGridIcon className="w-5 h-5 text-gray-500" />
                    Calendar
                </div>
            </DropdownAction>
        </div>

        <Calendar
            dateCellRender={dateCellRender}
            monthCellRender={monthCellRender}
            fullscreen
            onSelect={(moment) => setDateSelect(moment)}
        />

        <Modal
            title={<span>Danh sách công việc {dateSelect && <Tag color="blue">{dateSelect.format('MMM d, YYYY')}</Tag>}</span>}
            visible={!!dateSelect}
            onCancel={() => setDateSelect(undefined)}
        >
            
        </Modal>
    </>
}   