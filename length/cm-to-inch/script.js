document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultDiv = document.getElementById('result');

    const CM_TO_INCH = 0.393701;

    function convertValue(cm) {
        if (cm === '' || isNaN(cm)) return;
        
        const inch = (parseFloat(cm) * CM_TO_INCH).toFixed(10);
        toValue.value = inch;
        resultDiv.innerHTML = `Result: ${cm} centimeter = ${inch} inch`;
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