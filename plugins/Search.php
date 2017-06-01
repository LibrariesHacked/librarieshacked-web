<?php

/**
 * Search plugin
 * Description: Provides a simple JSON search interface with search term to the site content.
 * Author: Dave
 */

class Search {
	
	protected $is_search = false;
	
	public function onRequestUrl(&$url)
	{
		// Are we looking for /search
		if($url == 'search' and $_POST['search']) $this->is_search = true;
	}
	
	public function onPagesLoaded(array &$pages, array &$currentPage = null, array &$previousPage = null, array &$nextPage = null)
	{
		if($this->is_search and $_POST['search'])
		{
			$search = $_POST['search']; 
			$results = array();
			foreach( $pages as $key => $page ){
				if ( ((strpos($page['content'],$search) !== false) 
					or (strpos($page['tags'],$search) !== false)
					or (strpos($page['description'],$search) !== false)
					or (strpos($page['title'],$search) !== false))
					and $page['type'] != '')
				{
					$object = new StdClass;
					$object->type = $page['type'];
					$object->title = $page['title'];
					$object->description = $page['description'];
					$object->url = $page['url'];
					array_push($results, $object);
				}
			}
			header($_SERVER['SERVER_PROTOCOL'].' 200 OK'); // Override 404 header
			header("Content-Type: application/json; charset=UTF-8");
			echo json_encode($results);
			exit;
		}
	}
}

?>