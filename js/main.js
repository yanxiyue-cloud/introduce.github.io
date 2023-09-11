
/*----------------------------- Site Loader & Popup --------------------*/
$(window).on("load", function () {
  $("#cv-overlay").fadeOut();
});
$(document).ready(function () {
  "use strict";
  /*----------------------------- Scroll Up Button --------------------- */
  var btn = $('#scrollup');

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass('show');
    } else {
      btn.removeClass('show');
    }
  });

  btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, '300');
  });

  /*----------------------------- Scroll Down Button on hero section --------------------- */
  $(".scroll-down").on('click', function (e) {
    $('html,body').animate({
      scrollTop: $("#about").offset().top
    },
      'slow');
  });

  /*--------------------- Aos animation on scroll --------------------*/
  AOS.init({
    once: true
  });

  /*--------------------- On click menu scroll section to section -------------------------------- */
  // Cache selectors
  var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight() + 50,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

  // Bind click handler to menu items
  // so we can get a fancy scroll animation
  menuItems.on("click", function (e) {
    var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    // alert(href);
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 300);
    e.preventDefault();
  });

  // Bind to scroll
  $(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop)
        return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
      lastId = id;
      // Set/remove active class
      menuItems
        .parent().removeClass("active")
        .end().filter("[href='#" + id + "']").parent().addClass("active");
    }
  });
  /*--------------------- navigation close on click menu item (responsive) -------------------------------- */
  $('.cv-nav').on('click', function () {
    $('.navbar-collapse').removeClass("show");
  });
  /*--------------------- Scroll to fixed navigation bar -------------------------------- */
  $(function () {
    var header = $(".cv-static");
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();

      if (scroll >= 10) {
        header.removeClass('cv-static').addClass("cv-fixed");
      } else {
        header.removeClass("cv-fixed").addClass('cv-static');
      }
    });
  });

  /*--------------------- portfolio carousel -------------------------------- */
  $('.portfolio-carousel').owlCarousel({
    loop: true,
    margin: 24,
    nav: false,
    smartSpeed: 1000,
    autoplay: false,
    dots: false,
    center: true,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      991: {
        items: 3
      },
      1199: {
        items: 4
      },
      1499: {
        items: 4
      }
    }
  });
  /*--------------------- News carousel -------------------------------- */
  $('.latest-news').owlCarousel({
    loop: true,
    margin: 24,
    smartSpeed: 1000,
    autoplay: true,
    dots: false,
    nav: false,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 2
      },
      991: {
        items: 3
      }
    }
  });

});
(function(){
  //点击a弹出div盒子
var contactLink = document.getElementById("contactLink");
var contactDiv = document.querySelector(".contact-us");
// console.log('contactLink=',contactLink);
// console.log('contactDiv=',contactDiv);
contactLink.addEventListener("click", function (event) {
  event.preventDefault();
  // 显示或隐藏 div 盒子
  if (contactDiv.style.display === "none") {
    contactDiv.style.display = "block";
  } else {
    contactDiv.style.display = "none";
  }
});
//点击submit弹出成功提示框
var submitbtn = document.querySelector('.submit-btn');
submitbtn.addEventListener('click', function (event) {
  alert('后台没有写，不过默认你发送消息成功了吧！')
});
var divOff = document.querySelector('.contact-us img');
divOff.addEventListener('click',function(){
  contactDiv.style.display = "none";
})
})();


//关系图
(function () {
  var myChart = echarts.init(document.querySelector(".personal-detail"));
  fetch('../data/test.json')
    .then(response => response.json())
    .then(jsonData => {
      myChart.hideLoading();
      jsonData.nodes.forEach(function (node) {
        node.label = {
          show: node.symbolSize > 30
        };
      });
      var option = {
        title: {
          text: 'my-info',
          subtext: '左侧的关系图，一个circle代表了\n我的一个item,你可以通过鼠标移入\ncircle or line 来获取与我有关的信息。\n\n温馨提示：\n关系图可以随鼠标滚轮，\n放大或缩小喔！\n你还可以拖拽整个关系图！',
          padding:10,
          itemGap:40,
          right:10,
          top: 'top',
          left: 'right',
          textStyle: {
            fontSize: 40,
            lineHeight:20,
            textShadowBlur: 6,
            textShadowColor: "rgba(184, 215, 59, 1)",
            textShadowOffsetX: 3,
            textShadowOffsetY: 3
          },
          subtextStyle:{
            fontSize:12,
            lineHeight:25
          },
        },
        tooltip: {
          trigger: 'item',
          position:'right',
          triggerOn:'mousemove',
          formatter:function(arg){
            if(arg.dataType == 'edge'){
              var targetId=arg.data.target;
              var sourceId=arg.data.source;
              return jsonData.nodes[targetId].name+"->"+jsonData.nodes[sourceId].name;
            }else{
              return arg.name;
            } 
          }
        },
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            // name: 'Les Miserables',
            type: 'graph',
            layout: 'force',
            data: jsonData.nodes,
            links: jsonData.links,
            categories: jsonData.categories,
            roam: true,
            label: {
              position: 'right',
              formatter: '{b}'
            },
            lineStyle: {
              color: 'source',
              curveness: 0.3
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 10
              }
            },
            force: {
              repulsion: 58
            }
          }
        ]
      };
      myChart.setOption(option);
    });

}
)();








