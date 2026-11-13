const express = require('express');
const app = express();
const port = 8888;
const path = require('path');



app.get('/', (req, res) => {
    console.log('path:', path.join(__dirname, 'index.html'));
    // res.send('Hello MyLoev');
    res.sendFile(path.join(__dirname,'webPage', 'index.html'));
});

app.get('/about',(req, res) => {
    // res.send('Hello Myme');jkkgg
    res.sendFile(path.join(__dirname,'webPage', 'about.html'));
});

app.listen(port, () => { //fdsffdffwfwhh
    console.log(`Server is running at http://localhost:${port}`);
});
f