<?php
class Sandbox_IpController extends Sandbox_Library_Controller
{
    public function indexAction()
    {
        $this->view->origin = $this->getRequest()->getClientIp();
        $this->getResponse()->setHttpResponseCode(200);
    }
}
