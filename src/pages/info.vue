<template>
	<transition name="slide">
	  <div class="page info">
	  	<transition name="fade">
		  	<div class="wrapperBox active" v-show="loading">
					<div class="inner">
						<div class="preloader-wrapper loader-wrapper active">
							<div class="spinner-layer spinner-blue">
						    <div class="circle-clipper left">
						      <div class="circle"></div>
						    </div><div class="gap-patch">
						      <div class="circle"></div>
						    </div><div class="circle-clipper right">
						      <div class="circle"></div>
						    </div>
						  </div>
						  <div class="spinner-layer spinner-red">
						    <div class="circle-clipper left">
						      <div class="circle"></div>
						    </div><div class="gap-patch">
						      <div class="circle"></div>
						    </div><div class="circle-clipper right">
						      <div class="circle"></div>
						    </div>
						  </div>
						  <div class="spinner-layer spinner-yellow">
						    <div class="circle-clipper left">
						      <div class="circle"></div>
						    </div><div class="gap-patch">
						      <div class="circle"></div>
						    </div><div class="circle-clipper right">
						      <div class="circle"></div>
						    </div>
						  </div>
						  <div class="spinner-layer spinner-green">
						    <div class="circle-clipper left">
						      <div class="circle"></div>
						    </div><div class="gap-patch">
						      <div class="circle"></div>
						    </div><div class="circle-clipper right">
						      <div class="circle"></div>
						    </div>
						  </div>
						</div>
					</div>
				</div>
			</transition>


				<button class="waves-effect waves-dark btn btn-large red saveUpdate-btn" @click="saveChange" type="button">保存</button>
				<div class="navbar-fixed">
				  <nav>
				    <div class="nav-wrapper">
				      <a href="javascript:;" class="btn-floating btn-large waves-effect waves-dark left-operate" @click="goBack">
				      	<i class="material-icons">arrow_back</i>
				      </a>
				      <a class="brand-logo">{{infoData.date}}</a>
				      <!-- <a href="#modal1" class="btn-floating btn-large waves-effect waves-dark modal-trigger right-operate">
				      	<i class="material-icons">delete</i>
				      </a> -->
				    </div>
				  </nav>
				</div>

				<div class="page-content" v-on:scroll.passive="onScroll" ref="page">
					<div class="info-form">
						<div id="info_textarea" class="info_textarea">{{infoData.info}}</div><!-- @click="editInfo()" -->
						<textarea id="input_textarea" :oninput="changeInfo()" v-model="input_textarea"></textarea>
						
						<p class="creatTime" id="creatTime">{{infoData.time}}</p>

						<div class="fileInputBox">
							<div class="container">
								<div class="row" id="filetainer"> <!--v-for="(image, index) in infoData.img" :key="index"-->
						      <div class="col s3">
						      	<div class="item">
						      		<img class="previewer-demo-img" v-for="(item, index) in list" @click="show(index)" :src="item.src"> <!--:src="'http://love.s1.natapp.cc/'+image"-->
						      		<div v-transfer-dom>
						      			<previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
						      		</div>
						      	</div>
						      </div>
						    </div>
							</div>
						</div>
					</div>
				</div>

				<div id="modal1" class="modal bottom-sheet">
					<div class="modal-content">
					  <p class="red-text">确定要删除吗</p>
					</div>
					<div class="modal-footer">
					  <a href="javascript:;" @click="deleteInfo" class="modal-action modal-close waves-effect waves-dark btn-flat">确定</a>
					</div>
				</div>

	  </div>
	 </transition>
</template>

<script>
import { Previewer, TransferDom } from 'vux'
let img = require('../assets/images/logo.png');

