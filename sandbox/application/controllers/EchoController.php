<?php
class EchoController extends App_Controller
{
    public function __call($method = false, $arguments = array())
    {
        $cookies        = array();
        $headers        = array();
        $postData       = array();
        $queryString    = array();
        $headerString   = '';

        foreach ($_COOKIE as $name => $value) {
            $cookies[] = array(
                'name' => $name,
                'value' => $value
            );
        }

        foreach (http_get_request_headers() as $name => $value) {
            $headers[] = array(
                'name' => $name,
                'value' => $value
            );

            $headerString .= "{$name}: {$value}\r\n";
        }

        foreach ($_GET as $name => $value) {
            $queryString[] = array(
                'name' => $name,
                'value' => $value
            );
        }

        $postData['mimeType'] = current(explode(';', $this->_request->getHeader('Content-Type')));
        $postData['text'] = $this->_request->getRawBody();

        foreach ($_POST + $_FILES as $name => $value) {
            $postData['params'][] = array(
                'name' => $name,
                'value' => $value
            );
        }

        $this->view->url            = sprintf('%s://%s%s', $this->_request->getScheme(), $this->_request->getHttpHost(), current(explode('?', $this->_request->getRequestUri())));
        $this->view->method         = strtoupper($this->_request->getMethod());
        $this->view->httpVersion    = $this->_request->get('SERVER_PROTOCOL');
        $this->view->headersSize    = strlen($headerString);
        $this->view->bodySize       = strlen($this->_request->getRawBody());
        $this->view->cookies        = $cookies;
        $this->view->cookies        = $cookies;
        $this->view->headers        = $headers;
        $this->view->queryString    = $queryString;
        $this->view->postData       = $postData;

        $this->getResponse()->setHttpResponseCode(200);
    }
}
