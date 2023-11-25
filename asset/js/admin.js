document.addEventListener("DOMContentLoaded", function () {
    var sidebarItems = document.querySelectorAll(".admin-navbar_left ul li");
    var namePage = document.getElementsByClassName('name_list')
    var dashBoard=document.getElementById('dashboard')
    var productManage = document.getElementById('container_admin');
    var orderHistory=document.getElementById('order-history-container')
    var currentNavItemContent = document.getElementsByClassName('name')[0]

    var currentSelected = dashBoard;

    sidebarItems.forEach(function (item) {
        item.addEventListener("click", function () {
            var targetValue = item.getAttribute("data-target");


            // Gán nội dung của thẻ a vào biến


            // Ẩn thẻ cũ nếu có
            if (currentSelected) {
                
                currentSelected.style.display = 'none';

            }
            

            switch (targetValue) {
        
                case "home":
                    currentNavItemContent.textContent = namePage[0].textContent;
                    dashBoard.style.display= 'block';
                    currentSelected = dashBoard;
                    break;
                case "product":
                    productManage.style.display = 'block';
                    currentSelected = productManage;
                    currentNavItemContent.textContent = namePage[1].textContent;
                    break;
                case "manageOrders":
                    orderHistory.style.display='block'
                    currentNavItemContent.textContent = namePage[2].textContent;
                    currentSelected =orderHistory
                    break;
                case "businessStats":
                    currentNavItemContent.textContent = namePage[3].textContent;

                    break;
                // Thêm các case khác tương ứng với các mục trong nav left
                default:
                    
                    break;
            }
        });
    });
});
var addBtn = document.getElementsByClassName('icon_add_item')[0];
var addForm = document.getElementById('add_form');
// var imgInput = document.getElementById('img_input');
// var nameInput = document.getElementsByClassName('nameInput')[0];
// var describeInput = document.getElementsByClassName('describeInput')[0];
// var priceInput = document.getElementsByClassName('priceInput')[0];
// var saveBtn = document.getElementsByClassName('save')[0]

function openAddItem() {
    addForm.style.display = 'block';
}

addBtn.addEventListener('click', openAddItem);

// function addProduct() {
//     // Lấy giá trị từ các trường input
//     var name = document.getElementsByClassName('nameInput')[0].value;
//     var price = parseFloat(document.getElementsByClassName('priceInput')[0].value);
//     var quantity = parseInt(document.getElementsByClassName('quantityInput').value);
//     var type = document.getElementsByClassName('typeInput')[0].value;
//     var description = document.getElementsByClassName('describeInput')[0].value;
//     var img = document.getElementsByClassName('img_input')[0];

//     // Tạo đối tượng sản phẩm
//     var products = {
//         'name': name,
//         'price': price,
//         'quantity': quantity,
//         'type': type,
//         'description': description,
//         'img': img
//     };
//      console.log(products);

//     // var products = JSON.parse(localStorage.getItem('products')) || [];

//     //     // Thêm sản phẩm mới vào danh sách
//     //     products.push(products);

//     //     // Lưu danh sách sản phẩm mới vào Local Storage
//     //     localStorage.setItem('products', JSON.stringify(products));

//     // // In thông tin sản phẩm vào console (bạn có thể thay thế bước này bằng việc gửi dữ liệu đến server)
   

//     // Xóa dữ liệu trong form sau khi thêm sản phẩm thành công
//     document.getElementsByClassName('edit_item')[0].reset();
// }
// // saveBtn.addEventListener('click',addProduct)
//  function displayProductList(){
    
//  }
//  đăng xuất admin
var logoutAdmin=document.getElementsByClassName('ti-power-off')
function logoutAdminFct(){
    localStorage.removeItem('loggedInAccount');
    document.getElementById('end-user').style.display='block'
    document.getElementsByClassName('admin-container')[0].style.display='none'
    
    return;
}

//đơn hàng đã đặt

// Lấy danh sách đơn hàng từ Local Storage
// Bạn có thể thêm mã JavaScript sau vào mã của bạn

