
let products = JSON.parse(localStorage.getItem("products")) ?? [];
if (products.length == 0)
{
    let defaultData = [
        {
            'name': 'Gà chiên giòn',
            'price': 50000,
            'quantity': 100,
            'type': '2',
            'description': '1 Phần Gà Chiên Giòn',
            'img': 'asset/img/chicken.jpg'
        },
        {
            'name': 'Combo Lẻ 1',
            'price': 50000,
            'quantity': 100,
            'type': '0',
            'description': '1 Burger + 1 Khoai Tây Chiên',
            'img': 'asset/img/burgerFries.jpg'
        },
        {
            'name': 'Coca Cola',
            'price': 20000,
            'quantity': 100,
            'type': '3',
            'description': '1 Lon Coca Cola',
            'img': 'asset/img/coca.jpg'
        },
        {
            'name': 'Burger Tôm',
            'price': 50000,
            'quantity': 100,
            'type': '2',
            'description': '1 Phần Burger Tôm',
            'img': 'asset/img/shrimpBurger.jpg'
        },
        {
            'name': 'Nước Ép Cam',
            'price': 30000,
            'quantity': 100,
            'type': '3',
            'description': '1 Ly Nước Ép Cam',
            'img': 'asset/img/orangeJuice.jpg'
        },
        {
            'name': 'Soda Chanh',
            'price': 30000,
            'quantity': 100,
            'type': '3',
            'description': '1 Ly Soda Chanh',
            'img': 'asset/img/lemonSoda.jpg'
        },
        {
            'name': 'Khoai Tây Chiên',
            'price': 50000,
            'quantity': 100,
            'type': '2',
            'description': '1 Phần Khoai Tây Chiên',
            'img': 'asset/img/fries.jpg'
        },
        {
            'name': 'Combo Nhóm 1',
            'price': 80000,
            'quantity': 100,
            'type': '1',
            'description': '1 Burger + 1 Coca + 1 Khoai Tây Chiên',
            'img': 'asset/img/burgerFriesDrink.webp'
        },
        {
            'name': 'Combo Nhóm 2',
            'price': 80000,
            'quantity': 100,
            'type': '1',
            'description': '1 Burger + 2 Pepsi + 3 Miếng Gà',
            'img': 'asset/img/comboNhom1.jpg'
        }
    ];
    products = defaultData;
    localStorage.setItem("products", JSON.stringify(defaultData));
}

const numberOfProductInPage = 8;

let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];


let htmlProducts = [...products];

//render menu
taomenu();

function taomenu() {
    var obj = document.querySelector("#menu_page");
    obj.innerHTML = `
                  <div id="wrapper">
                      <div id="nav">
                          <div id="nav-container">
                              <ul>
                                  
                              </ul>
                          </div>
                      </div>

                      <div id="menu-content"> 
                          <div id="content-container">
                        
                          
                          
                          </div>

                          <div id="pageNumbers">
                              <div id="container">
                              </div>
                          </div>
                      </div>
                  </div>`
    let typeList = ['Combo 1 người', 'Combo nhóm', 'Thức ăn', 'Thức uống']
    var finalData = '';
    for (let i = 0; i < typeList.length; i++) {
        finalData += `<li class="nav-item" type-product="${i}" onclick="renderProductType(${i})">${typeList[i]}</li>`
    }
    var nav = document.querySelector("#nav-container ul");
    nav.innerHTML = finalData;
    renderProducts();
}

// ============================================================================================================================================


function renderProductType(typeID) {

    htmlProducts = [];
    for (let product of products) {
        if (typeID == product.type)
            htmlProducts.push(product);
    }
    renderProducts();
    // renderProductsInPage(0);
}

//render html product

function renderProducts() {
    //render page numbers
    let pageTotal = Math.ceil(htmlProducts.length / numberOfProductInPage);

    let pageNumberData = '';
    if (pageTotal < 2) {
        pageNumberData += `<div class="page-number" index="${1}" onclick="renderProductsInPage(${0})">${'1'}</div>`
    }
    else {
        for (let i = 1; i <= pageTotal; i++) {
            pageNumberData += `<div class="page-number" index="${i}" onclick="renderProductsInPage(${i - 1})">${i.toString()}</div>`
        }
    }
    document.querySelector("#pageNumbers #container").innerHTML = pageNumberData;
    renderProductsInPage(0);
}

