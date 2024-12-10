document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const resultText = document.getElementById('resultText');
    const fromUnitList = document.getElementById('fromUnitList');
    const toUnitList = document.getElementById('toUnitList');

    let selectedFromUnit = 'kilogram';
    let selectedToUnit = 'kilogram';

    // 单位转换系数（相对于千克）
    const conversionFactors = {
        'kilogram': 1,
        'gram': 1000,
        'milligram': 1000000,
        'metric ton': 0.001,
        'pound': 2.20462,
        'ounce': 35.274,
        'stone': 0.157473,
        'US ton': 0.00110231,
        'UK ton': 0.000984207
    };

    function updateResult() {
        const value = parseFloat(fromValue.value);
        if (!isNaN(value)) {
            // 先转换为千克
            const kilograms = value / conversionFactors[selectedFromUnit];
            // 再从千克转换为目标单位
            const result = kilograms * conversionFactors[selectedToUnit];
            toValue.value = result.toFixed(8);
            resultText.textContent = `${value} ${selectedFromUnit} = ${result.toFixed(8)} ${selectedToUnit}`;
        }
    }

    // 为单位列表项添加点击事件
    fromUnitList.querySelectorAll('.unit-item').forEach(item => {
        item.addEventListener('click', function() {
            fromUnitList.querySelectorAll('.unit-item').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            selectedFromUnit = this.textContent.split('[')[0].trim().toLowerCase();
            updateResult();
        });
    });

    toUnitList.querySelectorAll('.unit-item').forEach(item => {
        item.addEventListener('click', function() {
            toUnitList.querySelectorAll('.unit-item').forEach(i => i.classList.remove('selected'));
            this.classList.add('selected');
            selectedToUnit = this.textContent.split('[')[0].trim().toLowerCase();
            updateResult();
        });
    });

    fromValue.addEventListener('input', updateResult);
});