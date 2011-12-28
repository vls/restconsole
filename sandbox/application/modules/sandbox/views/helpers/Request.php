<?php
class Api_View_Helper_Request extends Zend_View_Helper_Abstract
{
    public function Request($method, $resource, $query = array(), $payload = array(), $headers = array())
    {
        $headers_out = array();

        foreach ($headers as $key => $value) {
            $headers_out[$key] = sprintf('<span class="typ">%s</span>: %s', $key, $value);
        }

        if (count($headers_out) > 0) {
            $headers_out = "\n" . implode("\n", $headers_out);
        } else {
            $headers_out = '';
        }

        if (count($query) > 0) {
            $resource = sprintf('<span class="com">/api/%s</span>?<span class="str">%s</span>', $resource, http_build_query($query));
        } else {
            $resource = sprintf('<span class="com">/api/%s</span>', $resource);
        }

        if (count($payload) > 0) {
            switch ($headers['Content-Type']) {
                case 'application/x-www-form-urlencoded':
                    $payload_out = sprintf("\n\n<span class=\"str\">%s</span>", http_build_query($payload));
                    break;

                case 'application/json':
                    $payload_out = sprintf("\n\n<span class=\"str\">%s</span>", Zend_Json::encode($payload));
                    break;

                case 'application/xml':
                    $serializer = new REST_Serializer_Adapter_Xml(array('rootNode' => 'request'));
                    $payload_out = sprintf("\n\n<span class=\"str\">%s</span>", htmlspecialchars($serializer->serialize($payload)));
                    break;

                default:
                    $payload_out = '';
            }
        } else {
            $payload_out = '';
        }


        return sprintf("<pre>\n<span class=\"atn\">%s</span> %s <span class=\"kwd\">HTTP/1.1</span>\n<span class=\"typ\">Host:</span> www.restconsole.com:80%s%s\n</pre>", $method, $resource, $headers_out, $payload_out);
    }
}
