document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const result = document.getElementById('result');

    function convertKmToMiles(km) {
        return km / 1.609344;
    }

    function formatNumber(number) {
        return Number(number.toFixed(6));
    }

    function decimalToFraction(decimal) {
        // 常用分母数组，按照从小到大排序
        const commonDenominators = [2, 4, 8, 16, 32, 64];
        
        // 找到最接近的分数
        let bestNumerator = 1;
        let bestDenominator = 1;
        let bestError = Math.abs(decimal - 1);
        
        for (let denominator of commonDenominators) {
            let numerator = Math.round(decimal * denominator);
            let error = Math.abs(decimal - numerator / denominator);
            
            if (error < bestError) {
                bestError = error;
                bestNumerator = numerator;
                bestDenominator = denominator;
            }
        }
        
        return `${bestNumerator}/${bestDenominator}`;
    }

    function updateResult(value) {
        if (!isNaN(value)) {
            const converted = convertKmToMiles(value);
            const formattedDecimal = formatNumber(converted);
            toValue.value = formattedDecimal;
            
            // 计算分数形式
            const fraction = decimalToFraction(converted);
            
            result.textContent = `${value} kilometers = ${formattedDecimal} miles
                                OR
                                ${fraction} mile`;
        } else {
            toValue.value = '';
            result.textContent = '';
        }
    }

    fromValue.addEventListener('input', function() {
        const value = parseFloat(this.value);
        updateResult(value);
    });

    convertBtn.addEventListener('click', function() {
        const value = parseFloat(fromValue.value);
        if (isNaN(value)) {
            result.textContent = 'Please enter a valid number';
            toValue.value = '';
            return;
        }
        updateResult(value);
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