$(document).ready(function() {

    chrome.storage.local.get('VKSetTransliterateKeyCode', function(result) {
        var values = result['VKSetTransliterateKeyCode'];
        values = JSON.parse(values);

        if (values.keyCode == "81") {
            $('.slct').text('Q');
            $('li:contains("Q")').addClass('active');
        }
        if (values.keyCode == "66") {
            $('.slct').text('B');
            $('li:contains("B")').addClass('active');
        }
        if (values.keyCode == "89") {
            $('.slct').text('Y');
            $('li:contains("Y")').addClass('active');
        }
    });
    


    // Select
    $('.slct').click(function() {
        /* Заносим выпадающий список в переменную */
        var dropBlock = $(this).parent().find('.drop');

        /* Делаем проверку: Если выпадающий блок скрыт то делаем его видимым*/
        if (dropBlock.is(':hidden')) {
            dropBlock.slideDown();

            /* Выделяем ссылку открывающую select */
            $(this).addClass('active');
            /* Работаем с событием клика по элементам выпадающего списка */
            $('.drop').find('li').click(function() {
                $('.drop').find('li').removeClass('active');
                $(this).addClass('active');
                /* Заносим в переменную HTML код элемента 
				списка по которому кликнули */
                var selectResult = $(this).html();
                var keyCodeResult = $(this).val();

                var values = new Object();
                values['keyCode'] = keyCodeResult;
                values = JSON.stringify(values);
                chrome.storage.local.set({
                    'VKSetTransliterateKeyCode': values
                });

                /* Находим наш скрытый инпут и передаем в него 
				значение из переменной selectResult */
                $(this).parent().parent().find('input').val(selectResult);

                /* Передаем значение переменной selectResult в ссылку которая 
				открывает наш выпадающий список и удаляем активность */
                $('.slct').removeClass('active').html(selectResult);

                /* Скрываем выпадающий блок */
                dropBlock.slideUp();
            });
            /* Продолжаем проверку: Если выпадающий блок не скрыт то скрываем его */
        } else {
            $(this).removeClass('active');
            dropBlock.slideUp();
        }
        /* Предотвращаем обычное поведение ссылки при клике */
        return false;
    });
});