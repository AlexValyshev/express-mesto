const regex = /https?:\/\/[www]?[a-z0-9/.-]+#?/;
const ipList = 'http://ya.ru'; // https://www.ya.ru, http://2-domains.ru, http://ya.ru/path/to/deep/#, http://ya-ya-ya.ru';

console.log(regex.test(ipList));