export default {
  data () {
    return {
    	loading: true, 
    	infoData: {
				// date: "2018-09-30",
				// id: "100",
				// img: [img],
				// info: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
				// time: "2018-09-30 23:43:18"
    	},
    	input_textarea: '',	// 编辑框
    	list: [
	    	{
	        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
	        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwu9ze86j20m80b40t2.jpg',
	        w: 800,
	        h: 400
	      },
	      {
	        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
	        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwvqwuoaj20xc0p0t9s.jpg',
	        w: 1200,
	        h: 900
	      }, {
	        msrc: 'http://ww1.sinaimg.cn/thumbnail/663d3650gy1fplwwcynw2j20p00b4js9.jpg',
	        src: 'http://ww1.sinaimg.cn/large/663d3650gy1fplwwcynw2j20p00b4js9.jpg'
	      }
      ],
      options: {
        getThumbBoundsFn (index) {
          // find thumbnail element
          let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
          // get window scroll Y
          let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
          // optionally get horizontal scroll
          // get position of element relative to viewport
          let rect = thumbnail.getBoundingClientRect()
          // w = width
          return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          // Good guide on how to get element coordinates:
          // http://javascript.info/tutorial/coordinates
        }
      }
    }
  },
  directives: {
    TransferDom
  },
  components: {
    Previewer
  },
  mounted () {
  	$('.modal').modal();
  	$('.materialboxed').materialbox();

  	$.ajax({
		  url: 'http://love.s1.natapp.cc/api/info.php?id='+this.$route.query.id,
		  type: 'get',
		  dataType: 'json',
		  success: res => {
		    this.loading = false
		    this.infoData = res.data
		    this.input_textarea = res.data.info
		    if (res.data.img.length < 1) {
		    	$('.fileInputBox').hide();
		    }
			  $(document).ready(function(){
			    $('.materialboxed').materialbox();
			  });
		  }
		})
  },
  methods: {
  	logIndexChange (arg) {
      console.log(arg)
    },
    show (index) {
      this.$refs.previewer.show(index)
    },
  	goBack () {
  		this.$router.back()
  	},
  	editInfo () {
  		$("#info_textarea").hide();
			$("#creatTime").hide();
			$(".fileInputBox").hide();
			$("#input_textarea").show().focus();
  	},
  	changeInfo () {
  		if(this.input_textarea != this.infoData.info){
	      $(".saveUpdate-btn").addClass("show");
	    }else{
	      $(".saveUpdate-btn").removeClass("show");
	    };
	    // 输入框为空就返回或者删除
	    if($("#input_textarea").val() == ""){
				$(".saveUpdate-btn").removeClass("show");
			}
  	},
  	deleteInfo () {
  		$.ajax({
				url: 'http://love.s1.natapp.cc/api/delete.php',
			  type: 'get',
			  data: {
			  	id: this.$route.query.id
			  },
			  dataType: 'json',
			  beforeSend: () => {
			  	this.loading = true
			  },
			  success: res => {
			    if (res.code === 200) {
			    	this.$materialize.toast({
			    		html: '删除成功',
			    		displayLength: 1200
			    	})
			    	$(".saveUpdate-btn").removeClass("show");
			    	this.loading = false
			    	setTimeout(this.goBack(),1300)
			    	localStorage.setItem("isUpdata","true")
			    }
			  }
			})
  	},
  	saveChange () {
  		$.ajax({
				url: 'http://love.s1.natapp.cc/api/update.php',
			  type: 'post',
			  data: {
			  	id: this.$route.query.id,
	        info: this.input_textarea,
	        time: this.infoData.time
			  },
			  dataType: 'json',
			  beforeSend: () => {
			  	this.loading = true
			  },
			  success: res => {
			    if (res.code === 200) {
			    	this.infoData.info = this.input_textarea
			    	this.loading = false
			    	this.$materialize.toast({
			    		html: '修改成功',
			    		displayLength: 1500
			    	})
			    	$(".saveUpdate-btn").removeClass("show");
			    	localStorage.setItem("isUpdata","true")
			    }

			    $("#info_textarea").show();
			    $("#creatTime").show();
			    $(".fileInputBox").show();
			    $("#input_textarea").hide();
			  }
			})
  	},
  	onScroll () {
  		if (this.$refs.page.scrollTop > 0) {
  			$("nav").addClass("shadow")
  		} else {
  			$("nav").removeClass("shadow")
  		}
  	}
  }
}
</script>

<style scoped></style>
