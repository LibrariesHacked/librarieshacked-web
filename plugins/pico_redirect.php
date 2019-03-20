<?php

/**
 * Pico CMS redirect plugin
 *
 * @author neb
 */
 
class Pico_Redirect {

	public function before_read_file_meta(&$headers)
	{
		$headers['redirect'] = 'Redirect';
	}
	public function file_meta(&$meta)
	{
		if ($meta['redirect']) {
			header('Location: ' . $meta['redirect']);
		}
	}
}

?>
