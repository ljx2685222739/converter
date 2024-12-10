document.addEventListener('DOMContentLoaded', function() {
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const resultText = document.getElementById('resultText');
    const fromUnitList = document.getElementById('fromUnitList');
    const toUnitList = document.getElementById('toUnitList');

    let selectedFromUnit = 'meter';
    let selectedToUnit = 'meter';

    // 单位转换系数（相对于米）
    const conversionFactors = {
        'meter': 1,
        'kilometer': 0.001,
        'decimeter': 10,
        'centimeter': 100,
        'millimeter': 1000,
        'micrometer': 1000000,
        'nanometer': 1000000000,
        'mile': 0.000621371,
        'yard': 1.09361,
        'foot': 3.28084,
        'inch': 39.3701
    };

    function updateResult() {
        const value = parseFloat(fromValue.value);
        if (!isNaN(value)) {
            // 先转换为米
            const meters = value / conversionFactors[selectedFromUnit];
            // 再从米转换为目标单位
            const result = meters * conversionFactors[selectedToUnit];
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