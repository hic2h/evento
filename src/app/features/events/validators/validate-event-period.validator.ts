import { FormGroup } from "@angular/forms";
/**
 * A custom reactive forms validator to ensure the end date is always greater than the start date
 */
export const validateEventPeriod = () => {
  return (formGroup: FormGroup) => {
    if (
      new Date(formGroup.controls["startDate"].value) >=
      new Date(formGroup.controls["endDate"].value)
    ) {
      formGroup.controls["endDate"].setErrors({
        invalidPeriod: true
      });
    } else {
      formGroup.controls["endDate"].setErrors(null);
    }
  };
};
