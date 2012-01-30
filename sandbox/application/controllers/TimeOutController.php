<?php
class TimeOutController extends App_Controller
{
    public function __call($method = false, $arguments = array())
    {
        sleep((int) $this->_getParam('id'));

        $this->view->timeout = $this->_getParam('id');
        $this->getResponse()->setHttpResponseCode(200);
    }
}
