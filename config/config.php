<?php

$config['site_title'] = 'libraries hacked';					// Site title
$config['base_url'] = 'http://staging.librarieshacked.org';	// Override base URL (e.g. http://example.com)

$config['theme'] = 'bootstrap'; 							// Set the theme (defaults to "default")
$config['pages_order_by'] = 'date';							// Order pages by "alpha" or "date"
$config['pages_order'] = 'desc';							// Order pages "asc" or "desc"
$config['cache_enabled'] = false;							// default
$config['cache_dir'] = 'content/cache/';					// default
$config['cache_time'] = '604800';							// 60*60*24*7, seven days (default)
$config['disqus_id'] = 'librarieshacked';

$config['contact'] = array(
    'post' => $_POST,
    'send_to' => 'info@librarieshacked.org',
);

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

$config['rewrite_url'] = true;

$config['twig_config'] = array(			// Twig settings
	'cache' => false,					// To enable Twig caching change this to CACHE_DIR
	'autoescape' => false,				// Autoescape Twig vars
	'debug' => false					// Enable Twig debug
);

/*

$config['date_format'] = 'jS M Y';		// Set the PHP date format
$config['pages_order_by'] = 'alpha';	// Order pages by "alpha" or "date"
$config['pages_order'] = 'asc';			// Order pages "asc" or "desc"
$config['excerpt_length'] = 50;			// The pages excerpt length (in words)

// To add a custom config setting:
$config['custom_setting'] = 'Hello';	// Can be accessed by {{ config.custom_setting }} in a theme

*/