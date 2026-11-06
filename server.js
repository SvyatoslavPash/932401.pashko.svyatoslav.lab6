const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/api/temp', (req, res) => {
    const { value, from, to } = req.query;

    if (value === undefined || from === undefined || to === undefined) {
        return res.status(400).json({ error: 'Необходимо указать value, from и to' });
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
        return res.status(400).json({ error: 'Параметр value должен быть числом' });
    }

    const fromUnit = from.toUpperCase();
    const toUnit = to.toUpperCase();
    const allowedUnits = ['C', 'F', 'K'];

    if (!allowedUnits.includes(fromUnit) || !allowedUnits.includes(toUnit)) {
        return res.status(400).json({ error: 'Допустимые единицы: C, F, K' });
    }

    let celsius = numValue;
    if (fromUnit === 'F') {
        celsius = (numValue - 32) * 5 / 9;
    } else if (fromUnit === 'K') {
        celsius = numValue - 273.15;
    }

    let result = celsius;
    if (toUnit === 'F') {
        result = (celsius * 9 / 5) + 32;
    } else if (toUnit === 'K') {
        result = celsius + 273.15;
    }

    result = Math.round(result * 100) / 100;

    res.json({
        value: numValue,
        from: fromUnit,
        to: toUnit,
        result: result
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});