from django.urls import path
from . import views

urlpatterns = [
    path("fetch-cart", views.fetch_cart, name="fetch_cart"),
    path("<str:category>", views.products, name="products"),
    path("<str:category>/<str:subcategory>", views.products, name="products"),
    path("", views.index, name="index"),
    
]