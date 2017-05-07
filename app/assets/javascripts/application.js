// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require dropzone
//= require components
//= require turbolinks
//= require_tree .

function readyDoc() {
  $('.btn.comments').on('click',function(e) {
    $(e.target).closest('li').find('.showcomments').toggleClass('hidden');
  });

  $('.gif').on('click',function(e) {
    video = $(e.target).closest('li').find('.video');
    video.removeClass('hidden');
    $(e.target).closest('.gif').addClass('hidden');
    setTimeout(function() { $(video).find('video')[0].play(); }, 100);
  });

  $('.video').on('click',function(e) {
    gif = $(e.target).closest('li').find('.gif');
    gif.removeClass('hidden');
    $(e.target).closest('.video').find('video')[0].pause();
    $(e.target).closest('.video').addClass('hidden');
  });
  if ($('li').length > 1) {
    var scrollTop;
    function gifFun() {
      index = 0
      $.map($('.gif'), function(gif) {
        scrollTop = $('html').scrollTop();
        gifTop = $(gif).offset().top - scrollTop
        gifBottom = gifTop + $(gif).height()
        windowBottom = scrollTop + $(window).height() + $(gif).height()
        if (gifBottom > 0 || (gifTop > scrollTop && gifBottom < windowBottom)) {
          $(gif).find('img#gif').removeClass('hidden')
          $(gif).find('img.blank').addClass('hidden')
          console.log("show " + index + "top:" + gifTop + "bottom: " + gifBottom + "sc" + scrollTop)
        } else {
          $(gif).find('img#gif').addClass('hidden')
          $(gif).find('img.blank').removeClass('hidden')
          console.log("hid " + index + "top:" + gifTop + "bottom: " + gifBottom + "wb" + windowBottom)
        }
        index = index + 1
      });
    }
    $(window).scroll(function() {
      if($('.gif').length > 2) {
        if (Math.abs(scrollTop - $('html').scrollTop()) > (($('.gif').first().height() - 10)/3 - 10)) {
          gifFun()
        }
      }
    });

    gifFun()
  }

  $('.share').on('click',function(e) {
    $(e.target).closest('.share').find('.links').toggleClass('hidden')
    $(e.target).closest('.share').find('.hideme').toggleClass('hidden')
  });

}

$(document).on('turbolinks:load', function() {
  readyDoc()
});

$(document).ready(readyDoc());

readyDoc();
