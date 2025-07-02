

const Calendar = ({ transactions }) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayTransactions = transactions.filter(t => t.date === dateStr);

        const hasIncome = dayTransactions.some(t => t.type === 'income');
        const hasExpense = dayTransactions.some(t => t.type === 'expense');

        let dotClass = '';
        if (hasIncome && hasExpense) {
            dotClass = 'both';
        } else if (hasIncome) {
            dotClass = 'income';
        } else if (hasExpense) {
            dotClass = 'expense';
        }

        days.push(
            <div key={`day-${day}`} className="calendar-day">
                <span>{day}</span>
                {dotClass && <div className={`calendar-dot ${dotClass}`}></div>}
            </div>
        );
    }

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"]

    return (
        <div className="calendar">
            <div className="calendar-header">
                <h3>{monthNames[currentMonth]} {currentYear}</h3>
            </div>

            <div className="calendar-weekdays">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="calendar-weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-days">
                {days}
            </div>
        </div>
    )
}

export default Calendar