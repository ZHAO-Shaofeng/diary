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
					      	<i class="material-icons deleteImg" @click="deleteImg">close</i>
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
			imgMax: 3,
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
	    that.loading = true	// 等待
	    var imgLimit = 1024;
	    var files = e.target.files;
	    // console.log(files);
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
	              	h = image.height,
	              	scale = w / h
	            w = 500
	            h = w / scale
	            // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
	            var quality = 1;
	            
	            // var img_orient = that.getPhotoOrientation(files.item(dd))
	            that.$EXIF.EXIF.getData(files.item(dd), function () {
	            	var orient = that.$EXIF.EXIF.getTag(this, "Orientation");
	            	if (orient == 6) {
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

									ctx.save();
									ctx.translate(w / 2, h / 2);
									ctx.rotate(90 * Math.PI / 180);
									ctx.drawImage(image, -w/2, -h/2, w, h);
									ctx.restore();

			            image.style.width = '100%';
			            var ext = image.src.substring(image.src.lastIndexOf('.') + 1).toLowerCase();//图片格式
			            var base64 = canvas.toDataURL('image/' + ext, quality);
			            that.loading = false
			            // 回调函数返回base64的值
			            // console.log(base64)
			            $(document).ready(function(){
			            	$('.materialboxed').materialbox();
			            });
			            if (that.imgArr.length <= that.imgMax - 1) {
			              that.imgArr.unshift('')
			              that.imgArr.splice(0, 1, base64);//替换数组数据的方法，此处不能使用：that.imgArr[index] = url;
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
	            	} else {
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
			            $(document).ready(function(){
			            	$('.materialboxed').materialbox();
			            });
			            if (that.imgArr.length <= that.imgMax - 1) {
			              that.imgArr.unshift('')
			              that.imgArr.splice(0, 1, base64);//替换数组数据的方法，此处不能使用：that.imgArr[index] = url;
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
	            });
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
