<template>
	<div class="new-page-container">
	  <div class="page home" v-on:scroll.passive="onScroll" ref="page">
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
			      <a href="javascript:;" class="btn-floating btn-large waves-effect waves-dark left-operate">
			      	<!-- https://xn--xkrt4xga.xn--6qq986b3xl/ -->
			      	<i class="material-icons">arrow_back</i>
			      </a>
			      <a href="javascript:;" class="brand-logo"><i class="material-icons">assignment</i></a>
			    </div>
			  </nav>
			</div>

			<div class="timeline">
				<div class="timeitem" v-for="(item, index) in dataList" :key="index">
					<div class="flexbox" @click="goInfo(item.id)">
						<div class="left">
							<div class="ico"></div>
							<div class="time">{{item.date}}</div>
						</div>
						<div class="right">
							<div class="info">{{item.info}}</div>
						</div>
					</div>
				</div>
			</div>

			<div class="fixed-action-btn">
				<div class="btn-floating btn-large waves-effect waves-dark red" @click="goWrite">
					<i class="material-icons">create</i>
				</div>
			</div>

			<div class="preloader-wrapper more-loader small active">
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

	  <router-view />
	</div>
</template>

<script>
export default {
  data () {
    return {
    	dataList: [
	   //  	{
	   //  		date: "2018-09-30",
				// 	id: "100",
				// 	img: [],
				// 	info: "啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
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
			pagesize: 10
    }
  },
  mounted () {
  	this.getData()
  },
  methods: {
  	getData () {
  		$.ajax({
			  url: 'http://localhost/hello/api/list.php',
			  type: 'get',
			  data: {
			  	page: this.page,
			  	pagesize: this.pagesize
			  },
			  dataType: 'json',
			  beforeSend: () => {
			  	this.loading = true
			  },
			  success: res => {
					this.loading = false
			    this.dataList = res.data
			    localStorage.setItem("isUpdata","false")
			  }
			})
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
  beforeRouteUpdate (to, from, next) {
  	let isUpdata = localStorage.getItem("isUpdata");
  	if (to.path == '/home') {
  		if (isUpdata === 'true') {
  			this.loading = true
  			this.getData()
  		}
  	}
  	next()
  }
}
</script>

<style scoped></style>
