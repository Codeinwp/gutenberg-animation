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
	loop: {
		type: 'boolean',
		default: false
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
	background: {
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
	}
};

export default attributes;
