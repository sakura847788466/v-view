<template>
  <div class="main">
    <div class="imgMain"
         id="imgMain">
      <div class="imgItem"
           v-for="(item,index) in newList"
           :key="item.index"
           @click="imgClick(item.index)">
        <img :src='item.imgUrl' />
      </div>
    </div>
    <div class="imgShow"
         id="imgShow">
      <div class="infoMain"
           v-for="(imgItem,index) in imgList"
           :key="index">
        <div class="bg"></div>
        <img class="moveImg"
             :src="imgItem.imgUrl"
             v-show="imgItem.isShow" />
        <div class="imgInfo"
             v-show="imgItem.infoShow">
          <img :src="imgItem.openState?'img/over.png':'img/open.png'"
               @click="openClick(index)" />
          <p>{{imgItem.name}}</p>
          <audio :src="imgItem.musicUrl"></audio>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'imgRote',
  mounted: function () {
    this.imgOpen()
    this.Move()
    this.storeList = this.copy(this.list)
    this.imgList = this.copy(this.list)
    for (var i in this.imgList) {
      this.imgList[i].isShow = false
    }
  },
  data () {
    return {
      imgList: [],
      rotY: 0,
      storeList: [],
      timer: null,
      MoveTime: null,
      topNum: 0,
      itemTimer: null,
      widthNum: 0,
      pelVal: 0,
      pelTimer: null,
      btnState: false,
      list: [
        { index: 0, imgUrl: '../../assets/50_20190916001.png', isShow: true, name: '第1张', infoShow: false, openState: false, musicUrl: 'yinyue/dongtian.mp3' },
        { index: 1, imgUrl: '../../assets/50_20190916001.png', isShow: true, name: '第2张', infoShow: false, openState: false, musicUrl: 'yinyue/nuannuan.mp3' },
        { index: 2, imgUrl: '../../assets/50_20190916001.png', isShow: true, name: '第3张', infoShow: false, openState: false, musicUrl: 'yinyue/tiantian.mp3' },
        { index: 3, imgUrl: '../../assets/50_20190916001.png', isShow: true, name: '第4张', infoShow: false, openState: false, musicUrl: 'yinyue/xiaoxingyun.mp3' },
        { index: 4, imgUrl: '../../assets/50_20190916001.png', isShow: true, name: '第5张', infoShow: false, openState: false, musicUrl: 'yinyue/xuemaojiao.mp3' },
        { index: 5, imgUrl: '../../assets/50_20190916001.png', isShow: true, name: '第6张', infoShow: false, openState: false, musicUrl: 'yinyue/hongyanjiu.mp3' },
        { index: 6, imgUrl: '../../assets/50_20190916001.png', isShow: true, name: '第7张', infoShow: false, openState: false, musicUrl: 'yinyue/qingchun.mp3' },
        { index: 7, imgUrl: '../../assets/50_20190916001.png', isShow: true, name: '第8张', infoShow: false, openState: false, musicUrl: 'yinyue/xiaojiuwo.mp3' },
        { index: 8, imgUrl: 'img/timg9.jpg', isShow: true, name: '第9张', infoShow: false, openState: false, musicUrl: 'yinyue/qinghuaci.mp3' },
        { index: 9, imgUrl: 'img/timg10.jpg', isShow: true, name: '第10张', infoShow: false, openState: false, musicUrl: 'yinyue/houlai.mp3' },
        { index: 10, imgUrl: 'img/timg11.jpg', isShow: true, name: '第11张', infoShow: false, openState: false, musicUrl: 'yinyue/gaobai.mp3' },
        { index: 11, imgUrl: 'img/timg12.jpg', isShow: true, name: '第12张', infoShow: false, openState: false, musicUrl: 'yinyue/ribuluo.mp3' }
      ],
    }
  },
  methods: {
    openClick (index) {
      this.btnState = !this.btnState
      var aud = document.getElementsByTagName('audio')
      for (var i in this.imgList) {
        this.imgList[i].openState = false
      }
      this.imgList[index].openState = true
      if (this.btnState) {
        aud[index].play();
      } else {
        this.imgList[index].openState = false
        aud[index].pause();
      }

    },
    getStyle (obj, name) {
      if (obj.currentStyle) {
        return obj.currentStyle[name];
      } else {
        return getComputedStyle(obj, false)[name]; //false是一个无用的参数
      }
    },
    copy (obj) {
      var newobj = obj.constructor === Array ? [] : {};
      if (typeof obj !== 'object') {
        return;
      }
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? this.copy(obj[i]) : obj[i];
      }
      return newobj
    },
    imgOpen () {
      this.timer = setInterval(() => {
        var Img = document.getElementsByClassName('imgItem');
        var deg = 360 / Img.length;
        for (var i = 0; i < Img.length; i++) {
          Img[i].style.transform = 'rotateY(' + i * deg + 'deg) translateZ(325px)';
          Img[i].style.transition = 'all 1s ' + (Img.length - i - 1) * 0.1 + 's';
        }
      }, 350)
    },
    Move () {
      var oUl = document.getElementById("imgMain")
      this.MoveTime = setInterval(() => {
        var oUl = document.getElementById("imgMain")
        this.rotY--;
        oUl.style.transform = 'perspective(800px) rotateX(-20deg) translateZ(5px)' + 'rotateY(' + this.rotY + 'deg)'
      }, 350)
    },
    imgClick (index) {
      clearInterval(this.itemTimer)
      var imgShow = document.getElementById('imgShow');
      var infoMain = imgShow.getElementsByClassName('infoMain');
      var bg = imgShow.getElementsByClassName('bg');
      var imgInfo = imgShow.getElementsByClassName('imgInfo');
      var aud = document.getElementsByTagName('audio')
      for (var i in this.list) {
        this.list[i].isShow = true
      }
      for (var i in this.imgList) {
        this.imgList[i].isShow = false
        this.imgList[i].infoShow = false
      }
      for (var j = 0; j < infoMain.length; j++) {
        infoMain[j].style.width = 100 + 'px';
        infoMain[j].style.height = 124 + 'px';
        infoMain[j].style.top = 0 + 'px';
      }
      for (var k = 0; k < bg.length; k++) {
        bg[k].style.opacity = 0;
      }
      for (var t = 0; t < aud.length; t++) {
        aud[t].pause()
      }
      for (var i in this.imgList) {
        this.imgList[i].openState = false
      }
      this.list[index].isShow = false;
      this.imgList[index].isShow = true;
      this.itemTimer = setInterval(() => {
        this.topNum += 5;
        this.widthNum++;
        infoMain[index].style.top = 0 - this.topNum + 'px';
        infoMain[index].style.width = 100 + this.widthNum + 'px';
        infoMain[index].style.height = 124 + Math.round(5 / 4 * this.widthNum) + 'px';
        var itemTop = parseInt(infoMain[index].style.top)
        var itemWidth = parseInt(infoMain[index].style.width)
        if (Math.abs(itemTop) >= 250) {
          clearInterval(this.itemTimer);
          clearInterval(this.pelTimer);
          this.topNum = 0;
          this.widthNum = 0;
          this.pelTimer = setInterval(() => {
            if (this.pelVal <= 5) {
              this.pelVal++
              bg[index].style.opacity = this.pelVal / 10;
            } else {
              clearInterval(this.pelTimer)
              this.pelVal = 0
              this.imgList[index].infoShow = true;
              imgInfo[index].transition = 'ease all 5s';
              imgInfo[index].style.transform = 'rotateY(180deg)'
            }
          }, 300)
          infoMain[index].style.transition = 'ease all 5s';
          infoMain[index].style.transform = 'rotateY(180deg)';
        }
        if (itemWidth >= 170) {
          infoMain[index].style.width = 170 + 'px';
          infoMain[index].style.height = 210 + 'px'
        }
      }, 500)

    }
  },
  computed: {
    newList: function () {
      return this.list.filter(function (list) {
        return list.isShow
      })
    }
  },
}
</script>

	<style scoped>
