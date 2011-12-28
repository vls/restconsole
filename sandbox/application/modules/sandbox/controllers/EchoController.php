<?php
class Sandbox_EchoController extends Sandbox_Library_Controller
{
    public function indexAction()
    {
        $this->__call();
    }

    public function getAction()
    {
        $this->__call();
    }

    public function putAction()
    {
        $this->__call();
    }

    public function postAction()
    {
        $this->__call();
    }

    public function deleteAction()
    {
        $this->__call();
    }

    public function __call($method = false, $arguments = array())
    {
        $request = $this->getRequest();

        if ($method == false) {
            $method = $request->getActionName();
        }

        if ($method == 'index') {
            $method = 'get';
        }

        if ('Action' == substr($method, -6)) {
            $method = substr($method, 0, -6);
        }

        // request object seems to loop forever doing this, use $_SERVER instead
        $this->view->uri = sprintf('%s://%s%s', $request->getScheme(), $request->getHttpHost(), current(explode('?', $_SERVER['REQUEST_URI'])));

        $this->view->method = strtoupper($method);
        $this->view->headers = http_get_request_headers();
        $this->view->query = $_GET;
        $this->view->payload = $_POST + $_FILES;

        $this->getResponse()->setHttpResponseCode(200);
    }
}
