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

	    <div class="info-form">

				<button class="waves-effect waves-dark btn btn-large red saveUpdate-btn" @click="ok" type="button">保存</button>
				<div class="navbar-fixed">
				  <nav>
				    <div class="nav-wrapper">
				      <a href="javascript:;" class="btn-floating btn-large waves-effect waves-dark left-operate" @click="goBack">
				      	<i class="material-icons">arrow_back</i>
				      </a>
				      <a class="brand-logo">{{infoData.date}}</a>
				      <a href="#modal1" class="btn-floating btn-large waves-effect waves-dark modal-trigger right-operate" @click="deleteInfo">
				      	<i class="material-icons">delete</i>
				      </a>
				    </div>
				  </nav>
				</div>

				<pre id="info_textarea" class="info_textarea" @click="editInfo()">{{infoData.info}}</pre>
				<textarea id="input_textarea" :oninput="changeInfo()" v-model="newInfo"></textarea>
				
				<p class="creatTime" id="creatTime">{{infoData.time}}</p>

				<div class="fileInputBox">
					<div class="container">
						<div class="row" id="filetainer" v-for="(image, index) in infoData.img" :key="index">
				      <div class="col s3">
				      	<div class="item">
				      		<img class="materialboxed" data-caption="" :src="image">
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
	  </div>
	 </transition>
</template>

<script>
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
    	newInfo: []
    }
  },
  mounted () {
  	$('.modal').modal();
  	$('.materialboxed').materialbox();

  	this.newInfo = this.infoData.info

  	$.ajax({
		  url: 'http://localhost/hello/api/info.php?id='+this.$route.query.id,
		  type: 'get',
		  dataType: 'json',
		  success: res => {
		    this.loading = false
		    $("#info_textarea").text(res.data.info);
		    $("#input_textarea").text(res.data.info);
		    $("#creatTime").text(res.data.time);
		    if (res.data.img.length < 1) {
		    	$('.fileInputBox').hide();
		    }
		    info_textarea = $("#info_textarea").text();
		    time = res.data.time;
		    $(".brand-logo").text(res.data.date); 

		    // 修改文章
				change = function() {
				  if($("#input_textarea").val() != info_textarea){
			      $(".saveUpdate-btn").addClass("show");
			    }else{
			      $(".saveUpdate-btn").removeClass("show");
			    };
			    // 输入框为空就返回或者删除
			    if($("#input_textarea").val() == ""){
						$(".saveUpdate-btn").removeClass("show");
					}
			  }
			  $(document).ready(function(){
			    $('.materialboxed').materialbox();
			  });
		  }
		})
  },
  methods: {
  	goBack () {
  		this.$router.back()
  	},
  	editInfo () {
  		$("#info_textarea").hide();
			$("#creatTime").hide();
			$("#input_textarea").show().focus();
  	},
  	changeInfo () {
  		if(this.newInfo != this.infoData.info){
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
  		
  	},
  	ok () {
  		
  	}
  }
}
</script>

<style scoped></style>
