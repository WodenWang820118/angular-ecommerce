import { ShopValidators } from './../../vlidators/shop-validators';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
        firstName: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ]),
        lastName: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ]),
        email: new FormControl('',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
        )
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ]),
        city: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ]),
        state: new FormControl(''),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ]),
        city: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ]),
        state: new FormControl(''),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(2),
            ShopValidators.hasOnlyWhiteSpace
          ]),
        cardNumber: new FormControl('', [Validators.pattern('^[0-9]{16}$')]),
        securityCode: new FormControl('', [Validators.pattern('^[0-9]{3}$')]),
        expirationMonth: [''],
        expirationYear: ['']
      }),
    });
    this.activateShopFormService();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // console.warn('Your order has been submitted', this.checkoutFormGroup.value);
    // console.log(this.checkoutFormGroup.get('customer')?.value);

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }
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

  get firstName(): AbstractControl | null {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName(): AbstractControl | null {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email(): AbstractControl | null {
    return this.checkoutFormGroup.get('customer.email');
  }

  get shippingAddressStreet(): AbstractControl | null {
    return this.checkoutFormGroup.get('shippingAddress.street');
  }

  get shippingAddressCity(): AbstractControl | null {
    return this.checkoutFormGroup.get('shippingAddress.city');
  }

  get shippingAddressState(): AbstractControl | null {
    return this.checkoutFormGroup.get('shippingAddress.state');
  }

  get shippingAddressCountry(): AbstractControl | null {
    return this.checkoutFormGroup.get('shippingAddress.country');
  }

  get shippingAddressZipCode(): AbstractControl | null {
    return this.checkoutFormGroup.get('shippingAddress.zipCode');
  }

  get billingAddressStreet(): AbstractControl | null {
    return this.checkoutFormGroup.get('billingAddress.street');
  }

  get billingAddressCity(): AbstractControl | null {
    return this.checkoutFormGroup.get('billingAddress.city');
  }

  get billingAddressState(): AbstractControl | null {
    return this.checkoutFormGroup.get('billingAddress.state');
  }

  get billingAddressCountry(): AbstractControl | null {
    return this.checkoutFormGroup.get('billingAddress.country');
  }

  get billingAddressZipCode(): AbstractControl | null {
    return this.checkoutFormGroup.get('billingAddress.zipCode');
  }

  get creditCardCardType(): AbstractControl | null {
    return this.checkoutFormGroup.get('creditCard.cardType');
  }

  get creditCardNameOnCard(): AbstractControl | null {
    return this.checkoutFormGroup.get('creditCard.nameOnCard');
  }

  get creditCardCardNumber(): AbstractControl | null {
    return this.checkoutFormGroup.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode(): AbstractControl | null {
    return this.checkoutFormGroup.get('creditCard.securityCode');
  }
}
