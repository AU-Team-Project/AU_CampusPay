export const getFormattedDate = (): string => {
    const today = new Date();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    return `${today.getFullYear()}${(m.toString().padStart(2, '0'))}${(d.toString().padStart(2, '0'))}`;
}

// 월과 일을 가져오는 별도의 함수
export const getMonthAndDay = (): { month: number, day: number } => {
    const today = new Date();
    return {
        month: today.getMonth() + 1,
        day: today.getDate(),
    };
}