// Lấy danh sách đơn hàng từ Local Storage
function renderOrderHistoryView() {
const orders = JSON.parse(localStorage.getItem('orders')) || [];
// localStorage.setItem('orderAll',JSON.stringify(orders))

// Hiển thị danh sách đơn hàng
const orderHistoryContainer = document.getElementById('order-history-container');

if (orders.length > 0) {
    let orderHtml = '<h2>Đơn Hàng Đã Đặt</h2>';
    
    
    orders.forEach((order, index) => {
        orderHtml += `<div class="order">
            <div class="ti-arrow-circle-down"></div>
            <h3>Đơn Hàng #${order.orderCode}</h3>
            <p><strong>Tên:</strong> ${order.personalInfo.name}</p>
            <p><strong>Số Điện Thoại:</strong> ${order.personalInfo.phone}</p>
            <p><strong>Địa Chỉ:</strong> ${order.personalInfo.address}</p>
            <!-- Thêm các trường thông tin khác của đơn hàng -->
            <h4>Chi Tiết Đơn Hàng:</h4>
            <ul>`;
        
        order.cartItems.forEach(item => {
            orderHtml += `<li>${item.productInfo.name} - ${item.productInfo.count} - ${item.productInfo.price * item.productInfo.count}đ</li>`;
        });

        orderHtml += `</ul></div>`;
    });

    orderHistoryContainer.innerHTML = orderHtml;
} else {
    orderHistoryContainer.innerHTML = '<p>Không có đơn hàng nào.</p>';
}

}


// doanh thu
// Calculate weekly revenue
function calculateWeeklyRevenue(orders) {
    return calculateRevenue(orders, 'week');
}

// Calculate monthly revenue
function calculateMonthlyRevenue(orders) {
    return calculateRevenue(orders, 'month');
}

// Generic function to calculate revenue based on time period ('week' or 'month')
function calculateRevenue(orders, timePeriod) {
    const revenueData = {};

    orders.forEach(order => {
        const orderDate = new Date(order.orderTime);
        const timeValue = timePeriod === 'week' ? getWeekNumber(orderDate) : orderDate.getMonth() + 1;

        // Calculate revenue based on the time period
        revenueData[timeValue] = (revenueData[timeValue] || 0) + calculateOrderTotal(order);
    });

    return revenueData;
}

// Display revenue on the interface
function displayRevenue(revenueData) {
    document.getElementById('week_sale').querySelector('.input_sale').value = revenueData.weeklyRevenue || 0;
    document.getElementById('month_sale').querySelector('.input_sale').value = revenueData.monthlyRevenue || 0;
}

// Calculate total order amount
function calculateOrderTotal(order) {
    return order.cartItems.reduce((total, item) => total + item.productInfo.price * item.productInfo.count, 0);
}

// Get week number from date
function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDays = (date - firstDayOfYear) / 86400000; // 86400000 milliseconds in a day
    return Math.ceil((pastDays + firstDayOfYear.getDay() + 1) / 7);
}

// Lấy danh sách đơn hàng từ Local Storage
const orders = JSON.parse(localStorage.getItem('orders')) || [];

// Tính toán doanh thu
const weeklyRevenue = calculateWeeklyRevenue(orders);
const monthlyRevenue = calculateMonthlyRevenue(orders);

// Hiển thị doanh thu
displayRevenue({ weeklyRevenue, monthlyRevenue });

// doanh thu tổng
// Calculate total revenue from all orders
function calculateTotalRevenue(orders) {
    return orders.reduce((total, order) => total + calculateOrderTotal(order), 0);
}

// Lấy danh sách đơn hàng từ Local Storage
const order = JSON.parse(localStorage.getItem('orders')) || [];

// Tính toán doanh thu tổng
const totalRevenue = calculateTotalRevenue(order);

// Hiển thị doanh thu tổng
displayTotalRevenue(totalRevenue);

// Function to display total revenue on the interface
function displayTotalRevenue(totalRevenue) {
    document.getElementById('total_sale').querySelector('.input_sale').value = totalRevenue || 0;
}




