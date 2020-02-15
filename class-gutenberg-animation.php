<?php
/**
 * Class for Animation logic.
 *
 * @package gutenberg-animation
 */

namespace ThemeIsle;

/**
 * Class GutenbergAnimation
 */
class GutenbergAnimation {

	/**
	 * The main instance var.
	 *
	 * @var GutenbergAnimation
	 */
	public static $instance = null;

	/**
	 * Holds the module slug.
	 *
	 * @since   1.0.0
	 * @access  protected
	 * @var     string $slug The module slug.
	 */
	protected $slug = 'gutenberg-animation';

	/**
	 * Initialize the class
	 */
	public function init() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_editor_assets' ) );
		add_action( 'enqueue_block_assets', array( $this, 'enqueue_block_frontend_assets' ) );
		add_action( 'init', array( $this, 'add_attributes_to_blocks' ), 11 );
	}

	/**
	 * Load Gutenberg editor assets.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function enqueue_editor_assets() {
		if ( THEMEISLE_GUTENBERG_ANIMATION_DEV ) {
			$version = time();
		} else {
			$version = THEMEISLE_GUTENBERG_ANIMATION_VERSION;
		}

		wp_enqueue_script(
			'themeisle-gutenberg-animation',
			plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/build.js',
			array( 'wp-i18n', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-editor', 'wp-element', 'wp-hooks' ),
			$version,
			true
		);

		wp_set_script_translations( 'themeisle-gutenberg-animation', 'textdomain' );
	}

	/**
	 * Load Gutenberg assets.
	 *
	 * @since   1.0.0
	 * @access  public
	 */
	public function enqueue_block_frontend_assets() {
		if ( function_exists( 'is_amp_endpoint' ) && is_amp_endpoint() ) {
			return;
		}
		if ( THEMEISLE_GUTENBERG_ANIMATION_DEV ) {
			$version = time();
		} else {
			$version = THEMEISLE_GUTENBERG_ANIMATION_DEV;
		}
		wp_enqueue_style(
			'animate-css',
			plugin_dir_url( $this->get_dir() ) . $this->slug . '/assets/css/animate.min.css',
			array(),
			$version
		);

		wp_enqueue_style(
			'themeisle-gutenberg-animation-style',
			plugin_dir_url( $this->get_dir() ) . $this->slug . '/assets/css/style.css',
			array(),
			$version
		);

		if ( is_admin() ) {
			return;
		}

		wp_enqueue_script(
			'themeisle-gutenberg-animation-frontend',
			plugin_dir_url( $this->get_dir() ) . $this->slug . '/build/animate.js',
			array(),
			$version,
			true
		);
	}

	/**
	 * Adds the `hasCustomCSS` and `customCSS` attributes to all blocks, to avoid `Invalid parameter(s): attributes`
	 * error in Gutenberg.
	 *
	 * @since   1.0.3
	 * @access  public
	 */
	public function add_attributes_to_blocks() {
		$registered_blocks = \WP_Block_Type_Registry::get_instance()->get_all_registered();

		foreach ( $registered_blocks as $name => $block ) {
			$block->attributes['hasCustomCSS'] = array(
				'type'    => 'boolean',
				'default' => false,
			);

			$block->attributes['customCSS'] = array(
				'type'    => 'string',
				'default' => '',
			);
		}
	}

	/**
	 * Method to return path to child class in a Reflective Way.
	 *
	 * @since   1.0.0
	 * @access  protected
	 * @return  string
	 */
	protected function get_dir() {
		return dirname( __FILE__ );
	}

	/**
	 * The instance method for the static class.
	 * Defines and returns the instance of the static class.
	 *
	 * @static
	 * @since 1.0.0
	 * @access public
	 * @return GutenbergAnimation
	 */
	public static function instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
			self::$instance->init();
		}

		return self::$instance;
	}

	/**
	 * Throw error on object clone
	 *
	 * The whole idea of the singleton design pattern is that there is a single
	 * object therefore, we don't want the object to be cloned.
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function __clone() {
		// Cloning instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}

	/**
	 * Disable unserializing of the class
	 *
	 * @access public
	 * @since 1.0.0
	 * @return void
	 */
	public function __wakeup() {
		// Unserializing instances of the class is forbidden.
		_doing_it_wrong( __FUNCTION__, esc_html__( 'Cheatin&#8217; huh?', 'textdomain' ), '1.0.0' );
	}
}
