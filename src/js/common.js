$(document).ready(function () {

  localSet = localStorage.getItem('order');
  localStorage.clear();

  if (localSet != null) {
    arr = localSet.split(',');
    for (let i = 0; i < arr.length; i++) {
      $('#textarea').val($.trim($('#textarea').val() + '\n' + arr[i]));
      order.add(arr[i]);
    }
  }

  $(".action-drop").click(function (e) { 
    e.preventDefault();
    $(this).siblings(".drop-down").fadeToggle(
      { 
	      duration: 800, 
	      easing: "linear", // скорость анимации
	      queue: false // не ставим в очередь
	    }
    );
  });


  $(".mobile-menu").click(function (e) {
    e.preventDefault();
    console.log(1);
    $(".navigation").fadeToggle();
    $(this).children().toggleClass("fa-bars fa-times");
  });

  $('.popup-with-form').magnificPopup({
    type: 'inline',
    preloader: false,
    focus: '#name',

    // When elemened is focused, some mobile browsers in some cases zoom in
    // It looks not nice, so we disable it:
    callbacks: {
      beforeOpen: function () {
        if ($(window).width() < 700) {
          this.st.focus = false;
        } else {
          this.st.focus = '#name';
        }
      }
    }
  });

  $('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

  $('.testimonials__slick').slick({
    dots: true,
    arrows: false
  });

});

// корзина
$(".changeOrder").click(function (e) {
  e.preventDefault();
  if ($(this).text() === "Изменить заказ") {
    $('#textarea').prop('disabled', false);
    $(this).text("Сохранить");
  }
  else {
    $('#textarea').prop('disabled', true);
    arrayOrder = $('#textarea').val().replace(/^[\n\r]+|[\n\r]+$/g, '').split(/[\n\r]+/);
    $(this).text("Изменить заказ");
    order.clear();
    localStorage.clear();
    for (let i = 0; i < arrayOrder.length; i++) {
      order.add(arrayOrder[i]);
    }
    localStorage.setItem('order', arrayOrder);
  }
});

let arr = [];
let arrayOrder = [];
let order = new Set([]);

$("a[href='#order-form']").click(function (e) {
  e.preventDefault();
  let i = 0;
  $('#textarea').val('');
  let nameProduct = $(this).closest(".card-product").find(".product__title").text();
  order.add(nameProduct);
  for (let item of order.values()) {
    $('#textarea').val($.trim($('#textarea').val() + '\n' + item));
    arrayOrder.push(item);

  }
  localStorage.setItem('order', arrayOrder);
});

// отправка подписки
function AjaxFormRequest(result_id, formMain, url) {
  jQuery.ajax({
    url: url,
    type: "POST",
    dataType: "html",
    data: jQuery("#" + formMain).serialize(),
    success: function (response) {
      $(':input', '#' + formMain)
        .not(':button, :submit, :reset, :hidden')
        .val('')
        .removeAttr('checked')
        .removeAttr('selected');
      setTimeout(() => {
        $("#message").hide();
      }, 5000);
    },
    error: function (response) {
      var par = document.getElementById(result_id);
      var error = document.createElement('p');
      error.classList.add("mt-3");
      error.innerHTML = "Возникла ошибка при отправке формы.";
      par.appendChild(error);
      setTimeout(func, 700);
    }
  });
}

function func() {
  $("p.mt-3").detach();
}
$('#subscribe-form').submit(function (e) {
  e.preventDefault();
  AjaxFormRequest('messegeResult-subscribe', 'subscribe-form', '../subscribe.php');
});

$('#form-write-us').submit(function (e) {
  e.preventDefault();
  AjaxFormRequest('result', 'form-write-us', '../feedback.php');
});

