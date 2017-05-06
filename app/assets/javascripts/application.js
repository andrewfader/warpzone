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
}

$(document).on('turbolinks:load', function() {
  readyDoc()
});

$(document).ready(readyDoc());
