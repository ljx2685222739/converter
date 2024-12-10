document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultDiv = document.getElementById('result');

    const LBS_TO_KG = 0.45359237;

    function convertValue(lbs) {
        if (lbs === '' || isNaN(lbs)) return;
        
        const kg = (parseFloat(lbs) * LBS_TO_KG).toFixed(10);
        toValue.value = kg;
        resultDiv.innerHTML = `Result: ${lbs} pound = ${kg} kilogram`;
        resultDiv.classList.add('show');
    }

    // 实时转换
    fromValue.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
        convertValue(this.value);
    });

    // 点击转换按钮
    convertBtn.addEventListener('click', function() {
        if (fromValue.value === '') {
            alert('Please enter a value to convert');
            return;
        }
        convertValue(fromValue.value);
    });

    // 清除功能
    clearBtn.addEventListener('click', function() {
        fromValue.value = '';
        toValue.value = '';
        resultDiv.innerHTML = '';
        resultDiv.classList.remove('show');
    });
});