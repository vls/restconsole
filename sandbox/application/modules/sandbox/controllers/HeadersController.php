<?php
class Sandbox_HeadersController extends Sandbox_Library_Controller
{
    public function indexAction()
    {
        $this->view->headers = http_get_request_headers();
        $this->getResponse()->setHttpResponseCode(200);
    }
}
