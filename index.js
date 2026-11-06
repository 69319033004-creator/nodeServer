const express = require('express');
const app = express();
const port = 8888;

app.get('/', (req, res) => {
    res.send('Hello MyLoev');
});

app.get('/about',(req, res) => {
    res.send('Hello Myme');
});

app.listen(port, () => { //fdsffdf
    console.log(`Server is running at http://localhost:${port}`);
});
