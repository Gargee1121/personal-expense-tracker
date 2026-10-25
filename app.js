/**
 * Personal Expense Tracker - Core Architecture Engine
 * Pure Vanilla JavaScript using ES6 features, clean DOM bindings, and state persistence.
 */

// --- Global Application State ---
let state = {
    transactions: [],
    currentFilter: 'all'
};

// --- DOM Cache Selectors ---
const balanceEl = document.getElementById('total-balance');
const incomeEl = document.getElementById('summary-income');
const expenseEl = document.getElementById('summary-expense');
const formEl = document.getElementById('transaction-form');
const descInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionListEl = document.getElementById('transaction-list');
const emptyStateEl = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.filter-btn');

// --- Helper Functions & Utilities ---
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// --- Storage Engine Layers ---
const saveToLocalStorage = () => {
    localStorage.setItem('tracker_transactions', JSON.stringify(state.transactions));
};

const loadFromLocalStorage = () => {
    const stored = localStorage.getItem('tracker_transactions');
    state.transactions = stored ? JSON.parse(stored) : [];
};

// --- Business Calculation Logic ---
const updateFinancialCalculations = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    state.transactions.forEach(t => {
        if (t.type === 'income') totalIncome += t.amount;
        if (t.type === 'expense') totalExpense += t.amount;
    });

    const netBalance = totalIncome - totalExpense;

    // UI Updates
    balanceEl.textContent = formatCurrency(netBalance);
    incomeEl.textContent = `+${formatCurrency(totalIncome)}`;
    expenseEl.textContent = `-${formatCurrency(totalExpense)}`;

    // Optional: Visual indicator if balance goes negative
    if (netBalance < 0) {
        balanceEl.style.color = 'var(--danger)';
    } else {
        balanceEl.style.color = 'var(--text-main)';
    }
};

// --- DOM Renderer Engine ---
const renderTransactions = () => {
    // Filter logic pipeline
    const filteredTransactions = state.transactions.filter(t => {
        if (state.currentFilter === 'income') return t.type === 'income';
        if (state.currentFilter === 'expense') return t.type === 'expense';
        return true; // 'all' filter fallback
    });

    // Toggle Empty State Template UI
    if (filteredTransactions.length === 0) {
        transactionListEl.innerHTML = '';
        emptyStateEl.style.display = 'block';
        return;
    }
    emptyStateEl.style.display = 'none';

    // Build modern fragments cleanly to prevent XSS issues
    transactionListEl.innerHTML = filteredTransactions.map(t => `
        <li class="transaction-item ${t.type}" data-id="${t.id}">
            <div class="item-info">
                <span class="item-desc">${t.description}</span>
                <span class="item-date">${formatDate(t.date)}</span>
            </div>
            <div class="item-value-wrapper">
                <span class="item-amount ${t.type}">
                    ${t.type === 'income' ? '+' : '-'}${formatCurrency(t.amount)}
                </span>
                <button class="btn-delete" aria-label="Delete item" onclick="deleteTransaction('${t.id}')">
                    &times;
                </button>
            </div>
        </li>
    `).join('');
};

// --- Event Actions & Interface Controls ---
const addTransaction = (e) => {
    e.preventDefault();

    const descValue = descInput.value.trim();
    const amountValue = parseFloat(amountInput.value);
    const typeValue = typeInput.value;

    let isFormValid = true;

    // Direct input form validations
    if (!descValue) {
        descInput.parentElement.classList.add('invalid');
        isFormValid = false;
    } else {
        descInput.parentElement.classList.remove('invalid');
    }

    if (isNaN(amountValue) || amountValue <= 0) {
        amountInput.parentElement.classList.add('invalid');
        isFormValid = false;
    } else {
        amountInput.parentElement.classList.remove('invalid');
    }

    if (!isFormValid) return; // Halt script execution block

    // Create a new data object model schema
    const newTransaction = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        description: descValue,
        amount: amountValue,
        type: typeValue,
        date: new Date().toISOString()
    };

    state.transactions.unshift(newTransaction); // Push directly to the top

    // State Persistence syncs
    saveToLocalStorage();
    updateFinancialCalculations();
    renderTransactions();

    formEl.reset(); // Clear user entry inputs safely
};

// Global scoped function window bindings to handle direct internal inline DOM trigger deletes
window.deleteTransaction = (id) => {
    state.transactions = state.transactions.filter(t => t.id !== id);
    saveToLocalStorage();
    updateFinancialCalculations();
    renderTransactions();
};

// Filter event selectors orchestration configuration setup
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        state.currentFilter = e.target.getAttribute('data-filter');
        renderTransactions();
    });
});

// Form submission pipeline connection listeners binding
formEl.addEventListener('submit', addTransaction);

// --- Master Runtime Lifecycle Initialize Bootstrap Entry ---
const init = () => {
    loadFromLocalStorage();
    updateFinancialCalculations();
    renderTransactions();
};

document.addEventListener('DOMContentLoaded', init);
