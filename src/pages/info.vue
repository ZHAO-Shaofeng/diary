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
				  <nav class="inner">
				    <div class="nav-wrapper">
				      <a href="javascript:;" class="btn-floating btn-large waves-effect waves-dark left-operate" @click="goBack">
				      	<i class="material-icons">arrow_back</i>
				      </a>
				      <!-- <a class="brand-logo">{{infoData.date}}</a> -->
				      <!-- <a class="brand-logo"><i class="material-icons">favorite</i></a> -->
				      <a class="brand-logo">
				      	<div class="heart">
				      		<div class="topLeft"></div>
				      		<div class="topRight"></div>
				      		<div class="bottom"></div>
				      	</div>
				      </a>
				      <!-- <a href="#modal1" class="btn-floating btn-large waves-effect waves-dark modal-trigger right-operate">
				      	<i class="material-icons">delete</i>
				      </a> -->
				    </div>
				  </nav>
				</div>

				<div class="page-content" v-on:scroll.passive="onScroll" ref="page">
					<div class="info-form" v-if="!booleanReload">
						<div id="info_textarea" class="info_textarea">{{infoData.info}}</div><!-- @click="editInfo()" -->
						<textarea id="input_textarea" :oninput="changeInfo()" v-model="input_textarea"></textarea>
						
						<p class="creatTime" id="creatTime">{{infoData.time}}</p>

						<div class="fileInputBox">
							<div class="container">
								<div class="row" id="filetainer"> <!--v-for="(image, index) in infoData.img" :key="index"-->
						      <div class="col s4" v-for="(item, index) in imgList">
						      	<div class="item">
						      		<img class="previewer-demo-img" @click="show(index)" :src="item.src">
						      	</div>
						      </div>
						      <div v-transfer-dom>
						      	<previewer :list="imgList" ref="previewer" :options="options"></previewer>
						      </div>
						    </div>
							</div>
						</div>
					</div>
					<div class="reload" v-if="booleanReload">
						<a class="btn waves-effect grey lighten-5 grey-text text-darken-4" href="javascript:;" @click="getInfo">重新加载</a>
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
				// info: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
				// time: "2018-09-30 23:43:18"
    	},
    	input_textarea: '',	// 编辑框
    	imgList: [],
			booleanReload: false,
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

  	this.getInfo();
  },
  methods: {
    show (index) {
      this.$refs.previewer.show(index);
    },
  	goBack () {
  		// this.$router.back();
  		this.$router.push('/home');
  	},
  	getInfo () {
  		$.ajax({
			  url: 'http://love.s1.natapp.cc/api/info.php?id='+this.$route.query.id,
			  timeout: 5000,
			  type: 'get',
			  dataType: 'json',
			  beforeSend: () => {
			  	this.loading = true
			  	this.booleanReload = false
			  },
			  success: res => {
			    this.loading = false;
			    this.infoData = res.data;
			    this.input_textarea = res.data.info;
			    for(let i=0; i<res.data.img.length; i++){
	          this.imgList.push({src: res.data.img[i]})
	        }
			    if (res.data.img.length < 1) {
			    	$('.fileInputBox').hide();
			    }
				  $(document).ready(function(){
				    $('.materialboxed').materialbox();
				  });
			  },
			  error: (XMLHttpRequest,status) => {
			  	if(status=='timeout'){
			  		this.input_textarea = this.infoData.info;
			  		this.loading = false
			  		this.booleanReload = true
			  		this.$materialize.toast({
			    		html: '请求超时',
			    		displayLength: 1500
			    	})
			  	}else{
			  		this.input_textarea = this.infoData.info;
			  		this.loading = false
			  		this.booleanReload = true
			  		this.$materialize.toast({
			    		html: '请求失败，未知错误',
			    		displayLength: 3000
			    	})
			  	}
			  }
			})
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
  			$("nav.inner").addClass("shadow")
  		} else {
  			$("nav.inner").removeClass("shadow")
  		}
  	}
  }
}
</script>

<style scoped>
	nav a.brand-logo{
		height: 100%;
		display: flex;
		align-items: center;
  }
</style>
