import React from 'react';

/* TODO - date 객체 string -> date 로 변경예정 */
type Props = {
    menu: string;
    date: string;
    status: string;
}

const HistoryItem = ({menu, date, status}: Props) => {
    console.log(status)
    return (
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
                <div className="text-gray-800 font-medium">식권 종류: {menu}</div>
                <div className="text-gray-600">결제 일자: {date}</div>
            </div>
            <div className={`font-bold ${status === '완료' ? 'text-green-500' : 'text-red-500'}`}>
                {status}
            </div>
        </div>
    );
};

export default HistoryItem;