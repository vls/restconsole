<?php
class Api_View_Helper_Request extends Zend_View_Helper_Abstract
{
    public function Request($method, $resource, $query = array(), $payload = array(), $headers = array())
    {
        $headers = array(
            'Host' => 'www.miravitae.com:80'
        ) + $headers;

        $headers_out = array();

        foreach ($headers as $key => $value) {
            $headers_out[$key] = sprintf('<span class="typ">%s</span><span class="pun">:</span> <span class="pln">%s</span>', $key, $value);
        }

        if (count($headers_out) > 0) {
            $headers_out = implode("\n", $headers_out);
        } else {
            $headers_out = '';
        }

        if (count($query) > 0) {
            $resource = sprintf('<span class="com">/api/%s</span><span class="str">?%s</span>', $resource, http_build_query($query));
        } else {
            $resource = sprintf('<span class="com">/api/%s</span>', $resource);
        }

        if (count($payload) > 0) {
            switch ($headers['Content-Type']) {
                case 'application/x-www-form-urlencoded':
                    $payload_out = sprintf('<span class="nocode"><span class="str">%s</span></span>', http_build_query($payload));
                    break;

                case 'application/json':
                    $payload_out = Zend_Json::prettyPrint(Zend_Json::encode($payload), array('indent' => '    '));
                    break;

                case 'application/xml':
                    $serializer = new REST_Serializer_Adapter_Xml(array('rootNode' => 'request'));
                    $payload_out = $serializer->serialize($payload);

                    $tidy = new tidy;
                    $payload_out = $tidy->repairString($payload_out, array(
                        'indent' => true,
                        'indent-spaces' => 4,
                        'output-xml' => true,
                        'input-xml' => true,
                    ));

                    $payload_out = htmlspecialchars($payload_out);
                    break;

                default:
                    $payload_out = '';
            }
        } else {
            $payload_out = '';
        }


        return sprintf("<pre class=\"prettyprint\"><span class=\"nocode\"><span class=\"atn\">%s</span> %s <span class=\"kwd\">HTTP/1.1</span>\n%s\n\n</span>%s</pre>", $method, $resource, $headers_out, $payload_out);
    }
}