function renderProductsInPage(index = 0) {
    var startIndex = index * numberOfProductInPage;
    var endIndex = startIndex + numberOfProductInPage - 1;
    var finalData = '';
    for (let i = startIndex; i <= endIndex && i < htmlProducts.length; i++) {
        finalData += ` <div class="product" index="${i}">
                                <div class="product-img">
                                    <img src=${htmlProducts[i].img} alt="">
                                </div>

                                <div class="product-desc">
                                    <div class="product-name">
                                        <h2>${htmlProducts[i].name}</h2>
                                    </div>
                                    
                                    <div class="product-price">
                                        <h3>${htmlProducts[i].price}</h3>
                                    </div>

                                    <button class="addToCart">
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>`
    }
    document.querySelector("#content-container").innerHTML = finalData;

    // buy
    const buyBtns = document.querySelectorAll(".addToCart");
    const productBtns = document.querySelectorAll('.product');
    const details = document.querySelectorAll('.product-name h2');
    var detailData = '';

    for (let i = 0; i < productBtns.length; i++) {
        let btnIndex = parseInt(productBtns[i].getAttribute('index'));
        buyBtns[i].addEventListener("click", function () {
            let loggedInAccount = JSON.parse(localStorage.getItem('loggedInAccount'));

            if (!loggedInAccount) {
                alert("Vui lòng đăng nhập");
                var loginForm = document.getElementById('login_form');
                loginForm.style.display = 'block'
            }
            else if (true) {
                let productToAdd = createCartProduct(htmlProducts[btnIndex]);
                alert('Đã thêm vào giỏ hàng')
                let cartProduct = {
                    accountInfo: loggedInAccount,
                    productInfo: productToAdd,
                    count: 1
                };
                if (cart.length === 0)
                    cart.push(cartProduct);
                else {
                    let isFind = false;
                    for (let product of cart) {
                        if (product.productInfo.name == productToAdd.name) {
                            product.count += 1;
                            isFind = true;
                            break;
                        }
                    }

                    if (!isFind) {
                        cart.push(cartProduct);
                    }
                }
                updateProductToCart();
                renderCart();

            }
        })

        details[i].addEventListener("click", function detail() {
            detailData = `<div id="product-detail-wrapper">
                                <div id="product-detail" index=${btnIndex}>
                                    
                                    <i class="fa-solid fa-x" onclick="closeModalDetail()"></i>
                                    
                                    <div id="product-detail-img">
                                        <img src="${htmlProducts[btnIndex].img}" alt="">
                                    </div>

                                    <div id="product-detail-name">
                                        <p>${htmlProducts[btnIndex].name}</p>
                                    </div>
                                    
                                    <div id="product-detail-desc">
                                        <p>${htmlProducts[btnIndex].description}</p>
                                    </div>

                                    <div id="product-detail-price">
                                        <p>${htmlProducts[btnIndex].price}đ</p>
                                    </div>

                                    <button class="detail-addToCart">
                                        Thêm vào giỏ hàng
                                    </button>
                                </div>
                            </div>`
            document.querySelector('#product-detail-modal').style = 'display: block';
            document.querySelector('#product-detail-modal').innerHTML = detailData;
            detailAddToCart();
        })
    }

}

// ============================================================================================================================================

//render cart

function openModalCart() {
    document.querySelector("#cart-modal").style = 'display: block';
}

function closeModalCart() {
    document.querySelector("#cart-modal").style = 'display: none';
}

function createCartProduct(product) {
    let cartProduct = product;
    cartProduct.count = 1;
    delete cartProduct.quantity;
    return cartProduct;
}

function updateProductToCart() {
    let cartData = JSON.stringify(cart);
    localStorage.setItem('cart', cartData);
}

function deleteCart(index, quantity = 1) {
    cart.splice(index, quantity);
}

function updateCount(index, count) {
    if (count < 1) return;
    cart[index].count = count;
    updateProductToCart();
    renderCart()
}

updateProductToCart();
renderCart();


