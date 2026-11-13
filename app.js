const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('node:path');
const app = express();

// ตั้งค่า Template Engine และ Layouts
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

// กำหนดให้ใช้ไฟล์ views/layout.ejs เป็น Layout เริ่มต้น
app.set('layout', 'layout');
app.use(express.static(path.join(__dirname, 'public')));

const products = require('./data/products');
const networkCatalog = require('./data/network-products');

// Route สำหรับหน้าแรก
app.get('/', (req, res) => {
    // เรนเดอร์ไฟล์ views/index.ejs ไปแทรกใน layout
    res.render('index', { title: 'หน้าแรก' });
});

// Route สำหรับหน้าสินค้า
app.get('/product', (req, res) => {
    res.render('product', { title: 'สินค้า', products });
});

app.get('/showProduct', (req, res) => {
    const categories = networkCatalog.categories.map((category) => ({
        ...category,
        products: networkCatalog.products.filter((product) => product.categoryId === category.id),
    }));

    res.render('showProduct', {
        title: 'รายการอุปกรณ์เครือข่ายทั้งหมด',
        categories
    });
});

// Route สำหรับหน้า About
app.get('/about', (req, res) => {
    // เรนเดอร์ไฟล์ views/about.ejs ไปแทรกใน layout
    res.render('about', { title: 'เกี่ยวกับเรา' });
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});