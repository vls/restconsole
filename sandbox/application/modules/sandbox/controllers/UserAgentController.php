<?php
class Sandbox_UserAgentController extends Sandbox_Library_Controller
{
    public function indexAction()
    {
        $this->view->{'user-agent'} = $this->getRequest()->getHeader('USER-AGENT');
        $this->getResponse()->setHttpResponseCode(200);
    }
}