function renderCart() {
    const loggedInAccount = JSON.parse(localStorage.getItem('loggedInAccount'));

    // Lấy danh sách sản phẩm trong giỏ hàng từ Local Storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Lọc danh sách sản phẩm trong giỏ hàng theo tài khoản đã đăng nhập
    const userCart = cart.filter(item => item.accountInfo.email === loggedInAccount.email);
    // let cartHtml = ``;
    let Total = 0;
    let cartHtml = userCart.map(item => {
        // Tính tổng giá trị
        Total += item.count * item.productInfo.price;

        return `<div id="cart-item">
        <div class="cart-container">
            <div class="item-img">
                <img src="${item.productInfo.img}" alt="">
            </div>

            <div class="item-name">
                <p>${item.productInfo.name}</p>
            </div>

            <div class="item-control">
                <div class="incrementer">
                    <button class="remove">-</button>
                    <div class="quantity">
                        <p>${item.count}</p>
                    </div>
                    
                    <button class="add">+</button>
                </div>

                <div class="item-total-price">
                    <p>${item.productInfo.price * item.count}đ</p>
                </div>

                <div class="remove-item">
                    <p>Xóa</p>
                </div>
            </div>
        </div>
    </div>`;
}).join('');
    document.querySelector('#cart-content').innerHTML = cartHtml;

    let deleteBtns = document.querySelectorAll('.remove-item');
    let addCountBtns = document.querySelectorAll('.add');
    let removeCountBtns = document.querySelectorAll('.remove');

    for (let i = 0; i < deleteBtns.length; i++) {
        deleteBtns[i].addEventListener('click', () => {
            deleteCart(i);
            updateProductToCart();
            renderCart();
        })

        addCountBtns[i].addEventListener('click', () => updateCount(i, cart[i].count + 1))
        removeCountBtns[i].addEventListener('click', () => updateCount(i, cart[i].count - 1))
    }

    document.querySelector('#cart-total-price').innerHTML = `Tổng tiền: ${Total} đ`;
}

//delete all cart-item

document.querySelector('.delete-all').addEventListener('click', () => {
    if (cart.length > 0)
        if (confirm("Bạn có muốn xóa tất cả sản phẩm không ?")) {
            deleteCart(0, cart.length);
            updateProductToCart();
            renderCart();
        }
        else return;
})

//================================================================================================================================

function openModalDetail() {
    document.querySelector('#product-detail-modal').style = 'display: block';
}

function closeModalDetail() {
    document.querySelector('#product-detail-modal').style = 'display: none';
}

function detailAddToCart() {
    const detailBtns = document.querySelectorAll('.detail-addToCart');
    const productBtns = document.querySelectorAll('#product-detail');

    for (let i = 0; i < productBtns.length; i++) {
        let btnIndex = parseInt(productBtns[i].getAttribute('index'));

        detailBtns[i].addEventListener('click', function () {
            //ktra đăng nhập
            let loggedInAccount = JSON.parse(localStorage.getItem('loggedInAccount'));

            if (!loggedInAccount) {
                alert("Vui lòng đăng nhập");
                let loginForm = document.getElementById('login_form');
                loginForm.style.display = 'block'
            }
            if (true) {
                let productToAdd = createCartProduct(htmlProducts[btnIndex]);
                alert('Đã thêm vào giỏ hàng')
                
                let cartProduct = {
                    accountInfo: loggedInAccount,
                    productInfo: productToAdd,
                    count: 1
                };
                if (cart.length === 0)
                    cart.push(cartProduct);
                else {
                    let isFind = false;
                    for (let product of cart) {
                        if (product.productInfo.name == productToAdd.name) {
                            product.count += 1;
                            isFind = true;
                            break;
                        }
                    }

                    if (!isFind) {
                        cart.push(cartProduct);
                    }
                }
                updateProductToCart();
                renderCart();

            }
            // else {
            //     alert('Bạn phải đăng nhập để có thể mua hàng!!');

            // }
        })
    }
}
// search
function searchProducts() {

    // Lấy giá trị từ ô tìm kiếm
    const searchKeyword = document.getElementsByClassName("findbox")[0].value.toLowerCase();


    htmlProducts = products.filter(product => product.name.toLowerCase().includes(searchKeyword));
    PageOpen(menuPage, menuBtn);

    if (htmlProducts.length > 0) {
        // Nếu có sản phẩm phù hợp, hiển thị sản phẩm và ẩn thông báo "Không tìm thấy sản phẩm"
        // taomenu();
        // document.getElementById('noResultMessage').style.display = 'none';
        renderProductsInPage(0);
        renderProducts();
    } else {
        // Nếu không có sản phẩm phù hợp, hiển thị thông báo "Không tìm thấy sản phẩm" và ẩn sản phẩm
        document.getElementById('content-container').innerHTML = 'không tìm thấy sản phẩm';
        // document.getElementById('noResultMessage').style.display = 'block';

    }

    // Lọc sản phẩm dựa trên từ khóa tìm kiếm


}
function OpenCart() {
    var loginForm = document.getElementById('login_form');
    let loggedInAccount = JSON.parse(localStorage.getItem('loggedInAccount'));

    if (!loggedInAccount) {
        alert("Vui lòng đăng nhập");


        loginForm.style.display = 'block'
        loginForm.style.zIndex = '3'




    } else if (loggedInAccount) {
        openModalCart()
        if (cart.length === 0) {
            alert("giỏ hàng của bạn đang trống")
        }
        else {
            document.getElementById('box_giohang').style.display = 'block'
            renderProductsInOrderForm();
            closeModalCart()
            // deleteCart(0, cart.length);
            updateProductToCart();
            renderCart();
        }


    }
}
// 
function renderProductsInOrderForm() {
    const loggedInAccount = JSON.parse(localStorage.getItem('loggedInAccount'));

    // Lấy danh sách sản phẩm trong giỏ hàng từ Local Storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Lọc danh sách sản phẩm trong giỏ hàng theo tài khoản đã đăng nhập
    const userCart = cart.filter(item => item.accountInfo.email === loggedInAccount.email);
    let productsHtml = ``;

    for (let item of userCart) {
        productsHtml += `<div class="cart-item-in-order-form">
            <div class="item-img_cart ">
                <img src="${item.productInfo.img}" alt="">
            </div>

            <div class="item-details">
                <p class="item-name_cart ">${item.productInfo.name}</p>
                <p class="item-price_cart">${item.productInfo.price}đ</p>
                <p class="item-quantity_cart">${item.productInfo.count}</p>
                <p class="item-total_cart">${item.productInfo.price * item.count}đ</p>
                
            </div>
        </div>`;
    }

    // Thêm sản phẩm vào form thông tin khách hàng
    document.querySelector('.thongTinKhachHang').innerHTML += productsHtml;
}

