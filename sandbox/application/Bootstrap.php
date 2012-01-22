<?php
class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{
    protected function _initREST()
    {
        $frontController = Zend_Controller_Front::getInstance();

        // set custom request object
        $frontController->setRequest(new REST_Controller_Request_Http);

        // register the RestHandler plugin
        $frontController->registerPlugin(new REST_Controller_Plugin_RestHandler($frontController));

        // add the REST route
        $restRoute = new App_Rest_Route($frontController);
        $frontController->getRouter()->addRoute('rest', $restRoute);

        // add REST contextSwitch helper
        $contextSwitch = new REST_Controller_Action_Helper_ContextSwitch();
        Zend_Controller_Action_HelperBroker::addHelper($contextSwitch);

        // add restContexts helper
        $restContexts = new REST_Controller_Action_Helper_RestContexts();
        Zend_Controller_Action_HelperBroker::addHelper($restContexts);
    }

    protected function _initOAuthParams()
    {
        $headers = http_get_request_headers();

        if (array_key_exists('Authorization', $headers)) {
            $header = $headers['Authorization'];
        } elseif (array_key_exists('authorization', $headers)) {
            $header = $headers['authorization'];
        }

        if (isset($header)) {
            preg_match_all("/(oauth_[a-z_-]*)=(?:\"([^\"]*)\"|([^,]*))/", $header, $matches, PREG_SET_ORDER);

            $oauth_params = array();

            foreach ($matches as $match) {
                $oauth_params[$match[1]] = urldecode($match[2]);
            }

            return $_POST + $_GET + $oauth_params;
        } else {
            return $_POST + $_GET;
        }
    }

    protected function _initOAuthProvider()
    {
        $params = $this->getResource('OAuthParams');

        return new OAuthProvider($params);
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
