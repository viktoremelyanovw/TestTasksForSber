<script>
    import { onMount } from 'svelte';  // Импортируем хук onMount из фреймворка Svelte для выполнения кода после монтирования компонента.

    let rates = {};  // Объявляем переменную для хранения курсов валют.
    let amount1 = 1;  // Инициализируем первую сумму для конвертации, начальное значение установлено равным 1.
    let amount2 = "";  // Инициализируем вторую сумму для конвертации, начальное значение оставляем пустым, чтобы в поле ввода отобразился курс, взятый из API.
    let currency1 = 'USD';  // Переменная для хранения текущей первой валюты, установлена по умолчанию в 'USD'.
    let currency2 = 'RUB';  // Переменная для хранения текущей второй валюты, установлена по умолчанию в 'RUB'.
    const apiKey = '0a8e5611aa52735e2f0aa945';  // Константа для хранения ключа API.

    async function fetchRates(base) {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);  // Отправляем асинхронный запрос к API для получения курсов валют, базируясь на первой валюте.
        const data = await response.json();  // Преобразуем ответ от API в формат JSON.
        rates = data.conversion_rates;  // Сохраняем курсы валют из ответа в переменную rates.
        convert();  // Вызываем функцию convert для пересчета значения второй валюты на основе новых курсов.
    }

    function convert() {
        if (currency1 === currency2) {
            amount2 = amount1;  // Если валюты совпадают, просто копируем значение суммы.
        } else {
            const rate = rates[currency2];  // Получаем курс для конвертации во вторую валюту.
            amount2 = (amount1 * rate).toFixed(2);  // Выполняем конвертацию и округляем результат до двух знаков после запятой.
        }
    }

    function handleAmount1Change(newAmount) {
        amount1 = newAmount;  // Обновляем значение первой суммы.
        convert();  // Вызываем функцию convert для пересчета второй суммы.
    }

    function handleAmount2Change(newAmount) {
        amount2 = newAmount;  // Обновляем значение второй суммы.
        const reverseRate = 1 / rates[currency2];  // Вычисляем обратный курс конвертации.
        amount1 = (amount2 * reverseRate).toFixed(2);  // Выполняем обратную конвертацию и округляем результат.
    }

    onMount(() => {
        fetchRates(currency1);  // При монтировании компонента выполняем загрузку курсов валют с базовой валютой 'USD'.
    });
</script>

<div>
    <h1>Конвертация валюты</h1>

    <div class="currency-group">
        <label for="currency1">Первая валюта:</label>  
        <select id="currency1" bind:value={currency1} on:change="{() => fetchRates(currency1)}">
            <!-- Выпадающий список для выбора первой валюты. При изменении значения автоматически вызывается функция для загрузки актуальных курсов. -->
            <option value="USD">USD</option>  <!-- Варианты выбора валюты: USD, EUR, RUB, GBP. -->
            <option value="EUR">EUR</option>
            <option value="RUB">RUB</option>
            <option value="GBP">GBP</option>
        </select>
        <input type="number" bind:value={amount1} on:input="{e => handleAmount1Change(e.target.value)}">
        <!-- Поле для ввода суммы в выбранной первой валюте. Реактивно обрабатывает изменения и пересчитывает сумму во второй валюте. -->
    </div>
    
    <div class="currency-group">
        <label for="currency2">Вторая валюта:</label>  <!-- Метка для второго выпадающего списка, указывает, что это поле для выбора второй валюты. -->
        <select id="currency2" bind:value={currency2} on:change="{convert}">
            <!-- Выпадающий список для выбора второй валюты. При изменении значения вызывается функция пересчета без перезагрузки курсов. -->
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="RUB">RUB</option>
            <option value="GBP">GBP</option>
        </select>
        <input type="number" bind:value={amount2} on:input="{e => handleAmount2Change(e.target.value)}">
        <!-- Поле для ввода суммы в выбранной второй валюте. Реактивно обрабатывает изменения и пересчитывает сумму в первой валюте. -->
    </div>
</div>



<style>
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        background-color: #ffffff;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        max-width: 600px;
        margin: 20px auto;
    }

    .currency-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
    }

    input, select {
        width: 45%; /* Уменьшено до 45%, чтобы уместить в одной строке */
        padding: 12px 20px;
        margin: 0 20px; /* Изменено расстояние между элементами */
        border: 1px solid #d0d0d0;
        border-radius: 8px;
        font-size: 16px;
        font-family: 'Arial', sans-serif;
        transition: border-color 0.3s;
    }

    input:focus, select:focus {
        border-color: #0056b3;
    }

    select {
        cursor: pointer;
    }

    label {
        font-size: 14px;
        color: #333;
        margin-right: 10px;
    }

    h1 {
        margin-bottom: 20px;
    }
</style>