// Gọi hàm để hiển thị sản phẩm trong form
renderProductsInOrderForm();
//  xác nhận đặt hàng
document.addEventListener("DOMContentLoaded", function () {
    // ... (Các đoạn mã khác)

    // Bắt sự kiện khi người dùng nhấn nút "Xác Nhận Đơn Hàng"
    const submitButton = document.querySelector('.submit');
    renderOrderHistoryView();


    submitButton.addEventListener('click', function () {
        
        // Bước 1: Trích xuất thông tin cá nhân từ form
        const personalInfo = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            paymentMethod: document.getElementById('payment').value,
            deliveryTime: document.getElementById('delivery-time').value,
            notes: document.getElementById('notes').value,
        };
        const loggedInAccount = JSON.parse(localStorage.getItem('loggedInAccount'));
        // Bước 2: Tạo đối tượng đơn hàng từ thông tin cá nhân và chi tiết sản phẩm trong giỏ hàng
        const orderDetails = {
            accountInfo: loggedInAccount,
            personalInfo: personalInfo,
            cartItems: cart, // Giả sử giỏ hàng đã được cập nhật trước đó
            orderCode: generateOrderCode()  
        };
        updateOrderHistory(orderDetails);

        // Bước 3: Lưu đối tượng đơn hàng vào mảng các đơn hàng trong localStorage
        // const orders = JSON.parse(localStorage.getItem('orders')) || [];
        // orders.push(orderDetails);
        // localStorage.setItem('orders', JSON.stringify(orders));

        // Bước 4: Xóa dữ liệu giỏ hàng trong localStorage
        // localStorage.removeItem('cart');
        deleteCart(0, cart.length);
        updateProductToCart();
            renderCart();
        
        // Lấy danh sách các phần tử có class là 'cart-item-in-order-form'
        var elementsToRemove = document.querySelectorAll('.cart-item-in-order-form');

        // Duyệt qua danh sách và xóa từng phần tử
        elementsToRemove.forEach(function (element) {
            element.remove();
        });


        document.getElementById('box_giohang').style.display = 'none'
        // renderOrderHistory();

    });


});
// thêm sản phẩm Admin
function addProduct() {
    // Lấy giá trị từ các trường input
    var name = document.getElementsByClassName('nameInput')[0].value;
    var price = parseFloat(document.getElementsByClassName('priceInput')[0].value);
    var quantity = parseInt(document.getElementsByClassName('quantityInput')[0].value);
    var type = document.getElementsByClassName('typeInput')[0].value;
    var description = document.getElementsByClassName('describeInput')[0].value;

    // Lấy thẻ input chứa hình ảnh
    var imgInput = document.getElementById('img_input');

    // Kiểm tra xem người dùng đã chọn hình ảnh chưa
    if (imgInput.files.length > 0) {
        // Lấy thông tin về hình ảnh
        var imgFile = imgInput.files[0];

        // Tạo đối tượng FileReader để đọc dữ liệu hình ảnh
        var reader = new FileReader();

        // Xử lý khi đọc xong
        reader.onloadend = function () {
            // Lấy dữ liệu hình ảnh dưới dạng base64
            var imgBase64 = reader.result;

            // Tạo đối tượng sản phẩm
            var product = {
                'name': name,
                'price': price,
                'quantity': quantity,
                'type': type,
                'description': description,
                'img': imgBase64
            };

            // Lấy danh sách sản phẩm từ Local Storage
            var products = JSON.parse(localStorage.getItem('products')) || [];

            // Thêm sản phẩm mới vào danh sách
            products.push(product);

            // Lưu danh sách sản phẩm mới vào Local Storage
            localStorage.setItem('products', JSON.stringify(products));

            // Cập nhật biến htmlProducts để hiển thị sản phẩm mới
            htmlProducts = [...products];

            // taomenu();
            // ... (phần code khác)

            // Xóa dữ liệu trong form sau khi thêm sản phẩm thành công
            document.getElementsByClassName('edit_item')[0].reset();
            renderProductsInPage(0);
            renderProducts();
        };

        // taomenu();
        // renderProductType(type)


        // Đọc dữ liệu hình ảnh dưới dạng base64
        reader.readAsDataURL(imgFile);

    } else {
        // Nếu người dùng không chọn hình ảnh, bạn có thể xử lý theo ý muốn của mình
        console.log("Người dùng chưa chọn hình ảnh.");
    }

}

