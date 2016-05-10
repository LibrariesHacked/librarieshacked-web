<?php

/*
 * BASIC
 */
$config['site_title'] = 'libraries hacked';					// Site title
$config['base_url'] = 'https://www.librarieshacked.org';	// Override base URL (e.g. http://example.com)
$config['rewrite_url'] = true;								// A boolean indicating forced URL rewriting

/*
 * THEME
 */
$config['theme'] = 'bootstrap';		// Set the theme (defaults to "default")
$config['twig_config'] = array(		// Twig settings
	'cache' => 'content/cache',		// To enable Twig caching change this to a path to a writable directory
	'autoescape' => false,			// Auto-escape Twig vars
	'debug' => false				// Enable Twig debug
);

/*
 * CONTENT
 */
$config['date_format'] = '%D %T';		// Set the PHP date format as described here: http://php.net/manual/en/function.strftime.php
$config['pages_order_by'] = 'date';		// Order pages by "alpha" or "date"
$config['pages_order'] = 'desc';		// Order pages "asc" or "desc"
$config['content_dir'] = 'content/';	// Content directory
$config['content_ext'] = '.md';			// File extension of content files to serve
$config['excerpt_length'] = 50;			// The pages excerpt length (in words)

/*
 * DISQUS
 */
$config['disqus_id'] = 'librarieshacked';

/*
 * CONTACT FORM
 */
$config['contact'] = array(
    'post' => $_POST,
    'send_to' => 'info@librarieshacked.org',
);

/*
 * NANO RESOURCES PLUGIN
 */
$config["nano_resources"] = array(
    "css" => array(
        "files" => array(
            "site" => array(
                "css/custom.css",
				"css/ripples.css",
				"css/roboto.css",
				"css/font-awesome.css",
				"css/jquery-ui-1.10.4.custom.css"
            )
        ),
        "vars" => array(),
        "minify" => true
    ),
    "js" => array(
        "files" => array(
            "site" => array(
				"js/jquery-1.11.3.min.js",
				"js/jquery-ui-1.10.4.custom.js",
				"js/bootstrap.min.js",
				"js/vendor/modernizr-2.6.1.min.js",
				"js/vendor/selectivizr-min.js",
				"js/ripples.min.js",
				"js/material.min.js",
				"js/custom.js"
            )
        ),
        "vars" => array(),
		"minify" => true
    ),
	"debug" => false
);

// To add a custom config setting:
// $config['custom_setting'] = 'Hello';	// Can be accessed by {{ config.custom_setting }} in a theme