// Yandex.Metrika counter
(function (d, w, c) {
    (w[c] = w[c] || []).push(function() {
        try {
            w.yaCounter24614159 = new Ya.Metrika({id:24614159,
                    webvisor:true,
                    clickmap:true,
                    trackLinks:true,
                    accurateTrackBounce:true});
        } catch(e) { }
    });

    var n = d.getElementsByTagName("script")[0],
        s = d.createElement("script"),
        f = function () { n.parentNode.insertBefore(s, n); };
    s.type = "text/javascript";
    s.async = true;
    s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";

    if (w.opera == "[object Opera]") {
        d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
})(document, window, "yandex_metrika_callbacks");
// /Yandex.Metrika counter


//после выполнения кода счетчика возникает событие yacounter24614159inited
//цифры в названии события - 24614159 - это id счетчика, берется из кода выше

jQuery(document).on('yacounter24614159inited', function () {

    //console.log('счётчик yaCounter24614159 можно использовать');
    
    //нажатие кнопки «Добавить в корзину» в карточке товара
    $( '.bx_item_detail .bj-cart-button' ).click( function() {
      yaCounter24614159.reachGoal('ADD');
      return true;
    });
    
    //нажатие кнопки «Добавить в корзину» в модальном окне
    $( '.modal .bj-cart-button' ).click( function() {
      yaCounter24614159.reachGoal('ADD1');
      return true;
    });
    
});