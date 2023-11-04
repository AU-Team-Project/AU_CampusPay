import React from 'react';

/* TODO - date 객체 string -> date 로 변경예정 */
type Props = {
    menu: string;
    date: string;
    state: string;
}

const HistoryItem = ({menu, date, state}: Props) => {
    const statusText = state === '취소' ? '결제 취소' : '결제 완료';

    return (
        <div className="bg-gray-200 p-4 rounded-md shadow-md space-y-2">
            <div className="flex justify-between items-center">
                <div className="text-gray-800 font-medium">
                    <span className={statusText === '결제 취소' ? `text-red-500` : `text-green-500`}>
                        [{statusText}]&nbsp;
                    </span>
                    <span>{menu}</span>
                </div>
                <div className="bg-gray-300 px-2 py-1 rounded-full text-sm">
                    {date}
                </div>
            </div>
        </div>
    );
};

export default HistoryItem;