<template>
	<div class="modal fade" :id="dialogId" tabindex="-1" role="dialog">
		<div class="modal-dialog" :class="{'modal-lg': bigSize}" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">{{ title }}</h4>
				</div>
				<slot name="modal-body"></slot>
				<slot name="modal-footer"></slot>
			</div>
		</div>
	</div>
</template> 

<script>
export default {
	props:{
		dialogId:{
			type:String,
			required:true
		},
		title:{
			type:String,
			default: 'Nothing'
		},
		bigSize:{
			type:Boolean,
			default:false
		}
	},
	data () {
		return {

		}
	}
}
</script>

<style lang="less" scoped>

</style>