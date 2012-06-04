from django.conf.urls import patterns, include, url
from tastypie.api import Api

from django.contrib import admin
admin.autodiscover()

#API resources
from datea_api.auth import Accounts
from datea_api.profile import ProfileResource,UserResource
from datea_api.mapping import MappingResource
from datea_api.category import FreeCategoryResource

v1_api = Api(api_name='v1')
v1_api.register(Accounts())
v1_api.register(ProfileResource())
v1_api.register(UserResource())
v1_api.register(MappingResource())
v1_api.register(FreeCategoryResource())

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'datea.datea_home.views.home', name='home'),
    # url(r'^datea/', include('datea.foo.urls')),
    
    url(r'^api/',include(v1_api.urls)),

    # Uncomment the admin/doc line below to enable admin documentation:
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    (r'^grappelli/', include('grappelli.urls')),
    url(r'', include('social_auth.urls')),
    (r'^accounts/', include('registration.backends.default.urls')),
)
