<?php
class IpController extends App_Controller
{
    public function __call($method = false, $arguments = array())
    {
        $this->view->origin = $this->getRequest()->getClientIp();
        $this->getResponse()->setHttpResponseCode(200);
    }
}
