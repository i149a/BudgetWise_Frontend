import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { getTransactions } from '../services/transaction'
import Calendar from './Calendar';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await getTransactions()
                setTransactions(data)
                setLoading(false)
            } catch (err) {
                setError('Failed to fetch transactions')
                setLoading(false)
            }
        }
        fetchTransactions()
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    // Calculate totals
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)

    const totalBalance = totalIncome - totalExpense

    // Get recent transactions
    const recentTransactions = transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)

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
                <Calendar transactions={transactions} />
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
    )
}

export default Dashboard