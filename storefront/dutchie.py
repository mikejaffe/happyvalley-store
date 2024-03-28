import requests
import json
import os

class Dutchie:
  def __init__(self, retailer_id, order_id):
    self.retailer_id = retailer_id
    self.order_id = order_id

  def make_request(self, payload):
    Headers = {"Authorization": os.environ.get('DUTCHIE_API_KEY')}
    result = requests.post(url="https://plus.dutchie.com/plus/2021-07/graphql", json={"query":payload}, headers=Headers)
    return json.loads(result.text) 

  def fetch_info(self):
    payload = ("""query { retailer(id: "%s") {
          address
          name
          menuTypes
          banner {
            html
          }
          paymentOptions {
            aeropay
            alt36
            canPay
            cashless
            cashOnly
            check
            creditCard
            creditCardAtDoor
            creditCardByPhone
            debitOnly
            hypur
            linx
            merrco
            payInStore
            paytender
          }
          deliverySettings {
            afterHoursOrderingForDelivery
            afterHoursOrderingForPickup
            deliveryArea
            deliveryFee
            deliveryMinimum
            disablePurchaseLimits
            limitPerCustomer
            pickupMinimum
            scheduledOrderingForDelivery
            scheduledOrderingForPickup
          }
          description
          fulfillmentOptions {
           curbsidePickup
            delivery
            driveThruPickup
            pickup
          }
          hours {
              specialHours {
              startDate
              endDate
              name
              specialOperatingHours {
                date
                pickup {
                  active
                  start
                  end
                }
              }
            }
            pickup {
              Monday {
                start
                end
                active
              }
              Tuesday {
          start
          end
          active
            }
            Wednesday {
              start
              end
              active
            }
            Thursday {
              start
              end
              active
            }
            Friday {
              start
              end
              active
            }
            Saturday {
              start
              end
              active
            }
            Sunday {
              start
              end
              active
            }
          }
        }
      }
 } """ % ( self.retailer_id))
    return self.make_request(payload)

  def fetch_cart(self):
    payload = ("""{
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
    return make_request(payload)