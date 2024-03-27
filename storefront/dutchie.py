import requests

class Dutchie:
  def __init__(self, retailer_id, order_id):
    self.retailer_id = retailer_id
    self.order_id = order_id

  def fetch_cart(self):
    payload = ("""query {
         checkout(id: %s
                  retailerId: %s
         ) {
           id
           pricingType
           orderType
            priceSummary {
              subtotal
              taxes
              total
              discounts
              fees
              rewards
            }
           items {
             id
             option
       isDiscounted
       discounts {
        total
      }
             product {
               id
               image
               name
               brand {
                 name
               }
               variants {
                 option
                 priceRec
                 priceMed
                  specialPriceMed
                  specialPriceRec
                  quantity
               }
             }
             quantity
           }
           redirectUrl
           }
         }""" % ( self.order_id, self.retailer_id))

    pass