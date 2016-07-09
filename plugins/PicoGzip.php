<?php

/**
 * Gzip plugin for PicoCMS (http://picocms.org/)
 *
 * Use this plugin to enable gzip compression on your content. Prior to
 * compressing the output the browsers `Accept-Encoding` request header field
 * is checked. In case gzip compression is supported, compression will
 * be applied.
 *
 * By default, all pages will be compressed before they are being
 * sent back to the user. Use the `Gzip: false` header in any
 * of your pages to disable compression.
 *
 * @author Jonas Wilhelm
 * @link https://tworabbits.de/
 * @repository https://github.com/tworabbits/Pico-Gzip
 * @license http://opensource.org/licenses/MIT
 */

class PicoGzip extends AbstractPicoPlugin
{

    /**
     * The config key used to define the gzip compression level
     */
    const GZIP_COMPRESSION_LEVEL_CONFIG_KEY = 'gzip_compression_level';

    /**
     * Default compression level when not defined in config
     */
    const GZIP_COMPRESSION_LEVEL_DEFAULT    = 9;

    /**
     * Registers the `Gzip` meta header fields.
     *
     * @see    Pico::getMetaHeaders()
     * @param  array<string> &$headers list of known meta header fields
     * @return void
     */
    public function onMetaHeaders(&$headers)
    {
        $headers['gzip'] = 'Gzip';
    }

    /**
     * Evaluates the `gzip_compression_level` config parameter and
     * sets the default value when omitted.
     *
     * @see    Pico::getConfig()
     * @param  array &$config array of config variables
     * @return void
     */
    public function onConfigLoaded(array &$config)
    {

        if (!$this->enabled) {
            return;
        }

        if (!extension_loaded('zlib'))
        {
            throw new RuntimeException(
                'The Zlib library is required to enable content encoding. Please disable the ' + __CLASS__ + ' plugin'
            );
        }

        if (!isset($config[self::GZIP_COMPRESSION_LEVEL_CONFIG_KEY]))
        {
            $config[self::GZIP_COMPRESSION_LEVEL_CONFIG_KEY] = self::GZIP_COMPRESSION_LEVEL_DEFAULT;
        }

    }

    /**
     * Sets the Content-Encoding response header field to 'gzip' and
     * compresses the output which will be sent to the user
     *
     * @param  string &$output contents which will be sent to the user
     * @return void
     */
    public function onPageRendered(&$output)
    {

        $meta = $this->getPico()->getFileMeta();
        if (false === $meta['gzip'])
        {
            return;
        }

        if (false === strstr($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip'))
        {
            return;
        }

        header('Content-Encoding: gzip');
        $output = gzencode($output, $this->getConfig(self::GZIP_COMPRESSION_LEVEL_CONFIG_KEY), FORCE_GZIP);

    }
}