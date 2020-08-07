const attributes = {
	id: {
		type: 'string'
	},
	src: {
		type: 'string'
	},
	autoplay: {
		type: 'boolean',
		default: true
	},
	direction: {
		type: 'number',
		default: 1
	},
	loopType: {
		type: 'string',
		default: 'none'
	},
	loop: {
		type: 'boolean',
		default: false
	},
	loopCount: {
		type: 'number',
		default: 0
	},
	renderer: {
		type: 'string',
		default: 'svg'
	},
	speed: {
		type: 'number',
		default: 1
	},
	controls: {
		type: 'boolean',
		default: false
	},
	backgroundColor: {
		type: 'string',
		default: '#ffffff'
	},
	hover: {
		type: 'boolean',
		default: false
	},
	height: {
		type: 'number',
		default: 400
	},
	width: {
		type: 'number',
		default: 400
	},
	mode: {
		type: 'string',
		default: 'normal'
	}
};

export default attributes;