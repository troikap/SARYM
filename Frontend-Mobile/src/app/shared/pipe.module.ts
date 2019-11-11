import { NgModule } from '@angular/core';
import { AjustarPalabraPipe } from '../pipes/ajustar-palabra.pipe';
import { CheckNullPipe } from '../pipes/check-null.pipe';

@NgModule({
declarations: [
    AjustarPalabraPipe,
    CheckNullPipe
],
imports: [],
exports: [
    AjustarPalabraPipe,
    CheckNullPipe
],
})

export class PipesModule {}