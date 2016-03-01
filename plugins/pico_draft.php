<?php

/**
 * Plugin for Draft integration
 *
 * @author Zvonko Biškup
 * @link http://www.codeforest.net
 * @license http://opensource.org/licenses/MIT
 * @version 1.0
 */
class Pico_Draft {

	public function request_url(&$url)
	{
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'apis/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'apps/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'articles/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'events/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'otherdata/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'source/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'tutorials/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'hardware/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'tools/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'examples/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'resources/' . $fileName, $payload->content);
			}
			exit;
		}
		if ('' == $url) {
			if ($_POST['payload']) {
				$payload = json_decode($_POST['payload']);
				$fileName = strtolower($payload->name) . CONTENT_EXT;
				@file_put_contents(CONTENT_DIR . 'international/' . $fileName, $payload->content);
			}
			exit;
		}
	}
}