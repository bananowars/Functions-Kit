(function() {
    var keyCode = "81";
    $(document).keydown(function(e) {
        chrome.storage.local.get('VKSetTransliterateKeyCode', function(result) {
            var values = result['VKSetTransliterateKeyCode'];
            values = JSON.parse(values);
            keyCode = values.keyCode;
        });
        if (e.ctrlKey && e.keyCode == keyCode) {
            if (
                $(document.activeElement).is('input') ||
                $(document.activeElement).is('textarea')
            ) {

                var txt = $(document.activeElement).val();
                $(document.activeElement).val(transliterate(txt));
            }
            if ($(document.activeElement).hasClass('fc_editable') ||
                $(document.activeElement).hasClass('im-chat-input--text') ||
                $(document.activeElement).hasClass('submit_post_field') ||
                $(document.activeElement).hasClass('ts_input')
            ) {
                var txt = $(document.activeElement).text();
                $(document.activeElement).text(transliterate(txt));
            }
        }
    });
})();

function transliterate(text) {
    var rus = '"ё Ё @ № ; : ? й Й ц Ц у У к К е Е н Н г Г ш Ш щ Щ з З х Х ъ Ъ ф Ф ы Ы в В а А п П р Р о О л Л д Д ж Ж э Э \ / я Я ч Ч с С м М и И т Т ь Ь б Б ю Ю . ,"'.split(/ +/g),
        eng = "'` ~ @ # $ ^ & q Q w W e E r R t T y Y u U i I o O p P [ { ] } a A s S d D f F g G h H j J k K l L ; : \' \" \ | z Z x X c C v V b B n N m M , < . > / ?'".split(/ +/g);

    var x;
    var txt = "";
    text = text.replace(/\&nbsp;/g, " ");
    text = text.replace(/\<br><br>/g, " ");
    text = text.replace(/\<br>/g, " ");
    text = text.split('');
    var flag = 0;

    for (x = 0; x < text.length; x++) {
        for (y = 0; y < rus.length; y++) {
            if (text[x] == eng[y]) {
                text[x] = rus[y];
                flag = 0;
                break;
            }
            if (text[x] == rus[y]) {
                flag = 1;
                text[x] = eng[y];
                break;
            }
            if (flag == 1) {
                if (text[x] == '\"') {
                    text[x] = '@';
                    break;
                }
            }
            if (flag == 0) {
                if (text[x] == '@') {
                    text[x] = '\"';
                    break;
                }
            }
        }
    }
    return text.join('');
}

(function() {
    // $(".audio_row").find('.audio_play_wrap').after('<div class="downloadIcon"><img src="http://iconspot.ru/files/83275.png" alt=""></div>');
    $(".audio_row").find('.audio_play_wrap').after('<div class="downloadIcon"><img src="/images/download.png" alt=""></div>');
})();



(function() {
$('top_audio_player_title_wrap').click(function() {
    $(".audio_row").find('.audio_play_wrap').after('<div class="downloadIcon"><img src="/images/download.png" alt=""></div>');
});
});