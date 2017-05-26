<?php

/*
 * BASIC
 */
$config['site_title'] = 'libraries: hacked';				// Site title
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
$config['date_format'] = '%a %#d %b';	// Set the PHP date format as described here: http://php.net/manual/en/function.strftime.php
$config['pages_order_by'] = 'date';		// Order pages by "alpha" or "date"
$config['pages_order'] = 'desc';		// Order pages "asc" or "desc"
$config['content_dir'] = 'content/';	// Content directory
$config['content_ext'] = '.md';			// File extension of content files to serve
$config['excerpt_length'] = 50;			// The pages excerpt length (in words)

/*
 * DISQUS
 */
$config['disqus_id'] = 'librarieshacked';
