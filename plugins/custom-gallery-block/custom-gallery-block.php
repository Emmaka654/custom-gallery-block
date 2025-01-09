<?php
/*
Plugin Name: Custom Gallery Block
Description: Блок галереи для Gutenberg.
Version: 1.0
Author: Emma
*/

function custom_gallery_block_assets()
{
    wp_enqueue_script(
        'custom-gallery-block-js',
        plugins_url('build/index.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-i18n'),
        filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
    );
}

add_action('enqueue_block_editor_assets', 'custom_gallery_block_assets');
