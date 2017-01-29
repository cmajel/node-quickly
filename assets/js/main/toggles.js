$(function () {

  function toggleThatActive(  ) {
    var toggleTarget = this.getAttribute('data-toggle');
    $("." + toggleTarget).toggleClass('active');
  }

  function toggleActive() {
    $(this).toggleClass('active');
  }

  $(document)
    .on('click', '.js-toggle', toggleActive)
    .on('click', '.js-toggle-that', toggleThatActive);

});

