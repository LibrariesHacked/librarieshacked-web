<?php 

/**
 * Simple contact form for the micro CMS Pico.
 *
 * @author Klas Gidlöv
 * @link http://gidlov.com/code/
 * @license LGPL
 */

define('CONTACT_MESSAGE', '<!--CONTACT-MESSAGE-->');

class Contact {

	private $validation;
	private $message;
	private $error;
	private $post;

    public function config_loaded(&$settings) {
	
		// Missing config settings.
		if (empty($settings['contact']))
			return;
		// No post request.
		if (empty($settings['contact']['post']))
			return;
		$this->contact = $settings['contact'];
		$this->post = $settings['contact']['post'];


		// Post to this form was made.
		if (isset($this->post['contact']) AND $this->post['contact'] == 'true') {
			foreach (array('name', 'mail', 'message') as $value) {
				if ($value == 'mail') {
					if (filter_var($this->post['mail'], FILTER_VALIDATE_EMAIL) === false) {
						$this->validation[$value] = isset($this->contact['validation_messages']['invalid_mail']) ? sprintf($this->contact['validation_messages']['invalid_mail'], $value) : "A valid {$value} is required.";;
					}
				}
				if (empty($this->post[$value])) {
					$this->validation[$value] = isset($this->contact['validation_messages']['required']) ? sprintf($this->contact['validation_messages']['required'], $value) : "The {$value}-field is required.";
				}
			}
			
			// No validation validation, proceed sending the email.
			if (count($this->validation) == 0) {
				// Check if "from" email address is valid
				$subject = isset($this->post['subject']) ? $this->post['subject'] : '';
				$message = $this->post['message'];
				$to = $this->contact['send_to'];
				$from = $this->post['mail']; // sender
				$headers = 'From: '. $from . "\r\n" .
					'Reply-To: webmaster@example.com' . "\r\n" .
					'X-Mailer: PHP/' . phpversion();
					
				// message lines should not exceed 70 characters (PHP rule), so wrap it
				$message = wordwrap($message, 70);
				// send mail
				mail($to,$subject,$message,"From: $from\n");
			}
		}
	}
	
	public function after_render(&$output) {
	
		// Show validation failures.
		if (isset($this->validation)) {
			$validation = '';
				foreach ($this->validation as $section => $value) {
					if (isset($value) AND $value != '') {
						if (isset($this->contact['error_class'])) {
							$output = preg_replace('/<input(.*?name="'.$section.'".*?class=".*?)"/ms', '<input$1 '.$this->contact['error_class'].'"', $output);
						}
						$validation .= $value."<br />\n";
					}
				}
			if ($validation) {
				$message = isset($this->contact['alert_messages']['validation_error']) ? $this->contact['alert_messages']['validation_error'] : '<div class="alert alert-danger"><h4>Validation Failed!</h4><p>%1$s</p></div>';
				$output = preg_replace('/'.CONTACT_MESSAGE.'/ms', sprintf($message, $validation), $output);
			}
		}
		if ($this->message) {
			$message = isset($this->contact['alert_messages']['success']) ? $this->contact['alert_messages']['success'] : '<div class="alert alert-success"><h2>Thanks for your message!</h2><p>I will reply as soon as possible.</p></div>';
			$output = preg_replace('/'.CONTACT_MESSAGE.'/ms', $message, $output);
		}
		if ($this->error) {
			$message = isset($this->contact['alert_messages']['error']) ? $this->contact['alert_messages']['error'] : '<div class="alert alert-danger"><h2>Whops, error!</h2><p>Your message could not be sent. Sorry. %1$s</p></div>';
			$output = preg_replace('/'.CONTACT_MESSAGE.'/ms', sprintf($message, $this->error), $output);
		}
		// User input.
		if (empty($this->post))
			return;
		foreach ($this->post as $key => $value) {
			if ($key == 'message') {
				$output = preg_replace('/<textarea(.*?)><\/textarea>/', '<textarea$1>'.$value.'</textarea>', $output);	
			} else {
				$output = preg_replace('/<input(.*?)name="'.$key.'"/ms', "<input$1name='{$key}' value='{$value}'", $output);
			}
		}

		if (isset($this->post['contact']) AND $this->post['contact'] == 'true' AND count($this->validation) == 0) {
			$output = str_replace("message-thanks-hidden", "message-thanks-showing", $output);
			$output = str_replace("message-form-showing", "message-form-hidden", $output);
		}
	}
}