import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: {countryName: string, isoCode: string} [] = [];
  states: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private shopFormService: ShopFormService) {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });
    this.activateShopFormService();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.warn('Your order has been submitted', this.checkoutFormGroup.value);
    console.log(this.checkoutFormGroup.get('customer')?.value);
  }

  copyShippingAddressToBillingAddress(checked: boolean) {
    if (checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  handleMonthsAndYears(selectedYear: string) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    if (selectedYear === String(currentYear)) {
      this.shopFormService.getCreditCardMonths(currentMonth).subscribe(
        data => {
          this.creditCardMonths = data;
        }
      );
    } else {
      this.shopFormService.getCreditCardMonths(1).subscribe(
        data => {
          this.creditCardMonths = data;
        }
      );
    }
  }

  activateShopFormService() {
    // populate credit card months and years
    this.shopFormService.getCreditCardYears().subscribe(
      data => {
        this.creditCardYears = data;
      }
    );

    // populate months based on the current year as default
    this.handleMonthsAndYears(String(new Date().getFullYear()));

    this.shopFormService.getCountries().subscribe(
      data => {
        this.countries = data;
      }
    );

    // populate the first country's states in the list as the default country
    // might modify this to be the user's country
    this.shopFormService.getStates(this.countries[0].isoCode).subscribe(
      data => {
        this.states = data;
      }
    ).unsubscribe();
  }

  updateStates(event: Event): void {
    const currentCountryName = (event.target as HTMLInputElement).value;
    const countryCode = this.getIsoCodeByCountryName(currentCountryName);

    // note some countries don't have states
    this.shopFormService.getStates(countryCode).subscribe(
      data => {
        this.states = data;
      }
    );
  }

  getIsoCodeByCountryName(countryName: string): string {
    for (let country of this.countries) {
      if (country.countryName === countryName) {
        return country.isoCode;
      }
    }
    return 'cannot find ISO code';
  }
}
