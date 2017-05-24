
    ~function () {
      var drags = document.getElementsByClassName('j-drag');
      if (drags.length === 0) {
        return;
      }
      var drag = drags[0];
      // 坑3：布局模型转换：从流动模型转换为层模型
      var curLeft = drag.getBoundingClientRect().left;
      var curTop = drag.getBoundingClientRect().top;
      drag.style.position = 'fixed';
      drag.style.left = curLeft + 'px';
      drag.style.top = curTop + 'px';
      drag.addEventListener('mousedown', function (ev) {
        console.log('down');
        var ev = ev || window.event;
        disX = ev.clientX - drag.offsetLeft;
        disY = ev.clientY - drag.offsetTop;
        // 坑1：document 绑定
        document.addEventListener('mousemove', handler, false);

        document.addEventListener('mouseup', function () {
          console.log('up');
          document.removeEventListener('mousemove', handler, false);
        }, false);
      }, false);


      function handler(ev) {
        console.log('move');
        var ev = ev || window.event;
        // 坑2：位置的计算
        var l = ev.clientX - disX;
        var t = ev.clientY - disY;
        drag.style.left = l + 'px';
        drag.style.top = t + 'px';
      }
    }();