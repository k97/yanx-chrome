import { date, quoteObjKey, cachedQKey,  SetContent } from './config';
import { quoteDump } from './quote-dump';

const loadQuoteSource = () => {
    console.log('Calling Dump...')
    const quote = quoteDump[date.getDay() % quoteDump.length]
    const cacheSetter = quoteObjKey + ' - ' + date.toDateString();
    setQuoteContent(quote);
    localStorage.setItem(cachedQKey, JSON.stringify(cacheSetter));
}

const getLocalQuote = () => {
    let cachedQuoteObj = localStorage.getItem(quoteObjKey);
    if (cachedQuoteObj) {
        let quoteObj = JSON.parse(cachedQuoteObj);
        setQuoteContent(quoteObj);
    } else {
        console.log('Init subsequent time quote call');
        loadQuoteSource();
    }
}

const setQuoteContent = (obj) => {
    localStorage.setItem(quoteObjKey, JSON.stringify(obj));
    SetContent('yx-quote-text', obj.quote);
    SetContent('yx-quote-author', obj.author);
    document.getElementById('yx-quote-author').href = 'https://google.com/search?q=' + obj.author + '+quotes';
}

export const initQuote = () => {
    const cacheKeyVal = localStorage.getItem(cachedQKey);
    const savedDate = cacheKeyVal ? JSON.parse(cacheKeyVal).split(' - ') : null;

    // A new quote everyday :)
    if (savedDate && savedDate[1] == date.toDateString()) {
        getLocalQuote();
    } else {
        localStorage.removeItem(cacheKeyVal);
        loadQuoteSource();
    }
}
