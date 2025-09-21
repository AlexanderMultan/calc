export class Calculator {
    constructor(displaySelector, buttonsSelector) {
        this.display = document.querySelector(displaySelector);
        this.buttonsContainer = document.querySelector(buttonsSelector);

        this.current = '';
        this.prev = '';
        this.operator = null;

        this.activeOperatorBtn = null;

        this._bindEvents();
    }

    _bindEvents() {
        this.buttonsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('button')) {
                this._handleInput(e.target.textContent.trim(), e.target);
            }
        });

        document.addEventListener('keydown', e => {
            const key = e.key;

            if ((key >= '0' && key <= '9') || key === '.') {
                this._handleInput(key);
                return;
            }

            if (['+', '-', '*', '/'].includes(key)) {
                const btn = this._findOperatorBtn(key);
                this._handleInput(key, btn);
                return;
            }

            if (key === 'Enter' || key === '=') {
                e.preventDefault();
                this._handleInput('=');
                return;
            }

            if (key === 'Escape') {
                this._handleInput('AC');
                return;
            }

            if (key === '%') {
                this._handleInput('%');
                return;
            }

            if (key === '_') {
                this._handleInput('+/-');
            }
        });
    }

    _findOperatorBtn(key) {
        let symbol = key;
        if (key === '*') symbol = '×';
        if (key === '/') symbol = '÷';
        if (key === '-') symbol = '−';
        // ищем кнопку с этим текстом
        return [...this.buttonsContainer.querySelectorAll('.operator')]
            .find(b => b.textContent.trim() === symbol);
    }

    _handleInput(val, btn = null) {
        switch (val) {
            case 'AC':
                this.current = '';
                this.prev = '';
                this.operator = null;
                this._clearOperatorHighlight();
                this._updateDisplay('0');
                break;
            case '+/-':
                if (this.current) {
                    this.current = String(-parseFloat(this.current));
                    this._updateDisplay(this.current);
                }
                break;
            case '%':
                if (this.current) {
                    this.current = String(parseFloat(this.current) / 100);
                    this._updateDisplay(this.current);
                }
                break;
            case '+':
            case '-':
            case '*':
            case '/':
            case '÷':
            case '×':
            case '−':
                if (this.current) {
                    if (this.prev && this.operator) this._calc();
                    else this.prev = this.current;
                }
                this.operator = this._mapOperator(val);
                this.current = '';
                this._highlightOperator(btn);
                break;
            case '=':
                if (this.operator && this.current) this._calc();
                this.operator = null;
                this._clearOperatorHighlight();
                break;
            default:
                if (val === '.' && this.current.includes('.')) return;
                this.current += val;
                this._updateDisplay(this.current);
        }
    }

    _highlightOperator(btn) {
        this._clearOperatorHighlight();
        if (btn) {
            btn.classList.add('active');
            this.activeOperatorBtn = btn;
        }
    }

    _clearOperatorHighlight() {
        if (this.activeOperatorBtn) {
            this.activeOperatorBtn.classList.remove('active');
            this.activeOperatorBtn = null;
        }
    }

    _mapOperator(symbol) {
        switch (symbol) {
            case '÷': return '/';
            case '×': return '*';
            case '−': return '-';
            default:  return symbol;
        }
    }

    _calc() {
        const a = parseFloat(this.prev);
        const b = parseFloat(this.current);
        let res;
        switch (this.operator) {
            case '+': res = a + b; break;
            case '-': res = a - b; break;
            case '*': res = a * b; break;
            case '/': res = b === 0 ? 'Ошибка' : a / b; break;
        }
        this.prev = String(res);
        this.current = '';
        this._updateDisplay(res);
    }

    _updateDisplay(val) {
        this.display.value = val;
    }
}