body {
  background: #000;
}

* {
  margin: 0px;
  padding: 0px;
}

.clearfix:after {
  clear: both;
  content: "";
  display: block;
}

#app {
  text-align: center;
}

.main {
  margin: 150px auto 0px auto;
  display: inline-block;
  transform-style: preserve-3d;
}

.imgMain {
  width: 100px;
  height: 150px;
  margin: 0px auto;
  position: absolute;
  transform-style: preserve-3d;
  transform: perspective(800px) rotateX(-20deg) rotateY(0deg);
}

.imgItem {
  width: 100px;
  height: 150px;
  list-style: none;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 0px 5px #fff;
  -webkit-box-reflect: below 10px -webkit-linear-gradient(transparent, transparent
        50%, rgba(0, 0, 0, 0.6));
}

.imgItem img {
  width: 100px;
  height: 150px;
  vertical-align: middle;
  border-radius: 3px;
}

.imgShow {
  width: 100px;
  height: 124px;
  position: absolute;
  top: 150px;
  left: 50%;
  margin-left: -25px;
  transform-style: preserve-3d;
}

.infoMain {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
}

.infoMain .bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  left: 0px;
  background: pink;
  opacity: 0;
  border-radius: 5px;
  z-index: 1;
}

.imgInfo {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 3;
  border-radius: 5px;
}

.moveImg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.imgInfo p {
  text-align: center;
  margin-top: 40px;
  font-size: 30px;
  color: #fff;
}

.imgInfo img {
  width: 30px;
  height: 30px;
  margin-top: 30px;
}
</style>