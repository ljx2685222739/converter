document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const result = document.getElementById('result');

    function convertMilesToKm(miles) {
        return miles * 1.609344;
    }

    function formatNumber(number) {
        return Number(number.toFixed(6));
    }

    // 添加实时转换功能
    fromValue.addEventListener('input', function() {
        const value = parseFloat(this.value);
        if (!isNaN(value)) {
            const converted = convertMilesToKm(value);
            toValue.value = formatNumber(converted);
            result.textContent = `${value} miles = ${formatNumber(converted)} kilometers`;
        } else {
            toValue.value = '';
            result.textContent = '';
        }
    });

    // 保留转换按钮功能
    convertBtn.addEventListener('click', function() {
        const value = parseFloat(fromValue.value);
        if (isNaN(value)) {
            result.textContent = 'Please enter a valid number';
            toValue.value = '';
            return;
        }
        const converted = convertMilesToKm(value);
        toValue.value = formatNumber(converted);
        result.textContent = `${value} miles = ${formatNumber(converted)} kilometers`;
    });

    clearBtn.addEventListener('click', function() {
        fromValue.value = '';
        toValue.value = '';
        result.textContent = '';
    });

    fromValue.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertBtn.click();
        }
    });
});