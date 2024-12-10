document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultDiv = document.getElementById('result');

    const KG_TO_LBS = 2.20462262185;

    function convertValue(kg) {
        if (kg === '' || isNaN(kg)) return;
        
        const lbs = (parseFloat(kg) * KG_TO_LBS).toFixed(10);
        toValue.value = lbs;
        resultDiv.innerHTML = `${kg} kilogram = ${lbs} pound`;
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