<?php
abstract class App_Controller extends REST_Controller
{
    public function preDispatch()
    {
        $this->_response->setHeader('X-Powered-By', 'REST Console Sandbox');
    }

    public function indexAction()
    {
        $this->notAllowed();
    }

    public function getAction()
    {
        $this->notAllowed();
    }

    public function putAction()
    {
        $this->notAllowed();
    }

    public function postAction()
    {
        $this->notAllowed();
    }

    public function deleteAction()
    {
        $this->notAllowed();
    }

    public function __call($method, $arguments = array())
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
