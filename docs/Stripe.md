## Stripe tests
<hr>
Testing stripes different responses

<br>
<br>

####Stripe CC bad response tests:
**passed** - 
Charge succeeds and funds will be added directly to your available balance 

**passed** - 
address_zip_check verifications fail 

**passed** - 
If a CVC number is provided, the cvc_check fails.

**passed** - 
insufficient_funds fails.

**passed** - 
Results in a charge with a risk_level of highest - failed payment

**passed** - 
Lost or stolen card - failed payment

**passed** - 
Charge is declined with an expired_card code.

**passed** - 
Charge is declined with an incorrect_cvc code.

**passed** - 
Charge is declined with a processing_error code.


####Stripe CC good response tests:


* Visa Debit - Passed
* Mastercard - Passed
* Mastercard (2-series) - Passed
* Mastercard (debit) - Passed
* Mastercard (prepaid) - Passed
* American Express - Passed
* Discover - Passed
* Diners Club - Passed
* JCB - Passed
* UnionPay - Passed