var saveBtn = document.getElementsByClassName('save')[0];
saveBtn.addEventListener('click', addProduct);

// lịch sử đơn hàng đã đặt
function renderOrderHistory() {
    // Lấy danh sách đơn hàng từ Local Storage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Lấy thông tin tài khoản đã đăng nhập từ Local Storage
    const loggedInAccount = JSON.parse(localStorage.getItem('loggedInAccount'));
     if (orders.length === 0) {
        document.getElementById('order-history').innerHTML = '<p>Không có đơn hàng nào.</p>';
        return;
    }
    // Kiểm tra xem có tài khoản đăng nhập không
    if (loggedInAccount) {
        // Lọc danh sách đơn hàng theo tài khoản đã đăng nhập
        const userOrders = orders.filter(order => order.accountInfo.email === loggedInAccount.email);
       
        // Hiển thị danh sách đơn hàng
        let orderHtml = '';
        userOrders.forEach((order, index) => {
            

            orderHtml += `<div class="order">
            <h3>Đơn Hàng #${order.orderCode}</h3>
            <p><strong>Tên:</strong> ${order.personalInfo.name}</p>
            <p><strong>Số Điện Thoại:</strong> ${order.personalInfo.phone}</p>
            <p><strong>Địa Chỉ:</strong> ${order.personalInfo.address}</p>
            <p><strong>Phương Thức Thanh Toán:</strong> ${order.personalInfo.paymentMethod}</p>
            <p><strong>Thời Gian Giao Hàng:</strong> ${order.personalInfo.deliveryTime}</p>
            <p><strong>Ghi Chú:</strong> ${order.personalInfo.notes}</p>
            <h4>Chi Tiết Đơn Hàng</h4>
            <ul>`;

            order.cartItems.forEach(item => {
                orderHtml += `<li>${item.productInfo.name} - sl: ${item.productInfo.count} - giá: ${item.productInfo.price * item.productInfo.count}đ</li>`;
            });

            orderHtml += `</ul></div>`;
        });

        // Hiển thị đơn hàng đã đặt
        document.getElementById('order-history').innerHTML = orderHtml;
    }
    else {
        console.error('Không có tài khoản đăng nhập.');
    }
}

// Gọi hàm để hiển thị đơn hàng đã đặt

function updateOrderHistory(orderDetails) {
    // Lấy danh sách đơn hàng từ Local Storage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Thêm đơn hàng mới vào danh sách
    orders.push(orderDetails);

    // Lưu danh sách đơn hàng mới vào Local Storage
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrderHistory();
}
// mã đơn hàng
function generateOrderCode() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
    const year = currentDate.getFullYear() % 100; // Lấy hai chữ số cuối cùng của năm

    // Hàm helper để tạo một số ngẫu nhiên từ 1000 đến 9999
    const randomFourDigitNumber = () => Math.floor(Math.random() * 9000) + 1000;

    return `dh.${day}${month}${year}${randomFourDigitNumber()}`;
}


