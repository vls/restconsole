<?php
class Sandbox_Bootstrap extends Zend_Application_Module_Bootstrap
{
    public function __initLibraryAutoloader()
    {
        return $this->getResourceLoader()->addResourceType('library', 'library', 'library');
    }

    // make sure REST is before Cache
    public function __initREST()
    {
        $frontController = Zend_Controller_Front::getInstance();

        // register the RestHandler plugin
        $frontController->registerPlugin(new REST_Controller_Plugin_RestHandler($frontController));

        // add REST contextSwitch helper
        $contextSwitch = new REST_Controller_Action_Helper_ContextSwitch();
        Zend_Controller_Action_HelperBroker::addHelper($contextSwitch);

        // add restContexts helper
        $restContexts = new REST_Controller_Action_Helper_RestContexts();
        Zend_Controller_Action_HelperBroker::addHelper($restContexts);
    }

    public function __initOAuthParams()
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

    public function __initOAuthProvider()
    {
        $params = $this->getResource('OAuthParams');

        return new OAuthProvider($params);
    }
}
