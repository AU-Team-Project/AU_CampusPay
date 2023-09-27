import React from 'react';

/* TODO - date 객체 string -> date 로 변경예정 */
type Props = {
    menu: string;
    date: string;
    status: string;
}

const HistoryItem = ({menu, date, status}: Props) => {
    const statusText = status === '취소' ? '결제 취소' : '결제 완료';
    return (
        <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-col justify-start items-center space-x-4">
                <div className="text-gray-800 font-medium">
                    <span className={statusText === '결제 취소' ? `text-red-500` : `text-green-500`}>
                        [{status}]
                    </span>
                    <span>{menu}</span>
                </div>
                <div className="text-gray-600">결제 일자: {date}</div>
            </div>
        </div>
    );
};

export default HistoryItem;