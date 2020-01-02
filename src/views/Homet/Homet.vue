 <template>
  <div class="home">
    <div class="top">
      <div class="block">
        <div class='banner'>
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide"
                   v-for="(item,index) in bannerlist"
                   :key="index"><img :src="item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bot">
      <div class="locaUp">
        <div v-viewer="options"
             class="images">
          <el-image :src="img"
                    class="bendi"></el-image>
        </div>
        <div class="right"
             style="    height: 100%;
    margin-left: 110px;"
             @click="print_conver(num,img_pdf)">
          <p class="btn_txt">电子发票打印</p>
          <p class="btn_cont"><span>请选择所需的电子发票进行打印</span></p>
        </div>

      </div>
      <div class="locaUp">
        <div v-viewer="options"
             class="images">
          <el-image :src="img_chuku"
                    class="bendi"></el-image>
        </div>
        <div class="right"
             style="    height: 100%;
    margin-left: 110px;"
             @click="print_conver(num,img_pdf)">
          <p class="btn_txt">出库单打印</p>
          <p class="btn_cont"><span>请选择所需的出库单进行打印</span></p>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import photo from '../../assets/img'
import Swiper from "swiper"
import { printStatus, print_c, print, Simulation } from "../../api/index"


export default {
  name: 'homet',

  mounted () {
    this.getNum()
    this.initSwiper()

  },
  data () {
    return {
      options: {
        toolbar: true,
        url: 'data-source'
      },
      num: '',
      src: require('../../assets/50_20190916001.png'),
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
      ],
      img: photo.moban_png,
      img_chuku: photo.chuku_png,
      img_pdf: photo.moban_pdf,
      chuku_pdf: photo.pdf_chuku,
      imgList: [photo.ds_img],
      bannerlist: [require('../../assets/50_20190916001.png'), require('../../assets/50_20190916002.png'), require('../../assets/50_20190916003.png')]
    }
  },
  methods: {
    onPreview () {
      this.showViewer = true
    },
    // 关闭查看器
    closeViewer () {
      this.showViewer = false
    },
    getNum () {
      this.num = this.$route.params.num
    },
    print_conver (number, img) {
      const base64 = img.split(',')[1]

      const data = JSON.stringify({
        type: 'pdf',
        printdata: 'FZ',
        instruction: 'ZPL',
        threshold: 178,
        dpi: 203,
        paperWidth: '4.2',
        concentration: 6,
        conver: base64,

      })
      Simulation(data).then((res) => {
        const data = res.data
        this.printf(number, data)
      }).catch((err) => {
        console.log(err)
      })


    },
    // 打印
    printf (number, data) {
      const data_p = {
        number: number,
        data: data
      }
      print(data_p).then((res) => {
        if (res.code == 0) {
          this.$notify({
            title: '成功',
            message: res.data,
            type: 'success'
          });
        } else {
          this.$notify.error({
            title: '错误',
            message: res.data
          });
        }
      }).catch((err) => {
        this.$notify.error({
          title: '错误',
          message: err.data
        });

      })
    },
    initSwiper () {
      var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
        //自动轮播
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      })
    }
  },
  components: {

  },
  created () {
  }
}
</script>

<style scoped>
img {
  height: 210px;
  width: 375px;
}
.home {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home .top {
  flex: 2;
  width: 100%;
  padding: 5px;
}
.home .bot {
  flex: 3;
  width: 100%;
}
.locaUp {
  position: relative;
  width: 80%;
  height: 107px;
  border-radius: 7.5px;
  margin: 36px auto;
  border: 1px solid rgba(222, 222, 222, 1);
  box-shadow: 7px 7px 14px 0px rgba(66, 66, 66, 0.1);
}
.locaUp .bendi {
  content: "";
  width: 105px;
  height: 105px;
  position: absolute;
  top: -25px;
  left: 5%;
  margin-left: -11px;
  /* border-radius: 50%; */
}
.locaUp .btn_rig {
  line-height: 24px;
  margin-left: 3px;
}
.btn_txt {
  position: absolute;
  top: 9%;
  right: 0;
  width: 168.75px;
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  letter-spacing: 8px;
}
.btn_cont {
  position: absolute;
  top: 33%;
  right: 0;
  width: 168.75px;
  font-size: 12px;
  font-weight: bold;
  color: #666;
}
.btn_cont span {
  display: inline-block;
  line-height: 37.5px;
  border-bottom: 0.75px solid #999;
}
.btn_img {
  position: absolute;
  top: 68%;
  right: 0;
  width: 168.75px;
  font-size: 12px;
  font-weight: bold;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
}
.btn_img .left {
  margin-left: 5px;
}
.btn_img .right {
  margin-right: 5px;
}
.btn_img .left,
.right {
  display: flex;
}
.left img,
.right img {
  height: 16px;
  width: 16px;
}
.btn_img .left span,
.btn_img .right span {
  line-height: 16px;
  margin-left: 3px;
}
</style>