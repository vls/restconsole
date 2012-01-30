<?php
abstract class App_Controller extends REST_Controller
{
    public function preDispatch()
    {
        $this->_response->setHeader('X-Powered-By', 'REST Console Sandbox');
    }

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
        $this->notAllowed();
    }

    protected function notAllowed()
    {
        $this->view->error = array(
            'status' => 405,
            'message' => 'Method Not Allowed'
        );

        $this->getResponse()->setHttpResponseCode(405);
    }
}
