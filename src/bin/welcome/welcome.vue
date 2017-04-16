<template>
<transition name="destroy">
	<div id="welcome" v-show="shouldDestroy">
		<transition name="fade">
			<div class="WelcomeMain" v-show="shouldShow">
				<button type="btn" class="login-btn" data-toggle="modal" data-target="#login">
					<span>LogIn</span>
				</button>
				<transition name="downTop">
					<span class="welcomeMainTitle" v-show="shouldShowDetail">
						Welcome to Jeffery Liang web!
					</span>
				</transition>
				<transition name="downAbout">
					<span class="minTitle" v-show="shouldShowDetail">
						this is jeffery Gradution Project
					</span>
				</transition>
				<transition name="downAbout">
					<span class="minTItle" v-show="shouldShowDetail">
						And
					</span>
				</transition>
				<transition name="downAbout">
					<span class="minTItle" v-show="shouldShowDetail">
						this web is building now.
					</span>
				</transition>
				<transition name="downAbout">
					<span class="author" v-show="shouldShowDetail">
						If you feel this web is great,you can focus 
						<a href="http://weibo.com/q693197859" target="_blank">{{ author }}</a>
						in here. 
					</span>
				</transition>
				<transition name="downAbout">
					<button class="Go" @click="go()" v-show="shouldShowDetail">
						Let us go into the Web
					</button>
				</transition>
			</div>
		</transition>
		<transition name="up">
			<div class="WelcomeFoot" v-show="shouldShow">
				<img :src="vue_img">
				<span>This web is base on Vue.js</span>
				<a href="https://cn.vuejs.org/v2/guide/installation.html" target="_blank" class="spanLink">
					@Vue.js
				</a>
			</div>
		</transition>
		<dlg dialogId="login" title="login">
			<div slot="modal-body" class="modal-body">
				<div class="input-group">
					<span class="input-group-addon">User</span>
					<input type="text" class="form-control" v-model="user" placeholder="user name">
				</div>
				<div class="input-group">
					<span class="input-group-addon">Password</span>
					<input type="password" class="form-control" v-model="password" placeholder="password">
				</div>
				<span>tips:this is admin entrance</span>
			</div>
			<div slot="modal-footer" class="modal-footer">
				<button type="button" class="btn btn-primary" @click="login()">login</button>
			</div>
		</dlg>
	</div>
</transition>
</template>

<script type="text/javascript">
import dlg from '@/components/Modal.vue'
import { mapState } from 'vuex'
export default {
	components:{
		dlg:dlg
	},
	data () {
		return {
			author: 'Jeffery Liang',
			vue_img: require('@/assets/img/logo.png'),
			shouldShow: false,
			shouldShowDetail: false,
			shouldDestroy: true,
			user: '',
			password: ''
		}
	},
	//构造方法
	created () {
		var self = this;
		self.shouldShow = true;
		setTimeout(()=>{
			self.shouldShowDetail = true;
		},1000);
		console.log(this.count);
	},
	//内部方法
	methods: {
		go() {
			this.shouldDestroy = false;
			setTimeout(()=>{
				this.$router.push('index');
			},500);
		},
		login() {
			console.log('UserName',this.user);
			console.log('Password',this.password);
		}
	},
	computed:{
		local () {
			return 123
		},
		...mapState(['count'])
	}
	
};
</script>

<style lang="less" scoped>
@backgroundBlue:#247db0;
@fontBlue:@backgroundBlue;
//动画
.destroy{
	&-enter,&-leave-active{
		transform: translateX(-100%);
	}
	&-enter-active,&-leave-active{
		transition: all .5s;
	}
}
.fade{
	&-enter,&-leave-active{
		transform: translateX(-100%);
	}
	&-enter-active,&-leave-active{
		transition: all 1s;
	}
}
.down(@fontSize){
	&-enter,&-leave-active{
		//font-size: @fontSize;
		transform: translateY(-100px);
		opacity: 0;
	}
	&-enter-active,&-leave-active{
		transition: all .5s;
	}
}
.downTop{
	.down(2em);
}
.downAbout{
	.down(1em);
}
.up{
	&-enter{
		transform: translateY(100%);
	}
	&-leave-active{
		transform: translateY(100%);
		transition: all 1s;
	}
	&-enter-active{
		transition: all 1s;
	}
}
//
.modal-margin{
	@media screen and (max-width: 768px){
		width:60%;
		margin-left: 20%;
	}
	width:80%;
	margin-left: 10%;
}
#welcome{
	display:-webkit-flex;
	display:flex;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
	font-size:1.6rem;
}
.WelcomeMain{
	position: relative;
	//min-height: 220px;
	min-width: 100%;
	padding: 10px 20px;
	background-color: #247db0;
	display: -webkit-flex;
	display: flex;
	-webkit-flex:8;
	flex:8;
	flex-direction: column;
	justify-content: center;
	span{
		color: white;
		margin-top:10px;
	}
	.welcomeMainTitle{
		font-size: 3rem;
	}
	.minTitle{
		font-size: 2rem;
	}
	.author{
		a{
			color: rgba(255,255,255,.5);
			text-decoration: none;
			&:hover{
				text-decoration: underline;
			}
		}
	}
	.Go{
		min-width: 0px;
		width: 200px;
		height: 50px;
		margin-top: 25px;
		margin-left: auto;
		margin-right: auto;
		background-color:white;
		border:0;
		border-radius: 25px;
		color: #247db0;
		font-size: 0.8rem;
		cursor: pointer;
	}
	.login-btn{
		position: absolute;
		top:5%;
		right: 5%;
		border:2px solid white;
		background-color:white;
		padding:10px 20px;
		border-radius: 20px;
		overflow: hidden;
		span{
			position:relative;
			color: @fontBlue;
			font-size: 20px;
			font-weight: 600;
			z-index: 2;
			transition: color .5s;
		}
		&:focus{
			outline: none;
		}
		&:hover{
			span{
				color:white;
			}
			&:after{
				clip-path: circle(100% at 50% 50%);
			  -webkit-clip-path: circle(100% at 50% 50%);
			}
		}
		&:after{
			content:"";
			position: absolute;
			z-index: 1;
			width:100%;
			height: 100%;
			top: 0px;
			left: 0px;
			background-color:@backgroundBlue;
			clip-path: circle(0% at 50% 50%);
			-webkit-clip-path: circle(0% at 50% 50%);
			transition: all .5s;
		}
	}
}
.WelcomeFoot{
	min-height: 120px;
	height: auto;
	min-width: 100%;
	display: -webkit-flex;
	display: flex;
	// -webkit-flex: auto;
	// flex: auto;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	img{
		width: 50px;
		height: 50px;
	}
	span{
		margin-left: 10px;
	}
	.spanLink{
		margin: 10px;
		color:@fontBlue;
		text-decoration: none;
		transition: all .5s;
		&:hover{
			color: #247db0;
		}
	}
}
#login{
	.modal-content{
		background-color:rgba(255,255,255,.8);
	}
	.modal-header{
		border-bottom: none;
	}
	.modal-body{
		.modal-margin;
		.input-group{
			width:100%;
			margin:20px 0px;
			.input-group-addon{
				width:100px;
				font-weight: 700;
			}
		}
	}
	.modal-footer{
		border-top: none;
		.modal-margin;
	}
}
</style>