import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ currentUser, transactions }) => {
    const userTransactions = transactions.filter(t => t.user === currentUser._id);
    const recentTransactions = [...userTransactions]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

    const totalIncome = userTransactions
        .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = userTransactions
        .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpense;

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
            "July", "August", "September", "October", "November", "December"];
    
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
        );
    };

    return (
        <div className="home-container">
            <div className="summary-cards">
                <div className="card balance">
                    <h3>Total Balance</h3>
                    <p>${totalBalance.toFixed(2)}</p>
                </div>
        
                <div className="card income">
                    <h3>Total Income</h3>
                    <p>${totalIncome.toFixed(2)}</p>
                </div>
        
                <div className="card expense">
                    <h3>Total Expense</h3>
                    <p>${totalExpense.toFixed(2)}</p>
                </div>
            </div>

            <div className="recent-transactions">
                <h2>Recent Transactions</h2>
                {recentTransactions.length > 0 ? (
                    <ul>
                        {recentTransactions.map(t => (
                            <li key={t._id} className={t.type}>
                                <span>{t.title}</span>
                                <span>${t.amount.toFixed(2)}</span>
                                <span>{new Date(t.date).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                        <p>No recent transactions</p>
                    )}
                <Link to="/transactions" className="view-all">View All Transactions</Link>
            </div>

            <div className="monthly-calendar">
                <h2>Monthly Calendar</h2>
                <Calendar transactions={userTransactions} />
                <div className="calendar-legend">
                    <div className="legend-item">
                        <div className="legend-dot income"></div>
                        <span>Income</span>
                    </div>
          
                    <div className="legend-item">
                        <div className="legend-dot expense"></div>
                        <span>Expense</span>
                    </div>
          
                    <div className="legend-item">
                        <div className="legend-dot both"></div>
                        <span>Both</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;