import { ValidatorFn, ValidationErrors, FormGroup } from '@angular/forms';

export function equalValidator(params: { first_control_name: string, second_control_name: string }): ValidatorFn {
  return (group: FormGroup): ValidationErrors => {
     const control1 = group.controls[params.first_control_name];
     const control2 = group.controls[params.second_control_name];
     if (control1.value !== control2.value) {
        control2.setErrors({not_equal: true});
     } else {
        control2.setErrors(null);
     }
     return;
  };
}
