function c_switch(...args) {
  args.forEach((e) => e.addClass("active").siblings().removeClass("active"));
}
function switchLayerTag() {
  c_switch($(this), $(this).parents(".c-switch").find(".c-layer").eq($(this).index()));
}
function switchLayerArrow() {
  let sw = $(this).parents(".c-switch");
  let tags = sw.find(".c-tag");
  let i = sw.find(".c-tag.active").index();
  let len = tags.size() - 1;
  i = $(this).hasClass("back") ? i - 1 : i + 1;
  i = i > len ? 0 : i < 0 ? len : i;
  c_switch(tags.eq(i), sw.find(".c-layer").eq(i));
}
function switchLayerAuto(n) {
  let i = $(".c-autoPlay .c-tag.active").index() + n;
  i = i > 3 ? 0 : i < 0 ? 3 : i;
  c_switch($(".c-autoPlay .c-tag").eq(i), $(".c-autoPlay .c-layer").eq(i));
}
const play = () => (timer = setInterval(() => switchLayerAuto(1), 5000));
const stop = () => clearInterval(timer);
const imgZoom = () => {
  $("img.c-zoom").on("click", function () {
    $(".c-zoom-box").addClass("active").find("img").attr("src", $(this).attr("src"));
  });
  $(".c-zoom-box").on("click", function () {
    $(this).removeClass("active");
  });
};
$(() => {
  $(".c-switch .c-tag").on("click", switchLayerTag);
  $(document).on("click", ".next, .back", switchLayerArrow);
  play();
  $(".c-autoPlay").hover(stop, play);
  imgZoom();
});
