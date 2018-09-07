<?php

namespace app\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot()
    {
      URL::forceScheme('https');
      $this->app['request']->server->set('HTTPS', true);
    }

    /**
     * Register any application services.
     */
    public function register()
    {
    }
}
