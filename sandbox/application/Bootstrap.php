<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    public function _initREST()
    {
        $frontController = Zend_Controller_Front::getInstance();

        // set custom request object
        $frontController->setRequest(new REST_Controller_Request_Http);

        // add the REST route for the API module only
        $restRoute = new App_Rest_Route($frontController, array(), array('sandbox' => array('home')));
        $frontController->getRouter()->addRoute('rest', $restRoute);
    }

    protected function _initViewSetup()
    {
        // Initialize view
        $this->bootstrap('view');
        $view = $this->getResource('view');

        // allow directory traversal
        $view->setLfiProtection(false);

        $view->doctype('HTML5');
        $view->headTitle('REST Console Sandbox');
        $view->headTitle()->setSeparator(' | ');

        // Add it to the ViewRenderer
        $viewRenderer = Zend_Controller_Action_HelperBroker::getStaticHelper('ViewRenderer');
        $viewRenderer->setView($view);

        // Return it, so that it can be stored by the bootstrap
        return $view;
    }
}
