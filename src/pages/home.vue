<template>
	<div>
	  <div class="page home">
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
			  <nav id="nav">
			    <div class="nav-wrapper">
			      <a href="https://xn--xkrt4xga.xn--6qq986b3xl/" class="btn-floating btn-large waves-effect waves-dark left-operate">
			      	<i class="material-icons">arrow_back</i>
			      </a>
			      <a href="javascript:;" class="brand-logo" @click="showVisitLog" v-show="!is_root"><i class="material-icons">assignment</i></a>
			      <a href="javascript:;" class="brand-logo" v-show="is_root"><i class="material-icons">done</i></a>
			      <div class="right-operate more-loader" @click="isRoot">
			      	<transition name="fade">
								<div class="preloader-wrapper loadmore-icon small active" v-show="loadmore">
									<div class="spinner-layer spinner-black-only">
										<div class="circle-clipper left">
											<div class="circle"></div>
										</div><div class="gap-patch">
											<div class="circle"></div>
										</div><div class="circle-clipper right">
											<div class="circle"></div>
										</div>
									</div>
								</div>
							</transition>
			      </div>
			    </div>
			  </nav>
			</div>

			<div class="page-content" v-on:scroll.passive="onScroll" ref="page">
				<div class="timeline">
					<div class="timeitem" v-for="(item, index) in dataList" :key="index">
						<div class="flexbox" @click="goInfo(item.id)">
							<div class="left">
								<div class="ico"></div>
								<!-- <div class="time">{{item.date}}</div> -->
								<div class="time">{{item.time | formatDate}}</div>
							</div>
							<div class="right">
								<div class="info">{{item.info}}</div>
							</div>
						</div>
					</div>
					<div class="timeitem no-pdb" v-show="noData">
						<div class="flexbox">
							<div class="left">
								<div class="ico"></div>
							</div>
							<div class="right">
								<div class="info">树洞给你挖空啦</div>
							</div>
						</div>
					</div>
				</div>
				<div class="reload" v-if="booleanReload">
					<a class="btn waves-effect grey lighten-5 grey-text text-darken-4" href="javascript:;" @click="reload">重新加载</a>
				</div>
			</div>

			<div class="fixed-action-btn">
				<div class="btn-floating btn-large waves-effect waves-dark red" @click="goWrite">
					<i class="material-icons">create</i>
				</div>
			</div>

			<div id="visitLog" class="modal modal-fixed-footer">
				<div class="modal-content">
					<h5>访问记录</h5>
					<p v-for="(item, index) in visitLogList" :key="index">
						<span>{{item.time}}</span> ——— <span>{{item.is_root}}</span>
					</p>
				</div>
				<div class="modal-footer">
					<a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">关闭</a>
				</div>
			</div>
	  </div>

	  <router-view />
	</div>
</template>

