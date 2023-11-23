document.addEventListener('DOMContentLoaded', function () {
    var contentItemService = document.querySelector('.detail_service');
    var mota_service = document.querySelectorAll('.box_service');
    var item_mota_service = document.querySelectorAll('.menu .item_service button');
    var closeButtonService = document.querySelectorAll('.close_login_service');

    function open(index) {
        contentItemService.style.display = 'block';
        mota_service.forEach(function (box, i) {
            if (i === index) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    }

    for (let i = 0; i < item_mota_service.length; i++) {
        item_mota_service[i].addEventListener('click', function () {
            open(i);
        });
    }
   
        for (let i = 0; i < closeButtonService.length; i++) {
            closeButtonService[i].addEventListener('click', function () {
                mota_service[i].style.display = 'none';
                contentItemService.style.display = 'none';
            });
        }
    })

