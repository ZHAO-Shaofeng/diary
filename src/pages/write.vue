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

			<div class="page-content">
				<div class="info-form">
					<textarea name="info" v-on:scroll.passive="onScroll" ref="page" placeholder="今天......" v-model="info_textarea"></textarea>
					
					<div class="fileInputBox" v-show="imgArr.length!==0">
						<div class="container">
							<div class="row" id="filetainer">
					      <div class="col s3" v-for="(item, index) in imgArr" :key="index">
					      	<div class="item">
					      		<img class="materialboxed" data-caption="" :src="item">
					      	</div>
					      	<i class="material-icons deleteImg" @click="deleteImg(index)">close</i>
					      </div>
					      <!-- <div class="col s3 newFile" v-show="newFile">
					      	<div class="item">
					      		<i class="material-icons">add</i>
					      		<input type="file" accept="image/*" multiple="multiple" @change="changeImg($event)">
					      	</div>
					      </div> -->
					    </div>
						</div>
					</div>
				</div>
			</div>
	
			<transition name="scale">
				<div class="fixed-action-btn" v-show="newFile">
					<div class="btn-floating btn-large waves-effect waves-dark red">
						<i class="material-icons">image</i>
						<input type="file" accept="image/*" multiple="multiple" @change="changeImg($event)">
					</div>
				</div>
			</transition>
	  </div>
	</transition>
</template>

<script>
export default {
  data () {
    return {
    	loading: false,
    	imgArr: [],
			imgMax: 8,
			newFile: true,
			info_textarea: ''
    }
  },
  methods: {
  	goBack () {
  		// this.$router.back()
  		this.$router.push('/home');
  	},
  	// exif.js 获取照片拍照方向信息
  	getPhotoOrientation(img) {
  		var orient
  		var that = this
  		that.$EXIF.EXIF.getData(img, () => {
    		orient = that.$EXIF.EXIF.getTag(this, "Orientation");
  		});
  		return orient;
  	},
	  changeImg(e) {
	    var that = this;
	    that.loading = true;
	    var imgLimit = 1024;
	    var files = e.target.files;
	    var image = new Image();
	    if (files.length > 0) {
	      var dd = 0;
	      var timer = setInterval(function () {
	        if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
	        	that.loading = false;
	          that.$materialize.toast({
	          	html: '请上传图片格式(png、jpeg、gif)！',
	          	displayLength: 1500
	          })
	          clearInterval(timer);
	          return false;
	        }
	        if (files.item(dd).size > imgLimit * 10240) {
	          // 文件过大
	          that.loading = false;
	          that.$materialize.toast({
	          	html: '文件过大！',
	          	displayLength: 1500
	          })
	          clearInterval(timer);
	          return false;
	        }
          image.src = window.URL.createObjectURL(files.item(dd));
          image.onload = function () {
            // 默认按比例压缩
            var w = image.width,
              	h = image.height,
              	scale = w / h
            w = 1000
            h = w / scale
            // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
            var quality = 0.97;
            that.$EXIF.EXIF.getData(files.item(dd), function () {
            	var orient = that.$EXIF.EXIF.getTag(this, "Orientation");
            	console.log(orient);
            	//生成canvas
            	var canvas = document.createElement('canvas');
            	var ctx = canvas.getContext('2d');
            	// 创建属性节点
            	var anw = document.createAttribute('width');
            	var anh = document.createAttribute('height');
            	if (orient === 6) {
		            anw.nodeValue = h;
		            anh.nodeValue = w;
		            canvas.setAttributeNode(anw);
		            canvas.setAttributeNode(anh);
								ctx.save();
								ctx.rotate(90 * Math.PI / 180);
								ctx.drawImage(image, 0, -h, w, h);
								ctx.restore();
            	} else if (orient === 8) {
            		anw.nodeValue = h;
		            anh.nodeValue = w;
		            canvas.setAttributeNode(anw);
		            canvas.setAttributeNode(anh);
								ctx.save();
								ctx.rotate(-90 * Math.PI / 180);
								ctx.drawImage(image, -w, 0, w, h);
								ctx.restore();
            	} else {
		            // 创建属性节点
		            anw.nodeValue = w;
		            anh.nodeValue = h;
		            canvas.setAttributeNode(anw);
		            canvas.setAttributeNode(anh);
		            ctx.drawImage(image, 0, 0, w, h);
            	}
            	image.style.width = '100%';
	            var base64 = canvas.toDataURL('image/jpeg', quality);
	            // 回调函数返回base64的值
	            that.loading = false
	            $(document).ready(function(){
	            	$('.materialboxed').materialbox();
	            });
	            if (that.imgArr.length <= that.imgMax - 1) {
	              that.imgArr.unshift('');
	              that.imgArr.splice(0, 1, base64);
	              // 超出最大限制就隐藏加号
	              if (that.imgArr.length >= that.imgMax) {
	                that.newFile = false;
	                that.$materialize.toast({
	                	html: '最多'+that.imgMax+'张',
	                	displayLength: 1500
	                })
	              }
	            }
            	if (dd < files.length - 1) {
            		dd++;
            	} else {
            		clearInterval(timer);
            	}
            });
          }
	      }, 700);
	    }else{
	    	that.loading = false;
	    }
	  },
	  deleteImg(index) {
	  	this.imgArr.splice(index, 1);
	  	if (this.imgArr.length < this.imgMax) {
	  		this.newFile = true;
	  	}
	  },
	  ok () {
			let json = {
		  	info: this.info_textarea,
		  	img: this.imgArr
			};
			if (this.info_textarea=='' && this.imgArr.length===0) {
				this.$materialize.toast({
					html: '日记不能为空',
					displayLength: 1500
				})
			}else{
				$.ajax({
					url: 'http://love.s1.natapp.cc/api/write.php',
				  type: 'post',
				  data: json,
				  dataType: 'json',
				  beforeSend: () => {
				  	this.loading = true
				  },
				  success: res => {
				    if (res.code === 200) {
				    	this.loading = false
				    	localStorage.setItem("isUpdata","true")
				    	setTimeout(this.goBack(),1000)
				    }
				  }
				})
			}
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
