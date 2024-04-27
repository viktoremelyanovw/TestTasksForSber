import { encoded, translations } from './data.js';


console.log("Let's rock");
console.log(encoded, translations);

// Функция для декодирования данных
function decodeEntries(encoded, translations) {
  // Преобразуем каждый объект в массиве encoded
    return encoded.map(entry => {
    const decodedEntry = {};
    // Перебираем каждую пару ключ-значение в объекте
    Object.entries(entry).forEach(([key, value]) => {
      // Если ключ заканчивается на 'Id' и не находится в исключенном списке, пытаемся декодировать значение
    decodedEntry[key] = key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key)
                          ? translations[value] || value  // Используем translations, если он есть, иначе оставляем исходное значение
                          : value;  // Иначе просто копируем значение
    });
    return decodedEntry;  // Возвращаем декодированный объект
});
}

// Получаем декодированные данные и выводим их в консоль
const decoded = decodeEntries(encoded, translations);
console.log(decoded);

// Функция для получения уникальных ID из данных
function getUniqueIds(encoded) {
  const ids = new Set();  // Используем Set для хранения уникальных значений
encoded.forEach(entry => {
    Object.entries(entry).forEach(([key, value]) => {
      // Если ключ заканчивается на 'Id' и не находится в исключенном списке, добавляем значение в Set
    if (key.endsWith('Id') && !['groupId', 'service', 'formatSize', 'ca'].includes(key)) {
        ids.add(value);
}
    });
});
  return Array.from(ids);  // Преобразуем Set в массив и возвращаем его
}

// Получаем массив уникальных ID и выводим его в консоль
const uniqueIds = getUniqueIds(encoded);
console.log(uniqueIds);
