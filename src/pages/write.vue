<template>
	<transition name="slide">
	  <div class="page write">
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

				<div class="navbar-fixed">
				  <nav>
				    <div class="nav-wrapper">
				      <a href="javascript:;" class="btn-floating btn-large waves-effect waves-dark left-operate" @click="goBack">
				      	<i class="material-icons">arrow_back</i>
				      </a>
				      <a class="brand-logo">树洞</a>
				      <button type="button" class="btn-floating btn-large waves-effect waves-dark right-operate" @click="ok">
				      	<i class="material-icons">done</i>
				      </button>
				    </div>
				  </nav>
				</div>

				<textarea name="info" placeholder="今天......"></textarea>
				
				<div class="fileInputBox">
					<div class="container">
						<div class="row" id="filetainer">
				      <div class="col s3" v-for="(item, index) in imgArr" :key="index">
				      	<div class="item">
				      		<img class="materialboxed" data-caption="" :src="item">
				      	</div>
				      	<i class="material-icons deleteImg" @click="deleteImg">close</i>
				      </div>
				      <div class="col s3 newFile" v-show="newFile">
				      	<div class="item">
				      		<i class="material-icons">add</i>
				      		<input type="file" accept="image/*" multiple="multiple" @change="changeImg($event)">
				      	</div>
				      </div>
				    </div>
					</div>
				</div>
			</div>
	  </div>
	</transition>
</template>

<script>
export default {
  data () {
    return {
    	loading: false,
    	imgArr: [],
			imgMax: 1,
			newFile: true
    }
  },
  methods: {
  	goBack () {
  		this.$router.back()
  	},
	  changeImg(e) {
	    var that = this;
	    that.loading = true	// 等待
	    var imgLimit = 1024;
	    var files = e.target.files;
	    console.log(files);
	    var image = new Image();
	    console.log('最多传'+that.imgMax+'张')
	    console.log('共上传'+files.length+'张');
	    if (files.length > 0) {
	      var dd = 0;
	      var timer = setInterval(function () {
	        if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
	          return false
	        }
	        if (files.item(dd).size > imgLimit * 102400) {
	          //to do sth
	        } else {
	          image.src = window.URL.createObjectURL(files.item(dd));
	          image.onload = function () {
	            // 默认按比例压缩
	            var w = image.width,
	              	h = image.height
	            // w = 500
	            // h = w / scale
	            // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
	            var quality = 1.0;
	            //生成canvas
	            var canvas = document.createElement('canvas');
	            var ctx = canvas.getContext('2d');
	            // 创建属性节点
	            var anw = document.createAttribute('width');
	            anw.nodeValue = w;
	            var anh = document.createAttribute('height');
	            anh.nodeValue = h;
	            canvas.setAttributeNode(anw);
	            canvas.setAttributeNode(anh);
	            ctx.drawImage(image, 0, 0, w, h);
	            image.style.width = '100%';
	            var ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();//图片格式
	            var base64 = canvas.toDataURL('image/' + ext, quality);
	            that.loading = false
	            // 回调函数返回base64的值
	            // console.log(base64)
	            if (that.imgArr.length <= that.imgMax - 1) {
	              that.imgArr.unshift('')
	              that.imgArr.splice(0, 1, base64);//替换数组数据的方法，此处不能使用：that.imgArr[index] = url;
	              console.log(that.imgArr)
	              // 超出最大限制就隐藏加号
	              if (that.imgArr.length >= that.imgMax) {
	                console.log('已经'+ that.imgMax +'张了')
	                that.newFile = false
	                that.$materialize.toast({
	                	html: '最多'+that.imgMax+'张',
	                	displayLength: 1500
	                })
	              }
	            }
	          }
	        }

	        if (dd < files.length - 1) {
	          dd++;
	        } else {
	          clearInterval(timer);
	        }
	      }, 1000)
	    }
	  },
	  deleteImg(index) {
	  	this.imgArr.splice(index, 1);
	  	if (this.imgArr.length < this.imgMax) {
	  		this.newFile = true
	  	}
	  },
	  ok () {
	  	localStorage.setItem("isUpdata","true")
	  }
  }
}
</script>

<style scoped></style>
