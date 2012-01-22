<?php
class IpController extends App_Controller
{
    public function indexAction()
    {
        $this->view->origin = $this->getRequest()->getClientIp();
        $this->getResponse()->setHttpResponseCode(200);
    }
}
