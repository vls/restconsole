<?php
class HeadersController extends App_Controller
{
    public function indexAction()
    {
        $this->view->headers = http_get_request_headers();
        $this->getResponse()->setHttpResponseCode(200);
    }
}
