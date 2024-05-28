import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {
  @Input() configForm: any[] = [];
  // @Input() textCancelBtn: string = '';
  @Input() textSaveBtn: string = '';
  formGroup!: FormGroup;
  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnChanges(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const fields: any = {};
    this.configForm?.forEach((element) => {
      const field = this.createFormControl(element?.value, element?.attributes);
      fields[element.name] = this.composeValidators(field, element);
    });
    this.formGroup = this.formBuilder.group(fields);
  }

  private createFormControl(value: any, attributes: any): FormControl {
    return new FormControl({
      value,
      disabled: attributes?.disabled
    });
  }

  private composeValidators(field: FormControl | FormArray, element: any): FormControl | FormArray {
    const initialValidators = field.validator;
    const validators = this.setValidators(element.validators);
    const compose = Validators.compose([...validators, initialValidators]);
    field.setValidators(compose);
    return field;
  }

  private setValidators(validators: any[]): ValidatorFn[] {
    const buildValidators = new Array<ValidatorFn>();
    validators.forEach((validator) => {
      switch (validator.type) {
        case 'required':
          buildValidators.push(Validators.required);
          break;
        case 'pattern':
          buildValidators.push(Validators.pattern(validator.value));
          break;
      }
    });
    return buildValidators;
  }

  onSubmitForm(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.disabled) {
      this.formGroup.enable();
      if (this.formGroup.valid) {
        const value = JSON.parse(JSON.stringify(this.formGroup.value));
        this.submitForm.emit(value);
        /*if (this.resetForm) {
          this.reset();
        }*/
      } else {
        this.formGroup.disable();
      }
    } else {
      if (this.formGroup.valid) {
        const value = JSON.parse(JSON.stringify(this.formGroup.value));
        this.submitForm.emit(value);
        /* if (this.resetForm) {
          this.reset();
        } */
      }
    }
  }

}