var contentItem = document.getElementsByClassName('detail_sale')[0];
var mota_sale = document.querySelectorAll('.box_sale');
var item_mota_sale = document.getElementsByClassName('item_sale');
var closeButton = document.querySelectorAll('.close_login_sale');

function open(index) {
    var computedStyle = window.getComputedStyle(mota_sale[index]);
    if (computedStyle.display === 'none') {
        contentItem.style.display = 'block';
        mota_sale[index].style.display = 'block';
    }
}

for (let i = 0; i < item_mota_sale.length; i++) {
    item_mota_sale[i].addEventListener('click', function () {
        open(i);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    for (let i = 0; i < closeButton.length; i++) {
        closeButton[i].addEventListener('click', function () {
            mota_sale[i].style.display = 'none';
            contentItem.style.display = 'none';
        });
    }
});
