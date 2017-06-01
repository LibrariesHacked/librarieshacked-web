<?php

/**
 * Json pages plugin
 * Description: Provides a simple JSON pages file
 * Author: Dave
 */

final class JsonPages extends AbstractPicoPlugin 
{
	private $is_jsonpages = false;

	public function onRequestUrl(&$url)
	{
		// Are we looking for /pages
		if($url == 'pages') $this->is_jsonpages = true;
	}

	public function onPagesLoaded(array &$pages, array &$currentPage = null, array &$previousPage = null, array &$nextPage = null)
	{
		if($this->is_jsonpages)
		{
			$pages_json = array();
			foreach( $pages as $key => $page ) 
			{
				$object = new StdClass;
					$object->title = $page['title'];
					$object->description = $page['description'];
					$object->type = $page['meta']['type'];
					$object->date = $page['meta']['date'];
					$object->url = $page['url'];
					array_push($pages_json, $object);
			}
			header($_SERVER['SERVER_PROTOCOL'].' 200 OK');
			header("Content-Type: application/json; charset=UTF-8");
			echo json_encode($pages_json);
			exit;
		}
	}
}
?>