<?php

/**
 * Embed disqus in your website
 * @package Pico
 * @subpackage pico_disqus 
 * @version 1.0
 * @author Philipp Schmitt <philipp@schmitt.co> 
 * @license http://opensource.org/licenses/GPL-3.0
 * @link https://github.com/pschmitt/pico_disqus
 * @link http://pico.dev7studios.com/
 */
class Pico_Disqus {
	public function config_loaded(&$settings) {
		if (isset($settings['disqus_id'])) {
            $this->disqus_id = $settings['disqus_id'];
		}
    }
	
	public function before_render(&$twig_vars, &$twig) {
		if (!empty($this->disqus_id)) {
			$twig_vars['disqus_comments'] = '
		    <div id="disqus_thread"></div>
            <script type="text/javascript">
                /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
                var disqus_shortname = \''. $this->disqus_id .'\';

                /* * * DON\'T EDIT BELOW THIS LINE * * */
                (function() {
                    var dsq = document.createElement(\'script\'); dsq.type = \'text/javascript\'; dsq.async = true;
                    dsq.src = \'//\' + disqus_shortname + \'.disqus.com/embed.js\';
                    (document.getElementsByTagName(\'head\')[0] || document.getElementsByTagName(\'body\')[0]).appendChild(dsq);
                })();
            </script>
            <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
            <a href="http://disqus.com" class="dsq-brlink">comments powered by <span class="logo-disqus">Disqus</span></a>
            ';
		}
    }
}
