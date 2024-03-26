from django.db import models


class Locations(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(blank=True, null=True)
    address1 = models.CharField(blank=True, null=True)
    address2 = models.CharField(blank=True, null=True)
    city = models.CharField(blank=True, null=True)
    state = models.CharField(blank=True, null=True)
    zip = models.CharField(blank=True, null=True)
    country = models.CharField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    subdomain = models.CharField(blank=True, null=True)
    video = models.CharField(blank=True, null=True)
    retailer_id = models.CharField(blank=True, null=True)

    class Meta:
        db_table = 'locations'


class MenuSales(models.Model):
    id = models.BigAutoField(primary_key=True)
    promo_id = models.CharField(blank=True, null=True)
    menu_id = models.CharField(blank=True, null=True)
    created_at = models.DateTimeField()
    updated_at = models.DateTimeField()
    menu_type = models.CharField(blank=True, null=True)
    location_id = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'menu_sales'


class Menus(models.Model):
    id = models.CharField(primary_key=True)
    menu_type = models.CharField(blank=True, null=True)
    brand = models.JSONField(blank=True, null=True)
    category = models.CharField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    description_html = models.TextField(blank=True, null=True)
    image = models.CharField(blank=True, null=True)
    name = models.CharField(blank=True, null=True)
    pos_id = models.CharField(blank=True, null=True)
    potency_cbd = models.JSONField(blank=True, null=True)
    potency_thc = models.JSONField(blank=True, null=True)
    staff_pick = models.BooleanField(blank=True, null=True)
    strain_type = models.CharField(blank=True, null=True)
    subcategory = models.CharField(blank=True, null=True)
    variants = models.JSONField(blank=True, null=True)
    slug = models.CharField(blank=True, null=True)
    title_tag = models.TextField(blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    deleted_at = models.DateTimeField(blank=True, null=True)
    sort = models.FloatField(blank=True, null=True)
    terpenes = models.JSONField(blank=True, null=True)
    custom_section = models.CharField(blank=True, null=True)
    retailer_id = models.CharField(blank=True, null=True)
    sale_type = models.CharField(blank=True, null=True)
    images = models.JSONField(blank=True, null=True)
    tags = models.TextField(blank=True, null=True)
    available = models.IntegerField(blank=True, null=True)
    dutchie_id = models.CharField(blank=True, null=True)
    enterprise_product_id = models.CharField(blank=True, null=True)
    internal_id = models.CharField(blank=True, null=True)
    sync_date = models.DateTimeField(blank=True, null=True)
    onsale = models.BooleanField(blank=True, null=True)
    cultivar_description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'menus'


class PromoHeaders(models.Model):
    id = models.BigAutoField(primary_key=True)
    image = models.CharField(blank=True, null=True)
    mobile_image = models.CharField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    menu_type = models.CharField(blank=True, null=True)
    external_url = models.CharField(blank=True, null=True)
    mobile_app_image = models.CharField(blank=True, null=True)
    sort_order = models.DecimalField(max_digits=1000, decimal_places=2, blank=True, null=True)
    location_id = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'promo_headers'


class Promos(models.Model):
    id = models.BigAutoField(primary_key=True)
    message = models.TextField(blank=True, null=True)
    location_id = models.IntegerField(blank=True, null=True)
    menu_type = models.CharField(blank=True, null=True)
    name = models.CharField(blank=True, null=True)
    image = models.CharField(blank=True, null=True)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    dutchie_id = models.CharField(blank=True, null=True)
    days = models.JSONField(blank=True, null=True)

    class Meta:
        db_table = 'promos'