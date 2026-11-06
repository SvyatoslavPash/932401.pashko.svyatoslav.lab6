document.getElementById('convert-btn').addEventListener('click', async () => {
    const value = document.getElementById('temp-value').value;
    const from = document.getElementById('from-unit').value;
    const to = document.getElementById('to-unit').value;
    const resultDiv = document.getElementById('result');

    try {
        const response = await fetch(`/api/temp?value=${value}&from=${from}&to=${to}`);
        const data = await response.json();

        if (!response.ok) {
            resultDiv.textContent = `Ошибка: ${data.error}`;
            resultDiv.className = 'error';
        } else {
            resultDiv.textContent = `${data.value}°${data.from} = ${data.result}°${data.to}`;
            resultDiv.className = 'success';
        }
    } catch (error) {
        resultDiv.textContent = 'Ошибка соединения с сервером.';
    }
});