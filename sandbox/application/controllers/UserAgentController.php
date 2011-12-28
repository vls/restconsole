<?php
class UserAgentController extends App_Controller
{
    public function indexAction()
    {
        $this->view->{'user-agent'} = $this->getRequest()->getHeader('USER-AGENT');
        $this->getResponse()->setHttpResponseCode(200);
    }
}
