from django.shortcuts import render
from django.http import HttpResponse
from urllib.parse import urlparse
from storefront.store import Store
from django.http import JsonResponse

# Create your views here.
def index(request):
  menu_type = 'RECREATIONAL' if request.COOKIES.get('menu_type') == None else request.COOKIES.get('menu_type')
  store = Store(request.META.get('HTTP_HOST'), menu_type);
  context = {"store": store, "menu_type": menu_type }
  return render(request, "index.html", context)


def products(request, category, subcategory=None):
  menu_type = 'RECREATIONAL' if request.COOKIES.get('menu_type') == None else request.COOKIES.get('menu_type')
  store = Store(request.META.get('HTTP_HOST'), menu_type);
  #products = store.fetch_products(category, subcategory)

  return render(request, "products.html", {"store": store, "category": category, "subcategory": subcategory})


def fetch_cart(request):
  data = {}
  menu_type = 'RECREATIONAL' if request.COOKIES.get('menu_type') == None else request.COOKIES.get('menu_type')
  store = Store(request.META.get('HTTP_HOST'), menu_type);
  context = {"store": store, "menu_type": menu_type }
  return render(request, "shared/cart.html", context)





 
  