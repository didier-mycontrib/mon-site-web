import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QcmComponent } from 'src/qcm/qcm/qcm.component';
import { OptionQcmComponent } from './qcm/option-qcm/option-qcm.component';
import { PerformQcmComponent } from './qcm/perform-qcm/perform-qcm.component';
import { ResultQcmComponent } from './qcm/result-qcm/result-qcm.component';


const routes: Routes = [
  { path: 'ngr/qcm', component: QcmComponent ,
    children: [
      { path: 'options/:specif', component: OptionQcmComponent },
      { path: 'perform', component: PerformQcmComponent },
      { path: 'results', component: ResultQcmComponent },
      { path: '', redirectTo: 'options/default', pathMatch: 'prefix'}
    ]
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'disabled'
})],
  exports: [RouterModule]
})
export class QcmRoutingModule { }