<script>
export default {
  data () {
    return {
    	dataList: [
    	// {
    	// 	date: "2018-09-30",
    	// 	id: "100",
    	// 	img: [],
    	// 	info: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
    	// 	time: "2018-09-30 23:43:18"
    	// },
    	// {
    	// 	date: "2018-09-18",
    	// 	id: "92",
    	// 	img: [],
    	// 	info: "撒打算大苏打",
    	// 	time: "2018-09-18 20:52:19"
    	// }
    	],
    	loading: false,
    	page: 1,
			pagesize: 20,
			finish: true,
			noData: false,
			loadmore: false,
			is_root: false,
			visitLogList: [],
			booleanReload: false
    }
  },
  mounted () {
  	$('.modal').modal();
  	sessionStorage.setItem('root_clickCount', 0);
  	sessionStorage.setItem('visit_clickCount', 0);

  	let touchtime = new Date().getTime();
  	$("#nav").on("click", function(){
  		if( new Date().getTime() - touchtime < 500 ){
  			$(".page-content").animate({scrollTop:"0px"},800)
  		}else{
  			touchtime = new Date().getTime();
  		}
  	});

  	// this.visitLog();
  	this.getData();
  },
  methods: {
  	// 生成随机数
  	generateMixed (n) {
  		let res = "";
  		let chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
  		for(var i = 0; i < n ; i ++) {
  			var id = Math.ceil(Math.random()*35);
  			res += chars[id];
  		}
  		return res;
  	},
  	// 记录访问
  	visitLog () {
  		let uid = sessionStorage.getItem('uid');
	  	if (!uid) {
	  		$.ajax({
	  			url: 'http://love.s1.natapp.cc/api/visit.php',
	  			type: 'post',
	  			data: {
	  				uid: this.generateMixed(10),
	  				url: 'http://love.s1.natapp.cc'
	  			},
	  			dataType: 'json',
	  			success: function(res){
	  				sessionStorage.setItem('uid', res.data.uid);
	  			}
	  		})
	  	}
  	},
  	isRoot () {
  		let that = this;
  		let count = sessionStorage.getItem('root_clickCount');
  		let uid = sessionStorage.getItem('uid');
  		if (count) {
  			if (parseInt(count) >= 4) {
  				$.ajax({
  					url: 'http://love.s1.natapp.cc/api/is_root.php',
  					type: 'post',
  					data: {
  						uid: uid
  					},
  					dataType: 'json',
  					beforeSend: () => {
  						that.loadmore = true;
  					},
  					success: function(res){
  						that.is_root = true;
  						that.loadmore = false;
  						setTimeout(() => {
  							that.is_root = false;
  						},1500)
						}
					})
  				sessionStorage.setItem('root_clickCount', 0);
  			}else{
  				count = parseInt(count)+1
  				sessionStorage.setItem('root_clickCount', count);
  			}
  		}else{
  			sessionStorage.setItem('root_clickCount', 0);
  		}
  	},
  	// 展示访问记录
  	showVisitLog () {
  		let that = this;
  		let count = sessionStorage.getItem('visit_clickCount');
  		if (count) {
  			if (parseInt(count) >= 4) {
  				$.ajax({
  					url: 'http://love.s1.natapp.cc/api/show_visit.php',
  					type: 'get',
  					dataType: 'json',
  					success: function(res){
  						that.visitLogList = res.data;
  					}
  				})
  				$('#visitLog').modal('open');
  				sessionStorage.setItem('visit_clickCount', 0);
  			}else{
  				count = parseInt(count)+1
  				sessionStorage.setItem('visit_clickCount', count);
  			}
  		}else{
  			sessionStorage.setItem('visit_clickCount', 0);
  		}
  	},
  	getData () {
  		$.ajax({
			  url: 'http://love.s1.natapp.cc/api/list.php',
			  timeout: 10000,
			  type: 'get',
			  data: {
			  	page: this.page,
			  	pagesize: this.pagesize
			  },
			  dataType: 'json',
			  beforeSend: () => {
			  	this.loading = true
			  	this.booleanReload = false
			  },
			  success: res => {
					this.loading = false
			    this.dataList = res.data
			    localStorage.setItem("isUpdata","false")
			  },
			  complete: (XMLHttpRequest,status) => {
			  	if(status=='timeout'){
			  		this.loading = false
			  		this.booleanReload = true
			  		this.$materialize.toast({
			    		html: '请求超时',
			    		displayLength: 1500
			    	})
			  	}
			  }
			})
  	},
  	reload () {
  		this.getData();
  	},
  	hasClass (ele, cls) {
			return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
		},
		addClass (ele, cls) {
			if (!this.hasClass(ele, cls)) ele.className += " " + cls;
		},
		removeClass (ele, cls) {
			if (this.hasClass(ele, cls)) {
				var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
				ele.className = ele.className.replace(reg, " ");
			}
		},
  	onScroll () {
  		let ele = document.getElementById("nav")
  		if (this.$refs.page.scrollTop > 0) {
  			this.addClass(ele, "shadow")
  		} else {
  			this.removeClass(ele, "shadow")
  		}

  		let scrollTop = this.$refs.page.scrollTop;
  		let windowHeight = this.$refs.page.clientHeight;
  		let scrollHeight = this.$refs.page.scrollHeight;
  		if((scrollTop / (scrollHeight - windowHeight) >= 0.7) && this.finish){
  			this.finish = false
  			this.loadmore = true
  			$.ajax({
  				url: 'http://love.s1.natapp.cc/api/list.php',
  				type: 'get',
  				timeout: 10000,
  				data: {
  					page: this.page+1,
  					pagesize: this.pagesize
  				},
  				dataType: 'json',
  				success: res => {
  					if (res.data.length > 0) {
	  					this.dataList = this.dataList.concat(res.data)
	  					this.page += 1
	  					this.finish = true
	  					this.loadmore = false
	  				}else{
			    		this.noData = true
				    	this.finish = false
				    	this.loadmore = false
				    }
  				},
  				complete: (XMLHttpRequest,status) => {
  					if(status=='timeout'){
  						this.loadmore = false
  						this.finish = true
  						this.$materialize.toast({
  							html: '请求超时',
  							displayLength: 1500
  						})
  					}
  				}
  			})
  		}
  	},
  	goInfo (id) {
  		this.$router.push({
  			path: '/home/info',
  			query: {
  				id: id
  			}
  		})
  	},
  	goWrite () {
  		this.$router.push('/home/write')
  	}
  },
  filters: {
  	formatDate(obj) {
  		if (obj) {
  			let stamp = Date.parse(obj.replace(/-/gi, "/"));
  			let publishTime = stamp / 1000,
  			d_seconds,
  			d_minutes,
  			d_hours,
  			d_days,
  			timeNow = parseInt(new Date().getTime() / 1000),
  			d,

  			date = new Date(publishTime * 1000),
  			Y = date.getFullYear(),
  			M = date.getMonth() + 1,
  			D = date.getDate(),
  			H = date.getHours(),
  			m = date.getMinutes(),
  			s = date.getSeconds();
		    //小于10的在前面补0
		    if (M < 10) {
		    	M = '0' + M;
		    }
		    if (D < 10) {
		    	D = '0' + D;
		    }
		    if (H < 10) {
		    	H = '0' + H;
		    }
		    if (m < 10) {
		    	m = '0' + m;
		    }
		    if (s < 10) {
		    	s = '0' + s;
		    }

		    d = timeNow - publishTime;
		    d_days = parseInt(d / 86400);
		    d_hours = parseInt(d / 3600);
		    d_minutes = parseInt(d / 60);
		    d_seconds = parseInt(d);

		    if (d_days > 0 && d_days < 3) {
		    	return d_days + '天前';
		    } else if (d_days <= 0 && d_hours > 0) {
		    	return d_hours + '小时前';
		    } else if (d_hours <= 0 && d_minutes > 0) {
		    	return d_minutes + '分钟前';
		    } else if (d_seconds < 60) {
		    	if (d_seconds <= 0) {
		    		return '刚刚发表';
		    	} else {
		    		return d_seconds + '秒前';
		    	}
		    } else if (d_days >= 3) {
		      return Y + '-' + M + '-' + D;//+ '&nbsp;' + H + ':' + m;
		    }
		  }
		  return obj
		},
  },
  beforeRouteUpdate (to, from, next) {
  	let isUpdata = localStorage.getItem("isUpdata");
  	if (to.path == '/home') {
  		if (isUpdata === 'true') {
  			this.loading = true
  			this.noData = false
	    	this.finish = true
  			this.page = 1
  			this.$refs.page.scrollTop = 0
  			this.getData()
  		}
  	}
  	next()
  }
}
</script>

<style scoped></style>
