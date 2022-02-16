/*
process.nextTick() executa sua função no fim da operação atual
do event loop e antes do próximo operação/tick do event loop.
Útil para quado for garantir que garanta que um código seja
executado antes do próximo event loop, por exemplo para um if 
que necessite de um evento para prosseguir o código, pode se 
adicionar o process.nextTick() para garantir que o evento seja
executado antes das próximas operações/ticks do event loop.

Já o setImmediate() executa a função no inicio da próxima
operação/tick do event loop, é 
semelhante ao setTimeout() com 0ms, porém alguns fatores podem
priorizar ou um ou outro.
*/

import fs from 'fs';
import http from 'http';
    
const options = {
  host: 'www.stackoverflow.com',
  port: 80,
  path: '/index.html'
};

describe('deferredExecution', () => {
  it('deferredExecution', (done) => {
    console.log('Start');
    setTimeout(() => console.log('setTimeout 1'), 0);
    setImmediate(() => console.log('setImmediate 1'));
    process.nextTick(() => console.log('nextTick 1'));
    setImmediate(() => console.log('setImmediate 2'));
    process.nextTick(() => console.log('nextTick 2'));
    http.get(options, () => console.log('network IO'));
    fs.readdir(process.cwd(), () => console.log('file system IO 1'));
    setImmediate(() => console.log('setImmediate 3'));
    process.nextTick(() => console.log('nextTick 3'));
    setImmediate(() => console.log('setImmediate 4'));
    fs.readdir(process.cwd(), () => console.log('file system IO 2'));
    console.log('End');
    setTimeout(done, 1500);
  });
});
