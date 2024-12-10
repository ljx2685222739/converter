document.addEventListener('DOMContentLoaded', function() {
    const converterTypes = {
        length: {
            units: [
                'Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Micrometer',
                'Nanometer', 'Mile', 'Yard', 'Foot', 'Inch', 'Light Year'
            ]
        },
        temperature: {
            units: [
                'Celsius', 'Fahrenheit', 'Kelvin'
            ]
        },
        area: {
            units: [
                'Square Meter', 'Square Kilometer', 'Square Mile', 'Square Yard',
                'Square Foot', 'Square Inch', 'Hectare', 'Acre'
            ]
        },
        volume: {
            units: [
                'Cubic Meter', 'Cubic Centimeter', 'Liter', 'Milliliter',
                'Gallon', 'Quart', 'Pint', 'Cup'
            ]
        },
        weight: {
            units: [
                'Kilogram', 'Gram', 'Milligram', 'Metric Ton',
                'Pound', 'Ounce', 'Stone'
            ]
        },
        time: {
            units: [
                'Second', 'Minute', 'Hour', 'Day', 'Week',
                'Month', 'Year', 'Decade', 'Century'
            ]
        }
    };

    const tabs = document.querySelectorAll('.tab-btn');
    const fromUnitList = document.getElementById('fromUnitList');
    const toUnitList = document.getElementById('toUnitList');
    const fromValue = document.getElementById('fromValue');
    const toValue = document.getElementById('toValue');
    const resultText = document.getElementById('resultText');
    
    let currentType = 'length';
    let selectedFromUnit = '';
    let selectedToUnit = '';

    // 转换系数对象
    const conversionFactors = {
        length: {
            // 所有单位转换为米的系数
            'Meter': 1,
            'Kilometer': 1000,
            'Centimeter': 0.01,
            'Millimeter': 0.001,
            'Micrometer': 0.000001,
            'Nanometer': 0.000000001,
            'Mile': 1609.344,
            'Yard': 0.9144,
            'Foot': 0.3048,
            'Inch': 0.0254,
            'Light Year': 9.461e+15
        },
        temperature: {
            'Celsius': 'base',
            'Fahrenheit': 'special',
            'Kelvin': 'special'
        },
        area: {
            // 所有单位转换为平方米的系数
            'Square Meter': 1,
            'Square Kilometer': 1000000,
            'Square Mile': 2589988.11,
            'Square Yard': 0.836127,
            'Square Foot': 0.092903,
            'Square Inch': 0.00064516,
            'Hectare': 10000,
            'Acre': 4046.86
        },
        volume: {
            // 所有单位转换为立方米的系数
            'Cubic Meter': 1,
            'Cubic Centimeter': 0.000001,
            'Liter': 0.001,
            'Milliliter': 0.000001,
            'Gallon': 0.003785,
            'Quart': 0.000946,
            'Pint': 0.000473,
            'Cup': 0.000237
        },
        weight: {
            // 所有单位转换为千克的系数
            'Kilogram': 1,
            'Gram': 0.001,
            'Milligram': 0.000001,
            'Metric Ton': 1000,
            'Pound': 0.453592,
            'Ounce': 0.0283495,
            'Stone': 6.35029
        },
        time: {
            // 所有单位转换为秒的系数
            'Second': 1,
            'Minute': 60,
            'Hour': 3600,
            'Day': 86400,
            'Week': 604800,
            'Month': 2629746, // 平均月长
            'Year': 31556952, // 平均年长
            'Decade': 315569520,
            'Century': 3155695200
        }
    };

    function updateUnitLists(type) {
        const units = converterTypes[type].units;
        
        // 清空并重新填充单位列表
        fromUnitList.innerHTML = '';
        toUnitList.innerHTML = '';
        
        units.forEach(unit => {
            fromUnitList.innerHTML += `<div class="unit-item">${unit}</div>`;
            toUnitList.innerHTML += `<div class="unit-item">${unit}</div>`;
        });

        // 重新添加点击事件
        addUnitClickEvents();
    }

    function convert() {
        if (!selectedFromUnit || !selectedToUnit || !fromValue.value) {
            return;
        }

        const value = parseFloat(fromValue.value);
        if (isNaN(value)) {
            return;
        }

        let result;
        
        // 温度需要特殊处理
        if (currentType === 'temperature') {
            result = convertTemperature(value, selectedFromUnit, selectedToUnit);
        } else {
            // 其他单位使用比例转换
            const fromFactor = conversionFactors[currentType][selectedFromUnit];
            const toFactor = conversionFactors[currentType][selectedToUnit];
            result = (value * fromFactor) / toFactor;
        }

        toValue.value = result.toFixed(8);
        resultText.textContent = `${value} ${selectedFromUnit} = ${result.toFixed(8)} ${selectedToUnit}`;
    }

    function convertTemperature(value, from, to) {
        let celsius;
        
        // 先转换为摄氏度
        switch(from) {
            case 'Celsius':
                celsius = value;
                break;
            case 'Fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'Kelvin':
                celsius = value - 273.15;
                break;
        }

        // 从摄氏度转换为目标单位
        switch(to) {
            case 'Celsius':
                return celsius;
            case 'Fahrenheit':
                return (celsius * 9/5) + 32;
            case 'Kelvin':
                return celsius + 273.15;
        }
    }

    function addUnitClickEvents() {
        document.querySelectorAll('.unit-item').forEach(item => {
            item.addEventListener('click', function() {
                const parentList = this.parentElement;
                parentList.querySelectorAll('.unit-item').forEach(i => 
                    i.classList.remove('selected'));
                this.classList.add('selected');
                
                if (parentList.id === 'fromUnitList') {
                    selectedFromUnit = this.textContent;
                } else {
                    selectedToUnit = this.textContent;
                }
                
                convert();
            });
        });
    }

    // 监听输入值变化
    fromValue.addEventListener('input', convert);

    // 标签切换事件
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            currentType = this.dataset.type;
            selectedFromUnit = '';
            selectedToUnit = '';
            fromValue.value = '';
            toValue.value = '';
            resultText.textContent = 'Enter a value to convert';
            updateUnitLists(currentType);
        });
    });

    // 初始化显示长度转换
    updateUnitLists('length');
});