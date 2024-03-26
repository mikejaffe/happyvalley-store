from storefront.models import Menus, Locations,MenuSales,PromoHeaders,Promos
from datetime import datetime
import pytz
import json
from django.conf import settings

class Store:
  def __init__(self, domain, menu_type):
    if domain == '127.0.0.1:8000':
      self.domain = "gloucester"
    else:
      self.domain = domain
    self.menu_type = menu_type
    self.location = Locations.objects.get(subdomain = self.domain)
    self.retailer_id = self.location.retailer_id
    self.canonical = domain
    self.meta = self.site_meta(self.location.subdomain)
    self.categories = self.fetch_categories()
    self.brands = self.fetch_brands()
    self.sales = self.fetch_sales()
    self.promo_headers = self.fetch_promo_headers()
    self.sale_promos = self.fetch_sale_promos()
    self.development = settings.DEBUG==True
    self.store_open = True
    self.store_open_str = "true"
    self.store_open_txt = ''
    self.cart_size = 0
    self.cart_total = 0
    self.menu_items = self.menu_items()

  def fetch_products(self):
    pass


  def fetch_sale_promos(self):
    dt = datetime.now(pytz.timezone('America/New_York'))
    sql = ("""SELECT promos.* FROM promos INNER JOIN locations ON locations.id = promos.location_id
         WHERE locations.retailer_id = '%s' AND (promos.menu_type = '%s' OR OR menu_type = 'BOTH') 
         AND '%s' >= start_date and '%s' <= end_date
         """ % (self.retailer_id, self.menu_type, dt, dt))
    return Promos.objects.raw(sql)

  def fetch_promo_headers(self):
    dt = datetime.now(pytz.timezone('America/New_York'))
    sql = ("""SELECT * FROM promo_headers WHERE lower(menu_type) = 'both' 
      OR lower(menu_type) = '%s' AND '%s' >= start_date and '%s' <= end_date
      """ % (self.menu_type, dt, dt))
    return PromoHeaders.objects.raw(sql)

  def fetch_sales(self):
    sql = ("""SELECT menus.* from menu_sales
        INNER JOIN menus ON menus.id = menu_sales.menu_id 
        WHERE (menu_sales.menu_type = '%s' OR  menu_sales.menu_type = 'BOTH') 
        AND menu_sales.location_id = %s""" % (self.menu_type, self.location.id))
    return Menus.objects.raw(sql)

  def fetch_categories(self):
    return Menus.objects.raw("SELECT distinct 0 as id, category as name FROM menus order by category")

  def fetch_brands(self):
    brands = Menus.objects.raw("SELECT distinct 0 as id, brand FROM menus order by brand")
    results = []
    for b in brands:
      if b.brand != None:
        results.append(b.brand["name"])
    return results

  def menu_items(self):
    items = [
      {"url":"flower", "class":"flower","name": "Flower"},
      {"url":"pre_rolls", "class":"pre-rolls","name": "Pre-rolls"},
      {"url":"vaporizers", "class":"vape","name": "Vaporizers"},
      {"url":"concentrates", "class":"concentrates","name": "Concentrates"},
      {"url":"edibles", "class":"edibles","name": "Edibles"},
      {"url":"tinctures", "class":"tinctures","name": "Tinctures"},
      {"url":"topicals", "class":"topicals","name": "Topicals"},
      {"url":"accessories", "class":"accessories","name": "Accessories"},
    ]
    return items

  def site_meta(self,subdomain):
    meta_data = {
      "gloucester": {
        "id": self.location.retailer_id,
        "name": 'Happy Valley Gloucester Home', "title_tag": 'Gloucester, MA | Happy Valley',
        "image": 'https://zah-dutchie.imgix.net/happy-valley-list.jpg',
        "meta_description": 'Order cannabis for delivery or pick up from Happy Valley - Gloucester in Gloucester, MA. View the marijuana dispensary menu, reviews and photos. Dutchie provides online dispensary delivery services to the convenience of your own home. Marijuana delivery has never been so simple. Order online today!' } 
      ,
      "eastboston": {
        "id": self.location.retailer_id,
        "name": 'Happy Valley East Boston Home', "title_tag": 'East Boston, MA | Happy Valley',
        "image": 'https://zah-dutchie.imgix.net/happy-valley-list.jpg',
        "meta_description": 'Order cannabis for delivery or pick up from Happy Valley - East Boston in Boston, MA. View the marijuana dispensary menu, reviews and photos. Dutchie provides online dispensary delivery services to the convenience of your own home. Marijuana delivery has never been so simple. Order online today!' } 
    }
    return meta_data[subdomain]
    


