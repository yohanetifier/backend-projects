import  fs  from 'node:fs';

let dataInFile;

fs.readFile('./index.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return;
    }else {
        data = data 
        dataInFile = data.split('\n').join(' ')
        console.log(dataInFile)
    }
   
})

